import { useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import Chip from '../Chip';
import CampoBusca from './CampoBusca';
import PopupBusca from './PopupBusca';
import { caminhoCardServico, servicosMaisUsados } from '../../logica/servicos';
import { CONSULTA_CELULAR } from '../../logica/navegacaoCelular';
import classes from './BuscaCabecalho.module.css';

// Atalhos "Mais usados", na ordem do catálogo
const MAIS_USADOS = servicosMaisUsados();

// Parte de baixo do cabeçalho de Serviços: a busca grande e os atalhos "Mais usados".
// No celular, tocar no campo (ou em "Buscar") abre a busca em tela cheia (PopupBusca).
// Recebe o texto da busca (valor), aoMudar(texto) e aoEnviar().
export default function BuscaCabecalho({ valor, aoMudar, aoEnviar }) {
  const celular = useMediaQuery(CONSULTA_CELULAR);
  const [buscaAberta, setBuscaAberta] = useState(false);

  // Celular: Enter, espaço ou toque no campo abrem a busca em tela cheia
  function teclarCelular(evento) {
    if (evento.key === 'Enter' || evento.key === ' ') {
      evento.preventDefault();
      setBuscaAberta(true);
    }
  }

  const propsCelular = celular
    ? {
        readOnly: true,
        'aria-haspopup': 'dialog',
        onClick: () => setBuscaAberta(true),
        aoTeclar: teclarCelular,
        aoEnviar: () => setBuscaAberta(true),
      }
    : {};

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
        {...propsCelular}
      />
      {celular && <PopupBusca aberto={buscaAberta} aoFechar={() => setBuscaAberta(false)} />}
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
