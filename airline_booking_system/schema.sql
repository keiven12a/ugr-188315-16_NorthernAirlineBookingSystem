-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
-- Host: localhost
-- Generation Time: Dec 10, 2024 at 05:00 PM

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Database: `airline_booking_system`

CREATE DATABASE IF NOT EXISTS `airline_booking_system` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `airline_booking_system`;

-- --------------------------------------------------------

-- Table structure for table `passengers`

CREATE TABLE `passengers` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `age` int(11) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `passport_number` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- Table structure for table `admins`

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `role` enum('super_admin','flight_manager','booking_manager') DEFAULT 'flight_manager',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default admin
INSERT INTO `admins` (`id`, `username`, `password`, `full_name`, `role`) VALUES
(1, 'RESPECT_WORLD', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'System Admin', 'super_admin');

-- --------------------------------------------------------

-- Table structure for table `flights`

CREATE TABLE `flights` (
  `id` int(11) NOT NULL,
  `flight_number` varchar(20) NOT NULL,
  `source` varchar(100) NOT NULL,
  `destination` varchar(100) NOT NULL,
  `departure_time` time NOT NULL,
  `arrival_time` time DEFAULT NULL,
  `day_of_week` enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') NOT NULL,
  `total_seats` int(11) NOT NULL DEFAULT 150,
  `available_seats` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- Table structure for table `bookings`

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `booking_reference` varchar(20) NOT NULL,
  `passenger_id` int(11) NOT NULL,
  `flight_id` int(11) NOT NULL,
  `seat_number` varchar(10) DEFAULT NULL,
  `booking_date` date NOT NULL,
  `travel_date` date NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `status` enum('confirmed','cancelled','delayed','pending') NOT NULL DEFAULT 'confirmed',
  `payment_method` enum('visa','paypal','bank','mobile') DEFAULT NULL,
  `payment_status` enum('pending','completed','failed','refunded') DEFAULT 'pending',
  `cancellation_date` datetime DEFAULT NULL,
  `refund_amount` decimal(10,2) DEFAULT NULL,
  `delay_reason` text DEFAULT NULL,
  `original_booking_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- Table structure for table `payments`

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `transaction_id` varchar(100) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `currency` varchar(3) NOT NULL DEFAULT 'USD',
  `status` enum('pending','completed','failed','refunded') NOT NULL DEFAULT 'pending',
  `payment_details` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- Table structure for table `seat_assignments`

CREATE TABLE `seat_assignments` (
  `id` int(11) NOT NULL,
  `flight_id` int(11) NOT NULL,
  `seat_number` varchar(10) NOT NULL,
  `is_occupied` tinyint(1) NOT NULL DEFAULT 0,
  `booking_id` int(11) DEFAULT NULL,
  `occupied_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- Indexes for table `passengers`

ALTER TABLE `passengers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `passport_number` (`passport_number`);

-- Indexes for table `admins`

ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

-- Indexes for table `flights`

ALTER TABLE `flights`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `flight_number` (`flight_number`);

-- Indexes for table `bookings`

ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `booking_reference` (`booking_reference`),
  ADD KEY `passenger_id` (`passenger_id`),
  ADD KEY `flight_id` (`flight_id`),
  ADD KEY `original_booking_id` (`original_booking_id`);

-- Indexes for table `payments`

ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `booking_id` (`booking_id`);

-- Indexes for table `seat_assignments`

ALTER TABLE `seat_assignments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `flight_seat` (`flight_id`,`seat_number`),
  ADD KEY `booking_id` (`booking_id`);

-- AUTO_INCREMENT for dumped tables

ALTER TABLE `passengers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `flights`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `seat_assignments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

-- Constraints for dumped tables

ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`passenger_id`) REFERENCES `passengers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`flight_id`) REFERENCES `flights` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_3` FOREIGN KEY (`original_booking_id`) REFERENCES `bookings` (`id`) ON DELETE SET NULL;

ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE;

ALTER TABLE `seat_assignments`
  ADD CONSTRAINT `seat_assignments_ibfk_1` FOREIGN KEY (`flight_id`) REFERENCES `flights` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `seat_assignments_ibfk_2` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE SET NULL;
COMMIT;