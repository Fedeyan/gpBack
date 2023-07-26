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
    response.data = data;
  }

  const isEmpty = Object.keys(response);
  if (isEmpty.length < 1) {
    throw new Error(
      "Nada que enviar como respuesta, revisa de nuevo en el controlador: ",
      controlador
    );
  }
  return response;
};

//modelConfigs

export class UserPermissions {
  constructor(all) {
    this.users = {
      create: all ? true : false,
      edit: all ? true : false,
      delete: all ? true : false,
      read: all ? true : false,
    };
    this.products = {
      create: all ? true : false,
      edit: all ? true : false,
      delete: all ? true : false,
      read: true,
    };
    this.roles = {
      create: all ? true : false,
      edit: all ? true : false,
      delete: all ? true : false,
      read: all ? true : false,
    };
    this.orders = {
      create: all ? true : false,
      edit: all ? true : false,
      delete: all ? true : false,
      read: all ? true : false,
    };
  }
  getPermissions() {
    return this;
  }

  setPermissions(permissions) {
    if (!permissions || typeof permissions !== "object") {
      throw new Error("Tipo de datos inesperado. Set Permissions")
    }
  }
}

export const guestPermissions = new UserPermissions();

export const superAdminPermissions = new UserPermissions(true);
