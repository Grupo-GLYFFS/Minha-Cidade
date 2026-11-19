import { useLocation } from 'react-router-dom';
import Botao from '../Botao';
import { useAvisoTemporario } from '../../contexto/useAvisoTemporario';
import { compartilharLink } from '../../logica/compartilhar';

// Compartilhar da barra "‹ Voltar" no celular: botão de 44 só com o ícone, azul.
// Abre a folha de compartilhar do aparelho; sem ela, copia o link e avisa no rodapé.
// Use em <Pagina acaoTopo={<CompartilharTopo ... />}> nos detalhes.
// Recebe o titulo da página e o rotulo do botão (ex.: "Compartilhar pedido").
export default function CompartilharTopo({ titulo, rotulo = 'Compartilhar' }) {
  const { pathname } = useLocation();
  const mostrarAviso = useAvisoTemporario();

  async function compartilhar() {
    const resultado = await compartilharLink({ titulo, caminho: pathname });
    if (resultado === 'copiado') mostrarAviso('Link copiado.');
    if (resultado === 'erro') mostrarAviso('Não deu para copiar o link.');
  }

  return <Botao variante="icone-acao" icone="share" aria-label={rotulo} onClick={compartilhar} />;
}
