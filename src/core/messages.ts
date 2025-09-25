export const formatUniqueConstraintError = (errMsg: string) => {
  // tenta extrair campo e valor
  const regex = /Key \((.+)\)=\((.+)\) already exists/i;
  const match = errMsg.match(regex);

  if (match) {
    const field = match[1];
    const value = match[2];
    return `O valor '${value}' para o campo '${field}' já existe.`;
  }

  // fallback caso não bata com o padrão
  return errMsg;
};
