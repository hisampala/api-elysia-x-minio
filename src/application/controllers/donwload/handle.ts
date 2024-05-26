import Elysia from "elysia";
import { upload_dto } from "../../../core/dto";
import { Effect } from "effect";
import { download_service } from "../../../core/service/download/download.service";

export const download_handle = (app: Elysia<"/download">) =>
  app.get(
    "/:file_type/:file_name",
    async ({ params }) => {
      const program = download_service(params);
      const result = await Effect.runPromise(program);
      return result;
    },
    {
      params: upload_dto,
    },
  );
