export interface StorageStrategy {
  uploadFile(file: Express.Multer.File): Promise<string>;
  uploadFiles(files: Express.Multer.File[]): Promise<string[]>;
  deleteFile(fileUrl: string): Promise<void>;
  deleteFiles(fileUrls: string[]): Promise<void>;
}
