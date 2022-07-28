import { JogadoresService } from './../jogadores/jogadores.service';
import { CriarCategoriaDTO } from './dtos/criar-categoria.dto';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categoria } from './interfaces/categoria.interface';
import { AtualizarCategoriaDTO } from './dtos/atualizar-categoria.dto';

@Injectable()
export class CategoriasService {

    constructor(@InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
    private readonly jogadoresService: JogadoresService) {}

    async criarCategoria(criarCategoriaDTO: CriarCategoriaDTO): Promise<Categoria> {
        const { categoria } = criarCategoriaDTO

        const categoriaEncontrada = await this.categoriaModel.findOne({categoria: categoria})

        if(categoriaEncontrada){
            throw new BadRequestException('CATEGORIA JÁ CADASTRADA!')
        }

        const categoriaCriada = new this.categoriaModel(criarCategoriaDTO)
        return categoriaCriada.save()
}

async consultarTodasCategoria(): Promise<Array<Categoria>> {
     return await this.categoriaModel.find().populate("jogadores").exec()
}

async consultarCategoriaPorId(id: String): Promise<Categoria> {
    return this.categoriaModel.findById(id)
}

async atualizarCategoria(categoria: AtualizarCategoriaDTO, id: String): Promise<void> {

    const categoriaEncontrada = await this.categoriaModel.findOne({id: id})

    if(!categoriaEncontrada){
        throw new NotFoundException("CATEGORIA NÃO ENCONTRADA!")
    }

    await this.categoriaModel.findByIdAndUpdate(id, categoria)
}

async atribuirCategoriaJogador(params: string[]): Promise<void>{

    const categoria = params['categoria']
    const idJogador = params['idJogador']

    const categoriaEncontrada = await this.categoriaModel.findOne({id: categoria})
    const jogadorJaCadastradoCategoria = await this.categoriaModel.find({categoria: categoria}).where('jogadores').in(idJogador).exec()

    await this.jogadoresService.consultarJogadorPorId(idJogador)

    if(!categoriaEncontrada){
        throw new NotFoundException(`CATEGORIA ${categoria} NÃO ENCONTRADA!`)
    }

    if(jogadorJaCadastradoCategoria.length > 0){
        throw new NotFoundException("JOGADOR JÁ CADASTRADO!")
    }

    categoriaEncontrada.jogadores.push(idJogador)
    await this.categoriaModel.findOneAndUpdate(idJogador, categoriaEncontrada)
}

}
