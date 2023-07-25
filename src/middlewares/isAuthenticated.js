import { httpResponse } from "../config/server-config.js";

export default function (req, res, next) {
  if (!req.isAuthenticated()) {
    return res.json(httpResponse(false, null, "Inicia sesión para continuar."));
  }
  return next();
}

export function isNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.json(httpResponse(false, null, "Ya estas autenticado."));
  }
  next();
}
