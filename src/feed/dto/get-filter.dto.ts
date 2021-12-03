import { IsOptional } from 'class-validator';

export class GetFeedFilterDto {
  @IsOptional()
  search?: string;
}
