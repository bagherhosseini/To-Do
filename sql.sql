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

DELIMITER //
CREATE PROCEDURE GetUnrelatedUsers(IN user_username VARCHAR(100))
BEGIN
  SELECT u.*
  FROM users u
  WHERE u.username <> user_username
    AND NOT EXISTS (
      SELECT 1
      FROM requests r
      WHERE (r.requestsender = user_username AND r.requestreceiver = u.username)
         OR (r.requestsender = u.username AND r.requestreceiver = user_username)
    );
END //
DELIMITER ;

CALL GetUnrelatedUsers('bagher1');

insert requests values
(0, 'bagher', 'bagher1', 1);

DELIMITER //
CREATE PROCEDURE GetRelatedUsers(IN user_username VARCHAR(100))
BEGIN
  SELECT u.*
  FROM users u
  JOIN requests r
    ON (u.username = r.requestsender OR u.username = r.requestreceiver)
  WHERE (r.requestsender = user_username OR r.requestreceiver = user_username)
    AND u.username <> user_username
    AND r.status = 2;
END //
DELIMITER ;

CALL GetRelatedUsers('bagher1');


DELIMITER //
CREATE PROCEDURE GetFriendTodoList(IN user_username VARCHAR(100), IN friend_username VARCHAR(100))
BEGIN
  -- Check if the friend exists in the users table
  IF NOT EXISTS (SELECT 1 FROM users WHERE username = friend_username) THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Error: This user does not exist';
  END IF;

  -- Check if there is a request with status 2 between the two users
  IF NOT EXISTS (
    SELECT 1
    FROM requests r
    WHERE (
        (r.requestsender = user_username AND r.requestreceiver = friend_username)
        OR (r.requestsender = friend_username AND r.requestreceiver = user_username)
      )
      AND r.status = 2
  ) THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Error: You are not friends with this user';
  END IF;

  SELECT t.*
  FROM todoList t
  WHERE t.username = friend_username;
END //
DELIMITER ;

CALL GetFriendTodoList('bagher1', 'bagher');


DELETE FROM requests;
SET SQL_SAFE_UPDATES = 0;