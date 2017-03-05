import fs from 'fs';


export const list = async (req, res) => {
  const dir = fs.readdirSync('./static/video/original');
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.status(200).send({ data: dir });
};
