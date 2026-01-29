
import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { InteractionsService } from './interactions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('interactions')
export class InteractionsController {
    constructor(private readonly interactionsService: InteractionsService) { }

    @Post()
    create(@Body() createInteractionDto: any) {
        return this.interactionsService.create(createInteractionDto);
    }

    @Get()
    findAll(@Query('customerId') customerId: string) {
        return this.interactionsService.findAllByCustomer(customerId);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.interactionsService.remove(id);
    }
}
