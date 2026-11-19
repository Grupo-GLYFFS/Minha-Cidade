import { Link } from 'react-router-dom';
import Icone from '../Icone';
import { subprefeituraDe } from '../../logica/enderecoConta';
import classes from './PainelConta.module.css';

// O que a conta permite fazer (painel do Entrar e do Esqueci minha senha)
const VANTAGENS = [
  { icone: 'assignment', texto: 'Abre pedidos de zeladoria e acompanha cada etapa' },
  { icone: 'how_to_vote', texto: 'Vota nos projetos da cidade e do seu bairro' },
  { icone: 'event_available', texto: 'Agenda serviços e recebe o protocolo na hora' },
  { icone: 'notifications', texto: 'Recebe os alertas da Defesa Civil do seu bairro' },
];

// Painel azul à esquerda das páginas de conta: logo, mensagem no meio e rodapé curto.
// Recebe o tipo ("entrar" mostra o que a conta permite; "endereco" mostra o bairro e quem cuida dele)
// e o bairro (distrito) achado pelo CEP ou escolhido: "" quando o CEP foi achado e falta escolher
// o distrito; null sem um CEP válido de São Paulo (aí não mostra bairro nenhum).
export default function PainelConta({ tipo = 'entrar', bairro }) {
  const subprefeitura = bairro ? subprefeituraDe(bairro) : null;

  return (
    <aside className={classes.painel} aria-label="Sobre a conta">
      <Link to="/inicio" className={classes.marca} aria-label="Minha Prefeitura, ir para o início">
        <img
          className={classes.marcaIcone}
          src="img/logo-icone.png"
          alt=""
          width="40"
          height="40"
        />
        <span aria-hidden="true">Minha Prefeitura</span>
      </Link>

      {tipo === 'entrar' ? (
        <div className={classes.mensagem}>
          <h2 className={classes.titulo}>Com a sua conta</h2>
          <p className={classes.texto}>
            Tudo o que você faz com a prefeitura fica guardado em um lugar.
          </p>
          <ul className={classes.lista}>
            {VANTAGENS.map((item) => (
              <li key={item.icone}>
                <Icone nome={item.icone} />
                {item.texto}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className={classes.mensagem}>
          <h2 className={classes.titulo}>Seu endereço define o seu bairro</h2>
          <p className={classes.texto}>
            O app mostra os avisos, as obras e as votações do bairro onde você mora.
          </p>
          <dl className={classes.bairro} aria-live="polite">
            <div className={classes.bairroLinha}>
              <Icone nome="home_pin" />
              <div>
                <dt>Seu bairro</dt>
                <dd>
                  {bairro ||
                    (bairro === '' ? 'Escolha o distrito' : 'Aparece quando você digitar o CEP')}
                </dd>
              </div>
            </div>
            {subprefeitura && (
              <div className={classes.bairroLinha}>
                <Icone nome="account_balance" />
                <div>
                  <dt>Quem cuida</dt>
                  <dd>{subprefeitura}</dd>
                </div>
              </div>
            )}
          </dl>
          <p className={classes.texto}>
            <span className={classes.linha}>
              Pedidos podem ser abertos para qualquer lugar da cidade.
            </span>
            <span className={classes.linha}>
              Você troca o endereço quando quiser, no Meu perfil.
            </span>
          </p>
        </div>
      )}

      <p className={classes.pe}>
        © 2026 Minha Prefeitura · <Link to="/ajuda/privacidade">Privacidade</Link>
      </p>
    </aside>
  );
}
