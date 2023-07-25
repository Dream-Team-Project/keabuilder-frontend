-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 15, 2023 at 07:51 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `user_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `uniqueid` varchar(50) NOT NULL,
  `name` varchar(300) NOT NULL,
  `email` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `uniqueid`, `name`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'wMRLZ5pjWdgb0CLoPPlj', 'test', 'test@gmail.com', '$2a$08$1dcvhTn4FrjfetP9x.2Nt..QsNpcldt.BzVlrsTqfgvcIcNg.w6M6', '2023-07-13 15:14:28', NULL),
(2, '5zQPlKTwHfUtwhrxpUWF', 'test', 'test1@gmail.com', '$2a$08$p0HIUak2ZddK8I28He14SOfMCKs1zaT8wgFT4Q/ndZZ..3RIwmmxK', '2023-07-13 16:22:52', NULL),
(3, 'EkSgAmgNKlpJ9Nt6byMw', 'test', 'test2@gmail.com', '$2a$08$K1jpPUozDKZyTFNUtI4goertTroMu6d0UQ8btLxMYPTgGqhkp7ZKe', '2023-07-13 16:26:57', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
