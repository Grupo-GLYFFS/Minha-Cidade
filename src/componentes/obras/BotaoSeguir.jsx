import Botao from '../Botao';
import { useAcaoPendente } from '../../contexto/useAcaoPendente';

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
  // Pedido pelo visitante: segue quando ele volta logado (só liga, nunca desliga)
  const seguirDepois = useAcaoPendente(`seguir-${chave}`, () => {
    if (!seguindo) aoAlternar();
  });

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
      onClick={aoAlternar}
      aria-label={seguindo ? `Seguindo ${nome}. Deixar de seguir` : `Seguir ${nome}`}
    >
      {seguindo ? 'Seguindo' : 'Seguir'}
    </Botao>
  );
}
