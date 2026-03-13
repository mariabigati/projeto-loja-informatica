import { Router } from "express";
import { ClienteController } from "../controllers/cliente.controller";

const clienteController = new ClienteController();

const clienteRoutes = Router();

clienteRoutes.get('/clientes', clienteController.selecionar);
clienteRoutes.post('/clientes', clienteController.inserir);
clienteRoutes.patch('/clientes', clienteController.alterar);
clienteRoutes.delete('/clientes', clienteController.deletar);

export default clienteRoutes;