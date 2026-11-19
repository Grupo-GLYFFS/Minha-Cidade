import SecaoCard from '../SecaoCard';
import Botao from '../Botao';
import { SUBPREFEITURA_DO_BAIRRO } from '../../dados/subprefeituraDoBairro';
import classes from './CardEndereco.module.css';

// Card "Seu endereço" do Meu perfil: rua e número em destaque, CEP e cidade embaixo e,
// numa faixa separada por linha, o bairro e a subprefeitura. "Editar" abre o popup.
// Recebe o usuario (endereço) e aoEditar().
export default function CardEndereco({ usuario, aoEditar }) {
  const subprefeitura = SUBPREFEITURA_DO_BAIRRO[usuario.bairro];
  const complemento = usuario.complemento ? ` · ${usuario.complemento}` : '';

  return (
    <SecaoCard
      titulo="Seu endereço"
      acao={
        <Botao
          variante="texto"
          compacto
          icone="edit"
          aria-haspopup="dialog"
          aria-label="Editar endereço"
          onClick={aoEditar}
        >
          Editar
        </Botao>
      }
    >
      <p className={classes.rua}>
        {usuario.rua}, {usuario.numero}
        {complemento}
      </p>
      <p className={classes.cep}>CEP {usuario.cep} · São Paulo - SP</p>
      <dl className={classes.local}>
        <div>
          <dt>Bairro</dt>
          <dd>{usuario.bairro}</dd>
        </div>
        {subprefeitura && (
          <div>
            <dt>Subprefeitura</dt>
            <dd>{subprefeitura.nome}</dd>
          </div>
        )}
      </dl>
    </SecaoCard>
  );
}
