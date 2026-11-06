import { Anchor, Text, VisuallyHidden } from '@mantine/core';
import Cartao from '../Cartao';
import Icone from '../Icone';
import TituloCartao from './TituloCartao';
import { linkComoChegar } from '../../logica/bairros';
import classes from './CartaoMeuBairro.module.css';

// Cartão "Serviços de referência" de Meu Bairro: UBS, escola municipal e CRAS do bairro,
// com endereço, horário (da UBS) e o link "Como chegar", que abre o Google Maps em nova aba.
// Recebe os dados do bairro ({ bairro, ubs, escola, cras }).
export default function CartaoServicosReferencia({ dados }) {
  const servicos = [
    { tipo: 'Posto de saúde (UBS)', icone: 'local_hospital', ...dados.ubs },
    { tipo: 'Escola municipal', icone: 'school', ...dados.escola },
    { tipo: 'Assistência social (CRAS)', icone: 'volunteer_activism', ...dados.cras },
  ];

  return (
    <Cartao component="section" aria-labelledby="referencia-titulo" className={classes.cartao}>
      <TituloCartao id="referencia-titulo" icone="near_me">
        Serviços de referência
      </TituloCartao>

      <ul className={classes.lista}>
        {servicos.map((servico) => (
          <li key={servico.tipo} className={classes.item}>
            <Icone nome={servico.icone} tamanho={20} />
            <span>
              <Text component="span" display="block" fz={13} c="var(--cor-texto-suave)">
                {servico.tipo}
              </Text>
              <Text component="h3" fz={15} fw={700}>
                {servico.nome}
              </Text>
              <Text fz={14}>{servico.endereco}</Text>
              {servico.horario && (
                <Text fz={14} c="var(--cor-texto-suave)">
                  {servico.horario}
                </Text>
              )}
              <Anchor
                href={linkComoChegar(servico.endereco, dados.bairro)}
                target="_blank"
                rel="noopener noreferrer"
                fz={14}
                fw={600}
                c="var(--cor-link)"
                className={classes.linkExterno}
              >
                Como chegar
                <VisuallyHidden>: {servico.nome} (abre o Google Maps em nova aba)</VisuallyHidden>
                <Icone nome="open_in_new" tamanho={18} />
              </Anchor>
            </span>
          </li>
        ))}
      </ul>
    </Cartao>
  );
}
