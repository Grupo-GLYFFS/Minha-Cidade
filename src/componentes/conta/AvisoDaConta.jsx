import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AvisoFeito from '../servicos/AvisoFeito';
import classes from './AvisoDaConta.module.css';

// Mostra, no Entrar, o aviso "Senha trocada" mandado em state.aviso pela página Nova senha.
// O aviso aparece uma vez: o state sai do histórico logo depois, então ele não volta
// ao recarregar a página nem com o Voltar do navegador.
export default function AvisoDaConta() {
  const { pathname, search, state } = useLocation();
  const navigate = useNavigate();
  const novo = state?.aviso === 'senha-trocada';
  // Se o aviso está na tela (some ao fechar)
  const [aberto, setAberto] = useState(false);
  if (novo && !aberto) setAberto(true);

  // Tira o state do histórico assim que o aviso aparece
  useEffect(() => {
    if (novo) navigate(pathname + search, { replace: true, state: null });
  }, [novo, pathname, search, navigate]);

  return (
    <AvisoFeito
      texto={aberto ? 'Senha trocada. Entre com a senha nova.' : ''}
      aoFechar={() => setAberto(false)}
      className={classes.lugar}
    />
  );
}
