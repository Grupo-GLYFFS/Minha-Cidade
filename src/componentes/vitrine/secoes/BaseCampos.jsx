import {
  NumberInput,
  PasswordInput,
  Select,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import Subsecao from '../Subsecao';
import Vitrine from '../Vitrine';
import Icone from '../../Icone';
import { REGIOES } from '../../../dados/regioes';

// Os três estados mostrados para cada campo: normal (com ajuda), com erro e desativado
const ESTADOS = [
  { id: 'normal', rotulo: 'Normal' },
  { id: 'erro', rotulo: 'Com erro' },
  { id: 'desativado', rotulo: 'Desativado', disabled: true },
];

// Campos de texto e escolha, cada um com rótulo, ajuda, erro e desativado.
// Os textos de ajuda e de erro são os mesmos das telas.
const CAMPOS = [
  {
    nome: 'TextInput',
    props: 'label · description · placeholder · error · required',
    erro: 'Escreva o nome da rua.',
    desenhar: (props) => (
      <TextInput label="Rua" description="Ex.: Rua Joaquim Távora" required {...props} />
    ),
  },
  {
    nome: 'TextInput leftSection',
    props: 'campo de busca com ícone',
    erro: 'Digite pelo menos 2 letras para buscar.',
    desenhar: (props) => (
      <TextInput
        type="search"
        label="Buscar pedido"
        placeholder="Ex.: buraco, poste, Rua Vergueiro"
        leftSection={<Icone nome="search" tamanho={20} />}
        {...props}
      />
    ),
  },
  {
    nome: 'Textarea',
    props: 'autosize · minRows={4}',
    erro: 'Conte um pouco mais: a descrição precisa de pelo menos 20 caracteres.',
    desenhar: (props) => (
      <Textarea
        label="Descrição"
        description="Conte desde quando acontece e o que atrapalha."
        autosize
        minRows={4}
        required
        {...props}
      />
    ),
  },
  {
    nome: 'Select',
    props: 'clearable · checkIconPosition="right"',
    erro: 'Escolha a região do bairro.',
    desenhar: (props) => (
      <Select
        label="Região"
        placeholder="Todas as regiões"
        data={REGIOES.map((regiao) => regiao.nome)}
        clearable
        checkIconPosition="right"
        clearButtonProps={{ 'aria-label': 'Limpar este filtro' }}
        {...props}
      />
    ),
  },
  {
    nome: 'NumberInput',
    props: 'hideControls · allowDecimal={false}',
    erro: 'Digite um número de 1 a 10.',
    desenhar: (props) => (
      <NumberInput
        label="Quantidade de itens"
        description="De 1 a 10."
        hideControls
        allowDecimal={false}
        {...props}
      />
    ),
  },
  {
    nome: 'PasswordInput',
    props: 'visibilityToggleFocusable · botão "Mostrar senha"',
    erro: 'A senha precisa ter pelo menos 8 caracteres.',
    desenhar: (props) => (
      <PasswordInput
        label="Senha"
        description="Pelo menos 8 caracteres, com letras e números."
        visibilityToggleFocusable
        visibilityToggleButtonProps={{ 'aria-label': 'Mostrar senha' }}
        {...props}
      />
    ),
  },
];

// Campos base do Mantine, cada um nos três estados.
export default function BaseCampos() {
  return (
    <Subsecao
      id="base-campos"
      titulo="Campos"
      descricao="Todo campo tem rótulo visível. O erro aparece embaixo, em vermelho e em texto, dizendo como resolver."
    >
      {CAMPOS.map((campo) => (
        <Vitrine
          key={campo.nome}
          nome={campo.nome}
          arquivo="@mantine/core"
          props={campo.props}
          fundo="branco"
        >
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md" verticalSpacing="lg">
            {ESTADOS.map((estado) => (
              <div key={estado.id}>
                <Text fz={12} fw={700} c="var(--cor-texto-suave)" mb={4}>
                  {estado.rotulo}
                </Text>
                {campo.desenhar({
                  error: estado.id === 'erro' ? campo.erro : undefined,
                  disabled: estado.disabled,
                })}
              </div>
            ))}
          </SimpleGrid>
        </Vitrine>
      ))}

      <Vitrine
        nome='TextInput readOnly variant="filled"'
        arquivo="@mantine/core"
        props="campo só para ler (Cidade, E-mail em Meus dados)"
        fundo="branco"
      >
        <TextInput
          label="Cidade"
          value="São Paulo"
          readOnly
          variant="filled"
          description="O app atende só a capital."
        />
      </Vitrine>
    </Subsecao>
  );
}
