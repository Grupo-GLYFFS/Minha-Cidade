import { Link, useLocation } from 'react-router-dom';
import Icone from '../Icone';
import { useNotificacoes } from '../../contexto/useNotificacoes';
import { abaDoCelular } from '../../logica/navegacaoCelular';
import classes from './BarraAbas.module.css';

// Abas da barra do celular, na ordem: Início · Serviços · Cidade · Bairro (o Mais vem depois)
const ABAS = [
  { id: 'inicio', rotulo: 'Início', icone: 'home', para: '/inicio' },
  { id: 'servicos', rotulo: 'Serviços', icone: 'grid_view', para: '/servicos' },
  { id: 'cidade', rotulo: 'Cidade', icone: 'location_city', para: '/minha-cidade' },
  { id: 'bairro', rotulo: 'Bairro', icone: 'home_pin', para: '/meu-bairro' },
];

// Barra de abas do celular, presa embaixo da tela (some no computador).
// A aba da área da página fica marcada (aria-current), com fundo azul-claro e ícone cheio.
// O Mais abre a folha Mais e mostra o número de notificações não lidas.
// Recebe:
// - maisAberto: a folha Mais está aberta (o Mais fica marcado no lugar da aba da página);
// - aoAbrirMais(): abre ou fecha a folha;
// - aba: marca outra aba no lugar da que vem da rota (opcional).
export default function BarraAbas({ maisAberto, aoAbrirMais, aba }) {
  const { pathname, search } = useLocation();
  const { naoLidas } = useNotificacoes();
  const ativa = aba ?? abaDoCelular(pathname, search);

  const rotuloMais = naoLidas > 0 ? `Mais, ${naoLidas} notificações não lidas` : 'Mais';

  return (
    <nav className={classes.barra} aria-label="Menu do celular">
      <ul className={classes.lista}>
        {ABAS.map((item) => {
          const marcada = item.id === ativa && !maisAberto;
          let atual;
          if (marcada) atual = pathname === item.para ? 'page' : 'true';
          return (
            <li key={item.id} className={classes.item}>
              <Link to={item.para} className={classes.aba} aria-current={atual}>
                <span className={classes.pilula}>
                  <Icone nome={item.icone} tamanho={24} preenchido={marcada} />
                </span>
                {item.rotulo}
              </Link>
            </li>
          );
        })}
        <li className={classes.item}>
          <button
            type="button"
            className={classes.aba}
            aria-haspopup="dialog"
            aria-expanded={maisAberto}
            aria-label={rotuloMais}
            aria-current={ativa === 'mais' && !maisAberto ? 'true' : undefined}
            onClick={aoAbrirMais}
          >
            <span className={classes.pilula}>
              <Icone nome="menu" tamanho={24} preenchido={maisAberto || ativa === 'mais'} />
              {naoLidas > 0 && (
                <span className={classes.selo} aria-hidden="true">
                  {naoLidas}
                </span>
              )}
            </span>
            Mais
          </button>
        </li>
      </ul>
    </nav>
  );
}
