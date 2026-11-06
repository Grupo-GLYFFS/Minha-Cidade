import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Group, Text, VisuallyHidden } from '@mantine/core';
import Icone from './Icone';
import { useAcessibilidade } from '../contexto/useAcessibilidade';
import { limitesTamanho, mudarTamanho, rotuloTamanho } from '../logica/acessibilidade';
import classes from './BarraAcessibilidade.module.css';

// Barra fina no topo do computador: a cidade e os controles de acessibilidade
// (diminuir, voltar ao padrão e aumentar a letra, alto contraste e o link "Mais opções").
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
    <div className={classes.util}>
      <Container size={1200} px="xl">
        <Group justify="space-between" mih={40} py={4}>
          <Text size="sm" c="dimmed">
            São Paulo, SP
          </Text>
          <Group gap="sm" role="group" aria-label="Acessibilidade">
            <Text size="sm" c="dimmed">
              Acessibilidade
            </Text>
            {/* aria-disabled em vez de disabled: o botão não perde o foco ao chegar no limite */}
            <button
              type="button"
              className={classes.botao}
              aria-label="Diminuir o tamanho da letra"
              aria-disabled={menor}
              onClick={() => !menor && trocarLetra(mudarTamanho(tamanhoLetra, -1))}
            >
              A−
            </button>
            <button
              type="button"
              className={classes.botao}
              aria-label="Tamanho padrão da letra"
              onClick={() => trocarLetra('padrao')}
            >
              A
            </button>
            <button
              type="button"
              className={classes.botao}
              aria-label="Aumentar o tamanho da letra"
              aria-disabled={maior}
              onClick={() => !maior && trocarLetra(mudarTamanho(tamanhoLetra, 1))}
            >
              A+
            </button>
            <button
              type="button"
              className={classes.botao}
              aria-pressed={altoContraste}
              onClick={alternarAltoContraste}
            >
              <Icone nome="contrast" tamanho={18} />
              Alto contraste
            </button>
            <Link to="/perfil/acessibilidade" className={classes.link}>
              Mais opções
            </Link>
            <VisuallyHidden role="status" aria-live="polite">
              {anuncio}
            </VisuallyHidden>
          </Group>
        </Group>
      </Container>
    </div>
  );
}
