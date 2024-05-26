import Elysia from "elysia";
import { upload_dto } from "../../../core/dto";
import { upload_service } from "../../../core/service/upload/upload.service";
import { Effect } from "effect";

export const upload_handle = (app: Elysia<"/upload">) =>
  app.post(
    "/",
    async ({ body }) => {
      const program = upload_service(body);
      const result = await Effect.runPromise(program);
      return result;
    },
    {
      body: upload_dto,
    },
  );
