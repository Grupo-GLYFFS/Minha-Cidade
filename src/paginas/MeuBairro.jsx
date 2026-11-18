import { useSearchParams } from 'react-router-dom';
import { Text } from '@mantine/core';
import CabecalhoAntigo from '../componentes/CabecalhoAntigo';
import SeletorBairro from '../componentes/meuBairro/SeletorBairro';
import CartaoColeta from '../componentes/meuBairro/CartaoColeta';
import CartaoServicosReferencia from '../componentes/meuBairro/CartaoServicosReferencia';
import SemDadosBairro from '../componentes/meuBairro/SemDadosBairro';
import SecaoPedidosBairro from '../componentes/meuBairro/SecaoPedidosBairro';
import SecaoObrasBairro from '../componentes/meuBairro/SecaoObrasBairro';
import CartaoAlertasRegiao from '../componentes/meuBairro/CartaoAlertasRegiao';
import CartaoParticipe from '../componentes/meuBairro/CartaoParticipe';
import { usePedidos } from '../contexto/usePedidos';
import { useSessao } from '../contexto/useSessao';
import { buscarBairro, escolherBairro, regiaoDe } from '../logica/bairros';
import classes from './MeuBairro.module.css';

// Meu Bairro: tudo do bairro em uma tela — coleta de lixo, UBS, escola e CRAS,
// pedidos e obras do bairro, alertas da região e formas de participar.
// Logado: abre o bairro do cadastro. Visitante: abre a Vila Mariana e escolhe outro na lista.
// O bairro escolhido fica no endereço (?bairro=Moema), então voltar ou recarregar mantém a escolha.
// Bairro que o app ainda não conhece mostra um aviso honesto no lugar da coleta e dos serviços.
export default function MeuBairro() {
  const { usuario } = useSessao();
  const { pedidos } = usePedidos();
  const [parametros, setParametros] = useSearchParams();
  // Bairro do cadastro escrito como nos dados (ex.: "vila mariana" vira "Vila Mariana")
  const meuBairro = usuario?.bairro ? escolherBairro(usuario.bairro, usuario.bairro) : null;
  const bairro = escolherBairro(parametros.get('bairro'), meuBairro);
  const dados = buscarBairro(bairro);
  // A região do cadastro serve de reserva só para o próprio bairro da pessoa
  const regiao = regiaoDe(bairro, bairro === meuBairro ? usuario?.regiao : '');

  // Troca o bairro no endereço (o bairro do cadastro não precisa aparecer nele)
  function mudarBairro(novo) {
    setParametros(novo === meuBairro ? {} : { bairro: novo }, { replace: true });
  }

  return (
    <div className={classes.pagina}>
      <div className={classes.topo}>
        <CabecalhoAntigo
          titulo="Meu Bairro"
          descricao={regiao ? `${bairro} · ${regiao}` : bairro}
        />
        <SeletorBairro bairro={bairro} meuBairro={meuBairro} aoMudar={mudarBairro} />
      </div>

      <div className={classes.grade}>
        {dados ? (
          <>
            <CartaoColeta coleta={dados.coleta} />
            <CartaoServicosReferencia dados={dados} />
          </>
        ) : (
          <SemDadosBairro bairro={bairro} />
        )}
      </div>

      <SecaoPedidosBairro pedidos={pedidos} bairro={bairro} />

      <SecaoObrasBairro bairro={bairro} regiao={regiao} />

      <div className={classes.grade}>
        <CartaoAlertasRegiao regiao={regiao} />
        <CartaoParticipe regiao={regiao} />
      </div>

      <Text fz={12} c="var(--cor-texto-suave)">
        Dados de exemplo: dias de coleta, endereços e nomes dos serviços foram criados para
        demonstrar o app. Confirme pelo 156 antes de sair de casa.
      </Text>
    </div>
  );
}
