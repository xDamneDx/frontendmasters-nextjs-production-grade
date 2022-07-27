import { NextApiResponse } from "next";

export default (req, res: NextApiResponse) => {
  // Sets the preview cookie:
  res.setPreviewData({});
  // Redirects to the page you want to preview:
  res.redirect(req.query.route);
};
