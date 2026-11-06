import { Text, Title } from '@mantine/core';
import { useSessao } from '../../contexto/useSessao';
import classes from './SeusDados.module.css';

// Dados de quem está pedindo (nome, e-mail e celular), vindos da conta logada.
// Só mostra: para mudar, a pessoa usa o Perfil.
export default function SeusDados() {
  const { usuario } = useSessao();
  const dados = [
    { rotulo: 'Nome', valor: usuario?.nome },
    { rotulo: 'E-mail', valor: usuario?.email },
    { rotulo: 'Celular', valor: usuario?.celular },
  ].filter((item) => item.valor);

  return (
    <section aria-labelledby="seus-dados-titulo" className={classes.caixa}>
      <Title order={2} id="seus-dados-titulo" fz={18} fw={700}>
        Seus dados
      </Title>
      <Text fz="sm" c="var(--cor-texto-suave)">
        Usamos os dados da sua conta.
      </Text>
      <dl className={classes.lista}>
        {dados.map((item) => (
          <div key={item.rotulo} className={classes.item}>
            <dt className={classes.rotulo}>{item.rotulo}</dt>
            <dd className={classes.valor}>{item.valor}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
