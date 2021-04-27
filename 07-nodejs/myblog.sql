SELECT VERSION();

CREATE SCHEMA `myblog`;

CREATE TABLE `myblog`.`users` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(20) NOT NULL,
	`password` VARCHAR(32) NOT NULL,
	`realname` VARCHAR(10) NOT NULL,
  `state` INT NOT NULL DEFAULT 1,
	PRIMARY KEY (`id`));
	
CREATE TABLE `myblog`.`blogs` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`title` VARCHAR(50) NOT NULL,
	`content` LONGTEXT NOT NULL,
	`createtime` BIGINT(20) NOT NULL DEFAULT 0,
	`author` VARCHAR(20) NOT NULL,
	PRIMARY KEY (`id`));
	
use myblog

SHOW TABLES;

INSERT INTO users(username, `password`, realname) VALUES('ww', '123', 'wuwu');
INSERT INTO users(username, `password`, realname) VALUES('cc', '123', 'chenchen');
INSERT INTO users(username, `password`, realname) VALUES('dd', '123', 'didi');
INSERT INTO users(username, `password`, realname) VALUES('test', '123', 'testName');


SELECT * FROM users;
SELECT id, username FROM users;
SELECT * FROM users WHERE state=1;
SELECT * FROM users WHERE username='dd';
SELECT * FROM users WHERE username='dd' and `password`='123';
SELECT * FROM users WHERE username='dd' or `password`='123';
SELECT * FROM users WHERE username LIKE '%d%';
SELECT * FROM users ORDER BY id;
SELECT * FROM users ORDER BY id DESC;


UPDATE users set realname='didi2' WHERE username='dd';
UPDATE users set state=0 WHERE username='test';

DELETE FROM users WHERE username='dd3';
DELETE FROM users WHERE id=6;


INSERT INTO blogs(title, content, createtime, author) VALUES ('标题1', '内容1', '1618037480417', 'dd');

SELECT * FROM blogs ORDER BY createtime DESC;

SELECT * FROM blogs WHERE author='dd' ORDER BY createtime DESC;
SELECT * FROM blogs WHERE title LIKE '%����%' ORDER BY createtime DESC;

