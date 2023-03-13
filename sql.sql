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