import { db } from "../database/connection.database";
import { RowDataPacket } from "mysql2";
import { ResultSetHeader} from "mysql2";

import { Vendedor } from "../models/vendedor.model";

export class VendedorRepository {
     async findAll(): Promise<string[]> {
    
        const [rows] = await db.execute("SELECT * FROM vendedores;");
    
        const vendedores = rows as any[];
    
        if(!vendedores || vendedores.length === 0) {
            throw new Error("Vendedores não encontrados!")
        }
    
        return vendedores.map((vendedor: any) => {
          const novoVendedor = new Vendedor(
            vendedor.nomeVendedor,
            vendedor.cpfVendedor,
            vendedor.emailVendedor,
            vendedor.cargoVendedor,
            vendedor.dataNasc,
            vendedor.dataAdmissao,
          );
    
          return novoVendedor.mostrarDados();
        });
      }

async findOne(id: number): Promise<string> {
    const sql = "SELECT * FROM vendedores WHERE idVendedor=?;";
    const values = [id];
    const [rows] = await db.execute<RowDataPacket[]>(sql, values);
    const row = rows[0];

    if(!row) {
        throw new Error("Vendedor não encontrado!")
    }

    const vendedor = new Vendedor(
        row.nomeVendedor,
        row.cpfVendedor,
        row.emailVendedor,
        row.cargoVendedor,
        row.dataNasc,
        row.dataAdmissao,
    );
    return vendedor.mostrarDados();
}
  async create(dados: Omit<Vendedor, "id">): Promise<ResultSetHeader> {
    const sql =
      "INSERT INTO vendedores (nomeVendedor, cpfVendedor, emailVendedor, cargoVendedor, dataNasc, dataAdmissao) VALUES (?,?,?,?,?,?);";
    const values = [
      dados.Nome,
      dados.Cpf,
      dados.Email,
      dados.Cargo,
      dados.DataNasc,
      dados.DataAdmissao
    ];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows;
  }

  async update(id: number, dados: Omit<Vendedor, "id">): Promise<ResultSetHeader> {
    const sql =
      "UPDATE vendedores SET nomeVendedor=?, cpfVendedor=?, emailVendedor=?, cargoVendedor=?, dataNasc=?, dataAdmissao=? WHERE idVendedor=?;";
    const values = [
      dados.Nome,
      dados.Cpf,
      dados.Email,
      dados.Cargo,
      dados.DataNasc,
      dados.DataAdmissao,
      id
    ];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows;
  }

  async delete(id: number): Promise<ResultSetHeader> {
    const sql = "DELETE FROM vendedores WHERE idVendedor=?;";
    const values = [id];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows;
  }
}

