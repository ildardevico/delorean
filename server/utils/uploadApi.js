import rp from 'request-promise';
import fs from 'fs';


export const uploadImage = (uri, image) => rp.post({
  uri,
  formData: {
    photo: fs.createReadStream(image)
  },
  json: true
});
