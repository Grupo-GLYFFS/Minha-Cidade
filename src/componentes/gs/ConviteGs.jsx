import Botao from '../Botao';
import classes from './ConviteGs.module.css';

// Faixa azul "Conheça o projeto" do fim da Apresentação: título, frase e um botão só
// (Como funciona). Embaixo, separada por uma linha, a nota da demonstração e "Abrir o app".
export default function ConviteGs() {
  return (
    <nav className={classes.convite} aria-labelledby="gs-convite">
      <div className={classes.topo}>
        <div>
          <h2 className={classes.titulo} id="gs-convite">
            Conheça o projeto
          </h2>
          <p className={classes.frase}>
            Como o app funciona, o que a demonstração já mostra e quem fez.
          </p>
        </div>
        <Botao variante="branco" icone="arrow_forward" iconeDireita para="/como-funciona">
          Como funciona
        </Botao>
      </div>
      <p className={classes.base}>
        <span>A demonstração usa São Paulo e dados de exemplo.</span>
        <Botao
          variante="texto"
          icone="arrow_forward"
          iconeDireita
          para="/inicio"
          className={classes.entrar}
        >
          Abrir o app
        </Botao>
      </p>
    </nav>
  );
}
