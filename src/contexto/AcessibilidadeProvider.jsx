import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from '@mantine/hooks';
import { ContextoAcessibilidade } from './ContextoAcessibilidade';
import { apagarDado, lerDado, salvarDado } from '../armazenamento';
import {
  PREFERENCIAS_PADRAO,
  mudarTamanho,
  normalizarPreferencias,
} from '../logica/acessibilidade';

// Nome com que as preferências ficam guardadas no navegador (valem para o aparelho, não para a conta)
const CHAVE_ACESSIBILIDADE = 'acessibilidade';

// Guarda as preferências de acessibilidade: tamanho da letra, alto contraste e reduzir animações.
// Guarda também se as faixas de alerta aparecem no alto das páginas (vêm desligadas).
// Funciona também para o visitante. As escolhas são aplicadas como atributos no <html>
// (data-letra, data-contraste, data-animacoes), e o global.css faz o resto.
// Enquanto a pessoa não escolher, "reduzir animações" segue o que o sistema do aparelho pede.
// Recebe as telas do app (children), que leem os dados com useAcessibilidade().
export default function AcessibilidadeProvider({ children }) {
  const [preferencias, setPreferencias] = useState(() =>
    normalizarPreferencias(lerDado(CHAVE_ACESSIBILIDADE, null)),
  );
  // Só salva depois que a pessoa mexe em alguma coisa, para não criar a chave à toa
  const escolheu = useRef(false);
  const sistemaPedeMenosMovimento = useReducedMotion();

  const reduzirAnimacoes = preferencias.reduzirAnimacoes ?? sistemaPedeMenosMovimento;

  // Salva as preferências sempre que a pessoa muda alguma
  useEffect(() => {
    if (escolheu.current) salvarDado(CHAVE_ACESSIBILIDADE, preferencias);
  }, [preferencias]);

  // Marca o <html> antes de a tela ser pintada, para não piscar no tamanho ou na cor antigos
  useLayoutEffect(() => {
    const html = document.documentElement;
    html.dataset.letra = preferencias.tamanhoLetra;
    html.dataset.contraste = preferencias.altoContraste ? 'alto' : 'normal';
    html.dataset.animacoes = reduzirAnimacoes ? 'reduzidas' : 'normais';
  }, [preferencias.tamanhoLetra, preferencias.altoContraste, reduzirAnimacoes]);

  // Troca uma ou mais preferências. Recebe uma função que recebe as atuais e devolve as mudanças.
  const mudar = useCallback((calcularMudancas) => {
    escolheu.current = true;
    setPreferencias((atual) => ({ ...atual, ...calcularMudancas(atual) }));
  }, []);

  const diminuirLetra = useCallback(
    () => mudar((atual) => ({ tamanhoLetra: mudarTamanho(atual.tamanhoLetra, -1) })),
    [mudar],
  );
  const aumentarLetra = useCallback(
    () => mudar((atual) => ({ tamanhoLetra: mudarTamanho(atual.tamanhoLetra, 1) })),
    [mudar],
  );
  const letraPadrao = useCallback(() => mudar(() => ({ tamanhoLetra: 'padrao' })), [mudar]);
  // Recebe o id do tamanho (ex.: "grande"); ids que não existem são ignorados
  const definirTamanho = useCallback(
    (tamanho) => mudar((atual) => normalizarPreferencias({ ...atual, tamanhoLetra: tamanho })),
    [mudar],
  );
  const alternarAltoContraste = useCallback(
    () => mudar((atual) => ({ altoContraste: !atual.altoContraste })),
    [mudar],
  );
  const alternarFaixasAlerta = useCallback(
    () => mudar((atual) => ({ mostrarFaixasAlerta: !atual.mostrarFaixasAlerta })),
    [mudar],
  );
  // Parte do valor em uso agora (que pode ter vindo do sistema) e passa a valer a escolha da pessoa
  const alternarAnimacoes = useCallback(
    () => mudar(() => ({ reduzirAnimacoes: !reduzirAnimacoes })),
    [mudar, reduzirAnimacoes],
  );

  // Volta tudo ao padrão e apaga o que estava salvo
  const voltarAoPadrao = useCallback(() => {
    escolheu.current = false;
    setPreferencias(PREFERENCIAS_PADRAO);
    apagarDado(CHAVE_ACESSIBILIDADE);
  }, []);

  const valor = useMemo(
    () => ({
      tamanhoLetra: preferencias.tamanhoLetra,
      altoContraste: preferencias.altoContraste,
      reduzirAnimacoes,
      mostrarFaixasAlerta: preferencias.mostrarFaixasAlerta,
      diminuirLetra,
      aumentarLetra,
      letraPadrao,
      definirTamanho,
      alternarAltoContraste,
      alternarAnimacoes,
      alternarFaixasAlerta,
      voltarAoPadrao,
    }),
    [
      preferencias,
      reduzirAnimacoes,
      diminuirLetra,
      aumentarLetra,
      letraPadrao,
      definirTamanho,
      alternarAltoContraste,
      alternarAnimacoes,
      alternarFaixasAlerta,
      voltarAoPadrao,
    ],
  );

  return (
    <ContextoAcessibilidade.Provider value={valor}>{children}</ContextoAcessibilidade.Provider>
  );
}
