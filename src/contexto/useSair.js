import { startTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessao } from './useSessao';
import { apagarTodosRascunhos } from '../logica/rascunhos';
import { apagarAcaoPendente } from '../logica/acaoPendente';

// Ação "Sair da conta", usada no menu do cabeçalho e na página Perfil.
// Devolve uma função que encerra a sessão e leva ao Início, que mostra "Você saiu da sua conta."
// Apaga também os rascunhos dos formulários e a ação pendente desta aba.
export function useSair() {
  const { sair } = useSessao();
  const navigate = useNavigate();

  return function sairDaConta() {
    apagarTodosRascunhos();
    apagarAcaoPendente();
    // As rotas do app mudam dentro de uma "transição" do React. Sair na mesma transição
    // faz as duas mudanças aparecerem juntas; sem isso, a guarda de uma página protegida
    // (ex.: Perfil) veria o visitante antes da troca de página e mandaria para "Entrar".
    startTransition(() => {
      sair();
      navigate('/inicio', { state: { aviso: 'saiu' } });
    });
  };
}
