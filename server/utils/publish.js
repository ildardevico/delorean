const shell = require('shelljs');
const path = require('path');
const staticFolder = `${__dirname}./static/`;

export const cut = (fileName, startTime, endTime) => {
  const command = `ffmpeg -ss ${startTime} -i ${staticFolder}original/${fileName} -t ${endTime} -c copy ${staticFolder}cutted/${fileName} -y`;

  if (shell.exec(command, { silent: true }).code !== 0) {
    shell.echo('Command execution error');
    shell.exit(1);
  }
  return `${staticFolder}cutted/${fileName}`;
};

export const toGif = (fileName, startTime, endTime) => {
  const ext = path.extname(fileName);
  const endLastName = `${fileName.slice(0, ext.length + 1)}.gif`;

  const command = `ffmpeg -v warning -ss ${startTime} -t ${endTime} -i ${staticFolder}original/${fileName} -vf scale=600:-1 -gifflags +transdiff -y ${staticFolder}gifs/${endLastName}`;
  if (shell.exec(command, { silent: true }).code !== 0) {
    shell.echo('Command execution error');
    shell.exit(1);
  }
  return `${staticFolder}gifs/${endLastName}`;
};

// cut('GoPro.mp4', 40, 10)
// toGif('GoPro.mp4', 40, 10)
