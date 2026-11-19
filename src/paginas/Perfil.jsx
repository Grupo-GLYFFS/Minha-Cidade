import { useState } from 'react';
import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import SecaoCard from '../componentes/SecaoCard';
import LinhaDado from '../componentes/LinhaDado';
import Botao from '../componentes/Botao';
import PilhaCards from '../componentes/ajuda/PilhaCards';
import BannerPerfil from '../componentes/perfil/BannerPerfil';
import CardEndereco from '../componentes/perfil/CardEndereco';
import PopupTrocarFoto from '../componentes/perfil/PopupTrocarFoto';
import PopupEditarDado from '../componentes/perfil/PopupEditarDado';
import PopupEditarEndereco from '../componentes/perfil/PopupEditarEndereco';
import { useSessao } from '../contexto/useSessao';
import { usePedidos } from '../contexto/usePedidos';
import { useSolicitacoes } from '../contexto/useSolicitacoes';
import { useVotos } from '../contexto/useVotos';
import { useSair } from '../contexto/useSair';
import { useFotoPerfil } from '../contexto/useFotoPerfil';
import { useOQueSegue } from '../contexto/useOQueSegue';
import { normalizarEmail, valoresMeusDados } from '../logica/contas';
import { mascararCpf } from '../logica/cpf';
import { regiaoDoBairro } from '../logica/enderecos';
import { DADOS_PERFIL } from '../logica/esquemaPerfil';
import classes from './Perfil.module.css';

// Escreve "1 voto" ou "2 votos". Recebe o número e as duas formas da palavra.
function contar(numero, singular, plural) {
  return `${numero} ${numero === 1 ? singular : plural}`;
}

// Meu perfil (/perfil): banner azul com a foto (Editar no mouse abre "Trocar foto"),
// "Seus dados" (cada dado com o lápis que abre o popup de edição), "Seu endereço"
// (Editar abre o popup do endereço), "Participação" (atalhos com os números) e Sair.
export default function Perfil() {
  const { usuario, atualizarConta, emailEmUso } = useSessao();
  const { pedidos } = usePedidos();
  const { seguidos } = useOQueSegue();
  const { solicitacoes } = useSolicitacoes();
  const { votosDaPessoa } = useVotos();
  const { foto, escolherArquivo, removerFoto } = useFotoPerfil();
  const sairDaConta = useSair();
  // Popup aberto: null, "foto", "endereco" ou o campo do dado ("nome", "celular"…)
  const [popup, setPopup] = useState(null);
  // Muda a cada abertura, para o popup começar do valor salvo
  const [abertura, setAbertura] = useState(0);

  const feitos = pedidos.filter((pedido) => pedido.autorId === usuario.id).length;
  const votos = Object.keys(votosDaPessoa ?? {}).length;
  const dadoAberto = DADOS_PERFIL.find((dado) => dado.campo === popup);

  // Abre um popup. Recebe o nome dele.
  function abrir(nome) {
    setAbertura((atual) => atual + 1);
    setPopup(nome);
  }

  // Salva mudanças na conta, mantendo o resto dos dados. Recebe só o que mudou.
  function salvar(mudancas) {
    atualizarConta({
      ...valoresMeusDados(usuario),
      email: usuario.email,
      cpf: usuario.cpf,
      ...mudancas,
    });
    setPopup(null);
  }

  // Valor mostrado na linha de cada dado (o CPF aparece mascarado)
  function valorDe(campo) {
    if (campo === 'cpf') return usuario.cpf ? mascararCpf(usuario.cpf) : 'Não informado';
    return usuario[campo];
  }

  return (
    <Pagina cabecalho={<CabecalhoPagina tipo="conta" titulo="Meu perfil" />}>
      <PilhaCards>
        <BannerPerfil usuario={usuario} foto={foto} aoTrocarFoto={() => abrir('foto')} />

        <SecaoCard titulo="Seus dados" lista>
          {DADOS_PERFIL.map((dado) => (
            <LinhaDado
              key={dado.campo}
              icone={dado.icone}
              rotulo={dado.rotulo}
              valor={valorDe(dado.campo)}
              acao={
                <Botao
                  variante="icone-acao"
                  icone="edit"
                  aria-haspopup="dialog"
                  aria-label={`Editar ${dado.rotulo === 'CPF' ? 'CPF' : dado.rotulo.toLowerCase()}`}
                  className={classes.lapis}
                  onClick={() => abrir(dado.campo)}
                />
              }
            />
          ))}
        </SecaoCard>

        <CardEndereco usuario={usuario} aoEditar={() => abrir('endereco')} />

        <SecaoCard titulo="Participação" lista>
          <LinhaDado
            icone="assignment"
            rotulo="Meus pedidos"
            valor={feitos > 0 ? contar(feitos, 'feito', 'feitos') : 'Nenhum ainda'}
            para="/perfil/pedidos"
          />
          <LinhaDado
            icone="event_available"
            rotulo="Minhas solicitações"
            valor={
              solicitacoes.length > 0
                ? contar(solicitacoes.length, 'solicitação', 'solicitações')
                : 'Nenhuma ainda'
            }
            para="/servicos/minhas-solicitacoes"
          />
          <LinhaDado
            icone="how_to_vote"
            rotulo="Meus votos"
            valor={votos > 0 ? contar(votos, 'voto', 'votos') : 'Nenhum ainda'}
            para="/perfil/votos"
          />
          <LinhaDado
            icone="bookmark"
            rotulo="O que você segue"
            valor={
              seguidos.total > 0
                ? [
                    contar(seguidos.votacoes.length, 'votação', 'votações'),
                    contar(seguidos.obras.length, 'obra', 'obras'),
                    contar(seguidos.pedidos.length, 'pedido', 'pedidos'),
                  ].join(' · ')
                : 'Nada ainda'
            }
            para="/perfil/seguindo"
          />
        </SecaoCard>

        <div className={classes.sair}>
          <Botao variante="secundario" largo icone="logout" onClick={sairDaConta}>
            Sair
          </Botao>
        </div>
      </PilhaCards>

      <PopupTrocarFoto
        aberto={popup === 'foto'}
        temFoto={Boolean(foto)}
        aoEscolher={escolherArquivo}
        aoRemover={removerFoto}
        aoFechar={() => setPopup(null)}
      />

      {dadoAberto && (
        <PopupEditarDado
          key={abertura}
          dado={dadoAberto}
          valorInicial={usuario[dadoAberto.campo]}
          validarExtra={(valor) =>
            dadoAberto.campo === 'email' &&
            normalizarEmail(valor) !== usuario.email &&
            emailEmUso(valor)
              ? 'Este e-mail já tem uma conta no app. Use outro e-mail.'
              : ''
          }
          aoSalvar={(valor) => salvar({ [dadoAberto.campo]: valor })}
          aoFechar={() => setPopup(null)}
        />
      )}

      {popup === 'endereco' && (
        <PopupEditarEndereco
          key={abertura}
          usuario={usuario}
          aoSalvar={(endereco) =>
            salvar({ ...endereco, regiao: regiaoDoBairro(endereco.bairro) ?? usuario.regiao })
          }
          aoFechar={() => setPopup(null)}
        />
      )}
    </Pagina>
  );
}
