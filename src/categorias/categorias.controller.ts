import { Body, Controller, Get, Post, UsePipes, ValidationPipe, Param, Put } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { AtualizarCategoriaDTO } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDTO } from './dtos/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Controller('api/categorias')
export class CategoriasController {

    constructor(private readonly categoriaService: CategoriasService){}

    @Post()
    @UsePipes(ValidationPipe)
    async criarCategoria(@Body() criarCategoriaDTO: CriarCategoriaDTO): Promise<Categoria> {
            return await this.categoriaService.criarCategoria(criarCategoriaDTO)
    }

    @Get()
    async consultarCategorias(): Promise<Array<Categoria>> {
        return await this.categoriaService.consultarTodasCategoria()
    }

    @Get('/:id')
    async consultarCategoriaPorId(@Param('id') id: String): Promise<Categoria>{
        return await this.categoriaService.consultarCategoriaPorId(id)
    }

    @Put('/:id')
    @UsePipes(ValidationPipe)
    async atualizarCategoria(@Body() categoria: AtualizarCategoriaDTO, @Param('id') id: String): Promise<void>{
        await this.categoriaService.atualizarCategoria(categoria,id) 
    }

    @Post('/:categoria/jogadores/:idJogador')
    async atribuirCategoriaJogador(@Param() params: string[] ): Promise<void>{
        console.log('teste')
        await this.categoriaService.atribuirCategoriaJogador(params)
    }

}
