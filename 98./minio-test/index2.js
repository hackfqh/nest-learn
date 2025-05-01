var Minio = require("minio");

var minioClient = new Minio.Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: "m3964ktdaj3CtGgsAIqL",
  secretKey: "rgfWyML8WLnEJF3EnWAescUiCAcHqwkcZxE02cK8",
  // rgfWyML8WLnEJF3EnWAescUiCAcHqwkcZxE02cK8
});

function put() {
  minioClient.fPutObject(
    "aaa",
    "hello.png",
    "./touxiang.png",
    function (err, etag) {
      if (err) {
        return console.log(err);
      }
      console.log("File uploaded successfully.");
    }
  );
}

put();
