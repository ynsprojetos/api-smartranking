import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private jogadoresService: JogadoresService){}

 @Post()
 async criarAtualizarJogador(@Body() criarJogadorDTO: CriarJogadorDTO){

     await this.jogadoresService.criarAtualizarJogador(criarJogadorDTO)
 }

}
