import { useState } from 'react';
import Popup from '../Popup';
import Botao from '../Botao';
import CampoTexto from '../CampoTexto';
import CamposLado from '../CamposLado';
import CampoDistrito from '../conta/CampoDistrito';
import { distritoDoBairro, sugerirDistrito } from '../../logica/lugares';
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
// cinza); o bairro só fica livre quando a busca falha. CEP de outra cidade mostra o erro
// na hora, embaixo do CEP. Valida tudo ao salvar, com as regras do cadastro.
// O bairro salvo na conta é sempre um dos 96 distritos: quando o bairro do CEP não está na
// tabela, aparece o campo "Distrito" para a pessoa escolher (já com a sugestão, se houver).
// Recebe o usuario (endereço atual), aoSalvar(endereco) e aoFechar().
// Monte com key diferente a cada abertura, para começar do endereço salvo.
export default function PopupEditarEndereco({ usuario, aoSalvar, aoFechar }) {
  const [valores, setValores] = useState({
    cep: usuario.cep ?? '',
    cidadeDoCep: '',
    estadoDoCep: '',
    rua: usuario.rua ?? '',
    numero: usuario.numero ?? '',
    complemento: usuario.complemento ?? '',
    bairro: usuario.bairro ?? '',
    distrito: '',
  });
  const [erros, setErros] = useState({});
  const [avisoCep, setAvisoCep] = useState('');
  const [bairroLivre, setBairroLivre] = useState(false);
  // O último CEP buscado não trouxe bairro (ou a busca falhou): o distrito é obrigatório
  const [cepSemBairro, setCepSemBairro] = useState(false);
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
        estadoDoCep: resposta.estado,
        rua: resposta.rua || atual.rua,
        // Sem bairro no CEP, o bairro antigo não vale mais para o endereço novo
        bairro: resposta.bairro ?? '',
        distrito: sugerirDistrito(resposta.bairro)?.nome ?? '',
      }));
      setBairroLivre(!resposta.bairro);
      setCepSemBairro(!resposta.bairro);
      // CEP de outra cidade: o erro aparece na hora, com a mesma frase de quando salva
      if (resposta.situacao === 'fora-da-cidade') {
        try {
          esquemaEnderecoPerfil.validateSyncAt('cep', { cep, cidadeDoCep: resposta.cidade });
        } catch (falha) {
          setErros((atual) => ({ ...atual, cep: falha.message }));
        }
      }
      return;
    }
    setAvisoCep(AVISO_CEP[resposta.situacao]);
    setBairroLivre(true);
    setCepSemBairro(true);
  }

  // Distrito achado pelo bairro (sem ele, a pessoa escolhe no campo "Distrito")
  const distritoAchado = distritoDoBairro(valores.bairro);
  const pedirDistrito = cepSemBairro || (Boolean(valores.bairro.trim()) && !distritoAchado);

  // Confere tudo e salva; com erro, mostra embaixo de cada campo e leva o foco ao primeiro
  function salvar(evento) {
    evento?.preventDefault();
    const novos = {};
    let limpos = null;
    try {
      limpos = esquemaEnderecoPerfil.validateSync(valores, { abortEarly: false });
    } catch (falha) {
      falha.inner.forEach((item) => {
        if (!novos[item.path]) novos[item.path] = item.message;
      });
    }
    if (pedirDistrito && !valores.distrito) {
      novos.distrito = 'Escolha o distrito onde fica o seu endereço.';
    }
    if (limpos && !novos.distrito) {
      const { distrito: _escolhido, ...endereco } = limpos;
      aoSalvar({ ...endereco, bairro: pedirDistrito ? valores.distrito : distritoAchado.nome });
    } else {
      setErros(novos);
      const primeiro = ORDEM.find((campo) => novos[campo]);
      document.getElementById(`endereco-${primeiro}`)?.focus();
    }
  }

  // A cidade mostrada é a do último CEP buscado (antes da busca, a do endereço salvo)
  const cidade = valores.cidadeDoCep
    ? [valores.cidadeDoCep, valores.estadoDoCep].filter(Boolean).join(' - ')
    : 'São Paulo - SP';

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
        <div className={classes.lado}>
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
        </div>
        <div className={classes.lado}>
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
              value={cidade}
              variant="filled"
              readOnly
            />
          </CamposLado>
        </div>
        {pedirDistrito && (
          <CampoDistrito
            id="endereco-distrito"
            ajuda={`Escolha o distrito onde fica ${valores.bairro.trim() || 'o seu endereço'}.`}
            value={valores.distrito}
            erro={erros.distrito}
            onChange={(evento) => mudar('distrito', evento.currentTarget.value)}
          />
        )}
      </form>
    </Popup>
  );
}
