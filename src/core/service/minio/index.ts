import { Client } from "minio";
import minioConfig from "./config";
export const minioInstants = () => new Client(minioConfig());
