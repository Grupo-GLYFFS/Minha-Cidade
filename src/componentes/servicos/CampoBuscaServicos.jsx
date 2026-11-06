import { Box, Button, Input, VisuallyHidden } from '@mantine/core';
import Icone from '../Icone';
import classes from './CampoBuscaServicos.module.css';

// Campo grande de busca de serviços, com ícone e (se quiser) o botão "Buscar".
// O rótulo fica escondido na tela, mas é lido pelo leitor de tela.
// Recebe o id do campo, o texto atual, aoMudar(texto), aoEnviar() e, se quiser,
// comBotao (mostra o botão) e refCampo (para levar o foco ao campo).
export default function CampoBuscaServicos({
  id,
  valor,
  aoMudar,
  aoEnviar,
  comBotao = false,
  refCampo,
}) {
  // Não recarrega a página: quem usa o campo decide o que fazer
  function enviar(evento) {
    evento.preventDefault();
    aoEnviar();
  }

  return (
    <Box component="form" role="search" className={classes.campo} onSubmit={enviar}>
      <Icone nome="search" />
      <VisuallyHidden component="label" htmlFor={id}>
        Buscar serviço
      </VisuallyHidden>
      <Input
        id={id}
        ref={refCampo}
        type="search"
        variant="unstyled"
        size="md"
        enterKeyHint="search"
        autoComplete="off"
        className={classes.entradaCaixa}
        classNames={{ input: classes.entrada }}
        placeholder="Ex.: IPTU, vacina, poda de árvore"
        value={valor}
        onChange={(evento) => aoMudar(evento.currentTarget.value)}
      />
      {comBotao && (
        <Button type="submit" h={44} px="lg" radius="sm">
          Buscar
        </Button>
      )}
    </Box>
  );
}
