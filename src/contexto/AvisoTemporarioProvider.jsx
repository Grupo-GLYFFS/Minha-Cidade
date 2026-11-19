import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ContextoAvisoTemporario } from './ContextoAvisoTemporario';
import AvisoTemporario from '../componentes/AvisoTemporario';

// Quanto tempo o aviso fica na tela antes de sumir sozinho
const DURACAO_MS = 5000;

// Guarda o aviso temporário que confirma uma ação (abrir pedido, votar, seguir…).
// Só existe um aviso por vez: um novo troca o anterior e recomeça a contagem.
// O aviso não entra nas Notificações (o sino); ele só aparece e some.
// Recebe as telas do app (children), que mostram avisos com useAvisoTemporario().
export default function AvisoTemporarioProvider({ children }) {
  const [aviso, setAviso] = useState(null);
  // Enquanto o mouse ou o foco estão no aviso, ele não some
  const [pausado, setPausado] = useState(false);
  const contador = useRef(0);

  // Mostra um aviso. Recebe o texto curto e, se quiser, o link do "Ver" (rota do app).
  const mostrarAviso = useCallback((texto, link) => {
    contador.current += 1;
    setPausado(false);
    setAviso({ id: contador.current, texto, link });
  }, []);

  const fechar = useCallback(() => {
    setAviso(null);
    setPausado(false);
  }, []);

  // Conta os 5 segundos de cada aviso (para enquanto ele está pausado)
  useEffect(() => {
    if (!aviso || pausado) return undefined;
    const relogio = setTimeout(fechar, DURACAO_MS);
    return () => clearTimeout(relogio);
  }, [aviso, pausado, fechar]);

  const valor = useMemo(() => ({ mostrarAviso }), [mostrarAviso]);

  return (
    <ContextoAvisoTemporario.Provider value={valor}>
      {children}
      <AvisoTemporario aviso={aviso} aoFechar={fechar} aoPausar={setPausado} />
    </ContextoAvisoTemporario.Provider>
  );
}
