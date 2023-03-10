const express = require("express");
const path = require("path");
var favicon = require("serve-favicon");
const multer = require("multer");
const { mergePdfs } = require("./merge");
const app = express();

app.use(favicon(path.join(__dirname, "images", "favicon.ico")));
const upload = multer({ dest: "uploads/" });
app.use("/static", express.static("public"));
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "templates/about.html"));
});
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "templates/contact.html"));
});
app.post("/merge", upload.array("pdfs", 2), async (req, res, next) => {
  console.log(req.files);
  let d = await mergePdfs(
    path.join(__dirname, req.files[0].path),
    path.join(__dirname, req.files[1].path)
  );
  res.redirect(`http://localhost:3000/static/${d}.pdf`);
  // res.send({ data: req.files });
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
