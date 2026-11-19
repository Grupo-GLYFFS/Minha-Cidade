import { useEffect, useEffectEvent, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { Loader } from '@mantine/core';
import Botao from '../Botao';
import CampoTexto from '../CampoTexto';
import CamposLado from '../CamposLado';
import EnderecoEncontrado from './EnderecoEncontrado';
import { buscarCep } from '../../logica/buscarCep';
import { formatarCep, limparCep } from '../../logica/enderecos';
import classes from './FormularioConta.module.css';

// Endereço do cadastro: CEP e número lado a lado, o endereço achado no ViaCEP e o complemento.
// Com os 8 números do CEP, busca a rua e o bairro (o bairro da pessoa no app vem daqui;
// cada pessoa tem um endereço só). Grava "situacaoCep", "rua", "bairro" e "cidadeDoCep"
// no formulário compartilhado (useFormContext). Avisa o bairro achado em aoMudarBairro(bairro).
export default function CamposEnderecoConta({ aoMudarBairro }) {
  const {
    register,
    setValue,
    trigger,
    control,
    getValues,
    formState: { errors, isSubmitted },
  } = useFormContext();
  const [cep, situacao, rua, bairro] = useWatch({
    control,
    name: ['cep', 'situacaoCep', 'rua', 'bairro'],
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

  // Avisa o painel azul do bairro achado
  useEffect(() => {
    aoMudarBairro?.(situacao === 'encontrado' ? bairro : '');
  }, [situacao, bairro, aoMudarBairro]);

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
      {situacao === 'encontrado' && <EnderecoEncontrado rua={rua} bairro={bairro} cep={cep} />}

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
