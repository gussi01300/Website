CREATE TABLE IF NOT EXISTS buses (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    password_hash TEST NOT NULL,
    address TEXT,
    bus_id INTEGER,
    stop_index INTEGER
);

CREATE TABLE IF NOT EXISTS drivers (
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    bus_id INTEGER
);

CREATE TABLE IF NOT EXISTS signouts (
    id INTEGER PRIMARY KEY,
    student_id INTEGER,
    date TEXT,
    UNIQUE(student_id, date)
);

CREATE TABLE IF NOT EXISTS pickups (
    id INTEGER PRIMARY KEY,
    student_id INTEGER,
    date TEXT,
    picked_up_at TEXT
);

CREATE TABLE IF NOT EXISTS bus_progress (
    bus_id INTEGER PRIMARY KEY,
    current_stop_index INTEGER,
    last_update TEXT
);