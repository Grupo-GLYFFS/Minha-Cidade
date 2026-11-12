import SecaoVitrine from '../SecaoVitrine';
import CoresTema from './CoresTema';
import CoresVariaveis from './CoresVariaveis';
import CoresEtiquetas from './CoresEtiquetas';
import CoresIndicadores from './CoresIndicadores';
import { useModoHtml } from '../../../contexto/useModoHtml';

// Seção "Cores": o azul do tema, as variáveis do global.css, as cores das etiquetas
// (status, situação e tipo) e as cores de prioridade, voto e ODS.
// Os valores são lidos da página na hora, então mudam junto com o alto contraste.
export default function SecaoCores() {
  // Desenha de novo quando o contraste muda, para ler os valores novos das variáveis
  useModoHtml();

  return (
    <SecaoVitrine
      id="cores"
      titulo="Cores"
      descricao="Cada cor com o nome, o valor e o uso. Cores de texto mostram o contraste (WCAG): AA pede 4,5:1 e AAA pede 7:1. Ligue o alto contraste no topo para ver os valores mudarem."
    >
      <CoresTema />
      <CoresVariaveis />
      <CoresEtiquetas />
      <CoresIndicadores />
    </SecaoVitrine>
  );
}
