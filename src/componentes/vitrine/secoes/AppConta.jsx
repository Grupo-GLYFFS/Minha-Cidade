import { useState } from 'react';
import { SimpleGrid, Stack, Text } from '@mantine/core';
import Subsecao from '../Subsecao';
import Vitrine from '../Vitrine';
import ContextoSimulado from '../ContextoSimulado';
import AlternarExemplos from '../AlternarExemplos';
import FormularioVitrine from '../FormularioVitrine';
import BotoesPasso from '../../conta/BotoesPasso';
import ChecklistSenha from '../../conta/ChecklistSenha';
import CampoFotoPerfil from '../../conta/CampoFotoPerfil';
import ProgressoPassos from '../../conta/ProgressoPassos';
import FormularioEntrar from '../../conta/FormularioEntrar';
import FormularioCriarConta from '../../conta/FormularioCriarConta';
import LinksAjudaConta from '../../conta/LinksAjudaConta';
import { VALORES_INICIAIS_CONTA } from '../../../logica/esquemaCriarConta';

// Resposta de "Criar conta" nesta página: nunca cria nada
async function criarSemSalvar() {
  return { ok: false, erro: 'Página de componentes: nenhuma conta foi criada.' };
}

// Peças das telas Entrar e Criar conta. Os formulários usam a sessão simulada:
// "Entrar" sempre responde "E-mail ou senha incorretos" e "Criar conta" não cria nada.
export default function AppConta() {
  const [passo, setPasso] = useState(1);

  return (
    <Subsecao id="app-conta" titulo="Conta">
      <Vitrine
        nome="ProgressoPassos"
        arquivo="src/componentes/conta/ProgressoPassos.jsx"
        props="passo · aoVoltarPara (Stepper no computador, barra no celular)"
        fundo="branco"
      >
        <ProgressoPassos passo={passo} aoVoltarPara={setPasso} />
        <Text fz={13} c="var(--cor-texto-suave)" mt="sm">
          Clique num passo já feito para voltar a ele.
        </Text>
      </Vitrine>

      <Vitrine
        nome="BotoesPasso"
        arquivo="src/componentes/conta/BotoesPasso.jsx"
        props="temAnterior · ehUltimo · enviando · aoVoltar (primeiro / meio / último / enviando)"
        fundo="branco"
      >
        <Stack gap="lg">
          <BotoesPasso temAnterior={false} ehUltimo={false} enviando={false} aoVoltar={() => {}} />
          <BotoesPasso temAnterior ehUltimo={false} enviando={false} aoVoltar={() => {}} />
          <BotoesPasso temAnterior ehUltimo enviando={false} aoVoltar={() => {}} />
          <BotoesPasso temAnterior ehUltimo enviando aoVoltar={() => {}} />
        </Stack>
      </Vitrine>

      <Vitrine
        nome="ChecklistSenha"
        arquivo="src/componentes/conta/ChecklistSenha.jsx"
        props='senha ("" / "abc" / "senha2026")'
        fundo="branco"
      >
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
          <ChecklistSenha senha="" />
          <ChecklistSenha senha="abc" />
          <ChecklistSenha senha="senha2026" />
        </SimpleGrid>
      </Vitrine>

      <Vitrine
        nome="CampoFotoPerfil"
        arquivo="src/componentes/conta/CampoFotoPerfil.jsx"
        props="prévia redonda da foto escolhida (não é salva)"
        fundo="branco"
      >
        <FormularioVitrine rotulo="Exemplo de foto de perfil" valores={VALORES_INICIAIS_CONTA}>
          <CampoFotoPerfil />
        </FormularioVitrine>
      </Vitrine>

      <Vitrine
        nome="FormularioEntrar"
        arquivo="src/componentes/conta/FormularioEntrar.jsx"
        props="sessão simulada: sempre mostra o erro de e-mail ou senha"
        fundo="branco"
      >
        <ContextoSimulado logado={false}>
          <FormularioEntrar />
        </ContextoSimulado>
      </Vitrine>

      <Vitrine
        nome="FormularioCriarConta"
        arquivo="src/componentes/conta/FormularioCriarConta.jsx + PassoVoce, PassoEndereco, PassoComprovante"
        props="aoCriar (aqui não cria nada) · 3 passos com validação de verdade"
        fundo="branco"
      >
        <AlternarExemplos
          rotulo="Mostrar o formulário de criar conta"
          opcoes={[
            {
              valor: 'fechado',
              rotulo: 'Esconder',
              conteudo: (
                <Text fz={14} c="var(--cor-texto-suave)">
                  Formulário longo (3 passos). Escolha “Mostrar” para ver.
                </Text>
              ),
            },
            {
              valor: 'aberto',
              rotulo: 'Mostrar',
              conteudo: (
                <ContextoSimulado logado={false}>
                  <FormularioCriarConta aoCriar={criarSemSalvar} />
                </ContextoSimulado>
              ),
            },
          ]}
        />
      </Vitrine>

      <Vitrine
        nome="LinksAjudaConta"
        arquivo="src/componentes/conta/LinksAjudaConta.jsx"
        props='sem props (nav "Ajuda e acessibilidade")'
        fundo="branco"
      >
        <LinksAjudaConta />
      </Vitrine>
    </Subsecao>
  );
}
