import { useLocation } from 'react-router-dom';
import Botao from '../Botao';

// Botão Seguir/Seguindo de uma obra ou votação (toggle com aria-pressed).
// Para o visitante, vira um link para "Entrar", que depois volta para esta página.
// Recebe:
// - seguindo (true/false) e aoAlternar(): troca o estado;
// - logado: se há alguém na conta;
// - nome: o que é seguido, para o leitor de tela (ex.: "a obra Reforma do Parque da Lapa");
// - compacto: 44 px (dentro de cards).
export default function BotaoSeguir({ seguindo, aoAlternar, logado, nome, compacto = false }) {
  const { pathname } = useLocation();

  if (!logado) {
    return (
      <Botao
        variante="secundario"
        compacto={compacto}
        icone="add"
        para={`/entrar?voltar=${encodeURIComponent(pathname)}`}
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
