/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { UserModule } from './users/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MediaUploadModule } from './media-upload/media-upload.module';
import config from './config/keys';

@Module({
  imports: [ItemsModule, UserModule, MongooseModule.forRoot(config.mongoURI), MediaUploadModule],
  controllers: [AppController ],
  providers: [AppService ],
})
export class AppModule {}
