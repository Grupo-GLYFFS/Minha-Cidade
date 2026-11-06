import { useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Group, Loader, Text, TextInput } from '@mantine/core';
import Icone from '../Icone';
import { buscarCep } from '../../logica/buscarCep';
import { formatarCep, limparCep, regiaoDoBairro } from '../../logica/enderecos';

// Avisos quando a busca não preenche o endereço (não impedem o envio: dá para digitar à mão)
const AVISOS_BUSCA = {
  'nao-encontrado': 'CEP não encontrado. Confira os números ou preencha o endereço à mão.',
  falha: 'Não foi possível buscar o CEP agora. Confira a internet ou preencha o endereço à mão.',
};

// Campo de CEP com máscara 00000-000. Quando os 8 números são digitados, busca o endereço
// no ViaCEP e preenche rua, bairro e (se o app conhece o bairro) a região; a pessoa ainda pode mudar.
// Usado no "Abrir pedido" e no "Criar conta": lê e grava pelo formulário compartilhado
// (campos "cep", "cidadeDoCep", "rua", "bairro" e "regiao").
export default function CampoCep() {
  const { control, setValue, trigger } = useFormContext();
  const [buscando, setBuscando] = useState(false);
  const [aviso, setAviso] = useState(null);
  const [encontrado, setEncontrado] = useState(null);
  // Conta as buscas para ignorar a resposta de uma busca antiga (se a pessoa mudou o CEP)
  const ultimaBusca = useRef(0);

  // Busca o endereço do CEP e preenche os campos. Recebe o CEP só com números.
  async function procurarEndereco(digitos) {
    const numeroBusca = ++ultimaBusca.current;
    setBuscando(true);
    const resultado = await buscarCep(digitos);
    if (numeroBusca !== ultimaBusca.current) return;
    setBuscando(false);

    if (resultado.situacao === 'nao-encontrado' || resultado.situacao === 'falha') {
      setAviso(AVISOS_BUSCA[resultado.situacao]);
      return;
    }

    // Guarda a cidade: a regra do CEP recusa quando não é São Paulo
    setValue('cidadeDoCep', resultado.cidade);
    trigger('cep');
    if (resultado.situacao !== 'encontrado') return;

    const opcoes = { shouldValidate: true, shouldDirty: true };
    if (resultado.rua) setValue('rua', resultado.rua, opcoes);
    if (resultado.bairro) {
      setValue('bairro', resultado.bairro, opcoes);
      const regiao = regiaoDoBairro(resultado.bairro);
      if (regiao) setValue('regiao', regiao, { shouldValidate: true });
    }
    setEncontrado(
      `Endereço encontrado: ${resultado.rua || 'rua não informada'}, ${resultado.bairro}.`,
    );
  }

  // Aplica a máscara e, com 8 números, começa a busca
  function aoDigitar(evento, field, fieldState) {
    const formatado = formatarCep(evento.target.value);
    // CEP mudou: esquece a busca anterior (antes de validar o campo de novo)
    ultimaBusca.current += 1;
    setBuscando(false);
    setAviso(null);
    setEncontrado(null);
    setValue('cidadeDoCep', '');
    field.onChange(formatado);
    // Se o campo mostrava erro (ex.: CEP de outra cidade), confere de novo com o valor novo
    if (fieldState.error) trigger('cep');

    const digitos = limparCep(formatado);
    if (digitos.length === 8) procurarEndereco(digitos);
  }

  return (
    <Controller
      name="cep"
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <TextInput
            ref={field.ref}
            name={field.name}
            value={field.value}
            onChange={(evento) => aoDigitar(evento, field, fieldState)}
            onBlur={field.onBlur}
            label="CEP"
            description="Rua e bairro são preenchidos sozinhos."
            placeholder="00000-000"
            required
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={9}
            rightSection={buscando ? <Loader size="xs" aria-hidden="true" /> : null}
            error={fieldState.error?.message ?? aviso}
          />

          {/* Área anunciada pelo leitor de tela: "buscando" e "encontrado" */}
          <div role="status" aria-live="polite">
            {(buscando || encontrado) && (
              <Group gap={4} wrap="nowrap" mt={4} c="var(--cor-texto-suave)">
                <Icone nome={buscando ? 'progress_activity' : 'check_circle'} tamanho={18} />
                <Text fz="xs" c="inherit">
                  {buscando ? 'Buscando o endereço do CEP…' : encontrado}
                </Text>
              </Group>
            )}
          </div>
        </div>
      )}
    />
  );
}
