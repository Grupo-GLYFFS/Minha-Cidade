import Botao from '../Botao';
import classes from './BotaoBaixar.module.css';

// Botão "Baixar" do extrato: monta uma planilha (CSV, que abre no Excel) com as linhas da conta
// e baixa no aparelho da pessoa.
// Recebe o nome do arquivo (sem extensão), o cabeçalho (lista de colunas) e as linhas
// (listas de valores, na ordem do cabeçalho). No celular, o botão fica só com o ícone.
export default function BotaoBaixar({ arquivo, cabecalho, linhas }) {
  // Monta o CSV com ponto e vírgula (o Excel em português abre certo) e baixa
  function baixar() {
    const escapar = (valor) => `"${String(valor).replaceAll('"', '""')}"`;
    const texto = [cabecalho, ...linhas].map((linha) => linha.map(escapar).join(';')).join('\n');
    // O BOM no começo faz o Excel ler os acentos
    const arquivoCsv = new Blob([`﻿${texto}`], { type: 'text/csv;charset=utf-8' });
    const endereco = URL.createObjectURL(arquivoCsv);
    const link = document.createElement('a');
    link.href = endereco;
    link.download = `${arquivo}.csv`;
    link.click();
    URL.revokeObjectURL(endereco);
  }

  return (
    <Botao
      variante="secundario"
      compacto
      icone="download"
      onClick={baixar}
      className={classes.baixar}
    >
      <span className={classes.rotulo}>Baixar</span>
    </Botao>
  );
}
