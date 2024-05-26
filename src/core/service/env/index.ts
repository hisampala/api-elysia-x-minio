import { z } from "zod";
export type TENV = {
  MINIO_ENDPOINT: string;
  MINIO_PORT: number;
  MINIO_ACCESS_KEY: string;
  MINIO_SECRET_KEY: string;
};
const ZEnv = z.object({
  MINIO_ENDPOINT: z.string(),
  MINIO_PORT: z.string().transform((v) => parseInt(v)),
  MINIO_ACCESS_KEY: z.string(),
  MINIO_SECRET_KEY: z.string(),
});
export const getEnv = () => {
  return ZEnv.parse(process.env);
};
