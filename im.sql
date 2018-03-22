CREATE DATABASE IF NOT EXISTS `comp333-assn1-im` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `comp333-assn1-im`;

CREATE TABLE `users`(
    `username` VARCHAR(20) NOT NULL,
    `password` VARCHAR(16) NOT NULL,
    `status` VARCHAR(7) NOT NULL,
    PRIMARY KEY(`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `users` (`username`, `password`, `status`) VALUES ('admin','admin', 'offline');
INSERT INTO `users` (`username`, `password`, `status`) VALUES ('Test','Test', 'offline');

CREATE TABLE `messages`(
    `messageID` INT(11) NOT NULL AUTO_INCREMENT,
    `sender` VARCHAR(20) NOT NULL,
    `message` VARCHAR(255) NOT NULL,
    `date` VARCHAR(10) NOT NULL,
    PRIMARY KEY(`messageID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;