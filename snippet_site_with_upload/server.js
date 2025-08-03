const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const upload = multer({ dest: "snippets/" });

app.use(express.static("."));
app.use("/snippets", express.static("snippets"));

app.post("/upload", upload.single("snippet"), (req, res) => {
  const originalName = req.file.originalname;
  const destPath = path.join("snippets", originalName);

  fs.rename(req.file.path, destPath, (err) => {
    if (err) return res.status(500).send("Rename error");

    fs.readdir("snippets", (err, files) => {
      if (err) return res.status(500).send("Read dir error");
      fs.writeFile("snippets.json", JSON.stringify(files), (err) => {
        if (err) return res.status(500).send("Write JSON error");
        res.send("Success");
      });
    });
  });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
