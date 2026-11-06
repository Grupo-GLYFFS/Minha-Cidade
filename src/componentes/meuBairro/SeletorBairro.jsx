import { Link } from 'react-router-dom';
import { Anchor, Group, Select } from '@mantine/core';
import Icone from '../Icone';
import { opcoesDeBairros } from '../../logica/bairros';
import classes from './SeletorBairro.module.css';

// Lista "Escolha um bairro" de Meu Bairro, com os bairros separados por região.
// Para quem está logado e olha outro bairro, mostra o link "Voltar para o meu bairro"
// (abre /meu-bairro sem bairro no endereço, que volta a ser o do cadastro).
// Recebe o bairro aberto, o bairro da pessoa (ou null para visitante) e aoMudar(bairro).
export default function SeletorBairro({ bairro, meuBairro, aoMudar }) {
  const vendoOutro = meuBairro && bairro !== meuBairro;

  return (
    <div className={classes.seletor}>
      <Select
        label={meuBairro ? 'Ver outro bairro' : 'Escolha um bairro'}
        data={opcoesDeBairros(meuBairro)}
        value={bairro}
        onChange={(valor) => valor && aoMudar(valor)}
        searchable
        allowDeselect={false}
        nothingFoundMessage="Nenhum bairro com esse nome"
        checkIconPosition="right"
        leftSection={<Icone nome="location_on" tamanho={20} />}
        className={classes.campo}
      />
      {vendoOutro && (
        <Anchor
          component={Link}
          to="/meu-bairro"
          fw={600}
          c="var(--cor-link)"
          className={classes.voltar}
        >
          <Group gap={4} wrap="nowrap">
            <Icone nome="home" tamanho={20} />
            Voltar para o meu bairro ({meuBairro})
          </Group>
        </Anchor>
      )}
    </div>
  );
}
