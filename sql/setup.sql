DROP TABLE IF EXISTS coffees;
-- DROP TABLE IF EXISTS sodas;

CREATE TABLE coffees (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    taste INTEGER NOT NULL,
    price INTEGER NOT NULL
);

-- CREATE TABLE sodas (
--     id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--     name TEXT NOT NULL,
--     taste INTEGER NOT NULL,
--     price INTEGER NOT NULL
-- );