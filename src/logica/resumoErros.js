// Atualiza o resumo de erros de um formulário enquanto a pessoa corrige os campos.
// Recebe o resumo montado no envio [{ campo, rotulo, mensagem }] e os erros atuais do
// react-hook-form ({ campo: { message } }); devolve só os campos que ainda têm erro,
// com a mensagem de agora.
export function manterErrosAtuais(resumo, erros) {
  return resumo
    .filter((item) => erros[item.campo])
    .map((item) => ({ ...item, mensagem: erros[item.campo].message }));
}
