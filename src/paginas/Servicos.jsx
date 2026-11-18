import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CabecalhoAntigo from '../componentes/CabecalhoAntigo';
import SecaoCabecalho from '../componentes/SecaoCabecalho';
import AtalhosServicos from '../componentes/inicio/AtalhosServicos';
import CampoBuscaServicos from '../componentes/servicos/CampoBuscaServicos';
import GradeCategorias from '../componentes/servicos/GradeCategorias';
import { SERVICOS } from '../dados/servicos';
import { montarCaminhoBusca } from '../logica/busca';
import { servicosMaisUsados } from '../logica/servicos';
import classes from './Servicos.module.css';

const MAIS_USADOS = servicosMaisUsados();

// Serviços: catálogo completo com busca, os mais usados e todos os assuntos.
// A busca leva para a página de Busca com o texto digitado.
export default function Servicos() {
  const [texto, setTexto] = useState('');
  const navigate = useNavigate();

  return (
    <div className={classes.pagina}>
      <div className={classes.topo}>
        <CabecalhoAntigo
          titulo="Serviços"
          descricao={`Os ${SERVICOS.length} serviços da prefeitura em um só lugar. Busque pelo nome ou escolha um assunto.`}
        />
        <CampoBuscaServicos
          id="busca-servicos"
          valor={texto}
          aoMudar={setTexto}
          aoEnviar={() => navigate(montarCaminhoBusca(texto))}
          comBotao
        />
      </div>

      <AtalhosServicos servicos={MAIS_USADOS} titulo="Mais usados" caminhoVerTodos={null} />

      <section aria-labelledby="categorias-titulo">
        <SecaoCabecalho id="categorias-titulo" titulo="Assuntos" />
        <GradeCategorias />
      </section>
    </div>
  );
}
