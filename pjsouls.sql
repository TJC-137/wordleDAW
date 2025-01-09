-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-12-2024 a las 17:13:24
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pjsouls`
--
CREATE DATABASE IF NOT EXISTS `pjsouls` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `pjsouls`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `characters`
--

CREATE TABLE `characters` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `game` varchar(255) NOT NULL,
  `origin` varchar(255) NOT NULL,
  `race` varchar(255) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `type` varchar(100) NOT NULL,
  `affiliation` varchar(255) NOT NULL,
  `character_icon` varchar(255) NOT NULL,
  `character_image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `characters`
--

INSERT INTO `characters` (`id`, `name`, `game`, `origin`, `race`, `gender`, `type`, `affiliation`, `character_icon`, `character_image`) VALUES
(1, 'Artorias', 'Dark Souls', 'Lordran', 'Human', 'Male', 'Boss', 'Knights of Gwyn', 'https://i.ibb.co/bNdxWpY/artorias.png', 'https://i.ibb.co/YpFHt77/Artorias-Bg.png'),
(2, 'Lady Maria', 'Bloodborne', 'Cainhurst', 'Vileblood', 'Female', 'Boss', 'Hunters of Byrgenwerth', 'https://i.ibb.co/6sNhrtn/lady-Maria.png', 'https://i.ibb.co/CKmsgd7/Lady-Maria-Bg.png'),
(3, 'Maliketh', 'Elden Ring', 'Farum Azula', 'Beastman', 'Male', 'Boss', '', 'https://i.ibb.co/q9KmCPH/maliketh.png', 'https://i.ibb.co/dM0X8XR/Maliketh-Bg.png'),
(4, 'Gwyn', 'Dark Souls', 'Lordran', 'God', 'Male', 'Boss', 'Lord of Sunlight', 'https://i.ibb.co/zVXQyj0/gwyn.png', 'https://i.ibb.co/h81zb5m/GwynBg.png'),
(5, 'The Witch of Izalith', 'Dark Souls', 'Lordran', 'Human', 'Female', 'Boss', 'Witches of Izalith', 'https://i.ibb.co/7r2J7W0/the-Witch-Of-Izalith.png', 'https://i.ibb.co/NF2zD8h/The-Witch-Of-Izalith-Bg.png'),
(6, 'Nito', 'Dark Souls', 'The Tomb of the Giants', 'Human/Undead', 'Male', 'Boss', 'The Gravelord Servants', 'https://i.ibb.co/dGTH1K1/nito.png', 'https://i.ibb.co/8DFgP7J/nitoBg.png'),
(7, 'Solaire of Astora', 'Dark Souls', 'Astora', 'Human', 'Male', 'NPC', 'Warrior of Sunlight', 'https://i.ibb.co/7nd3rY8/solaire-Of-Astora.png', 'https://i.ibb.co/sm0G4MW/Solaire-Of-Astora-Bg.png'),
(8, 'Siegmeyer of Catarina', 'Dark Souls', 'Catarina', 'Human', 'Male', 'NPC', 'Knights of Catarina', 'https://i.ibb.co/WtHTMyd/siegmeyer-Of-Catarina.png', 'https://i.ibb.co/pLn1yQr/Siegmeyer-Of-Catarina-Bg.png'),
(9, 'Eileen the Crow', 'Bloodborne', 'Yharnam', 'Human', 'Female', 'NPC', 'Crow Hunters', 'https://i.ibb.co/T22Lx4z/eileen-The-Crow.png', 'https://i.ibb.co/FgY4Z8P/Bloodborne-Hunter-Bg.png'),
(10, 'Father Gascoigne', 'Bloodborne', 'Yharnam', 'Human', 'Male', 'Boss', 'Hunters', 'https://i.ibb.co/RTxwt56/father-Gascoigne.png', 'https://i.ibb.co/jJ829Dp/father-Gascoigne-Bg.png'),
(11, 'Vicar Amelia', 'Bloodborne', 'Yharnam', 'Beast', 'Female', 'Boss', 'The Healing Church', 'https://i.ibb.co/pZfx093/vicar-Amelia.png', 'https://i.ibb.co/6vSNqC2/Vicar-Amelia-Bg.png'),
(12, 'Gehrman', 'Bloodborne', 'The Dream', 'Human', 'Male', 'Boss', 'Hunter', 'https://i.ibb.co/9nbc484/gehrman.png', 'https://i.ibb.co/gPWbLh6/gehrman-Bg.png'),
(13, 'Micolash', 'Bloodborne', 'Mergo\'s Loft', 'Human', 'Male', 'Boss', 'Mensis', 'https://i.ibb.co/cFWrHRQ/micolash.png', 'https://i.ibb.co/j4Gy9sj/Micolash-Bg.png'),
(14, 'Radahn', 'Elden Ring', 'Caelid', 'Demigod', 'Male', 'Boss', 'Redmane', 'https://i.ibb.co/yS6kLRQ/radahn.png', 'https://i.ibb.co/BL0Bnxn/RadahnBg.png'),
(15, 'Rykard', 'Elden Ring', 'Volcano Manor', 'Demigod', 'Male', 'Boss', 'Volcano Manor', 'https://i.ibb.co/xXhZ1BZ/rykard.png', 'https://i.ibb.co/JdwSSjh/RykardBg.png'),
(16, 'Mohg', 'Elden Ring', 'Subterranean Shunning-Grounds', 'Demigod', 'Male', 'Boss', 'Moghwyn Dynasty', 'https://i.ibb.co/FgfW0q1/mohg.png', 'https://i.ibb.co/yqw0pty/MohgBg.png'),
(17, 'Godrick the Grafted', 'Elden Ring', 'Stormveil Castle', 'Human/Demigod', 'Male', 'Boss', 'House Godrick', 'https://i.ibb.co/R02qHgB/godrick-The-Grafted.png', 'https://i.ibb.co/LQjRWkz/Godrick-The-Grafted-Bg.png'),
(18, 'Fia', 'Elden Ring', 'Roundtable Hold', 'Human', 'Female', 'NPC', 'The Deathbed Companion', 'https://i.ibb.co/x1vHhRF/fia.png', 'https://i.ibb.co/y6rftD3/FiaBg.png'),
(19, 'Blaidd', 'Elden Ring', 'Siofra River', 'Wolfman', 'Male', 'NPC', 'The Three Fingers', 'https://i.ibb.co/Ht3ZSZs/blaidd.png', 'https://i.ibb.co/CMvtkwJ/BlaiddBg.png'),
(20, 'Patches', 'Elden Ring', 'Liurnia of the Lakes', 'Human', 'Male', 'NPC', 'None', 'https://i.ibb.co/hdQJS4Q/patches.png', 'https://i.ibb.co/5W3XMCJ/Patches-Bg.png'),
(21, 'Varre', 'Elden Ring', 'Liurnia of the Lakes', 'Human', 'Male', 'NPC', 'Moor', 'https://i.ibb.co/G9Y6mMR/varre.png', 'https://i.ibb.co/QF4pbdG/VarreBg.png'),
(22, 'Yuria of Londor', 'Dark Souls 3', 'Londor', 'Hollow', 'Female', 'NPC', 'The Hollowed', 'https://i.ibb.co/8YNscvc/yuria-Of-Londor.png', 'https://i.ibb.co/Qmty0LV/Yuria-Of-Londor-Bg.png'),
(23, 'Ludleth of Courland', 'Dark Souls 3', 'Courland', 'Hollow', 'Male', 'NPC', 'The Firekeepers', 'https://i.ibb.co/LvBFnsX/ludleth-Of-Courland.png', 'https://i.ibb.co/gtr9r3t/Ludleth-Of-Courland-Bg.png'),
(24, 'Nameless King', 'Dark Souls 3', 'Archdragon Peak', 'God/Dragon', 'Male', 'Boss', 'The Ancient Dragons', 'https://i.ibb.co/dp162Dt/nameless-King.png', 'https://i.ibb.co/x5d9HYS/Nameless-King-Bg.png'),
(25, 'Pontiff Sulyvahn', 'Dark Souls 3', 'Irithyll of the Boreal Valley', 'Human', 'Male', 'Boss', 'Boreal Knights', 'https://i.ibb.co/80CtrH8/pontiff-Sulyvahn.png', 'https://i.ibb.co/vcS4QLH/Pontiff-Sulyvahn-Bg.png'),
(26, 'Anri of Astora', 'Dark Souls 3', 'Astora', 'Human', 'Female', 'NPC', 'Fledgling Knight', 'https://i.ibb.co/qMnK2cz/anri-Of-Astora.png', 'https://i.ibb.co/d0nWVR3/Anri-Of-Astora-Bg.png'),
(27, 'Siegward of Catarina', 'Dark Souls 3', 'Catarina', 'Human', 'Male', 'NPC', 'Knights of Catarina', 'https://i.ibb.co/t3jMjpt/siegward-Of-Catarina.png', 'https://i.ibb.co/5WF8WyN/Siegward-Of-Catarina-Bg.png'),
(28, 'Shura', 'Sekiro', 'Ashina Castle', 'Human', 'Male', 'Boss', 'Ashina', 'https://i.ibb.co/0q0XJvN/shura.png', 'https://i.ibb.co/WDLpFbV/ShuraBg.png'),
(29, 'Isshin Ashina', 'Sekiro', 'Ashina Castle', 'Human', 'Male', 'Boss', 'Ashina Clan', 'https://i.ibb.co/tsSJT86/isshin-Ashina.png', 'https://i.ibb.co/XJ8SH3Z/Isshin-Ashina-Bg.png'),
(30, 'Genichiro Ashina', 'Sekiro', 'Ashina Castle', 'Human', 'Male', 'Boss', 'Ashina Clan', 'https://i.ibb.co/FhHKQ74/genichiro-Ashina.png', 'https://i.ibb.co/djVSD8D/Genichiro-Ashina-Bg.png'),
(31, 'Emma', 'Sekiro', 'Ashina Castle', 'Human', 'Female', 'NPC', 'Heir to the Dragon', 'https://i.ibb.co/HNNVHV8/emma.png', 'https://i.ibb.co/dc62JFL/EmmaBg.png'),
(32, 'Sekiro', 'Sekiro', 'Ashina', 'Human', 'Male', 'NPC', 'Shinobi', 'https://i.ibb.co/cvqcd0R/sekiro.png', 'https://i.ibb.co/1MQkmSH/SekiroBg.png'),
(33, 'Bloodborne Hunter', 'Bloodborne', 'Yharnam', 'Human', 'Male', 'NPC', 'Hunters', 'https://i.ibb.co/yWjnxXq/bloodborne-Hunter.png', 'https://i.ibb.co/FgY4Z8P/Bloodborne-Hunter-Bg.png'),
(34, 'Godo', 'Sekiro', 'Senpou Temple', 'Human', 'Male', 'NPC', 'Senpou Temple', 'https://i.ibb.co/9cmvggQ/godo.png', 'https://i.ibb.co/HKX805k/GodoBg.png'),
(35, 'Kuro', 'Sekiro', 'Ashina Castle', 'Human', 'Male', 'NPC', 'Shinobi', 'https://i.ibb.co/6rJFrx9/kuro.png', 'https://i.ibb.co/ZJDqtPr/KuroBg.png'),
(36, 'Oda Nobunaga', 'Sekiro', 'Sengoku Japan', 'Human', 'Male', 'Boss', 'Warlord', 'https://i.ibb.co/f2KXRNs/oda-Nobunaga.png', 'https://i.ibb.co/B42Yf38/Oda-Nobunaga-Bg.png'),
(37, 'Tarnished', 'Elden Ring', 'Unknown', 'Human', 'Varies', 'NPC', 'Varies', 'https://i.ibb.co/KKKxbBF/tarnished.png', 'https://i.ibb.co/b2SRPZ0/Tarnished-Bg.png'),
(38, 'Laurence, the First Vicar', 'Bloodborne', 'Yharnam', 'Beast', 'Male', 'Boss', 'The Healing Church', 'https://i.ibb.co/my9DCLn/laurence-The-First-Vicar.png', 'https://i.ibb.co/R3bZ71v/Laurence-The-First-Vicar-Bg.png'),
(39, 'Ornstein', 'Dark Souls', 'Lordran', 'Human', 'Male', 'Boss', 'Knights of Gwyn', 'https://i.ibb.co/pzcxSQF/ornstein.png', 'https://i.ibb.co/4mBHjKq/Ornstein-Bg.png'),
(40, 'Smough', 'Dark Souls', 'Lordran', 'Human', 'Male', 'Boss', 'Executioners', 'https://i.ibb.co/LNCPffX/smough.png', 'https://i.ibb.co/1bXBhhf/SmoughBg.png'),
(41, 'Malenia', 'Elden Ring', 'Haligtree', 'Demigod', 'Female', 'Boss', 'Haligtree Knights', 'https://i.ibb.co/VH54rcj/malenia.png', 'https://i.ibb.co/FD5qcg6/Malenia-Bg.png'),
(42, 'Ranni the Witch', 'Elden Ring', 'Liurnia of the Lakes', 'Empyrean', 'Female', 'NPC', 'Carian Royal Family', 'https://i.ibb.co/yqZNyLK/ranni-The-Witch.png', 'https://i.ibb.co/cDfRjJD/Ranni-The-Witch-Bg.png'),
(43, 'Gyoubu Masataka Oniwa', 'Sekiro', 'Ashina', 'Human', 'Male', 'Boss', 'Ashina Clan', 'https://i.ibb.co/2Z4Sj9b/Gyoubu.png', 'https://i.ibb.co/DpNL3h6/Gyoubu-Masataka-Oniwa-Bg.png'),
(44, 'Lady Butterfly', 'Sekiro', 'Hirata Estate', 'Human', 'Female', 'Boss', 'Shinobi', 'https://i.ibb.co/Mskrycx/quelaag.png', 'https://i.ibb.co/DKcBX0K/Butter-Fly-BG.png'),
(45, 'The Doll', 'Bloodborne', 'Hunter\'s Dream', 'Doll', 'Female', 'NPC', 'None', 'https://i.ibb.co/3fyQwJk/Doll.png', 'https://i.ibb.co/xLTdmkM/DollBG.png'),
(46, 'Darkeater Midir', 'Dark Souls 3', 'Ringed City', 'Dragon', 'Unknown', 'Boss', 'Gods', 'https://i.ibb.co/TmxCjnY/midir.png', 'https://i.ibb.co/dMPFnqc/MidirBG.png'),
(47, 'Erdtree Avatar', 'Elden Ring', 'Erdtree', 'Construct', 'Unknown', 'Boss', 'Golden Order', 'https://i.ibb.co/bb0HNCx/erdtree.png', 'https://i.ibb.co/31s55x5/Erdtree-BG.png'),
(48, 'Quelaag', 'Dark Souls', 'Blighttown', 'Demon', 'Female', 'Boss', 'Chaos Servants', 'https://i.ibb.co/Mskrycx/quelaag.png', 'https://i.ibb.co/pd9fFNY/Quelaag-BG.png'),
(49, 'The Abyss Watchers', 'Dark Souls 3', 'Farron Keep', 'Human', 'Male', 'Boss', 'Wolf Blood', 'https://i.ibb.co/LxSPsrT/watchers.png', 'https://i.ibb.co/YB0D2Nn/AbyssBG.png'),
(50, 'Slave Knight Gael', 'Dark Souls 3', 'The Ringed City', 'Human', 'Male', 'Boss', 'The Painted World', 'https://i.ibb.co/Hh5Kw3c/Gael.png', 'https://i.ibb.co/dt5RHZx/GaelBG.png'),
(51, 'Lorian, Elder Prince', 'Dark Souls 3', 'Lothric Castle', 'Human', 'Male', 'Boss', 'Royal Family of Lothric', 'https://i.ibb.co/87rKjXz/Lorian.png', 'https://i.ibb.co/sHk4w8V/LorianBG.png'),
(52, 'Celestial Emissary', 'Bloodborne', 'Upper Cathedral Ward', 'Kin', 'Unknown', 'Boss', 'Great Ones', 'https://i.ibb.co/cwZN0D5/Celestial-Emissary.png', 'https://i.ibb.co/rttCFGC/Emissary-BG.png'),
(53, 'Ebrietas, Daughter of the Cosmos', 'Bloodborne', 'Upper Cathedral Ward', 'Kin', 'Unknown', 'Boss', 'Great Ones', 'https://i.ibb.co/VCYJ8dq/Ebrietas.png', 'https://i.ibb.co/t8YLgWX/Ebrietas-BG.png'),
(54, 'Astel, Naturalborn of the Void', 'Elden Ring', 'Lake of Rot', 'Alien', 'Unknown', 'Boss', 'Outer Gods', 'https://i.ibb.co/YQqmVxN/Astel.png', 'https://i.ibb.co/ns1wGH3/AnstelBG.png'),
(55, 'Morgott, the Omen King', 'Elden Ring', 'Leyndell', 'Omen', 'Male', 'Boss', 'Golden Order', 'https://i.ibb.co/3knXpnL/Morgott.png', 'https://i.ibb.co/vLbtRvt/Morgott-BG.png'),
(56, 'Margit, the Fell Omen', 'Elden Ring', 'Stormhill', 'Omen', 'Male', 'Boss', 'Golden Order', 'https://i.ibb.co/tPyLtGW/Margit.png', 'https://i.ibb.co/HxYWQXS/MargitBG.png'),
(57, 'Demon of Hatred', 'Sekiro', 'Ashina Outskirts', 'Demon', 'Male', 'Boss', 'None', 'https://i.ibb.co/BNmfYXv/Hatred-Demon.png', 'https://i.ibb.co/KNrttDv/Hatred-Demon-BG.png'),
(58, 'Great Grey Wolf Sif', 'Dark Souls', 'Darkroot Garden', 'Wolf', 'Unknown', 'Boss', 'Knights of Gwyn', 'https://i.ibb.co/0Mdgxp6/Sif.png', 'https://i.ibb.co/55KqKYC/SifBG.png'),
(59, 'Crossbreed Priscilla', 'Dark Souls', 'The Painted World of Ariamis', 'Half-Dragon', 'Female', 'Boss', 'None', 'https://i.ibb.co/Sd13pfc/Priscilla.png', 'https://i.ibb.co/xCrMkCS/Priscilla-BG.png'),
(60, 'Seath the Scaleless', 'Dark Souls', 'The Duke\'s Archives', 'Dragon', 'Unknown', 'Boss', 'None', 'https://i.ibb.co/QdpKq28/Seath.png', 'https://i.ibb.co/NpB5Kh6/SeathBG.png'),
(61, 'Iron Golem', 'Dark Souls', 'Sen\'s Fortress', 'Construct', 'Unknown', 'Boss', 'None', 'https://i.ibb.co/vLwyjDf/Iron-Golem.png', 'https://i.ibb.co/b6trQZY/GolemBG.png'),
(62, 'The Twin Princes', 'Dark Souls 3', 'Lothric Castle', 'Human', 'Male', 'Boss', 'Royal Family of Lothric', 'https://i.ibb.co/VCQZXSr/Elder-Prince.png', 'https://i.ibb.co/Km4FGVd/TwinkBG.png'),
(63, 'The Rotten', 'Dark Souls 2', 'The Black Gulch', 'Undead', 'Unknown', 'Boss', 'None', 'https://i.ibb.co/WVQqMsQ/The-Rotten.png', 'https://i.ibb.co/HXHtd9j/RottenBG.png'),
(64, 'Elana, the Squalid Queen', 'Dark Souls 2', 'Shulva, Sanctum City', 'Human', 'Female', 'Boss', 'Dark Souls', 'https://i.ibb.co/X8TDgz9/Elana.png', 'https://i.ibb.co/QC9CCtq/ElanaBG.png'),
(65, 'Velstadt, the Royal Aegis', 'Dark Souls 2', 'Undead Crypt', 'Human', 'Male', 'Boss', 'King Vendrick', 'https://i.ibb.co/zb1DD7j/Velstadt.png', 'https://i.ibb.co/WyhWZSY/Velstadt-BG.png'),
(66, 'Manus, Father of the Abyss', 'Dark Souls', 'Oolacile', 'Human', 'Male', 'Boss', 'Abyss', 'https://i.ibb.co/tLdDNjr/Manus.png', 'https://i.ibb.co/Jn3smpc/ManusBG.png'),
(67, 'Kalameet', 'Dark Souls', 'Royal Wood', 'Dragon', 'Unknown', 'Boss', 'None', 'https://i.ibb.co/vZ7ZQkS/Kalameet.png', 'https://i.ibb.co/MPT9fFF/Kalameet-BG.png'),
(68, 'Elden Beast', 'Elden Ring', 'The Elden Throne', 'Outer God', 'Unknown', 'Boss', 'Erdtree', 'https://i.ibb.co/cgsF6z6/Elden-Beast.png', 'https://i.ibb.co/Wv2v7MP/Elden-Beast-BG.png'),
(69, 'Renalla, Queen of the Full Moon', 'Elden Ring', 'Raya Lucaria Academy', 'Human', 'Female', 'Boss', 'Carian Royals', 'https://i.ibb.co/ryZhqN6/Rellana.png', 'https://i.ibb.co/8KBXjXz/Rennala-BG.png'),
(70, 'Melina', 'Elden Ring', 'Unknown', 'Human', 'Female', 'NPC', 'The Tarnished', 'https://i.ibb.co/1spntyB/Melina.png', 'https://i.ibb.co/1m49bqw/MelinaBG.png'),
(71, 'Djura', 'Bloodborne', 'Old Yharnam', 'Human', 'Male', 'NPC', 'Powder Kegs', 'https://i.ibb.co/k0jpXcP/Djura.png', 'https://i.ibb.co/9vrJN6L/DjuraBG.png'),
(72, 'Ludwig the Holy Blade', 'Bloodborne', 'The Hunter\'s Nightmare', 'Beast', 'Male', 'Boss', 'The Healing Church', 'https://i.ibb.co/8NpNQrN/Ludwig.png', 'https://i.ibb.co/v4YZ8D5/LudwigBG.png'),
(73, 'The Orphan of Kos', 'Bloodborne', 'Fishing Hamlet', 'Great One', 'Unknown', 'Boss', 'Kos', 'https://i.ibb.co/WGNJm2V/Ophan.png', 'https://i.ibb.co/pWnjkf1/OphanBG.png'),
(74, 'The Divine Dragon', 'Sekiro', 'Fountainhead Palace', 'Dragon', 'Unknown', 'Boss', 'Divinity', 'https://i.ibb.co/zs3fVWq/Divine-Dragon.png', 'https://i.ibb.co/7rQJtXk/Divine-Dragon-BG.png'),
(75, 'Alonne Knight Captain', 'Dark Souls 2', 'Iron Keep', 'Human', 'Male', 'Boss', 'Sir Alonne', 'https://i.ibb.co/1vZFzhQ/Alonne-Knight-Captain.jpg', 'https://i.ibb.co/CwMbMDS/Allone-Knight-BG.png'),
(76, 'Sinh, the Slumbering Dragon', 'Dark Souls 2', 'Shulva, Sanctum City', 'Dragon', 'Unknown', 'Boss', 'None', 'https://i.ibb.co/p1kNFdc/sinh.png', 'https://i.ibb.co/QNHBN3N/Sinh.png'),
(77, 'Aldrich, Devourer of Gods', 'Dark Souls 3', 'Anor Londo', 'Human/Undead', 'Male', 'Boss', 'Deep', 'https://i.ibb.co/946z6sP/Aldrich.png', 'https://i.ibb.co/6rxg05B/Aldrich-BG.png'),
(78, 'Yhorm the Giant', 'Dark Souls 3', 'Profaned Capital', 'Giant', 'Male', 'Boss', 'Lord of Cinder', 'https://i.ibb.co/XJ4GZKn/Yhorm.png', 'https://i.ibb.co/cgV8pC8/Yhorm.png'),
(79, 'Lothric, Younger Prince', 'Dark Souls 3', 'Lothric Castle', 'Human', 'Male', 'Boss', 'Lothric Castle', 'https://i.ibb.co/VLzxbhR/lothric.png', 'https://i.ibb.co/yNs8BYJ/image.png'),
(80, 'Laurentius of the Great Swamp', 'Dark Souls', 'The Great Swamp', 'Human', 'Male', 'NPC', 'Pyromancers', 'https://i.ibb.co/gRGRG17/Laurentius.png', 'https://i.ibb.co/Fgb3Dgw/Laurentius-BG.png'),
(81, 'Logarius', 'Bloodborne', 'Cainhurst', 'Human', 'Male', 'Boss', 'Executioners', 'https://i.ibb.co/7GGHm3d/Logarius.png', 'https://i.ibb.co/tbNCW1g/Logarius-BG.png');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `characters`
--
ALTER TABLE `characters`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `characters`
--
ALTER TABLE `characters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
