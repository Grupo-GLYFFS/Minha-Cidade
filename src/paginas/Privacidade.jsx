import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import SecaoCard from '../componentes/SecaoCard';
import LinhaDado from '../componentes/LinhaDado';
import PilhaCards from '../componentes/ajuda/PilhaCards';
import TextoCard from '../componentes/ajuda/TextoCard';
import { DADOS_GUARDADOS, DADOS_NAO_GUARDADOS } from '../dados/privacidade';

// Privacidade (/ajuda/privacidade): o que fica guardado neste navegador, o que não fica,
// os direitos pela LGPD (com atalhos para Meu perfil e Configurações) e o aviso de protótipo.
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
          {DADOS_GUARDADOS.map((item) => (
            <LinhaDado
              key={item.rotulo}
              icone={item.icone}
              rotulo={item.rotulo}
              valor={item.detalhe}
            />
          ))}
        </SecaoCard>

        <SecaoCard titulo="O que não fica guardado" lista>
          {DADOS_NAO_GUARDADOS.map((item) => (
            <LinhaDado
              key={item.rotulo}
              icone={item.icone}
              rotulo={item.rotulo}
              valor={item.detalhe}
            />
          ))}
        </SecaoCard>

        <SecaoCard titulo="Seus direitos pela LGPD" lista>
          <TextoCard antesDaLista>
            <p>
              A Lei Geral de Proteção de Dados (Lei 13.709/2018) garante que você saiba o que é
              guardado sobre você, corrija o que estiver errado e peça para apagar pelo 156.
            </p>
          </TextoCard>
          <LinhaDado
            icone="badge"
            rotulo="Ver e corrigir seus dados"
            valor="Meu perfil"
            para="/perfil"
          />
          <LinhaDado
            icone="notifications"
            rotulo="Escolher o que receber"
            valor="Configurações"
            para="/configuracoes"
          />
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
