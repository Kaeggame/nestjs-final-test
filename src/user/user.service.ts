import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../infrastructure/database/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async addUser(email: string): Promise<User> {
        const existingUser = await this.prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }
        
        return this.prisma.user.create({ data: { email } });
    }

    async getUser(email: string): Promise<User | null> {
        return await this.prisma.user.findUnique({ where: { email } });
    }

    async resetData(): Promise<void> {
        await this.prisma.user.deleteMany();
    }
}
