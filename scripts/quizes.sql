-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: May 20, 2015 at 05:48 PM
-- Server version: 5.5.38
-- PHP Version: 5.6.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `smv_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `quizes`
--

CREATE TABLE `quizes` (
`ID` int(11) NOT NULL,
  `Word` varchar(125) NOT NULL,
  `Question` longtext NOT NULL,
  `A` longtext NOT NULL,
  `B` longtext NOT NULL,
  `C` longtext NOT NULL,
  `D` longtext NOT NULL,
  `Answer` longtext NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `quizes`
--
ALTER TABLE `quizes`
 ADD PRIMARY KEY (`ID`), ADD UNIQUE KEY `Word` (`Word`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `quizes`
--
ALTER TABLE `quizes`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;