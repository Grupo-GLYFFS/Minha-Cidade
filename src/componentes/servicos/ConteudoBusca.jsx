import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Stack, Text, Title, VisuallyHidden, useMantineTheme } from '@mantine/core';
import CabecalhoPagina from '../CabecalhoPagina';
import CampoBuscaServicos from './CampoBuscaServicos';
import GradeCategorias from './GradeCategorias';
import ListaServicos from './ListaServicos';
import SemResultadosBusca from './SemResultadosBusca';
import SugestoesBusca from './SugestoesBusca';
import { SERVICOS } from '../../dados/servicos';
import { buscarServicos } from '../../logica/buscaServicos';
import classes from './ConteudoBusca.module.css';

// Texto do total encontrado. Recebe a quantidade; devolve, por exemplo, "8 serviços encontrados".
function textoTotal(quantidade) {
  if (quantidade === 0) return 'Nenhum serviço encontrado';
  return quantidade === 1 ? '1 serviço encontrado' : `${quantidade} serviços encontrados`;
}

// Conteúdo da página de Busca: campo, resultados ao vivo, sugestões e assuntos.
// Recebe o texto inicial (vindo do endereço). Cada letra digitada atualiza o ?q= do endereço.
// No computador o campo já recebe o foco; no celular não, para o teclado não cobrir as sugestões.
export default function ConteudoBusca({ textoInicial }) {
  const [texto, setTexto] = useState(textoInicial);
  const [, setParametros] = useSearchParams();
  const refCampo = useRef(null);
  const tema = useMantineTheme();
  const resultados = buscarServicos(texto, SERVICOS);
  const temBusca = texto.trim() !== '';

  // Foco automático só em telas de computador (a partir do ponto "md" do tema)
  useEffect(() => {
    if (window.matchMedia(`(min-width: ${tema.breakpoints.md})`).matches) {
      refCampo.current?.focus();
    }
  }, [tema.breakpoints.md]);

  // Guarda o texto na tela e no endereço, sem criar uma entrada nova no histórico
  function mudarTexto(novo) {
    setTexto(novo);
    setParametros(novo.trim() ? { q: novo } : {}, { replace: true });
  }

  // Sugestão escolhida: preenche o campo e devolve o foco a ele
  function escolherSugestao(termo) {
    mudarTexto(termo);
    refCampo.current?.focus();
  }

  return (
    <div className={classes.pagina}>
      <div className={classes.topo}>
        <CabecalhoPagina
          titulo="Busca"
          descricao="Encontre qualquer serviço da prefeitura pelo nome ou por uma palavra do dia a dia."
        />
        <CampoBuscaServicos
          id="busca-pagina"
          valor={texto}
          aoMudar={mudarTexto}
          // Enter só fecha o teclado do celular: os resultados já aparecem enquanto digita
          aoEnviar={() => refCampo.current?.blur()}
          refCampo={refCampo}
        />
        <Text role="status" aria-live="polite" fz={15} fw={600} c="var(--cor-texto-suave)">
          {temBusca ? textoTotal(resultados.length) : ''}
        </Text>
      </div>

      {temBusca && resultados.length > 0 && (
        <section aria-labelledby="resultados-titulo">
          <VisuallyHidden>
            <h2 id="resultados-titulo">Resultados</h2>
          </VisuallyHidden>
          <ListaServicos servicos={resultados} />
        </section>
      )}

      {temBusca && resultados.length === 0 && <SemResultadosBusca texto={texto} />}

      {!temBusca && (
        <>
          <Stack component="section" gap="sm" aria-labelledby="sugestoes-titulo">
            <Title order={2} id="sugestoes-titulo" fz={{ base: 18, md: 20 }} fw={700}>
              Buscas populares
            </Title>
            <SugestoesBusca aoEscolher={escolherSugestao} />
          </Stack>
          <Stack component="section" gap="sm" aria-labelledby="assuntos-titulo">
            <Title order={2} id="assuntos-titulo" fz={{ base: 18, md: 20 }} fw={700}>
              Assuntos
            </Title>
            <GradeCategorias />
          </Stack>
        </>
      )}
    </div>
  );
}
