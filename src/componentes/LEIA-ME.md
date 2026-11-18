# Componentes da base: o que usar para cada coisa

Veja tudo funcionando em `/componentes` (`npm run dev`). As regras completas estão em `.claude/regras-de-codigo.md` e `.claude/regras-de-consistencia.md` (as regras 15 a 18 valem mais).

## Regras rápidas

- Cores só por variável (`var(--cor-azul)`, `var(--cor-borda)`…, em `src/estilos/global.css`). Não use hex nos `.module.css`, senão o alto contraste quebra.
- Tamanhos com `rem()` nos CSS Modules. Nada de `style={{}}`.
- Ícone: `<Icone nome="construction" tamanho={20} />` (18, 20, 22, 24, 28, 32).
- Coluna de conteúdo de 880. O `<Pagina>` já cuida disso.
- Toda lista e todo detalhe têm os 4 estados: vazio, carregando, erro e não encontrado.

## Página nova (molde)

```jsx
import Pagina from '../componentes/Pagina';
import CabecalhoPagina from '../componentes/CabecalhoPagina';
import ParaOndeIr from '../componentes/ParaOndeIr';

export default function ObrasCidade() {
  return (
    <Pagina
      cabecalho={
        <CabecalhoPagina
          tipo="lista"
          titulo="Obras da cidade de São Paulo"
          icone="construction"
          trilha={[{ rotulo: 'Cidade de São Paulo', para: '/minha-cidade' }, { rotulo: 'Obras' }]}
        />
      }
    >
      {/* conteúdo */}
      <ParaOndeIr
        destinos={[
          {
            icone: 'how_to_vote',
            titulo: 'Votações',
            meta: '3 abertas',
            para: '/minha-cidade/votacoes',
          },
        ]}
      />
    </Pagina>
  );
}
```

Depois, em `src/App.jsx`, troque a rota: tire o item de `src/dados/paginasEmConstrucao.js` (ou tire a página antiga de dentro do `<LayoutAntigo>`) e coloque `<Route path="…" element={<SuaPagina />} />` fora do `LayoutAntigo`.

## Moldura

| Para                                                          | Use                                   | Props principais                                                                                                                                                                       |
| ------------------------------------------------------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Página inteira (topo, faixa de alerta, coluna de 880, rodapé) | `Pagina`                              | `cabecalho`, `children`, `semFaixaAlerta`                                                                                                                                              |
| Cabeçalho da página (regra 16)                                | `CabecalhoPagina`                     | `tipo` (`lista`, `hub`, `detalhe`, `formulario`, `confirmacao`, `conta`), `titulo`, `subtitulo`, `trilha`, `icone`, `midia`, `categoria`, `etapas` + `etapaAtual`, `acoes`, `children` |
| Linha de metadados no cabeçalho                               | `MetaCabecalho`                       | `children` (selo, `<span>` com `<Icone>`)                                                                                                                                              |
| Trilha avulsa                                                 | `Trilha`                              | `itens`                                                                                                                                                                                |
| Item que não existe (página toda)                             | `<Pagina><NaoEncontrado …/></Pagina>` | `titulo`, `texto`, `icone`, `children` (botões)                                                                                                                                        |

O `Topo`, a `FaixaAlerta` e o `Rodape` já vêm no `Pagina`. Não use em outro lugar.

Tipos de cabeçalho:

- `lista`: `icone` igual ao do menu.
- `hub`: `midia={<svg…/>}`, um mapa de 880 × 220.
- `detalhe`: `midia` (imagem de 880 × 240) **ou** `icone` da categoria, mais `categoria={{ icone, rotulo }}`.
- `formulario`: `etapas={['Descreva', 'Onde fica', …]} etapaAtual={2}`.
- `confirmacao`: sem trilha.
- `conta`: só o título.

Não têm trilha: Início, Serviços, Cidade de São Paulo, as páginas da conta (Perfil, Configurações, Notificações, Meus pedidos, Minhas solicitações, Meus votos) e as confirmações.

## Botões

```jsx
<Botao variante="principal" icone="add">Abrir pedido</Botao>
<Botao variante="secundario" icone="arrow_forward" iconeDireita para="/minha-cidade/obras">Ver obras</Botao>
<Botao variante="texto" compacto icone="arrow_forward" iconeDireita para="…">Ver todos</Botao>
<Botao variante="icone-acao" icone="share" aria-label="Compartilhar obra" />
<Botao variante="fechar" aria-label="Fechar" onClick={…} />
<Botao variante="perigo" icone="event_busy">Cancelar agendamento</Botao>
<Botao variante="secundario" icone="add" pressionado={seguindo} onClick={…}>{seguindo ? 'Seguindo' : 'Seguir'}</Botao>
<Botao variante="principal" carregando icone="send" iconeDireita>Enviando…</Botao>
<Botao variante="secundario" desabilitado aria-label="Seguir. Você já recebe as atualizações">Seguir</Botao>
<Botao variante="secundario" largo icone="expand_more" iconeDireita>Mostrar mais 6 pedidos</Botao>
```

