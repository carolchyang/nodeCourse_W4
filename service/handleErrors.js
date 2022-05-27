const handleErrors = (res, err) => {
  let message = "";
  console.log(err);
  if (err) {
    message = err.message || err;
  } else {
    message = "程式錯誤~請聯絡開發人員";
  }
  res.status(400).send({
    status: "false",
    message,
  });
};

module.exports = handleErrors;
