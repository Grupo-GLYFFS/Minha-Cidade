import { Link } from 'react-router-dom';
import { Button, Progress, Text } from '@mantine/core';
import Icone from '../Icone';
import { motivoSemEnvio, textoValor } from '../../logica/orcamentoBairro';
import classes from './ResumoDivisao.module.css';

// Quadro fixo do "Prefeito por 5 minutos" (embaixo no celular, ao lado no computador):
// quanto já foi distribuído, quanto falta ou passou do limite, e o botão de enviar.
// O texto é anunciado pelo leitor de tela quando muda (aria-live), e o motivo de o botão
// não funcionar fica escrito embaixo dele.
// Recebe o resumo de resumirDivisao(), o total, logado, o caminho de entrar e aoEnviar().
export default function ResumoDivisao({ resumo, total, logado, caminhoEntrar, aoEnviar }) {
  const motivo = motivoSemEnvio(resumo);
  const passou = resumo.situacao === 'passou';

  // Frase e ícone de quanto falta ou passou (a cor nunca é a única informação)
  let restante = 'Tudo distribuído. Pode enviar!';
  let icone = 'check_circle';
  if (resumo.situacao === 'falta') {
    restante = `Faltam ${textoValor(resumo.diferenca)}`;
    icone = 'pending';
  }
  if (passou) {
    restante = `Passou ${textoValor(resumo.diferenca)} do limite`;
    icone = 'error';
  }

  return (
    <aside className={classes.resumo} aria-label="Resumo da sua divisão">
      <div role="status" aria-live="polite">
        <Text fz={{ base: 15, md: 16 }} fw={700}>
          Distribuídos: {textoValor(resumo.distribuido)} de {textoValor(total)}
        </Text>
        <Progress
          value={resumo.percentual}
          color={passou ? 'red' : undefined}
          size={10}
          radius="xl"
          mt={8}
          aria-hidden="true"
          classNames={{ root: classes.trilho }}
        />
        <p className={classes.restante} data-situacao={resumo.situacao}>
          <Icone nome={icone} tamanho={20} preenchido />
          {restante}
        </p>
      </div>

      {logado ? (
        <>
          <Button
            h={48}
            fullWidth
            disabled={Boolean(motivo)}
            aria-describedby={motivo ? 'motivo-sem-envio' : undefined}
            onClick={aoEnviar}
            leftSection={<Icone nome="send" tamanho={20} />}
          >
            Enviar minha divisão
          </Button>
          {motivo && (
            <Text id="motivo-sem-envio" fz={13} c="var(--cor-texto-suave)" mt={8}>
              {motivo}
            </Text>
          )}
        </>
      ) : (
        <>
          <Button component={Link} to={caminhoEntrar} h={48} fullWidth>
            Entrar para participar
          </Button>
          <Text fz={13} c="var(--cor-texto-suave)" mt={8}>
            Você pode testar a divisão agora. Para enviar, entre na sua conta.
          </Text>
        </>
      )}
    </aside>
  );
}
