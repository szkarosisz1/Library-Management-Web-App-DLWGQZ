-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1:3306
-- Létrehozás ideje: 2024. Máj 01. 13:59
-- Kiszolgáló verziója: 8.2.0
-- PHP verzió: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `library`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `book`
--

DROP TABLE IF EXISTS `book`;
CREATE TABLE IF NOT EXISTS `book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `acquisitionDate` datetime NOT NULL,
  `serialNumber` varchar(17) NOT NULL,
  `status` enum('Szabad','Kikölcsönzött','Selejtezett') NOT NULL DEFAULT 'Szabad',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_37b926a7b6f2fb5e647dfc26d7` (`serialNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- A tábla adatainak kiíratása `book`
--

INSERT INTO `book` (`id`, `title`, `author`, `acquisitionDate`, `serialNumber`, `status`) VALUES
(1, 'Egri Csillagok', 'Gárdonyi Géza', '2023-02-20 11:00:22', '978-963-07-9296-4', 'Szabad'),
(2, 'Tüskevár', 'Fekete István', '2023-01-15 12:45:20', '978-963-07-0664-3', 'Szabad'),
(3, 'A Pál utcai fiúk', 'Molnár Ferenc', '2023-04-03 13:30:00', '978-963-07-9739-1', 'Szabad'),
(4, 'Tom Sawyer kalandjai', 'Mark Twain', '2023-05-05 15:43:00', '978-963-07-6287-3', 'Szabad'),
(5, 'Az arany ember', 'Jókai Mór', '2023-06-27 16:45:17', '978-963-07-4372-5', 'Szabad'),
(6, 'Robinson Crusoe', 'Daniel Defoe', '2024-02-05 12:42:53', '978-963-07-4308-3', 'Szabad'),
(7, 'Az öregség balzsama', 'Mikszáth Kálmán', '2023-11-24 12:01:23', '978-963-07-3763-1', 'Szabad'),
(8, 'Édes Anna', 'Kosztolányi Dezső', '2023-04-25 14:25:10', '978-963-07-5099-7', 'Szabad'),
(9, 'A kőszívű ember fiai', 'Jókai Mór', '2024-01-25 10:32:04', '978-963-07-7037-7', 'Szabad'),
(10, 'Calderón de la Barca', 'Az élet álom', '2024-03-05 09:40:17', '978-963-07-7231-5', 'Szabad');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `borrow`
--

DROP TABLE IF EXISTS `borrow`;
CREATE TABLE IF NOT EXISTS `borrow` (
  `id` int NOT NULL AUTO_INCREMENT,
  `borrowDate` datetime NOT NULL,
  `returnDate` datetime NOT NULL,
  `memberId` int DEFAULT NULL,
  `bookId` int DEFAULT NULL,
  `cassetteId` int DEFAULT NULL,
  `dvdId` int DEFAULT NULL,
  `delay` int NOT NULL,
  `maxBorrowsCount` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c1c20055797527a629d7ca80357` (`memberId`),
  KEY `FK_f5c8ea379eee06ce1482f20d101` (`bookId`),
  KEY `FK_25e78783f765a8cc626eadcdb9e` (`cassetteId`),
  KEY `FK_742ffeb5016ea66c669214d3c48` (`dvdId`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- A tábla adatainak kiíratása `borrow`
--

INSERT INTO `borrow` (`id`, `borrowDate`, `returnDate`, `memberId`, `bookId`, `cassetteId`, `dvdId`, `delay`, `maxBorrowsCount`) VALUES
(1, '2023-05-15 13:20:04', '2023-06-10 08:37:07', 6, NULL, 5, NULL, 0, 0),
(2, '2023-07-02 11:56:02', '2023-08-07 13:24:00', 7, NULL, NULL, 8, 0, 0),
(3, '2023-05-10 10:35:35', '2023-06-12 10:02:45', 1, 4, NULL, NULL, 0, 0),
(4, '2023-02-03 11:45:02', '2023-03-10 08:45:00', 2, 2, NULL, NULL, 0, 0),
(5, '2024-02-12 09:03:25', '2024-03-26 10:03:45', 4, 6, NULL, NULL, 0, 0),
(6, '2024-02-01 11:57:02', '2024-02-22 09:20:12', 8, 9, NULL, NULL, 0, 0),
(7, '2023-05-27 11:45:02', '2023-08-01 10:31:07', 5, NULL, 7, NULL, 0, 0),
(8, '2023-04-11 09:54:02', '2023-05-20 12:32:34', 2, NULL, 4, NULL, 0, 0),
(9, '2023-05-17 10:04:12', '2023-06-13 10:00:02', 6, NULL, 6, NULL, 0, 0),
(10, '2023-12-02 15:02:17', '2024-01-04 09:08:23', 5, NULL, NULL, 4, 0, 0),
(11, '2024-02-27 09:56:32', '2024-03-07 14:02:39', 3, NULL, NULL, 10, 0, 0),
(12, '2024-01-11 11:11:11', '2024-02-10 11:14:43', 6, NULL, NULL, 6, 0, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cassette`
--

DROP TABLE IF EXISTS `cassette`;
CREATE TABLE IF NOT EXISTS `cassette` (
  `id` int NOT NULL AUTO_INCREMENT,
  `author` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `acquisitionDate` datetime NOT NULL,
  `serialNumber` varchar(17) NOT NULL,
  `status` enum('Szabad','Kikölcsönzött','Selejtezett') NOT NULL DEFAULT 'Szabad',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_38f3724b9a7e2c21dbb7ed3f74` (`serialNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- A tábla adatainak kiíratása `cassette`
--

INSERT INTO `cassette` (`id`, `author`, `title`, `acquisitionDate`, `serialNumber`, `status`) VALUES
(1, 'Disney', 'Hamupipőke', '2024-02-18 10:46:46', '9789633400847', 'Szabad'),
(2, 'J.K. Rowling', 'Harry Potter és a titkok kamrája', '2023-07-27 09:34:04', '9789639858001', 'Szabad'),
(3, 'George Orwell', '1984', '2023-06-16 14:20:12', '9789630781986', 'Szabad'),
(4, 'Haruki Murakami', 'Kafka a tengerparton', '2023-04-05 15:31:52', '9789630957393', 'Szabad'),
(5, 'Margaret Atwood', 'A szolgálólány meséje', '2023-04-26 12:43:10', '9789632076660', 'Szabad'),
(6, 'Disney', 'A kis hableány', '2023-05-10 11:35:23', '9789639856024', 'Szabad'),
(7, 'Gabriel García Márquez', 'Száz év magány', '2023-05-22 12:30:45', '9789633532106', 'Szabad'),
(8, 'Dan Brown', 'A Da Vinci-kód', '2023-12-14 12:04:13', '9789637242227', 'Szabad'),
(9, 'J.R.R. Tolkien', 'A Gyűrűk Ura: A Gyűrű Szövetsége', '2024-03-03 08:59:03', '9789630749702', 'Szabad'),
(10, 'Alexandre Dumas', 'Monte Cristó grófja', '2024-02-15 13:30:34', '9789632034561', 'Szabad');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `dvd`
--

DROP TABLE IF EXISTS `dvd`;
CREATE TABLE IF NOT EXISTS `dvd` (
  `id` int NOT NULL AUTO_INCREMENT,
  `author` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `acquisitionDate` datetime NOT NULL,
  `serialNumber` varchar(17) NOT NULL,
  `status` enum('Szabad','Kikölcsönzött','Selejtezett') NOT NULL DEFAULT 'Szabad',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_bb9d6bb4b98437a4329bafe7d0` (`serialNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- A tábla adatainak kiíratása `dvd`
--

INSERT INTO `dvd` (`id`, `author`, `title`, `acquisitionDate`, `serialNumber`, `status`) VALUES
(1, 'Clint Eastwood', 'A Mocsárvilág szelleme', '2023-12-08 13:23:30', '9789633402306', 'Szabad'),
(2, 'David Cronenberg', 'A légy', '2023-03-03 11:12:34', '9789639874401', 'Szabad'),
(3, 'Christopher Nolan', 'Inception', '2023-10-27 10:48:00', '9789631010170', 'Szabad'),
(4, 'Martin Scorsese', ' A Gyilkosok Városa', '2023-11-28 14:54:13', '9789630781986', 'Szabad'),
(5, 'Stanley Kubrick', '2001: Űrodüsszeia', '2023-10-24 11:45:31', '9789639953448', 'Szabad'),
(6, 'Steven Spielberg', 'E.T. - A földönkívüli', '2024-01-04 11:22:23', '9789633242497', 'Szabad'),
(7, 'Francis Ford Coppola', 'Keresztapa', '2023-11-11 12:11:11', '9789633546103', 'Szabad'),
(8, 'Quentin Tarantino', 'Kill Bill: Vol. 1', '2023-06-25 13:02:05', '9789639830692', 'Szabad'),
(9, 'Peter Jackson', 'A Gyűrűk Ura: A Gyűrű Szövetsége', '2023-07-02 10:02:43', '9789630749702', 'Szabad'),
(10, 'Francis Ford Coppola', 'Keresztapa', '2024-02-21 11:11:22', '9789633532106', 'Szabad');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `member`
--

DROP TABLE IF EXISTS `member`;
CREATE TABLE IF NOT EXISTS `member` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phoneNumber` varchar(11) NOT NULL,
  `idCardNumber` varchar(8) NOT NULL,
  `address` varchar(255) NOT NULL,
  `status` enum('Aktív','Passzív') NOT NULL DEFAULT 'Aktív',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_cbfbcbbbf8a4befaae1259e4a9` (`phoneNumber`),
  UNIQUE KEY `IDX_bbfb8a3f99fd1f4826943b7dca` (`idCardNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- A tábla adatainak kiíratása `member`
--

INSERT INTO `member` (`id`, `name`, `phoneNumber`, `idCardNumber`, `address`, `status`) VALUES
(1, 'Kovács Szilárd', '06708120154', '055105RE', '8200 Veszprém, Fő tér 4.', 'Aktív'),
(2, 'Kiss Péter', '06301230713', '098765AS', '1013 Budapest, Attila út 5.', 'Aktív'),
(3, 'Szabó Tamás', '06201234567', '789012CD', '1031 Budapest, Záhony utca 12.', 'Aktív'),
(4, 'Csáki Anna', '06208765434', '654321YX', '4400 Nyíregyháza, Kossuth tér 1.', 'Aktív'),
(5, 'Nagy Gábor', '06701112230', '987654OP', '8000 Székesfehérvár, Szent István tér 7.', 'Aktív'),
(6, 'Horváth Eszter', '06709038666', '789012FG', '6720 Szeged, Dugonics tér 10.', 'Aktív'),
(7, 'Magyar Nóra', '06706650440', '202020OP', '6500 Baja, Szentháromság tér 7.', 'Aktív'),
(8, 'Szabó Flóra', '06707305038', '403733JH', '5000 Szolnok, Ady Endre út 16.', 'Aktív'),
(9, 'Nagy Ferenc István', '06201356335', '404040ST', '4026 Debrecen, Simonffy utca 4.', 'Aktív'),
(10, 'Balogh Simon Gábor', '06300346245', '056062WL', '3200 Gyöngyös, Kossuth utca 6.', 'Aktív');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`id`, `firstName`, `lastName`, `email`, `password`) VALUES
(1, 'Nyíri', 'Levente', 'nyiri.levente@example.com', '$2b$12$C/EFD.Nu5w4zQzjQWjnaYOi/FWFu6Yd27RXYaJWLHdJ61YHgp8/Wi'),
(2, 'Szkárosi', 'Szilárd', 'szkarosi.szilard@example.com', '$2b$12$OM2qrjyKQzqmJ9KGjfNBR.8wQ4hcBUaIMbolw7Mzo9MLcusCbx6Vy'),
(3, 'Körte', 'Bercel', 'korte.bercel@example.com', '$2b$12$5BRg4I1QwGdr7lbaI2/aI.Z08tUFmSNFbz9hOdGkadmv1amcsUmZ2');

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `borrow`
--
ALTER TABLE `borrow`
  ADD CONSTRAINT `FK_25e78783f765a8cc626eadcdb9e` FOREIGN KEY (`cassetteId`) REFERENCES `cassette` (`id`),
  ADD CONSTRAINT `FK_742ffeb5016ea66c669214d3c48` FOREIGN KEY (`dvdId`) REFERENCES `dvd` (`id`),
  ADD CONSTRAINT `FK_c1c20055797527a629d7ca80357` FOREIGN KEY (`memberId`) REFERENCES `member` (`id`),
  ADD CONSTRAINT `FK_f5c8ea379eee06ce1482f20d101` FOREIGN KEY (`bookId`) REFERENCES `book` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
