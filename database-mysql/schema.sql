WDROP DATABASE IF EXISTS moodify;
CREATE DATABASE moodify;

use moodify;

CREATE TABLE users (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username varchar(200) NOT NULL,
  name varchar(200) NOT NULL,
  password varchar(200) NOT NULL,
  email varchar(200) NOT NULL,
  phone varchar(50) NOT NULL,
  verified boolean NOT NULL
);