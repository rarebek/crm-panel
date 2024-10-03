import { Module, Global, Scope } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule, utilities as nestWinstonUtilities } from 'nest-winston';
import * as winston from 'winston';
import * as moment from 'moment';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'winston',
      scope: Scope.TRANSIENT,
      useFactory: async (configService: ConfigService) => {
        const logLevel = configService.get('LOG_LEVEL') || 'info';
        const environment = configService.get('NODE_ENV') || 'development';

        const format = winston.format.combine(
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
          winston.format.errors({ stack: true }),
          winston.format.splat(),
          winston.format.json(), 
          environment === 'development'
            ? winston.format.printf(
                ({ level, message, timestamp, context, stack }) => {
                  return `${timestamp} [${level}]: ${
                    stack || message
                  } ${context ? JSON.stringify(context) : ''}`;
                },
              )
            : null,
        );

        const datePattern = 'YYYY-MM-DD';


        const generateFileName = () => {
          const currentDate = new Date();
          return moment(currentDate).format(datePattern); 
        };

        const logDir = 'logs';
        const dailyRotateTransport = new winston.transports.File({
          filename: `${logDir}/application-${generateFileName()}.log`,
          zippedArchive: true,
          maxsize: 20 * 1024 * 1024,
          maxFiles: 14,
        });

        return winston.createLogger({
          level: logLevel,
          format,
          transports: [
            new winston.transports.Console({
              format: winston.format.combine(nestWinstonUtilities.format.nestLike()),
            }),
            dailyRotateTransport,
          ],
          exitOnError: false,
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['winston'],
})
export class LoggerModule {}