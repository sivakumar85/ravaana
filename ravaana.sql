-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 21, 2018 at 07:10 PM
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
  `aadhar_copy` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `driver_mobile` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `driver_address` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `driver_photo` varchar(100) COLLATE utf8_bin NOT NULL,
  `driver_license` varchar(100) COLLATE utf8_bin NOT NULL,
  `driver_aadhar_number` varchar(20) COLLATE utf8_bin DEFAULT NULL,
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
  `distance_km` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `load_cost` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `load_cost_type` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `advance_percent` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `tonns_available` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `available_date_from` date DEFAULT NULL,
  `available_date_to` date DEFAULT NULL,
  `available_daily` int(1) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `tid` int(11) DEFAULT NULL,
  `active` int(1) NOT NULL DEFAULT '1',
  `is_deleted` int(1) NOT NULL DEFAULT '0',
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) DEFAULT NULL,
  `modified_date` date DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `load_truck_requests`
--

CREATE TABLE `load_truck_requests` (
  `id` int(11) NOT NULL,
  `booking_id` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `request_type` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `request_load_id` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `request_truck_id` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `request_user_id` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `request_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `assigned_driver_id` int(11) DEFAULT NULL,
  `payment_id` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `owner_payment_id` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `request_status` varchar(250) COLLATE utf8_bin DEFAULT NULL,
  `active` int(11) DEFAULT '0',
  `created_by` int(10) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int(11) DEFAULT NULL,
  `modified_date` timestamp NULL DEFAULT NULL
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
  `driver_aadhar_number` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `aadhar_copy` varchar(20) COLLATE utf8_bin DEFAULT NULL,
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

-- --------------------------------------------------------

--
-- Table structure for table `user_payments`
--

CREATE TABLE `user_payments` (
  `id` int(11) NOT NULL,
  `transaction_id` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `transaction_date` datetime DEFAULT NULL,
  `transaction_amount` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `payment_id` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `transaction_status` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `transaction_purpose` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `buyer_name` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `buyer_email` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `payment_request` varchar(500) COLLATE utf8_bin DEFAULT NULL,
  `instrument_type` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `billing_instrument` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `failure` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `payout` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `send_sms` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `send_email` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `sms_status` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `email_status` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int(11) DEFAULT NULL,
  `modified_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `user_profile`
--

CREATE TABLE `user_profile` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `aadhar_number` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `panCard_number` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `company_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `aadhar_copy` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `company_certificate` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `company_panCard` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `company_address` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `profile_pic` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `driving_license_number` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `driving_license_copy` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_date` timestamp NULL DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
-- Indexes for table `load_truck_requests`
--
ALTER TABLE `load_truck_requests`
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
-- Indexes for table `user_payments`
--
ALTER TABLE `user_payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD PRIMARY KEY (`id`),
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `drivers_list`
--
ALTER TABLE `drivers_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `load_postings`
--
ALTER TABLE `load_postings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `load_truck_requests`
--
ALTER TABLE `load_truck_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `load_type`
--
ALTER TABLE `load_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `trucks_list`
--
ALTER TABLE `trucks_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `user_payments`
--
ALTER TABLE `user_payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `user_profile`
--
ALTER TABLE `user_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

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
