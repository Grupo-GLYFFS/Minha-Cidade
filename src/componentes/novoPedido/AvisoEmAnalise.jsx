import { Alert } from '@mantine/core';
import Icone from '../Icone';
import { usePedidos } from '../../contexto/usePedidos';
import classes from './AvisoEmAnalise.module.css';

// Aviso "Seu pedido entrou em análise", mostrado quando a análise simulada acontece.
// A área com role="status" existe sempre, para o leitor de tela anunciar quando o aviso surgir.
// Recebe o pedido.
export default function AvisoEmAnalise({ pedido }) {
  const { recemAnalisados } = usePedidos();
  const mostrar = recemAnalisados.includes(pedido.id) && pedido.status === 'em-analise';

  return (
    <div role="status" aria-live="polite">
      {mostrar && (
        <Alert
          role="none"
          variant="outline"
          className={classes.aviso}
          classNames={{ title: classes.texto, message: classes.texto, icon: classes.texto }}
          radius="md"
          title="Seu pedido entrou em análise"
          icon={<Icone nome="manage_search" tamanho={20} />}
        >
          A equipe da prefeitura está conferindo o local e o tipo de problema. Você recebe a próxima
          novidade aqui no app.
        </Alert>
      )}
    </div>
  );
}
