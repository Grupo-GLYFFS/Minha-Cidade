import { ALERTAS_PADRAO, CANAIS_AVISO, TIPOS_AVISO } from '../dados/avisosConta';

// Preferências de aviso de quem nunca mexeu: alertas ligados e os canais padrão de cada tipo.
// Devolve { alertas: { ligados, canais }, canais: { pedidos: [...], votacoes: [...] ... } }.
export function preferenciasPadrao() {
  return {
    alertas: { ...ALERTAS_PADRAO },
    canais: Object.fromEntries(TIPOS_AVISO.map((tipo) => [tipo.id, tipo.canais])),
  };
}

// Junta o que estava salvo com o padrão (tipos novos ganham o padrão deles).
// Recebe o que foi lido do navegador (ou null); devolve as preferências completas.
export function completarPreferencias(salvas) {
  const padrao = preferenciasPadrao();
  if (!salvas) return padrao;
  return {
    alertas: { ...padrao.alertas, ...salvas.alertas },
    canais: { ...padrao.canais, ...salvas.canais },
  };
}

// Escreve os canais numa frase curta, na ordem da lista de canais.
// Recebe ["app", "email"]; devolve "No app e e-mail". Sem canais, devolve "Desligado".
export function textoCanais(canais) {
  const nomes = CANAIS_AVISO.filter((canal) => canais.includes(canal.id)).map((canal, posicao) => {
    if (canal.id === 'email') return posicao === 0 ? 'E-mail' : 'e-mail';
    return canal.rotulo;
  });
  if (nomes.length === 0) return 'Desligado';
  if (nomes.length === 1) return nomes[0];
  return `${nomes.slice(0, -1).join(', ')} e ${nomes[nomes.length - 1]}`;
}

// Troca o {bairro} do rótulo pelo bairro da pessoa.
// Recebe o rótulo e o bairro; devolve, por exemplo, "Avisos da prefeitura na Vila Mariana".
export function rotuloComBairro(rotulo, bairro) {
  return rotulo.replace('{bairro}', bairro);
}