- `variante`: `principal`, `secundario`, `texto`, `icone`, `icone-acao`, `fechar`, `perigo`, `branco` (sobre o azul) ou `topo`.
- Outras props: `compacto` (44, só dentro de cards e no topo), `largo`, `icone`, `iconeDireita`, `pressionado` + `iconeLigado`, `carregando`, `desabilitado`, `contagem`, `para` (rota) ou `href`. Sem destino, vira `<button>` (use `onClick`, `type="submit"`).
- Ícone à direita para avançar, enviar e expandir. À esquerda quando descreve a ação (Compartilhar, Seguir, Voltar).
- Pares: `<GrupoBotoes>` (secundário primeiro, o principal fica à direita). Em formulário, `<GrupoBotoes formulario>` (Voltar à esquerda, Continuar à direita).

## Cards e listas

| Para                                                  | Use            | Props principais                                                           |
| ----------------------------------------------------- | -------------- | -------------------------------------------------------------------------- |
| Seção de conteúdo em card (h2 + linha + corpo)        | `SecaoCard`    | `titulo`, `contagem`, `acao`, `lista`                                      |
| Linha "rótulo … valor" com divisória de borda a borda | `LinhaDado`    | `icone`, `rotulo`, `valor`, `para`, `acao`                                 |
| Card genérico (clicável ou não)                       | `Cartao`       | `para`, `seta`, `topo`, `rodape`, `component`                              |
| Pedido em qualquer lista                              | `CardPedido`   | `pedido`, `midia`, `nivelTitulo`                                           |
| Título de grupo numa lista agrupada                   | `TituloGrupo`  | `titulo`, `contagem`, `cor`, `id`, `nivel`                                 |
| Cards do fim da página                                | `ParaOndeIr`   | `destinos` [{ icone, titulo, meta, para }]                                 |
| Situação (5 cores)                                    | `SeloSituacao` | `cor` (`cinza`, `azul`, `ambar`, `verde`, `vermelho`), `children`          |
| Abas com contagem                                     | `Abas`         | `abas` [{ id, rotulo, contagem }], `ativa`, `aoMudar`, `rotulo`, `prefixo` |
| Filtro ou atalho                                      | `Chip`         | `pressionado`, `contagem`, `icone`, `para`, `href`                         |

```jsx
<SecaoCard titulo="Seus dados" lista acao={<Botao variante="texto" compacto icone="edit">Editar</Botao>}>
  <LinhaDado icone="person" rotulo="Nome" valor="Maria Souza" />
  <LinhaDado icone="settings" rotulo="Configurações" para="/configuracoes" />
</SecaoCard>

<TituloGrupo titulo="Em análise" contagem={4} cor="ambar" id="grupo-analise" />
<ul aria-labelledby="grupo-analise">{pedidos.map((p) => <li key={p.id}><CardPedido pedido={p} /></li>)}</ul>
```

- Abas: o painel da aba `x` tem `id="<prefixo>-painel-x"`, `role="tabpanel"` e `aria-labelledby="<prefixo>-aba-x"`.
- A cor do selo de um pedido vem de `buscarStatus(id).cor` (`src/dados/statusPedido.js`).

## Popups e formulários

```jsx
<Popup aberto={aberto} aoFechar={fechar} titulo="Editar seus dados"
  botoes={<><Botao variante="secundario" onClick={fechar}>Cancelar</Botao><Botao variante="principal" onClick={handleSubmit(salvar)}>Salvar</Botao></>}>
  <CampoTexto id="nome" rotulo="Nome" erro={errors.nome?.message} {...register('nome')} />
</Popup>

<ResumoErros erros={[{ campo: 'cep', rotulo: 'CEP', mensagem: 'Digite os 8 números do CEP.' }]} />
<CamposLado>
  <CampoTexto id="cep" rotulo="CEP" />
  <CampoTexto id="numero" rotulo="Número" />
</CamposLado>
<CampoTexto id="descricao" rotulo="O que está acontecendo?" multilinha ajuda={['Frase um.', 'Frase dois.']} />
```

- `Popup`: `aberto`, `aoFechar`, `titulo`, `children`, `botoes`, `largura`. É o `Modal` do Mantine (foco, Esc, fundo). `LinhaDado` dentro dele vai de borda a borda. A faixa de botões fica fora do corpo: para enviar um formulário, use `onClick={handleSubmit(salvar)}` no principal.
- `CampoTexto`: `rotulo`, `ajuda` (uma frase por linha), `erro`, `multilinha`, mais as props do `TextInput`. Sempre com `id`.
- Sem a frase "Os campos com * são obrigatórios".

## Estados

```jsx
<EstadoVazio icone="inbox" titulo="Você ainda não abriu nenhum pedido" texto="…">
  <Botao variante="principal" icone="add" para="/pedidos/novo">Abrir pedido</Botao>
</EstadoVazio>
<EstadoCarregando texto="Carregando os pedidos…" />
<EstadoErro titulo="Não conseguimos carregar os pedidos agora" aoTentarDeNovo={recarregar} />
```

## O que ainda é provisório

- `Rodape`: simples, até o usuário escolher o novo.
- `Topo` no celular: o menu some abaixo de 992 px.
- `LayoutAntigo`, `CabecalhoAntigo`, `Etiqueta`, `EtiquetaStatus`, `SecaoCabecalho`, `LinkVoltar`, `AvisoAlerta` e `TextoResponsivo`: só as telas antigas usam. Não use em página nova. Apague quando a última tela que usa for refeita.
- Rotas sem tela: `src/dados/paginasEmConstrucao.js`.
