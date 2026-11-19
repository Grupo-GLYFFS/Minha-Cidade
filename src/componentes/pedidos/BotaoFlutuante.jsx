import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icone from '../Icone';
import classes from './BotaoFlutuante.module.css';

// "+" flutuante do celular: botão redondo de 56, só com o ícone, à direita e acima da barra
// de abas. Só aparece quando o cabeçalho (com a ação dele) sai da tela ao rolar.
// No computador não aparece.
// Vai como primeiro item do conteúdo da página: um marcador invisível mostra onde o cabeçalho
// acaba. Recebe a rota (para), o nome do botão para o leitor de tela (rotulo) e o ícone.
export default function BotaoFlutuante({ para, rotulo, icone = 'add' }) {
  const marcador = useRef(null);
  const [visivel, setVisivel] = useState(false);

  // Vê quando o marcador passa do alto da tela (o cabeçalho saiu de vista)
  useEffect(() => {
    const alvo = marcador.current;
    if (!alvo || typeof IntersectionObserver === 'undefined') return undefined;
    const observador = new IntersectionObserver(([entrada]) => {
      setVisivel(!entrada.isIntersecting && entrada.boundingClientRect.top < 0);
    });
    observador.observe(alvo);
    return () => observador.disconnect();
  }, []);

  return (
    <>
      <span ref={marcador} className={classes.marcador} aria-hidden="true" />
      <Link
        to={para}
        className={`${classes.botao} ${visivel ? classes.visivel : ''}`}
        aria-label={rotulo}
        tabIndex={visivel ? undefined : -1}
        aria-hidden={visivel ? undefined : true}
      >
        <Icone nome={icone} tamanho={28} />
      </Link>
    </>
  );
}
