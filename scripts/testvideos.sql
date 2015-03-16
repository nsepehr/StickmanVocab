-- phpMyAdmin SQL Dump
-- version 4.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Mar 16, 2015 at 03:24 AM
-- Server version: 5.5.38
-- PHP Version: 5.6.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `smv_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `testvideos`
--

-- CREATE TABLE `testvideos` (
--      `ID` int(11) NOT NULL,
--      `URL` varchar(256) NOT NULL,
--      `Name` varchar(128) NOT NULL
-- ) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `testvideos`
--

INSERT INTO `testvideos` (`ID`, `URL`, `Name`) VALUES
(1, 'videos/01-exigent.mp4', 'Exigent'),
(2, 'videos/02-Halsyon.mp4', 'Halsyon'),
(3, 'videos/03-Lucid.mp4', 'Lucid'),
(4, 'videos/04-Mundane.mp4 ', 'Mundane'),
(5, 'videos/05-Morose.mp4', 'Morose'),
(6, 'videos/06-Quaff.mp4', 'Quaff');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `testvideos`
--
ALTER TABLE `testvideos`
 ADD PRIMARY KEY (`URL`), ADD UNIQUE KEY `ID` (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `testvideos`
--
ALTER TABLE `testvideos`
 MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
