import { IsNotEmpty } from 'class-validator';

export class createFeedDto {
  @IsNotEmpty()
  body: string;
}
