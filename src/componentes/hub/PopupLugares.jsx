import { useState } from 'react';
import { Link } from 'react-router-dom';
import Popup from '../Popup';
import Icone from '../Icone';
import { filtrarPorBusca } from '../../logica/lugares';
import classes from './PopupLugares.module.css';

// Popup com a lista completa de lugares e uma busca (todas as subprefeituras, ou os bairros
// de uma subprefeitura grande). A busca acha pelo nome do lugar ou pelo nome de um bairro dele.
// Recebe:
// - aberto e aoFechar;
// - titulo e rotuloBusca (texto do campo, ex.: "Buscar subprefeitura ou bairro");
// - grupos: [{ titulo, itens }] com itens [{ id, nome, linha, para, selo, bairros }];
//   sem busca, cada grupo aparece com o seu título; com busca, a lista vira uma só;
// - contagem: frase do total (ex.: "32 subprefeituras");
// - nomeResultado: [singular, plural] para a contagem da busca (ex.: ["subprefeitura", "subprefeituras"]).
export default function PopupLugares({
  aberto,
  aoFechar,
  titulo,
  rotuloBusca,
  grupos,
  contagem,
  nomeResultado,
}) {
  const [busca, setBusca] = useState('');

  // Fecha e limpa a busca, para o popup abrir do zero da próxima vez
  const fechar = () => {
    setBusca('');
    aoFechar();
  };

  // Com busca, junta os grupos sem repetir o mesmo lugar (o lugar da pessoa aparece em dois)
  const buscando = busca.trim().length > 0;
  let gruposVisiveis = grupos;
  let frase = contagem;
  if (buscando) {
    const todos = grupos.flatMap((grupo) => grupo.itens);
    const unicos = todos.filter(
      (item, indice) => todos.findIndex((i) => i.id === item.id) === indice,
    );
    const achados = filtrarPorBusca(unicos, busca);
    gruposVisiveis = [{ titulo: null, itens: achados }];
    const [singular, plural] = nomeResultado;
    frase = `${achados.length} ${achados.length === 1 ? singular : plural} para "${busca.trim()}"`;
  }
  const nenhum = gruposVisiveis.every((grupo) => grupo.itens.length === 0);

  return (
    <Popup aberto={aberto} aoFechar={fechar} titulo={titulo} largura={640}>
      <div className={classes.busca} role="search">
        <Icone nome="search" tamanho={22} />
        <input
          type="search"
          className={classes.campo}
          placeholder={rotuloBusca}
          aria-label={rotuloBusca}
          value={busca}
          onChange={(evento) => setBusca(evento.target.value)}
        />
      </div>
      <p className={classes.contagem} role="status">
        {frase}
      </p>

      <div className={classes.lista}>
        {nenhum && (
          <p className={classes.nenhum}>
            Nenhum resultado. Confira se o nome está escrito certo ou busque pelo bairro.
          </p>
        )}
        {gruposVisiveis.map((grupo) =>
          grupo.itens.length === 0 ? null : (
            <div key={grupo.titulo ?? 'resultado'}>
              {grupo.titulo && <h3 className={classes.grupo}>{grupo.titulo}</h3>}
              <ul className={classes.itens}>
                {grupo.itens.map((item) => (
                  <li key={item.id}>
                    <Link to={item.para} className={classes.item} onClick={fechar}>
                      <span className={classes.texto}>
                        <b>{item.nome}</b>
                        {item.linha && <small>{item.linha}</small>}
                      </span>
                      {item.selo && <span className={classes.selo}>{item.selo}</span>}
                      <Icone nome="chevron_right" tamanho={22} className={classes.chevron} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ),
        )}
      </div>
    </Popup>
  );
}
