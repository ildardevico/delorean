export const list = async (req, res) => {
  const dir = [
    { name: `GoPro HERO3: Almost as Epic as the HERO3+`, src: './video/original/GoPro.mp4', cover: './covers/GoPro.png' },
    { name: `GoPro Music: Tony Royster Jr. - Drummer's Odyssey`, src: './video/original/gopro_drums.mp4', cover: './covers/drums.png' },
    { name: `Кличко и Шулявский мост`, src: './video/original/klichko.mp4', cover: './covers/klichko.png' },
    { name: `Популярный медиа блог`, src: './video/original/pop_mediablog.mp4', cover: './covers/pop_mediablog.png' },
    { name: `Село`, src: './video/original/selo.mp4', cover: './covers/selo.png' },
    { name: `ТСН`, src: './video/original/tsn.mp4', cover: './covers/tsn.png' },
  ];
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.status(200).send({ data: dir });
};
