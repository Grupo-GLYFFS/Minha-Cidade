import CabecalhoPagina from '../componentes/CabecalhoPagina';
import Chip from '../componentes/Chip';
import Pagina from '../componentes/Pagina';
import VitrineBotoes from '../componentes/vitrine/VitrineBotoes';
import VitrineCabecalhos from '../componentes/vitrine/VitrineCabecalhos';
import VitrineCards from '../componentes/vitrine/VitrineCards';
import VitrineEstados from '../componentes/vitrine/VitrineEstados';
import VitrineListas from '../componentes/vitrine/VitrineListas';
import VitrinePopups from '../componentes/vitrine/VitrinePopups';
import VitrineTokens from '../componentes/vitrine/VitrineTokens';
import classes from '../componentes/vitrine/Vitrine.module.css';

// Atalhos do índice: [âncora, rótulo]
const INDICE = [
  ['tokens', 'Tokens'],
  ['botoes', 'Botões'],
  ['cabecalhos', 'Cabeçalhos'],
  ['cards', 'Cards'],
  ['listas', 'Listas'],
  ['popups', 'Popups e formulários'],
  ['estados', 'Estados'],
];

// Rola até a seção da âncora sem mexer no # do endereço (no HashRouter o # é a rota).
// Recebe o clique e o id da seção.
function rolarAte(evento, ancora) {
  evento.preventDefault();
  document.getElementById(ancora)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Página de desenvolvimento /componentes: os componentes da base ao vivo, com as variantes.
// É a referência para quem constrói as páginas (junto com src/componentes/LEIA-ME.md).
// O topo e o rodapé da própria página também são os componentes Topo e Rodape.
export default function Componentes() {
  return (
    <Pagina
      cabecalho={
        <CabecalhoPagina
          tipo="lista"
          titulo="Componentes"
          icone="widgets"
          subtitulo="A base de design do Minha Prefeitura. Página de desenvolvimento."
        />
      }
    >
      <ul className={classes.indice}>
        {INDICE.map(([ancora, rotulo]) => (
          <li key={ancora}>
            <Chip href={`#${ancora}`} onClick={(evento) => rolarAte(evento, ancora)}>
              {rotulo}
            </Chip>
          </li>
        ))}
      </ul>
      <VitrineTokens />
      <VitrineBotoes />
      <VitrineCabecalhos />
      <VitrineCards />
      <VitrineListas />
      <VitrinePopups />
      <VitrineEstados />
    </Pagina>
  );
}
