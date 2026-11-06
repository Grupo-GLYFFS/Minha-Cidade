import { useSearchParams } from 'react-router-dom';
import { Button, Group, Stack, Text } from '@mantine/core';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import Cartao from '../componentes/Cartao';
import Icone from '../componentes/Icone';
import LinkVoltar from '../componentes/LinkVoltar';
import CartaoObra from '../componentes/cidadeAberta/CartaoObra';
import FiltrosObras from '../componentes/cidadeAberta/FiltrosObras';
import ResumoObras from '../componentes/cidadeAberta/ResumoObras';
import { OBRAS } from '../dados/obras';
import { SITUACOES_OBRA } from '../dados/situacaoObra';
import { REGIOES } from '../dados/regioes';
import { pluralizar } from '../logica/formatos';
import { TODAS_SITUACOES, filtrarObras } from '../logica/obras';
import classes from './ObrasCidade.module.css';

// Lê os filtros do endereço (?regiao=Zona Sul&situacao=atrasada).
// Recebe os parâmetros; devolve { regiao, situacao } (valores desconhecidos viram "sem filtro").
function lerFiltros(parametros) {
  const regiao = parametros.get('regiao') ?? '';
  const situacao = parametros.get('situacao') ?? TODAS_SITUACOES;
  return {
    regiao: REGIOES.some((item) => item.nome === regiao) ? regiao : '',
    situacao: SITUACOES_OBRA.some((item) => item.id === situacao) ? situacao : TODAS_SITUACOES,
  };
}

// Obras da Cidade: todas as obras da prefeitura com % executado, valor pago, previsão
// e situação (no prazo, atrasada, parada ou concluída). Filtra por região e por situação;
// os filtros ficam no endereço, então voltar ou recarregar mantém a mesma lista.
export default function ObrasCidade() {
  const [parametros, setParametros] = useSearchParams();
  const filtros = lerFiltros(parametros);
  const obras = filtrarObras(OBRAS, filtros);
  const temFiltro = filtros.regiao !== '' || filtros.situacao !== TODAS_SITUACOES;

  // Troca um filtro e grava no endereço (sem guardar os filtros vazios)
  function mudarFiltro(nome, valor) {
    const novos = { ...filtros, [nome]: valor };
    const limpos = {};
    if (novos.regiao) limpos.regiao = novos.regiao;
    if (novos.situacao !== TODAS_SITUACOES) limpos.situacao = novos.situacao;
    setParametros(limpos, { replace: true });
  }

  function limparFiltros() {
    setParametros({}, { replace: true });
  }

  return (
    <Stack gap="lg">
      <div>
        <LinkVoltar caminho="/cidade-aberta" rotulo="Cidade Aberta" />
        <CabecalhoPagina
          titulo="Obras da Cidade"
          descricao="Acompanhe quanto cada obra já andou, quanto foi pago e se está dentro do prazo."
        />
      </div>

      <FiltrosObras filtros={filtros} aoMudar={mudarFiltro} />

      <Group justify="space-between" gap="sm" mih={36}>
        {/* Anuncia o total sempre que um filtro muda */}
        <Text role="status" aria-live="polite" fw={600} fz={{ base: 14, md: 15 }}>
          {pluralizar(obras.length, 'obra', 'obras')}
        </Text>
        {temFiltro && (
          <Button
            variant="subtle"
            size="sm"
            c="var(--cor-link)"
            leftSection={<Icone nome="close" tamanho={18} />}
            onClick={limparFiltros}
          >
            Limpar filtros
          </Button>
        )}
      </Group>

      {obras.length === 0 ? (
        <Cartao>
          <Text c="var(--cor-texto-suave)">
            Nenhuma obra com esses filtros. Escolha outra região ou outra situação.
          </Text>
          <Button variant="light" h={48} mt="md" onClick={limparFiltros}>
            Ver todas as obras
          </Button>
        </Cartao>
      ) : (
        <>
          <ResumoObras obras={obras} />
          <ul className={classes.lista}>
            {obras.map((obra) => (
              <li key={obra.id}>
                <CartaoObra obra={obra} nivelTitulo={2} />
              </li>
            ))}
          </ul>
        </>
      )}

      <Text fz={12} c="var(--cor-texto-suave)">
        Dados de exemplo: obras, valores, empresas e datas foram criados para demonstrar o app.
      </Text>
    </Stack>
  );
}
