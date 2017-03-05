import fs from 'fs';


export const list = async (req, res) => {
  const dir = fs.readdirSync('./static/video/original').filter(name => name.slice(0, 1) !== '.');
  res.send(dir);
};
