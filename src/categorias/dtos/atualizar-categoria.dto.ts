import { ArrayMinSize, IsArray, IsOptional, IsString } from "class-validator";
import { Evento } from "../interfaces/categoria.interface";

export class AtualizarCategoriaDTO {
    
    @IsString()
    @IsOptional()
    descricao: string;

    @IsArray()
    @ArrayMinSize(1)
    eventos: Array<Evento>
}