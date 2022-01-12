-- Feedback Database Setup
CREATE DATABASE feedback;

USE feedback;

CREATE TABLE Ratings (
	id MEDIUMINT NOT NULL AUTO_INCREMENT NULL PRIMARY KEY,
    rating TINYINT,
    raterId VARCHAR(45),
    raterType VARCHAR(20),
    receiverId VARCHAR(45),
    receiverType VARCHAR(20),
    datetime DATETIME,
);

CREATE TABLE Comments (
	id MEDIUMINT NOT NULL AUTO_INCREMENT NULL PRIMARY KEY,
    message VARCHAR(100),
    commentorId VARCHAR(45),
    commentorType VARCHAR(20),
    receiverId VARCHAR(45),
    receiverType VARCHAR(20),
    datetime DATETIME,
);
