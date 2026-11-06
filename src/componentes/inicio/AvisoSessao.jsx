import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert } from '@mantine/core';
import Icone from '../Icone';
import classes from './AvisoSessao.module.css';

// Aviso no topo do Início depois de sair da conta ou de criar uma conta nova.
// O tipo vem do estado da navegação: { aviso: 'saiu' } ou { aviso: 'conta-criada', nome }.
// O foco vai para o aviso, para o leitor de tela anunciar o que aconteceu.
// Fechar apaga o aviso do histórico, para ele não voltar ao recarregar.
export default function AvisoSessao() {
  const local = useLocation();
  const navigate = useNavigate();
  const avisoRef = useRef(null);
  const { aviso, nome } = local.state ?? {};
  const contaCriada = aviso === 'conta-criada';

  useEffect(() => {
    if (aviso) avisoRef.current?.focus();
  }, [aviso]);

  if (aviso !== 'saiu' && !contaCriada) return null;

  return (
    <Alert
      ref={avisoRef}
      tabIndex={-1}
      role="status"
      variant="outline"
      radius="md"
      className={classes.aviso}
      classNames={{ title: classes.texto, message: classes.texto, icon: classes.texto }}
      data-tipo={contaCriada ? 'sucesso' : 'neutro'}
      title={contaCriada ? `Conta criada! Boas-vindas, ${nome}!` : 'Você saiu da sua conta.'}
      icon={<Icone nome={contaCriada ? 'celebration' : 'logout'} tamanho={20} />}
      withCloseButton
      closeButtonLabel="Fechar aviso"
      onClose={() => navigate(local.pathname, { replace: true, state: null })}
    >
      {contaCriada
        ? 'Agora você pode abrir pedidos, apoiar os do bairro e acompanhar tudo por aqui.'
        : 'Para abrir pedidos e apoiar, entre de novo quando quiser.'}
    </Alert>
  );
}
