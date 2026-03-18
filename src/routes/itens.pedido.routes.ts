import { Router } from "express";
import { ItensPedidoController } from "../controllers/itens.pedido.controller";

const itensPedidoController = new ItensPedidoController();

const itensPedidoRoutes = Router();

itensPedidoRoutes.get('/itensPedidos', itensPedidoController.selecionar);
itensPedidoRoutes.post('/itensPedidos', itensPedidoController.inserir);
itensPedidoRoutes.patch('/itensPedidos', itensPedidoController.alterar);
itensPedidoRoutes.delete('/itensPedidos', itensPedidoController.deletar);

export default itensPedidoRoutes;