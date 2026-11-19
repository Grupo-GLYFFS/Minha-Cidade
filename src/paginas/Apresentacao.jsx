import Pagina from '../componentes/Pagina';
import HeroiGs from '../componentes/gs/HeroiGs';
import OdsGs from '../componentes/gs/OdsGs';
import SolucaoGs from '../componentes/gs/SolucaoGs';
import ConviteGs from '../componentes/gs/ConviteGs';

// Apresentação da Global Solution (/), a página que o app abre.
// É a "página inicial" da rubrica: o problema com o dado real e a fonte (herói),
// os ODS atendidos, a solução e a faixa "Conheça o projeto".
// O herói e os ODS são faixas de largura total; a solução fica na coluna de 1088.
export default function Apresentacao() {
  return (
    <Pagina
      larga
      cabecalho={
        <>
          <HeroiGs />
          <OdsGs />
        </>
      }
    >
      <SolucaoGs>
        <ConviteGs />
      </SolucaoGs>
    </Pagina>
  );
}
