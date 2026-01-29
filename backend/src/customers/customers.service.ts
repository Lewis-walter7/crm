
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from './schemas/customer.schema';

@Injectable()
export class CustomersService {
    constructor(@InjectModel(Customer.name) private customerModel: Model<CustomerDocument>) { }

    async create(createCustomerDto: any): Promise<Customer> {
        const createdCustomer = new this.customerModel(createCustomerDto);
        return createdCustomer.save();
    }

    async findAll(): Promise<Customer[]> {
        return this.customerModel.find().exec();
    }

    async findOne(id: string): Promise<Customer | null> {
        return this.customerModel.findById(id).exec();
    }

    async update(id: string, updateCustomerDto: any): Promise<Customer | null> {
        return this.customerModel.findByIdAndUpdate(id, updateCustomerDto, { new: true }).exec();
    }

    async remove(id: string): Promise<any> {
        return this.customerModel.findByIdAndDelete(id).exec();
    }
}
