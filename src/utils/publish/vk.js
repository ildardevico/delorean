import VK from 'vk-openapi';
import config from 'config';

const { API_HOST, VK_APP_ID } = config;
const typesToApiMethods = {
  gif: 'docs.getWallUploadServer',
  video: 'video.save'
};
const publishUrl = `http://${API_HOST}/publish`;
let userId = 0;

const getUploadUrl = (type, title) => new Promise((resolve, reject) => {
  const apiMethod = typesToApiMethods[type];
  if (!apiMethod) {
    reject('Type not found!');
    return false;
  }
  VK.init({ apiId: VK_APP_ID });
  VK.Auth.login(response => {
    if (response.session) {
      userId = response.session.mid;
      const config = {};
      if (type === 'video') {
        config.name = title;
      }
      VK.Api.call(apiMethod, config, ({ response }) => {
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
    VK.Api.call('docs.save', { file, title }, ({ response: { '0': { did: docId } } }) => {
      if (docId) {
        const config = { message, attachments: [`doc${userId}_${docId}`] };
        VK.Api.call('wall.post', config, ({ response }) => {
          if (response) {
            resolve(response.post_id);
          } else {
            reject('Wall posting failed!');
          }
        });
      } else {
        reject('Vk upload failed!');
      }
    });
  }),
  video: ({ video_id: videoId, title = '', message }) => new Promise((resolve, reject) => {
    const config = { message, attachments: [`video${userId}_${videoId}`] };
    VK.Api.call('wall.post', config, ({ response }) => {
      if (response) {
        resolve(response.post_id);
      } else {
        reject('Wall posting failed!');
      }
    });
  })
};

export default ({ type, fileName, start, duration, title, message }) =>
  getUploadUrl(type, title)
    .then(uploadUrl => uploadFile(uploadUrl, { type, fileName, start, duration, uploadUrl }))
    .then(res => res.json())
    .then(({ file, video_id }) => {
      if (!post[type]) {
        return false;
      }
      return post[type]({ file, video_id, title, message });
    });

