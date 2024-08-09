import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categoria/categoria.entity';
import { Produto } from './produto/produto.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 8080,
      username: 'root',
      password: 'root', 
      database: 'db_farmacia',
      entities: [Categoria, Produto],
      synchronize: true,
    }),

})
export class AppModule {}
