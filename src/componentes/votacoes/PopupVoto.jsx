import { useState } from 'react';
import { VisuallyHidden } from '@mantine/core';
import Popup from '../Popup';
import Botao from '../Botao';
import Icone from '../Icone';
import { OPCOES_VOTO } from '../../dados/opcoesVoto';
import classes from './PopupVoto.module.css';

// Caixa do voto: a pessoa escolhe Sim ou Não e confirma. O voto não muda depois.
// Sem escolha, o Confirmar mostra o erro na própria caixa (sem alert()).
// Recebe aberto, aoFechar, o projeto (título e textos do Sim e do Não) e aoConfirmar(opcao).
export default function PopupVoto({ aberto, aoFechar, projeto, aoConfirmar }) {
  const [escolha, setEscolha] = useState('');
  const [erro, setErro] = useState('');

  // O que acontece se cada lado ganhar
  const explicacao = { sim: projeto.textoSim, nao: projeto.textoNao };
  const rotuloEscolha = OPCOES_VOTO.find((opcao) => opcao.valor === escolha)?.rotulo;

  // Fecha e limpa a escolha, para a caixa abrir vazia da próxima vez
  function fechar() {
    setEscolha('');
    setErro('');
    aoFechar();
  }

  // Confere a escolha e manda o voto
  function confirmar() {
    if (!escolha) {
      setErro('Escolha Sim ou Não para votar.');
      return;
    }
    aoConfirmar(escolha);
    setEscolha('');
    setErro('');
  }

  return (
    <Popup
      aberto={aberto}
      aoFechar={fechar}
      titulo="Seu voto"
      botoes={
        <>
          <Botao variante="secundario" onClick={fechar}>
            Cancelar
          </Botao>
          <Botao variante="principal" onClick={confirmar}>
            {rotuloEscolha ? `Confirmar voto ${rotuloEscolha}` : 'Confirmar voto'}
          </Botao>
        </>
      }
    >
      <p className={classes.projeto}>{projeto.titulo}</p>
      <fieldset
        className={classes.opcoes}
        aria-invalid={erro ? true : undefined}
        aria-describedby={erro ? 'erro-voto' : undefined}
      >
        <VisuallyHidden component="legend">Seu voto</VisuallyHidden>
        {OPCOES_VOTO.map((opcao) => (
          <label key={opcao.valor} className={classes.opcao}>
            <input
              type="radio"
              name="voto"
              value={opcao.valor}
              checked={escolha === opcao.valor}
              onChange={() => {
                setEscolha(opcao.valor);
                setErro('');
              }}
              className={classes.radio}
            />
            <Icone nome={opcao.icone} tamanho={22} className={classes.icone} />
            <span className={classes.texto}>
              <b>{opcao.rotulo}</b>
              <small>{explicacao[opcao.valor]}</small>
            </span>
          </label>
        ))}
      </fieldset>
      {erro && (
        <p id="erro-voto" className={classes.erro} role="alert">
          <Icone nome="error" tamanho={20} />
          {erro}
        </p>
      )}
      <p className={classes.aviso}>Depois de confirmar, o voto não muda.</p>
    </Popup>
  );
}
