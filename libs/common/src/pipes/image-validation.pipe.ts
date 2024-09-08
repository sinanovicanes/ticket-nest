import {
  FileTypeValidator,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';

interface ImageFileValidationPipeOptions {
  required?: boolean;
  maxSize?: number;
}

const MAX_FILE_SIZE = 1024 * 1024;

export class ImageFileValidationPipe extends ParseFilePipe {
  constructor(
    options: ImageFileValidationPipeOptions = {
      required: true,
      maxSize: MAX_FILE_SIZE,
    },
  ) {
    const fileIsRequired = options.required ?? true;
    const maxSize = options.maxSize ?? MAX_FILE_SIZE;

    super({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      fileIsRequired,
      validators: [
        new MaxFileSizeValidator({
          maxSize: maxSize ?? 1024,
          message: 'File size is too large',
        }),
        new FileTypeValidator({ fileType: /(image:jpg|jpeg|png|webp)$/i }),
      ],
    });
  }
}
