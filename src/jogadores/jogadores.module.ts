import { JogadorSchema } from './interfaces/jogador.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JogadoresService } from './jogadores.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Jogador', schema: JogadorSchema}])],
  providers: [JogadoresService],
  exports: [JogadoresService]
})
export class JogadoresModule {}
