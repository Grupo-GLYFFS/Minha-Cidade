import { Text, Title } from '@mantine/core';
import Cartao from '../Cartao';
import Icone from '../Icone';
import classes from './CartaoTelefones.module.css';

// Telefone padrão quando o serviço não indica nenhum
const TELEFONE_PADRAO = [{ nome: 'Central da Prefeitura', numero: '156' }];

// Cartão com os telefones do serviço. Cada número é um link que liga direto no celular.
// Recebe a lista de telefones ({ nome, numero }); sem lista, mostra a Central 156.
export default function CartaoTelefones({ telefones }) {
  const lista = telefones?.length ? telefones : TELEFONE_PADRAO;

  return (
    <Cartao component="section" aria-labelledby="telefones-titulo">
      <Title order={2} id="telefones-titulo" fz={18} fw={700} lh={1.3} mb={4}>
        Telefones
      </Title>
      <Text fz={14} c="var(--cor-texto-suave)" mb="sm">
        Ligação gratuita.
      </Text>
      <ul className={classes.lista}>
        {lista.map((telefone) => (
          <li key={`${telefone.nome}-${telefone.numero}`}>
            <a href={`tel:${telefone.numero}`} className={classes.telefone}>
              <span className={classes.icone}>
                <Icone nome="call" tamanho={20} />
              </span>
              <span className={classes.nome}>{telefone.nome}</span>
              <span className={classes.numero}>{telefone.numero}</span>
            </a>
          </li>
        ))}
      </ul>
    </Cartao>
  );
}
