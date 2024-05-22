import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    readonly name: string;
    @IsNotEmpty()
    readonly userId: number;
    @IsNotEmpty()
    readonly priority: string;
}
