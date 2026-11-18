import { Outlet } from 'react-router-dom';
import Pagina from './Pagina';

// Moldura das telas feitas antes da base nova: topo, rodapé e a coluna larga (1088),
// porque essas telas ainda trazem o próprio título e foram desenhadas para mais largura.
// TODO: apagar quando todas as telas usarem <Pagina> direto
export default function LayoutAntigo() {
  return (
    <Pagina larga>
      <Outlet />
    </Pagina>
  );
}
