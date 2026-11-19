import { useState } from 'react';
import Botao from '../Botao';
import Icone from '../Icone';
import GrupoRevisao from './GrupoRevisao';
import GravidadeEstimada from './GravidadeEstimada';
import MiniaturasFotos from './MiniaturasFotos';
import PopupTitulo from './PopupTitulo';
import { buscarCategoria } from '../../logica/pedidos';
import { estimarGravidade } from '../../logica/sugestaoPedido';
import { nomeSubprefeitura, subprefeituraDoBairro } from '../../logica/localPedido';
import { arrumarNumero } from '../../logica/novoPedido';
import classes from './NovoPedido.module.css';

// Etapa 4 do Abrir pedido: tudo o que vai ser enviado, em três grupos com "Alterar".
// Título, categoria e gravidade são definidos pelo app: o título se edita num popup,
// a categoria se troca na etapa 1 e a gravidade só a prefeitura muda.
// Recebe os valores, irPara(etapa, { abrirLista }) e aoMudarTitulo(titulo).
export default function EtapaRevisar({ valores, irPara, aoMudarTitulo }) {
  const [editando, setEditando] = useState(false);
  // Muda a key a cada abertura, para o popup começar com o título atual
  const [vezPopup, setVezPopup] = useState(0);
  const categoria = buscarCategoria(valores.categoria);
  const gravidade = estimarGravidade(valores.descricao, valores.categoria);
  const subprefeitura = subprefeituraDoBairro(valores.bairro);

  function abrirPopup() {
    setVezPopup((vez) => vez + 1);
    setEditando(true);
  }

  return (
    <div className={classes.revisao}>
      <GrupoRevisao
        titulo="O problema"
        aoAlterar={() => irPara(1)}
        linhas={[
          {
            icone: 'title',
            rotulo: 'Título',
            valor: valores.titulo,
            acao: (
              <Botao variante="texto" compacto onClick={abrirPopup}>
                Editar<span className={classes.oculto}> o título</span>
              </Botao>
            ),
          },
          {
            icone: 'category',
            rotulo: 'Categoria',
            valor: (
              <span className={classes.categoriaRevisao}>
                <Icone nome={categoria?.icone} tamanho={20} />
                {categoria?.rotulo}
              </span>
            ),
            acao: (
              <Botao variante="texto" compacto onClick={() => irPara(1, { abrirLista: true })}>
                Trocar<span className={classes.oculto}> a categoria</span>
              </Botao>
            ),
          },
          { icone: 'notes', rotulo: 'Descrição', valor: valores.descricao.trim() },
          {
            icone: 'signal_cellular_alt',
            rotulo: 'Gravidade estimada',
            valor: <GravidadeEstimada gravidade={gravidade} />,
          },
        ]}
      />
      <GrupoRevisao
        titulo="Onde fica"
        aoAlterar={() => irPara(2)}
        linhas={[
          {
            icone: 'location_on',
            rotulo: 'Endereço',
            valor: `${valores.rua.trim()}, ${arrumarNumero(valores.numero)} · ${valores.bairro.trim()}`,
          },
          { icone: 'markunread_mailbox', rotulo: 'CEP', valor: valores.cep },
          {
            icone: 'account_balance',
            rotulo: 'Subprefeitura',
            valor: nomeSubprefeitura(subprefeitura) || 'A prefeitura define na análise',
          },
        ]}
      />
      <GrupoRevisao
        titulo="Fotos"
        aoAlterar={() => irPara(3)}
        linhas={[
          {
            icone: 'photo_library',
            rotulo: 'Fotos',
            valor:
              valores.fotos.length > 0 ? <MiniaturasFotos fotos={valores.fotos} /> : 'Nenhuma foto',
          },
        ]}
      />
      <PopupTitulo
        key={vezPopup}
        aberto={editando}
        titulo={valores.titulo}
        aoFechar={() => setEditando(false)}
        aoSalvar={(titulo) => {
          aoMudarTitulo(titulo);
          setEditando(false);
        }}
      />
    </div>
  );
}
