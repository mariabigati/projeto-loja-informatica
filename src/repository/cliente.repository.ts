import { db } from "../database/connection.database";
import { RowDataPacket } from "mysql2";
import { ResultSetHeader} from "mysql2";

import { Cliente } from "../models/cliente.model";

export class ClienteRepository {
    async findAll(): Promise<string[]> {

    const [rows] = await db.execute("SELECT * FROM clientes;");

    const clientes = rows as any[];

    if(!clientes || clientes.length === 0) {
        throw new Error("Clientes não encontrados!")
    }

    return clientes.map((cliente: any) => {
      const novoCliente = new Cliente(
        cliente.nomeCliente,
        cliente.cpfCliente,
        cliente.emailCliente,
        cliente.dataNasc,
        cliente.idCliente
      );

      return novoCliente.mostrarDados();
    });
  }

  async findOne(id: number): Promise<string> {
    const sql = "SELECT * FROM clientes WHERE idCliente=?;";
    const values = [id];
    const [rows] = await db.execute<RowDataPacket[]>(sql, values);
    const row = rows[0];

    if(!row) {
        throw new Error("Cliente não encontrado!")
    }

    const cliente = new Cliente(
        row.nomeCliente,
        row.cpfCliente,
        row.emailCliente,
        row.dataNasc,
        row.idCliente
    );
    return cliente.mostrarDados();
  }

  async create(dados: Omit<Cliente, "id">): Promise<ResultSetHeader> {
    const sql =
      "INSERT INTO clientes (nomeCliente, cpfCliente, emailCliente, dataNasc) VALUES (?,?,?,?,?);";
    const values = [
      dados.Nome,
      dados.Cpf,
      dados.Email,
      dados.DataNasc,

    ];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows;
  }

  async update(id: number, dados: Omit<Cliente, "id">): Promise<ResultSetHeader> {
    const sql =
      "UPDATE clientes SET nomeCliente=?, cpfCliente=?, emailCliente=?, dataNasc=? WHERE idCliente=?;";
    const values = [
      dados.Nome,
      dados.Cpf,
      dados.Email,
      dados.DataNasc,
      id
    ];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows;
  }

  async delete(id: number): Promise<ResultSetHeader> {
    const sql = "DELETE FROM clientes WHERE idCliente=?;";
    const values = [id];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows;
  }
}