-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le :  ven. 17 avr. 2020 à 17:58
-- Version du serveur :  8.0.18
-- Version de PHP :  7.3.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `matcha`
--

-- --------------------------------------------------------

--
-- Structure de la table `blocked`
--

CREATE TABLE `blocked` (
  `id` int(11) NOT NULL,
  `id_user1` int(11) NOT NULL,
  `id_user2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `blocked`
--

-- INSERT INTO `blocked` (`id`, `id_user1`, `id_user2`) VALUES
-- (1, 50, 53),
-- (2, 50, 52),
-- (3, 50, 52);

-- --------------------------------------------------------

--
-- Structure de la table `interest`
--

CREATE TABLE `interest` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_interest_list` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `interest`
--

-- INSERT INTO `interest` (`id`, `id_user`, `id_interest_list`) VALUES
-- (3, 50, 3),
-- (4, 50, 4),
-- (5, 50, 5),
-- (8, 50, 7),
-- (9, 50, 8),
-- (10, 50, 9),
-- (11, 50, 10);

-- --------------------------------------------------------

--
-- Structure de la table `interest_list`
--

CREATE TABLE `interest_list` (
  `id` int(11) NOT NULL,
  `interest` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `interest_list`
--

-- INSERT INTO `interest_list` (`id`, `interest`) VALUES
-- (1, '\'ma\\\'ma\''),
-- (2, '\'ok\\\'l\''),
-- (3, 'ma\'ma'),
-- (4, 'ok\'l'),
-- (5, 'lokl'),
-- (6, ' '),
-- (7, 'aa'),
-- (8, 'ok'),
-- (9, 'lol'),
-- (10, 'pute');

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `id_user1` int(11) NOT NULL,
  `id_user2` int(11) NOT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `notification`
--

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `id_user1` int(11) NOT NULL,
  `id_user2` int(11) NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` datetime NOT NULL,
  `readed` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `notification`
--

-- INSERT INTO `notification` (`id`, `id_user1`, `id_user2`, `type`, `date`) VALUES

-- (75, 50, 52, 'Visit', '2020-04-17 19:08:36');

-- --------------------------------------------------------

--
-- Structure de la table `report`
--

CREATE TABLE `report` (
  `id` int(11) NOT NULL,
  `id_user1` int(11) NOT NULL,
  `id_user2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `report`
--

-- INSERT INTO `report` (`id`, `id_user1`, `id_user2`) VALUES
-- (1, 50, 50),
-- (2, 50, 51),
-- (3, 50, 52),
-- (4, 50, 50),
-- (5, 50, 52),
-- (6, 50, 53),
-- (7, 50, 53),
-- (8, 50, 52);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `firstname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `token_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `valid_profil` tinyint(1) DEFAULT '0',
  `valid_email` tinyint(1) DEFAULT '0',
  `online` tinyint(1) DEFAULT '1',
  `gender` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Man',
  `orientation` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Both',
  `bio` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `popularity` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_visit` datetime DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `latitude` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `longitude` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `picture1` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-6.png',
  `picture2` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-6.png',
  `picture3` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-6.png',
  `picture4` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-6.png',
  `picture5` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-6.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

-- INSERT INTO `user` (`id`, `username`, `email`, `password`, `firstname`, `lastname`, `token_email`, `token_password`, `valid_profil`, `valid_email`, `online`, `gender`, `orientation`, `bio`, `popularity`, `last_visit`, `age`, `latitude`, `longitude`, `picture1`, `picture2`, `picture3`, `picture4`, `picture5`) VALUES
-- (50, 'lolo', 'khoucha.amira@yahoo.com', '$2a$08$zYrEuugv0VT4yxFmM5StqesQQUwN4.A52cfe2UudJ9g5FugiIzqzm', 'nss', 'akhiuhiuen', '0d0eeeb0-7d8b-11ea-9445-8b47d25485ca', NULL, 0, 0, 1, 'Woman', 'Both', '<script>alert(\"Boo!\")</script>\n\n', NULL, NULL, 90, NULL, NULL, 'https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-6.png', 'https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-6.png', 'https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-6.png', 'https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-6.png', 'https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-6.png'),
-- (51, 'ferh', 'bouujnobu@ojidh.fr', '$2a$08$N20Y3Fd0qhmSiRQ1Lrus/.cbH3y.lVx/vX4IoFdGNZOjGgepVvVgW', 'bjkugib', 'vikvb', '9cab76a0-7da5-11ea-88cc-ad5d7e57bc1d', NULL, 0, 0, 1, 'Man', 'Both', NULL, NULL, NULL, NULL, NULL, NULL, 'https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-6.png', 'https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-6.png', 'https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-6.png', 'https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-6.png', 'https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-6.png'),
-- (52, 'ak', 'fnrnf@okok.com', '$2a$08$0FByePxH1NZaunqaYLfXTe7PwQkWhYnTHH4AUA1U09I75rPMOkBYO', 'ngjrn', 'nfrjn', 'f45aab00-7da5-11ea-88cc-ad5d7e57bc1d', NULL, 0, 0, 1, 'Man', 'Both', NULL, NULL, NULL, NULL, NULL, NULL, 'https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-6.png', 'https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-6.png', 'https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-6.png', 'https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-6.png', 'https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-6.png'),
-- (53, 'akhoucha', 'njinj@lol.fr', '$2a$08$2x8QlUVmgyXBA2WAJsRgC.xL9ZYyRmNQ1pZsWk/Z3/nb5iALWcsue', 'ndu', 'njno', 'dc0da180-7da8-11ea-95ef-f5fd4f2593bc', NULL, 0, 0, 1, 'Man', 'Both', 'bbibibibi', NULL, NULL, 38, NULL, NULL, 'https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-6.png', 'https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-6.png', 'https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-6.png', 'https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-6.png', 'https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-6.png');

-- --------------------------------------------------------

--
-- Structure de la table `user_dislike`
--

CREATE TABLE `user_dislike` (
  `id` int(11) NOT NULL,
  `id_user1` int(11) NOT NULL,
  `id_user2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `user_like`
--

CREATE TABLE `user_like` (
  `id` int(11) NOT NULL,
  `id_user1` int(11) NOT NULL,
  `id_user2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user_like`
--

-- INSERT INTO `user_like` (`id`, `id_user1`, `id_user2`) VALUES
-- (6, 50, 50);

-- --------------------------------------------------------

--
-- Structure de la table `user_match`
--

CREATE TABLE `user_match` (
  `id` int(11) NOT NULL,
  `id_user1` int(11) NOT NULL,
  `id_user2` int(11) NOT NULL,
  `room_id` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user_match`
--

-- INSERT INTO `user_match` (`id`, `id_user1`, `id_user2`) VALUES
-- (19, 50, 50),
-- (20, 50, 50);

-- --------------------------------------------------------

--
-- Structure de la table `visit`
--

CREATE TABLE `visit` (
  `id` int(11) NOT NULL,
  `id_user1` int(11) NOT NULL,
  `id_user2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `blocked`
--
ALTER TABLE `blocked`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user2` (`id_user2`),
  ADD KEY `id_user1` (`id_user1`);

--
-- Index pour la table `interest`
--
ALTER TABLE `interest`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_interest_list` (`id_interest_list`);

--
-- Index pour la table `interest_list`
--
ALTER TABLE `interest_list`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user1` (`id_user1`),
  ADD KEY `id_user2` (`id_user2`);

--
-- Index pour la table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user1` (`id_user1`),
  ADD KEY `id_user2` (`id_user2`);

--
-- Index pour la table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user2` (`id_user2`),
  ADD KEY `id_user1` (`id_user1`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user_dislike`
--
ALTER TABLE `user_dislike`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user1` (`id_user1`),
  ADD KEY `id_user2` (`id_user2`);

--
-- Index pour la table `user_like`
--
ALTER TABLE `user_like`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user1` (`id_user1`),
  ADD KEY `id_user2` (`id_user2`);

--
-- Index pour la table `user_match`
--
ALTER TABLE `user_match`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user1` (`id_user1`),
  ADD KEY `id_user2` (`id_user2`);

--
-- Index pour la table `visit`
--
ALTER TABLE `visit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user2` (`id_user2`),
  ADD KEY `id_user1` (`id_user1`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `blocked`
--
ALTER TABLE `blocked`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `interest`
--
ALTER TABLE `interest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `interest_list`
--
ALTER TABLE `interest_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT pour la table `report`
--
ALTER TABLE `report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT pour la table `user_dislike`
--
ALTER TABLE `user_dislike`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `user_like`
--
ALTER TABLE `user_like`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `user_match`
--
ALTER TABLE `user_match`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `visit`
--
ALTER TABLE `visit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `blocked`
--
ALTER TABLE `blocked`
  ADD CONSTRAINT `blocked_ibfk_1` FOREIGN KEY (`id_user1`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `blocked_ibfk_2` FOREIGN KEY (`id_user2`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `interest`
--
ALTER TABLE `interest`
  ADD CONSTRAINT `interest_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`id_user1`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `message_ibfk_2` FOREIGN KEY (`id_user2`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`id_user1`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `notification_ibfk_2` FOREIGN KEY (`id_user2`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `report_ibfk_1` FOREIGN KEY (`id_user1`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `report_ibfk_2` FOREIGN KEY (`id_user2`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `user_dislike`
--
ALTER TABLE `user_dislike`
  ADD CONSTRAINT `user_dislike_ibfk_1` FOREIGN KEY (`id_user1`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_dislike_ibfk_2` FOREIGN KEY (`id_user2`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `user_like`
--
ALTER TABLE `user_like`
  ADD CONSTRAINT `user_like_ibfk_1` FOREIGN KEY (`id_user1`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_like_ibfk_2` FOREIGN KEY (`id_user2`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `user_match`
--
ALTER TABLE `user_match`
  ADD CONSTRAINT `user_match_ibfk_1` FOREIGN KEY (`id_user1`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_match_ibfk_2` FOREIGN KEY (`id_user2`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `visit`
--
ALTER TABLE `visit`
  ADD CONSTRAINT `visit_ibfk_1` FOREIGN KEY (`id_user2`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `visit_ibfk_2` FOREIGN KEY (`id_user1`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
