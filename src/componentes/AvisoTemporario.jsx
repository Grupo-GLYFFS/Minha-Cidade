import Botao from './Botao';
import Icone from './Icone';
import classes from './AvisoTemporario.module.css';

// Aviso temporário no rodapé da tela, centralizado: confirma uma ação com um texto curto,
// o link "Ver" (quando há para onde ir) e o X. Some sozinho (o AvisoTemporarioProvider conta).
// A região com role="status" fica sempre na página, para o leitor de tela ouvir cada aviso novo.
// Recebe o aviso ({ id, texto, link } ou null), aoFechar() e aoPausar(true/false).
export default function AvisoTemporario({ aviso, aoFechar, aoPausar }) {
  return (
    <div className={classes.lugar} role="status">
      {aviso && (
        <div
          key={aviso.id}
          className={classes.aviso}
          onMouseEnter={() => aoPausar(true)}
          onMouseLeave={() => aoPausar(false)}
          onFocus={() => aoPausar(true)}
          onBlur={() => aoPausar(false)}
        >
          <Icone nome="check_circle" tamanho={24} preenchido className={classes.icone} />
          <p className={classes.texto}>{aviso.texto}</p>
          {aviso.link && (
            <Botao variante="texto" compacto para={aviso.link} onClick={aoFechar}>
              Ver
            </Botao>
          )}
          <Botao variante="fechar" aria-label="Fechar aviso" onClick={aoFechar} />
        </div>
      )}
    </div>
  );
}
