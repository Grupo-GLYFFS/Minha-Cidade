import CampoTexto from '../CampoTexto';
import ResumoErros from '../ResumoErros';
import SugestaoCategoria from './SugestaoCategoria';
import { DESCRICAO_MAX, DESCRICAO_MIN, listarErros } from '../../logica/esquemaNovoPedido';
import classes from './NovoPedido.module.css';

// Etapa 1 do Abrir pedido: a pessoa conta o problema e o app sugere a categoria.
// Recebe os valores, os erros ({ campo: mensagem }), mudar(campo, valor),
// escolherCategoria(id), listaAberta e aoAbrirLista(aberta) (a lista "Trocar categoria").
export default function EtapaDescreva({
  valores,
  erros,
  mudar,
  escolherCategoria,
  listaAberta,
  aoAbrirLista,
}) {
  const lista = listarErros(erros, ['descricao', 'categoria']);

  return (
    <>
      <ResumoErros
        titulo={lista.length === 1 ? 'Corrija o campo marcado para continuar.' : undefined}
        erros={lista}
      />
      <div className={classes.campo}>
        <CampoTexto
          id="descricao"
          rotulo="O que está acontecendo?"
          withAsterisk
          multilinha
          minRows={5}
          maxLength={DESCRICAO_MAX}
          ajuda={[
            `Conte o que você viu e o que atrapalha, com ${DESCRICAO_MIN} a ${DESCRICAO_MAX} caracteres.`,
            'A categoria vem do que você escrever.',
          ]}
          erro={erros.descricao}
          value={valores.descricao}
          onChange={(evento) => mudar('descricao', evento.currentTarget.value)}
        />
        <p className={classes.contador} aria-live="polite">
          {valores.descricao.length} de {DESCRICAO_MAX}
        </p>
      </div>
      <SugestaoCategoria
        categoria={valores.categoria}
        descricao={valores.descricao}
        erro={erros.categoria}
        aoEscolher={escolherCategoria}
        aberta={listaAberta}
        aoAbrir={aoAbrirLista}
      />
    </>
  );
}
