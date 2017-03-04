import VK from 'vk-openapi';
import config from 'config';

const { API_HOST, VK_APP_ID } = config;

const typesToApiMethods = {
  gif: 'docs.getWallUploadServer',
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
  }, 139280);
});

const uploadFile = (uploadUrl, config) => fetch(publishUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(config)
});

const post = {
  gif: ({ file, title = '', message }) => new Promise((resolve, reject) => {
    VK.Api.call('docs.save', { file, title }, ({ response: { '0': { did: docId, owner_id: ownerId } } }) => {
      if (docId && ownerId) {
        const config = { message, attachments: [`doc${ownerId}_${docId}`] };
        VK.Api.call('wall.post', config, ({ response }) => {
          if (response) {
            resolve(response.postId);
          } else {
            reject('Wall posting failed!');
          }
        });
      } else {
        reject('Vk upload failed!');
      }
    });
  }),
  video: config => {
    console.log('post video', config);
  }
};

export default ({ type, fileName, start, duration, title, message }) =>
  getUploadUrl(type)
    .then(uploadUrl => uploadFile(uploadUrl, { type, fileName, start, duration, uploadUrl }))
    .then(res => res.json())
    .then((data) => {
      const { file } = data;
      console.log(data);
      // if (!post[type]) {
      //   return false;
      // }
      // return post[type]({ file, title, message });
    });

