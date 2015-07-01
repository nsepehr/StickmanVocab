-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Jun 19, 2015 at 08:34 AM
-- Server version: 5.5.38
-- PHP Version: 5.6.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `smv_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `watches`
--

CREATE TABLE `watches` (
`ID` int(11) NOT NULL,
  `Email` varchar(125) NOT NULL,
  `Videos` varchar(125) NOT NULL,
  `Flashes` varchar(125) NOT NULL,
  `Date` date NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `watches`

--
-- Indexes for dumped tables
--

--
-- Indexes for table `watches`
--
ALTER TABLE `watches`
 ADD PRIMARY KEY (`ID`), ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `watches`
--
ALTER TABLE `watches`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=0;