import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
	imports: [
		TypeOrmModule.forRoot(typeOrmConfig),
		OrdersModule,
		],
})
export class AppModule {}
