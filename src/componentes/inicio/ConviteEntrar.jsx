import Botao from '../Botao';
import Icone from '../Icone';
import { useCaminhoConta } from '../../contexto/useCaminhoConta';
import classes from './ConviteEntrar.module.css';

// Card do Início para o visitante: o que a conta libera e os botões "Criar conta" e "Entrar"
// (os dois trazem a pessoa de volta para a página atual, pelo ?voltar=).
export default function ConviteEntrar() {
  const { entrar, criarConta } = useCaminhoConta();
  return (
    <section className={classes.card} aria-labelledby="convite-entrar">
      <span className={classes.icone} aria-hidden="true">
        <Icone nome="person" tamanho={24} />
      </span>
      <div className={classes.texto}>
        <h2 className={classes.titulo} id="convite-entrar">
          Entre na sua conta
        </h2>
        <p className={classes.frase}>Veja seus agendamentos, seus pedidos e o que você segue.</p>
      </div>
      <div className={classes.botoes}>
        <Botao variante="secundario" compacto para={criarConta}>
          Criar conta
        </Botao>
        <Botao variante="principal" compacto icone="arrow_forward" iconeDireita para={entrar}>
          Entrar
        </Botao>
      </div>
    </section>
  );
}
