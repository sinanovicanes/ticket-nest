import * as argon2 from 'argon2';

export namespace EncryptionUtils {
  export async function hash(
    value: string,
    options?: argon2.Options,
  ): Promise<string> {
    return argon2.hash(value, options);
  }

  export async function verify(hash: string, value: string): Promise<boolean> {
    return argon2.verify(hash, value);
  }
}
