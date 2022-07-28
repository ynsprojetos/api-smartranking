import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresController } from './jogadores/jogadores.controller';
import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://yuri:yuri@cluster0.as8tpcu.mongodb.net/?retryWrites=true&w=majority',
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }),
    JogadoresModule,
    CategoriasModule],
  controllers: [JogadoresController],
  providers: [],
})
export class AppModule {}
