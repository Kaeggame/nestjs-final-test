import { BadRequestException, Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from '../infrastructure/database/prisma.service';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) {}

    async addTask(
        name: string,
        userId: number,
        priority: number,
    ): Promise<Task> {
        if (!name.trim()) {
            throw new BadRequestException('Task name cannot be empty');
        }
    
        if (isNaN(userId) || userId < 1) {
            throw new BadRequestException('Invalid userId');
        }
    
        if (isNaN(priority) || priority < 1) {
            throw new BadRequestException('Invalid priority');
        }
    
        return this.prisma.task.create({ data: { name, userId, priority } });
    }
    

    async getTaskByName(name: string): Promise<Task | null> {
        return this.prisma.task.findFirst({ where: { name } });
    }

    async getUserTasks(userId: number): Promise<Task[]> {
        if (isNaN(userId) || userId < 0) {
            throw new BadRequestException("Invalid userId");
        }
        return this.prisma.task.findMany({ where: { userId } });
    }

    async resetData(): Promise<void> {
        await this.prisma.task.deleteMany();
    }
}
