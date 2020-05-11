const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/notes", (req,res)=>{
    res.sendFile(path.join(__dirname + "/public/notes.html"))
});

app.get("/api/notes", (req,res)=>{
    let noteData = fs.readFileSync(path.join(__dirname + "/db/db.json"),"utf8");
    res.json(JSON.parse(noteData));
 
});
app.post("/api/notes", (req,res)=>{
    let noteData = fs.readFileSync(path.join(__dirname + "/db/db.json"),"utf8");
    const noteDataParse = JSON.parse(noteData)
    const newNote = req.body;
    const newId = new Date().getTime();
    newNote.id = newId;
    noteDataParse.push(newNote);
    fs.writeFileSync(path.join(__dirname + "/db/db.json"),JSON.stringify(noteDataParse))
    res.json(newNote)

});
app.delete("/api/notes/:id", (req,res)=>{
    let noteData = fs.readFileSync(path.join(__dirname + "/db/db.json"),"utf8");
    const noteDataParse = JSON.parse(noteData)
    const noteId = parseInt(req.params.id);

    let newNote = noteDataParse.filter((note)=>{
        console.log(note.id ,noteId, note.id===noteId )
        return note.id !== noteId;

    });
    fs.writeFileSync(path.join(__dirname + "/db/db.json"),JSON.stringify(newNote))
 
    res.end("This is note has been deleted")
})
app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname + "/public/index.html"));
});
app.listen(PORT, ()=>{
    console.log(`App is listening on http://localhost:${PORT}`)
})
