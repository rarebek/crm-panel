import { Injectable } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid'; 


@Injectable()
export class FileUploadService {
  constructor(private readonly minioService: MinioService) {}

  async listAllBuckets(): Promise<any[]> {
    try {
      const buckets = await this.minioService.client.listBuckets(); 
      return buckets;
    } catch (error) {
      throw new Error(`Failed to list buckets: ${error.message}`);
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<any> {
    const bucketName = process.env.MINIO_DEFAULT_BUCKET; 
    const fileName = `${uuidv4()}-${file.originalname}`
    const fileBuffer = file.buffer;

    const fileStream = new Readable();
    fileStream.push(fileBuffer);
    fileStream.push(null); 

    try {
      const result = await this.minioService.client.putObject(
        bucketName,
        fileName,
        fileStream,
        file.size,
        {
          'Content-Type': file.mimetype,
        },
      );
      return `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/images/${fileName}`
    } catch (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }
}
