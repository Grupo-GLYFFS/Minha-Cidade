// Regras da navegação do celular: qual aba fica marcada e para onde vai o "‹ Voltar".

// Consulta do celular para o useMediaQuery: a mesma medida do $mantine-breakpoint-sm dos CSS Modules
export const CONSULTA_CELULAR = '(max-width: 48em)';

// Caminhos que ficam na aba Mais: conta, ajuda e Global Solution
const CAMINHOS_MAIS = [
  '/perfil',
  '/configuracoes',
  '/notificacoes',
  '/ajuda/',
  '/como-funciona',
  '/impacto',
  '/equipe',
];

// Páginas da conta (sem trilha): o "‹ Voltar" delas é o "‹ Mais", que abre a folha Mais
const CAMINHOS_CONTA = ['/perfil', '/configuracoes', '/notificacoes'];

// Páginas de 1º nível: não têm barra "‹ Voltar" no celular
export const PAGINAS_PRIMEIRO_NIVEL = ['/inicio', '/servicos', '/minha-cidade', '/meu-bairro'];

// Diz se o caminho é igual a um dos itens ou fica dentro dele.
// Recebe o caminho e a lista; devolve true ou false.
function comecaCom(caminho, lista) {
  return lista.some(
    (item) => caminho === item || caminho.startsWith(item.endsWith('/') ? item : `${item}/`),
  );
}

// Diz qual aba da barra do celular fica marcada.
// Recebe o caminho (pathname) e a busca (search); devolve "inicio", "servicos", "cidade",
// "bairro", "mais" ou null.
// O Abrir pedido aberto pelos Pedidos do bairro (?de=bairro) fica no Bairro; sem isso, na Cidade.
export function abaDoCelular(caminho, busca = '') {
  if (caminho === '/inicio') return 'inicio';
  if (caminho === '/' || comecaCom(caminho, CAMINHOS_MAIS)) return 'mais';
  if (comecaCom(caminho, ['/servicos', '/busca'])) return 'servicos';
  if (comecaCom(caminho, ['/meu-bairro'])) return 'bairro';
  if (caminho === '/pedidos/novo') {
    return new URLSearchParams(busca).get('de') === 'bairro' ? 'bairro' : 'cidade';
  }
  if (comecaCom(caminho, ['/minha-cidade', '/pedidos'])) return 'cidade';
  return null;
}

// Diz se a página é da conta (o "‹ Voltar" vira "‹ Mais").
// Recebe o caminho; devolve true ou false.
export function ehPaginaDaConta(caminho) {
  return comecaCom(caminho, CAMINHOS_CONTA);
}

// Páginas sem trilha que têm um "pai" fixo no celular (como nas pranchas)
const PAIS_SEM_TRILHA = {
  '/servicos/minhas-solicitacoes': { rotulo: 'Serviços', para: '/servicos' },
  '/entrar': { rotulo: 'Início', para: '/inicio' },
  '/criar-conta': { rotulo: 'Início', para: '/inicio' },
};

// Monta o destino do "‹ Voltar": o penúltimo nível da trilha do cabeçalho ou, sem trilha,
// o pai fixo da página.
// Recebe a trilha [{ rotulo, para }] e o caminho; devolve { rotulo, para } ou null
// (aí a barra mostra "‹ Voltar" e volta uma página no histórico).
export function voltarDaTrilha(trilha, caminho = '') {
  if (trilha?.length >= 2) {
    const pai = trilha[trilha.length - 2];
    if (pai.para) return { rotulo: pai.rotulo, para: pai.para };
  }
  return PAIS_SEM_TRILHA[caminho] ?? null;
}
