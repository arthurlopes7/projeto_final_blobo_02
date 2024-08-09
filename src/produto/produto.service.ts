import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './produto.entity';
import { Categoria } from '../categoria/categoria.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  findAll(): Promise<Produto[]> {
    return this.produtoRepository.find({ relations: ['categoria'] });
  }

  findOne(id: number): Promise<Produto> {
    return this.produtoRepository.findOne({ where: { id }, relations: ['categoria'] });
  }

  async create(produto: Produto): Promise<Produto> {
    if (produto.categoria) {
      produto.categoria = await this.categoriaRepository.findOneBy({ id: produto.categoria.id });
    }
    return this.produtoRepository.save(produto);
  }

  async update(id: number, produto: Produto): Promise<Produto> {
    if (produto.categoria) {
      produto.categoria = await this.categoriaRepository.findOneBy({ id: produto.categoria.id });
    }
    await this.produtoRepository.update(id, produto);
    return this.produtoRepository.findOne({ where: { id }, relations: ['categoria'] });
  }

  async remove(id: number): Promise<void> {
    await this.produtoRepository.delete(id);
  }
}
