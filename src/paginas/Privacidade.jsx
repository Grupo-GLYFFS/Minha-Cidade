import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import SecaoCard from '../componentes/SecaoCard';
import LinhaDado from '../componentes/LinhaDado';
import PilhaCards from '../componentes/ajuda/PilhaCards';
import TextoCard from '../componentes/ajuda/TextoCard';
import classes from './Privacidade.module.css';
import { DADOS_GUARDADOS, DADOS_NAO_GUARDADOS, DIREITOS_LGPD } from '../dados/privacidade';

// Privacidade (/ajuda/privacidade): o que fica guardado neste navegador, o que não fica,
// os direitos pela LGPD (só explicados, sem links) e o aviso de protótipo.
export default function Privacidade() {
  return (
    <Pagina
      cabecalho={
        <CabecalhoPagina
          tipo="lista"
          titulo="Privacidade"
          subtitulo="O que o Minha Prefeitura guarda sobre você e como apagar."
          icone="shield_person"
        />
      }
    >
      <PilhaCards>
        <SecaoCard titulo="O que fica guardado" lista>
          <TextoCard antesDaLista>
            <p>Tudo fica só neste navegador. Nada vai para a prefeitura nem para outra pessoa.</p>
          </TextoCard>
          <div className={classes.linhas}>
            {DADOS_GUARDADOS.map((item) => (
              <LinhaDado
                key={item.rotulo}
                icone={item.icone}
                rotulo={item.rotulo}
                valor={item.detalhe}
              />
            ))}
          </div>
        </SecaoCard>

        <SecaoCard titulo="O que não fica guardado" lista>
          <div className={classes.linhas}>
            {DADOS_NAO_GUARDADOS.map((item) => (
              <LinhaDado
                key={item.rotulo}
                icone={item.icone}
                rotulo={item.rotulo}
                valor={item.detalhe}
              />
            ))}
          </div>
        </SecaoCard>

        <SecaoCard titulo="Seus direitos pela LGPD" lista>
          <TextoCard antesDaLista>
            <p>A Lei Geral de Proteção de Dados (Lei 13.709/2018) garante estes direitos a você.</p>
          </TextoCard>
          <div className={classes.linhas}>
            {DIREITOS_LGPD.map((item) => (
              <LinhaDado
                key={item.rotulo}
                icone={item.icone}
                rotulo={item.rotulo}
                valor={item.detalhe}
              />
            ))}
          </div>
        </SecaoCard>

        <SecaoCard titulo="Sobre este app">
          <TextoCard>
            <p>
              O Minha Prefeitura é um protótipo feito por estudantes da FIAP, com dados de exemplo.
              Não é um serviço oficial da Prefeitura de São Paulo, e os pedidos feitos aqui não
              chegam a ela.
            </p>
            <p>Para pedidos de verdade, ligue 156.</p>
          </TextoCard>
        </SecaoCard>
      </PilhaCards>
    </Pagina>
  );
}
