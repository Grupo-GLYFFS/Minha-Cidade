import { useRef } from 'react';
import { Modal } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Botao from './Botao';
import { CONSULTA_CELULAR } from '../logica/navegacaoCelular';
import useFecharComEsc from './useFecharComEsc';
import classes from './Popup.module.css';

// Popup (Modal do Mantine) no padrão "Seus dados": cabeçalho com título e X, corpo e faixa
// de botões, com linhas de borda a borda entre as faixas. O Mantine cuida do foco e do fundo
// escuro; o Esc fica com o useFecharComEsc.
// No celular, vira folha que sobe de baixo: vai até o fim da tela, por cima da barra de abas,
// com raio 20 em cima, alça de 40 × 4, título de 20 e os botões dividindo a linha em partes
// iguais.
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
  const caixa = useRef(null);
  useFecharComEsc(aberto, aoFechar, caixa);

  return (
    <Modal.Root
      opened={aberto}
      onClose={aoFechar}
      size={largura}
      centered
      closeOnEscape={false}
      classNames={{ inner: classes.inner }}
      transitionProps={celular ? { transition: 'slide-up', duration: 200 } : undefined}
    >
      <Modal.Overlay className={classes.veu} />
      <Modal.Content ref={caixa} className={classes.caixa}>
        <span className={classes.alca} aria-hidden="true" />
        <Modal.Header className={classes.cab}>
          <Modal.Title className={classes.titulo}>{titulo}</Modal.Title>
          <Botao variante="fechar" aria-label="Fechar" onClick={aoFechar} />
        </Modal.Header>
        <Modal.Body
          className={semPadding ? `${classes.corpo} ${classes.semPadding}` : classes.corpo}
        >
          {children}
        </Modal.Body>
        {botoes && <div className={classes.botoes}>{botoes}</div>}
      </Modal.Content>
    </Modal.Root>
  );
}
