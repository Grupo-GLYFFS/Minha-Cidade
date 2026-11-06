// Procura o alerta da Defesa Civil que vale hoje para a região da pessoa.
// Recebe a lista de alertas e a região (ex.: "Zona Sul"). Sem região (visitante),
// vale o primeiro alerta ativo de qualquer região (o texto do alerta diz qual é).
// Devolve o alerta ou undefined se não houver nenhum.
export function alertaDefesaCivilAtivo(alertas, regiao) {
  return alertas.find(
    (alerta) =>
      alerta.tipo === 'defesa-civil' &&
      alerta.ativo &&
      // Alerta sem região vale para a cidade toda
      (!regiao || alerta.regiao === '' || alerta.regiao === regiao),
  );
}
