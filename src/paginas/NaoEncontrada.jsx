import NaoEncontrado from '../componentes/NaoEncontrado';
import Pagina from '../componentes/Pagina';

// Página mostrada quando o endereço não existe: só topo, o aviso e o rodapé.
// Sempre oferece um caminho de volta (o Início do app).
export default function NaoEncontrada() {
  return (
    <Pagina>
      <NaoEncontrado />
    </Pagina>
  );
}
