-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: May 05, 2015 at 06:22 AM
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
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1 COMMENT='Table for listing of known words';

--
-- Dumping data for table `knownwords`
--


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
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;