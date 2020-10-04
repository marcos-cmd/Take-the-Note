const fs = require('fs');
const path = require('path');

// Constants to hold the db path
const dbDir = path.join(__dirname, 'db');
const dbPath = path.join(dbDir, "db.json");

// Database wrapper class to perform operations on db/db.json
class DataBase {
    constructor() {

        }
        // Method to return data string from db.json
    rawData() {
        return fs.readFileSync(dbPath);
    }

    // Method to return parse JSON from db.json
    jsonData() {
        return JSON.parse(this.rawData());
    }

    /**
     * Method to get the next available note id. 
     * */

    nextID() {
        let newData = this.jsonData().sort((a, b) => { a.id - b.id });
        let availableId = 1;
        for (let avId = 0; avId < newData.length; avId++) {
            if (parseInt(newData[avId].id) === avId + 1) {
                availableId++;
            }
            if (parseInt(newData[avId].id) !== avId) {
                break;
            }
        }
        return availableId;
    }

    // Method to add and store note.
    addNote(note) {
        note.id = this.nextID();
        let noteData = this.jsonData();

        //note that I use unshift and not push. This is to show the latest not on top when rendering.
        noteData.unshift(note);
        this.storeData(noteData);
        return noteData;
    }

    // Method to delete note
    deleteNote(id) {
        let index = this.jsonData().findIndex(element => parseInt(element.id) === parseInt(id));
        if (index !== -1) {
            let noteData = this.jsonData();
            noteData.splice(index, 1);
            this.storeData(noteData);
        }
    }

    // Method stringifies JSON and saves
    storeData(jsonData) {
        fs.writeFileSync(dbPath, JSON.stringify(jsonData));
    }
}

// Create instance of DataBase
let dataBase = new DataBase();

// export DataBase class's instance to other modules
module.exports = { dataBase }