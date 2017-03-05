import path from 'path';
import shell from 'shelljs';
import api from '../utils/shazamAPI';

api.setConfig({
  host: 'eu-west-1.api.acrcloud.com',
  key: '50327265909ae8978a292e4813d11119',
  secret: 'L9RO9jVZKDt18vaKswcWOHdaq87wwcwiBA1F1mGY'
});

export const shazam = async (req, res) => {
  const { fileName, time } = req.body;
  const prevPoint = time - 5;
  const endTime = time + 5;
  const startTime = prevPoint > 0 ? prevPoint : 0;

  const ext = path.extname(fileName);
  const endLastName = `${fileName.slice(0, ext.length + 1)}.mp3`;

  const command = `ffmpeg -ss ${startTime} -i ./static/${fileName} -t ${endTime} ./static/${endLastName} -y`;
  if (shell.exec(command, { silent: true }).code !== 0) {
    shell.echo('Command execution error');
    shell.exit(1);
  }
  const tracks = await api.recogizer('./static/GoPro_cutted.mp3');
  res.send(tracks);
};
