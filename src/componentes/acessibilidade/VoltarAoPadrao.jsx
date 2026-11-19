import { useState } from 'react';
import Botao from '../Botao';
import { useAcessibilidade } from '../../contexto/useAcessibilidade';
import classes from './VoltarAoPadrao.module.css';

// Botão "Voltar ao padrão" do cabeçalho da página Acessibilidade.
// Volta letra, contraste e animações ao padrão e mostra a confirmação embaixo do botão
// (a mesma frase é lida pelo leitor de tela).
export default function VoltarAoPadrao() {
  const { voltarAoPadrao } = useAcessibilidade();
  const [voltou, setVoltou] = useState(false);

  // Volta tudo ao padrão e liga a confirmação
  function restaurar() {
    voltarAoPadrao();
    setVoltou(true);
  }

  return (
    <div className={classes.bloco}>
      <Botao variante="secundario" icone="restart_alt" onClick={restaurar}>
        Voltar ao padrão
      </Botao>
      <p className={classes.status} role="status">
        {voltou ? 'Pronto: letra, contraste e animações voltaram ao padrão.' : ''}
      </p>
    </div>
  );
}
