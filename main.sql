CREATE TABLE navbarItems(
	id SERIAL PRIMARY KEY,
	name VARCHAR(20) NOT NULL UNIQUE,
	href VARCHAR(20) NOT NULL UNIQUE,
	created_at DATE DEFAULT(NOW())
);

INSERT INTO navbaritems(name, href)
VALUES
	('home', '#home'),
	('About', '#about'),
	('projects', '#projects'),
	('education', '#education'),
	('work history', '#work-history'),

INSERT INTO navbaritems(name, href)
VALUES ('Deneme', '#deneme');

DELETE FROM navbaritems
WHERE name = 'Furkan İBİŞ';

SELECT *
FROM navbaritems;

DROP TABLE navbaritems;

CREATE TABLE title(
	id SERIAL PRIMARY KEY,
	header VARCHAR(30) NOT NULL UNIQUE,
	created_at DATE DEFAULT(NOW())
);

INSERT INTO title(header)
VALUES ('FURKAN İBİŞ');

SELECT *
FROM title;

UPDATE title
SET HEADER = 'Furkan İBİŞ'
WHERE id = 1;