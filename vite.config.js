import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Põe o JavaScript dentro do index.html no build.
// O Chrome não carrega <script type="module" src="..."> quando o arquivo é aberto direto do
// disco (file://), então o código vai escrito dentro da própria página. Também tira o
// "crossorigin" das tags, que faz o navegador bloquear o CSS fora de um servidor.
function scriptDentroDoHtml() {
  return {
    name: 'script-dentro-do-html',
    apply: 'build',
    enforce: 'post',
    generateBundle(_opcoes, pacote) {
      const html = pacote['index.html'];
      if (!html) return;
      // Tira o "crossorigin" antes de pôr o código, para não mexer no texto do JavaScript
      let pagina = String(html.source).replace(/\s+crossorigin/g, '');

      for (const arquivo of Object.values(pacote)) {
        if (arquivo.type !== 'chunk' || !arquivo.isEntry) continue;
        const tag = new RegExp(`<script[^>]*src="[^"]*${arquivo.fileName}"[^>]*></script>`);
        // Troca "</script" por "<\/script" para um texto do código não fechar a tag antes da hora
        const codigo = arquivo.code.replace(/<\/script/gi, '<\\/script');
        pagina = pagina.replace(tag, () => `<script type="module">\n${codigo}\n</script>`);
        delete pacote[arquivo.fileName];
      }

      html.source = pagina;
    },
  };
}

// https://vite.dev/config/
// base './': os caminhos do build ficam relativos, para abrir o dist/index.html sem servidor.
export default defineConfig({
  base: './',
  plugins: [react(), scriptDentroDoHtml()],
  build: {
    rolldownOptions: {
      output: { codeSplitting: false },
    },
  },
});
