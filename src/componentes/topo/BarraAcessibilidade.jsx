import { useState } from 'react';
import { VisuallyHidden } from '@mantine/core';
import Botao from '../Botao';
import { useAcessibilidade } from '../../contexto/useAcessibilidade';
import { limitesTamanho, mudarTamanho, rotuloTamanho } from '../../logica/acessibilidade';
import classes from './BarraAcessibilidade.module.css';

// Barra fina acima do topo, alinhada à direita: A−, A, A+ e Alto contraste (botões de 32).
// "A" fica marcado quando a letra está no tamanho padrão.
// Cada mudança de letra é anunciada ao leitor de tela ("Tamanho da letra: grande").
export default function BarraAcessibilidade() {
  const { tamanhoLetra, altoContraste, definirTamanho, alternarAltoContraste } =
    useAcessibilidade();
  const [anuncio, setAnuncio] = useState('');
  const { menor, maior } = limitesTamanho(tamanhoLetra);

  // Troca o tamanho da letra e avisa o novo tamanho. Recebe o id do novo tamanho.
  function trocarLetra(novo) {
    definirTamanho(novo);
    setAnuncio(`Tamanho da letra: ${rotuloTamanho(novo)}`);
  }

  return (
    <div className={classes.barra}>
      <div className={classes.miolo} role="group" aria-label="Acessibilidade">
        <span className={classes.rotulo} aria-hidden="true">
          Acessibilidade
        </span>
        {/* No limite, o botão fica apagado (desabilitado) */}
        <Botao
          variante="topo"
          aria-label="Diminuir o texto"
          desabilitado={menor}
          onClick={() => trocarLetra(mudarTamanho(tamanhoLetra, -1))}
        >
          A−
        </Botao>
        <Botao
          variante="topo"
          aria-label="Texto no tamanho normal"
          pressionado={tamanhoLetra === 'padrao'}
          iconeLigado={null}
          onClick={() => trocarLetra('padrao')}
        >
          A
        </Botao>
        <Botao
          variante="topo"
          aria-label="Aumentar o texto"
          desabilitado={maior}
          onClick={() => trocarLetra(mudarTamanho(tamanhoLetra, 1))}
        >
          A+
        </Botao>
        <Botao
          variante="topo"
          icone="contrast"
          iconeLigado="contrast"
          pressionado={altoContraste}
          onClick={alternarAltoContraste}
        >
          Alto contraste
        </Botao>
        <VisuallyHidden role="status" aria-live="polite">
          {anuncio}
        </VisuallyHidden>
      </div>
    </div>
  );
}
