import { Link } from 'react-router-dom';
import Icone from './Icone';
import SeloSituacao from './SeloSituacao';
import IlustracaoPedido from './pedidos/IlustracaoPedido';
import {
  buscarCategoria,
  buscarStatus,
  imagemDoPedido,
  textoUltimaMudanca,
} from '../logica/pedidos';
import classes from './CardPedido.module.css';

// Card simples de pedido, usado em toda lista de pedidos (cidade, bairro, Meus pedidos,
// pedidos parecidos, Início). O card inteiro é o link; sem botões dentro, só a seta.
// Ordem: miniatura (foto do pedido ou da categoria; sem foto da categoria, o desenho antigo
// ou o ícone) · categoria e situação ·
// título · rua e bairro · data · seta arrow_forward.
// Recebe o pedido (de dados/pedidos.js), uma ilustração <svg> opcional (midia)
// o nível do título (3 por padrão) e um selo opcional no começo da primeira linha
// (o selo de tipo "Pedido" nas listas do que a pessoa segue).
// No celular o card fica sem a miniatura e com o texto secundário numa linha só.
// base: início da rota do detalhe (ex.: "/meu-bairro/pedidos"); sem ela, /pedidos/:id.
export default function CardPedido({ pedido, midia, nivelTitulo = 3, selo, base = '/pedidos' }) {
  const categoria = buscarCategoria(pedido.categoria);
  const status = buscarStatus(pedido.status);
  const Titulo = `h${nivelTitulo}`;

  // Miniatura: mídia recebida, foto do pedido ou da categoria, desenho antigo ou ícone
  const imagem = imagemDoPedido(pedido);
  const nomeDesenho =
    pedido.ilustracao || (pedido.categoria === 'boca-de-lobo' ? 'bocaDeLobo' : null);
  let miniatura = <Icone nome={categoria?.icone ?? 'assignment'} tamanho={32} />;
  if (midia) miniatura = midia;
  else if (imagem) miniatura = <img src={imagem.src} alt={imagem.alt} loading="lazy" />;
  else if (nomeDesenho) miniatura = <IlustracaoPedido nome={nomeDesenho} />;
  const semImagem = !midia && !imagem && !nomeDesenho;

  return (
    <Link to={`${base}/${pedido.id}`} className={`${classes.card} ${classes.pedido}`}>
      <span
        className={semImagem ? `${classes.midia} ${classes.midiaIcone}` : classes.midia}
        aria-hidden="true"
      >
        {miniatura}
      </span>
      <div className={classes.texto}>
        <span className={classes.topo}>
          {selo}
          <span className={classes.categoria}>{categoria?.rotulo}</span>
          {status && <SeloSituacao cor={status.cor}>{status.rotulo}</SeloSituacao>}
        </span>
        <Titulo className={classes.titulo}>{pedido.titulo}</Titulo>
        <span className={`${classes.meta} ${classes.metaPedido}`}>
          <Icone nome="location_on" tamanho={18} />
          {pedido.rua}, {pedido.bairro}
          <span aria-hidden="true">·</span>
          {textoUltimaMudanca(pedido)}
        </span>
      </div>
      <Icone nome="arrow_forward" tamanho={22} className={classes.seta} />
    </Link>
  );
}
