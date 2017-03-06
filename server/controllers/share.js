import { cut, toGif } from '../utils/publish';
import { uploadData } from '../utils/uploadApi';


export const publish = async (req, res) => {
  const { fileName, start, uploadUrl, type } = req.body;
  console.log(`Publish ${type} ${new Date()}`);

  let { duration } = req.body;
  duration = duration - start;

  switch (type) {
    case 'gif': {
      const path = toGif(fileName, start, duration);
      const vkResponce = await uploadData(uploadUrl, path, 'file', 'image/gif');
      res.send(vkResponce);
      break;
    }
    case 'video': {
      const path = cut(fileName, start, duration);
      const vkResponce = await uploadData(uploadUrl, path, 'video_file', 'video/mp4');
      res.send(vkResponce);
      break;
    }
  }
};

export const download = async (req, res) => {
  const { fileName, start, type } = req.body;
  console.log(`Download ${type} ${new Date()}`);

  let { duration } = req.body;
  duration = duration - start;

  let path;

  switch (type) {
    case 'gif': {
      path = toGif(fileName, start, duration);
      break;
    }
    case 'video': {
      path = cut(fileName, start, duration);
      break;
    }
  }

  res.send({ path });
};
