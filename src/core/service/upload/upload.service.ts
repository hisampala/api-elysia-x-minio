import { Effect, pipe } from "effect";
import { TUpload } from "../../dto";
import { minioInstants } from "../minio";
import * as Errors from "./upload.error";

export const upload_service = (item: TUpload) =>
  pipe(valid_and_make_bucket(item), Effect.flatMap(request_upload_process));

const request_upload_process = (item: TUpload) => {
  return Effect.tryPromise({
    try: async () => {
      const minio = minioInstants();
      console.log("Starting upload process for:", item.file_name);
      const presignedUrl = await minio.presignedPutObject(
        item.file_type, // Ensure the correct bucket name is used
        item.file_name,
        60 * 1000,
      );
      console.log("Presigned URL generated:", presignedUrl);
      return presignedUrl;
    },
    catch: (err: unknown) => {
      console.error("Error in request_upload_process:", err);
      return new Errors.request_upload_process_error((err as Error).message);
    },
  });
};

const valid_and_make_bucket = (item: TUpload) => {
  return Effect.tryPromise({
    try: async () => {
      console.log("Validating and making bucket for:", item.file_type);
      const minio = minioInstants();
      const bucketExists = await minio.bucketExists(item.file_type);
      console.log("Bucket existence check:", { bucketExists });
      if (!bucketExists) {
        console.log("Bucket does not exist. Creating bucket:", item.file_type);
        await minio.makeBucket(item.file_type);
        console.log("Bucket created:", item.file_type);
      } else {
        console.log("Bucket already exists:", item.file_type);
      }
      return item;
    },
    catch: (err: unknown) => {
      console.error("Error in valid_and_make_bucket:", err);
      return new Errors.valid_bucket_error((err as Error).message);
    },
  });
};
