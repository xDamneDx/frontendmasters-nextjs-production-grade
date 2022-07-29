import { NextApiResponse } from "next";
import nc from "next-connect";
import { doc } from "../../../db";
import middleware from "../../../middleware/all";
import onError from "../../../middleware/error";
import { Request } from "../../../types";

const handler = nc<Request, NextApiResponse>({
  onError,
});

handler.use(middleware);

handler.put(async (req, res) => {
  const updated = await doc.updateOne(req.db, req.query.id as string, req.body);

  res.send({ data: updated });
});

export default handler;
