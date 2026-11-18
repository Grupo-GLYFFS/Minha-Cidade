import classes from './SeloSituacao.module.css';

// Selo redondo com a situação de um item (pedido, obra, solicitação, votação, alerta).
// Recebe a cor (uma das 5 fixas) e o texto (children). A bolinha repete a cor; o texto explica.
// cinza = recebido, solicitado, enviado · azul = em andamento, agendado, aprovado ·
// ambar = em análise, atrasada, alerta · verde = concluída, no prazo · vermelho = recusada, parada, emergência.
export default function SeloSituacao({ cor = 'cinza', children }) {
  return <span className={`${classes.selo} ${classes[cor]}`}>{children}</span>;
}
