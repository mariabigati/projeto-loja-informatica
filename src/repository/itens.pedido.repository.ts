import { db } from "../database/connection.database";
import { IItensPedido } from "../models/itens.pedido.model";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class ItensPedidoRepository{
    async findAll():Promise<IItensPedido[]> {
        const [rows] = await db.execute<IItensPedido[]>(
            'SELECT * FROM itens_pedido;'
        )
        return rows;
    }

    async select(id: number):Promise<IItensPedido[]> {
        const sql = 'SELECT * FROM itens_pedido WHERE idItemPedido=?;';
        const values = [id];
        const [rows] = await db.execute<IItensPedido[]>(sql, values);
        console.log(rows)
        return rows;
    }

    async selectByCliente(idPedido: number):Promise<IItensPedido[]> {
        const sql = 'SELECT * FROM itens_pedido WHERE idPedidoFK=?;';
        const values = [idPedido];
        const [rows] = await db.execute<IItensPedido[]>(sql, values);
        console.log(rows)
        return rows;
    }

    async create(dados: Omit<IItensPedido, 'id'>):Promise<ResultSetHeader> {
        const sqlValorUnitario = 'SELECT valorProduto FROM produtos WHERE idProduto=?;';
        const [rowsValorUnitario] = await db.execute<RowDataPacket[]>(sqlValorUnitario, [dados._idProduto]);
        console.log("Valor Unitario: ", rowsValorUnitario)
        if (rowsValorUnitario.length === 0) {
        throw new Error(`Produto com ID ${dados._idProduto} não encontrado.`);
    }
        const valorUnitario = rowsValorUnitario[0].valorProduto;
        
        const subtotalItem = Number(valorUnitario) * Number(dados._quantidade);

        const sql='INSERT INTO itens_pedido (idPedidoFK, idProdutoFK, quantidade, valorUnitario, subtotalItem) VALUES (?,?,?,?,?);';
        const values = [dados._idPedido, dados._idProduto, dados._quantidade, valorUnitario, subtotalItem];
        console.log(values);
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    } 

    async update(id: number, dados: Omit<IItensPedido, 'id'>):Promise<ResultSetHeader> {
        const sqlValorUnitario = 'SELECT valorProduto FROM produtos WHERE idProduto=?;';
        const [rowsValorUnitario] = await db.execute<RowDataPacket[]>(sqlValorUnitario, [dados._idProduto]);
        console.log("Valor Unitario: ", rowsValorUnitario)
        if (rowsValorUnitario.length === 0) {
        throw new Error(`Produto com ID ${dados._idProduto} não encontrado.`);
    }
        const valorUnitario = rowsValorUnitario[0].valorProduto;
        
        const subtotalItem = Number(valorUnitario) * Number(dados._quantidade);

        const sql='UPDATE itens_pedido SET idPedidoFK=?, idProdutoFK=?, quantidade=?, valorUnitario=?, subtotalItem=? WHERE idItemPedido=?;';
        const values = [dados._idPedido, dados._idProduto, dados._quantidade,  valorUnitario, subtotalItem, id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async delete(id: number):Promise<ResultSetHeader> {
        const sql='DELETE FROM itens_pedido WHERE idItemPedido=?;';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}