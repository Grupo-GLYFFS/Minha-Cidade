import { useState } from 'react';
import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import SecaoCard from '../componentes/SecaoCard';
import PilhaCards from '../componentes/ajuda/PilhaCards';
import Interruptor from '../componentes/configuracoes/Interruptor';
import LinhaAjuste from '../componentes/configuracoes/LinhaAjuste';
import ListaAjustes from '../componentes/configuracoes/ListaAjustes';
import SeletorLetra from '../componentes/configuracoes/SeletorLetra';
import PopupCanais from '../componentes/configuracoes/PopupCanais';
import PopupDesligarAlertas from '../componentes/configuracoes/PopupDesligarAlertas';
import { useAcessibilidade } from '../contexto/useAcessibilidade';
import { usePreferenciasAvisos } from '../contexto/usePreferenciasAvisos';
import { useSessao } from '../contexto/useSessao';
import { TIPOS_AVISO } from '../dados/avisosConta';
import { rotuloComBairro, textoCanais } from '../logica/avisosConta';
import { lugarPorNome, noLugar } from '../logica/lugares';

// Configurações (/configuracoes): três cards.
// - Acessibilidade: tamanho da letra e alto contraste (os mesmos da barra do topo).
// - Alertas: liga e desliga os alertas de emergência (desligar pede confirmação), "Por onde"
//   e as faixas de alerta no alto das páginas (vêm desligadas).
// - Notificações: um tipo por linha; tocar abre o popup com os canais (No app, E-mail, SMS).
// Sem "Para onde ir" (regra 14).
export default function Configuracoes() {
  const acessibilidade = useAcessibilidade();
  const { preferencias, ligarAlertas, mudarCanais } = usePreferenciasAvisos();
  const { usuario } = useSessao();
  // Popup aberto: null, "desligar" ou o id do tipo cujos canais estão abertos ("alertas"…)
  const [popup, setPopup] = useState(null);
  // Muda a cada abertura do popup de canais, para ele começar dos canais salvos
  const [abertura, setAbertura] = useState(0);

  const bairro = usuario.bairro;
  const tipos = TIPOS_AVISO.map((tipo) => ({
    ...tipo,
    rotulo: rotuloComBairro(tipo.rotulo, bairro),
  }));
  const tipoAberto =
    popup === 'alertas'
      ? { id: 'alertas', rotulo: 'Alertas de emergência', canais: preferencias.alertas.canais }
      : tipos.find((tipo) => tipo.id === popup);

  // Abre o popup de canais de um tipo. Recebe o id do tipo.
  function abrirCanais(idTipo) {
    setAbertura((atual) => atual + 1);
    setPopup(idTipo);
  }

  // Interruptor dos alertas: ligar é direto; desligar pede confirmação
  function mudarAlertas(ligar) {
    if (ligar) ligarAlertas(true);
    else setPopup('desligar');
  }

  return (
    <Pagina cabecalho={<CabecalhoPagina tipo="conta" titulo="Configurações" />}>
      <PilhaCards>
        <SecaoCard titulo="Acessibilidade" lista>
          <ListaAjustes>
            <LinhaAjuste
              rotulo="Tamanho da letra"
              empilhar
              controle={(idRotulo) => (
                <SeletorLetra
                  atual={acessibilidade.tamanhoLetra}
                  aoEscolher={acessibilidade.definirTamanho}
                  idRotulo={idRotulo}
                />
              )}
            />
            <LinhaAjuste
              rotulo="Alto contraste"
              controle={(idRotulo) => (
                <Interruptor
                  ligado={acessibilidade.altoContraste}
                  aoMudar={acessibilidade.alternarAltoContraste}
                  idRotulo={idRotulo}
                />
              )}
            />
          </ListaAjustes>
        </SecaoCard>

        <SecaoCard titulo="Alertas" lista>
          <ListaAjustes>
            <LinhaAjuste
              icone="warning"
              rotulo="Alertas de emergência"
              detalhe={`Defesa Civil, ${noLugar(lugarPorNome(bairro))} e na cidade toda`}
              controle={(idRotulo) => (
                <Interruptor
                  ligado={preferencias.alertas.ligados}
                  aoMudar={mudarAlertas}
                  idRotulo={idRotulo}
                />
              )}
            />
            {preferencias.alertas.ligados && (
              <LinhaAjuste
                rotulo="Por onde"
                valor={textoCanais(preferencias.alertas.canais)}
                aoClicar={() => abrirCanais('alertas')}
              />
            )}
            <LinhaAjuste
              rotulo="Faixas de alerta"
              detalhe="Mostra no alto das páginas os alertas da Defesa Civil."
              controle={(idRotulo) => (
                <Interruptor
                  ligado={acessibilidade.mostrarFaixasAlerta}
                  aoMudar={acessibilidade.alternarFaixasAlerta}
                  idRotulo={idRotulo}
                />
              )}
            />
          </ListaAjustes>
        </SecaoCard>

        <SecaoCard titulo="Notificações" lista>
          <ListaAjustes>
            {tipos.map((tipo) => (
              <LinhaAjuste
                key={tipo.id}
                icone={tipo.icone}
                rotulo={tipo.rotulo}
                valor={textoCanais(preferencias.canais[tipo.id])}
                aoClicar={() => abrirCanais(tipo.id)}
              />
            ))}
          </ListaAjustes>
        </SecaoCard>
      </PilhaCards>

      {tipoAberto && (
        <PopupCanais
          key={abertura}
          aberto
          titulo={tipoAberto.rotulo}
          canais={
            tipoAberto.id === 'alertas' ? tipoAberto.canais : preferencias.canais[tipoAberto.id]
          }
          email={usuario.email}
          celular={usuario.celular}
          aoSalvar={(canais) => {
            mudarCanais(tipoAberto.id, canais);
            setPopup(null);
          }}
          aoFechar={() => setPopup(null)}
        />
      )}

      <PopupDesligarAlertas
        aberto={popup === 'desligar'}
        bairro={bairro}
        aoConfirmar={() => {
          ligarAlertas(false);
          setPopup(null);
        }}
        aoFechar={() => setPopup(null)}
      />
    </Pagina>
  );
}
