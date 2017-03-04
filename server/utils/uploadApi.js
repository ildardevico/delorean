import rp from 'request-promise';
import fs from 'fs';
// import dataurl from 'dataurl';


export const uploadImage = (uri, image) => {
//   fs.createReadStream(image).pipe(
//   dataurl.stream({ mimetype: 'image/png'})
// ).pipe(process.stderr, {end: false});
  return rp.post({
    uri,
    formData: {
      photo: fs.createReadStream(image)
    },
    json: true
  })
};
