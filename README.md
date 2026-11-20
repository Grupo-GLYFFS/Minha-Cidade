# Minha Prefeitura

<img src="public/img/equipe/glyffs-escuro.svg" alt="GLYFFS" height="40">

Grupo GLYFFS

Os serviços da prefeitura e as melhorias da cidade num app só, onde o morador pede, acompanha, vota e avalia o que a prefeitura faz.

Global Solution 2026/2 — CitizenTech. FIAP, 1º ano de Engenharia de Software.

> Protótipo acadêmico com dados de exemplo. A demonstração usa a cidade de São Paulo, mas não é um serviço oficial da prefeitura.

## O problema

Quem precisa da prefeitura não sabe a qual secretaria recorrer e, depois de pedir, não consegue acompanhar o pedido. Muita reclamação fica em grupo de WhatsApp e nunca chega à prefeitura. E poucas prefeituras deixam o morador participar pela internet: votar no que a cidade faz, discutir os problemas do bairro ou usar um app da própria prefeitura.

**O dado:** só 27% das prefeituras deixaram o cidadão votar pela internet nos últimos 12 meses (23% nas cidades com até 10 mil habitantes). Só 14% têm fórum ou comunidade de discussão online, e só 24% têm app próprio (16% nas cidades com até 10 mil habitantes; 85% nas com mais de 500 mil).
Fonte: [TIC Governo 2025, Cetic.br/NIC.br](https://cetic.br/pt/pesquisa/governo/indicadores/), tabelas [E4A](https://cetic.br/pt/tics/governo/2025/prefeituras/E4A/) (participação pela internet) e [C6B](https://cetic.br/pt/tics/governo/2025/prefeituras/C6B/) (recursos para celular). Base: prefeituras com acesso à internet.

O Brasil tem 5.570 municípios e 44,8% deles têm até 10 mil habitantes ([IBGE, Censo 2022](https://censo2022.ibge.gov.br/)). É nesses lugares que a falta de participação digital pesa mais.

Os números estão na página de Apresentação (`/`), que é a primeira a abrir.

### ODS

| ODS                                                    | Como o app contribui                                                                                                |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| **11. Cidades e comunidades sustentáveis** (principal) | Pedidos, obras, orçamento e votações abertos para quem mora na cidade.                                              |
| **10. Redução das desigualdades**                      | A cidade pequena com o mesmo atendimento digital da capital, em linguagem simples e com recursos de acessibilidade. |
| **9. Indústria, inovação e infraestrutura**            | Tecnologia para cuidar da rua e atender melhor, sem fila e sem telefone.                                            |

## O que o app faz

O app é o mesmo para qualquer prefeitura: cada uma cadastra os seus serviços, bairros e dados. As áreas são:

- **Serviços:** 66 serviços em 12 assuntos (saúde, educação, zeladoria, impostos…), com busca. Cada um tem uma ficha (o que é, quem pode, documentos, prazo, onde ir). Parte deles tem pedido online, que fica em Minhas solicitações.
- **Pedidos de melhoria:** o morador relata um problema da rua (buraco, poste apagado, árvore), e o app sugere a categoria, monta o título e estima a gravidade a partir da descrição.
- **Minha cidade:** alertas, avisos, pedidos, obras, votações e orçamento da cidade toda, com as 32 subprefeituras e os 96 distritos.
- **Meu bairro:** o mesmo conteúdo recortado para o bairro de quem está usando (ou qualquer outro bairro).
- **Conta:** perfil, endereço (com busca do CEP), meus pedidos, meus votos, o que você segue, notificações e configurações.

### Participação

A parte que mais diferencia o app é o morador participando do começo ao fim:

1. **Pede** uma melhoria. Se já existe um pedido aberto igual (mesma categoria, bairro e rua), o app não cria outro e oferece apoiar o que já existe.
2. **Apoia** e **segue** pedidos de outros moradores. A prioridade é calculada por gravidade × urgência × tendência + apoios.
3. **Acompanha** cada etapa: Enviado → Em análise → Aprovado → Em execução → Concluído (ou Recusado, com o motivo). A análise da prefeitura é simulada: poucos segundos depois do envio o pedido passa para "Em análise".
4. **Vê as obras** que saíram dos pedidos, com andamento e prazo.
5. **Vota** nos grandes projetos (Sim ou Não) e confere o **orçamento** da cidade e do bairro: de onde vem o dinheiro e para onde vai.
6. **Avalia** o pedido depois de concluído.

## Como abrir

### Site publicado

[LINK DO SITE]

### Direto da pasta, sem instalar nada

Abra o arquivo `dist/index.html` com dois cliques (Chrome, Edge ou Firefox). No .zip da entrega, é o `index.html` da pasta. O site funciona direto do arquivo, sem servidor.

Precisa de internet para as fontes, os ícones e a busca do CEP (ViaCEP). Os dados que você cria (conta, pedidos, votos) ficam guardados só no seu navegador.

A pasta `dist/` não fica no repositório. Para gerá-la de novo: `npm install` e `npm run build`. É essa pasta que vai no .zip da entrega.

### Pelo código

Precisa do [Node.js](https://nodejs.org/) instalado.

```bash
npm install
npm run dev
```

Depois abra o endereço que aparecer no terminal (normalmente http://localhost:5173).

| Comando           | O que faz                              |
| ----------------- | -------------------------------------- |
| `npm run dev`     | Abre o app em modo de desenvolvimento  |
| `npm run build`   | Gera a versão final na pasta `dist/`   |
| `npm run preview` | Abre a versão final num servidor local |
| `npm run lint`    | Procura erros no código (oxlint)       |
| `npm run format`  | Formata o código com o Prettier        |

## Conta de demonstração

| Campo  | Valor               |
| ------ | ------------------- |
| E-mail | `maria@exemplo.com` |
| CPF    | `529.982.247-25`    |
| Senha  | `demo1234`          |

Dá para entrar com o e-mail ou com o CPF. O botão "Entrar com gov.br" também entra na conta da Maria (o gov.br é simulado). A Maria mora na Vila Mariana e já tem pedidos, votos e solicitações de exemplo. Também dá para criar uma conta nova em "Criar conta".

## Mapa das páginas

O endereço de cada página fica depois do `#` (por exemplo, `index.html#/servicos`). Isso é o que permite abrir o site direto do arquivo.

| Rota                                                                    | Página                                                             |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `/`                                                                     | Apresentação: problema, dado com fonte, ODS e a solução            |
| `/como-funciona`                                                        | Como funciona (o ciclo do pedido)                                  |
| `/impacto`                                                              | Impacto                                                            |
| `/equipe`                                                               | Equipe e pitch                                                     |
| `/inicio`                                                               | Início do morador                                                  |
| `/busca`                                                                | Busca geral                                                        |
| `/servicos`, `/servicos/categoria/:id`                                  | Catálogo de serviços                                               |
| `/servicos/:id`                                                         | Ficha do serviço                                                   |
| `/servicos/:id/solicitar`                                               | Solicitar o serviço (precisa entrar)                               |
| `/servicos/minhas-solicitacoes`, `/servicos/minhas-solicitacoes/:id`    | Minhas solicitações                                                |
| `/minha-cidade`                                                         | Cidade                                                             |
| `/minha-cidade/subprefeituras/:id`, `/minha-cidade/bairros/:id`         | Subprefeitura e bairro                                             |
| `/minha-cidade/{alertas,avisos,pedidos,obras,votacoes,orcamento}`       | Listas da cidade (cada uma com detalhe em `/:id`, menos orçamento) |
| `/meu-bairro`, `/meu-bairro/escolher`                                   | Meu bairro e a escolha do bairro                                   |
| `/meu-bairro/{alertas,avisos,pedidos,obras,votacoes,orcamento}`         | As mesmas listas, só do bairro                                     |
| `/pedidos/novo`                                                         | Abrir pedido (4 etapas)                                            |
| `/perfil`, `/perfil/pedidos`, `/perfil/votos`, `/perfil/seguindo`       | Meu perfil, meus pedidos, meus votos, o que você segue             |
| `/notificacoes`, `/configuracoes`                                       | Notificações e configurações (inclui acessibilidade)               |
| `/entrar`, `/entrar/esqueci`, `/entrar/nova-senha`, `/criar-conta`      | Conta                                                              |
| `/ajuda/perguntas-frequentes`, `/ajuda/telefones`, `/ajuda/privacidade` | Ajuda                                                              |
| `*`                                                                     | Página não encontrada                                              |

O menu do topo e o rodapé são os mesmos em todas as páginas (`src/componentes/Topo.jsx`, `src/componentes/Rodape.jsx`, montados por `src/componentes/Pagina.jsx`). As rotas estão em `src/App.jsx` e os itens do menu em `src/dados/navegacao.js`.

## Como cada critério foi atendido

| Critério                                                | Onde está                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Home: problema, dado com fonte e ODS**                | `src/paginas/Apresentacao.jsx`, com `src/componentes/gs/HeroiGs.jsx` (dados da TIC Governo 2025 e link da fonte), `src/componentes/gs/MapaBrasil.jsx` (IBGE), `src/componentes/gs/OdsGs.jsx`. Dados em `src/dados/pesquisaTic.js` e `src/dados/ods.js`.                                                                                                                                                                                                                                                                                                                                                                                                            |
| **4 páginas ou mais, mesmo menu, HTML semântico**       | Apresentação, Como funciona, Impacto e Equipe (`src/paginas/`), além de todas as páginas do app. Todas usam `Pagina.jsx`, com `<header>`, `<nav>`, `<main>` e `<footer>`; o conteúdo usa `<section>`, `<article>`, listas e títulos em ordem.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Simulação com array de 10+ objetos mostrado via DOM** | `src/dados/pedidos.js` (35 pedidos) mostrado em `src/paginas/PedidosCidade.jsx` e `src/componentes/pedidos/ListaPedidos.jsx`, com filtros, busca, ordem e agrupamento. A lógica fica em `src/logica/`: `prioridade.js` (cálculo da prioridade), `duplicados.js` (pedido repetido), `apoios.js`, `analiseSimulada.js` (análise da prefeitura) e `novoPedido.js`. O estado fica em `src/contexto/PedidosProvider.jsx`.                                                                                                                                                                                                                                               |
| **Outros arrays com 10+ objetos**                       | `src/dados/servicos/` (66 serviços), `bairrosCidade.js` (96), `apelidosBairros.js` (51), `subprefeituras.js` (32), `subprefeiturasOrcamento.js` (32), `bairros.js` (27), `notificacoes.js` (16), `obras.js` (12), `categoriasServicos.js` (12), `atualizacoesPedido.js` (11), `orcamento.js`, `orcamentoMensal.js`, `receitas.js` e `folhaPagamento.js` (10 cada).                                                                                                                                                                                                                                                                                                 |
| **Formulários validados em JS, sem `alert()`**          | Criar conta (`src/paginas/CriarConta.jsx` + `src/logica/esquemaCriarConta.js`), Entrar (`src/componentes/conta/FormularioEntrar.jsx` + `src/logica/esquemaEntrar.js`), Abrir pedido (`src/paginas/NovoPedido.jsx` + `src/logica/esquemaNovoPedido.js`), Solicitar serviço (`src/logica/esquemaServico.js`) e Meus dados (`src/logica/esquemaPerfil.js`). Os erros aparecem embaixo de cada campo e num resumo no topo (`src/componentes/ResumoErros.jsx`), que leva o foco até o campo. CPF com dígito verificador (`src/logica/cpf.js`), CEP pelo ViaCEP (`src/logica/buscarCep.js`). Não há `alert()` no código.                                                 |
| **Responsivo: media queries + flex/grid**               | Um CSS Module ao lado de cada componente (`*.module.css`), com `@media` em 85 arquivos e layouts em `display: flex` e `display: grid`. No celular as grades e as listas passam para uma coluna. Base em `src/estilos/global.css`.                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Acessibilidade**                                      | Link "Pular para o conteúdo" (`src/componentes/Pagina.jsx`); barra de acessibilidade no topo (`src/componentes/topo/BarraAcessibilidade.jsx`) com 4 tamanhos de letra (`src/dados/tamanhosLetra.js`), alto contraste e reduzir animações, também em Configurações (`src/paginas/Configuracoes.jsx`, `src/contexto/AcessibilidadeProvider.jsx`, `src/logica/acessibilidade.js`); foco visível em tudo que é clicável; `aria-label`, `aria-pressed`, `aria-expanded`, `aria-current`, `role="tab"` e `role="alert"` onde fazem sentido; `alt` em todas as imagens; todo campo com `<label>`; textos em contraste de pelo menos 7:1; situação sempre com cor e texto. |
| **Organização: pastas, sem CSS inline, README**         | Ver "Estrutura de pastas" abaixo. Não há `style={{...}}` nem atributo `style` no código.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

## Estrutura de pastas

O projeto usa React, que organiza os arquivos por componente e não em três pastas `css/`, `js/` e `img/`. A correspondência é esta:

| Pasta pedida | Onde fica aqui                                                                                                                      |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `css/`       | `src/estilos/global.css` (cores, fontes, alto contraste, tamanhos de letra) e um `.module.css` ao lado de cada componente em `src/` |
| `js/`        | `src/` inteiro: páginas, componentes, dados e regras                                                                                |
| `img/`       | `public/img/`                                                                                                                       |

```
public/img/          imagens (logo, avisos, obras, votações, mapas, celulares da Apresentação)
src/
  App.jsx            rotas
  main.jsx           ponto de partida
  paginas/           uma página por arquivo
  componentes/       partes reutilizadas, com pastas por área (pedidos, servicos, conta, gs...)
  dados/             dados de exemplo, um array por arquivo (serviços em dados/servicos/)
  logica/            regras puras: prioridade, duplicados, validação, datas, CEP...
  contexto/          estado compartilhado: sessão, pedidos, solicitações, votos, alertas, acessibilidade
  estilos/global.css CSS geral
  armazenamento.js   único arquivo que usa o localStorage
  tema.js            cores, fontes e espaçamentos do Mantine
vite.config.js       configuração do build (caminhos relativos, abre sem servidor)
```

## Tecnologias

- React 19 e Vite 8
- React Router (rotas com `#`)
- Mantine (componentes de interface) e CSS Modules
- react-hook-form e yup (formulários e validação)
- ViaCEP (busca do endereço pelo CEP)
- Material Symbols (ícones) e Google Fonts (Plus Jakarta Sans)
- oxlint e Prettier
- localStorage para guardar a conta, os pedidos e as preferências no navegador

A senha da conta fica só no navegador, guardada como hash. Num produto real ela iria para um servidor, com criptografia. O comprovante de residência é conferido (tipo e tamanho), mas não é guardado.

## Uso de IA

Usamos o Claude (Anthropic) como assistente no desenho das telas e na escrita do código. Todo o resultado foi revisado pelo grupo, que tomou as decisões de produto e de design e conferiu o código antes de entregar.

## Equipe

- Felipe Santos, RM 574050
- Samuel Almeida Santos, RM 572554
- Gabriel de Lucca Chiapetta Santana, RM 573610
- Leonardo de Lima Dias, RM 569286
- Fabricio Cardoso Nicoli, RM 571627

- **Pitch (vídeo):** [LINK DO PITCH]
- **Repositório:** https://github.com/Grupo-GLYFFS/Minha-Cidade
- **Site publicado:** [LINK DO SITE]
