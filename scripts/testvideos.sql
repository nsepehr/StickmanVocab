-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: May 05, 2015 at 06:29 AM
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
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `testvideos`
--


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
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;