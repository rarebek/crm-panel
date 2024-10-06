import { Controller, Post, UploadedFile, UseInterceptors, Res } from '@nestjs/common';
import { FileUploadService } from './minio.service'; 
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, Express } from 'express';
import { ApiOperation, ApiBody, ApiResponse, ApiTags, ApiConsumes, ApiProperty } from '@nestjs/swagger';

class UploadImageDto {
  @ApiProperty({ type: 'string', format: 'binary' }) 
  file: Express.Multer.File;
}

@ApiTags('uploads')
@Controller('upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    description: 'Image to upload',
    type: UploadImageDto,
  })
  @ApiOperation({ summary: 'Upload an image file' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'File uploaded successfully.' })
  @ApiResponse({ status: 500, description: 'Failed to upload file.' })
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Res() response: Response) {
    try {
      const result = await this.fileUploadService.uploadFile(file);
      return response.status(201).json({
        message: 'File uploaded successfully',
        result,
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Failed to upload file',
        error: error.message,
      });
    }
  }
}
