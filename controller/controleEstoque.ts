import serviceEstoque from "../service/serviceEstoque";
import { Data } from "../model/readCSV";

export async function adicionarProduto(data: Data){
    try{
        await serviceEstoque.criar(data); 
        console.log("Produto adicionado com sucesso!");
    } catch(error){
        console.log("Erro ao adicionar produto:", error);
    }
}

export async function removerProduto(id: number){
    try{
        await serviceEstoque.removerProduto(id);
        console.log("Produto removido com sucesso!");
    } catch(error){
        console.log("Erro ao remover produto:", error);
    }
}

export async function listarItens(){
    try{
        const itens = await serviceEstoque.listarItens();
        console.log("Itens no estoque:", itens);
    } catch(error){
        console.log("Erro ao listar itens:", error);
    }
}

export async function calcularValorTotal(){
    try{
        const valorTotal = await serviceEstoque.calcularValorTotal();
        console.log("Valor total do estoque:", valorTotal);
    } catch(error){
        console.log("Erro ao calcular valor total:", error);
    }
}

export async function calcularMediaDeValor(){
    try{
        const mediaValor = await serviceEstoque.calcularMediaDeValor();
        console.log("Média de valor dos itens no estoque:", mediaValor);
    } catch(error){
        console.log("Erro ao calcular média de valor:", error);
    }
}

export async function calcularQuantidadeTotal(){
    try{
        const quantidadeTotal = await serviceEstoque.calcularQuantidadeTotal();
        console.log("Quantidade total de produtos no estoque:", quantidadeTotal);
    } catch(error){
        console.log("Erro ao calcular quantidade total:", error);
    }
}