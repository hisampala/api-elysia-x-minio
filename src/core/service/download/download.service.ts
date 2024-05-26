import { Effect, pipe } from "effect";
import { TDownload, TUpload } from "../../dto";
import { minioInstants } from "../minio";
import * as Errors from "./download.error";

export const download_service = (item: TDownload) =>
  pipe(valid_and_make_bucket(item), Effect.flatMap(request_download_process));

const request_download_process = (item: TDownload) => {
  return Effect.tryPromise({
    try: async () => {
      const minio = minioInstants();
      return await minio.presignedGetObject(
        item.file_type, // The bucket name should be used here
        item.file_name,
        60 * 1000,
      );
    },
    catch: (err: unknown) => {
      return new Errors.request_download_process_error((err as Error).message);
    },
  });
};

const valid_and_make_bucket = (item: TDownload) => {
  return Effect.tryPromise({
    try: async () => {
      const minio = minioInstants();
      const bucketExists = await minio.bucketExists(item.file_type);
      if (!bucketExists) {
        await minio.makeBucket(item.file_type);
      }
      return item;
    },
    catch: (err: unknown) => {
      return new Errors.valid_bucket_error((err as Error).message);
    },
  });
};
