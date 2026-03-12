import { Request, Response } from "express";
import { ClienteService } from "../services/cliente.service";

export class ClienteController {
  constructor(private _service = new ClienteService()) {}

  selecionar = async (req: Request, res: Response) => {
    try {
        const id = Number(req.query.id);
      if (isNaN(id)) {
        res.status(200).json({ message: "Valor de ID inválido." });
      }

      if (id) {
        const clientes = await this._service.selecionarUm(id);
        if (clientes.length < 1) {
          res
            .status(200)
            .json({ message: "Nenhum cliente encontrado com este ID." });
        }
        res
          .status(200)
          .json({ message: "Cliente encontrado com sucesso!", data: clientes });
      }
      const clientes = await this._service.selecionarTodos();
      if (clientes.length < 1 ) {
        res.status(200).json({ message: "Nenhum registro encontrado." });
      }

      res
        .status(200)
        .json({ message: "Clientes encontrados com sucesso!", data: clientes });

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
