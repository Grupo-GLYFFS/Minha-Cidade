import SecaoVitrine from '../SecaoVitrine';
import BaseBotoes from './BaseBotoes';
import BaseCampos from './BaseCampos';
import BaseEscolhas from './BaseEscolhas';
import BaseEstrutura from './BaseEstrutura';
import BaseAvisos from './BaseAvisos';

// Seção "Componentes base": as peças do Mantine como o tema do app as deixa,
// nas variantes e estados que as telas usam.
export default function SecaoBase() {
  return (
    <SecaoVitrine
      id="base"
      titulo="Componentes base"
      descricao="Peças do Mantine com o tema do app: raio 12 em botões e campos, azul principal e foco amarelo. Só as variantes usadas nas telas."
    >
      <BaseBotoes />
      <BaseCampos />
      <BaseEscolhas />
      <BaseEstrutura />
      <BaseAvisos />
    </SecaoVitrine>
  );
}
