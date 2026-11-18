import { useEffect, useRef } from 'react';
import Icone from './Icone';
import classes from './ResumoErros.module.css';

// Resumo de erros no topo do formulário, mostrado quando a pessoa tenta enviar com problemas.
// Cada erro em 2 linhas, sem sublinhado: o nome do campo em cima e o que falta embaixo.
// Clicar num erro leva o foco ao campo. Ao aparecer, o resumo recebe o foco (e é anunciado).
// Recebe os erros [{ campo (id do campo), rotulo, mensagem }], o título (opcional)
// e focar (padrão true; false só em exemplos, para a página não pular até ele).
export default function ResumoErros({ erros, titulo, focar = true }) {
  const caixa = useRef(null);
  const quantos = erros.length;

  // Leva o foco para o resumo quando ele aparece
  useEffect(() => {
    if (focar && quantos > 0) caixa.current?.focus();
  }, [focar, quantos]);

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
