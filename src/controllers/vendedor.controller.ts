import { Request, Response } from "express";
import { VendedorService } from "../services/vendedor.service";

export class VendedorController {
  constructor(private _service = new VendedorService()) {}

  selecionar = async (req: Request, res: Response) => {
    try {
      const id = Number(req.query.id);
      if (isNaN(id)) {
        res.status(200).json({ message: "Valor de ID inválido." });
      }

      if (id) {
        const vendedores = await this._service.selecionarUm(id);
        if (vendedores.length < 1) {
          res
            .status(200)
            .json({ message: "Nenhum vendedor encontrado com este ID." });
        }
        res
          .status(200)
          .json({ message: "Vendedor encontrado com sucesso!", data: vendedores });
      }
      const vendedores = await this._service.selecionarTodos();
      if (vendedores.length < 1) {
        res.status(200).json({ message: "Nenhum registro encontrado." });
      }

      res
        .status(200)
        .json({ message: "Vendedores encontrados com sucesso!", data: vendedores });
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

  inserir = async (req: Request, res: Response) => {
    try {
      const { nome, cpf, email, cargo, dataNasc, dataAdmissao } = req.body;
      const novoVendedor = await this._service.inserir(
        nome,
        cpf,
        email,
        cargo,
        dataNasc,
        dataAdmissao
      );
      res
        .status(201)
        .json({
          message: "Vendedor cadastrado com sucesso!",
          data: novoVendedor,
        });
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
      const {  nome, cpf, email, cargo, dataNasc, dataAdmissao } = req.body;
      const id = Number(req.query.id);
      const verificarId = await this._service.selecionarUm(id);
      if (verificarId.length < 1) {
        res
          .status(200)
          .json({ message: "Nenhum registro encontrado com esse ID." });
      }
      const alterarVendedor = await this._service.alterar(
        id,
        nome,
        cpf,
        email,
        cargo,
        dataNasc,
        dataAdmissao
      );
      res.status(200).json({
        message: "Dados do vendedor alterados com sucesso!",
        data: alterarVendedor,
      });
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
      const verificarId = await this._service.selecionarUm(id);
      if (verificarId.length < 1) {
        res
          .status(200)
          .json({ message: "Nenhum registro encontrado com esse ID." });
      }
      const deletarAluno = await this._service.deletar(id);
      res
        .status(200)
        .json({ message: "Vendedor excluído com sucesso!", data: deletarAluno });
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
