import { IsNotEmpty } from 'class-validator';
export class EntryBookDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  quantity: number;
}
