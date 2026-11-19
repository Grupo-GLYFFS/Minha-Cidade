import { useState } from 'react';
import Botao from '../Botao';
import CartaoExtrato from './CartaoExtrato';
import BlocoExtrato from './BlocoExtrato';
import LinhaExtrato from './LinhaExtrato';
import { OBRAS } from '../../dados/obras';
import { SUBPREFEITURAS_ORCAMENTO } from '../../dados/subprefeiturasOrcamento';
import { compararSubprefeituras, valorCurto } from '../../logica/orcamento';
import classes from './SubprefeiturasExtrato.module.css';

// Quantas subprefeituras aparecem antes de "Ver as 32 subprefeituras"
const PRIMEIRAS = 14;

// Comparação das subprefeituras: custeio e quanto há em obras, da que tem mais custeio para
// a que tem menos. Mostra as 14 primeiras e abre as 32 no botão. Cada nome leva à página da
// subprefeitura.
// Recebe o titulo do card e, se quiser, o id da subprefeitura para destacar (a da pessoa).
export default function SubprefeiturasExtrato({ titulo = 'Subprefeituras', destacar }) {
  const [todas, setTodas] = useState(false);
  const lista = compararSubprefeituras(SUBPREFEITURAS_ORCAMENTO, OBRAS);
  const visiveis = todas ? lista : lista.slice(0, PRIMEIRAS);

  return (
    <CartaoExtrato
      titulo={titulo}
      subtitulo={`As ${PRIMEIRAS} com mais custeio, das ${lista.length} subprefeituras da cidade`}
    >
      <BlocoExtrato colunas={['Custeio', 'Em obras']} comLink>
        <div id="lista-subprefeituras">
          {visiveis.map((sub) => (
            <LinhaExtrato
              key={sub.id}
              nome={sub.nome}
              detalhe={`${sub.bairros.length} ${sub.bairros.length === 1 ? 'bairro' : 'bairros'} · ${valorCurto(sub.verbaMoradores)} dos moradores`}
              valor={valorCurto(sub.custeio)}
              segundo={sub.emObras > 0 ? valorCurto(sub.emObras) : null}
              para={`/minha-cidade/subprefeituras/${sub.id}`}
              destaque={sub.id === destacar}
            />
          ))}
        </div>
        <div className={classes.mais}>
          <Botao
            variante="secundario"
            largo
            icone={todas ? 'expand_less' : 'expand_more'}
            iconeDireita
            aria-expanded={todas}
            aria-controls="lista-subprefeituras"
            onClick={() => setTodas((atual) => !atual)}
          >
            {todas ? `Ver só as ${PRIMEIRAS} primeiras` : `Ver as ${lista.length} subprefeituras`}
          </Botao>
        </div>
      </BlocoExtrato>
    </CartaoExtrato>
  );
}
