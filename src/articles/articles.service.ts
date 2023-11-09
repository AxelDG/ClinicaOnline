import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto, UpdateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  getArticles() {
    return this.articleRepository.find();
  }

  async getArticleById(id: number) {
    const articleFound = await this.articleRepository.findOne({
      where: { id },
    });

    if (!articleFound) {
      return new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }

    return articleFound;
  }

  async createArticle(article: CreateArticleDto) {
    const newArticle = this.articleRepository.create(article);
    return this.articleRepository.save(newArticle);
  }

  async updateArticle(id: number, article: UpdateArticleDto) {
    const articleFound = await this.articleRepository.findOne({
      where: { id },
    });

    if (!articleFound) {
      return new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }

    const updateArticle = Object.assign(articleFound, article);
    return this.articleRepository.save(updateArticle);
  }

  async deleteArticle(id: number) {
    const articleFound = await this.articleRepository.findOne({
      where: { id },
    });

    if (!articleFound) {
      return new HttpException('Article not found', HttpStatus.NOT_FOUND)
    }

    return this.articleRepository.delete({id: articleFound.id})
  }
}
