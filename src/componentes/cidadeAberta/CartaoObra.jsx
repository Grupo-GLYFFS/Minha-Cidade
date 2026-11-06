import { Link } from 'react-router-dom';
import { Anchor, Group, Progress, Text, Title } from '@mantine/core';
import Cartao from '../Cartao';
import Icone from '../Icone';
import EtiquetaSituacaoObra from './EtiquetaSituacaoObra';
import { formatarMesAno } from '../../logica/datas';
import { formatarValorCurto } from '../../logica/formatos';
import { buscarSituacaoObra, origemDaObra } from '../../logica/obras';
import classes from './CartaoObra.module.css';

// Cartão de uma obra: tipo, situação (semáforo com texto e ícone), título, onde fica,
// quanto já foi feito e pago, a previsão de entrega e, se estiver atrasada ou parada, o motivo.
// Quando a obra veio de um pedido de moradores ou de um projeto votado, mostra o link da origem.
// Recebe a obra e o nível do título (3 por padrão).
export default function CartaoObra({ obra, nivelTitulo = 3 }) {
  const situacao = buscarSituacaoObra(obra.situacao);
  const origem = origemDaObra(obra);
  const concluida = obra.situacao === 'concluida';

  return (
    <Cartao component="article" className={classes.cartao}>
      <Group justify="space-between" gap="sm" mb="sm">
        <span className={classes.tipo}>
          <Icone nome={obra.icone} tamanho={18} />
          {obra.tipo}
        </span>
        <EtiquetaSituacaoObra situacao={obra.situacao} />
      </Group>

      <Title order={nivelTitulo} fz={{ base: 16, md: 17 }} fw={700} lh={1.3}>
        {obra.titulo}
      </Title>
      <Group gap={4} wrap="nowrap" mt={4} c="var(--cor-texto-suave)" align="flex-start">
        <Icone nome="location_on" tamanho={18} />
        <Text fz={{ base: 13, md: 14 }} c="inherit">
          {obra.bairro} · {obra.regiao}
        </Text>
      </Group>

      <Group justify="space-between" gap="sm" mt="md" mb={4}>
        <Text fz={15} fw={700}>
          {obra.percentual}% executado
        </Text>
        <Text fz={13} c="var(--cor-texto-suave)">
          {concluida
            ? `Concluída em ${formatarMesAno(obra.previsaoFim)}`
            : `Previsão: ${formatarMesAno(obra.previsaoFim)}`}
        </Text>
      </Group>
      <Progress
        value={obra.percentual}
        color={situacao?.corBarra}
        size={10}
        radius="xl"
        aria-hidden="true"
        classNames={{ root: classes.trilho }}
      />
      <Text fz={14} mt="sm">
        <strong>{formatarValorCurto(obra.valorPago)} pagos</strong> de{' '}
        {formatarValorCurto(obra.valorTotal)}
      </Text>

      {obra.motivo && (
        <div className={classes.motivo}>
          <Icone nome="info" tamanho={20} />
          <span>
            <strong>Por que está {situacao?.rotulo.toLowerCase()}:</strong> {obra.motivo}
          </span>
        </div>
      )}

      <div className={classes.detalhes}>
        <div>
          <Text fz="inherit" c="inherit">
            {obra.endereco} · {obra.empresa}
          </Text>
          {origem && (
            <Group gap={4} wrap="nowrap" mt={4}>
              <Icone nome={origem.icone} tamanho={18} />
              <Text fz="inherit" c="inherit">
                Origem:{' '}
                <Anchor
                  component={Link}
                  to={origem.caminho}
                  fz="inherit"
                  fw={600}
                  c="var(--cor-link)"
                >
                  {origem.texto}
                </Anchor>
              </Text>
            </Group>
          )}
        </div>
      </div>
    </Cartao>
  );
}
