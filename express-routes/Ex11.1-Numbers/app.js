import express from "express";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 3000;

const arr = [1, 2, 3, 4, 5];

app.get("/numbers", (req, res) => {
  try {
    res.status(200).json({ arr });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.post("/numbers", (req, res) => {
  try {
    const num = Number(req.body.number);
    if (arr.includes(num)) {
      throw new Error("This number already exists");
    }
    arr.push(num);
    res.status(201).json({ arr });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.delete("/numbers/:number", (req, res) => {
  try {
    const num = Number(req.params.number);
    const idxToDelete = arr.indexOf(num);
    if (idxToDelete === -1) {
      throw new Error("This number does not exist");
    }
    arr.splice(idxToDelete, 1);
    res.status(204).json({ arr });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.put("/numbers/:oldnumber/:newnumber", (req, res) => {
  try {
    const newNum = Number(req.params.newnumber);
    const oldNum = Number(req.params.oldnumber);
    const idxOfOld = arr.indexOf(oldNum);
    if (idxOfOld === -1) {
      throw new Error("This number does not exist");
    }
    arr[idxOfOld] = newNum;
    res.status(201).json({ arr });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
