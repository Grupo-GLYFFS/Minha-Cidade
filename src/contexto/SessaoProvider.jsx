import { useCallback, useEffect, useMemo, useState } from 'react';
import { ContextoSessao } from './ContextoSessao';
import { SENHA_DEMONSTRACAO, USUARIO } from '../dados/usuario';
import {
  apagarDado,
  apagarDadoDaAba,
  ehListaDeRegistros,
  ehObjeto,
  ehTexto,
  lerDado,
  lerDadoDaAba,
  salvarDado,
  salvarDadoDaAba,
} from '../armazenamento';
import { gerarHashSenha } from '../logica/senha';
import {
  ERRO_CPF_EM_USO,
  ERRO_EMAIL_EM_USO,
  ERRO_ENTRAR,
  aplicarAjustesDemonstracao,
  aplicarDadosNaConta,
  buscarContaPorCpf,
  buscarContaPorEmail,
  buscarContaPorLogin,
  limparDadosPessoais,
  montarConta,
  montarUsuario,
  normalizarEmail,
} from '../logica/contas';

// Nomes com que cada dado fica guardado no navegador
const CHAVE_CONTAS = 'contas';
const CHAVE_SESSAO = 'sessao';
// Mudanças feitas em "Meus dados" na conta de demonstração (a Maria fica no código)
const CHAVE_AJUSTES_DEMO = 'conta-demo-ajustes';

// Lê a sessão salva: primeiro a que fica no aparelho ("Manter conectado"), depois a que
// vale só enquanto a aba está aberta. Devolve { id, manter } (id null para visitante).
function lerSessaoSalva() {
  const fixa = lerDado(CHAVE_SESSAO, null, ehTexto);
  if (fixa) return { id: fixa, manter: true };
  return { id: lerDadoDaAba(CHAVE_SESSAO, null, ehTexto), manter: false };
}

