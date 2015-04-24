-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Apr 24, 2015 at 06:11 AM
-- Server version: 5.5.38
-- PHP Version: 5.6.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `smv_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `knownwords`
--

CREATE TABLE `knownwords` (
`ID` int(11) NOT NULL,
  `Email` varchar(125) NOT NULL,
  `KnownWords` mediumtext NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COMMENT='Table for listing of known words';

--
-- Dumping data for table `knownwords`
--

INSERT INTO `knownwords` (`ID`, `Email`, `KnownWords`) VALUES
(1, 'nsepehr@gmail.com', 'Lucid/Mundane/'),
(2, 'Nima', 'Exigent/Halsyon/'),
(3, 'asdfnsepehr@gmail.com', 'Halsyon/'),
(4, '123444nsepehr@gmail.com', 'Halsyon/Exigent/'),
(5, 'nsepehrx@gmail.com', 'Mundane/Halsyon/');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `knownwords`
--
ALTER TABLE `knownwords`
 ADD PRIMARY KEY (`ID`), ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `knownwords`
--
ALTER TABLE `knownwords`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;