--just for testing and do not waste time
INSERT INTO patients
    (name , blood_group)
VALUES
    ('patient1' , 'A'),
    ('patient2' , 'B'),
    ('patient3' , 'AB'),
    ('patient4' , 'O')
RETURNING ID;

INSERT INTO donors
    (name , blood_group ,contact_number )
VALUES
    ('donor1' , 'A' , 12345678),
    ('donor2' , 'B' , 12345678),
    ('donor3' , 'AB' , 12345678),
    ('donor4' , 'O' , 12345678)
RETURNING ID;

INSERT INTO blood_banks
    (name , city ,contact_number ,doner_id )
VALUES
    ('bloodBank1' , 'city1', 123456, 1 ),
    ('bloodBank2' , 'city2', 123456, 2 ),
    ('bloodBank3' , 'city3', 123456, 3 ),
    ('bloodBank4' , 'city4', 123456, 4)
RETURNING ID;




select * from blood_banks;
