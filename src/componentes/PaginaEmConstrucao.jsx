import Botao from './Botao';
import CabecalhoPagina from './CabecalhoPagina';
import EstadoVazio from './EstadoVazio';
import Pagina from './Pagina';

// Página provisória das rotas que ainda não têm tela: topo, cabeçalho com o título e um aviso.
// Recebe o titulo, o icone do cabeçalho (padrão "construction") e a trilha (opcional).
// TODO: apagar quando todas as páginas do mapa estiverem prontas
export default function PaginaEmConstrucao({ titulo, icone = 'construction', trilha }) {
  return (
    <Pagina
      cabecalho={<CabecalhoPagina tipo="lista" titulo={titulo} icone={icone} trilha={trilha} />}
    >
      <EstadoVazio
        icone="construction"
        titulo="Esta página está sendo construída"
        texto="Enquanto isso, você pode voltar ao início do app."
      >
        <Botao variante="secundario" para="/inicio" icone="arrow_back">
          Voltar ao início
        </Botao>
      </EstadoVazio>
    </Pagina>
  );
}
