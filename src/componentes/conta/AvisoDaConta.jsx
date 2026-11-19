import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AvisoFeito from '../servicos/AvisoFeito';

// Mostra, no alto da página de destino, o aviso mandado em state.aviso pelas ações da conta:
// "conta-criada" (CriarConta, com state.nome), "saiu" (useSair) e "senha-trocada" (Nova senha).
// Ao fechar, o aviso some e sai do histórico (não volta ao recarregar a página).
export default function AvisoDaConta() {
  const { pathname, search, state, key } = useLocation();
  const navigate = useNavigate();
  // Guarda em qual navegação o aviso foi fechado (uma navegação nova pode trazer outro aviso)
  const [fechadoEm, setFechadoEm] = useState(null);

  let texto = '';
  if (state?.aviso === 'conta-criada') {
    texto = state.nome ? `Conta criada! Boas-vindas, ${state.nome}!` : 'Conta criada! Boas-vindas!';
  } else if (state?.aviso === 'saiu') {
    texto = 'Você saiu da sua conta.';
  } else if (state?.aviso === 'senha-trocada') {
    texto = 'Senha trocada. Entre com a senha nova.';
  }
  if (fechadoEm === key) texto = '';

  // Fecha o aviso e tira o state do histórico
  function fechar() {
    setFechadoEm(key);
    navigate(pathname + search, { replace: true, state: null });
  }

  return <AvisoFeito texto={texto} aoFechar={fechar} />;
}
