import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { Body, Controller, Delete, Get, HttpCode, Post, Query } from '@nestjs/common';
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
 async consultarJogadores(
     @Query('email') email: string): Promise<Ijogador[] | Ijogador> {
        if(email){
          return await this.jogadoresService.consultarTodosJogadoresPorEmail(email)
        }else{
          return await this.jogadoresService.consultarTodosJogadores()
        }
        }

@Delete()
@HttpCode(200)
 async deletarJogador(@Query('email') email: string): Promise<Ijogador> {
      return this.jogadoresService.deletarJogador(email) 
 }
    

}
