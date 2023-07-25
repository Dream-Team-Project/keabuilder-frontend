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
-- Database: `unstop_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `seats`
--

CREATE TABLE `seats` (
  `id` int(11) NOT NULL,
  `uniqueid` varchar(20) NOT NULL,
  `seats` varchar(20) NOT NULL,
  `row_no` varchar(100) NOT NULL,
  `remaining_row_space` varchar(11) NOT NULL,
  `book_seat_no` varchar(500) NOT NULL,
  `total_booked_seats` varchar(200) NOT NULL,
  `remaining_seats` varchar(200) NOT NULL,
  `remaining_seats_position` varchar(2000) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `seats`
--

INSERT INTO `seats` (`id`, `uniqueid`, `seats`, `row_no`, `remaining_row_space`, `book_seat_no`, `total_booked_seats`, `remaining_seats`, `remaining_seats_position`, `createdAt`) VALUES
(1, 'c40e9107hg22', '3', '12', '0', '78,79,80', '3', '77', '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,booked,booked,booked', '2023-07-15 21:32:16'),
(2, '8e2h308d6i4g7', '2', '1', '5', '1,2', '5', '75', 'booked,booked,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,booked,booked,booked', '2023-07-15 21:37:21'),
(3, '7jjc9gig3ghcb', '3', '1', '2', '3,4,5', '8', '72', 'booked,booked,booked,booked,booked,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,booked,booked,booked', '2023-07-15 21:40:05'),
(5, '9ijdfc5c7h23', '2', '1', '0', '6,7', '10', '70', 'booked,booked,booked,booked,booked,booked,booked,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,booked,booked,booked', '2023-07-15 21:45:52'),
(7, 'ch3iaa9i316i9', '2', '2', '5', '8,9', '12', '68', 'booked,booked,booked,booked,booked,booked,booked,booked,booked,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,booked,booked,booked', '2023-07-15 21:48:35'),
(8, '6j00373ec02', '2', '2', '3', '10,11', '14', '66', 'booked,booked,booked,booked,booked,booked,booked,booked,booked,booked,booked,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,booked,booked,booked', '2023-07-15 21:50:49'),
(9, '3edb2bhihj2a9', '3', '2', '0', '12,13,14', '17', '63', 'booked,booked,booked,booked,booked,booked,booked,booked,booked,booked,booked,booked,booked,booked,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,booked,booked,booked', '2023-07-15 21:50:57'),
(10, 'jh9eb0b466ah', '2', '3', '5', '15,16', '19', '61', 'booked,booked,booked,booked,booked,booked,booked,booked,booked,booked,booked,booked,booked,booked,booked,booked,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,booked,booked,booked', '2023-07-15 21:51:02'),
(11, '2fj5h5604f3b9', '4', '3', '1', '17,18,19,20', '23', '57', 'booked,booked,booked,booked,booked,booked,booked,booked,booked,booked,booked,booked,booked,booked,booked,booked,booked,booked,booked,booked,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,booked,booked,booked', '2023-07-15 21:51:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `seats`
--
ALTER TABLE `seats`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `seats`
--
ALTER TABLE `seats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
