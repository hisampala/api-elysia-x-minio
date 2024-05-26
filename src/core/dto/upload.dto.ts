import { Static, t } from "elysia";

export const upload_dto = t.Object({
  file_name: t.String(),
  file_type: t.String(),
});
export type TUpload = Static<typeof upload_dto>;
