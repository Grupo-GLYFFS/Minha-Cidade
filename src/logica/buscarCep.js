import { limparCep } from './enderecos';

// Cidade atendida pelo app
export const CIDADE_ATENDIDA = 'São Paulo';

// Procura o endereço de um CEP no ViaCEP (serviço público e gratuito).
// Recebe o CEP, com ou sem hífen; devolve um objeto com a "situacao":
// - "encontrado": também traz rua, bairro e cidade;
// - "fora-da-cidade": o CEP existe, mas é de outra cidade (traz a cidade);
// - "nao-encontrado": o CEP não existe;
// - "falha": sem internet ou o serviço não respondeu.
export async function buscarCep(cep) {
  const digitos = limparCep(cep);
  if (digitos.length !== 8) return { situacao: 'nao-encontrado' };

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${digitos}/json/`);
    if (!resposta.ok) return { situacao: 'falha' };
    const dados = await resposta.json();

    // O ViaCEP responde { erro: true } (ou "true") quando o CEP não existe
    if (dados.erro) return { situacao: 'nao-encontrado' };

    const endereco = {
      rua: dados.logradouro ?? '',
      bairro: dados.bairro ?? '',
      cidade: dados.localidade,
    };
    if (dados.localidade !== CIDADE_ATENDIDA) return { situacao: 'fora-da-cidade', ...endereco };
    return { situacao: 'encontrado', ...endereco };
  } catch {
    return { situacao: 'falha' };
  }
}
