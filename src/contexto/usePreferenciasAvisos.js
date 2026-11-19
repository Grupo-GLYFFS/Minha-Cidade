import { useCallback, useState } from 'react';
import { lerDado, salvarDado } from '../armazenamento';
import { completarPreferencias } from '../logica/avisosConta';

// Nome com que as preferências de aviso ficam guardadas no navegador
const CHAVE_AVISOS = 'preferencias-avisos';

// Preferências de aviso da página Configurações: alertas de emergência (ligados e canais)
// e os canais de cada tipo de notificação. Cada mudança fica salva no navegador.
// Devolve { preferencias, ligarAlertas(ligados), mudarCanais(idTipo, canais) };
// idTipo "alertas" muda os canais dos alertas de emergência.
export function usePreferenciasAvisos() {
  const [preferencias, setPreferencias] = useState(() =>
    completarPreferencias(lerDado(CHAVE_AVISOS, null)),
  );

  // Troca as preferências e salva. Recebe uma função que monta as novas a partir das atuais.
  const mudar = useCallback((calcular) => {
    setPreferencias((atual) => {
      const novas = calcular(atual);
      salvarDado(CHAVE_AVISOS, novas);
      return novas;
    });
  }, []);

  // Liga ou desliga os alertas de emergência. Recebe true ou false.
  const ligarAlertas = useCallback(
    (ligados) => mudar((atual) => ({ ...atual, alertas: { ...atual.alertas, ligados } })),
    [mudar],
  );

  // Troca os canais de um tipo. Recebe o id do tipo e a lista de canais.
  const mudarCanais = useCallback(
    (idTipo, canais) =>
      mudar((atual) =>
        idTipo === 'alertas'
          ? { ...atual, alertas: { ...atual.alertas, canais } }
          : { ...atual, canais: { ...atual.canais, [idTipo]: canais } },
      ),
    [mudar],
  );

  return { preferencias, ligarAlertas, mudarCanais };
}
