import { USUARIO } from '../dados/usuario';

// Tempo que o protótipo finge esperar o gov.br responder (em milésimos de segundo)
const ESPERA_GOVBR = 1200;

// Simula a ida e a volta do login do gov.br.
// O protótipo não fala com o gov.br de verdade: depois de uma pequena espera, devolve
// os dados da pessoa de demonstração (Maria), como o gov.br devolveria.
// Devolve uma promessa com { nome, cpf, celular, email, cep, numero }.
export function simularGovbr() {
  return new Promise((resolver) => {
    setTimeout(
      () =>
        resolver({
          nome: USUARIO.nome,
          cpf: USUARIO.cpf,
          celular: USUARIO.celular,
          email: USUARIO.email,
          cep: USUARIO.cep,
          numero: USUARIO.numero,
        }),
      ESPERA_GOVBR,
    );
  });
}
