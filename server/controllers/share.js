import { cut, toGif } from '../utils/publish'
import { uploadImage } from '../utils/uploadApi'

export const publish = async (req, res) => {
  console.log(req.body);
  const { fileName, start, duration, uploadUrl, type } = req.body;

  switch (type) {
    case 'gif': {
      const path = toGif(fileName, start, duration)
      console.log(path);
      const vkResponce = await uploadImage(uploadUrl, path)
      console.log(vkResponce);
      break;
    }
    case 'video': {
      const path = toGif(fileName, start, duration)
      break;
    }
  }
  res.sendStatus(200);
  // if(username.trim() && password.trim()) {
  //   const field = username.indexOf('@') ? 'email': 'username';
  //   const user = await User.find({ [field]: username });
  // }
  // res.sendStatus(200);
};

export const download = async (req, res) => {
  const { fileName, start, duration, uploadUrl } = req.body;
  // if(username.trim() && password.trim()) {
  //   const field = username.indexOf('@') ? 'email': 'username';
  //   const user = await User.find({ [field]: username });
  // }
  // res.sendStatus(200);
};
