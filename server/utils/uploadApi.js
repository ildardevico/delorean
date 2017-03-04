import rp from 'request-promise';
import fs from 'fs';


export const uploadImage = (uri, image) => {
  return rp.post({
    uri,
    formData: {
      photo: {
        value: fs.readFileSync(image),
        options: {
          filename: 'photo.gif',
          contentType: `image/gif`
        }
      }
    },
    json: true
  });
};
