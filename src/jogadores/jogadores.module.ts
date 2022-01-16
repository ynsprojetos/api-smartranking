import { Module } from '@nestjs/common';
import { JogadoresService } from './jogadores.service';

@Module({
  providers: [JogadoresService],
  exports: [JogadoresService]
})
export class JogadoresModule {}
