import { useSearchParams } from 'react-router-dom';
import { Stack, Tabs, Text } from '@mantine/core';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import LinkVoltar from '../componentes/LinkVoltar';
import CartaoProjeto from '../componentes/cidadeAberta/CartaoProjeto';
import { PROJETOS } from '../dados/projetos';
import { VALOR_MINIMO_CONSULTA } from '../dados/cidadeAberta';
import { formatarValorCurto } from '../logica/formatos';
import { projetosEmVotacao, projetosEncerrados } from '../logica/votacao';
import classes from './ProjetosCidade.module.css';

// Grandes Projetos: lista dos projetos que passam pela opinião da população,
// separados em duas abas, "Em votação" e "Encerradas".
// A aba escolhida fica no endereço (?aba=encerradas), então o "voltar" do navegador mantém a aba.
export default function ProjetosCidade() {
  const [parametros, setParametros] = useSearchParams();
  const aba = parametros.get('aba') === 'encerradas' ? 'encerradas' : 'votacao';
  const emVotacao = projetosEmVotacao(PROJETOS);
  const encerrados = projetosEncerrados(PROJETOS);

  // Troca de aba guardando a escolha no endereço (sem criar um passo novo no histórico)
  function trocarAba(nova) {
    setParametros(nova === 'encerradas' ? { aba: nova } : {}, { replace: true });
  }

  return (
    <Stack gap="lg">
      <div>
        <LinkVoltar caminho="/cidade-aberta" rotulo="Cidade Aberta" />
        <CabecalhoPagina
          titulo="Grandes Projetos"
          descricao={`Neste app, projetos acima de ${formatarValorCurto(VALOR_MINIMO_CONSULTA)} passam por consulta à população antes de ir para a Câmara Municipal. Leia os prós e contras e dê o seu voto: cada pessoa vota uma vez.`}
        />
      </div>

      <Tabs value={aba} onChange={trocarAba} classNames={{ tab: classes.aba }}>
        <Tabs.List grow>
          <Tabs.Tab value="votacao">Em votação ({emVotacao.length})</Tabs.Tab>
          <Tabs.Tab value="encerradas">Encerradas ({encerrados.length})</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="votacao" pt="lg">
          {emVotacao.length === 0 ? (
            <Text c="var(--cor-texto-suave)">
              Nenhuma votação aberta agora. Veja o resultado das que já encerraram.
            </Text>
          ) : (
            <ul className={classes.lista}>
              {emVotacao.map((projeto) => (
                <li key={projeto.id}>
                  <CartaoProjeto projeto={projeto} nivelTitulo={2} />
                </li>
              ))}
            </ul>
          )}
        </Tabs.Panel>
        <Tabs.Panel value="encerradas" pt="lg">
          <ul className={classes.lista}>
            {encerrados.map((projeto) => (
              <li key={projeto.id}>
                <CartaoProjeto projeto={projeto} nivelTitulo={2} />
              </li>
            ))}
          </ul>
        </Tabs.Panel>
      </Tabs>

      <Text fz={12} c="var(--cor-texto-suave)">
        Dados de exemplo: projetos, valores e votos foram criados para demonstrar o app.
      </Text>
    </Stack>
  );
}
