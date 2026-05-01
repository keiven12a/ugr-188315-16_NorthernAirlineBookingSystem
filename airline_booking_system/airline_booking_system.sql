-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 20, 2026 at 11:04 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `airline_booking_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `role` enum('super_admin','flight_manager','booking_manager') DEFAULT 'flight_manager',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `password`, `full_name`, `role`, `created_at`) VALUES
(1, 'RESPECT_WORLD', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'System Admin', 'super_admin', '2026-01-19 11:46:24');

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `booking_reference`, `passenger_id`, `flight_id`, `seat_number`, `booking_date`, `travel_date`, `price`, `status`, `payment_method`, `payment_status`, `cancellation_date`, `refund_amount`, `delay_reason`, `original_booking_id`, `created_at`, `updated_at`) VALUES
(1, 'ET-62B74FB9', 1, 1, '1B', '2026-01-19', '2026-01-20', 2.00, 'cancelled', 'visa', 'completed', '2026-01-19 06:57:20', 1.80, NULL, NULL, '2026-01-19 13:44:32', '2026-01-19 14:57:20'),
(2, 'ET-CF14303E', 1, 1, '2A', '2026-01-19', '2026-01-20', 2.00, 'cancelled', 'visa', 'completed', '2026-01-19 10:13:33', 1.80, NULL, NULL, '2026-01-19 14:58:31', '2026-01-19 18:13:33'),
(3, 'ET-B4B94D86', 1, 1, '7A', '2026-01-19', '2026-01-20', 2.00, 'cancelled', 'visa', 'completed', '2026-01-19 09:01:05', 1.80, NULL, NULL, '2026-01-19 15:02:00', '2026-01-19 17:01:05'),
(4, 'ET-3E521C73', 1, 1, '1B', '2026-01-19', '2026-01-20', 2.00, 'cancelled', 'visa', 'completed', '2026-01-19 10:29:06', 1.80, NULL, NULL, '2026-01-19 18:14:31', '2026-01-19 18:29:06'),
(5, 'ET-C0455AA1', 1, 7, '1A', '2026-01-19', '2026-01-20', 700.00, 'confirmed', 'visa', 'completed', NULL, NULL, NULL, NULL, '2026-01-19 18:27:35', '2026-01-19 18:27:35'),
(6, 'ET-5CD3E6B0', 2, 7, '2B', '2026-01-20', '2026-01-21', 700.00, 'cancelled', 'visa', 'completed', '2026-01-20 13:39:55', 630.00, NULL, NULL, '2026-01-20 21:39:32', '2026-01-20 21:39:55'),
(7, 'ET-559599F9', 2, 7, '3B', '2026-01-20', '2026-01-21', 700.00, 'confirmed', 'visa', 'completed', NULL, NULL, NULL, NULL, '2026-01-20 21:44:36', '2026-01-20 21:44:36');

-- --------------------------------------------------------

--
-- Table structure for table `flights`
--

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `flights`
--

INSERT INTO `flights` (`id`, `flight_number`, `source`, `destination`, `departure_time`, `arrival_time`, `day_of_week`, `total_seats`, `available_seats`, `price`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'et03', 'mk', 'add', '03:00:00', '05:00:00', 'Monday', 90, 76, 2.00, 1, '2026-01-19 12:37:26', '2026-01-19 18:29:06'),
(2, 'et05', 'bah', 'add', '04:00:00', '06:00:00', 'Monday', 120, 120, 500.00, 1, '2026-01-19 18:20:27', '2026-01-19 18:20:27'),
(3, 'et09', 'add', 'humera', '05:00:00', '07:00:00', 'Monday', 120, 120, 250.00, 1, '2026-01-19 18:21:27', '2026-01-19 18:21:27'),
(4, 'et08', 'bah', 'adigrat', '02:00:00', '04:00:00', 'Monday', 130, 130, 100.00, 1, '2026-01-19 18:22:29', '2026-01-19 18:22:29'),
(7, 'et007', 'addis', 'mekelle', '01:00:00', '03:00:00', 'Monday', 190, 191, 700.00, 1, '2026-01-19 18:26:19', '2026-01-20 21:44:36'),
(9, 'eth', 'ADD', 'MQX', '12:00:00', '14:00:00', 'Monday', 150, 150, 43.00, 1, '2026-01-20 21:31:15', '2026-01-20 21:31:15');

-- --------------------------------------------------------

--
-- Table structure for table `passengers`
--

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `passengers`
--

INSERT INTO `passengers` (`id`, `name`, `username`, `gender`, `age`, `email`, `passport_number`, `password`, `created_at`, `updated_at`) VALUES
(1, 'kb', 'yosiboy', 'Male', 22, 'WEQUIO@gmail.com', '1234567876543', '$2y$10$0F3Tz9tNIsZnyQleFNO1fearYcZrexe7c72wNcA1Aiipll/fB0Wtu', '2026-01-19 12:34:12', '2026-01-19 12:34:12'),
(2, 'faniel', 'fani', 'Male', 23, 'fani@mu.co', '1234567890987656', '$2y$10$wwuF9BwRL1JRa1ELmR8tnuvbgWP7tqZ2wuY1ddRcWVSA1aADID5pW', '2026-01-20 21:38:31', '2026-01-20 21:38:31');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `booking_id`, `payment_method`, `transaction_id`, `amount`, `currency`, `status`, `payment_details`, `created_at`) VALUES
(1, 1, 'visa', 'TXN696E354107B2A', 2.00, 'USD', 'completed', '{\"method\":\"visa\",\"transaction_id\":\"TXN696E354107B2A\",\"timestamp\":\"2026-01-19 14:44:33\",\"card_last4\":\"0987\",\"mobile_number\":null}', '2026-01-19 13:44:33'),
(2, 2, 'visa', 'TXN696E46972CC4A', 2.00, 'USD', 'completed', '{\"method\":\"visa\",\"transaction_id\":\"TXN696E46972CC4A\",\"timestamp\":\"2026-01-19 15:58:31\",\"card_last4\":\"5434\",\"mobile_number\":null}', '2026-01-19 14:58:31'),
(3, 3, 'visa', 'TXN696E476850EC7', 2.00, 'USD', 'completed', '{\"method\":\"visa\",\"transaction_id\":\"TXN696E476850EC7\",\"timestamp\":\"2026-01-19 16:02:00\",\"card_last4\":\"4321\",\"mobile_number\":null}', '2026-01-19 15:02:00'),
(4, 4, 'visa', 'TXN696E74877633C', 2.00, 'USD', 'completed', '{\"method\":\"visa\",\"transaction_id\":\"TXN696E74877633C\",\"timestamp\":\"2026-01-19 19:14:31\",\"card_last4\":\"6567\",\"mobile_number\":null}', '2026-01-19 18:14:31'),
(5, 5, 'visa', 'TXN696E77971809C', 700.00, 'USD', 'completed', '{\"method\":\"visa\",\"transaction_id\":\"TXN696E77971809C\",\"timestamp\":\"2026-01-19 19:27:35\",\"card_last4\":\"8765\",\"mobile_number\":null}', '2026-01-19 18:27:35'),
(6, 6, 'visa', 'TXN696FF61530972', 700.00, 'USD', 'completed', '{\"method\":\"visa\",\"transaction_id\":\"TXN696FF61530972\",\"timestamp\":\"2026-01-20 22:39:33\",\"card_last4\":\"7645\",\"mobile_number\":null}', '2026-01-20 21:39:33'),
(7, 7, 'visa', 'TXN696FF74470CCC', 700.00, 'USD', 'completed', '{\"method\":\"visa\",\"transaction_id\":\"TXN696FF74470CCC\",\"timestamp\":\"2026-01-20 22:44:36\",\"card_last4\":\"8766\",\"mobile_number\":null}', '2026-01-20 21:44:36');

-- --------------------------------------------------------

--
-- Table structure for table `seat_assignments`
--

CREATE TABLE `seat_assignments` (
  `id` int(11) NOT NULL,
  `flight_id` int(11) NOT NULL,
  `seat_number` varchar(10) NOT NULL,
  `is_occupied` tinyint(1) NOT NULL DEFAULT 0,
  `booking_id` int(11) DEFAULT NULL,
  `occupied_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `seat_assignments`
