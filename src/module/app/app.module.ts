import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatsModule } from 'src/module/cats/cats.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { AuthModule } from 'src/module/auth/auth.module';
import { UsersModule } from 'src/module/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(String(process.env.CONNECTION_STRING)),
    CatsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
