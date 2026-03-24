const Database = require("better-sqlite3");

const db = new Database("data/schoolbus.db");

console.log("DB verbunden");

const checkUser1 = db.prepare(
    "SELECT * FROM students WHERE id = ?"
)

console.log(checkUser1.get(4))

const stmt = db.prepare(
    "DELETE FROM students WHERE id = ?"
)

stmt.run(4)
console.log("Deleted")


const checkUser = db.prepare(
    "SELECT * FROM students WHERE id = ?"
)

console.log(checkUser.get(4))