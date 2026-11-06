import { Link } from 'react-router-dom';
import { Button, Group, Text, Title } from '@mantine/core';
import Cartao from '../Cartao';
import Icone from '../Icone';
import classes from '../pedidos/SemResultados.module.css';

// Aviso quando a busca não encontra nenhum serviço. Dá dicas e dois caminhos:
// ver todos os serviços ou falar com a Ouvidoria. Recebe o texto buscado.
export default function SemResultadosBusca({ texto }) {
  return (
    <Cartao className={classes.vazio}>
      <span className={classes.icone}>
        <Icone nome="search_off" tamanho={28} />
      </span>
      <Title order={2} fz={18} fw={700} mt="md">
        Nenhum serviço encontrado para “{texto.trim()}”.
      </Title>
      <Text c="var(--cor-texto-suave)" mt={4} maw={440}>
        Tente outra palavra, como “lixo” ou “IPTU”, confira se está escrito certo ou use menos
        palavras. Se não achar o que precisa, a Ouvidoria ajuda.
      </Text>
      <Group justify="center" gap="sm" mt="lg">
        <Button component={Link} to="/servicos/ouvidoria">
          Falar com a Ouvidoria
        </Button>
        <Button component={Link} to="/servicos" variant="default">
          Ver todos os serviços
        </Button>
      </Group>
    </Cartao>
  );
}
