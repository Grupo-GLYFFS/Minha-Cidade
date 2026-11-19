import { Link } from 'react-router-dom';
import SecaoCard from '../SecaoCard';
import LinhaDado from '../LinhaDado';
import Icone from '../Icone';
import { usePedidos } from '../../contexto/usePedidos';
import { PROJETOS } from '../../dados/projetos';
import { buscarProjeto, caminhoVotacao } from '../../logica/votacao';
import classes from './FichaObra.module.css';

// Seção "Ficha da obra": o motivo do atraso ou da parada (em linha longa, primeiro),
// empresa, endereço, bairro, subprefeitura e de onde a obra veio (link para o pedido
// ou para a votação).
// Recebe a obra.
export default function FichaObra({ obra }) {
  const { pedidos } = usePedidos();

  // Linha da origem: o pedido de moradores ou a votação que deu origem à obra
  let origem = null;
  if (obra.origem?.tipo === 'pedido') {
    const pedido = pedidos.find((item) => item.id === obra.origem.id);
    origem = {
      icone: 'campaign',
      rotulo: 'Veio de um pedido',
      titulo: pedido?.titulo,
      para: `/pedidos/${obra.origem.id}`,
    };
  } else if (obra.origem?.tipo === 'projeto') {
    const projeto = obra.origem.id && buscarProjeto(PROJETOS, obra.origem.id);
    origem = {
      icone: 'how_to_vote',
      rotulo: 'Escolhida pelos moradores',
      titulo: projeto?.titulo,
      para: projeto ? caminhoVotacao(projeto) : null,
    };
  }

  const motivo = obra.situacao === 'parada' ? 'Por que parou' : 'Por que atrasou';

  return (
    <SecaoCard titulo="Ficha da obra" lista>
      {obra.motivo && (
        <div className={classes.longa}>
          <Icone nome="info" tamanho={20} className={classes.icone} />
          <div>
            <p className={classes.rotulo}>{motivo}</p>
            <p className={classes.texto}>{obra.motivo}</p>
          </div>
        </div>
      )}
      <LinhaDado icone="engineering" rotulo="Empresa" valor={obra.empresa} />
      <LinhaDado icone="location_on" rotulo="Endereço" valor={obra.endereco} />
      <LinhaDado icone="home_work" rotulo="Bairro" valor={obra.bairro} />
      <LinhaDado
        icone="account_balance"
        rotulo="Subprefeitura"
        valor={`Subprefeitura ${obra.subprefeitura}`}
      />
      {origem && (
        <LinhaDado
          icone={origem.icone}
          rotulo={origem.rotulo}
          valor={
            origem.para && origem.titulo ? (
              <Link to={origem.para} className={classes.link}>
                {origem.titulo}
              </Link>
            ) : undefined
          }
        />
      )}
    </SecaoCard>
  );
}
