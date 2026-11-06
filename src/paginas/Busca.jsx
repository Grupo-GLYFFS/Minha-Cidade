import { useState } from 'react';
import { useLocation, useNavigationType, useSearchParams } from 'react-router-dom';
import ConteudoBusca from '../componentes/servicos/ConteudoBusca';

// Busca (aba Busca no celular): procura serviços pelo texto, que fica no endereço (?q=lixo).
// Enquanto a pessoa digita, o endereço é trocado sem criar histórico (replace).
// Quando a busca vem de fora (ex.: campo do cabeçalho ou a aba Busca), a tela recomeça
// com o novo texto: a "chave" muda a cada navegação que não é um replace.
export default function Busca() {
  const [parametros] = useSearchParams();
  const local = useLocation();
  const tipoNavegacao = useNavigationType();
  const [chave, setChave] = useState(local.key);

  // Ajusta a chave durante a renderização (padrão do React para estado derivado)
  if (tipoNavegacao !== 'REPLACE' && local.key !== chave) setChave(local.key);

  return <ConteudoBusca key={chave} textoInicial={parametros.get('q') ?? ''} />;
}
