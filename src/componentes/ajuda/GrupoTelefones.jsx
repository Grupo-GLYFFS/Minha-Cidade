import { Button, Text, Title } from '@mantine/core';
import Cartao from '../Cartao';
import Icone from '../Icone';
import classes from './GrupoTelefones.module.css';

// Um grupo da página Telefones úteis (ex.: "Emergência"): título e os telefones num cartão.
// Cada telefone tem nome, frase curta e um botão grande que liga direto no celular.
// Recebe o grupo { id, titulo, telefones }.
export default function GrupoTelefones({ grupo }) {
  const idTitulo = `telefones-${grupo.id}`;

  return (
    <section aria-labelledby={idTitulo}>
      <Title order={2} id={idTitulo} fz={{ base: 18, md: 20 }} fw={700} mb="sm">
        {grupo.titulo}
      </Title>
      <Cartao>
        <ul className={classes.lista}>
          {grupo.telefones.map((telefone) => (
            <li key={telefone.numero} className={classes.item}>
              <div className={classes.telefone}>
                <div className={classes.textos}>
                  <Text fw={700}>{telefone.nome}</Text>
                  <Text fz="sm" c="var(--cor-texto-suave)">
                    {telefone.descricao}
                  </Text>
                </div>
                <Button
                  component="a"
                  href={`tel:${telefone.numero}`}
                  h={48}
                  px="lg"
                  aria-label={`Ligar para ${telefone.paraQuem}, ${telefone.numero}`}
                  leftSection={<Icone nome="call" tamanho={20} />}
                  className={classes.botao}
                >
                  Ligar {telefone.numero}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Cartao>
    </section>
  );
}
