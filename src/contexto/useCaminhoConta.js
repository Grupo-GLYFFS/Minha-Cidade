import { useLocation } from 'react-router-dom';
import { PAGINAS_DE_CONTA, caminhoComVoltar } from '../logica/sessao';

// Monta os links "Entrar" e "Criar conta" que trazem a pessoa de volta para a página atual.
// Recebe, se quiser, outro destino (ex.: "/minha-cidade/alertas"); sem ele, o destino é a página aberta agora.
// Nas próprias telas de entrar e criar conta, mantém o destino que já estava no endereço.
// Devolve { entrar, criarConta, voltar }: os dois caminhos e o destino usado.
export function useCaminhoConta(destino) {
  const { pathname, search } = useLocation();
  const naPaginaDeConta = PAGINAS_DE_CONTA.includes(pathname);
  const voltar =
    destino ??
    (naPaginaDeConta ? new URLSearchParams(search).get('voltar') : `${pathname}${search}`);

  return {
    entrar: caminhoComVoltar('/entrar', voltar),
    criarConta: caminhoComVoltar('/criar-conta', voltar),
    voltar,
  };
}
