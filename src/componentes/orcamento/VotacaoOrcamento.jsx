import Botao from '../Botao';
import SeloSituacao from '../SeloSituacao';
import EstadoVazio from '../EstadoVazio';
import CartaoExtrato from './CartaoExtrato';
import { useVotos } from '../../contexto/useVotos';
import { caminhoVotacao } from '../../logica/votacao';
import { dataLista } from '../../logica/datasTexto';
import classes from './VotacaoOrcamento.module.css';

// "Votação de orçamento" do bairro: as votações abertas de mudança de verba da subprefeitura,
// com o prazo e o botão Votar (ou "Ver o seu voto", se a pessoa já votou).
// Recebe a subprefeitura e as votações (já filtradas: mudança de verba, abertas).
export default function VotacaoOrcamento({ subprefeitura, votacoes }) {
  const { votoDe } = useVotos();
  const bairros = subprefeitura.bairros.slice().sort((a, b) => a.localeCompare(b));
  const quem = `${bairros.slice(0, -1).join(', ')} e ${bairros[bairros.length - 1]}`;

  return (
    <CartaoExtrato titulo="Votação de orçamento" subtitulo={`Os moradores de ${quem} decidem`}>
      {votacoes.length === 0 ? (
        <div>
          <EstadoVazio
            icone="how_to_vote"
            titulo="Nenhuma votação de orçamento aberta"
            texto="Quando a subprefeitura abrir uma, ela aparece aqui."
          />
        </div>
      ) : (
        <ul className={classes.lista}>
          {votacoes.map((projeto) => (
            <li key={projeto.id} className={classes.item}>
              <div className={classes.texto}>
                <SeloSituacao cor="azul">Aberta até {dataLista(projeto.fimVotacao)}</SeloSituacao>
                <h3>{projeto.titulo}</h3>
              </div>
              {votoDe(projeto.id) ? (
                <Botao variante="secundario" compacto para={caminhoVotacao(projeto)}>
                  Ver o seu voto
                </Botao>
              ) : (
                <Botao variante="principal" compacto para={caminhoVotacao(projeto)}>
                  Votar
                </Botao>
              )}
            </li>
          ))}
        </ul>
      )}
    </CartaoExtrato>
  );
}
