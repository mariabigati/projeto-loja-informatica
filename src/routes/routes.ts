import { Router } from "express";
import clienteRoutes from "./cliente.routes";
import vendedorRoutes from "./vendedor.routes";

const router = Router();
router.use('/', clienteRoutes);
router.use('/', vendedorRoutes);

export default router;