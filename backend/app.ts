import * as bcrypt from "bcrypt";

const Database = require("better-sqlite3");

const db = new Database("data/schoolbus.db");

console.log("DB verbunden");



// User 
interface User {
    clearname: string;
    username: string;
    password: string;
    address: string;
    bus_id: number;
    stop_index: number;
}


async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
}

async function generateTestUser() {
  const currentUser: User = {
    clearname: "Masashi Nakayama",
    username: "Masa_1234",
    password: "ILoveEatingDogs",
    address: "76 Chaleur Str. Charlo, NB, E8E 2E7",
    bus_id: 408,
    stop_index: 12
  };

  currentUser.password = await hashPassword(currentUser.password);

  return currentUser;
}

async function registerUser() {
    const user = await generateTestUser();  //Just because I need a test User, later will be switched out.
    const signupStatement = db.prepare(
        "INSERT INTO students (name, username, password_hash, address, bus_id, stop_index) VALUES (?, ?, ?, ?, ?, ?)"
    );

    signupStatement.run(
        user.clearname,
        user.username,
        user.password,
        user.address,
        user.bus_id,
        user.stop_index
    );

    console.log("Inserted User")
}


async function StudentLogin(userInput: User) {
    const getUsername = db.prepare(
        "SELECT * FROM students WHERE username = ?"
    )
    const getPasswordByUsername = db.prepare(
        "SELECT password_hash FROM students WHERE username = ?"
    )
    const user = getUsername.get(userInput.username)
    if (user){
        const storedPasswordHash = getPasswordByUsername.get(userInput.username)?.password_hash
        if (storedPasswordHash && await bcrypt.compare(userInput.password, storedPasswordHash)) {
            //loginUser()
            console.log("secessful login")
        } else {
            throw new Error("User does not exist or password is incorrect.");
        }
    } else {
        throw new Error("User does not exist or password is incorrect.");
    }
}


//registerUser()
