import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { JogadoresService } from './jogadores.service';
import { Ijogador } from './interfaces/jogador.interface';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private jogadoresService: JogadoresService){}

 @Post()
 async criarAtualizarJogador(@Body() criarJogadorDTO: CriarJogadorDTO){

     await this.jogadoresService.criarAtualizarJogador(criarJogadorDTO)
 }

 @Get()
 async consultarJogadores(): Promise<Ijogador[]> {
     
    return this.jogadoresService.consultarTodosJogadores()
 }

}
