import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DEFAULT_ROOT_PATH, ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MinioModule } from 'nestjs-minio-client';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule, 
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/styles/',
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: true,
      autoLoadEntities: true,
    }),

    MinioModule.register({
      endPoint: process.env.MINIO_ENDPOINT,
      port: Number(process.env.MINIO_PORT),
      useSSL: false,
      accessKey: process.env.MINIO_ACCESSKEY,
      secretKey: process.env.MINIO_SECRETKEY,
    })
  ],
  exports: [LoggerModule, MinioModule],
})


export class CoreModule {}

const rootPath = join(__dirname, '..', 'public')