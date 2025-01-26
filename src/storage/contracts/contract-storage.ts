import { type ReadStream } from 'node:fs';

export abstract class Storage {
  abstract delete: (file: string) => Promise<void>;
  abstract get: (file: string) => Promise<ReadStream>;
}
