import Chip from '../Chip';
import CampoBusca from './CampoBusca';
import { caminhoCardServico, servicosMaisUsados } from '../../logica/servicos';
import classes from './BuscaCabecalho.module.css';

// Atalhos "Mais usados", na ordem do catálogo
const MAIS_USADOS = servicosMaisUsados();

// Parte de baixo do cabeçalho de Serviços: a busca grande e os atalhos "Mais usados".
// Recebe o texto da busca (valor), aoMudar(texto) e aoEnviar().
export default function BuscaCabecalho({ valor, aoMudar, aoEnviar }) {
  return (
    <div className={classes.bloco}>
      <CampoBusca
        id="busca-servicos"
        rotulo="Buscar serviços e informações"
        placeholder="O que você precisa? Ex.: IPTU, vacina, poda de árvore"
        valor={valor}
        aoMudar={aoMudar}
        aoEnviar={aoEnviar}
        grande
      />
      <p className={classes.rotulo} id="mais-usados">
        Mais usados
      </p>
      <ul className={classes.atalhos} aria-labelledby="mais-usados">
        {MAIS_USADOS.map((servico) => (
          <li key={servico.id}>
            <Chip para={caminhoCardServico(servico)} icone={servico.icone}>
              {servico.nomeCurto ?? servico.nome}
            </Chip>
          </li>
        ))}
      </ul>
    </div>
  );
}
