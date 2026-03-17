import { db } from "../database/connection.database";
import { IPedido } from "../models/pedido.model";
import { ResultSetHeader } from "mysql2";

export class PedidoRepository{
    async findAll():Promise<IPedido[]> {
        const [rows] = await db.execute<IPedido[]>(
            'SELECT * FROM pedidos'
        )
        return rows;
    }

    async select(id: number):Promise<IPedido[]> {
        const sql = 'SELECT * FROM pedidos WHERE idPedido=?;';
        const values = [id];
        const [rows] = await db.execute<IPedido[]>(sql, values);
        console.log(rows)
        return rows;
    }

    async selectByCliente(idCliente: number):Promise<IPedido[]> {
        const sql = 'SELECT * FROM pedidos WHERE idClienteFK=?;';
        const values = [idCliente];
        const [rows] = await db.execute<IPedido[]>(sql, values);
        console.log(rows)
        return rows;
    }

    async create(dados: Omit<IPedido, 'id'>):Promise<ResultSetHeader> {
        const sql='INSERT INTO pedidos (idClienteFK, idVendedorFK) VALUES (?,?);';
        const values = [dados._nome, dados._estaAtivo];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    } 

    async update(id: number, dados: Omit<IPedido, 'id'>):Promise<ResultSetHeader> {
        const sql='UPDATE pedidos SET idCliente =?, idVendedor=? WHERE idPedido=?;';
        const values = [dados._nome, dados._estaAtivo, id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    } 

    async delete(id: number):Promise<ResultSetHeader> {
        const sql='DELETE FROM pedidos WHERE idPedido=?;';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}