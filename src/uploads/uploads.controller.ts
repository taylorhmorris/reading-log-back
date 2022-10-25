import {
  Controller,
  HttpStatus,
  Logger,
  NotImplementedException,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UploadsService } from './uploads.service';

class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

@ApiBearerAuth()
@ApiTags('uploads')
@ApiResponse({
  status: 401,
  description: 'Unauthorized: no valid token was supplied',
})
@Controller('uploads')
export class UploadsController {
  private readonly logger = new Logger(UploadsController.name);

  constructor(private readonly uploadsService: UploadsService) {}

  @Post('uploadJSON')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'JSON file of Reading Log export',
    type: FileUploadDto,
  })
  @ApiResponse({
    status: 501,
    description: 'File uploads are not yet implemented',
  })
  uploadJSON(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'json',
        })
        .addMaxSizeValidator({
          maxSize: 1000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    this.logger.log(file.fieldname);
    this.logger.log(file.originalname);
    this.logger.log(file.mimetype);
    // this.logger.log(file.buffer);
    this.logger.log(file.size);
    throw new NotImplementedException('File uploads are not yet implemented');
  }
}
