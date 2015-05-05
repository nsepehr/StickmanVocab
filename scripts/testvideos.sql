-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: May 05, 2015 at 07:08 AM
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

CREATE TABLE `testvideos` (
`ID` int(11) NOT NULL,
  `URL` varchar(256) NOT NULL,
  `Name` varchar(128) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `testvideos`
--

INSERT INTO `testvideos` (`ID`, `URL`, `Name`) VALUES
(1, 'https://s3-us-west-1.amazonaws.com/smvtestvideotranscoded/Burgeon.mp4', 'Burgeon'),
(2, 'https://s3-us-west-1.amazonaws.com/smvtestvideotranscoded/Assuage.mp4', 'Assuage'),
(3, 'https://s3-us-west-1.amazonaws.com/smvtestvideotranscoded/Connoisseur.mp4', 'Connoisseur'),
(4, 'https://s3-us-west-1.amazonaws.com/smvtestvideotranscoded/Dogmatic.mp4', 'Dogmatic'),
(5, 'https://s3-us-west-1.amazonaws.com/smvtestvideotranscoded/Ebullient.mp4', 'Ebullient'),
(6, 'https://s3-us-west-1.amazonaws.com/smvtestvideotranscoded/Enervate.mp4', 'Enervate'),
(7, 'https://s3-us-west-1.amazonaws.com/smvtestvideotranscoded/Exigent.mp4', 'Exigent'),
(8, 'https://s3-us-west-1.amazonaws.com/smvtestvideotranscoded/Halsyon.mp4', 'Halsyon'),
(9, 'https://s3-us-west-1.amazonaws.com/smvtestvideotranscoded/Lucid.mp4', 'Lucid'),
(10, 'https://s3-us-west-1.amazonaws.com/smvtestvideotranscoded/Morose.mp4', 'Morose'),
(11, 'https://s3-us-west-1.amazonaws.com/smvtestvideotranscoded/Mundane.mp4', 'Mundane'),
(12, 'https://s3-us-west-1.amazonaws.com/smvtestvideotranscoded/Placate.mp4', 'Placate'),
(13, 'https://s3-us-west-1.amazonaws.com/smvtestvideotranscoded/Quaff.mp4', 'Quaff'),
(14, 'https://s3-us-west-1.amazonaws.com/smvtestvideotranscoded/Sanguine.mp4', 'Sanguine'),
(15, 'https://s3-us-west-1.amazonaws.com/smvtestvideotranscoded/Stupefy.mp4', 'Stupefy'),
(16, 'https://s3-us-west-1.amazonaws.com/smvtestvideotranscoded/Tortuous.mp4', 'Tortuous');

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
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=17;