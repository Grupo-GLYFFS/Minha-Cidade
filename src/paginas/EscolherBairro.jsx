import { Navigate, useLocation } from 'react-router-dom';
import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import Botao from '../componentes/Botao';
import TituloGrupo from '../componentes/TituloGrupo';
import CardEscolherBairro from '../componentes/hub/CardEscolherBairro';
import { BAIRROS_CIDADE } from '../dados/bairrosCidade';
import { agruparPorLetra, buscarSubprefeitura } from '../logica/lugares';
import { salvarBairroEscolhido } from '../logica/bairroEscolhido';
import { useSessao } from '../contexto/useSessao';
import { useBairroDaPessoa } from '../contexto/useBairroDaPessoa';
import { useCaminhoConta } from '../contexto/useCaminhoConta';
import { valoresMeusDados } from '../logica/contas';
import classes from '../componentes/hub/EscolherBairro.module.css';

// Os 96 bairros de A a Z, agrupados pela primeira letra (sem acento)
const GRUPOS = agruparPorLetra(BAIRROS_CIDADE);

// Escolher bairro (EB-final): o que quem não tem conta vê em /meu-bairro e nas subpáginas
// enquanto não escolheu um bairro, e em /meu-bairro/escolher (o "Trocar bairro").
// Escolher um card guarda o bairro e abre a página pedida (ou o Meu bairro).
// Com conta vale o bairro do endereço: a página leva direto ao Meu bairro. Se o bairro da
// conta não é um dos 96 distritos (conta antiga), a pessoa escolhe aqui e o distrito fica salvo na conta.
export default function EscolherBairro() {
  const { pathname, search } = useLocation();
  const { usuario, atualizarConta } = useSessao();
  const { temConta, definido } = useBairroDaPessoa();
  // Na rota do "Trocar bairro" o destino é o Meu bairro; nas outras, a própria página pedida
  const destino = pathname === '/meu-bairro/escolher' ? '/meu-bairro' : pathname + search;
  // "Entrar e ver o meu bairro" volta para a página pedida (ex.: /meu-bairro/obras)
  const { entrar } = useCaminhoConta(destino);

  // Conta com distrito conhecido: o bairro é o do endereço
  if (temConta && definido) return <Navigate to="/meu-bairro" replace />;

  // Guarda a escolha: com conta, troca o bairro da conta; sem conta, guarda só no aparelho
  function escolher(bairro) {
    salvarBairroEscolhido(bairro.id);
    if (usuario) atualizarConta({ ...valoresMeusDados(usuario), bairro: bairro.nome });
  }

  return (
    <Pagina
      cabecalho={
        <CabecalhoPagina
          tipo="lista"
          titulo="Escolha um bairro"
          icone="home_pin"
          trilha={[
            { rotulo: 'Cidade de São Paulo', para: '/minha-cidade' },
            { rotulo: 'Escolher bairro' },
          ]}
          acoes={
            usuario ? undefined : (
              <Botao variante="principal" icone="login" para={entrar}>
                Entrar e ver o meu bairro
              </Botao>
            )
          }
        />
      }
    >
      {GRUPOS.map(({ letra, bairros }) => (
        <section key={letra} className={classes.grupo} aria-labelledby={`letra-${letra}`}>
          <TituloGrupo titulo={letra} contagem={bairros.length} id={`letra-${letra}`} />
          <ul className={classes.grade} aria-labelledby={`letra-${letra}`}>
            {bairros.map((bairro) => (
              <li key={bairro.id}>
                <CardEscolherBairro
                  nome={bairro.nome}
                  subprefeitura={buscarSubprefeitura(bairro.subprefeitura).nome}
                  para={destino}
                  aoEscolher={() => escolher(bairro)}
                />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Pagina>
  );
}
