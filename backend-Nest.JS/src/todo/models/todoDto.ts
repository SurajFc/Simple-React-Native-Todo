// export interface TodoInterface {
//   id?: number;
//   body?: string;
//   createdAt?: Date;
// }

import { IsNotEmpty } from 'class-validator';
export class TodoDto {
  id?: number;

  @IsNotEmpty()
  body?: string;

  createdAt?: Date;
}
