import Etiqueta from './Etiqueta';
import { buscarStatus } from '../logica/pedidos';

// Etiqueta com o status de um pedido (ex.: "Em execução"), na cor daquele status.
// Recebe o id do status (ex.: "em-execucao").
export default function EtiquetaStatus({ status }) {
  const dados = buscarStatus(status);
  if (!dados) return null;

  return <Etiqueta texto={dados.rotulo} corFundo={dados.corFundo} corTexto={dados.corTexto} />;
}
