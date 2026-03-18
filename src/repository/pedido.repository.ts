import { db } from "../database/connection.database";
import { IPedido } from "../models/pedido.model";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class PedidoRepository {
  async findAll(): Promise<IPedido[]> {
    const [rows] = await db.execute<IPedido[]>("SELECT * FROM pedidos");
    return rows;
  }

  async select(id: number): Promise<IPedido[]> {
    const sql = "SELECT * FROM pedidos WHERE idPedido=?;";
    const values = [id];
    const [rows] = await db.execute<IPedido[]>(sql, values);
    console.log(rows);
    return rows;
  }

  async selectByCliente(idCliente: number): Promise<IPedido[]> {
    const sql = "SELECT * FROM pedidos WHERE idClienteFK=?;";
    const values = [idCliente];
    const [rows] = await db.execute<IPedido[]>(sql, values);
    console.log(rows);
    return rows;
  }

  async create(dados: Omit<IPedido, "id">): Promise<ResultSetHeader> {
    const sql =
      "INSERT INTO pedidos (idClienteFK, idVendedorFK, valorTotal) VALUES (?,?,?);";
    const values = [dados._idCliente, dados._idVendedor, 0];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows;
  }

  async update(
    id: number,
    dados: Omit<IPedido, "id">,
  ): Promise<ResultSetHeader> {
    const sqlTotal =
      'SELECT subtotalItem from itens_pedido WHERE idPedidoFK=?;';
    const [rowsTotal] = await db.execute<RowDataPacket[]>(sqlTotal, [
      dados._idPedido,
    ]);

    if (rowsTotal.length === 0) {
      throw new Error(`Pedido com ID ${dados._idPedido} não encontrado.`);
    }

    let totalItem = 0;

    rowsTotal.forEach((item) => {
      totalItem += Number(item.subtotalItem) || 0;
    });

    const sql =
      "UPDATE pedidos SET idClienteFK =?, idVendedorFK=?, valorTotal=? WHERE idPedido=?;";
    const values = [dados._idCliente, dados._idVendedor, totalItem, id];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows;
  }

  async delete(id: number): Promise<ResultSetHeader> {
    const sql = "DELETE FROM pedidos WHERE idPedido=?;";
    const values = [id];
    const [rows] = await db.execute<ResultSetHeader>(sql, values);
    return rows;
  }
}
