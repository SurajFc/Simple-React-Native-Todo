import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './models/todoEntity';
import { TodoDto } from './models/todoDto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  createTodo(todoPost: TodoDto) {
    return this.todoRepository.save(todoPost);
  }

  listTodos() {
    return this.todoRepository.find();
  }

  editTodo(id: number, todo: TodoDto) {
    return this.todoRepository.update(id, todo);
  }

  deleteTodo(id: number) {
    return this.todoRepository.delete(id);
  }

  detailsTodo(id: number) {
    return this.todoRepository.findOne(id);
  }

  async getPaginatedTodos(page: number) {
    const response_size = 10;
    const [data, total] = await this.todoRepository.findAndCount({
      skip: (page - 1) * response_size,
      take: response_size,
    });
    console.log('total', total);
    return {
      data,
      total,
    };
  }
}
