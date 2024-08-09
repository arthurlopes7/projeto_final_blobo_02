import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Produto } from '../produto/produto.entity';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @OneToMany(() => Produto, produto => produto.categoria)
  produtos: Produto[];
}
