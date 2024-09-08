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

export class ImageFileValidationPipe extends ParseFilePipe {
  constructor(
    options: ImageFileValidationPipeOptions = {
      required: true,
      maxSize: 1024,
    },
  ) {
    const fileIsRequired = options.required ?? true;
    const maxSize = options.maxSize ?? 1024;

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
