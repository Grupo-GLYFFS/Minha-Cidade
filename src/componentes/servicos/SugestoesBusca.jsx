import { Button } from '@mantine/core';
import Icone from '../Icone';
import { SUGESTOES_BUSCA } from '../../logica/buscaServicos';
import classes from './SugestoesBusca.module.css';

// Botões com buscas populares (ex.: "IPTU", "Lixo"), mostrados quando a busca está vazia.
// Recebe aoEscolher(termo), chamada quando a pessoa toca em uma sugestão.
export default function SugestoesBusca({ aoEscolher }) {
  return (
    <ul className={classes.lista}>
      {SUGESTOES_BUSCA.map((termo) => (
        <li key={termo}>
          <Button
            variant="default"
            radius="xl"
            h={44}
            px="md"
            leftSection={<Icone nome="search" tamanho={18} />}
            onClick={() => aoEscolher(termo)}
          >
            {termo}
          </Button>
        </li>
      ))}
    </ul>
  );
}
