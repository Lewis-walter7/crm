
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {
    @Prop({ required: true })
    name: string;

    @Prop()
    email: string;

    @Prop()
    phone: string;

    @Prop()
    company: string;

    @Prop({ enum: ['Lead', 'Customer', 'Archived'], default: 'Lead' })
    status: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    owner: User;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