--

INSERT INTO `seat_assignments` (`id`, `flight_id`, `seat_number`, `is_occupied`, `booking_id`, `occupied_at`) VALUES
(1, 1, '1A', 0, NULL, NULL),
(2, 1, '1B', 0, NULL, NULL),
(3, 1, '1C', 0, NULL, NULL),
(4, 1, '1D', 0, NULL, NULL),
(5, 1, '1E', 0, NULL, NULL),
(6, 1, '1F', 0, NULL, NULL),
(7, 1, '2A', 0, NULL, NULL),
(8, 1, '2B', 0, NULL, NULL),
(9, 1, '2C', 0, NULL, NULL),
(10, 1, '2D', 0, NULL, NULL),
(11, 1, '2E', 0, NULL, NULL),
(12, 1, '2F', 0, NULL, NULL),
(13, 1, '3A', 0, NULL, NULL),
(14, 1, '3B', 0, NULL, NULL),
(15, 1, '3C', 0, NULL, NULL),
(16, 1, '3D', 0, NULL, NULL),
(17, 1, '3E', 0, NULL, NULL),
(18, 1, '3F', 0, NULL, NULL),
(19, 1, '4A', 0, NULL, NULL),
(20, 1, '4B', 0, NULL, NULL),
(21, 1, '4C', 0, NULL, NULL),
(22, 1, '4D', 0, NULL, NULL),
(23, 1, '4E', 0, NULL, NULL),
(24, 1, '4F', 0, NULL, NULL),
(25, 1, '5A', 0, NULL, NULL),
(26, 1, '5B', 0, NULL, NULL),
(27, 1, '5C', 0, NULL, NULL),
(28, 1, '5D', 0, NULL, NULL),
(29, 1, '5E', 0, NULL, NULL),
(30, 1, '5F', 0, NULL, NULL),
(31, 1, '6A', 0, NULL, NULL),
(32, 1, '6B', 0, NULL, NULL),
(33, 1, '6C', 0, NULL, NULL),
(34, 1, '6D', 0, NULL, NULL),
(35, 1, '6E', 0, NULL, NULL),
(36, 1, '6F', 0, NULL, NULL),
(37, 1, '7A', 0, NULL, NULL),
(38, 1, '7B', 0, NULL, NULL),
(39, 1, '7C', 0, NULL, NULL),
(40, 1, '7D', 0, NULL, NULL),
(41, 1, '7E', 0, NULL, NULL),
(42, 1, '7F', 0, NULL, NULL),
(43, 1, '8A', 0, NULL, NULL),
(44, 1, '8B', 0, NULL, NULL),
(45, 1, '8C', 0, NULL, NULL),
(46, 1, '8D', 0, NULL, NULL),
(47, 1, '8E', 0, NULL, NULL),
(48, 1, '8F', 0, NULL, NULL),
(49, 1, '9A', 0, NULL, NULL),
(50, 1, '9B', 0, NULL, NULL),
(51, 1, '9C', 0, NULL, NULL),
(52, 1, '9D', 0, NULL, NULL),
(53, 1, '9E', 0, NULL, NULL),
(54, 1, '9F', 0, NULL, NULL),
(55, 1, '10A', 0, NULL, NULL),
(56, 1, '10B', 0, NULL, NULL),
(57, 1, '10C', 0, NULL, NULL),
(58, 1, '10D', 0, NULL, NULL),
(59, 1, '10E', 0, NULL, NULL),
(60, 1, '10F', 0, NULL, NULL),
(61, 1, '11A', 0, NULL, NULL),
(62, 1, '11B', 0, NULL, NULL),
(63, 1, '11C', 0, NULL, NULL),
(64, 1, '11D', 0, NULL, NULL),
(65, 1, '11E', 0, NULL, NULL),
(66, 1, '11F', 0, NULL, NULL),
(67, 1, '12A', 0, NULL, NULL),
(68, 1, '12B', 0, NULL, NULL),
(69, 1, '12C', 0, NULL, NULL),
(70, 1, '12D', 0, NULL, NULL),
(71, 1, '12E', 0, NULL, NULL),
(72, 1, '12F', 0, NULL, NULL),
(73, 1, '13A', 0, NULL, NULL),
(74, 1, '13B', 0, NULL, NULL),
(75, 1, '13C', 0, NULL, NULL),
(76, 1, '13D', 0, NULL, NULL),
(77, 1, '13E', 0, NULL, NULL),
(78, 1, '13F', 0, NULL, NULL),
(79, 1, '14A', 0, NULL, NULL),
(80, 1, '14B', 0, NULL, NULL),
(81, 1, '14C', 0, NULL, NULL),
(82, 1, '14D', 0, NULL, NULL),
(83, 1, '14E', 0, NULL, NULL),
(84, 1, '14F', 0, NULL, NULL),
(85, 1, '15A', 0, NULL, NULL),
(86, 1, '15B', 0, NULL, NULL),
(87, 1, '15C', 0, NULL, NULL),
(88, 1, '15D', 0, NULL, NULL),
(89, 1, '15E', 0, NULL, NULL),
(90, 1, '15F', 0, NULL, NULL),
(91, 2, '1A', 0, NULL, NULL),
(92, 2, '1B', 0, NULL, NULL),
(93, 2, '1C', 0, NULL, NULL),
(94, 2, '1D', 0, NULL, NULL),
(95, 2, '1E', 0, NULL, NULL),
(96, 2, '1F', 0, NULL, NULL),
(97, 2, '2A', 0, NULL, NULL),
(98, 2, '2B', 0, NULL, NULL),
(99, 2, '2C', 0, NULL, NULL),
(100, 2, '2D', 0, NULL, NULL),
(101, 2, '2E', 0, NULL, NULL),
(102, 2, '2F', 0, NULL, NULL),
(103, 2, '3A', 0, NULL, NULL),
(104, 2, '3B', 0, NULL, NULL),
(105, 2, '3C', 0, NULL, NULL),
(106, 2, '3D', 0, NULL, NULL),
(107, 2, '3E', 0, NULL, NULL),
(108, 2, '3F', 0, NULL, NULL),
(109, 2, '4A', 0, NULL, NULL),
(110, 2, '4B', 0, NULL, NULL),
(111, 2, '4C', 0, NULL, NULL),
(112, 2, '4D', 0, NULL, NULL),
(113, 2, '4E', 0, NULL, NULL),
(114, 2, '4F', 0, NULL, NULL),
(115, 2, '5A', 0, NULL, NULL),
(116, 2, '5B', 0, NULL, NULL),
(117, 2, '5C', 0, NULL, NULL),
(118, 2, '5D', 0, NULL, NULL),
(119, 2, '5E', 0, NULL, NULL),
(120, 2, '5F', 0, NULL, NULL),
(121, 2, '6A', 0, NULL, NULL),
(122, 2, '6B', 0, NULL, NULL),
(123, 2, '6C', 0, NULL, NULL),
(124, 2, '6D', 0, NULL, NULL),
(125, 2, '6E', 0, NULL, NULL),
(126, 2, '6F', 0, NULL, NULL),
(127, 2, '7A', 0, NULL, NULL),
(128, 2, '7B', 0, NULL, NULL),
(129, 2, '7C', 0, NULL, NULL),
(130, 2, '7D', 0, NULL, NULL),
(131, 2, '7E', 0, NULL, NULL),
(132, 2, '7F', 0, NULL, NULL),
(133, 2, '8A', 0, NULL, NULL),
(134, 2, '8B', 0, NULL, NULL),
(135, 2, '8C', 0, NULL, NULL),
(136, 2, '8D', 0, NULL, NULL),
(137, 2, '8E', 0, NULL, NULL),
(138, 2, '8F', 0, NULL, NULL),
(139, 2, '9A', 0, NULL, NULL),
(140, 2, '9B', 0, NULL, NULL),
(141, 2, '9C', 0, NULL, NULL),
(142, 2, '9D', 0, NULL, NULL),
(143, 2, '9E', 0, NULL, NULL),
(144, 2, '9F', 0, NULL, NULL),
(145, 2, '10A', 0, NULL, NULL),
(146, 2, '10B', 0, NULL, NULL),
(147, 2, '10C', 0, NULL, NULL),
(148, 2, '10D', 0, NULL, NULL),
(149, 2, '10E', 0, NULL, NULL),
(150, 2, '10F', 0, NULL, NULL),
(151, 2, '11A', 0, NULL, NULL),
(152, 2, '11B', 0, NULL, NULL),
(153, 2, '11C', 0, NULL, NULL),
(154, 2, '11D', 0, NULL, NULL),
(155, 2, '11E', 0, NULL, NULL),
(156, 2, '11F', 0, NULL, NULL),
(157, 2, '12A', 0, NULL, NULL),
(158, 2, '12B', 0, NULL, NULL),
(159, 2, '12C', 0, NULL, NULL),
(160, 2, '12D', 0, NULL, NULL),
(161, 2, '12E', 0, NULL, NULL),
(162, 2, '12F', 0, NULL, NULL),
(163, 2, '13A', 0, NULL, NULL),
(164, 2, '13B', 0, NULL, NULL),
(165, 2, '13C', 0, NULL, NULL),
(166, 2, '13D', 0, NULL, NULL),
(167, 2, '13E', 0, NULL, NULL),
(168, 2, '13F', 0, NULL, NULL),
(169, 2, '14A', 0, NULL, NULL),
(170, 2, '14B', 0, NULL, NULL),
(171, 2, '14C', 0, NULL, NULL),
(172, 2, '14D', 0, NULL, NULL),
(173, 2, '14E', 0, NULL, NULL),
(174, 2, '14F', 0, NULL, NULL),
(175, 2, '15A', 0, NULL, NULL),
(176, 2, '15B', 0, NULL, NULL),
(177, 2, '15C', 0, NULL, NULL),
(178, 2, '15D', 0, NULL, NULL),
(179, 2, '15E', 0, NULL, NULL),
(180, 2, '15F', 0, NULL, NULL),
(181, 2, '16A', 0, NULL, NULL),
(182, 2, '16B', 0, NULL, NULL),
(183, 2, '16C', 0, NULL, NULL),
(184, 2, '16D', 0, NULL, NULL),
(185, 2, '16E', 0, NULL, NULL),
(186, 2, '16F', 0, NULL, NULL),
(187, 2, '17A', 0, NULL, NULL),
(188, 2, '17B', 0, NULL, NULL),
(189, 2, '17C', 0, NULL, NULL),
(190, 2, '17D', 0, NULL, NULL),
(191, 2, '17E', 0, NULL, NULL),
(192, 2, '17F', 0, NULL, NULL),
(193, 2, '18A', 0, NULL, NULL),
(194, 2, '18B', 0, NULL, NULL),
(195, 2, '18C', 0, NULL, NULL),
(196, 2, '18D', 0, NULL, NULL),
(197, 2, '18E', 0, NULL, NULL),
(198, 2, '18F', 0, NULL, NULL),
(199, 2, '19A', 0, NULL, NULL),
(200, 2, '19B', 0, NULL, NULL),
(201, 2, '19C', 0, NULL, NULL),
(202, 2, '19D', 0, NULL, NULL),
(203, 2, '19E', 0, NULL, NULL),
(204, 2, '19F', 0, NULL, NULL),
(205, 2, '20A', 0, NULL, NULL),
(206, 2, '20B', 0, NULL, NULL),
(207, 2, '20C', 0, NULL, NULL),
(208, 2, '20D', 0, NULL, NULL),
(209, 2, '20E', 0, NULL, NULL),
(210, 2, '20F', 0, NULL, NULL),
(211, 3, '1A', 0, NULL, NULL),
(212, 3, '1B', 0, NULL, NULL),
(213, 3, '1C', 0, NULL, NULL),
(214, 3, '1D', 0, NULL, NULL),
(215, 3, '1E', 0, NULL, NULL),
(216, 3, '1F', 0, NULL, NULL),
(217, 3, '2A', 0, NULL, NULL),
(218, 3, '2B', 0, NULL, NULL),
(219, 3, '2C', 0, NULL, NULL),
(220, 3, '2D', 0, NULL, NULL),
(221, 3, '2E', 0, NULL, NULL),
(222, 3, '2F', 0, NULL, NULL),
(223, 3, '3A', 0, NULL, NULL),
(224, 3, '3B', 0, NULL, NULL),
(225, 3, '3C', 0, NULL, NULL),
(226, 3, '3D', 0, NULL, NULL),
(227, 3, '3E', 0, NULL, NULL),
(228, 3, '3F', 0, NULL, NULL),
(229, 3, '4A', 0, NULL, NULL),
(230, 3, '4B', 0, NULL, NULL),
(231, 3, '4C', 0, NULL, NULL),
(232, 3, '4D', 0, NULL, NULL),
(233, 3, '4E', 0, NULL, NULL),
(234, 3, '4F', 0, NULL, NULL),
(235, 3, '5A', 0, NULL, NULL),
(236, 3, '5B', 0, NULL, NULL),
(237, 3, '5C', 0, NULL, NULL),
(238, 3, '5D', 0, NULL, NULL),
(239, 3, '5E', 0, NULL, NULL),
(240, 3, '5F', 0, NULL, NULL),
(241, 3, '6A', 0, NULL, NULL),
(242, 3, '6B', 0, NULL, NULL),
(243, 3, '6C', 0, NULL, NULL),
(244, 3, '6D', 0, NULL, NULL),
(245, 3, '6E', 0, NULL, NULL),
(246, 3, '6F', 0, NULL, NULL),
(247, 3, '7A', 0, NULL, NULL),
(248, 3, '7B', 0, NULL, NULL),
(249, 3, '7C', 0, NULL, NULL),
(250, 3, '7D', 0, NULL, NULL),
(251, 3, '7E', 0, NULL, NULL),
(252, 3, '7F', 0, NULL, NULL),
(253, 3, '8A', 0, NULL, NULL),
(254, 3, '8B', 0, NULL, NULL),
(255, 3, '8C', 0, NULL, NULL),
(256, 3, '8D', 0, NULL, NULL),
(257, 3, '8E', 0, NULL, NULL),
(258, 3, '8F', 0, NULL, NULL),
(259, 3, '9A', 0, NULL, NULL),
(260, 3, '9B', 0, NULL, NULL),
(261, 3, '9C', 0, NULL, NULL),
(262, 3, '9D', 0, NULL, NULL),
(263, 3, '9E', 0, NULL, NULL),
(264, 3, '9F', 0, NULL, NULL),
(265, 3, '10A', 0, NULL, NULL),
(266, 3, '10B', 0, NULL, NULL),
(267, 3, '10C', 0, NULL, NULL),
(268, 3, '10D', 0, NULL, NULL),
(269, 3, '10E', 0, NULL, NULL),
(270, 3, '10F', 0, NULL, NULL),
(271, 3, '11A', 0, NULL, NULL),
(272, 3, '11B', 0, NULL, NULL),
(273, 3, '11C', 0, NULL, NULL),
(274, 3, '11D', 0, NULL, NULL),
(275, 3, '11E', 0, NULL, NULL),
(276, 3, '11F', 0, NULL, NULL),
(277, 3, '12A', 0, NULL, NULL),
(278, 3, '12B', 0, NULL, NULL),
(279, 3, '12C', 0, NULL, NULL),
(280, 3, '12D', 0, NULL, NULL),
(281, 3, '12E', 0, NULL, NULL),
(282, 3, '12F', 0, NULL, NULL),
(283, 3, '13A', 0, NULL, NULL),
(284, 3, '13B', 0, NULL, NULL),
(285, 3, '13C', 0, NULL, NULL),
(286, 3, '13D', 0, NULL, NULL),
(287, 3, '13E', 0, NULL, NULL),
(288, 3, '13F', 0, NULL, NULL),
(289, 3, '14A', 0, NULL, NULL),
(290, 3, '14B', 0, NULL, NULL),
(291, 3, '14C', 0, NULL, NULL),
(292, 3, '14D', 0, NULL, NULL),
(293, 3, '14E', 0, NULL, NULL),
(294, 3, '14F', 0, NULL, NULL),
(295, 3, '15A', 0, NULL, NULL),
(296, 3, '15B', 0, NULL, NULL),
(297, 3, '15C', 0, NULL, NULL),
(298, 3, '15D', 0, NULL, NULL),
(299, 3, '15E', 0, NULL, NULL),
(300, 3, '15F', 0, NULL, NULL),
(301, 3, '16A', 0, NULL, NULL),
(302, 3, '16B', 0, NULL, NULL),
(303, 3, '16C', 0, NULL, NULL),
(304, 3, '16D', 0, NULL, NULL),
(305, 3, '16E', 0, NULL, NULL),
(306, 3, '16F', 0, NULL, NULL),
(307, 3, '17A', 0, NULL, NULL),
(308, 3, '17B', 0, NULL, NULL),
(309, 3, '17C', 0, NULL, NULL),
(310, 3, '17D', 0, NULL, NULL),
(311, 3, '17E', 0, NULL, NULL),
(312, 3, '17F', 0, NULL, NULL),
(313, 3, '18A', 0, NULL, NULL),
(314, 3, '18B', 0, NULL, NULL),
(315, 3, '18C', 0, NULL, NULL),
(316, 3, '18D', 0, NULL, NULL),
(317, 3, '18E', 0, NULL, NULL),
(318, 3, '18F', 0, NULL, NULL),
(319, 3, '19A', 0, NULL, NULL),
(320, 3, '19B', 0, NULL, NULL),
(321, 3, '19C', 0, NULL, NULL),
(322, 3, '19D', 0, NULL, NULL),
(323, 3, '19E', 0, NULL, NULL),
(324, 3, '19F', 0, NULL, NULL),
(325, 3, '20A', 0, NULL, NULL),
(326, 3, '20B', 0, NULL, NULL),
(327, 3, '20C', 0, NULL, NULL),
(328, 3, '20D', 0, NULL, NULL),
(329, 3, '20E', 0, NULL, NULL),
(330, 3, '20F', 0, NULL, NULL),
(331, 4, '1A', 0, NULL, NULL),
(332, 4, '1B', 0, NULL, NULL),
(333, 4, '1C', 0, NULL, NULL),
(334, 4, '1D', 0, NULL, NULL),
(335, 4, '1E', 0, NULL, NULL),
(336, 4, '1F', 0, NULL, NULL),
(337, 4, '2A', 0, NULL, NULL),
(338, 4, '2B', 0, NULL, NULL),
(339, 4, '2C', 0, NULL, NULL),
(340, 4, '2D', 0, NULL, NULL),
(341, 4, '2E', 0, NULL, NULL),
(342, 4, '2F', 0, NULL, NULL),
(343, 4, '3A', 0, NULL, NULL),
(344, 4, '3B', 0, NULL, NULL),
(345, 4, '3C', 0, NULL, NULL),
(346, 4, '3D', 0, NULL, NULL),
(347, 4, '3E', 0, NULL, NULL),
(348, 4, '3F', 0, NULL, NULL),
(349, 4, '4A', 0, NULL, NULL),
(350, 4, '4B', 0, NULL, NULL),
(351, 4, '4C', 0, NULL, NULL),
(352, 4, '4D', 0, NULL, NULL),
(353, 4, '4E', 0, NULL, NULL),
(354, 4, '4F', 0, NULL, NULL),
(355, 4, '5A', 0, NULL, NULL),
(356, 4, '5B', 0, NULL, NULL),
(357, 4, '5C', 0, NULL, NULL),
(358, 4, '5D', 0, NULL, NULL),
(359, 4, '5E', 0, NULL, NULL),
(360, 4, '5F', 0, NULL, NULL),
(361, 4, '6A', 0, NULL, NULL),
(362, 4, '6B', 0, NULL, NULL),
(363, 4, '6C', 0, NULL, NULL),
(364, 4, '6D', 0, NULL, NULL),
(365, 4, '6E', 0, NULL, NULL),
(366, 4, '6F', 0, NULL, NULL),
(367, 4, '7A', 0, NULL, NULL),
(368, 4, '7B', 0, NULL, NULL),
(369, 4, '7C', 0, NULL, NULL),
(370, 4, '7D', 0, NULL, NULL),
(371, 4, '7E', 0, NULL, NULL),
(372, 4, '7F', 0, NULL, NULL),
(373, 4, '8A', 0, NULL, NULL),
(374, 4, '8B', 0, NULL, NULL),
(375, 4, '8C', 0, NULL, NULL),
(376, 4, '8D', 0, NULL, NULL),
(377, 4, '8E', 0, NULL, NULL),
(378, 4, '8F', 0, NULL, NULL),
(379, 4, '9A', 0, NULL, NULL),
(380, 4, '9B', 0, NULL, NULL),
(381, 4, '9C', 0, NULL, NULL),
(382, 4, '9D', 0, NULL, NULL),
(383, 4, '9E', 0, NULL, NULL),
(384, 4, '9F', 0, NULL, NULL),
(385, 4, '10A', 0, NULL, NULL),
(386, 4, '10B', 0, NULL, NULL),
(387, 4, '10C', 0, NULL, NULL),
(388, 4, '10D', 0, NULL, NULL),
(389, 4, '10E', 0, NULL, NULL),
(390, 4, '10F', 0, NULL, NULL),
(391, 4, '11A', 0, NULL, NULL),
(392, 4, '11B', 0, NULL, NULL),
(393, 4, '11C', 0, NULL, NULL),
(394, 4, '11D', 0, NULL, NULL),
(395, 4, '11E', 0, NULL, NULL),
(396, 4, '11F', 0, NULL, NULL),
(397, 4, '12A', 0, NULL, NULL),
(398, 4, '12B', 0, NULL, NULL),
(399, 4, '12C', 0, NULL, NULL),
(400, 4, '12D', 0, NULL, NULL),
(401, 4, '12E', 0, NULL, NULL),
(402, 4, '12F', 0, NULL, NULL),
(403, 4, '13A', 0, NULL, NULL),
(404, 4, '13B', 0, NULL, NULL),
(405, 4, '13C', 0, NULL, NULL),
(406, 4, '13D', 0, NULL, NULL),
(407, 4, '13E', 0, NULL, NULL),
(408, 4, '13F', 0, NULL, NULL),
(409, 4, '14A', 0, NULL, NULL),
(410, 4, '14B', 0, NULL, NULL),
(411, 4, '14C', 0, NULL, NULL),
(412, 4, '14D', 0, NULL, NULL),
(413, 4, '14E', 0, NULL, NULL),
(414, 4, '14F', 0, NULL, NULL),
(415, 4, '15A', 0, NULL, NULL),
(416, 4, '15B', 0, NULL, NULL),
(417, 4, '15C', 0, NULL, NULL),
(418, 4, '15D', 0, NULL, NULL),
(419, 4, '15E', 0, NULL, NULL),
(420, 4, '15F', 0, NULL, NULL),
(421, 4, '16A', 0, NULL, NULL),
(422, 4, '16B', 0, NULL, NULL),
(423, 4, '16C', 0, NULL, NULL),
(424, 4, '16D', 0, NULL, NULL),
(425, 4, '16E', 0, NULL, NULL),
(426, 4, '16F', 0, NULL, NULL),
(427, 4, '17A', 0, NULL, NULL),
(428, 4, '17B', 0, NULL, NULL),
(429, 4, '17C', 0, NULL, NULL),
(430, 4, '17D', 0, NULL, NULL),
(431, 4, '17E', 0, NULL, NULL),
(432, 4, '17F', 0, NULL, NULL),
(433, 4, '18A', 0, NULL, NULL),
(434, 4, '18B', 0, NULL, NULL),
(435, 4, '18C', 0, NULL, NULL),
(436, 4, '18D', 0, NULL, NULL),
(437, 4, '18E', 0, NULL, NULL),
(438, 4, '18F', 0, NULL, NULL),
(439, 4, '19A', 0, NULL, NULL),
(440, 4, '19B', 0, NULL, NULL),
(441, 4, '19C', 0, NULL, NULL),
(442, 4, '19D', 0, NULL, NULL),
(443, 4, '19E', 0, NULL, NULL),
(444, 4, '19F', 0, NULL, NULL),
(445, 4, '20A', 0, NULL, NULL),
(446, 4, '20B', 0, NULL, NULL),
(447, 4, '20C', 0, NULL, NULL),
(448, 4, '20D', 0, NULL, NULL),
(449, 4, '20E', 0, NULL, NULL),
(450, 4, '20F', 0, NULL, NULL),
(451, 4, '21A', 0, NULL, NULL),
(452, 4, '21B', 0, NULL, NULL),
(453, 4, '21C', 0, NULL, NULL),
(454, 4, '21D', 0, NULL, NULL),
(455, 4, '21E', 0, NULL, NULL),
(456, 4, '21F', 0, NULL, NULL),
(457, 4, '22A', 0, NULL, NULL),
(458, 4, '22B', 0, NULL, NULL),
(459, 4, '22C', 0, NULL, NULL),
(460, 4, '22D', 0, NULL, NULL),
(461, 4, '22E', 0, NULL, NULL),
(462, 4, '22F', 0, NULL, NULL),
(715, 7, '1A', 1, 5, '2026-01-19 18:27:35'),
(716, 7, '1B', 0, NULL, NULL),
(717, 7, '1C', 0, NULL, NULL),
(718, 7, '1D', 0, NULL, NULL),
(719, 7, '1E', 0, NULL, NULL),
(720, 7, '1F', 0, NULL, NULL),
(721, 7, '2A', 0, NULL, NULL),
(722, 7, '2B', 0, NULL, NULL),
(723, 7, '2C', 0, NULL, NULL),
(724, 7, '2D', 0, NULL, NULL),
(725, 7, '2E', 0, NULL, NULL),
(726, 7, '2F', 0, NULL, NULL),
(727, 7, '3A', 0, NULL, NULL),
(728, 7, '3B', 1, 7, '2026-01-20 21:44:36'),
(729, 7, '3C', 0, NULL, NULL),
(730, 7, '3D', 0, NULL, NULL),
(731, 7, '3E', 0, NULL, NULL),
(732, 7, '3F', 0, NULL, NULL),
(733, 7, '4A', 0, NULL, NULL),
(734, 7, '4B', 0, NULL, NULL),
(735, 7, '4C', 0, NULL, NULL),
(736, 7, '4D', 0, NULL, NULL),
(737, 7, '4E', 0, NULL, NULL),
(738, 7, '4F', 0, NULL, NULL),
(739, 7, '5A', 0, NULL, NULL),
(740, 7, '5B', 0, NULL, NULL),
(741, 7, '5C', 0, NULL, NULL),
(742, 7, '5D', 0, NULL, NULL),
(743, 7, '5E', 0, NULL, NULL),
(744, 7, '5F', 0, NULL, NULL),
(745, 7, '6A', 0, NULL, NULL),
(746, 7, '6B', 0, NULL, NULL),
(747, 7, '6C', 0, NULL, NULL),
(748, 7, '6D', 0, NULL, NULL),
(749, 7, '6E', 0, NULL, NULL),
(750, 7, '6F', 0, NULL, NULL),
(751, 7, '7A', 0, NULL, NULL),
(752, 7, '7B', 0, NULL, NULL),
(753, 7, '7C', 0, NULL, NULL),
(754, 7, '7D', 0, NULL, NULL),
(755, 7, '7E', 0, NULL, NULL),
(756, 7, '7F', 0, NULL, NULL),
(757, 7, '8A', 0, NULL, NULL),
(758, 7, '8B', 0, NULL, NULL),
(759, 7, '8C', 0, NULL, NULL),
(760, 7, '8D', 0, NULL, NULL),
(761, 7, '8E', 0, NULL, NULL),
(762, 7, '8F', 0, NULL, NULL),
(763, 7, '9A', 0, NULL, NULL),
(764, 7, '9B', 0, NULL, NULL),
(765, 7, '9C', 0, NULL, NULL),
(766, 7, '9D', 0, NULL, NULL),
(767, 7, '9E', 0, NULL, NULL),
(768, 7, '9F', 0, NULL, NULL),
(769, 7, '10A', 0, NULL, NULL),
(770, 7, '10B', 0, NULL, NULL),
(771, 7, '10C', 0, NULL, NULL),
(772, 7, '10D', 0, NULL, NULL),
(773, 7, '10E', 0, NULL, NULL),
(774, 7, '10F', 0, NULL, NULL),
(775, 7, '11A', 0, NULL, NULL),
(776, 7, '11B', 0, NULL, NULL),
(777, 7, '11C', 0, NULL, NULL),
(778, 7, '11D', 0, NULL, NULL),
(779, 7, '11E', 0, NULL, NULL),
(780, 7, '11F', 0, NULL, NULL),
(781, 7, '12A', 0, NULL, NULL),
(782, 7, '12B', 0, NULL, NULL),
(783, 7, '12C', 0, NULL, NULL),
(784, 7, '12D', 0, NULL, NULL),
(785, 7, '12E', 0, NULL, NULL),
(786, 7, '12F', 0, NULL, NULL),
(787, 7, '13A', 0, NULL, NULL),
(788, 7, '13B', 0, NULL, NULL),
(789, 7, '13C', 0, NULL, NULL),
(790, 7, '13D', 0, NULL, NULL),
(791, 7, '13E', 0, NULL, NULL),
(792, 7, '13F', 0, NULL, NULL),
(793, 7, '14A', 0, NULL, NULL),
(794, 7, '14B', 0, NULL, NULL),
(795, 7, '14C', 0, NULL, NULL),
(796, 7, '14D', 0, NULL, NULL),
(797, 7, '14E', 0, NULL, NULL),
(798, 7, '14F', 0, NULL, NULL),
(799, 7, '15A', 0, NULL, NULL),
(800, 7, '15B', 0, NULL, NULL),
(801, 7, '15C', 0, NULL, NULL),
(802, 7, '15D', 0, NULL, NULL),
(803, 7, '15E', 0, NULL, NULL),
(804, 7, '15F', 0, NULL, NULL),
(805, 7, '16A', 0, NULL, NULL),
(806, 7, '16B', 0, NULL, NULL),
(807, 7, '16C', 0, NULL, NULL),
(808, 7, '16D', 0, NULL, NULL),
(809, 7, '16E', 0, NULL, NULL),
(810, 7, '16F', 0, NULL, NULL),
(811, 7, '17A', 0, NULL, NULL),
(812, 7, '17B', 0, NULL, NULL),
(813, 7, '17C', 0, NULL, NULL),
(814, 7, '17D', 0, NULL, NULL),
(815, 7, '17E', 0, NULL, NULL),
(816, 7, '17F', 0, NULL, NULL),
(817, 7, '18A', 0, NULL, NULL),
(818, 7, '18B', 0, NULL, NULL),
(819, 7, '18C', 0, NULL, NULL),
(820, 7, '18D', 0, NULL, NULL),
(821, 7, '18E', 0, NULL, NULL),
(822, 7, '18F', 0, NULL, NULL),
(823, 7, '19A', 0, NULL, NULL),
(824, 7, '19B', 0, NULL, NULL),
(825, 7, '19C', 0, NULL, NULL),
(826, 7, '19D', 0, NULL, NULL),
(827, 7, '19E', 0, NULL, NULL),
(828, 7, '19F', 0, NULL, NULL),
(829, 7, '20A', 0, NULL, NULL),
(830, 7, '20B', 0, NULL, NULL),
(831, 7, '20C', 0, NULL, NULL),
(832, 7, '20D', 0, NULL, NULL),
(833, 7, '20E', 0, NULL, NULL),
(834, 7, '20F', 0, NULL, NULL),
(835, 7, '21A', 0, NULL, NULL),
(836, 7, '21B', 0, NULL, NULL),
(837, 7, '21C', 0, NULL, NULL),
(838, 7, '21D', 0, NULL, NULL),
(839, 7, '21E', 0, NULL, NULL),
(840, 7, '21F', 0, NULL, NULL),
(841, 7, '22A', 0, NULL, NULL),
(842, 7, '22B', 0, NULL, NULL),
(843, 7, '22C', 0, NULL, NULL),
(844, 7, '22D', 0, NULL, NULL),
(845, 7, '22E', 0, NULL, NULL),
(846, 7, '22F', 0, NULL, NULL),
(847, 7, '23A', 0, NULL, NULL),
(848, 7, '23B', 0, NULL, NULL),
(849, 7, '23C', 0, NULL, NULL),
(850, 7, '23D', 0, NULL, NULL),
(851, 7, '23E', 0, NULL, NULL),
(852, 7, '23F', 0, NULL, NULL),
(853, 7, '24A', 0, NULL, NULL),
(854, 7, '24B', 0, NULL, NULL),
(855, 7, '24C', 0, NULL, NULL),
(856, 7, '24D', 0, NULL, NULL),
(857, 7, '24E', 0, NULL, NULL),
(858, 7, '24F', 0, NULL, NULL),
(859, 7, '25A', 0, NULL, NULL),
(860, 7, '25B', 0, NULL, NULL),
(861, 7, '25C', 0, NULL, NULL),
(862, 7, '25D', 0, NULL, NULL),
(863, 7, '25E', 0, NULL, NULL),
(864, 7, '25F', 0, NULL, NULL),
(865, 7, '26A', 0, NULL, NULL),
(866, 7, '26B', 0, NULL, NULL),
(867, 7, '26C', 0, NULL, NULL),
(868, 7, '26D', 0, NULL, NULL),
(869, 7, '26E', 0, NULL, NULL),
(870, 7, '26F', 0, NULL, NULL),
(871, 7, '27A', 0, NULL, NULL),
(872, 7, '27B', 0, NULL, NULL),
(873, 7, '27C', 0, NULL, NULL),
(874, 7, '27D', 0, NULL, NULL),
(875, 7, '27E', 0, NULL, NULL),
(876, 7, '27F', 0, NULL, NULL),
(877, 7, '28A', 0, NULL, NULL),
(878, 7, '28B', 0, NULL, NULL),
(879, 7, '28C', 0, NULL, NULL),
(880, 7, '28D', 0, NULL, NULL),
(881, 7, '28E', 0, NULL, NULL),
(882, 7, '28F', 0, NULL, NULL),
(883, 7, '29A', 0, NULL, NULL),
(884, 7, '29B', 0, NULL, NULL),
(885, 7, '29C', 0, NULL, NULL),
(886, 7, '29D', 0, NULL, NULL),
(887, 7, '29E', 0, NULL, NULL),
(888, 7, '29F', 0, NULL, NULL),
(889, 7, '30A', 0, NULL, NULL),
(890, 7, '30B', 0, NULL, NULL),
(891, 7, '30C', 0, NULL, NULL),
(892, 7, '30D', 0, NULL, NULL),
(893, 7, '30E', 0, NULL, NULL),
(894, 7, '30F', 0, NULL, NULL),
(895, 7, '31A', 0, NULL, NULL),
(896, 7, '31B', 0, NULL, NULL),
(897, 7, '31C', 0, NULL, NULL),
(898, 7, '31D', 0, NULL, NULL),
(899, 7, '31E', 0, NULL, NULL),
(900, 7, '31F', 0, NULL, NULL),
(901, 7, '32A', 0, NULL, NULL),
(902, 7, '32B', 0, NULL, NULL),
(903, 7, '32C', 0, NULL, NULL),
(904, 7, '32D', 0, NULL, NULL),
(905, 7, '32E', 0, NULL, NULL),
(906, 7, '32F', 0, NULL, NULL),
(1057, 9, '1A', 0, NULL, NULL),
(1058, 9, '1B', 0, NULL, NULL),
(1059, 9, '1C', 0, NULL, NULL),
(1060, 9, '1D', 0, NULL, NULL),
(1061, 9, '1E', 0, NULL, NULL),
(1062, 9, '1F', 0, NULL, NULL),
(1063, 9, '2A', 0, NULL, NULL),
(1064, 9, '2B', 0, NULL, NULL),
(1065, 9, '2C', 0, NULL, NULL),
(1066, 9, '2D', 0, NULL, NULL),
(1067, 9, '2E', 0, NULL, NULL),
(1068, 9, '2F', 0, NULL, NULL),
(1069, 9, '3A', 0, NULL, NULL),
(1070, 9, '3B', 0, NULL, NULL),
(1071, 9, '3C', 0, NULL, NULL),
(1072, 9, '3D', 0, NULL, NULL),
(1073, 9, '3E', 0, NULL, NULL),
(1074, 9, '3F', 0, NULL, NULL),
(1075, 9, '4A', 0, NULL, NULL),
(1076, 9, '4B', 0, NULL, NULL),
(1077, 9, '4C', 0, NULL, NULL),
(1078, 9, '4D', 0, NULL, NULL),
(1079, 9, '4E', 0, NULL, NULL),
(1080, 9, '4F', 0, NULL, NULL),
(1081, 9, '5A', 0, NULL, NULL),
(1082, 9, '5B', 0, NULL, NULL),
(1083, 9, '5C', 0, NULL, NULL),
(1084, 9, '5D', 0, NULL, NULL),
(1085, 9, '5E', 0, NULL, NULL),
(1086, 9, '5F', 0, NULL, NULL),
(1087, 9, '6A', 0, NULL, NULL),
(1088, 9, '6B', 0, NULL, NULL),
(1089, 9, '6C', 0, NULL, NULL),
(1090, 9, '6D', 0, NULL, NULL),
(1091, 9, '6E', 0, NULL, NULL),
(1092, 9, '6F', 0, NULL, NULL),
(1093, 9, '7A', 0, NULL, NULL),
(1094, 9, '7B', 0, NULL, NULL),
(1095, 9, '7C', 0, NULL, NULL),
(1096, 9, '7D', 0, NULL, NULL),
(1097, 9, '7E', 0, NULL, NULL),
(1098, 9, '7F', 0, NULL, NULL),
(1099, 9, '8A', 0, NULL, NULL),
(1100, 9, '8B', 0, NULL, NULL),
(1101, 9, '8C', 0, NULL, NULL),
(1102, 9, '8D', 0, NULL, NULL),
(1103, 9, '8E', 0, NULL, NULL),
(1104, 9, '8F', 0, NULL, NULL),
(1105, 9, '9A', 0, NULL, NULL),
(1106, 9, '9B', 0, NULL, NULL),
(1107, 9, '9C', 0, NULL, NULL),
(1108, 9, '9D', 0, NULL, NULL),
(1109, 9, '9E', 0, NULL, NULL),
(1110, 9, '9F', 0, NULL, NULL),
(1111, 9, '10A', 0, NULL, NULL),
(1112, 9, '10B', 0, NULL, NULL),
(1113, 9, '10C', 0, NULL, NULL),
(1114, 9, '10D', 0, NULL, NULL),
(1115, 9, '10E', 0, NULL, NULL),
(1116, 9, '10F', 0, NULL, NULL),
(1117, 9, '11A', 0, NULL, NULL),
(1118, 9, '11B', 0, NULL, NULL),
(1119, 9, '11C', 0, NULL, NULL),
(1120, 9, '11D', 0, NULL, NULL),
(1121, 9, '11E', 0, NULL, NULL),
(1122, 9, '11F', 0, NULL, NULL),
(1123, 9, '12A', 0, NULL, NULL),
(1124, 9, '12B', 0, NULL, NULL),
(1125, 9, '12C', 0, NULL, NULL),
(1126, 9, '12D', 0, NULL, NULL),
(1127, 9, '12E', 0, NULL, NULL),
(1128, 9, '12F', 0, NULL, NULL),
(1129, 9, '13A', 0, NULL, NULL),
(1130, 9, '13B', 0, NULL, NULL),
(1131, 9, '13C', 0, NULL, NULL),
(1132, 9, '13D', 0, NULL, NULL),
(1133, 9, '13E', 0, NULL, NULL),
(1134, 9, '13F', 0, NULL, NULL),
(1135, 9, '14A', 0, NULL, NULL),
(1136, 9, '14B', 0, NULL, NULL),
(1137, 9, '14C', 0, NULL, NULL),
(1138, 9, '14D', 0, NULL, NULL),
(1139, 9, '14E', 0, NULL, NULL),
(1140, 9, '14F', 0, NULL, NULL),
(1141, 9, '15A', 0, NULL, NULL),
(1142, 9, '15B', 0, NULL, NULL),
(1143, 9, '15C', 0, NULL, NULL),
(1144, 9, '15D', 0, NULL, NULL),
(1145, 9, '15E', 0, NULL, NULL),
(1146, 9, '15F', 0, NULL, NULL),
(1147, 9, '16A', 0, NULL, NULL),
(1148, 9, '16B', 0, NULL, NULL),
(1149, 9, '16C', 0, NULL, NULL),
(1150, 9, '16D', 0, NULL, NULL),
(1151, 9, '16E', 0, NULL, NULL),
(1152, 9, '16F', 0, NULL, NULL),
(1153, 9, '17A', 0, NULL, NULL),
(1154, 9, '17B', 0, NULL, NULL),
(1155, 9, '17C', 0, NULL, NULL),
(1156, 9, '17D', 0, NULL, NULL),
(1157, 9, '17E', 0, NULL, NULL),
(1158, 9, '17F', 0, NULL, NULL),
(1159, 9, '18A', 0, NULL, NULL),
(1160, 9, '18B', 0, NULL, NULL),
(1161, 9, '18C', 0, NULL, NULL),
(1162, 9, '18D', 0, NULL, NULL),
(1163, 9, '18E', 0, NULL, NULL),
(1164, 9, '18F', 0, NULL, NULL),
(1165, 9, '19A', 0, NULL, NULL),
(1166, 9, '19B', 0, NULL, NULL),
(1167, 9, '19C', 0, NULL, NULL),
(1168, 9, '19D', 0, NULL, NULL),
(1169, 9, '19E', 0, NULL, NULL),
(1170, 9, '19F', 0, NULL, NULL),
(1171, 9, '20A', 0, NULL, NULL),
(1172, 9, '20B', 0, NULL, NULL),
(1173, 9, '20C', 0, NULL, NULL),
(1174, 9, '20D', 0, NULL, NULL),
(1175, 9, '20E', 0, NULL, NULL),
(1176, 9, '20F', 0, NULL, NULL),
(1177, 9, '21A', 0, NULL, NULL),
(1178, 9, '21B', 0, NULL, NULL),
(1179, 9, '21C', 0, NULL, NULL),
(1180, 9, '21D', 0, NULL, NULL),
(1181, 9, '21E', 0, NULL, NULL),
(1182, 9, '21F', 0, NULL, NULL),
(1183, 9, '22A', 0, NULL, NULL),
(1184, 9, '22B', 0, NULL, NULL),
(1185, 9, '22C', 0, NULL, NULL),
(1186, 9, '22D', 0, NULL, NULL),
(1187, 9, '22E', 0, NULL, NULL),
(1188, 9, '22F', 0, NULL, NULL),
(1189, 9, '23A', 0, NULL, NULL),
(1190, 9, '23B', 0, NULL, NULL),
(1191, 9, '23C', 0, NULL, NULL),
(1192, 9, '23D', 0, NULL, NULL),
(1193, 9, '23E', 0, NULL, NULL),
(1194, 9, '23F', 0, NULL, NULL),
(1195, 9, '24A', 0, NULL, NULL),
(1196, 9, '24B', 0, NULL, NULL),
(1197, 9, '24C', 0, NULL, NULL),
(1198, 9, '24D', 0, NULL, NULL),
(1199, 9, '24E', 0, NULL, NULL),
(1200, 9, '24F', 0, NULL, NULL),
(1201, 9, '25A', 0, NULL, NULL),
(1202, 9, '25B', 0, NULL, NULL),
(1203, 9, '25C', 0, NULL, NULL),
(1204, 9, '25D', 0, NULL, NULL),
(1205, 9, '25E', 0, NULL, NULL),
(1206, 9, '25F', 0, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `booking_reference` (`booking_reference`),
  ADD KEY `passenger_id` (`passenger_id`),
  ADD KEY `flight_id` (`flight_id`),
  ADD KEY `original_booking_id` (`original_booking_id`);

--
-- Indexes for table `flights`
--
ALTER TABLE `flights`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `flight_number` (`flight_number`);

--
-- Indexes for table `passengers`
--
ALTER TABLE `passengers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `passport_number` (`passport_number`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `booking_id` (`booking_id`);

--
-- Indexes for table `seat_assignments`
--
ALTER TABLE `seat_assignments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `flight_seat` (`flight_id`,`seat_number`),
  ADD KEY `booking_id` (`booking_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `flights`
--
ALTER TABLE `flights`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `passengers`
--
ALTER TABLE `passengers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `seat_assignments`
--
ALTER TABLE `seat_assignments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1207;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`passenger_id`) REFERENCES `passengers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`flight_id`) REFERENCES `flights` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_3` FOREIGN KEY (`original_booking_id`) REFERENCES `bookings` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `seat_assignments`
--
ALTER TABLE `seat_assignments`
  ADD CONSTRAINT `seat_assignments_ibfk_1` FOREIGN KEY (`flight_id`) REFERENCES `flights` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `seat_assignments_ibfk_2` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
