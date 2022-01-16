import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { Injectable, Logger } from '@nestjs/common';
import { Ijogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JogadoresService {

    private jogadores: Ijogador[] = []

    private readonly logger = new Logger(JogadoresService.name)

    async criarAtualizarJogador(CriarJogadorDTO: CriarJogadorDTO): Promise<void> {
        await this.criar(CriarJogadorDTO)
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

}
