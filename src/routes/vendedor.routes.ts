import { Router } from "express";
import { VendedorController } from "../controllers/vendedor.controller";

const vendedorController = new VendedorController();

const vendedorRoutes = Router();

vendedorRoutes.get('/vendedores', vendedorController.selecionar);
vendedorRoutes.post('/vendedores', vendedorController.inserir);
vendedorRoutes.patch('/vendedores', vendedorController.alterar);
vendedorRoutes.delete('/vendedores', vendedorController.deletar);

export default vendedorRoutes;