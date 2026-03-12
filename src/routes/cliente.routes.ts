import { Router } from "express";
import { ClienteController } from "../controllers/cliente.controller";

const clienteController = new ClienteController();

const clienteRoutes = Router();

clienteRoutes.get('/clientes', clienteController.selecionar);

export default clienteRoutes;