/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MediaUploadController } from './media-upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MediaUploadService } from './media-upload.service';

@Module({
  imports: [MulterModule.register({
    dest: './files',
  })],
  controllers: [MediaUploadController],
  providers: [MediaUploadService]
})
export class MediaUploadModule {}
