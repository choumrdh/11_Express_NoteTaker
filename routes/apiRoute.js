const fs = require("fs");
const path = require("path");

module.exports = (app) => {
    app.get("/api/notes", (req, res) => {
        let noteData = fs.readFileSync(path.join(__dirname + "/../db/db.json"),"utf8");
        return res.json(JSON.parse(noteData));

    });
    app.post("/api/notes", (req, res) => {
        let noteData = fs.readFileSync(path.join(__dirname + "/../db/db.json"),"utf8");
        const noteDataParse = JSON.parse(noteData)
        const newNote = req.body;
        
        const newId = new Date().getTime();
        newNote.id = newId;
        noteDataParse.push(newNote);
        fs.writeFileSync(path.join(__dirname + "/../db/db.json"), JSON.stringify(noteDataParse))
        res.json(newNote)

    });
    app.delete("/api/notes/:id", (req, res) => {
        let noteData = fs.readFileSync(path.join(__dirname + "/../db/db.json"),"utf8");
        const noteDataParse = JSON.parse(noteData)
        const noteId = parseInt(req.params.id);

        let newNote = noteDataParse.filter((note) => {
            console.log(note.id, noteId, note.id === noteId)
            return note.id !== noteId;

        });
        fs.writeFileSync(path.join(__dirname + "/../db/db.json"), JSON.stringify(newNote))

        res.end("This note has been deleted")
    })
}
