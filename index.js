import express from 'express'
import cors from 'cors'
import multer from 'multer';
import mintCar from './mintCar.js'
import { spawn } from 'child_process'

const app = express();
app.use(cors());

app.listen(8080, () => console.log('Server started. Listening on port 8080!'));

let fileName;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "img/");
    },

    filename: function (req, file, cb) {
      fileName = file.originalname;
      cb(null, `${fileName}`);
    },
  });

const multerFile = multer({ storage: storage });

app.post("/",  async (req, res) => {
    res.status(200).send("Hello");
});

app.post("/api/v1/mint", multerFile.array("my-file"),  async (req, res) => {
    let hash, tokenID, metadatas, img;

    try {
        [hash, tokenID, metadatas, img] = await mintCar(fileName, req.query.maker, req.query.model, req.query.year, req.query.color, req.query.token);
    } catch (error) {
        console.error(error);
    }

    res.status(200).json( { Hash: hash, TokenID: tokenID, Metadatas: metadatas, Image: img } );
});

app.post("/api/v1/scrap", async (req, res) => {
    let url;

    try {
        url = await executePython("./scrapping.py", [req.query.url]);
    } catch (error) {
        console.error(error);
    }

    res.status(200).json( { Hash: hash, Metadatas: metadatas, Image: img } );
});

const executePython = async (script, args) => {
    const mapArguments = args.map((arg) => arg.toString());

    const py = spawn("python3", [script, ...mapArguments]);

    const result = await new Promise((resolve, reject) => {
        let output;

        py.stdout.on("data", (data) => {
        output = JSON.parse(data);
        });

        py.stderr.on("data", (data) => {
        console.error(`[python] Error occured: ${data}`);
        reject(`Error occured in ${script}`);
        });

        py.on("exit", (code) => {
        console.log(`Child process exited with code ${code}`);
        resolve(output);
        });
    });

    return result;
};
