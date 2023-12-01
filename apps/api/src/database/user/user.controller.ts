import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';

@Controller('Database/user')
export class UserController {
    constructor(private userService: UserService){}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        this.userService.create(createUserDto);
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }
}
