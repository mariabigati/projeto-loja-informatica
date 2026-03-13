import { ClienteRepository } from "../repository/cliente.repository";
import { Cliente } from "../models/cliente.model";

export class ClienteService {
    constructor(private _repository = new ClienteRepository()) {}


async selecionarTodos() {
    return await this._repository.findAll();
}

async selecionarUm(id:number) {
    return await this._repository.findOne(id);
}

async inserir(nome: string, cpf: string, email: string, dataNasc: Date) {
    const cliente = Cliente.inserir(nome, cpf, email, dataNasc);
    return await this._repository.create(cliente);
}

async alterar(id: number, nome: string, cpf:string, email: string, dataNasc:Date){
    const cliente = Cliente.alterar(nome, cpf, email, dataNasc, id);
    return await this._repository.update(id, cliente);
}

async deletar(id: number) {
    return await this._repository.delete(id);
}
}