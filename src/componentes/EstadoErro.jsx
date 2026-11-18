import Botao from './Botao';
import Icone from './Icone';
import classes from './Estados.module.css';

// Estado de erro ao carregar um bloco: card com ícone vermelho, o que aconteceu, o que fazer
// e o botão "Tentar de novo". O resto da página continua funcionando.
// Recebe o titulo (ex.: "Não conseguimos carregar os pedidos agora"), o texto
// e aoTentarDeNovo (sem ela, o botão não aparece).
export default function EstadoErro({
  titulo,
  texto = 'Pode ser a sua conexão ou o sistema da prefeitura. Tente de novo em alguns minutos.',
  aoTentarDeNovo,
}) {
  return (
    <div className={classes.erro} role="alert">
      <span className={classes.icone}>
        <Icone nome="cloud_off" tamanho={28} />
      </span>
      <div className={classes.erroTexto}>
        <h3 className={classes.titulo}>{titulo}</h3>
        <p className={classes.texto}>{texto}</p>
      </div>
      {aoTentarDeNovo && (
        <Botao variante="secundario" icone="refresh" onClick={aoTentarDeNovo}>
          Tentar de novo
        </Botao>
      )}
    </div>
  );
}
