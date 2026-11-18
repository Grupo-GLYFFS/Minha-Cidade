import Botao from './Botao';
import Icone from './Icone';
import classes from './Estados.module.css';

// Conteúdo de "não encontrado": vai dentro de <Pagina> sem cabeçalho (só topo, isto e rodapé).
// Usado no endereço que não existe e nos detalhes de item que não existe (pedido, obra…).
// Recebe o titulo (h1), o texto, o icone (padrão "location_off") e os botões (children).
// Sem botões, mostra "Ir para o início".
export default function NaoEncontrado({
  titulo = 'Não encontramos esta página',
  texto = 'O link pode estar incompleto ou a página mudou de lugar.',
  icone = 'location_off',
  children,
}) {
  return (
    <div className={classes.naoEncontrado}>
      <span className={classes.icone}>
        <Icone nome={icone} tamanho={28} />
      </span>
      <h1 className={classes.tituloPagina}>{titulo}</h1>
      <p className={classes.texto}>{texto}</p>
      <div className={classes.acoes}>
        {children ?? (
          <Botao variante="principal" para="/inicio">
            Ir para o início
          </Botao>
        )}
      </div>
    </div>
  );
}
