
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Interaction, InteractionDocument } from './schemas/interaction.schema';

@Injectable()
export class InteractionsService {
    constructor(@InjectModel(Interaction.name) private interactionModel: Model<InteractionDocument>) { }

    async create(createInteractionDto: any): Promise<Interaction> {
        const createdInteraction = new this.interactionModel(createInteractionDto);
        return createdInteraction.save();
    }

    async findAllByCustomer(customerId: string): Promise<Interaction[]> {
        return this.interactionModel.find({ customerId: customerId as any }).exec();
    }

    async remove(id: string): Promise<any> {
        return this.interactionModel.findByIdAndDelete(id).exec();
    }
}
