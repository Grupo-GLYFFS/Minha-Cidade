import { useState } from 'react';
import CampoTexto from '../CampoTexto';
import CamposLado from '../CamposLado';
import ResumoErros from '../ResumoErros';
import Icone from '../Icone';
import AvisoRepetido from './AvisoRepetido';
import { buscarCep } from '../../logica/buscarCep';
import { formatarCep, limparCep } from '../../logica/enderecos';
import { subprefeituraDoBairro } from '../../logica/localPedido';
import { listarErros } from '../../logica/esquemaNovoPedido';
import classes from './NovoPedido.module.css';

// Mensagem embaixo do CEP para cada resultado da busca no ViaCEP
const SITUACOES_CEP = {
  buscando: { texto: 'Buscando o endereço…', icone: 'progress_activity', classe: 'cepBuscando' },
  encontrado: { texto: 'Endereço encontrado', icone: 'check_circle', classe: 'cepOk' },
  'nao-encontrado': {
    texto: 'Não achamos este CEP. Confira os números ou preencha a rua e o bairro.',
    icone: 'info',
    classe: 'cepAviso',
  },
  'fora-da-cidade': {
    texto: 'Este CEP não é da cidade de São Paulo. Use o CEP do local do problema.',
    icone: 'error',
    classe: 'cepErro',
  },
  falha: {
    texto: 'Não deu para buscar o CEP agora. Preencha a rua e o bairro.',
    icone: 'info',
    classe: 'cepAviso',
  },
};

// Etapa 2 do Abrir pedido: onde fica o problema (qualquer lugar da cidade, pelo CEP).
// O CEP completo busca a rua e o bairro no ViaCEP; a subprefeitura vem sozinha do bairro.
// Se já existe um pedido aberto igual (mesma categoria, bairro e rua), o aviso aparece aqui.
// Recebe os valores, os erros, mudar(campo, valor), mudarVarios(objeto),
// o pedido repetido (ou undefined), se ele é da própria pessoa e aoEditar() (volta à etapa 1).
export default function EtapaOnde({
  valores,
  erros,
  mudar,
  mudarVarios,
  repetido,
  repetidoEhSeu,
  aoEditar,
}) {
  const [situacaoCep, setSituacaoCep] = useState(null);
  const subprefeitura = subprefeituraDoBairro(valores.bairro);

  // Aplica a máscara e, com os 8 números, busca o endereço
  async function aoDigitarCep(texto) {
    const cep = formatarCep(texto);
    mudar('cep', cep);
    if (limparCep(cep).length !== 8) {
      setSituacaoCep(null);
      return;
    }
    setSituacaoCep('buscando');
    const resposta = await buscarCep(cep);
    // Guarda a cidade do CEP: a validação avisa quando não é São Paulo
    mudarVarios({
      cidadeDoCep: resposta.cidade ?? '',
      ...(resposta.situacao === 'encontrado' && {
        rua: resposta.rua || valores.rua,
        bairro: resposta.bairro || valores.bairro,
      }),
    });
    setSituacaoCep(resposta.situacao);
  }

  const situacao = !erros.cep && situacaoCep ? SITUACOES_CEP[situacaoCep] : null;

  return (
    <>
      <ResumoErros erros={listarErros(erros, ['cep', 'rua', 'numero', 'bairro'])} />
      <div className={classes.campos}>
        <CamposLado>
          <div>
            <CampoTexto
              id="cep"
              rotulo="CEP"
              withAsterisk
              ajuda="Rua e bairro são preenchidos sozinhos."
              placeholder="00000-000"
              inputMode="numeric"
              autoComplete="postal-code"
              erro={erros.cep}
              value={valores.cep}
              onChange={(evento) => aoDigitarCep(evento.currentTarget.value)}
            />
            {situacao && (
              <p className={`${classes.cep} ${classes[situacao.classe]}`} role="status">
                <Icone nome={situacao.icone} tamanho={20} preenchido />
                {situacao.texto}
              </p>
            )}
          </div>
          <div className={classes.somenteLeitura}>
            <CampoTexto
              id="cidade"
              rotulo="Cidade"
              ajuda="O app atende só a capital."
              value="São Paulo"
              readOnly
            />
          </div>
        </CamposLado>
        <CamposLado>
          <CampoTexto
            id="rua"
            rotulo="Rua"
            withAsterisk
            ajuda="Ex.: Rua Joaquim Távora"
            autoComplete="address-line1"
            erro={erros.rua}
            value={valores.rua}
            onChange={(evento) => mudar('rua', evento.currentTarget.value)}
          />
          <CampoTexto
            id="numero"
            rotulo="Número"
            withAsterisk
            ajuda="Ou s/n"
            erro={erros.numero}
            value={valores.numero}
            onChange={(evento) => mudar('numero', evento.currentTarget.value)}
          />
        </CamposLado>
        <CamposLado>
          <CampoTexto
            id="bairro"
            rotulo="Bairro"
            withAsterisk
            ajuda="Ex.: Vila Mariana"
            erro={erros.bairro}
            value={valores.bairro}
            onChange={(evento) => mudar('bairro', evento.currentTarget.value)}
          />
          <div className={classes.somenteLeitura}>
            <CampoTexto
              id="subprefeitura"
              rotulo="Subprefeitura"
              ajuda="Vem sozinha do bairro."
              placeholder="Escolha o bairro"
              value={subprefeitura}
              readOnly
            />
          </div>
        </CamposLado>
      </div>
      {repetido && <AvisoRepetido pedido={repetido} ehSeu={repetidoEhSeu} aoEditar={aoEditar} />}
    </>
  );
}
