import rp from 'request-promise';
import fs from 'fs';
import pathUtil from 'path';


export const uploadData = (uri, path, key, contentType) => {
  const ext = pathUtil.extname(path);

  return rp.post({
    uri,
    formData: {
      [key]: {
        value: fs.readFileSync(path),
        options: {
          filename: `data${ext}`,
          contentType //'image/gif' || 'video/mp4'
        }
      }
    },
    json: true
  });
};
