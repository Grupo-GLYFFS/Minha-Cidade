import { useEffect, useRef } from 'react';
import Icone from './Icone';
import classes from './ResumoErros.module.css';

// Resumo de erros no topo do formulário, mostrado quando a pessoa tenta enviar com problemas.
// Cada erro em 2 linhas, sem sublinhado: o nome do campo em cima e o que falta embaixo.
// Clicar num erro leva o foco ao campo. Ao aparecer, o resumo recebe o foco (e é anunciado).
// Quando a pessoa corrige um campo, ele sai da lista sem o foco sair do campo.
// Recebe os erros [{ campo (id do campo), rotulo, mensagem }], o título (opcional),
// focar (padrão true; false só em exemplos, para a página não pular até ele)
// e tentativa (opcional: um número que muda a cada envio com erro, para o foco voltar ao resumo).
export default function ResumoErros({ erros, titulo, focar = true, tentativa }) {
  const caixa = useRef(null);
  const quantos = erros.length;
  const visivel = quantos > 0;

  // Leva o foco para o resumo quando ele aparece (ou a cada nova tentativa de envio)
  useEffect(() => {
    if (focar && visivel) caixa.current?.focus();
  }, [focar, visivel, tentativa]);

  if (quantos === 0) return null;

  // Leva o foco ao campo com erro (sem mudar o endereço da página)
  function irParaCampo(evento, campo) {
    evento.preventDefault();
    document.getElementById(campo)?.focus();
  }

  const tituloFinal =
    titulo ??
    (quantos === 1 ? 'Corrija 1 campo para continuar' : `Corrija ${quantos} campos para continuar`);

  return (
    <div className={classes.resumo} role="alert" tabIndex={-1} ref={caixa}>
      <Icone nome="error" />
      <div className={classes.texto}>
        <p className={classes.titulo}>{tituloFinal}</p>
        <ul className={classes.lista}>
          {erros.map((erro) => (
            <li key={erro.campo}>
              <a
                href={`#${erro.campo}`}
                className={classes.item}
                onClick={(evento) => irParaCampo(evento, erro.campo)}
              >
                <span className={classes.campo}>{erro.rotulo}</span>
                <span className={classes.falta}>{erro.mensagem}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
