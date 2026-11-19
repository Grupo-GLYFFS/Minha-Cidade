import { useState } from 'react';
import Popup from '../Popup';
import Botao from '../Botao';
import CampoTexto from '../CampoTexto';

// Popup "Editar <dado>" do Meu perfil (30, quadro 4): um campo só, com Cancelar e Salvar.
// Valida ao salvar (as mesmas regras do cadastro) e mostra o erro embaixo do campo.
// Recebe:
// - dado: { campo, rotulo, tipo, autoComplete, modoTeclado, mascara, regra } (logica/esquemaPerfil.js);
// - valorInicial; validarExtra(valor): devolve uma mensagem de erro ou "" (ex.: e-mail em uso);
// - aoSalvar(valor) e aoFechar().
// Monte com key diferente a cada abertura, para começar do valor salvo.
export default function PopupEditarDado({ dado, valorInicial, validarExtra, aoSalvar, aoFechar }) {
  const [valor, setValor] = useState(valorInicial ?? '');
  const [erro, setErro] = useState('');
  const idCampo = `editar-${dado.campo}`;

  // Confere o valor e salva. Recebe o evento do formulário (Enter ou botão Salvar).
  function salvar(evento) {
    evento?.preventDefault();
    try {
      const limpo = dado.regra.validateSync(valor);
      const extra = validarExtra?.(limpo) ?? '';
      if (extra) {
        setErro(extra);
        return;
      }
      aoSalvar(limpo);
    } catch (falha) {
      setErro(falha.message);
    }
  }

  return (
    <Popup
      aberto
      aoFechar={aoFechar}
      titulo={`Editar ${dado.rotulo === 'CPF' ? 'CPF' : dado.rotulo.toLowerCase()}`}
      botoes={
        <>
          <Botao variante="secundario" onClick={aoFechar}>
            Cancelar
          </Botao>
          <Botao variante="principal" type="submit" form={`form-${idCampo}`}>
            Salvar
          </Botao>
        </>
      }
    >
      <form id={`form-${idCampo}`} onSubmit={salvar} noValidate>
        <CampoTexto
          id={idCampo}
          rotulo={dado.rotulo}
          type={dado.tipo ?? 'text'}
          autoComplete={dado.autoComplete}
          inputMode={dado.modoTeclado}
          value={valor}
          erro={erro}
          data-autofocus
          onChange={(evento) => {
            const texto = evento.currentTarget.value;
            setValor(dado.mascara ? dado.mascara(texto) : texto);
            if (erro) setErro('');
          }}
        />
      </form>
    </Popup>
  );
}
