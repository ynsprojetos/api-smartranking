import { AtualizarJogadorDTO } from './dtos/atualizar-jogador.dto';
import { BadRequestException } from '@nestjs/common';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Ijogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { exec } from 'child_process';

@Injectable()
export class JogadoresService {

    private jogadores: Ijogador[] = []

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Ijogador>){}

    private readonly logger = new Logger(JogadoresService.name)
    

    async criarJogador(CriarJogadorDTO: CriarJogadorDTO): Promise<Ijogador> {

       const {email} = CriarJogadorDTO

       const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        if(jogadorEncontrado){
            throw new BadRequestException(`JOGADOR ${email} JÁ CADASTRADO!`)
        }

        const jogadorCriado = new this.jogadorModel(CriarJogadorDTO)        
        return await jogadorCriado.save()
    }


    async atualizarJogador(id: String , atualizarJogadorDto: AtualizarJogadorDTO): Promise<void> {

        const jogadorEncontrado = await this.jogadorModel.findOne({id}).exec();

        if(!jogadorEncontrado){
             throw new NotFoundException(`JOGADOR COM ID: ${id}  NÃO ENCONTRADO!`)
        }
        
        await this.jogadorModel.findOneAndUpdate({_id: id}, CriarJogadorDTO)
        
    }

    private async atualizar(criarJogadorDTO: CriarJogadorDTO): Promise<void> {

         await this.jogadorModel.findOneAndUpdate({email: criarJogadorDTO.email}, 
        {$set: criarJogadorDTO}).exec();


        // const { nome } = CriarJogadorDTO

        // jogadorEncontrado.nome = nome
    }

    async consultarTodosJogadores(): Promise<Ijogador[]> {
        return await this.jogadorModel.find().exec()
    }

    // async consultarTodosJogadoresPorEmail(email: string): Promise<Ijogador> {
    //     const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();
    //     if(!jogadorEncontrado){
    //         throw new NotFoundException(`JOGADOR COM EMAIL ${email} NÃO ENCONTRADO!`)
    //     }
    //     return jogadorEncontrado
    // }

    async consultarJogadorPorId(id: string): Promise<Ijogador> {
    
       const jogadorEncontrado = await this.jogadorModel.findOne({_id: id})
        if(!jogadorEncontrado){
            throw new NotFoundException(`JOGADOR COM ID ${id} NÃO ENCONTRADO!`)
        }

        return jogadorEncontrado
    }

    private async criar(criarJogadorDTO: CriarJogadorDTO): Promise<Ijogador> {

        const jogadorCriado = new this.jogadorModel(criarJogadorDTO);
        return await jogadorCriado.save();
        
        
    //    const { nome, telefoneCelular, email } = criarJogadorDTO
    //    const jogador: Ijogador = {
    //        _id: uuidv4(),
    //        nome,
    //        telefoneCelular,
    //        email,
    //        ranking: 'A',
    //        posicaoRanking: 1,
    //        urlFotoJogador: 'www.google.com.br/foto123.jpg'
    //    }
    //    this.logger.log(`criaJogadorDTO ${JSON.stringify(jogador)}`)
    //    this.jogadores.push(jogador)
    }

    async deletarJogador(id: String): Promise<void> {

        const jogadorEncontrado = await this.jogadorModel.findOne({_id: id})
        if(!jogadorEncontrado){
            throw new NotFoundException(`JOGADOR COM ID ${id} NÃO ENCONTRADO!`)
        }

         await this.jogadorModel.deleteOne({id: id})
        //return await this.jogadorModel.remove({email}).exec();

        // const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)
        // if(!jogadorEncontrado){
        //  throw new NotFoundException(`JOGADOR COM EMAIL: ${email} NÃO FOI ENCONTRADO!`)
        // }else{
        //  this.jogadores = this.jogadores.filter(jogador => jogador.email !== jogadorEncontrado.email)
        // return jogadorEncontrado
        // }
    }


    

}
