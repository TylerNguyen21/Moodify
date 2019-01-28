DROP DATABASE IF EXISTS moodify;
CREATE DATABASE moodify;

use moodify;

CREATE TABLE users (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username varchar(200) NOT NULL,
  name varchar(200) NOT NULL,
  password varchar(200) NOT NULL,
  email varchar(200) NOT NULL
);

CREATE TABLE songs (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  song_name varchar(200) NOT NULL,
  artist varchar(50) NOT NULL,
  genre varchar(50) NOT NULL
);

CREATE TABLE  happy (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  song_id int NOT NULL,
  FOREIGN KEY (song_id)
    REFERENCES songs(id) 
);

CREATE TABLE  sad (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  song_id int NOT NULL,
  FOREIGN KEY (song_id)
    REFERENCES songs(id)
);

CREATE TABLE  excited (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  song_id int NOT NULL,
  FOREIGN KEY (song_id)
    REFERENCES songs(id)
);

CREATE TABLE  love (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  song_id int NOT NULL,
  FOREIGN KEY (song_id)
    REFERENCES songs(id)
);