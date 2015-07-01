-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Jun 19, 2015 at 08:32 AM
-- Server version: 5.5.38
-- PHP Version: 5.6.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `smv_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `smvtestusers`
--

CREATE TABLE `smvtestusers` (
`ID` int(11) NOT NULL,
  `Email` varchar(128) NOT NULL,
  `First Name` varchar(128) NOT NULL,
  `Last Name` varchar(128) NOT NULL,
  `Nationality` varchar(128) NOT NULL,
  `Education` varchar(125) NOT NULL,
  `Age` int(11) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `smvtestusers`
--

--
-- Indexes for dumped tables
--

--
-- Indexes for table `smvtestusers`
--
ALTER TABLE `smvtestusers`
 ADD PRIMARY KEY (`Email`), ADD UNIQUE KEY `ID` (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `smvtestusers`
--
ALTER TABLE `smvtestusers`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=0;