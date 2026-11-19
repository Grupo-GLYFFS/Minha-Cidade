import { USUARIO } from '../dados/usuario';

// Tempo que o protótipo finge esperar o gov.br responder (em milésimos de segundo)
const ESPERA_GOVBR = 1200;

// Simula a ida e a volta do login do gov.br.
// O protótipo não fala com o gov.br de verdade: depois de uma pequena espera, devolve
// os dados de uma pessoa, como o gov.br devolveria.
// Recebe a pessoa (padrão: a Maria, da conta de demonstração; o "Criar com gov.br" passa
// uma pessoa nova). Devolve uma promessa com { nome, cpf, celular, email, cep, numero }.
export function simularGovbr(pessoa = USUARIO) {
  return new Promise((resolver) => {
    setTimeout(
      () =>
        resolver({
          nome: pessoa.nome,
          cpf: pessoa.cpf,
          celular: pessoa.celular,
          email: pessoa.email,
          cep: pessoa.cep,
          numero: pessoa.numero,
        }),
      ESPERA_GOVBR,
    );
  });
}
