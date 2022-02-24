import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { SubmissionsModule } from './submissions/submissions.module';
import { ProblemsModule } from './problems/problems.module';
import { ParsersModule } from './parsers/parsers.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    HttpModule,
    AuthModule,
    SubmissionsModule,
    ProblemsModule,
    ParsersModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
