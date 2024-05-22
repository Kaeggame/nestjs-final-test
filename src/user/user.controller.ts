import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    registerUser(@Body() userData: CreateUserDto) {
        const { email } = userData;

        if (!email) {
            throw new BadRequestException('Please provide an email address.');
        }

        if (!this.emailIsValid(email)) {
            throw new BadRequestException('The email address provided is not in a valid format.');
        }

        return this.userService.addUser(email);
    }

    private emailIsValid(email: string): boolean {
        return /\S+@\S+\.\S+/.test(email);
    }
}
