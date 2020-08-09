import * as express from "express";

const app: express.Application = express();

app.get("/", (_, res) => {
  res.send("Hello World 3");
});

app.listen(3001, () => {
  console.log("Server listening on http://localhost:3001");
});
