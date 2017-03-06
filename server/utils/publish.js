import shell from 'shelljs';
import path from 'path';
import { secondsToHms } from './time';
const staticFolder = `./static/video/`;

export const cut = (fileName, startTime, endTime) => {
  fileName = path.basename(fileName)
  const command = `ffmpeg -i ${staticFolder}original/${fileName} -ss ${secondsToHms(startTime)} -t ${secondsToHms(endTime)} -c copy ${staticFolder}cutted/${fileName} -y`;

  if (shell.exec(command, { silent: true }).code !== 0) {
    shell.echo('Command execution error cut');
    shell.exit(1);
  }
  return `${staticFolder}cutted/${fileName}`;
};

export const toGif = (fileName, startTime, endTime) => {
  fileName = path.basename(fileName)
  const ext = path.extname(fileName);
  const endLastName = `${fileName.slice(0, ext.length + 1)}.gif`;

  const command = `ffmpeg -ss ${secondsToHms(startTime)} -i ${staticFolder}original/${fileName} -t ${secondsToHms(endTime)} -s 480x275 -r 18 ${staticFolder}gifs/${endLastName} -y`;
  if (shell.exec(command, { silent: true }).code !== 0) {
    shell.echo('Command execution error gif');
    shell.exit(1);
  }
  return `${staticFolder}gifs/${endLastName}`;
};

// cut('GoPro.mp4', 40, 10)
// toGif('GoPro.mp4', 40, 10)
