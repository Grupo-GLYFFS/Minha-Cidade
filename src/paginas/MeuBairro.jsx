import PerfilBairro from '../componentes/hub/PerfilBairro';
import { useLugarDaPessoa } from '../componentes/hub/useLugarDaPessoa';

// Meu bairro (/meu-bairro, prancha 15): a página do bairro do endereço da pessoa
// (o visitante vê a Vila Mariana, o bairro da conta de demonstração).
export default function MeuBairro() {
  const { bairro } = useLugarDaPessoa();
  return <PerfilBairro bairro={bairro} seu />;
}
