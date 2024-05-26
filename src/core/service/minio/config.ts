import { ClientOptions } from "minio";
import { getEnv } from "../env";

export default () => {
  const env = getEnv();
  return {
    endPoint: env.MINIO_ENDPOINT,
    port: env.MINIO_PORT,
    useSSL: false,
    accessKey: env.MINIO_ACCESS_KEY,
    secretKey: env.MINIO_SECRET_KEY,
  } satisfies ClientOptions;
};
