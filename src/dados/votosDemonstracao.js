// Votos que a conta de demonstração (Maria, id "u-001") já deu quando o app abre pela primeira vez.
// Formato: { idPessoa: { idVotacao: "sim" | "nao" } }. Esses votos já entram na contagem
// do resultado (os votosIniciais das votações não contam com eles).
export const VOTOS_DEMONSTRACAO = {
  'u-001': { 'hospital-dia-santana': 'sim', 'vm-rua-de-lazer': 'sim' },
};
