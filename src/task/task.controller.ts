import { Controller, Post, Body, Get, Param, BadRequestException} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
    createNewTask(@Body() createTaskDto: CreateTaskDto) {
        const { name, userId, priority } = createTaskDto;

        const userIdAsNumber = Number(userId);
        const priorityAsNumber = Number(priority);

        if (isNaN(userIdAsNumber) || isNaN(priorityAsNumber)) {
            throw new BadRequestException('Invalid input numbers');
        }

        return this.taskService.addTask(name, userIdAsNumber, priorityAsNumber);
    }

    @Get('/user/:userId')
    async getUserTasksByUserId(@Param('userId') userId: string) {
        const userIdNumber = parseInt(userId, 10);
        if (isNaN(userIdNumber)) {
            throw new BadRequestException('userId Invalid');
        }
        return this.taskService.getUserTasks(userIdNumber);
    }
}
