import CampoTexto from '../CampoTexto';
import Icone from '../Icone';
import OpcoesRadio from './OpcoesRadio';
import { formatarCpf } from '../../logica/cpf';
import { descricaoCampo, limitesData } from '../../logica/esquemaServico';
import classes from './CamposSolicitacao.module.css';

// Quebra a ajuda em frases, uma por linha (regra dos formulários).
// Recebe o texto; devolve a lista de frases ou undefined.
function frases(texto) {
  return texto ? texto.split(/(?<=\.)\s+/) : undefined;
}

// Uma pergunta do formulário de solicitação, desenhada conforme o tipo do campo
// (texto, texto longo, número, CPF, data, hora, escolha ou arquivo).
// Recebe o campo (do serviço), o valor, aoMudar(valor) e o erro.
// O id do elemento é o nome do campo, para o resumo de erros levar o foco até ele.
export default function CampoSolicitacao({ campo, valor, aoMudar, erro }) {
  const ajuda = descricaoCampo(campo);

  if (campo.tipo === 'selecao') {
    return (
      <OpcoesRadio
        id={campo.nome}
        rotulo={campo.rotulo}
        obrigatorio={campo.obrigatorio}
        ajuda={ajuda}
        opcoes={campo.opcoes}
        valor={valor}
        aoMudar={aoMudar}
        erro={erro}
      />
    );
  }

  if (campo.tipo === 'arquivo') {
    return (
      <div className={classes.grupo}>
        <label htmlFor={campo.nome} className={classes.rotulo}>
          {campo.rotulo}
          {campo.obrigatorio ? <span className={classes.obrigatorio}> *</span> : ' (opcional)'}
        </label>
        {ajuda && (
          <p className={classes.ajuda} id={`ajuda-${campo.nome}`}>
            {ajuda}
          </p>
        )}
        <input
          id={campo.nome}
          type="file"
          className={classes.arquivo}
          aria-describedby={ajuda ? `ajuda-${campo.nome}` : undefined}
          aria-invalid={Boolean(erro)}
          onChange={(evento) => aoMudar(evento.target.files?.[0] ?? null)}
        />
        {erro && (
          <p className={classes.erro}>
            <Icone nome="error" tamanho={20} />
            {erro}
          </p>
        )}
      </div>
    );
  }

  // Tipo do campo de texto e o jeito de tratar o que a pessoa digita
  const extra = {};
  let classe;
  if (campo.tipo === 'cpf') {
    extra.placeholder = '000.000.000-00';
    extra.inputMode = 'numeric';
    classe = classes.estreito;
  } else if (campo.tipo === 'numero') {
    extra.inputMode = 'numeric';
    classe = classes.numero;
  } else if (campo.tipo === 'data') {
    const { min, max } = limitesData(campo);
    extra.type = 'date';
    extra.min = min ?? undefined;
    extra.max = max ?? undefined;
    classe = classes.estreito;
  } else if (campo.tipo === 'hora') {
    extra.type = 'time';
    extra.min = campo.min;
    extra.max = campo.max;
    classe = classes.estreito;
  }

  // CPF ganha a máscara enquanto a pessoa digita; número aceita só dígitos
  function mudar(evento) {
    const texto = evento.target.value;
    if (campo.tipo === 'cpf') aoMudar(formatarCpf(texto));
    else if (campo.tipo === 'numero') aoMudar(texto.replace(/\D/g, '').slice(0, 4));
    else aoMudar(texto);
  }

  return (
    <div className={classe}>
      <CampoTexto
        id={campo.nome}
        rotulo={campo.obrigatorio ? campo.rotulo : `${campo.rotulo} (opcional)`}
        withAsterisk={campo.obrigatorio}
        ajuda={frases(ajuda)}
        erro={erro}
        multilinha={campo.tipo === 'textoLongo'}
        value={valor ?? ''}
        onChange={mudar}
        {...extra}
      />
    </div>
  );
}
