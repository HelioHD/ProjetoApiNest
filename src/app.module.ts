import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SendgridModule } from './app/sendgrid/sendgrid.module';
import { MailModule } from './app/mail/mail.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'database',
      username: 'username',
      password: 'senha',
      synchronize: true, // Não pode usar EM PRODUÇÃO APENAS EM DESENVOLVIMENTO 
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
    }),
    ScheduleModule.forRoot(),
    SendgridModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