// Guarda quem está usando o app: as contas criadas neste aparelho e a pessoa logada.
// A conta de demonstração (Maria) sempre existe; o que ela muda em "Meus dados" fica salvo à parte
// e é aplicado por cima dos dados de exemplo. O id de quem está logado fica salvo no aparelho
// ("Manter conectado") ou só na aba; recarregar a página mantém a pessoa dentro da conta.
// Recebe as telas do app (children), que leem os dados com useSessao().
export default function SessaoProvider({ children }) {
  const [contas, setContas] = useState(() => lerDado(CHAVE_CONTAS, [], ehListaDeRegistros));
  const [sessaoSalva] = useState(lerSessaoSalva);
  const [idLogado, setIdLogado] = useState(sessaoSalva.id);
  const [manter, setManter] = useState(sessaoSalva.manter);
  const [ajustesDemo, setAjustesDemo] = useState(() => lerDado(CHAVE_AJUSTES_DEMO, null, ehObjeto));

  // Salva as contas sempre que mudam (só depois da primeira conta, para não criar a chave à toa)
  useEffect(() => {
    if (contas.length > 0) salvarDado(CHAVE_CONTAS, contas);
  }, [contas]);

  // Salva as mudanças da conta de demonstração (só depois da primeira mudança)
  useEffect(() => {
    if (ajustesDemo) salvarDado(CHAVE_AJUSTES_DEMO, ajustesDemo);
  }, [ajustesDemo]);

  // Salva quem está logado (no aparelho ou só na aba); ao sair, apaga dos dois lugares
  useEffect(() => {
    apagarDado(CHAVE_SESSAO);
    apagarDadoDaAba(CHAVE_SESSAO);
    if (!idLogado) return;
    if (manter) salvarDado(CHAVE_SESSAO, idLogado);
    else salvarDadoDaAba(CHAVE_SESSAO, idLogado);
  }, [idLogado, manter]);

  // Pessoa logada no formato usado pelas telas, ou null para visitante
  const usuario = useMemo(() => {
    if (idLogado === USUARIO.id) return aplicarAjustesDemonstracao(USUARIO, ajustesDemo);
    const conta = contas.find((item) => item.id === idLogado);
    return conta ? montarUsuario(conta) : null;
  }, [idLogado, contas, ajustesDemo]);

  // Diz se o e-mail já tem conta (inclui a de demonstração). Recebe o e-mail; devolve true ou false.
  const emailEmUso = useCallback(
    (email) =>
      normalizarEmail(email) === USUARIO.email || Boolean(buscarContaPorEmail(contas, email)),
    [contas],
  );

  // Entra com e-mail (ou CPF) e senha.
  // Recebe o que a pessoa digitou, a senha e se é para manter conectado neste aparelho;
  // devolve uma promessa com { ok: true } ou { ok: false, erro }.
  const entrar = useCallback(
    async (login, senha, manterConectado = true) => {
      const conta = buscarContaPorLogin([USUARIO, ...contas], login);
      if (!conta) return { ok: false, erro: ERRO_ENTRAR };
      // O e-mail da conta é o "sal" do hash, então o CPF também serve para entrar
      const hashDigitado = await gerarHashSenha(conta.email, senha);

      // A conta de demonstração confere com o hash da senha pública dela
      const hashCerto =
        conta.id === USUARIO.id
          ? await gerarHashSenha(USUARIO.email, SENHA_DEMONSTRACAO)
          : conta.hashSenha;
      if (hashDigitado !== hashCerto) return { ok: false, erro: ERRO_ENTRAR };
      setManter(manterConectado);
      setIdLogado(conta.id);
      return { ok: true };
    },
    [contas],
  );

  // Entra direto na conta de demonstração (botão "Entrar com gov.br", que simula a volta do gov.br)
  const entrarDemonstracao = useCallback(() => {
    setManter(true);
    setIdLogado(USUARIO.id);
  }, []);

  // Diz se o CPF já tem conta (inclui a de demonstração). Recebe o CPF; devolve true ou false.
  const cpfEmUso = useCallback(
    (cpf) => Boolean(buscarContaPorCpf([USUARIO, ...contas], cpf)),
    [contas],
  );

  // Cria a conta com os valores do formulário e já entra nela.
  // Recebe os valores validados; devolve uma promessa com { ok: true, usuario }
  // ou { ok: false, erro, campo } (campo = nome do campo com problema, ex.: "email").
  const criarConta = useCallback(
    async (valores) => {
      if (emailEmUso(valores.email)) return { ok: false, erro: ERRO_EMAIL_EM_USO, campo: 'email' };
      if (cpfEmUso(valores.cpf)) return { ok: false, erro: ERRO_CPF_EM_USO, campo: 'cpf' };
      const email = normalizarEmail(valores.email);
      const hash = await gerarHashSenha(email, valores.senha);
      const conta = montarConta(valores, hash, `u-${crypto.randomUUID()}`);
      setContas((atual) => [...atual, conta]);
      setManter(true);
      setIdLogado(conta.id);
      return { ok: true, usuario: montarUsuario(conta) };
    },
    [emailEmUso, cpfEmUso],
  );

  // Troca nome, celular e endereço da pessoa logada (tela "Meus dados").
  // Recebe os valores validados; devolve { ok: true } ou { ok: false } se ninguém estiver logado.
  // Na conta de demonstração, guarda só as mudanças; nas outras, troca a conta salva.
  const atualizarConta = useCallback(
    (valores) => {
      if (!idLogado) return { ok: false };
      if (idLogado === USUARIO.id) {
        setAjustesDemo(limparDadosPessoais(valores));
        return { ok: true };
      }
      setContas((atual) =>
        atual.map((conta) => (conta.id === idLogado ? aplicarDadosNaConta(conta, valores) : conta)),
      );
      return { ok: true };
    },
    [idLogado],
  );

  // Sai da conta: a pessoa volta a ser visitante
  const sair = useCallback(() => setIdLogado(null), []);

  const valor = useMemo(
    () => ({
      usuario,
      logado: usuario !== null,
      entrar,
      entrarDemonstracao,
      criarConta,
      emailEmUso,
      cpfEmUso,
      atualizarConta,
      sair,
    }),
    [usuario, entrar, entrarDemonstracao, criarConta, emailEmUso, cpfEmUso, atualizarConta, sair],
  );

  return <ContextoSessao.Provider value={valor}>{children}</ContextoSessao.Provider>;
}
