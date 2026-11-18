import { useState } from 'react';
import Botao from '../Botao';
import CampoTexto from '../CampoTexto';
import CamposLado from '../CamposLado';
import LinhaDado from '../LinhaDado';
import Popup from '../Popup';
import ResumoErros from '../ResumoErros';
import VitrineExemplo from './VitrineExemplo';
import VitrineSecao from './VitrineSecao';

const ERROS = [
  {
    campo: 'vitrine-descricao',
    rotulo: 'O que está acontecendo?',
    mensagem: 'Escreva pelo menos 20 letras.',
  },
  { campo: 'vitrine-cep', rotulo: 'CEP', mensagem: 'Digite os 8 números do CEP, ex.: 04015-001.' },
];

// Seção de popups e formulários da /componentes: Popup, CampoTexto, ResumoErros e CamposLado.
export default function VitrinePopups() {
  const [aberto, setAberto] = useState(false);

  return (
    <VitrineSecao
      id="popups"
      titulo="Popups e formulários"
      arquivo="Popup.jsx · CampoTexto.jsx · ResumoErros.jsx · CamposLado.jsx"
    >
      <VitrineExemplo rotulo="Popup (cabeçalho com X, linhas de borda a borda, botões de 48)">
        <Botao variante="secundario" icone="open_in_new" onClick={() => setAberto(true)}>
          Abrir o popup de exemplo
        </Botao>
        <Popup
          aberto={aberto}
          aoFechar={() => setAberto(false)}
          titulo="Editar seus dados"
          botoes={
            <>
              <Botao variante="secundario" onClick={() => setAberto(false)}>
                Cancelar
              </Botao>
              <Botao variante="principal" onClick={() => setAberto(false)}>
                Salvar
              </Botao>
            </>
          }
        >
          <LinhaDado icone="person" rotulo="Nome" valor="Maria Souza" />
          <LinhaDado icone="call" rotulo="Celular" valor="(11) 91234-5678" />
        </Popup>
      </VitrineExemplo>

      <VitrineExemplo rotulo="ResumoErros (cada erro em 2 linhas; clique leva ao campo)">
        <ResumoErros erros={ERROS} focar={false} />
      </VitrineExemplo>

      <VitrineExemplo rotulo="CampoTexto com ajuda (uma frase por linha) e com erro">
        <CampoTexto
          id="vitrine-descricao"
          rotulo="O que está acontecendo?"
          multilinha
          ajuda={['Conte o que você viu e o que atrapalha.', 'Não precisa de detalhes técnicos.']}
          erro="Escreva pelo menos 20 letras."
        />
      </VitrineExemplo>

      <VitrineExemplo rotulo="CamposLado (duas colunas iguais)">
        <CamposLado>
          <CampoTexto id="vitrine-cep" rotulo="CEP" placeholder="00000-000" />
          <CampoTexto id="vitrine-numero" rotulo="Número" />
        </CamposLado>
      </VitrineExemplo>
    </VitrineSecao>
  );
}
