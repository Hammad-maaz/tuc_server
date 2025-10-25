-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 25, 2025 at 04:41 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tuc`
--

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `schoolId` int(11) NOT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`id`, `name`, `schoolId`, `isDeleted`, `createdAt`, `updatedAt`) VALUES
(7, 'Grade 4', 16, 0, '2025-10-25', '2025-10-25');

-- --------------------------------------------------------

--
-- Table structure for table `schools`
--

CREATE TABLE `schools` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `principalName` varchar(250) DEFAULT NULL,
  `principalContact` varchar(250) DEFAULT NULL,
  `receptionistName` varchar(250) DEFAULT NULL,
  `receptionistContact` varchar(250) DEFAULT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schools`
--

INSERT INTO `schools` (`id`, `name`, `logo`, `address`, `principalName`, `principalContact`, `receptionistName`, `receptionistContact`, `isDeleted`, `createdAt`, `updatedAt`) VALUES
(15, 'Hira model school', 'http://192.168.1.33:3000/uploads/logo-1761391168351-326010842.png', 'asdfdsfdasdfads', 'asdfsfs', '123424123214', 'asfdsadsfasfasf', '234312342', 1, '2025-10-25', '2025-10-25'),
(16, 'Hira model school', 'http://192.168.1.33:3000/uploads/logo-1761391698567-711724741.png', 'asdfdsfdasdfads', 'asdfsfs', '123424123214', 'asfdsadsfasfasf', '234312342', 1, '2025-10-25', '2025-10-25');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` int(11) NOT NULL,
  `classId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `maleUpperWear` varchar(255) NOT NULL,
  `maleLowerWear` varchar(255) NOT NULL,
  `femaleUpperWear` varchar(255) NOT NULL,
  `femaleLowerWear` varchar(255) NOT NULL,
  `isDeleted` tinyint(1) DEFAULT 0,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `classId`, `name`, `maleUpperWear`, `maleLowerWear`, `femaleUpperWear`, `femaleLowerWear`, `isDeleted`, `createdAt`, `updatedAt`) VALUES
(1, 7, 'New Session', 'http://192.168.1.33:3000/uploads/maleUpperWear-1761402450892-626338112.jpg', 'http://192.168.1.33:3000/uploads/maleLowerWear-1761402450893-702649641.jpg', 'http://192.168.1.33:3000/uploads/femaleUpperWear-1761402450896-149757649.png', 'http://192.168.1.33:3000/uploads/femaleLowerWear-1761402450896-25356958.jpg', 1, '2025-10-25 13:10:30', '2025-10-25 14:27:30'),
(2, 7, 'New Session', 'http://192.168.1.33:3000/uploads/maleUpperWear-1761403121848-542277127.jpg', 'http://192.168.1.33:3000/uploads/maleLowerWear-1761403121852-824039038.jpg', 'http://192.168.1.33:3000/uploads/femaleUpperWear-1761403121855-10662240.png', 'http://192.168.1.33:3000/uploads/femaleLowerWear-1761403121855-303672268.jpg', 0, '2025-10-25 14:38:01', '2025-10-25 14:38:41');

-- --------------------------------------------------------

--
-- Table structure for table `size_defination`
--

CREATE TABLE `size_defination` (
  `id` int(11) NOT NULL,
  `sizeNumber` int(11) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `upperWear` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`upperWear`)),
  `lowerWear` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`lowerWear`)),
  `headCover` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'Hammad', 'hammad@gmail.com', '$2b$10$Q14Stgv5a0pYGg402GqRseRMZvMyv5zECQ33ZEQa76y8fVU/ZOTJO', '2025-10-15', '2025-10-15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `schoolId` (`schoolId`);

--
-- Indexes for table `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `classId` (`classId`);

--
-- Indexes for table `size_defination`
--
ALTER TABLE `size_defination`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `schools`
--
ALTER TABLE `schools`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `size_defination`
--
ALTER TABLE `size_defination`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `classes`
--
ALTER TABLE `classes`
  ADD CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`schoolId`) REFERENCES `schools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
