import { Injectable } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';

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
}
