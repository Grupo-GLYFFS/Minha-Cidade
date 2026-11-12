import { yupResolver } from '@hookform/resolvers/yup';
import Subsecao from '../Subsecao';
import Vitrine from '../Vitrine';
import FormularioVitrine from '../FormularioVitrine';
import CampoCep from '../../formulario/CampoCep';
import CampoBairroRegiao from '../../formulario/CampoBairroRegiao';
import CampoArquivo from '../../formulario/CampoArquivo';
import ResumoErros from '../../formulario/ResumoErros';
import CampoCelular from '../../conta/CampoCelular';
import CampoCpf from '../../formularioServico/CampoCpf';
import CampoServico from '../../formularioServico/CampoServico';
import TituloSecao from '../../novoPedido/TituloSecao';
import { SERVICOS } from '../../../dados/servicos';
import { ESQUEMAS_POR_PASSO, VALORES_INICIAIS_CONTA } from '../../../logica/esquemaCriarConta';
import {
  NOMES_CAMPOS,
  ORDEM_CAMPOS,
  VALORES_INICIAIS,
  esquemaNovoPedido,
} from '../../../logica/esquemaNovoPedido';
import { montarEsquemaServico, rotuloCampo, valoresIniciais } from '../../../logica/esquemaServico';
import { errosDoEsquema, exemplosDeCampos } from '../../../logica/vitrine';

// Regras de verdade de cada exemplo, montadas uma vez só
const REGRAS_VOCE = yupResolver(ESQUEMAS_POR_PASSO[0]);
const REGRAS_ENDERECO = yupResolver(ESQUEMAS_POR_PASSO[1]);
const REGRAS_COMPROVANTE = yupResolver(ESQUEMAS_POR_PASSO[2]);
const CAMPOS_EXEMPLO = exemplosDeCampos(SERVICOS);
const REGRAS_SERVICO = yupResolver(montarEsquemaServico(CAMPOS_EXEMPLO));
const CAMPO_CPF = CAMPOS_EXEMPLO.find((campo) => campo.tipo === 'cpf');
// Erros que o formulário "Abrir pedido" mostra quando é enviado vazio
const ERROS_PEDIDO_VAZIO = errosDoEsquema(esquemaNovoPedido, VALORES_INICIAIS);

// Campos que leem e gravam pelo formulário compartilhado, cada um num formulário de mentira
// com as regras de verdade: "Conferir os campos" mostra os erros como no app.
export default function AppFormularios() {
  return (
    <Subsecao
      id="app-formularios"
      titulo="Formulários"
      descricao="Nada aqui é enviado. O CEP busca o endereço no ViaCEP ao digitar os 8 números."
    >
      <Vitrine
        nome="ResumoErros"
        arquivo="src/componentes/formulario/ResumoErros.jsx"
        props='erros · irParaCampo · ordemCampos · nomesCampos · acao (role="alert")'
        fundo="branco"
      >
        <ResumoErros
          erros={ERROS_PEDIDO_VAZIO}
          irParaCampo={() => {}}
          ordemCampos={ORDEM_CAMPOS}
          nomesCampos={NOMES_CAMPOS}
          acao="enviar"
        />
      </Vitrine>

      <Vitrine
        nome="TituloSecao"
        arquivo="src/componentes/novoPedido/TituloSecao.jsx"
        props="id · numero · titulo (h2)"
        fundo="branco"
      >
        <TituloSecao id="vitrine-titulo-secao" numero={1} titulo="O problema" />
      </Vitrine>

      <Vitrine
        nome="CampoCep + CampoBairroRegiao"
        arquivo="src/componentes/formulario/"
        props="CampoCep rotulo · descricao (grava cep, rua, bairro, regiao) · CampoBairroRegiao"
        fundo="branco"
      >
        <FormularioVitrine
          rotulo="Exemplo de CEP"
          valores={VALORES_INICIAIS_CONTA}
          regras={REGRAS_ENDERECO}
          campos={['cep', 'bairro']}
        >
          <CampoCep />
          <CampoBairroRegiao />
        </FormularioVitrine>
      </Vitrine>

      <Vitrine
        nome="CampoCelular"
        arquivo="src/componentes/conta/CampoCelular.jsx"
        props="máscara (11) 91234-5678"
        fundo="branco"
      >
        <FormularioVitrine
          rotulo="Exemplo de celular"
          valores={VALORES_INICIAIS_CONTA}
          regras={REGRAS_VOCE}
          campos={['celular']}
        >
          <CampoCelular />
        </FormularioVitrine>
      </Vitrine>

      <Vitrine
        nome="CampoArquivo"
        arquivo="src/componentes/formulario/CampoArquivo.jsx"
        props="nome · rotulo · descricao · placeholder · aceita · icone · obrigatorio · rotuloLimpar"
        fundo="branco"
      >
        <FormularioVitrine
          rotulo="Exemplo de arquivo"
          valores={VALORES_INICIAIS_CONTA}
          regras={REGRAS_COMPROVANTE}
          campos={['comprovante']}
        >
          <CampoArquivo
            nome="comprovante"
            rotulo="Comprovante de residência"
            descricao="PDF, JPG ou PNG de até 5 MB. O arquivo não é salvo."
            placeholder="Escolher arquivo"
            aceita="application/pdf,image/jpeg,image/png"
            icone="upload_file"
            obrigatorio
            rotuloLimpar="Tirar o arquivo escolhido"
          />
        </FormularioVitrine>
      </Vitrine>

      {CAMPO_CPF && (
        <Vitrine
          nome="CampoCpf"
          arquivo="src/componentes/formularioServico/CampoCpf.jsx"
          props="campo · rotulo · descricao (máscara 000.000.000-00)"
          fundo="branco"
        >
          <FormularioVitrine rotulo="Exemplo de CPF" valores={valoresIniciais([CAMPO_CPF])}>
            <CampoCpf campo={CAMPO_CPF} rotulo={rotuloCampo(CAMPO_CPF)} />
          </FormularioVitrine>
        </Vitrine>
      )}

      <Vitrine
        nome="CampoServico (cada tipo)"
        arquivo="src/componentes/formularioServico/CampoServico.jsx + CampoTextoLongo, CampoSelecao, EnderecoServico"
        props={`campo · tipos: ${CAMPOS_EXEMPLO.map((campo) => campo.tipo).join(', ')} (campos de verdade do catálogo)`}
        fundo="branco"
      >
        <FormularioVitrine
          rotulo="Campos do formulário de serviço"
          valores={valoresIniciais(CAMPOS_EXEMPLO)}
          regras={REGRAS_SERVICO}
        >
          {CAMPOS_EXEMPLO.map((campo) => (
            <CampoServico key={campo.nome} campo={campo} />
          ))}
        </FormularioVitrine>
      </Vitrine>
    </Subsecao>
  );
}
