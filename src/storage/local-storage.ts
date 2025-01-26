import {
  createReadStream,
  existsSync,
  promises,
  type ReadStream,
} from 'node:fs';
import { resolve } from 'node:path';
import { Injectable } from '@nestjs/common';
import { type Storage } from './contracts/contract-storage';

@Injectable()
export class LocalStorage implements Storage {
  async delete(file: string): Promise<void> {
    const fileName = resolve('./.tmp', file);
    if (existsSync(fileName)) {
      await promises.unlink(fileName);
    }
  }

  async get(file: string): Promise<ReadStream> {
    const fileName = resolve('./.tmp', file);
    return createReadStream(fileName);
  }
}
