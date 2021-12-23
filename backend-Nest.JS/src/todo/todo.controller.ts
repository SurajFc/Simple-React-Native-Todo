import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { TodoDto } from './models/todoDto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  list(): Promise<TodoDto[]> {
    return this.todoService.listTodos();
  }

  @Post()
  create(@Body() todoPost: TodoDto): Promise<TodoDto> {
    return this.todoService.createTodo(todoPost);
  }

  @Patch(`:id`)
  update(
    @Param('id') id: number,
    @Body() todoPatch: TodoDto,
  ): Promise<UpdateResult> {
    return this.todoService.editTodo(id, todoPatch);
  }

  @Delete(`:id`)
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.todoService.deleteTodo(id);
  }

  @Get(`:id`)
  details(@Param('id') id: number): Promise<TodoDto> {
    return this.todoService.detailsTodo(id);
  }

  //Pagination response
  //   @Get()
  //   getPaginatedTodos(@Query('page') page: number): Promise<> {
  //     return this.todoService.getPaginatedTodos(page);
  //   }
}
