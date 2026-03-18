import { Request, Response } from "express";
import { PedidoService } from "../services/pedido.service";

export class PedidoController {
  constructor(private _service = new PedidoService()) {}

  selecionar = async (req: Request, res: Response) => {
    try {
      const id = Number(req.query.id);

      if (isNaN(id)) {
        res.status(200).json({ message: "Valor de ID inválido." });
      }

      if (id) {
        const pedidos = await this._service.selecionarUm(id);
        if (pedidos.length < 1) {
          res
            .status(200)
            .json({ message: "Nenhum registro encontrado com esse ID." });
        }
        console.log(pedidos);
        res.status(200).json({ pedidos });
      }
      const pedidos = await this._service.selecionarTodos();
      if (pedidos.length < 1) {
        res
          .status(200)
          .json({ message: "Nenhum registro encontrado com esse ID." });
      }
      res.status(200).json({ pedidos });
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        return res.status(500).json({
          message: "Ocorreu um erro no servidor.",
          errorMessage: error.message
        });
      }
      res.status(500).json({
        message: "Ocorreu um erro no servidor.",
        errorMessage: "Erro desconhecido."
      });
    }
  };

  inserir = async (req: Request, res: Response) => {
    try {
      const { idCliente, idVendedor } = req.body;
      const novoPedido = await this._service.criar(idCliente, idVendedor);
      res.status(201).json({ novoPedido });
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        return res.status(500).json({
          message: "Ocorreu um erro no servidor.",
          errorMessage: error.message,
        });
      }
      res.status(500).json({
        message: "Ocorreu um erro no servidor.",
        errorMessage: "Erro desconhecido.",
      });
    }
  };

  alterar = async (req: Request, res: Response) => {
    try {
      const { idCliente, idVendedor } = req.body;
      const id = Number(req.query.id);
       const verificarId = await this._service.selecionarUm(id);
      if (verificarId.length < 1) {
        res
          .status(200)
          .json({ message: "Nenhum registro encontrado com esse ID." });
      }
      const resultado = await this._service.editar(id, idCliente, idVendedor);
      res.status(200).json({ resultado });
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        return res.status(500).json({
          message: "Ocorreu um erro no servidor.",
          errorMessage: error.message,
        });
      }
      res.status(500).json({
        message: "Ocorreu um erro no servidor.",
        errorMessage: "Erro desconhecido.",
      });
    }
  };

  deletar = async (req: Request, res: Response) => {
    try {
      const id = Number(req.query.id);
      console.log(id);
      const verificarId = await this._service.selecionarUm(id);
      if (verificarId.length < 1) {
        res
          .status(200)
          .json({ message: "Nenhum registro encontrado com esse ID." });
      }
      const resultado = await this._service.deletar(id);
      console.log(resultado);
      res.status(200).json({ resultado });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({
          message: "Ocorreu um erro no servidor.",
          errorMessage: error.message,
        });
      }
      res.status(500).json({
        message: "Ocorreu um erro no servidor.",
        errorMessage: "Erro desconhecido.",
      });
    }
  };
}
