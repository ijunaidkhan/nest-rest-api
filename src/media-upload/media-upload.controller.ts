/* eslint-disable prettier/prettier */
import { Controller, Param, Post, Redirect, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import { extname } from 'path';
import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import keys from 'src/config/keys';
import { MediaUploadService } from './media-upload.service';
import { Query } from '@nestjs/common';
import { Get } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jimp = require('jimp');

const fileFilter = (req, file, callback) => {
    const ext = path.extname(file.originalname);
    console.log(ext);
    if (!keys.whiteListedExtensions.includes(ext.toLowerCase())) {
      req.fileValidationError = 'Invalid file type';
      return callback(
        new HttpException('Invalid file type', HttpStatus.BAD_REQUEST),
        false,
      );
    }
    return callback(null, true);
};

@ApiTags('media-upload')
@Controller('media-upload')





export class MediaUploadController {
    constructor(private mediaService: MediaUploadService) {

    }



    @Post('mediaFiles/:folderName')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      })

    @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
            destination: function (req, file, cb) {
              const dir = 'mediaFiles/' + req.params.folderName.toLowerCase();
              fs.exists(dir, (exist) => {
                if (!exist) {
                  return fs.mkdir(dir, { recursive: true }, (error) =>
                    cb(error, dir),
                  );
                }
                return cb(null, dir);
              });
            },
            filename: (req, file, cb) => {
              console.log({ file });
              const randomName = Array(32)
                .fill(null)
                .map(() => Math.round(Math.random() * 16).toString(16))
                .join('');
              return cb(null, `${randomName}${extname(file.originalname)}`);
            },
          }),
      }),
    )


    async uploadAvatar(
        @UploadedFile() file,
        @Param('folderName') folderName: string,
        @Req() req,
    ) {
    req.setTimeout( 10 * 60 * 1000);
    file['url'] = `http://localhost:3000/media-upload/mediaFiles/${folderName.toLowerCase()}/${file.filename}`;

    console.log({file})

    let type = '';
      const nameSplit = file['filename'].split('.');
      if (nameSplit.length > 1) {
        type = nameSplit[1];
      }
      const allowTypes = ['.jpg', '.jpeg', '.png'];

      if(type && allowTypes.includes(`.${type}`)) {
        const img = await jimp.read(file['path']);
        const height = img.bitmap.height;
        const width = img.bitmap.width;

        this.mediaService.compressImageTo300(file);
        if((height<500 && width<275) || file.size <= 500 * 1000) {
            return file;
        }

        const widthRatio = width/height;

        file['path'] = file['path'].replace(
            file['filename'], `compressed/${file['filename']}`
        );

        img.resize(500*widthRatio, jimp.AUTO).write(file['path'])
        return file;

      }
    }

    @Get('mediaFiles/:folderName/:fileName')
    async mediaFiles(
      @Param('folderName') folderName: string,
      @Param('fileName') fileName: string,
      @Res() res,
      @Req() req,
      @Query('size') size = 'original',
    ): Promise<any> {
      req.setTimeout(10 * 60 * 1000);
      const sizeArray = ['original', 'compressed'];
      size = sizeArray.includes(size) ? size : 'original';
      folderName = folderName.toLowerCase();
      if (size == 'original') {
        res.sendFile(fileName, {
          root: 'mediaFiles/' + folderName,
        });
      } else {
        const dir = 'mediaFiles/' + folderName + '/' + size + '/' + fileName;
        const exists = fs.existsSync(dir);
        if (!exists) {
          res.sendFile(fileName, {
            root: 'mediaFiles/' + folderName,
          });
          return;
        }
        res.sendFile(fileName, {
          root: 'mediaFiles/' + folderName + '/' + size,
        });
      }
    }
  

    




}
