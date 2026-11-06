# Minha Prefeitura

Global Solution 2026/2 — CitizenTech (FIAP, 1º ano de Engenharia de Software).

Os serviços da prefeitura e as melhorias do bairro em um só lugar. O app funciona para qualquer prefeitura; na demonstração usamos São Paulo, com dados de exemplo.

> Protótipo acadêmico. Não é um serviço oficial da Prefeitura de São Paulo.

## Como rodar

Precisa do [Node.js](https://nodejs.org/) instalado.

```bash
npm install
npm run dev
```

Depois abra o endereço que aparecer no terminal (normalmente http://localhost:5173).

Outros comandos:

| Comando           | O que faz                            |
| ----------------- | ------------------------------------ |
| `npm run build`   | Gera a versão final na pasta `dist/` |
| `npm run preview` | Abre a versão final para conferir    |
| `npm run lint`    | Procura erros no código              |
| `npm run format`  | Formata o código com o Prettier      |

## Tecnologias

React, Vite, React Router, Mantine, react-hook-form, yup, ViaCEP e Material Symbols (ícones).

## Estrutura de pastas

```
public/img/        imagens (logo)
src/
  componentes/     partes reutilizadas (cabeçalho, barra de abas, rodapé...)
  paginas/         uma página por arquivo
  dados/           listas de exemplo e itens de navegação
  estilos/         CSS geral
  armazenamento.js único arquivo que usa o localStorage
  tema.js          cores, fontes e espaçamentos do app
```

## Integrantes

_(preencher: nome e RM de cada integrante)_

## Pitch

_(preencher: link do vídeo)_

## Uso de inteligência artificial

_(preencher: quais ferramentas de IA foram usadas e para quê; todo o código foi revisado e entendido pelo grupo)_
