import { Link } from 'react-router-dom';
import { Button, Text } from '@mantine/core';
import Cartao from '../Cartao';
import Icone from '../Icone';
import classes from './ConviteEntrar.module.css';

// Cartão do Início para o visitante: explica o que a conta libera e oferece entrar ou criar conta.
export default function ConviteEntrar() {
  return (
    <Cartao component="section" aria-label="Entre na sua conta" className={classes.cartao}>
      <span className={classes.icone}>
        <Icone nome="person" tamanho={24} />
      </span>
      <Text fz={{ base: 15, md: 16 }} fw={600} className={classes.texto}>
        Entre para abrir pedidos, apoiar e acompanhar tudo do seu bairro.
      </Text>
      <div className={classes.botoes}>
        <Button component={Link} to="/entrar" variant="default" h={48} px="lg">
          Entrar
        </Button>
        <Button component={Link} to="/criar-conta" h={48} px="lg">
          Criar conta
        </Button>
      </div>
    </Cartao>
  );
}
