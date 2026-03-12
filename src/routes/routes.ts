import { Router } from "express";
import clienteRoutes from "./cliente.routes";

const router = Router();
router.use('/', clienteRoutes);

export default router;