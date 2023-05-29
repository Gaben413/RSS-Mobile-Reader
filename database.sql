CREATE TABLE Favourite(
	favID INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    descr VARCHAR(255) NOT NULL,
    link VARCHAR(255) NOT NULL,
    published VARCHAR(255),
    sourceType CHAR(1) DEFAULT('R'),
    CHECK(sourceType = 'R' OR sourceType = 'U' OR sourceType = 'B')
);