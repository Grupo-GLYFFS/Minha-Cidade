import Icone from '../Icone';
import classes from './CamposSolicitacao.module.css';

// Pergunta de escolha única do formulário: as opções em cards de rádio, duas por linha
// (uma por linha no celular). As setas do teclado trocam a opção, como em todo rádio.
// Recebe o id (nome do campo), o rótulo, se é obrigatória, a ajuda, as opções [{ valor, rotulo }],
// o valor escolhido, aoMudar(valor) e o erro.
export default function OpcoesRadio({
  id,
  rotulo,
  obrigatorio,
  ajuda,
  opcoes,
  valor,
  aoMudar,
  erro,
}) {
  const idErro = `erro-${id}`;
  const idAjuda = `ajuda-${id}`;
  const descritoPor = [ajuda && idAjuda, erro && idErro].filter(Boolean).join(' ') || undefined;

  return (
    <fieldset className={classes.grupo} aria-describedby={descritoPor} aria-invalid={Boolean(erro)}>
      <legend className={classes.rotulo}>
        {rotulo}
        {obrigatorio ? (
          <span className={classes.obrigatorio} aria-hidden="true">
            {' '}
            *
          </span>
        ) : (
          ' (opcional)'
        )}
      </legend>
      {ajuda && (
        <p className={classes.ajuda} id={idAjuda}>
          {ajuda}
        </p>
      )}
      <div className={classes.opcoes}>
        {opcoes.map((opcao, indice) => (
          <label key={opcao.valor} className={`${classes.opcao} ${erro ? classes.opcaoErro : ''}`}>
            <input
              type="radio"
              name={id}
              // O primeiro rádio leva o id, para o resumo de erros levar o foco até o grupo
              id={indice === 0 ? id : undefined}
              value={opcao.valor}
              checked={valor === opcao.valor}
              onChange={() => aoMudar(opcao.valor)}
              className={classes.radio}
            />
            {opcao.rotulo}
          </label>
        ))}
      </div>
      {erro && (
        <p className={classes.erro} id={idErro}>
          <Icone nome="error" tamanho={20} />
          {erro}
        </p>
      )}
    </fieldset>
  );
}
