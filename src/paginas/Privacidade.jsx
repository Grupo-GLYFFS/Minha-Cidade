import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Alert, Text, Title } from '@mantine/core';
import PaginaAjuda from '../componentes/ajuda/PaginaAjuda';
import ListaDados from '../componentes/privacidade/ListaDados';
import ApagarDados from '../componentes/privacidade/ApagarDados';
import Cartao from '../componentes/Cartao';
import Icone from '../componentes/Icone';
import { DADOS_GUARDADOS, DADOS_NAO_GUARDADOS } from '../dados/privacidade';

// Privacidade dos dados: o que o app guarda (só neste navegador), o que não guarda,
// o aviso de protótipo, a LGPD em uma frase e o botão para apagar tudo.
// Depois de apagar, o endereço traz "?dados=apagados" e a página mostra a confirmação.
export default function Privacidade() {
  const [parametros] = useSearchParams();
  const apagou = parametros.get('dados') === 'apagados';
  const aviso = useRef(null);

  // Leva o foco até a confirmação, para o leitor de tela ler o aviso logo de cara
  useEffect(() => {
    if (apagou) aviso.current?.focus();
  }, [apagou]);

  return (
    <PaginaAjuda
      titulo="Privacidade dos dados"
      descricao="O que o Minha Prefeitura guarda, onde guarda e como apagar."
    >
      {apagou && (
        <Alert
          ref={aviso}
          tabIndex={-1}
          role="status"
          color="green"
          radius="lg"
          icon={<Icone nome="check_circle" preenchido />}
          title="Pronto, seus dados foram apagados"
        >
          Tudo o que o app guardava neste navegador foi apagado e você saiu da conta.
        </Alert>
      )}

      <ListaDados
        id="titulo-guardados"
        titulo="O que fica guardado"
        introducao="Tudo fica só neste navegador, no próprio aparelho. Nada é enviado para a prefeitura nem para outro lugar."
        itens={DADOS_GUARDADOS}
      />

      <ListaDados
        id="titulo-nao-guardados"
        titulo="O que não fica guardado"
        itens={DADOS_NAO_GUARDADOS}
      />

      <Cartao component="section" aria-labelledby="titulo-prototipo">
        <Title order={2} id="titulo-prototipo" fz={{ base: 18, md: 20 }} fw={700} mb={4}>
          Um projeto de estudantes
        </Title>
        <Text c="var(--cor-texto-suave)">
          O Minha Prefeitura é um protótipo acadêmico da FIAP. Não é um serviço oficial da
          Prefeitura de São Paulo, e os pedidos daqui não chegam a ela.
        </Text>
        <Text c="var(--cor-texto-suave)" mt="sm">
          A LGPD, lei que protege os dados pessoais no Brasil, garante que você saiba o que é
          guardado sobre você e possa pedir para apagar. Aqui, você mesmo apaga, no botão abaixo.
        </Text>
      </Cartao>

      <ApagarDados />
    </PaginaAjuda>
  );
}
