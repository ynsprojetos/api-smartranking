import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Ijogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JogadoresService {

    private jogadores: Ijogador[] = []

    private readonly logger = new Logger(JogadoresService.name)
    

    async criarAtualizarJogador(CriarJogadorDTO: CriarJogadorDTO): Promise<void> {

        const {email} = CriarJogadorDTO
        const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)

        if(jogadorEncontrado){
             await this.atualizar(jogadorEncontrado, CriarJogadorDTO)
        }else {
             await this.criar(CriarJogadorDTO)
        }     
    }

    private atualizar(jogadorEncontrado: Ijogador, CriarJogadorDTO: CriarJogadorDTO): void {
        const { nome } = CriarJogadorDTO

        jogadorEncontrado.nome = nome
    }

    async consultarTodosJogadores(): Promise<Ijogador[]> {
        return await this.jogadores
    }

    async consultarTodosJogadoresPorEmail(email: string): Promise<Ijogador> {
        const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)
        if(!jogadorEncontrado){
            throw new NotFoundException(`JOGADOR COM EMAIL ${email} NÃO ENCONTRADO!`)
        }
        return jogadorEncontrado
    }

    private criar(criarJogadorDTO: CriarJogadorDTO): void {
       const { nome, telefoneCelular, email } = criarJogadorDTO

       const jogador: Ijogador = {
           _id: uuidv4(),
           nome,
           telefoneCelular,
           email,
           ranking: 'A',
           posicaoRanking: 1,
           urlFotoJogador: 'www.google.com.br/foto123.jpg'
       }
       this.logger.log(`criaJogadorDTO ${JSON.stringify(jogador)}`)
       this.jogadores.push(jogador)
    }

    async deletarJogador(email: string): Promise<Ijogador> {
        const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)
        if(!jogadorEncontrado){
         throw new NotFoundException(`JOGADOR COM EMAIL: ${email} NÃO FOI ENCONTRADO!`)
        }else{
         this.jogadores = this.jogadores.filter(jogador => jogador.email !== jogadorEncontrado.email)
        return jogadorEncontrado
        }
    }


    

}
