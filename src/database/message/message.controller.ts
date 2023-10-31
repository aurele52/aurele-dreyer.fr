import { Controller, Post, Get, Body } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './interfaces/message.interface';

@Controller('Database/message')
export class MessageController {
    constructor(private messageService: MessageService){}

    @Post()
    async create(@Body() createMessageDto: CreateMessageDto) {
        this.messageService.create(createMessageDto);
    }

    @Get()
    async findAll(): Promise<Message[]> {
        return this.messageService.findAll();
    }
}
