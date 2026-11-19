import { useEffect, useState } from 'react';
import Botao from '../Botao';
import { compartilharLink } from '../../logica/compartilhar';
import classes from './BotaoCompartilhar.module.css';

// Quanto tempo a mensagem "Link copiado" fica na tela
const TEMPO_MENSAGEM_MS = 3000;

// Mensagem mostrada depois de cada resultado
const MENSAGENS = {
  copiado: 'Link copiado',
  erro: 'Não deu para copiar o link',
};

// Botão "Compartilhar" de alertas e avisos. No celular abre a folha de compartilhar;
// no computador copia o link e mostra "Link copiado" embaixo do botão (sem alert()).
// Recebe:
// - titulo e caminho do item compartilhado;
// - soIcone: botão quadrado só com o ícone (quando falta espaço), com aria-label;
// - compacto: altura de 44 (dentro de cards);
// - rotulo: aria-label do botão só com ícone (ex.: "Compartilhar alerta").
export default function BotaoCompartilhar({
  titulo,
  caminho,
  soIcone = false,
  compacto = false,
  rotulo = 'Compartilhar',
}) {
  const [resultado, setResultado] = useState(null);

  // Some com a mensagem depois de alguns segundos
  useEffect(() => {
    if (!resultado) return undefined;
    const espera = setTimeout(() => setResultado(null), TEMPO_MENSAGEM_MS);
    return () => clearTimeout(espera);
  }, [resultado]);

  const compartilhar = async () => {
    const novo = await compartilharLink({ titulo, caminho });
    setResultado(MENSAGENS[novo] ? novo : null);
  };

  return (
    <span className={classes.envolve}>
      {soIcone ? (
        <Botao variante="icone-acao" icone="share" aria-label={rotulo} onClick={compartilhar} />
      ) : (
        <Botao variante="secundario" compacto={compacto} icone="share" onClick={compartilhar}>
          Compartilhar
        </Botao>
      )}
      <span className={classes.mensagem} role="status">
        {resultado ? MENSAGENS[resultado] : ''}
      </span>
    </span>
  );
}
