import { Router } from "express";
import clienteRoutes from "./cliente.routes";
import vendedorRoutes from "./vendedor.routes";
import categoriaRoutes from "./categoria.routes";

const router = Router();
router.use('/', clienteRoutes);
router.use('/', vendedorRoutes);
router.use('/', categoriaRoutes);

export default router;