import { useState } from 'react';
import Popup from '../Popup';
import Botao from '../Botao';
import CampoTexto from '../CampoTexto';
import CamposLado from '../CamposLado';
import { buscarCep } from '../../logica/buscarCep';
import { formatarCep, limparCep } from '../../logica/enderecos';
import { esquemaEnderecoPerfil, NOMES_CAMPOS_ENDERECO } from '../../logica/esquemaPerfil';
import classes from './PopupEditarEndereco.module.css';

// Ordem dos campos na tela: o primeiro com erro recebe o foco
const ORDEM = Object.keys(NOMES_CAMPOS_ENDERECO);

// Aviso embaixo do CEP para cada resposta do ViaCEP que não preenche o endereço
const AVISO_CEP = {
  'nao-encontrado': 'Não achamos este CEP. Confira os números ou digite a rua e o bairro.',
  falha: 'Não conseguimos buscar o CEP agora. Digite a rua e o bairro.',
};

// Popup "Editar endereço" do Meu perfil (30, quadro 5): CEP (busca rua e bairro no ViaCEP),
// rua, número, complemento, bairro e cidade. Bairro e cidade vêm do CEP (só leitura, em
// cinza); o bairro só fica livre quando a busca falha. Valida ao salvar, com as regras do cadastro.
// Recebe o usuario (endereço atual), aoSalvar(endereco) e aoFechar().
// Monte com key diferente a cada abertura, para começar do endereço salvo.
export default function PopupEditarEndereco({ usuario, aoSalvar, aoFechar }) {
  const [valores, setValores] = useState({
    cep: usuario.cep ?? '',
    cidadeDoCep: '',
    rua: usuario.rua ?? '',
    numero: usuario.numero ?? '',
    complemento: usuario.complemento ?? '',
    bairro: usuario.bairro ?? '',
  });
  const [erros, setErros] = useState({});
  const [avisoCep, setAvisoCep] = useState('');
  const [bairroLivre, setBairroLivre] = useState(false);
  const [buscando, setBuscando] = useState(false);

  // Troca um campo e apaga o erro dele. Recebe o nome do campo e o valor.
  function mudar(campo, valor) {
    setValores((atual) => ({ ...atual, [campo]: valor }));
    setErros((atual) => ({ ...atual, [campo]: undefined }));
  }

  // Ao completar os 8 números do CEP, busca a rua, o bairro e a cidade
  async function aoMudarCep(texto) {
    const cep = formatarCep(texto);
    mudar('cep', cep);
    setAvisoCep('');
    if (limparCep(cep).length !== 8) return;

    setBuscando(true);
    const resposta = await buscarCep(cep);
    setBuscando(false);
    if (resposta.situacao === 'encontrado' || resposta.situacao === 'fora-da-cidade') {
      setValores((atual) => ({
        ...atual,
        cidadeDoCep: resposta.cidade,
        rua: resposta.rua || atual.rua,
        bairro: resposta.bairro || atual.bairro,
      }));
      setBairroLivre(!resposta.bairro);
      return;
    }
    setAvisoCep(AVISO_CEP[resposta.situacao]);
    setBairroLivre(true);
  }

  // Confere tudo e salva; com erro, mostra embaixo de cada campo e leva o foco ao primeiro
  function salvar(evento) {
    evento?.preventDefault();
    try {
      const limpos = esquemaEnderecoPerfil.validateSync(valores, { abortEarly: false });
      aoSalvar(limpos);
    } catch (falha) {
      const novos = {};
      falha.inner.forEach((item) => {
        if (!novos[item.path]) novos[item.path] = item.message;
      });
      setErros(novos);
      const primeiro = ORDEM.find((campo) => novos[campo]);
      document.getElementById(`endereco-${primeiro}`)?.focus();
    }
  }

  return (
    <Popup
      aberto
      aoFechar={aoFechar}
      titulo="Editar endereço"
      largura={600}
      botoes={
        <>
          <Botao variante="secundario" onClick={aoFechar}>
            Cancelar
          </Botao>
          <Botao variante="principal" type="submit" form="form-endereco">
            Salvar
          </Botao>
        </>
      }
    >
      <form id="form-endereco" className={classes.campos} onSubmit={salvar} noValidate>
        <div className={classes.linhaCep}>
          <CampoTexto
            id="endereco-cep"
            rotulo="CEP"
            inputMode="numeric"
            autoComplete="postal-code"
            value={valores.cep}
            erro={erros.cep}
            ajuda={buscando ? 'Buscando o endereço…' : avisoCep || undefined}
            data-autofocus
            onChange={(evento) => aoMudarCep(evento.currentTarget.value)}
          />
          <a
            className={classes.naoSei}
            href="https://buscacepinter.correios.com.br/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Não sei o CEP
          </a>
        </div>
        <CampoTexto
          id="endereco-rua"
          rotulo="Rua"
          autoComplete="address-line1"
          value={valores.rua}
          erro={erros.rua}
          onChange={(evento) => mudar('rua', evento.currentTarget.value)}
        />
        <CamposLado>
          <CampoTexto
            id="endereco-numero"
            rotulo="Número"
            value={valores.numero}
            erro={erros.numero}
            onChange={(evento) => mudar('numero', evento.currentTarget.value)}
          />
          <CampoTexto
            id="endereco-complemento"
            rotulo="Complemento"
            autoComplete="address-line2"
            value={valores.complemento}
            erro={erros.complemento}
            onChange={(evento) => mudar('complemento', evento.currentTarget.value)}
          />
        </CamposLado>
        <CamposLado>
          <CampoTexto
            id="endereco-bairro"
            rotulo="Bairro"
            value={valores.bairro}
            erro={erros.bairro}
            readOnly={!bairroLivre}
            variant={bairroLivre ? 'default' : 'filled'}
            onChange={(evento) => mudar('bairro', evento.currentTarget.value)}
          />
          <CampoTexto
            id="endereco-cidade"
            rotulo="Cidade"
            value="São Paulo - SP"
            variant="filled"
            readOnly
          />
        </CamposLado>
      </form>
    </Popup>
  );
}
