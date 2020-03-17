BEGIN;


    DROP TABLE IF EXISTS patients,
                     donors,
                     blood_banks
    CASCADE;


CREATE TABLE patients
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    blood_group VARCHAR(10)
);



CREATE TABLE donors
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    blood_group VARCHAR(10) NOT NULL,
    contact_number NUMERIC NOT NULL
);

CREATE TABLE blood_banks
(

    id SERIAL PRIMARY KEY ,
    name VARCHAR(200) NOT NULL,
    city VARCHAR(50) NOT NULL,
    contact_number NUMERIC NOT NULL,
    doner_id INT ,
    FOREIGN KEY (doner_id)  REFERENCES donors(id)

);

COMMIT;

