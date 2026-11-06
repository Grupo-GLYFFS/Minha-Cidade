import { Link } from 'react-router-dom';
import { Avatar, Button, Text, Title } from '@mantine/core';
import Cartao from '../Cartao';
import Icone from '../Icone';
import { formatarNumero } from '../../logica/formatos';
import classes from './CartaoPerfil.module.css';

// Cartão do topo do Perfil: avatar com as iniciais, nome, bairro e região, e-mail,
// botão "Editar meus dados" e um resumo do que a pessoa já fez no app.
// Recebe a pessoa logada e o resumo { pedidosAbertos, servicos, apoios } (quantidades).
export default function CartaoPerfil({ usuario, resumo }) {
  // Cada número com o nome no singular ou no plural
  const numeros = [
    [resumo.pedidosAbertos, 'pedido aberto', 'pedidos abertos'],
    [resumo.servicos, 'serviço solicitado', 'serviços solicitados'],
    [resumo.apoios, 'apoio dado', 'apoios dados'],
  ].map(([valor, singular, plural]) => ({ valor, rotulo: valor === 1 ? singular : plural }));

  return (
    <Cartao component="section" aria-labelledby="perfil-nome">
      <div className={classes.topo}>
        <Avatar color="azul" variant="filled" radius="md" size={64} className={classes.avatar}>
          {usuario.iniciais}
        </Avatar>
        <div className={classes.dados}>
          <Title order={2} id="perfil-nome" fz={20} fw={700} lh={1.25}>
            {usuario.nome}
          </Title>
          <Text fz={14} c="var(--cor-texto-suave)" mt={4}>
            {usuario.bairro} · {usuario.regiao}
          </Text>
          <Text fz={14} c="var(--cor-texto-suave)" className={classes.email}>
            {usuario.email}
          </Text>
        </div>
      </div>

      <Button
        component={Link}
        to="/perfil/dados"
        variant="light"
        h={48}
        fullWidth
        mt="md"
        leftSection={<Icone nome="edit" tamanho={20} />}
      >
        Editar meus dados
      </Button>

      {/* Resumo: número em destaque e o nome embaixo; o leitor de tela ouve "2 pedidos abertos" */}
      <ul className={classes.resumo} aria-label="Seu resumo no app">
        {numeros.map((item) => (
          <li key={item.rotulo} className={classes.item}>
            <span className={classes.numero}>{formatarNumero(item.valor)}</span>
            <span className={classes.rotulo}>{item.rotulo}</span>
          </li>
        ))}
      </ul>
    </Cartao>
  );
}
