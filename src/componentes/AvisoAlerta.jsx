import { Link } from 'react-router-dom';
import { Anchor, Text } from '@mantine/core';
import Icone from './Icone';
import classes from './AvisoAlerta.module.css';

// Faixa amarela com um alerta importante (ex.: chuva forte da Defesa Civil).
// Recebe o alerta e o caminho do link "Ver orientações".
// Usa role="status" para o leitor de tela anunciar o aviso sem interromper a pessoa.
export default function AvisoAlerta({ alerta, caminho = '/minha-cidade/alertas' }) {
  return (
    <div role="status" className={classes.aviso}>
      <Icone nome="warning" preenchido />
      <Text fz={{ base: 14, md: 15 }} c="inherit">
        <strong>{alerta.titulo}:</strong> {alerta.mensagem}{' '}
        <Anchor component={Link} to={caminho} c="inherit" fw={700} underline="always" fz="inherit">
          Ver orientações
        </Anchor>
      </Text>
    </div>
  );
}
