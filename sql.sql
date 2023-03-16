create database todo;

CREATE TABLE users(
userid int PRIMARY KEY AUTO_INCREMENT,
name VARCHAR (100) NOT NULL,
username VARCHAR (100) unique NOT NULL, 
password VARCHAR (1000) NOT NULL,
token VARCHAR (1000) NULL
);

insert users values
(0,'bagher', 'bagher', '123');

CREATE TABLE todoList(
	todoid int PRIMARY KEY AUTO_INCREMENT,
	username VARCHAR (100) NOT NULL,
	title VARCHAR (1000) NOT NULL,
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
);

insert todolist values
(0, 'bagher', 'adhslkjdlask');

CREATE TABLE requests(
	requestid int PRIMARY KEY AUTO_INCREMENT,
	requestsender VARCHAR (100) NOT NULL,
	requestreceiver VARCHAR (100) NOT NULL,
    status int NOT NULL DEFAULT 0,
    FOREIGN KEY (requestsender) REFERENCES users(username) ON DELETE CASCADE,
    FOREIGN KEY (requestreceiver) REFERENCES users(username) ON DELETE CASCADE,
    CONSTRAINT Uniquereq UNIQUE(requestsender, requestreceiver),
	CONSTRAINT notsameuser CHECK (requestsender <> requestreceiver)
);

DELIMITER //
CREATE TRIGGER before_insert_requests
    BEFORE INSERT ON requests
    FOR EACH ROW
BEGIN
    DECLARE request_exists INT;

    SELECT COUNT(*) INTO request_exists
    FROM requests
    WHERE (requestsender = NEW.requestreceiver AND requestreceiver = NEW.requestsender);

    IF request_exists > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'A request between these users already exists in either direction';
    END IF;
END;
//
DELIMITER ;

insert requests values
(0, 'bagher', 'bagher1', 1);


DELETE FROM requests;
SET SQL_SAFE_UPDATES = 0;