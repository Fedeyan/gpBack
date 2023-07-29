import { UserData } from "../config/database";

export default async function (title, content, status, userId) {
  if (status !== "danger" && status !== "warning" && status !== "success") {
    throw new Error("Revisa la linea 2 de createAlert");
  }

  if (typeof title !== "string" || typeof content !== "string") {
    throw new Error("El contenido de la alerta debe ser string.");
  }

  if (!userId || typeof userId !== "number") {
    throw new Error("Se esperaba un numero como id de usuario.");
  }

  const userdata = await UserData.findOne({
    where: {
      UserId: userId,
    },
  });

  if (!userdata) {
    return {
      bool: false,
    };
  }

  const previousData = userdata?.dataValues?.alerts;
  const newAlert = {
    title,
    content,
    status,
  };
  const isUpdated = await userdata.update({
    alerts: [...previousData, newAlert],
  });

  if (!isUpdated) {
    return {
      bool: false,
      error: "Se ha producido un error.",
    };
  }

  return {
    bool: true,
  };
}
