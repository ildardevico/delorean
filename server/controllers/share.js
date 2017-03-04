import { cut, toGif } from '../utils/publish';
import { uploadData } from '../utils/uploadApi';

export const publish = async (req, res) => {
  const { fileName, start, duration, uploadUrl, type } = req.body;

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
      res.sendStatus(200)
      break;
    }
  }
};

export const download = async (req, res) => {
  const { fileName, start, duration, uploadUrl } = req.body;

};
