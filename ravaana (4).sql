-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 04, 2018 at 10:37 AM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ravaana`
--

-- --------------------------------------------------------

--
-- Table structure for table `branches_list`
--

CREATE TABLE `branches_list` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_bin NOT NULL,
  `type` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `address` varchar(500) COLLATE utf8_bin NOT NULL,
  `active` int(11) NOT NULL DEFAULT '1',
  `created_by` int(11) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int(11) DEFAULT NULL,
  `modified_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `branches_list`
--

INSERT INTO `branches_list` (`id`, `uid`, `name`, `type`, `address`, `active`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES
(1, 0, 'Ravaana India Pvt Ltd.', 'Company', '#201, 2nd floor, Survey No. 429, NH-65, Hyderabad, India-502032 \r\nPhone:91+9666569885', 1, 2, '2018-10-24 11:28:45', 2, '2018-11-03 10:35:12'),
(2, 0, 'KAKINADA PORT', 'Branch', 'Office no:12 TTT plaza 2 nd floor kakinada port east godavari (dt) (ap) india', 1, 2, '2018-10-24 11:29:15', 2, '2018-11-03 09:24:13'),
(4, 0, 't26 Limited', 'Company', 'Btm, Bangalore', 1, NULL, '2018-10-26 13:33:18', NULL, NULL),
(5, 0, 't26_1 limited', 'Company', 'KR Puram,\nBangalore.', 1, NULL, '2018-10-26 13:40:24', NULL, NULL),
(6, 0, 'xvxvcxvcxvc', 'Company', 'xvcxvcxvcx', 1, 10, '2018-10-28 11:34:00', NULL, NULL),
(7, 0, 'xvxvcxvcxvc', 'Company', 'xvcxvcxvcx', 1, 10, '2018-10-28 11:34:00', NULL, NULL),
(8, 0, 'dsfdsf', 'Company', 'fdsfds', 1, 12, '2018-10-28 11:57:46', NULL, NULL),
(9, 0, 'dsfdsf', 'Company', 'fdsfds', 1, 12, '2018-10-28 11:57:46', NULL, NULL),
(10, 0, 'xcvccxvcxv', 'Company', 'cxvcxvcv', 1, 13, '2018-10-28 12:11:10', NULL, NULL),
(11, 0, 'xcvccxvcxv', 'Company', 'cxvcxvcv', 1, 13, '2018-10-28 12:11:10', NULL, NULL),
(12, 0, 'transport29', 'Company', 'No.100,Jaibheemanagar,\nBTM 1st stage,\nBangalore-560068', 1, 14, '2018-10-29 10:54:06', NULL, NULL),
(13, 0, 'Teja', 'Company', 'Btm,Bangalore', 1, 15, '2018-10-30 05:59:39', NULL, NULL),
(15, 0, 'dsjfkdsh', 'Branch', 'dfdsfds', 1, 2, '2018-11-03 09:10:37', 2, '2018-11-03 09:25:25'),
(16, 0, 'dfdsf', 'Branch', 'sdgdsg dgd', 1, 2, '2018-11-03 09:21:16', 2, '2018-11-03 09:23:27');

-- --------------------------------------------------------

--
-- Table structure for table `drivers_list`
--

CREATE TABLE `drivers_list` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `driver_name` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `driver_age` int(10) DEFAULT NULL,
  `driver_license_number` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `driver_mobile` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `driver_address` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `driver_photo` varchar(100) COLLATE utf8_bin NOT NULL,
  `driver_license` varchar(100) COLLATE utf8_bin NOT NULL,
  `active` int(1) DEFAULT '1',
  `created_by` int(4) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_by` timestamp NULL DEFAULT NULL,
  `modified_date` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `load_postings`
--

CREATE TABLE `load_postings` (
  `id` int(11) NOT NULL,
  `load_type` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `truck_type` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `from_city` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `from_location` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `to_city` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `to_location` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `distance_km` int(11) DEFAULT NULL,
  `load_cost` double DEFAULT NULL,
  `load_cost_type` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `advance_percent` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `tonns_available` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `available_date` date DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `tid` int(11) DEFAULT NULL,
  `active` int(1) NOT NULL DEFAULT '1',
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) DEFAULT NULL,
  `modified_date` date DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `load_type`
--

CREATE TABLE `load_type` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `load_type` varchar(100) COLLATE utf8_bin NOT NULL,
  `display_order` int(11) NOT NULL,
  `active` int(1) NOT NULL DEFAULT '1',
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) DEFAULT NULL,
  `modified_date` timestamp NULL DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `load_type`
--

INSERT INTO `load_type` (`id`, `uid`, `load_type`, `display_order`, `active`, `created_date`, `created_by`, `modified_date`, `modified_by`) VALUES
(1, 0, 'Coal', 1, 1, '2018-10-24 09:32:12', NULL, NULL, NULL),
(2, 0, 'Iron ore', 2, 1, '2018-10-24 09:32:12', NULL, NULL, NULL),
(3, 0, 'Fertilizer', 3, 1, '2018-10-24 09:32:12', NULL, NULL, NULL),
(4, 0, 'Cement', 4, 1, '2018-10-24 09:32:12', NULL, NULL, NULL),
(5, 0, 'Iron Steel Metal', 5, 1, '2018-10-24 09:32:12', NULL, NULL, NULL),
(6, 0, 'Rice', 6, 1, '2018-10-24 09:32:12', NULL, NULL, NULL),
(7, 0, 'Wood', 7, 1, '2018-10-24 09:32:12', NULL, NULL, NULL),
(8, 0, 'Steel', 8, 1, '2018-10-24 09:32:12', NULL, NULL, NULL),
(9, 0, 'Grass', 9, 1, '2018-10-24 09:32:12', NULL, NULL, NULL),
(10, 0, 'Electronics', 10, 1, '2018-10-24 09:32:12', NULL, NULL, NULL),
(11, 0, 'Bricks', 11, 1, '2018-10-24 09:32:12', NULL, NULL, NULL),
(12, 0, 'Sand', 12, 1, '2018-10-24 09:32:12', NULL, NULL, NULL),
(13, 0, 'Furniture', 13, 1, '2018-10-24 09:32:12', NULL, NULL, NULL),
(14, 0, 'Scrap Metal', 14, 1, '2018-10-24 09:32:12', NULL, NULL, NULL),
(15, 0, 'Vegetables', 15, 1, '2018-10-24 09:32:12', NULL, NULL, NULL),
(16, 0, 'Fruits', 16, 1, '2018-10-24 09:32:12', NULL, NULL, NULL),
(17, 0, 'Pulses & Cereals', 17, 1, '2018-10-24 09:32:12', NULL, NULL, NULL),
(18, 0, 'Oil', 18, 1, '2018-10-24 09:32:12', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `trucks_list`
--

CREATE TABLE `trucks_list` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `vehicle_registration_no` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `vehicle_type` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `truck_capacity` int(11) DEFAULT NULL,
  `truck_rc` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `truck_insurence` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `truck_pollution` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `truck_image` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `truck_fitness_certificate` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `active` int(11) NOT NULL DEFAULT '1',
  `created_by` int(11) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int(11) DEFAULT NULL,
  `modified_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `uid` int(11) NOT NULL,
  `business_type` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `verification_code` int(10) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `profile_complete` tinyint(1) NOT NULL,
  `verified` tinyint(1) NOT NULL,
  `company_name` varchar(100) DEFAULT NULL,
  `company_address` text,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modified_date` timestamp NULL DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uid`, `business_type`, `name`, `email`, `mobile`, `password`, `verification_code`, `active`, `profile_complete`, `verified`, `company_name`, `company_address`, `created_date`, `modified_date`, `created_by`, `modified_by`) VALUES
