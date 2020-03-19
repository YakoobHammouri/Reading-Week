BEGIN;

    DROP TABLE IF EXISTS users
    CASCADE;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    gid uuid NOT NULL ,
    name VARCHAR(200) NOT NULL ,
    email VARCHAR(200),
    phone NUMERIC NOT NULL ,
    role VARCHAR(50) NOT NULL,
    password TEXT NOT NULL,
    AddTime TIMESTAMP NOT NULL DEFAULT now()
);


COMMIT;