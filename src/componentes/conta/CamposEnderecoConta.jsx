import { useEffect, useEffectEvent, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { Loader } from '@mantine/core';
import Botao from '../Botao';
import CampoTexto from '../CampoTexto';
import CamposLado from '../CamposLado';
import EnderecoEncontrado from './EnderecoEncontrado';
import CampoDistrito from './CampoDistrito';
import { buscarCep } from '../../logica/buscarCep';
import { distritoDoBairro, sugerirDistrito } from '../../logica/lugares';
import { formatarCep, limparCep } from '../../logica/enderecos';
import classes from './FormularioConta.module.css';

// Endereço do cadastro: CEP e número lado a lado, o endereço achado no ViaCEP e o complemento.
// Com os 8 números do CEP, busca a rua e o bairro (o bairro da pessoa no app vem daqui;
// cada pessoa tem um endereço só). Grava "situacaoCep", "rua", "bairro", "cidadeDoCep",
// "distrito" (um dos 96) e "distritoAutomatico" no formulário compartilhado (useFormContext).
// Quando o bairro do CEP não é um distrito conhecido, mostra o campo "Distrito" para a pessoa
// escolher (já com a sugestão, se houver). Avisa o distrito em aoMudarBairro(distrito).
export default function CamposEnderecoConta({ aoMudarBairro }) {
  const {
    register,
    setValue,
    trigger,
    control,
    getValues,
    formState: { errors, isSubmitted },
  } = useFormContext();
  const [cep, situacao, rua, bairro, distrito, distritoAutomatico] = useWatch({
    control,
    name: ['cep', 'situacaoCep', 'rua', 'bairro', 'distrito', 'distritoAutomatico'],
  });
  // Conta as buscas para ignorar a resposta de uma busca antiga (se o CEP mudou no meio)
  const ultimaBusca = useRef(0);
  // CEP que já tem resposta (ao voltar do código, não busca de novo)
  const respondido = useRef(getValues('situacaoCep') ? limparCep(getValues('cep')) : '');

  // Guarda a resposta da busca no formulário
  function guardar(resposta) {
    setValue('situacaoCep', resposta.situacao);
    setValue('cidadeDoCep', resposta.cidade ?? '');
    setValue('rua', resposta.situacao === 'encontrado' ? resposta.rua : '');
    setValue('bairro', resposta.situacao === 'encontrado' ? resposta.bairro : '');
    // O bairro do app é um dos 96 distritos: achado pela tabela ou escolhido pela pessoa
    const achado = resposta.situacao === 'encontrado' ? distritoDoBairro(resposta.bairro) : null;
    const sugestao = resposta.situacao === 'encontrado' ? sugerirDistrito(resposta.bairro) : null;
    setValue('distrito', (achado ?? sugestao)?.nome ?? '');
    setValue('distritoAutomatico', Boolean(achado));
  }

  // Busca o endereço do CEP no ViaCEP. Recebe o CEP só com números.
  async function procurar(digitos) {
    const numero = ++ultimaBusca.current;
    setValue('situacaoCep', 'buscando');
    const resposta = await buscarCep(digitos);
    if (numero !== ultimaBusca.current) return;
    respondido.current = digitos;
    guardar(resposta);
    // Mostra na hora quando o CEP não serve (não encontrado, de outra cidade ou falha)
    if (resposta.situacao !== 'encontrado') trigger('cep');
    else if (isSubmitted) trigger('cep');
  }

  // Confere o CEP novo: completo, busca; incompleto, esquece o endereço anterior
  const aoMudarCep = useEffectEvent((digitos) => {
    if (digitos.length === 8 && digitos !== respondido.current) {
      procurar(digitos);
    } else if (digitos.length !== 8 && respondido.current) {
      // Cancela qualquer busca pela metade
      ultimaBusca.current += 1;
      respondido.current = '';
      guardar({ situacao: '' });
    }
  });

  // Busca quando o CEP muda (digitado ou preenchido pelo gov.br)
  useEffect(() => {
    aoMudarCep(limparCep(cep));
  }, [cep]);

  // Avisa o painel azul do distrito: null sem um CEP de São Paulo achado;
  // "" com o CEP achado e o distrito ainda por escolher
  useEffect(() => {
    aoMudarBairro?.(situacao === 'encontrado' ? distrito : null);
  }, [situacao, distrito, aoMudarBairro]);

  const campoCep = register('cep', {
    onChange: (evento) => setValue('cep', formatarCep(evento.target.value)),
  });

  return (
    <>
      <CamposLado>
        {/* Borda verde no CEP quando o endereço foi achado */}
        <div className={situacao === 'encontrado' ? classes.cepOk : undefined}>
          <CampoTexto
            id="cep"
            rotulo="CEP"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={9}
            erro={errors.cep?.message}
            {...campoCep}
          />
        </div>
        <CampoTexto
          id="numero"
          rotulo="Número"
          inputMode="numeric"
          erro={errors.numero?.message}
          {...register('numero')}
        />
      </CamposLado>

      {situacao === 'buscando' && (
        <p className={classes.buscando} role="status">
          <Loader size={20} />
          Procurando o endereço…
        </p>
      )}
      {situacao === 'falha' && (
        <Botao variante="secundario" icone="refresh" onClick={() => procurar(limparCep(cep))}>
          Buscar o CEP de novo
        </Botao>
      )}
      {situacao === 'encontrado' && (
        <EnderecoEncontrado rua={rua} bairro={bairro} distrito={distrito} cep={cep} />
      )}
      {situacao === 'encontrado' && !distritoAutomatico && (
        <CampoDistrito
          id="distrito"
          ajuda={`Escolha o distrito onde fica ${bairro || 'o seu endereço'}.`}
          erro={errors.distrito?.message}
          {...register('distrito')}
        />
      )}

      <CampoTexto
        id="complemento"
        rotulo="Complemento"
        placeholder="Apartamento, bloco, casa"
        autoComplete="address-line2"
        erro={errors.complemento?.message}
        {...register('complemento')}
      />
    </>
  );
}
