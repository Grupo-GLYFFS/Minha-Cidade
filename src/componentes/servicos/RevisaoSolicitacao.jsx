import { Checkbox } from '@mantine/core';
import Botao from '../Botao';
import Icone from '../Icone';
import ListaRespostas from './ListaRespostas';
import { respostaEmTexto } from '../../logica/solicitacoes';
import classes from './FormularioSolicitacao.module.css';

// Etapa "Revisar": o que foi preenchido em cada etapa, com "Alterar" para voltar a ela,
// os dados da conta e a caixa de confirmação.
// Recebe as etapas de campos [{ nome, campos }], os valores, o usuário, aoAlterar(numeroEtapa),
// confirmado, aoConfirmar(true/false) e o erro da confirmação.
export default function RevisaoSolicitacao({
  etapas,
  valores,
  usuario,
  aoAlterar,
  confirmado,
  aoConfirmar,
  erro,
}) {
  const endereco = `${usuario.rua}, ${usuario.numero} · ${usuario.bairro}, ${usuario.cidade}`;

  return (
    <>
      <h2 className={classes.tituloCard}>Confira antes de enviar</h2>
      {etapas.map((etapa, indice) => {
        const itens = etapa.campos
          .map((campo) => ({
            rotulo: campo.rotulo,
            valor: respostaEmTexto(campo, valores[campo.nome]),
          }))
          .filter((item) => item.valor !== '');
        // O endereço da conta aparece na etapa de atendimento
        if (etapa.id === 'atendimento') itens.unshift({ rotulo: 'Endereço', valor: endereco });
        if (itens.length === 0) return null;
        return (
          <section key={etapa.id} className={classes.grupoRevisao}>
            <div className={classes.cabRevisao}>
              <h3 className={classes.tituloRevisao}>{etapa.nome}</h3>
              <Botao variante="texto" compacto onClick={() => aoAlterar(indice + 1)}>
                Alterar<span className={classes.oculto}> {etapa.nome.toLowerCase()}</span>
              </Botao>
            </div>
            <ListaRespostas itens={itens} />
          </section>
        );
      })}
      <section className={classes.grupoRevisao}>
        <div className={classes.cabRevisao}>
          <h3 className={classes.tituloRevisao}>Seus dados</h3>
        </div>
        <ListaRespostas
          itens={[
            { rotulo: 'Nome', valor: usuario.nome },
            { rotulo: 'E-mail', valor: usuario.email },
          ]}
        />
      </section>

      <div className={classes.confirmacao}>
        <Checkbox
          id="confirmacao"
          size="md"
          label="Confirmo que as informações estão corretas."
          checked={confirmado}
          onChange={(evento) => aoConfirmar(evento.currentTarget.checked)}
          error={
            erro && (
              <span className={classes.erroConfirmacao}>
                <Icone nome="error" tamanho={20} />
                {erro}
              </span>
            )
          }
        />
      </div>
    </>
  );
}
