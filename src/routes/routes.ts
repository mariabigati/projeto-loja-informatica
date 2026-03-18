import { Router } from "express";
import clienteRoutes from "./cliente.routes";
import vendedorRoutes from "./vendedor.routes";
import categoriaRoutes from "./categoria.routes";
import produtoRoutes from "./produto.routes";
import pedidoRoutes from "./pedido.routes";
import itensPedidoRoutes from "./itens.pedido.routes";

const router = Router();
router.use('/', clienteRoutes);
router.use('/', vendedorRoutes);
router.use('/', categoriaRoutes);
router.use('/', produtoRoutes);
router.use('/', pedidoRoutes);
router.use('/', itensPedidoRoutes);

export default router;