import { Router } from "express";
import clienteRoutes from "./cliente.routes";
import vendedorRoutes from "./vendedor.routes";
import categoriaRoutes from "./categoria.routes";
import produtoRoutes from "./produto.routes";

const router = Router();
router.use('/', clienteRoutes);
router.use('/', vendedorRoutes);
router.use('/', categoriaRoutes);
router.use('/', produtoRoutes);
export default router;