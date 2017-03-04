import VK from 'vk-openapi';
import config from 'config';

const { API_HOST, VK_APP_ID } = config;

const typesToApiMethods = {
  gif: 'photos.getWallUploadServer',
  video: 'video.save'
};

const publishUrl = `http://${API_HOST}/publish`;

const getUploadUrl = type => new Promise((resolve, reject) => {
  
  const apiMethod = typesToApiMethods[type];
  
  if (!apiMethod) {
    reject('Type not found!');
    return false;
  }
  
  VK.init({ apiId: VK_APP_ID });

  VK.Auth.login(response => {
    if (response.session) {
      VK.Api.call(apiMethod, {}, ({ response }) => {
        const { upload_url } = response;
        if (upload_url) {
          resolve(upload_url);
        } else {
          reject('Vk upload failed!');
        }
      });
    } else {
      reject('Vk login failed!');
    }
  }, 8212);

});

export default ({ type, fileName, start, duration }) => {
  getUploadUrl(type)
    .then(uploadUrl => {
      console.log('uploadUrl', uploadUrl);
      // console.log('body', { type, fileName, start, duration, uploadUrl });
      return fetch(publishUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, fileName, start, duration, uploadUrl })
      });
    }).then(data => {
      console.log('data from server', data);
    });
};

