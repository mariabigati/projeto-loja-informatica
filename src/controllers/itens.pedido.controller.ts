import { Request, Response } from "express";
import { ItensPedidoService } from "../services/itens.pedido.service";

export class ItensPedidoController {
  constructor(private _service = new ItensPedidoService()) {}

  selecionar = async (req: Request, res: Response) => {
    try {
      const id = Number(req.query.id);

      if (isNaN(id)) {
        res.status(200).json({ message: "Valor de ID inválido." });
      }

      if (id) {
        const itensPedido = await this._service.selecionarUm(id);
        if (itensPedido.length < 1) {
          res
            .status(200)
            .json({ message: "Nenhum registro encontrado com esse ID." });
        }
        console.log(itensPedido);
        res.status(200).json({ itensPedido });
      }
      const itensPedido = await this._service.selecionarTodos();
      if (itensPedido.length < 1) {
        res
          .status(200)
          .json({ message: "Nenhum registro encontrado com esse ID." });
      }
      res.status(200).json({ itensPedido });
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
      const { idPedido, idProduto, quantidade } = req.body;
      const novoPedido = await this._service.criar(idPedido, idProduto, quantidade, 0, 0);
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
      const { idPedido, idProduto, quantidade } = req.body;
      const id = Number(req.query.id);
       const verificarId = await this._service.selecionarUm(id);
      if (verificarId.length < 1) {
        res
          .status(200)
          .json({ message: "Nenhum registro encontrado com esse ID." });
      }
      const resultado = await this._service.editar(id, idPedido, idProduto, quantidade, 0, 0);
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
