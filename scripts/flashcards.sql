-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Jun 19, 2015 at 08:28 AM
-- Server version: 5.5.38
-- PHP Version: 5.6.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `smv_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `flashcards`
--

CREATE TABLE `flashcards` (
`ID` int(11) NOT NULL,
  `Name` varchar(125) NOT NULL,
  `Definition` longtext NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `flashcards`
--

INSERT INTO `flashcards` (`ID`, `Name`, `Definition`) VALUES
(1, 'Anomalous', 'Deviating from what is standard, normal, or expected.'),
(2, 'Aberrant', 'Departing from an accepted standard.'),
(3, 'Blandishment', 'A flattering or pleasing statement or action used to persuade someone gently to do something.'),
(4, 'Aver', 'State or assert to be the case.'),
(5, 'Cadge', 'Ask for or obtain (something to which one is not strictly entitled).'),
(6, 'Bombast', 'High-sounding language with little meaning, used to impress people.'),
(7, 'Castigate', 'Reprimand (someone) severely.'),
(8, 'Dearth', 'A scarcity or lack of something.'),
(9, 'Emollient', 'Having the quality of softening or soothing the skin.'),
(10, 'Encomium', 'A speech or piece of writing that praises someone or something highly.'),
(11, 'Esoteric', 'Intended for or likely to be understood by only a small number of people with a specialized knowledge or interest.'),
(12, 'Fervid', 'Intensely enthusiastic or passionate, especially to an excessive degree.'),
(13, 'Inchoate', 'Just begun and so not fully formed or developed; rudimentary.'),
(14, 'Insipid', 'Lacking flavor.'),
(15, 'Laconic', '(Of a person, speech, or style of writing) using very few words.'),
(16, 'Leviathan', 'A very large aquatic creature, especially a whale.'),
(17, 'Noisome', 'Having an extremely offensive smell.'),
(18, 'Ossified', 'Cease developing; be stagnant or rigid.'),
(19, 'Peccadillo', 'A small, relatively unimportant offense or sin.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `flashcards`
--
ALTER TABLE `flashcards`
 ADD PRIMARY KEY (`ID`), ADD UNIQUE KEY `Name` (`Name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `flashcards`
--
ALTER TABLE `flashcards`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=20;