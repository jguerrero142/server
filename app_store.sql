-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 14-09-2021 a las 21:35:07
-- Versión del servidor: 5.7.31
-- Versión de PHP: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `app_store`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `enterprise`
--

DROP TABLE IF EXISTS `enterprise`;
CREATE TABLE IF NOT EXISTS `enterprise` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `name_enterprise` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `enterprise`
--

INSERT INTO `enterprise` (`id`, `name_enterprise`, `create_at`) VALUES
(1, 'lostreseditores', '2021-09-14 13:19:55');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

DROP TABLE IF EXISTS `factura`;
CREATE TABLE IF NOT EXISTS `factura` (
  `id_factura` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `valor` int(11) NOT NULL,
  `estado` tinyint(1) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `observacion` varchar(250) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`id_factura`),
  UNIQUE KEY `id_factura` (`id_factura`),
  KEY `id_user` (`id_user`),
  KEY `id_pedido` (`id_pedido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `game`
--

DROP TABLE IF EXISTS `game`;
CREATE TABLE IF NOT EXISTS `game` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(180) COLLATE utf8_spanish_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `image` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `game`
--

INSERT INTO `game` (`id`, `title`, `description`, `image`, `created_at`) VALUES
(1, 'free fire', 'xiaomi', 'https://depor.com/resizer/D6DbtUwCx7Pw7ZfvzO0YZGDBUhM=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/KI72CKUOHBF4RLJO7EBCR75SKA.jpg', '2021-04-01 20:43:44'),
(7, 'gtaV', 'epic games', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHuGDCu0cJnETp5DRU2Us9cFE5SxXzDcFxoA&usqp=CAU', '2021-04-03 21:12:51'),
(8, 'gohan', 'ojito', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_I1LupNsIrn70VIFeURf0QrjTImwUcglNKg&usqp=CAU', '2021-04-03 20:46:45'),
(5, 'gohan', 'ojito', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_I1LupNsIrn70VIFeURf0QrjTImwUcglNKg&usqp=CAU', '2021-04-03 20:46:45'),
(9, 'gohan', 'ojito', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_I1LupNsIrn70VIFeURf0QrjTImwUcglNKg&usqp=CAU', '2021-04-03 20:46:45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

DROP TABLE IF EXISTS `pedido`;
CREATE TABLE IF NOT EXISTS `pedido` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `valor` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `estado_ped` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

DROP TABLE IF EXISTS `producto`;
CREATE TABLE IF NOT EXISTS `producto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(120) COLLATE utf8_spanish_ci NOT NULL,
  `valor` int(12) NOT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `image` varchar(220) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` varchar(220) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `name`, `valor`, `create_at`, `image`, `descripcion`) VALUES
(2, 'Jugo de lulo', 10000, '2021-05-01 02:47:43', 'https://depor.com/resizer/D6DbtUwCx7Pw7ZfvzO0YZGDBUhM=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/KI72CKUOHBF4RLJO7EBCR75SKA.jpg', 'Delicioso jugo de lulo'),
(3, 'Jugo de mango', 5000, '2021-05-01 02:47:43', 'https://depor.com/resizer/D6DbtUwCx7Pw7ZfvzO0YZGDBUhM=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/KI72CKUOHBF4RLJO7EBCR75SKA.jpg', 'Delicioso jugo de mango con mango'),
(4, 'Jugo de fresa', 10000, '2021-05-01 02:47:43', 'https://depor.com/resizer/D6DbtUwCx7Pw7ZfvzO0YZGDBUhM=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/KI72CKUOHBF4RLJO7EBCR75SKA.jpg', 'Delicioso jugo de fresa con fresa'),
(5, 'Jugo de maracuya', 10000, '2021-05-01 02:47:43', 'https://depor.com/resizer/D6DbtUwCx7Pw7ZfvzO0YZGDBUhM=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/KI72CKUOHBF4RLJO7EBCR75SKA.jpg', 'Delicioso jugo de maracuya con maracuya'),
(6, 'Jugo de maracuya', 10000, '2021-05-01 02:47:43', 'https://depor.com/resizer/D6DbtUwCx7Pw7ZfvzO0YZGDBUhM=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/KI72CKUOHBF4RLJO7EBCR75SKA.jpg', 'Delicioso jugo de maracuya con maracuya');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role_user`
--

DROP TABLE IF EXISTS `role_user`;
CREATE TABLE IF NOT EXISTS `role_user` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `name_role` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `role_user`
--

INSERT INTO `role_user` (`id`, `name_role`, `create_at`) VALUES
(1, 'super_admin', '2021-09-14 13:26:33'),
(2, 'admin', '2021-09-14 13:26:33'),
(3, 'user', '2021-09-14 13:26:33'),
(4, 'enterprise', '2021-09-14 13:26:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ticket`
--

DROP TABLE IF EXISTS `ticket`;
CREATE TABLE IF NOT EXISTS `ticket` (
  `id_ticket` int(11) NOT NULL AUTO_INCREMENT,
  `user_ticket` int(11) NOT NULL,
  `producto` int(11) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_pedido` int(11) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_ticket`),
  KEY `producto` (`producto`),
  KEY `user_ticket` (`user_ticket`),
  KEY `id_pedido` (`id_pedido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `sub` varchar(220) COLLATE utf8_spanish_ci NOT NULL,
  `name` varchar(220) COLLATE utf8_spanish_ci NOT NULL,
  `picture` varchar(220) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(120) COLLATE utf8_spanish_ci NOT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `given_name` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `family_name` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `nickname` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `locale` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `updated_at` varchar(120) COLLATE utf8_spanish_ci NOT NULL,
  `email_verified` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `role` int(11) DEFAULT '3',
  `id_empresa` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `sub` (`sub`),
  UNIQUE KEY `role` (`role`),
  KEY `id_empresa` (`id_empresa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `factura_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `factura_ibfk_2` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id`);

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Filtros para la tabla `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`user_ticket`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`producto`) REFERENCES `producto` (`id`),
  ADD CONSTRAINT `ticket_ibfk_3` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id`);

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_3` FOREIGN KEY (`role`) REFERENCES `role_user` (`id`),
  ADD CONSTRAINT `user_ibfk_4` FOREIGN KEY (`id_empresa`) REFERENCES `enterprise` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
