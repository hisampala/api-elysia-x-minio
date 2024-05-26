import { Static, t } from "elysia";

export const download_dto = t.Object({
  file_name: t.String(),
  file_type: t.String(),
});
export type TDownload = Static<typeof download_dto>;
