import { Link } from 'react-router-dom';
import { Text, Title } from '@mantine/core';
import Etiqueta from '../Etiqueta';
import Icone from '../Icone';
import { buscarTipoServico, caminhoServico } from '../../logica/servicos';
import classes from './ItemServico.module.css';

// Linha de um serviço nas listas: ícone, nome, resumo e a etiqueta do tipo
// ("Online", "Informação" ou "No app"). A linha inteira é um link para a página do serviço.
// Recebe o serviço.
export default function ItemServico({ servico }) {
  const tipo = buscarTipoServico(servico.tipo);

  return (
    <Link to={caminhoServico(servico)} className={classes.item}>
      <span className={classes.icone}>
        <Icone nome={servico.icone} />
      </span>
      <span className={classes.textos}>
        <Title order={3} fz={16} fw={700} lh={1.3}>
          {servico.nome}
        </Title>
        <Text component="span" fz={14} c="var(--cor-texto-suave)" lh={1.4}>
          {servico.resumo}
        </Text>
        {tipo && (
          <span className={classes.etiqueta}>
            <Etiqueta texto={tipo.rotulo} corFundo={tipo.corFundo} corTexto={tipo.corTexto} />
          </span>
        )}
      </span>
      <span className={classes.seta}>
        <Icone nome="chevron_right" tamanho={20} />
      </span>
    </Link>
  );
}
