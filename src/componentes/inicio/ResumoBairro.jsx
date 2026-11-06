import { Text, Title } from '@mantine/core';
import Cartao from '../Cartao';
import Icone from '../Icone';
import SecaoCabecalho from '../SecaoCabecalho';
import TextoResponsivo from '../TextoResponsivo';
import { buscarBairro, textoProximaColeta } from '../../logica/bairros';
import { proximoDiaDaLista } from '../../logica/datas';
import { pluralizar } from '../../logica/formatos';
import { resumirPedidosDoBairro } from '../../logica/pedidos';
import { contarObrasDoBairro } from '../../logica/obras';
import { OBRAS } from '../../dados/obras';
import classes from './ResumoBairro.module.css';

// Texto quando o app ainda não tem a coleta ou a UBS do bairro (sem inventar dados)
const SEM_DADO = 'Consulte em Meu Bairro';

// Resumo do bairro da pessoa: próxima coleta, coleta seletiva, UBS, pedidos abertos e obras.
// Recebe a pessoa usando o app e a lista de todos os pedidos (para contar os do bairro).
// As obras vêm de Obras da Cidade (as do bairro que ainda não terminaram).
// A coleta e a UBS vêm dos mesmos dados e contas da página Meu Bairro, para as duas concordarem.
// Bairro que o app não conhece mostra "Consulte em Meu Bairro".
export default function ResumoBairro({ usuario, pedidos }) {
  const dados = buscarBairro(usuario.bairro);
  // Nome do bairro como está nos dados, para contar os pedidos e obras do mesmo jeito que Meu Bairro
  const bairro = dados?.bairro ?? usuario.bairro;
  const coleta = dados?.coleta;
  const proximaColeta = coleta ? textoProximaColeta(coleta) : SEM_DADO;
  const { abertos } = resumirPedidosDoBairro(pedidos, bairro);
  const obras = contarObrasDoBairro(OBRAS, bairro);
  const totalPedidos = pluralizar(abertos, 'pedido', 'pedidos');

  // Cada linha da lista: ícone, rótulo e valor (versão longa e, se precisar, curta para o celular)
  const itens = [
    {
      icone: 'delete',
      rotulo: 'Próxima coleta',
      valor: coleta ? `${proximaColeta} (lixo comum)` : SEM_DADO,
      valorCurto: proximaColeta,
    },
    {
      icone: 'recycling',
      rotulo: 'Coleta seletiva',
      valor: coleta ? proximoDiaDaLista(coleta.seletiva) : SEM_DADO,
    },
    { icone: 'local_hospital', rotulo: 'Sua UBS', valor: dados?.ubs.nome ?? SEM_DADO },
    {
      icone: 'campaign',
      rotulo: 'Pedidos abertos e obras no bairro',
      rotuloCurto: 'No bairro',
      valor: `${totalPedidos} · ${pluralizar(obras, 'obra em andamento', 'obras em andamento')}`,
      valorCurto: `${totalPedidos} · ${pluralizar(obras, 'obra', 'obras')}`,
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
          {bairro}
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
