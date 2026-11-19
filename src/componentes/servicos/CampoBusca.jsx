import { forwardRef } from 'react';
import Botao from '../Botao';
import Icone from '../Icone';
import classes from './CampoBusca.module.css';

// Campo de busca com a lupa, o X de limpar (quando há texto) e o botão "Buscar" dentro.
// Recebe:
// - id, rotulo (lido pelo leitor de tela) e placeholder;
// - valor e aoMudar(texto); aoEnviar() quando a pessoa aperta Enter ou "Buscar";
// - grande: a versão do cabeçalho de Serviços (60 de altura); sem ele, 52;
// - aoTeclar: teclas extras no campo (ex.: seta para baixo leva aos resultados).
const CampoBusca = forwardRef(function CampoBusca(
  { id, rotulo, placeholder, valor, aoMudar, aoEnviar, grande = false, aoTeclar, ...props },
  ref,
) {
  // Envia sem recarregar a página
  function enviar(evento) {
    evento.preventDefault();
    aoEnviar?.();
  }

  return (
    <form
      role="search"
      className={`${classes.campo} ${grande ? classes.grande : ''}`}
      onSubmit={enviar}
    >
      <Icone nome="search" className={classes.lupa} />
      <label htmlFor={id} className={classes.oculto}>
        {rotulo}
      </label>
      <input
        ref={ref}
        id={id}
        type="search"
        className={classes.entrada}
        placeholder={placeholder}
        value={valor}
        onChange={(evento) => aoMudar(evento.target.value)}
        onKeyDown={aoTeclar}
        autoComplete="off"
        {...props}
      />
      {valor && <Botao variante="fechar" aria-label="Limpar busca" onClick={() => aoMudar('')} />}
      <Botao variante="principal" compacto type="submit">
        Buscar
      </Botao>
    </form>
  );
});

export default CampoBusca;
