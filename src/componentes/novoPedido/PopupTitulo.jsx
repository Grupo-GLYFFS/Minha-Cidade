import { useState } from 'react';
import Popup from '../Popup';
import Botao from '../Botao';
import CampoTexto from '../CampoTexto';
import { TITULO_MAX, esquemaTitulo, validarEtapa } from '../../logica/esquemaNovoPedido';

// Popup "Editar o título" da etapa Revisar. O app monta o título pela descrição;
// aqui a pessoa pode trocar. Recebe aberto, o título atual, aoFechar() e aoSalvar(titulo).
// O campo começa com o título atual a cada vez que o popup abre (quem usa passa uma key nova).
export default function PopupTitulo({ aberto, titulo, aoFechar, aoSalvar }) {
  const [texto, setTexto] = useState(titulo);
  const [erro, setErro] = useState('');

  // Confere o título e salva; com erro, a mensagem aparece embaixo do campo
  function salvar() {
    const erros = validarEtapa(esquemaTitulo, { titulo: texto });
    if (erros.titulo) {
      setErro(erros.titulo);
      return;
    }
    aoSalvar(texto.trim());
  }

  return (
    <Popup
      aberto={aberto}
      aoFechar={aoFechar}
      titulo="Editar o título"
      botoes={
        <>
          <Botao variante="secundario" onClick={aoFechar}>
            Cancelar
          </Botao>
          <Botao variante="principal" onClick={salvar}>
            Salvar
          </Botao>
        </>
      }
    >
      <CampoTexto
        id="titulo"
        rotulo="Título"
        withAsterisk
        ajuda={`Uma frase curta, de até ${TITULO_MAX} caracteres.`}
        maxLength={TITULO_MAX}
        erro={erro}
        value={texto}
        data-autofocus
        onChange={(evento) => setTexto(evento.currentTarget.value)}
        onKeyDown={(evento) => {
          if (evento.key === 'Enter') salvar();
        }}
      />
    </Popup>
  );
}
