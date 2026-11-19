import CardPessoa from './CardPessoa';
import GradeHub from './GradeHub';
import SecaoHub from './SecaoHub';
import classes from './Hub.module.css';

// Seção "Quem governa" (cidade) ou "Quem cuida" (subprefeitura): as pessoas principais em cards
// grandes e, embaixo, um grupo de cards pequenos (secretarias ou coordenações).
// Recebe:
// - titulo da seção;
// - pessoas: [{ nome, cargo, iniciais }] (1 pessoa ocupa a largura toda; 2 ficam lado a lado);
// - tituloGrupo e grupo: [{ area, nome, iniciais }] (o grupo é opcional).
export default function QuemGoverna({ titulo, pessoas, tituloGrupo, grupo = [] }) {
  return (
    <SecaoHub titulo={titulo}>
      {(idTitulo) => (
        <>
          <GradeHub colunas={pessoas.length === 1 ? 1 : 2} idTitulo={idTitulo}>
            {pessoas.map((pessoa) => (
              <li key={pessoa.nome}>
                <CardPessoa {...pessoa} />
              </li>
            ))}
          </GradeHub>
          {grupo.length > 0 && (
            <>
              <h3 className={classes.subtituloGrupo}>{tituloGrupo}</h3>
              <GradeHub colunas={2}>
                {grupo.map((item) => (
                  <li key={item.area}>
                    <CardPessoa
                      pequeno
                      iniciais={item.iniciais}
                      nome={item.area}
                      cargo={item.nome}
                    />
                  </li>
                ))}
              </GradeHub>
            </>
          )}
        </>
      )}
    </SecaoHub>
  );
}
