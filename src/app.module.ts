import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { environmentConfiguration } from './modules/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [environmentConfiguration],
    }),
  ],
})
export class AppModule {}
