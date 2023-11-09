import { IsDateString, IsString } from "@nestjs/class-validator";
import { PartialType } from "@nestjs/mapped-types";


export class CreateArticleDto {
    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsString()
    imageUrl?: string;
}

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}