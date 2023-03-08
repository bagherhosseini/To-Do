create database todo;

CREATE TABLE users(
userid int PRIMARY KEY AUTO_INCREMENT,
name VARCHAR (100) NOT NULL,
username VARCHAR (100) unique NOT NULL, 
password VARCHAR (1000) NOT NULL
);

insert users values
(0,'bagher', 'bagher', '123');

CREATE TABLE todoList(
	todoid int PRIMARY KEY AUTO_INCREMENT,
	userid int NOT NULL,
	title VARCHAR (1000) NOT NULL,
    FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE
);

insert todolist values
(0, 1, 'adhslkjdlask');