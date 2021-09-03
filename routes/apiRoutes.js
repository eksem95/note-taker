const router = require("express").Router();
const fs = require("fs");
const { v4: uuid } = require("uuid");

router.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", (error, data) => {
        if (error) {
            throw error;
        }
        else {
            res.send(data);
        }
    })
});
router.post("/api/notes", (req, res) => {
    console.log("hello");
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuid()
    }

    fs.readFile("./db/db.json", (err, data) => {
        const newData = JSON.parse(data);
        newData.push(newNote);
        fs.writeFile("./db/db.json", JSON.stringify(newData), (error) => {
            if (error) {
                res.json(error);
            } else {
                res.json(newNote);
            }
        })
    })

});
router.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id;
    fs.readFile("./db/db.json", (err, data) => {

        const db = JSON.parse(data);
        const filteredDb = db.filter(note => note.id !== id);
        fs.writeFile("./db/db.json", JSON.stringify(filteredDb), (error) => {
            if (error) {
                res.json(error);
            } else {
                res.json(filteredDb);
            }
        })
    })
});

module.exports = router;