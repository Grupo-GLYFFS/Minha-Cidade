import { Link } from 'react-router-dom';
import { Anchor, Text } from '@mantine/core';
import Cartao from '../Cartao';
import Icone from '../Icone';
import TituloCartao from './TituloCartao';
import { PROJETOS } from '../../dados/projetos';
import { naRegiao } from '../../logica/formatos';
import { textoPrazoVotacao, votacoesDaRegiao } from '../../logica/votacao';
import base from './CartaoMeuBairro.module.css';
import classes from './CartaoParticipe.module.css';

// Cartão "Participe" de Meu Bairro: convite para o "Prefeito por 5 minutos" (Orçamento do Bairro)
// e as votações de grandes projetos abertas na região, com o prazo de cada uma.
// Recebe a região do bairro.
export default function CartaoParticipe({ regiao }) {
  const votacoes = regiao ? votacoesDaRegiao(PROJETOS, regiao) : [];

  return (
    <Cartao component="section" aria-labelledby="participe-titulo" className={base.cartao}>
      <TituloCartao id="participe-titulo" icone="how_to_vote">
        Participe
      </TituloCartao>

      <Link to="/cidade-aberta/orcamento-do-bairro" className={classes.convite}>
        <Icone nome="tune" tamanho={24} />
        <span>
          <strong>Prefeito por 5 minutos</strong>
          <span className={classes.detalhe}>
            Divida R$ 1 milhão entre melhorias para o bairro e compare com os vizinhos.
          </span>
        </span>
        <Icone nome="arrow_forward" tamanho={20} />
      </Link>

      <Text component="h3" fz={15} fw={700} mt="md">
        Votações abertas {regiao ? naRegiao(regiao) : 'na região'}
      </Text>
      {votacoes.length > 0 ? (
        <ul className={base.lista}>
          {votacoes.map((projeto) => (
            <li key={projeto.id} className={base.item}>
              <Icone nome={projeto.icone} tamanho={20} />
              <span>
                <Anchor
                  component={Link}
                  to={`/cidade-aberta/projetos/${projeto.id}`}
                  fw={700}
                  c="var(--cor-link)"
                >
                  {projeto.titulo}
                </Anchor>
                <Text fz={13} c="var(--cor-texto-suave)">
                  {textoPrazoVotacao(projeto.fimVotacao)}
                </Text>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <Text fz={14} c="var(--cor-texto-suave)" mt={4}>
          Nenhuma votação aberta nesta região agora.{' '}
          <Anchor component={Link} to="/cidade-aberta/projetos" fz="inherit" c="var(--cor-link)">
            Ver os grandes projetos da cidade
          </Anchor>
        </Text>
      )}
    </Cartao>
  );
}
