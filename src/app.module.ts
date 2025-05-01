import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { DatabaseModule } from './database/database.module';
import { config } from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './database/data-source';

@Module({
  imports: [
    // ConfigModule.forRoot(),
    // TypeOrmModule.forRoot(AppDataSource.options),
    DatabaseModule,
    EmployeeModule
  ]
})
export class AppModule {}
