import { Elysia } from "elysia";
import { download_handle, upload_handle } from "./application/controllers";
const app = new Elysia();
app.get("/", () => "Hello Elysia X Minio");
const upload = app.group("/upload", upload_handle);
const download = app.group("/download", download_handle);
app.listen(process.env.PORT ?? 3000, ({ hostname, port }) => {
  console.log(`🦊 Elysia X Minio is running  at http://${hostname}:${port}`);
  app.routes.map((route) =>
    console.log(`[${route.path}] [${route.method}] :${route.handler.name}`),
  );
});
