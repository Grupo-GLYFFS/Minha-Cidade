import { Modal } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Botao from './Botao';
import { CONSULTA_CELULAR } from '../logica/navegacaoCelular';
import classes from './Popup.module.css';

// Popup (Modal do Mantine) no padrão "Seus dados": cabeçalho com título e X, corpo e faixa
// de botões, com linhas de borda a borda entre as faixas. O Mantine cuida do foco, do Esc
// e do fundo escuro.
// No celular, vira folha que sobe de baixo: vai até em cima da barra de abas, com raio 20
// em cima, alça de 40 × 4, título de 20 e os botões dividindo a linha em partes iguais.
// Recebe:
// - aberto e aoFechar (fecha pelo X, pelo Esc e clicando fora);
// - titulo;
// - children: o corpo (LinhaDado e listas dentro dele vão de borda a borda);
// - botoes: os botões de 48 da faixa de baixo; secundário primeiro, principal por último
//   (o principal fica à direita);
// - largura em px (padrão 560);
// - semPadding: o corpo fica sem padding (listas de linhas de borda a borda, como a folha Mais).
export default function Popup({
  aberto,
  aoFechar,
  titulo,
  children,
  botoes,
  largura = 560,
  semPadding = false,
}) {
  const celular = useMediaQuery(CONSULTA_CELULAR);

  return (
    <Modal.Root
      opened={aberto}
      onClose={aoFechar}
      size={largura}
      centered
      classNames={{ inner: classes.inner }}
      transitionProps={celular ? { transition: 'slide-up', duration: 200 } : undefined}
    >
      <Modal.Overlay className={classes.veu} />
      <Modal.Content className={classes.caixa}>
        <span className={classes.alca} aria-hidden="true" />
        <Modal.Header className={classes.cab}>
          <Modal.Title className={classes.titulo}>{titulo}</Modal.Title>
          <Botao variante="fechar" aria-label="Fechar" onClick={aoFechar} />
        </Modal.Header>
        <Modal.Body className={semPadding ? `${classes.corpo} ${classes.semPadding}` : classes.corpo}>
          {children}
        </Modal.Body>
        {botoes && <div className={classes.botoes}>{botoes}</div>}
      </Modal.Content>
    </Modal.Root>
  );
}
