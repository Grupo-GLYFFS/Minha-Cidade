import { Text, Title } from '@mantine/core';
import Cartao from '../Cartao';
import Icone from '../Icone';
import SecaoCabecalho from '../SecaoCabecalho';
import TextoResponsivo from '../TextoResponsivo';
import { proximoDiaDaLista } from '../../logica/datas';
import { pluralizar } from '../../logica/formatos';
import { resumirPedidosDoBairro } from '../../logica/pedidos';
import classes from './ResumoBairro.module.css';

// Resumo do bairro da pessoa: próxima coleta, coleta seletiva, UBS e pedidos abertos.
// Recebe a pessoa usando o app e a lista de todos os pedidos (para contar os do bairro).
export default function ResumoBairro({ usuario, pedidos }) {
  const { comum, seletiva } = usuario.coleta;
  const proximaColeta = `${proximoDiaDaLista(comum.dias)}, a partir das ${comum.horario}`;
  const { abertos, emExecucao } = resumirPedidosDoBairro(pedidos, usuario.bairro);
  const totalPedidos = pluralizar(abertos, 'pedido', 'pedidos');

  // Cada linha da lista: ícone, rótulo e valor (versão longa e, se precisar, curta para o celular)
  const itens = [
    {
      icone: 'delete',
      rotulo: 'Próxima coleta',
      valor: `${proximaColeta} (lixo comum)`,
      valorCurto: proximaColeta,
    },
    { icone: 'recycling', rotulo: 'Coleta seletiva', valor: proximoDiaDaLista(seletiva.dias) },
    { icone: 'local_hospital', rotulo: 'Sua UBS', valor: usuario.ubs },
    {
      icone: 'campaign',
      rotulo: 'Pedidos abertos no bairro',
      rotuloCurto: 'No bairro',
      valor: `${totalPedidos} · ${pluralizar(emExecucao, 'obra em andamento', 'obras em andamento')}`,
      valorCurto: `${totalPedidos} · ${pluralizar(emExecucao, 'obra', 'obras')}`,
    },
  ];

  return (
    <section aria-labelledby="bairro-titulo">
      <SecaoCabecalho
        id="bairro-titulo"
        titulo="Meu Bairro"
        caminho="/meu-bairro"
        rotuloLink="Ver meu bairro"
        rotuloLinkCurto="Ver tudo"
      />
      <Cartao>
        <Title order={3} fz={{ base: 16, md: 17 }} fw={700} mb={4}>
          {usuario.bairro}
        </Title>
        <ul className={classes.lista}>
          {itens.map((item) => (
            <li key={item.rotulo} className={classes.item}>
              <span className={classes.icone}>
                <Icone nome={item.icone} />
              </span>
              <span className={classes.textos}>
                <Text component="span" fz={{ base: 12, md: 13 }} c="var(--cor-texto-suave)">
                  <TextoResponsivo longo={item.rotulo} curto={item.rotuloCurto} />
                </Text>
                <Text component="span" fz={{ base: 14, md: 15 }} fw={600}>
                  <TextoResponsivo longo={item.valor} curto={item.valorCurto} />
                </Text>
              </span>
            </li>
          ))}
        </ul>
      </Cartao>
    </section>
  );
}
