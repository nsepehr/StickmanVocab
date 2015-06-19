-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Jun 19, 2015 at 08:29 AM
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
  `A` longtext NOT NULL,
  `B` longtext NOT NULL,
  `C` longtext NOT NULL,
  `D` longtext NOT NULL,
  `E` longtext NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `quizes`
--

INSERT INTO `quizes` (`ID`, `Word`, `A`, `B`, `C`, `D`, `E`) VALUES
(5, 'Morose', 'Unhappy', 'Occupied', 'Distracted', 'Charming', 'Blessing'),
(4, 'Mundane', 'Happiness', 'Overdue', 'Lacking interest', 'Happening', 'Achievment'),
(6, 'Quaff', 'Pitching', 'Thirsty', 'Drinking Excessively', 'Dancing vigorously', 'outgoing'),
(7, 'Exigent', 'Caring', 'Required', 'Dull', 'Aggressively', 'Enjoyment'),
(8, 'Lucid', 'Expressed clearly', 'Misunderstanding', 'Stained', 'Applause', 'Conquering'),
(9, 'Halcyon', 'Helium', 'Misery', 'To calm down', 'Oblivion', 'Joyful'),
(10, 'Enervate', 'Weaken', 'To thrive', 'Conquer', 'Robust', 'Astonish'),
(11, 'Burgeon', 'Vague', 'Acceptable', 'Challenging', 'To grow rapidly', 'To be proud'),
(12, 'Placate', 'Catastrophic', 'To please', 'To calm', 'Tiresome', 'Accurate'),
(13, 'Stupefy', 'To develop', 'Thoughtful', 'To ease', 'Absurd', 'To amaze'),
(14, 'Tortuous', 'Complicated', 'Torture', 'Confined', 'Abstract', 'Acknowledge'),
(15, 'Assuage', 'Replica', 'Promote', 'Rebottle', 'To ease', 'Recognition'),
(16, 'Connoisseur', 'Escort', 'Expert', 'Grand', 'Innovator', 'Expressive'),
(17, 'Dogmatic', 'Opinionated', 'Lively', 'Compromise', 'Character', 'Noticeable'),
(18, 'Ebullient', 'Reminder', 'Reliant', 'Doubtful', 'Worrisome', 'Cheerful'),
(19, 'Sanguine', 'Sadness', 'Positive', 'Hive', 'Remainder', 'Search'),
(20, 'Anomalous', 'Abnormal', 'Fund', 'Consist', 'Habit', 'Cease'),
(21, 'Aberrant', 'Celebrate', 'Irregular', 'Logic', 'Wander', 'Glow'),
(22, 'Blandishment', 'Seize', 'Maintain', 'Insert', 'Carcinogen', 'Persuasion'),
(23, 'Aver', 'Assert', 'Harsh', 'Imitate', 'Mistake', 'Wisdom'),
(24, 'Castigate', 'Litigate', 'Reprimand', 'Wisdom', 'Unique', 'Service'),
(25, 'Dearth', 'Hidden', 'Undergo', 'Grief', 'Scarcity', 'Loose'),
(26, 'Emollient', 'Deep', 'Wreck', 'Soothing', 'Ignore', 'Kindness'),
(27, 'Esoteric', 'Expectation', 'Obscure', 'Capable', 'Lead', 'Logic'),
(28, 'Fervid', 'Passionate', 'Painful', 'To charge', 'Hesitate', 'Service'),
(29, 'Inchoate', 'Hatch', 'Candidate', 'Secure', 'Immature', 'Robust'),
(30, 'Insipid', 'Flavorful', 'Sake', 'Incident', 'Bland', 'Match'),
(31, 'Laconic', 'Brief', 'Keen', 'Graceful', 'Generous', 'Fabulous'),
(32, 'Ossify', 'Malice', 'Witty', 'Ideal', 'Insult', 'Harden'),
(33, 'Noisome', 'Loud', 'Hidden', 'Unpleasant', 'Wonder', 'Ideal');

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
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=34;