import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { SubmissionsModule } from './submissions/submissions.module';
import { ProblemsModule } from './problems/problems.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    SubmissionsModule,
    ProblemsModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
