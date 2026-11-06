import { Progress } from '@mantine/core';
import classes from './BarraResultado.module.css';

// Resultado resumido de uma votação: uma barra dividida em Sim, Não e Abstenção
// e, embaixo, os percentuais escritos (a barra é só desenho, o texto traz a informação).
// Recebe o resultado de calcularResultado() e o voto da pessoa (opcional) para marcar "seu voto".
export default function BarraResultado({ resultado, voto }) {
  return (
    <div>
      <Progress.Root size={10} radius="xl" aria-hidden="true" className={classes.trilho}>
        {resultado.opcoes.map((opcao) => (
          <Progress.Section key={opcao.valor} value={opcao.percentual} color={opcao.cor} />
        ))}
      </Progress.Root>
      <ul className={classes.legenda}>
        {resultado.opcoes.map((opcao) => (
          <li key={opcao.valor}>
            {opcao.valor === voto ? <strong>{opcao.rotulo} (seu voto)</strong> : opcao.rotulo}{' '}
            {opcao.percentual}%
          </li>
        ))}
      </ul>
    </div>
  );
}
