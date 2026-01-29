
import '../dns_patch'; // Apply DNS patch first
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import * as dns from 'dns';
import { promisify } from 'util';
import { INestApplicationContext } from '@nestjs/common';

const resolveSrv = promisify(dns.resolveSrv);

async function bootstrap() {
    console.log('Testing DNS resolution for _mongodb._tcp.cluster0.ct8mrnn.mongodb.net...');
    try {
        const addresses = await resolveSrv('_mongodb._tcp.cluster0.ct8mrnn.mongodb.net');
        console.log('DNS Resolution Success:', addresses);
    } catch (e) {
        console.error('DNS Resolution Failed:', e);
    }

    console.log('Starting Nest Application...');
    let app: INestApplicationContext;
    try {
        app = await NestFactory.createApplicationContext(AppModule);
    } catch (err) {
        console.error('Failed to create Nest App Context:', err);
        return;
    }

    try {
        const connection = app.get<Connection>(getConnectionToken());
        if (connection.readyState === 1) {
            console.log('Successfully connected to MongoDB!');
        } else {
            console.log('MongoDB connection state:', connection.readyState);
        }
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    } finally {
        if (app) await app.close();
    }
}
bootstrap().catch(err => console.error('Bootstrap failed:', err));
