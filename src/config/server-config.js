export const httpResponse = (bool, message, error, data, controlador) => {
  const response = {};

  if (typeof bool !== "boolean" && !message && !error && !data) {
    throw new Error("Completar la respuesta.");
  }

  if (typeof bool === "boolean") {
    response.bool = bool;
  }
  if (message && typeof message === "string") {
    response.message = message;
  }

  if (error && typeof error === "string") {
    response.error = error;
  }

  if (data && Array.isArray(data)) {
    response.data = data
  }

  const isEmpty = Object.keys(response)
  if (isEmpty.length < 1) {
    throw new Error("Nada que enviar como respuesta, revisa de nuevo en el controlador: ",controlador)
  }
  return response
};
