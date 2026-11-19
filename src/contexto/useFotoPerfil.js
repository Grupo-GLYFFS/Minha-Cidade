import { useSyncExternalStore } from 'react';

// Foto de perfil escolhida em Meu perfil. Fica só na memória enquanto o app está aberto:
// a foto não é guardada no navegador (ver a página Privacidade).
let foto = null;
const ouvintes = new Set();

// Avisa os componentes que usam o hook. Recebe a função chamada a cada mudança.
function inscrever(ouvinte) {
  ouvintes.add(ouvinte);
  return () => ouvintes.delete(ouvinte);
}

// Troca a foto e avisa quem usa. Recebe o endereço da imagem (blob:) ou null para remover.
function trocarFoto(novaFoto) {
  if (foto) URL.revokeObjectURL(foto);
  foto = novaFoto;
  ouvintes.forEach((ouvinte) => ouvinte());
}

// Dá acesso à foto de perfil e às ações de trocar e remover.
// Devolve { foto, escolherArquivo(arquivo), removerFoto() }.
export function useFotoPerfil() {
  const atual = useSyncExternalStore(inscrever, () => foto);
  return {
    foto: atual,
    escolherArquivo: (arquivo) => trocarFoto(URL.createObjectURL(arquivo)),
    removerFoto: () => trocarFoto(null),
  };
}
