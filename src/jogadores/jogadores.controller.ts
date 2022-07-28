import { AtualizarJogadorDTO } from './dtos/atualizar-jogador.dto';
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private jogadoresService: JogadoresService){}

 @Post()
 @UsePipes(ValidationPipe)
 async criarJogador(@Body() criarJogadorDTO: CriarJogadorDTO): Promise<Jogador>{
      return await this.jogadoresService.criarJogador(criarJogadorDTO)
 }

 @Put('/:id')
 @UsePipes(ValidationPipe)
 async atualizarJogador(
    @Body() atualizarJogadot: AtualizarJogadorDTO, 
    @Param('id') id: String) : Promise<void>{
     await this.jogadoresService.atualizarJogador(id,atualizarJogadot)
 }

 @Get()
 async consultarJogadores(): Promise<Jogador[]> {
     return await this.jogadoresService.consultarTodosJogadores()
 }

@Get('/:id')
 async consultarJogadorPeloId(
     @Param('id') id: string): Promise<Jogador> {
          return await this.jogadoresService.consultarJogadorPorId(id)
        }

@Delete('/:id')
@HttpCode(200)
 async deletarJogador(@Param('id' , JogadoresValidacaoParametrosPipe) id: String): Promise<void> {
       this.jogadoresService.deletarJogador(id) 
 }
    

}
