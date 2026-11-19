import { useWindowEvent } from '@mantine/hooks';

// Fecha um Modal com o Esc.
// O Esc do próprio Mantine lê e.target.getAttribute(...) e dá TypeError quando o alvo do
// keydown não é um elemento (ex.: o document). Por isso os popups usam closeOnEscape={false}
// e este gancho, que confere o alvo antes.
// Recebe aberto, aoFechar() e a ref da caixa do Modal (com outro Modal por cima, só ele fecha).
export default function useFecharComEsc(aberto, aoFechar, refCaixa) {
  useWindowEvent(
    'keydown',
    (evento) => {
      if (!aberto || evento.key !== 'Escape' || evento.isComposing) return;
      const alvo = evento.target;
      if (alvo instanceof Element) {
        // Listas do Mantine que tratam o Esc sozinhas
        if (alvo.getAttribute('data-mantine-stop-propagation') === 'true') return;
        // O foco está em outro Modal, aberto por cima deste
        const outraCaixa = alvo.closest('.mantine-Modal-content');
        if (outraCaixa && refCaixa?.current && !refCaixa.current.contains(alvo)) return;
      }
      aoFechar();
    },
    { capture: true },
  );
}
