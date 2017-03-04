export const test = async (req, res) => {
  try {
    await new Promise(ok => setTimeout(ok, 3000));
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};