(1, 'Admin', 'Siva', 'sivame85@gmail.com', '8147595223', '123456', 1234, 1, 1, 1, NULL, NULL, '2018-10-11 10:08:19', NULL, NULL, NULL),
(2, 'TransportCompany', 'Siva Transport', 'transport@ravaana.in', '9874561230', '123456', 1, 1, 1, 1, NULL, NULL, '2018-10-21 16:50:14', NULL, NULL, NULL),
(3, 'TruckOwner', 'Truck Owner', 'truck@ravaana.in', '7894561230', '123456', 1, 1, 0, 1, NULL, NULL, '2018-10-17 09:43:52', NULL, NULL, NULL),
(5, 'TransportCompany', 'transport26', 't26@ravaana.in', '9874561230', '123456', 1234, 1, 0, 1, 't26 Limited', NULL, '2018-10-26 13:33:18', NULL, NULL, NULL),
(6, 'TransportCompany', 'transport26_1', 't26_1@ravaana.in', '9865471230', '123456', 1234, 1, 1, 1, 't26_1 limited', NULL, '2018-10-26 13:46:01', NULL, NULL, NULL),
(9, 'TransportCompany', 'safsa', 'safsa@in.in', '9786543210', '123456', 1234, 1, 0, 0, NULL, NULL, '2018-10-28 11:25:25', NULL, NULL, NULL),
(10, 'TransportCompany', 'fkjsa', 'jkhkj@kjk.in', '9231456780', '123456', 1234, 1, 0, 1, 'xvxvcxvcxvc', NULL, '2018-10-28 11:34:00', NULL, NULL, NULL),
(11, 'TransportCompany', 'sdfdsfdsfd', 'dfd@aa.com', '9807654321', '123456', 1234, 1, 0, 0, NULL, NULL, '2018-10-28 11:39:24', NULL, NULL, NULL),
(12, 'TransportCompany', 'csdcd', 'csac@emaik.com', '8907654321', '123456', 1234, 1, 0, 1, 'dsfdsf', NULL, '2018-10-28 11:57:46', NULL, NULL, NULL),
(13, 'TransportCompany', 'dsfdsf', 'dsfd@sf.in', '7689012345', '123456', 1234, 1, 0, 1, 'xcvccxvcxv', NULL, '2018-10-28 12:11:10', NULL, NULL, NULL),
(14, 'TransportCompany', 'transport29', 'transport29@ravaana.in', '9874561231', '123456', 1234, 1, 1, 1, 'transport29', NULL, '2018-10-29 12:07:35', NULL, NULL, NULL),
(15, 'TransportCompany', 'Teja', 'teja@gmail.com', '9876543210', '123456', 1234, 1, 1, 1, 'Teja', NULL, '2018-10-30 06:01:16', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_profile`
--

CREATE TABLE `user_profile` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `aadhar_number` int(20) DEFAULT NULL,
  `panCard_number` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `company_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `aadhar_copy` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `company_certificate` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `company_panCard` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `company_address` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `profile_pic` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_date` timestamp NULL DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user_profile`
--

INSERT INTO `user_profile` (`id`, `uid`, `aadhar_number`, `panCard_number`, `company_name`, `aadhar_copy`, `company_certificate`, `company_panCard`, `company_address`, `profile_pic`, `created_date`, `modified_date`, `created_by`, `modified_by`) VALUES
(4, 2, 353252, 'sfsaf', 'safsaf', '1540140614211020182.JPG', '1540140614211020183.JPG', '1540140614211020184.JPG', NULL, '1540140614211020181.jpg', '2018-10-21 16:50:14', NULL, NULL, NULL),
(5, 6, 789456123, '454', '484', '1540561561261020182.JPG', '1540561561261020183.JPG', '1540561561261020184.JPG', NULL, '1540561561261020181.jpg', '2018-10-26 13:46:01', NULL, NULL, NULL),
(6, 2, 0, 'safsaf', 'sadsad', '1540783857291020182.jpg', '1540783857291020183.JPG', '1540783857291020184.JPG', NULL, '1540783857291020181.JPG', '2018-10-29 03:30:57', NULL, NULL, NULL),
(7, 14, 46554654, '55754', 'gfgfd', '1540814855291020182.jpeg', '1540814855291020183.jpeg', '1540814855291020184.JPG', NULL, '1540814855291020181.JPG', '2018-10-29 12:07:35', NULL, NULL, NULL),
(8, 15, 2147483647, '4534563463', 'sdfdsgfds', '1540879276301020182.jpg', '1540879276301020183.jpg', '1540879276301020184.jpg', NULL, '1540879276301020181.jpg', '2018-10-30 06:01:16', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_type`
--

CREATE TABLE `vehicle_type` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `vehicle_type` varchar(100) COLLATE utf8_bin NOT NULL,
  `capacity` int(11) NOT NULL,
  `display_order` int(11) DEFAULT NULL,
  `active` int(1) NOT NULL DEFAULT '1',
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) DEFAULT NULL,
  `modified_date` timestamp NULL DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `vehicle_type`
--

INSERT INTO `vehicle_type` (`id`, `uid`, `vehicle_type`, `capacity`, `display_order`, `active`, `created_date`, `created_by`, `modified_date`, `modified_by`) VALUES
(18, 0, '6 Tyre Truck', 9, 1, 1, '2018-10-24 07:04:09', NULL, NULL, NULL),
(19, 0, '10 Tyre Truck', 15, 2, 1, '2018-10-24 07:04:09', NULL, NULL, NULL),
(20, 0, '12 Tyre Truck', 21, 3, 1, '2018-10-24 07:04:09', NULL, NULL, NULL),
(21, 0, '14 Tyre Truck', 25, 4, 1, '2018-10-24 07:04:09', NULL, NULL, NULL),
(22, 0, '18 Tyre truck', 27, 5, 1, '2018-10-24 07:04:09', NULL, NULL, NULL),
(23, 0, '22 Tyre Truck', 33, 6, 1, '2018-10-24 07:04:09', NULL, NULL, NULL),
(24, 0, '3 Tyre Auto Truck', 1, 7, 1, '2018-10-24 07:04:09', NULL, NULL, NULL),
(25, 0, '4 Tyre Tata Ace Zip', 1, 8, 1, '2018-10-24 07:04:09', NULL, NULL, NULL),
(26, 0, '4 Tyre Tata Ace', 2, 9, 1, '2018-10-24 07:04:09', NULL, NULL, NULL),
(27, 0, '4 Tyre Tata Super Ace', 2, 10, 1, '2018-10-24 07:04:09', NULL, NULL, NULL),
(28, 0, '4 Tyre Tata 407', 3, 11, 1, '2018-10-24 07:04:09', NULL, NULL, NULL),
(29, 0, '4 Tyre Tata Yodha', 3, 12, 1, '2018-10-24 07:04:09', NULL, NULL, NULL),
(30, 0, '4 Tyre Bolero Truck', 2, 13, 1, '2018-10-24 07:04:09', NULL, NULL, NULL),
(31, 0, '4 Tyre Ashok leyland Dost', 3, 14, 1, '2018-10-24 07:04:09', NULL, NULL, NULL),
(32, 0, '14 Tyre Trailer', 25, 15, 1, '2018-10-24 07:04:09', NULL, NULL, NULL),
(33, 0, '18 Tyre Trailer', 27, 16, 1, '2018-10-24 07:04:09', NULL, NULL, NULL),
(34, 0, '22 Tyre Trailer', 33, 17, 1, '2018-10-24 07:04:09', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `branches_list`
--
ALTER TABLE `branches_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `drivers_list`
--
ALTER TABLE `drivers_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `load_postings`
--
ALTER TABLE `load_postings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `load_type`
--
ALTER TABLE `load_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trucks_list`
--
ALTER TABLE `trucks_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `aadhar_number` (`aadhar_number`),
  ADD UNIQUE KEY `panCard_number` (`panCard_number`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `vehicle_type`
--
ALTER TABLE `vehicle_type`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `branches_list`
--
ALTER TABLE `branches_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `drivers_list`
--
ALTER TABLE `drivers_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `load_postings`
--
ALTER TABLE `load_postings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `load_type`
--
ALTER TABLE `load_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `user_profile`
--
ALTER TABLE `user_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `vehicle_type`
--
ALTER TABLE `vehicle_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD CONSTRAINT `uid` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
