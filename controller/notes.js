const fs = require('fs');
const { networkInterfaces } = require('os');

module.exports = {
    getDB: (req, res) => {
        const db = fs.readFileSync('db/db.json');
        res.send(JSON.parse(db));
    },
    addnote: (req, res) => {
        const newNote = req.body;
        const db = fs.readFileSync('db/db.json');
        const notes = JSON.parse(db);
        req.body.id = notes.length;
        notes.push(newNote);
        const updatedNotes = fs.writeFileSync('db/db.json', JSON.stringify(notes));
        return res.send(updatedNotes);
    },
    deleteNote: (req, res) => {
        const db = fs.readFileSync('db/db.json');
        let notes = JSON.parse(db);
        const id = req.params.id;
        for (let i = 0; i < notes.length; i++) {
            if (parseInt(id) === i) {
                notes.splice(i, 1);
                let splicedNotes = notes;
                for (let i = 0; i < splicedNotes.length; i++) {
                    splicedNotes[i].id = i;
                }
                notes = splicedNotes;
                const updatedNotes = fs.writeFileSync('db/db.json', JSON.stringify(notes));
                return res.send(updatedNotes);
            }
        }
        return res.json(false);
    },
};