
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop()
    password?: string;

    @Prop()
    email?: string;

    @Prop()
    nextcloudId?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
