import { Modal } from '@mantine/core';
import Botao from './Botao';
import classes from './Popup.module.css';

// Popup (Modal do Mantine) no padrão "Seus dados": cabeçalho com título e X, corpo e faixa
// de botões, com linhas de borda a borda entre as faixas. O Mantine cuida do foco, do Esc
// e do fundo escuro.
// Recebe:
// - aberto e aoFechar (fecha pelo X, pelo Esc e clicando fora);
// - titulo;
// - children: o corpo (LinhaDado e listas dentro dele vão de borda a borda);
// - botoes: os botões de 48 da faixa de baixo; secundário primeiro, principal por último
//   (o principal fica à direita);
// - largura em px (padrão 560).
export default function Popup({ aberto, aoFechar, titulo, children, botoes, largura = 560 }) {
  return (
    <Modal.Root opened={aberto} onClose={aoFechar} size={largura} centered>
      <Modal.Overlay />
      <Modal.Content className={classes.caixa}>
        <Modal.Header className={classes.cab}>
          <Modal.Title className={classes.titulo}>{titulo}</Modal.Title>
          <Botao variante="fechar" aria-label="Fechar" onClick={aoFechar} />
        </Modal.Header>
        <Modal.Body className={classes.corpo}>{children}</Modal.Body>
        {botoes && <div className={classes.botoes}>{botoes}</div>}
      </Modal.Content>
    </Modal.Root>
  );
}
