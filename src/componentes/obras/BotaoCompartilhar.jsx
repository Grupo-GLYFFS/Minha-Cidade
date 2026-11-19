import { useState } from 'react';
import Botao from '../Botao';
import classes from './BotaoCompartilhar.module.css';

// Botão só com ícone para compartilhar a página (obra, votação).
// No celular, abre o compartilhar do sistema; no computador, copia o link e avisa "Link copiado".
// Recebe o que é compartilhado, para o aria-label (ex.: "obra") e o título da página.
export default function BotaoCompartilhar({ oque, titulo }) {
  const [aviso, setAviso] = useState('');

  // Compartilha pelo sistema ou copia o endereço da página
  async function compartilhar() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: titulo, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setAviso('Link copiado');
    } catch {
      // A pessoa fechou a janela de compartilhar ou o navegador bloqueou a cópia
      setAviso('');
    }
  }

  return (
    <span className={classes.caixa}>
      <Botao
        variante="icone-acao"
        icone="share"
        aria-label={`Compartilhar ${oque}`}
        onClick={compartilhar}
      />
      <span className={classes.aviso} role="status">
        {aviso}
      </span>
    </span>
  );
}
