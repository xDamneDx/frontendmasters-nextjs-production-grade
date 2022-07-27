import { NextApiResponse } from "next";

export default (req, res: NextApiResponse) => {
  // Clears the preview cookie:
  res.clearPreviewData();
  res.end("Preview mode disabled");
};
