import Botao from '../Botao';
import EstadoVazio from '../EstadoVazio';
import CardServico from './CardServico';
import { SERVICOS } from '../../dados/servicos';
import { buscarServicos } from '../../logica/buscaServicos';
import classes from './ResultadosServicos.module.css';

// Resultado da busca na página de Serviços: os cards dos serviços encontrados
// ou, sem nenhum, o estado vazio com o caminho de volta ao catálogo e a Ouvidoria.
// Recebe o texto buscado e aoLimpar() (volta ao catálogo completo).
export default function ResultadosServicos({ texto, aoLimpar }) {
  const encontrados = buscarServicos(texto, SERVICOS);

  return (
    <section aria-labelledby="resultados-titulo">
      {/* tabIndex -1: o Enter da busca traz o foco para cá */}
      <h2 className={classes.titulo} id="resultados-titulo" tabIndex={-1}>
        Resultados para “{texto.trim()}”
        <span className={classes.contagem}>{encontrados.length}</span>
      </h2>
      {/* O leitor de tela ouve quantos serviços apareceram a cada letra */}
      <p className={classes.oculto} role="status">
        {encontrados.length === 1
          ? '1 serviço encontrado'
          : `${encontrados.length} serviços encontrados`}
      </p>

      {encontrados.length === 0 ? (
        <EstadoVazio
          icone="search_off"
          titulo={`Nenhum serviço para “${texto.trim()}”`}
          texto="Confira se está escrito certo ou tente outra palavra."
        >
          <Botao variante="secundario" icone="arrow_forward" iconeDireita onClick={aoLimpar}>
            Ver todos os {SERVICOS.length} serviços
          </Botao>
          <Botao variante="principal" icone="record_voice_over" para="/servicos/ouvidoria">
            Falar com a Ouvidoria
          </Botao>
        </EstadoVazio>
      ) : (
        <ul className={classes.cards}>
          {encontrados.map((servico) => (
            <li key={servico.id}>
              <CardServico servico={servico} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
