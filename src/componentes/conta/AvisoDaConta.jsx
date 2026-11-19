import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AvisoFeito from '../servicos/AvisoFeito';

// Texto de cada aviso mandado em state.aviso. Recebe o state; devolve o texto ou "".
function textoDoAviso(state) {
  if (state?.aviso === 'conta-criada') {
    return state.nome ? `Conta criada! Boas-vindas, ${state.nome}!` : 'Conta criada! Boas-vindas!';
  }
  if (state?.aviso === 'saiu') return 'Você saiu da sua conta.';
  if (state?.aviso === 'senha-trocada') return 'Senha trocada. Entre com a senha nova.';
  return '';
}

// Mostra, no alto da página de destino, o aviso mandado em state.aviso pelas ações da conta:
// "conta-criada" (CriarConta, com state.nome), "saiu" (useSair) e "senha-trocada" (Nova senha).
// O aviso aparece uma vez: o state sai do histórico logo depois, então ele não volta
// ao recarregar a página nem com o Voltar do navegador.
export default function AvisoDaConta() {
  const { pathname, search, state } = useLocation();
  const navigate = useNavigate();
  const novo = textoDoAviso(state);
  // Aviso em tela e a página em que ele apareceu
  const [aviso, setAviso] = useState(null);
  if (novo && (aviso?.texto !== novo || aviso?.pagina !== pathname)) {
    setAviso({ texto: novo, pagina: pathname });
  }

  // Tira o state do histórico assim que o aviso é guardado
  useEffect(() => {
    if (novo) navigate(pathname + search, { replace: true, state: null });
  }, [novo, pathname, search, navigate]);

  const texto = aviso?.pagina === pathname ? aviso.texto : '';
  return <AvisoFeito texto={texto} aoFechar={() => setAviso(null)} />;
}
