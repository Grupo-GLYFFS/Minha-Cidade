import Botao from '../Botao';
import { useAcaoPendente } from '../../contexto/useAcaoPendente';
import { useAvisoTemporario } from '../../contexto/useAvisoTemporario';

// Botão Seguir/Seguindo de uma obra ou votação (toggle com aria-pressed).
// Para o visitante, leva para "Entrar", que depois volta para esta página já seguindo.
// Recebe:
// - chave: o que é seguido, para lembrar do pedido do visitante (ex.: "obra:ubs-vila-mariana");
// - seguindo (true/false) e aoAlternar(): troca o estado;
// - logado: se há alguém na conta;
// - nome: o que é seguido, para o leitor de tela (ex.: "a obra Reforma do Parque da Lapa");
// - compacto: 44 px (dentro de cards).
export default function BotaoSeguir({
  chave,
  seguindo,
  aoAlternar,
  logado,
  nome,
  compacto = false,
}) {
  const mostrarAviso = useAvisoTemporario();
  // Texto curto do aviso: "esta obra" ou "esta votação" (vem do começo da chave)
  const oQue = chave.startsWith('votacao') ? 'esta votação' : 'esta obra';

  // Pedido pelo visitante: segue quando ele volta logado (só liga, nunca desliga)
  const seguirDepois = useAcaoPendente(`seguir-${chave}`, () => {
    if (seguindo) return;
    aoAlternar();
    mostrarAviso(`Você está seguindo ${oQue}.`, '/perfil/seguindo');
  });

  // Liga ou desliga e confirma no rodapé da tela
  function alternar() {
    aoAlternar();
    if (seguindo) mostrarAviso(`Você deixou de seguir ${oQue}.`);
    else mostrarAviso(`Você está seguindo ${oQue}.`, '/perfil/seguindo');
  }

  if (!logado) {
    return (
      <Botao
        variante="secundario"
        compacto={compacto}
        icone="add"
        onClick={seguirDepois}
        aria-label={`Seguir ${nome}. Entre na sua conta para seguir`}
      >
        Seguir
      </Botao>
    );
  }

  return (
    <Botao
      variante="secundario"
      compacto={compacto}
      icone="add"
      pressionado={seguindo}
      onClick={alternar}
      aria-label={seguindo ? `Seguindo ${nome}. Deixar de seguir` : `Seguir ${nome}`}
    >
      {seguindo ? 'Seguindo' : 'Seguir'}
    </Botao>
  );
}
