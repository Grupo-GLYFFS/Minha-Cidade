import { useId } from 'react';
import { Text } from '@mantine/core';
import Icone from '../Icone';
import classes from './GrupoOpcoes.module.css';

// Grupo de opções em blocos clicáveis (botões de opção nativos por baixo).
// Funciona pelo teclado como qualquer grupo de rádio: Tab entra, setas trocam a opção.
// Recebe: legenda, descricao (ajuda opcional), opcoes [{ valor, rotulo, icone?, detalhe? }],
// valor atual, aoMudar(valor), aoSair() (ao perder o foco), erro (mensagem ou undefined),
// colunas no computador e "compacto" (número em cima e rótulo embaixo, para escalas).
// A ref vai para a primeira opção, para o formulário conseguir dar foco quando há erro.
export default function GrupoOpcoes({
  ref,
  nome,
  legenda,
  descricao,
  opcoes,
  valor,
  aoMudar,
  aoSair,
  erro,
  colunas = 3,
  compacto = false,
}) {
  const id = useId();
  const idDescricao = descricao ? `${id}-descricao` : null;
  const idErro = erro ? `${id}-erro` : null;
  const descritores = [idDescricao, idErro].filter(Boolean).join(' ') || undefined;

  return (
    <fieldset className={classes.grupo} data-invalido={erro ? true : undefined}>
      <legend className={classes.legenda}>
        {legenda}{' '}
        <span className={classes.asterisco} aria-hidden="true">
          *
        </span>
      </legend>
      {descricao && (
        <Text id={idDescricao} className={classes.descricao}>
          {descricao}
        </Text>
      )}

      <div className={classes.opcoes} data-colunas={colunas} data-compacto={compacto || undefined}>
        {opcoes.map((opcao, posicao) => (
          <label key={opcao.valor} className={classes.opcao}>
            <input
              ref={posicao === 0 ? ref : undefined}
              type="radio"
              name={nome}
              value={opcao.valor}
              checked={valor === opcao.valor}
              onChange={() => aoMudar(opcao.valor)}
              onBlur={aoSair}
              required
              aria-invalid={erro ? true : undefined}
              aria-describedby={descritores}
              className={classes.radio}
            />
            {opcao.icone && <Icone nome={opcao.icone} tamanho={24} />}
            {compacto ? (
              <>
                <span className={classes.numero}>{opcao.valor}</span>
                <span className={classes.rotuloCompacto}>{opcao.rotulo}</span>
              </>
            ) : (
              <span className={classes.rotulo}>{opcao.rotulo}</span>
            )}
            {/* Marca de escolhido: a cor não é a única pista */}
            {!compacto && (
              <span className={classes.marca}>
                <Icone nome="check_circle" tamanho={20} preenchido />
              </span>
            )}
          </label>
        ))}
      </div>

      {erro && (
        <Text id={idErro} className={classes.erro}>
          {erro}
        </Text>
      )}
    </fieldset>
  );
}
