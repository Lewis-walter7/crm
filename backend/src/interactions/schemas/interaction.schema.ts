
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Customer } from '../../customers/schemas/customer.schema';

export type InteractionDocument = Interaction & Document;

@Schema()
export class Interaction {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Customer', required: true })
    customerId: Customer;

    @Prop({ enum: ['Call', 'Email', 'Meeting', 'Note'], required: true })
    type: string;

    @Prop()
    content: string;

    @Prop({ default: Date.now })
    date: Date;
}

export const InteractionSchema = SchemaFactory.createForClass(Interaction);
