-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: dbdecaps
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tblbranch`
--

DROP TABLE IF EXISTS `tblbranch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblbranch` (
  `branchID` int(11) NOT NULL AUTO_INCREMENT,
  `branchname` varchar(45) DEFAULT NULL,
  `branchstreetnum` int(11) DEFAULT NULL,
  `branchstreetname` varchar(100) DEFAULT NULL,
  `branchcity` varchar(100) DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  PRIMARY KEY (`branchID`),
  KEY `user_idx` (`user`),
  CONSTRAINT `user` FOREIGN KEY (`user`) REFERENCES `tbluser` (`userid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblbranch`
--

INSERT INTO `tblbranch` VALUES (5,' A-team Marikina',NULL,'  Concepcion St','         Marikina City',36),(6,'A-Team Sta Mesa',NULL,'Paco St.','      Manila City',53),(9,'A-Team Cebu',NULL,'38 Blk 42 Tanod St','Cebu City',52),(10,'A-Team Eastwood',NULL,'Eastwood St','Quezon City',95);

--
-- Table structure for table `tblcat`
--

DROP TABLE IF EXISTS `tblcat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblcat` (
  `membershipID` int(11) NOT NULL AUTO_INCREMENT,
  `membershipdesc` varchar(200) DEFAULT NULL,
  `membershipname` varchar(45) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`membershipID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblcat`
--

INSERT INTO `tblcat` VALUES (4,'  The Client is allowed to visit and use the gym equipment in all of our branches nationwide','  Interbranch',1),(5,'Exclusive on one of our branches','Exclusive',1);

--
-- Table structure for table `tblclass`
--

DROP TABLE IF EXISTS `tblclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblclass` (
  `classID` int(11) NOT NULL AUTO_INCREMENT,
  `classname` varchar(45) NOT NULL,
  `classdesc` varchar(200) NOT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`classID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblclass`
--

INSERT INTO `tblclass` VALUES (3,'  Zumbas','  Dancing that may increase your cardiovascular endurance',1),(4,'Yoga','Stretching and way of relaxing',1);

--
-- Table structure for table `tbleventclass`
--

DROP TABLE IF EXISTS `tbleventclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbleventclass` (
  `eventclassid` int(11) NOT NULL AUTO_INCREMENT,
  `startdate` varchar(45) DEFAULT NULL,
  `enddate` varchar(45) DEFAULT NULL,
  `starttime` time DEFAULT NULL,
  `endtime` time DEFAULT NULL,
  `slot` int(11) DEFAULT NULL,
  `eventclassname` varchar(60) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  PRIMARY KEY (`eventclassid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbleventclass`
--

INSERT INTO `tbleventclass` VALUES (1,'08/31/2018','09/01/2018','09:00:00','18:00:00',20,'Body Building',2),(2,'09/07/2018','09/28/2018','04:00:00','22:00:00',15,'MMA Meet UP',2);

--
-- Table structure for table `tblfacilities`
--

DROP TABLE IF EXISTS `tblfacilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblfacilities` (
  `facilitiesID` int(11) NOT NULL AUTO_INCREMENT,
  `facilitiesname` varchar(45) NOT NULL,
  `fee` int(11) NOT NULL,
  `period` int(11) DEFAULT NULL,
  `UOM` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`facilitiesID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblfacilities`
--

INSERT INTO `tblfacilities` VALUES (1,' Washroom',100,12,'hr'),(2,'Dance Room',150,1,'hr');

--
-- Table structure for table `tblfreeze`
--

DROP TABLE IF EXISTS `tblfreeze`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblfreeze` (
  `freezeid` int(11) NOT NULL AUTO_INCREMENT,
  `userfid` int(11) DEFAULT NULL,
  `genid` int(11) DEFAULT NULL,
  `datefrozen` date DEFAULT NULL,
  `freezedmonths` int(11) DEFAULT NULL,
  `unfreezedate` date DEFAULT NULL,
  `minus` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `freezeduntil` date DEFAULT NULL,
  PRIMARY KEY (`freezeid`),
  KEY `userfid_idx` (`userfid`),
  KEY `genid_idx` (`genid`),
  CONSTRAINT `genid` FOREIGN KEY (`genid`) REFERENCES `tblgenera` (`generalID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `userfid` FOREIGN KEY (`userfid`) REFERENCES `tbluser` (`userid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblfreeze`
--

INSERT INTO `tblfreeze` VALUES (5,91,2,'2018-08-31',2,NULL,61,100,'2018-10-31'),(6,91,2,'2018-08-31',2,NULL,61,100,'2018-10-31'),(7,91,2,'2018-08-31',2,NULL,61,100,'2018-10-31'),(8,91,2,'2018-08-31',2,NULL,61,100,'2018-10-31'),(9,91,2,'2018-08-31',2,NULL,61,100,'2018-10-31'),(10,91,2,'2018-08-31',2,NULL,61,100,'2018-10-31'),(11,91,2,'2018-08-31',2,NULL,61,100,'2018-10-31'),(12,84,2,'2018-09-01',2,NULL,59,100,'2018-10-30'),(13,84,2,'2018-09-01',2,NULL,59,100,'2018-10-30');

--
-- Table structure for table `tblgenera`
--

DROP TABLE IF EXISTS `tblgenera`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblgenera` (
  `generalID` int(11) NOT NULL AUTO_INCREMENT,
  `genname` varchar(70) DEFAULT NULL,
  `genperiod` int(11) DEFAULT NULL,
  `UOM` varchar(50) DEFAULT NULL,
  `fee` int(11) DEFAULT NULL,
  PRIMARY KEY (`generalID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblgenera`
--

INSERT INTO `tblgenera` VALUES (1,'  Training Sessions',1,'Session',50),(2,'Freezing Fee',1,'Months',50),(3,'Reactivation Fee',1,'Session',150);

--
-- Table structure for table `tblmemclass`
--

DROP TABLE IF EXISTS `tblmemclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblmemclass` (
  `memclassid` int(11) NOT NULL AUTO_INCREMENT,
  `memclassname` varchar(45) DEFAULT NULL,
  `memclassdesc` varchar(100) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`memclassid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblmemclass`
--

INSERT INTO `tblmemclass` VALUES (1,'GOLD',' The client pays annually',1),(2,'SILVER',' Client Pays Semi-Annually',1),(3,'BRONZE','Client Pays Monthly',1),(4,'PLATINUM',' The client cay pay every 3 years',1),(5,'DIAMOND','Every 5 years mode of payment',1);

--
-- Table structure for table `tblmemrates`
--

DROP TABLE IF EXISTS `tblmemrates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblmemrates` (
  `memrateid` int(11) NOT NULL AUTO_INCREMENT,
  `memfee` int(11) DEFAULT NULL,
  `memperiod` int(11) DEFAULT NULL,
  `memcat` int(11) DEFAULT NULL,
  `memclass` int(11) DEFAULT NULL,
  PRIMARY KEY (`memrateid`),
  KEY `memcat_idx` (`memcat`),
  KEY `memclass_idx` (`memclass`),
  CONSTRAINT `memcat` FOREIGN KEY (`memcat`) REFERENCES `tblcat` (`membershipID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `memclass` FOREIGN KEY (`memclass`) REFERENCES `tblmemclass` (`memclassid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblmemrates`
--

INSERT INTO `tblmemrates` VALUES (3,800,1,4,3),(4,699,1,5,3),(5,1300,6,4,2),(6,1699,6,5,2),(7,2499,12,4,1),(8,2199,12,5,1);

--
-- Table structure for table `tblnotifications`
--

DROP TABLE IF EXISTS `tblnotifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblnotifications` (
  `intNotifID` int(11) NOT NULL AUTO_INCREMENT,
  `strNotifType` varchar(45) NOT NULL,
  `txtNotifContent` longtext NOT NULL,
  `datNotifInstance` date NOT NULL,
  `intuserid` int(11) DEFAULT NULL,
  PRIMARY KEY (`intNotifID`),
  KEY `userid_idx` (`intuserid`),
  CONSTRAINT `intuserid` FOREIGN KEY (`intuserid`) REFERENCES `tbluser` (`userid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblnotifications`
--


--
-- Table structure for table `tblprogram`
--

DROP TABLE IF EXISTS `tblprogram`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblprogram` (
  `progid` int(11) NOT NULL AUTO_INCREMENT,
  `progname` varchar(45) NOT NULL,
  `progdesc` varchar(200) NOT NULL,
  PRIMARY KEY (`progid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblprogram`
--

INSERT INTO `tblprogram` VALUES (1,'boxing','suntukan'),(2,'taekwando','sipaan'),(3,'MMA','mixed martial arts'),(4,'Brazillian Jujitsu','Grappling and Take Downs');

--
-- Table structure for table `tblpromo`
--

DROP TABLE IF EXISTS `tblpromo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblpromo` (
  `promoID` int(11) NOT NULL AUTO_INCREMENT,
  `promoname` varchar(45) DEFAULT NULL,
  `startdate` varchar(45) DEFAULT NULL,
  `enddate` varchar(45) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `statusback` int(11) DEFAULT NULL,
  PRIMARY KEY (`promoID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblpromo`
--

INSERT INTO `tblpromo` VALUES (4,'  Summer Promo','  08/11/2018','  08/18/2018',5,'Active',1),(5,'Ramadan Promo','04/11/2018','04/28/2018',10,'Active',2),(6,'Spooky Promo','10/29/2018','10/31/2018',35,'Inactive',2),(7,'   gay promo','   06/09/2019','   06/29/2019',5,'Inactive',1);

--
-- Table structure for table `tblspecial`
--

DROP TABLE IF EXISTS `tblspecial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblspecial` (
  `specialID` int(11) NOT NULL AUTO_INCREMENT,
  `specialname` varchar(45) DEFAULT NULL,
  `specialdesc` varchar(200) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`specialID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblspecial`
--

INSERT INTO `tblspecial` VALUES (4,'Strength Training','This training focuses on raw strength.',1),(5,'Buff Up','Focusing Buffing Muscles for Competitions',1);

--
-- Table structure for table `tbltrainer`
--

DROP TABLE IF EXISTS `tbltrainer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbltrainer` (
  `trainerid` int(11) NOT NULL AUTO_INCREMENT,
  `trainerfname` varchar(45) DEFAULT NULL,
  `trainerlname` varchar(45) DEFAULT NULL,
  `trainerpassword` varchar(45) DEFAULT NULL,
  `profile` varchar(150) DEFAULT NULL,
  `trainermobile` varchar(15) DEFAULT NULL,
  `trainergender` varchar(45) DEFAULT NULL,
  `trainerschedule` varchar(100) DEFAULT NULL,
  `trainerbday` varchar(45) DEFAULT NULL,
  `trainerbranch` int(11) DEFAULT NULL,
  `trainerspecialization` int(11) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `trainerusername` varchar(45) DEFAULT NULL,
  `traineremail` varchar(45) DEFAULT NULL,
  `traineraddress` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`trainerid`),
  KEY `branch_idx` (`trainerbranch`),
  KEY `specialization_idx` (`trainerspecialization`),
  CONSTRAINT `trainerbranch` FOREIGN KEY (`trainerbranch`) REFERENCES `tblbranch` (`branchID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `trainerspecialization` FOREIGN KEY (`trainerspecialization`) REFERENCES `tblspecial` (`specialID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbltrainer`
--

INSERT INTO `tbltrainer` VALUES (3,'Jethros','Samson','12345',NULL,'+639213457898','male','Monday,Tuesday,Wednesday','11/09/1989',6,4,NULL,'jethjeth','jethro@gmail.com','Manila City'),(4,'Angelito','Cassasis','12345',NULL,'09244787451','male','Monday,Tuesday,Wednesday','03/07/1996',5,5,NULL,'aang','cassasis@gmail.com','Manila City');

--
-- Table structure for table `tbluce`
--

DROP TABLE IF EXISTS `tbluce`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbluce` (
  `intUCEID` int(11) NOT NULL AUTO_INCREMENT,
  `intUCEClassID` int(11) DEFAULT NULL,
  `intUCEUserID` int(11) DEFAULT NULL,
  UNIQUE KEY `intUCEID_UNIQUE` (`intUCEID`),
  KEY `intUCEUserID_idx` (`intUCEUserID`),
  KEY `intUCEClassID_idx` (`intUCEClassID`),
  CONSTRAINT `intUCEClassID` FOREIGN KEY (`intUCEClassID`) REFERENCES `tbleventclass` (`eventclassid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `intUCEUserID` FOREIGN KEY (`intUCEUserID`) REFERENCES `tbluser` (`userid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbluce`
--


--
-- Table structure for table `tbluser`
--

DROP TABLE IF EXISTS `tbluser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbluser` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `userfname` varchar(45) DEFAULT NULL,
  `userlname` varchar(45) DEFAULT NULL,
  `useremail` varchar(100) DEFAULT NULL,
  `userpassword` varchar(20) DEFAULT NULL,
  `usertype` int(11) DEFAULT NULL,
  `profile` varchar(150) DEFAULT NULL,
  `branch` int(11) DEFAULT NULL,
  `usermobile` varchar(45) DEFAULT NULL,
  `useraddress` varchar(100) DEFAULT NULL,
  `usergender` varchar(45) DEFAULT NULL,
  `userschedule` varchar(100) DEFAULT NULL,
  `userbday` varchar(50) DEFAULT NULL,
  `specialization` int(11) DEFAULT NULL,
  `statusfront` varchar(45) DEFAULT NULL,
  `userusername` varchar(45) DEFAULT NULL,
  `memrateid` int(11) DEFAULT NULL,
  `paymentcode` varchar(45) DEFAULT NULL,
  `signdate` date DEFAULT NULL,
  `expiry` date DEFAULT NULL,
  `recentpay` date DEFAULT NULL,
  `tblusercol` varchar(45) DEFAULT NULL,
  `PTid` int(11) DEFAULT NULL,
  PRIMARY KEY (`userid`),
  KEY `branch_idx` (`branch`),
  KEY `specialization_idx` (`specialization`),
  KEY `memrateid_idx` (`memrateid`),
  KEY `trainid_idx` (`PTid`),
  CONSTRAINT `PTid` FOREIGN KEY (`PTid`) REFERENCES `tbppt` (`PTid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `branch` FOREIGN KEY (`branch`) REFERENCES `tblbranch` (`branchID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `memrateid` FOREIGN KEY (`memrateid`) REFERENCES `tblmemrates` (`memrateid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `specialization` FOREIGN KEY (`specialization`) REFERENCES `tblspecial` (`specialID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbluser`
--

INSERT INTO `tbluser` VALUES (9,NULL,NULL,'admin','12345',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(36,'  Joshua','  Ganila','ganila@gmail.com','12345',4,NULL,5,'  +639123456789',NULL,NULL,NULL,NULL,NULL,'Active',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(51,'Homer','Cadena','homer.keid@gmail.com','12345',4,NULL,NULL,'+639123214567',NULL,NULL,NULL,NULL,NULL,'Inactive','homiecadie',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(52,'Danielle Nicole','Casadores','Casadores@gmail.com','12345',4,NULL,9,'+63909123432',NULL,NULL,NULL,NULL,NULL,'Active','Chawot',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(53,' Rafh',' Pabustan','Raf@gmail.com',NULL,4,NULL,6,' +63909654567768',NULL,NULL,NULL,NULL,NULL,'Active',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(84,'Will','Smith','joshuaburnay@gmail.com','12345',2,NULL,NULL,'+6399564987451','Bel-Air , Beverly Hills','male',NULL,'',4,'Active','FLY',7,'RZ8zWcF','2018-08-30','2020-09-03','2018-08-30',NULL,NULL),(85,'Tom',' Jones','tlovince14@gmail.com','12345',2,NULL,6,'+639321457897','California, USA','male',NULL,'06/07/1940',4,'Active','Tom',8,'NWfq970','2018-08-31','2019-08-31',NULL,NULL,NULL),(91,'Hillary','Banks','daniellecasadores09@gmail.com','12345',2,NULL,NULL,'+639321456789','Bel-Air , Beverly Hills','female',NULL,'01/24/1979',4,'Active','Hillary',3,'Kh630Ep','2018-08-31','2018-09-30',NULL,NULL,NULL),(93,'Carlton','Banks','daniellecasadores09@gmail.com',NULL,8,NULL,5,'09321456789','Concepcion St   Marikina City','male',NULL,'01/24/1979',4,NULL,'Carlton',4,'OIMoQ06',NULL,NULL,NULL,NULL,NULL),(95,'Princess','Isaac','princess@gmail.com','12345',4,NULL,10,'+63909123432',NULL,NULL,NULL,NULL,NULL,'Active','ces',NULL,NULL,NULL,NULL,NULL,NULL,NULL);

--
-- Table structure for table `tbppt`
--

DROP TABLE IF EXISTS `tbppt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbppt` (
  `PTid` int(11) NOT NULL AUTO_INCREMENT,
  `memid` int(11) DEFAULT NULL,
  `trainid` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `statusfront` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`PTid`),
  KEY `memid_idx` (`memid`),
  KEY `trainid_idx` (`trainid`),
  CONSTRAINT `memid` FOREIGN KEY (`memid`) REFERENCES `tbluser` (`userid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `trainid` FOREIGN KEY (`trainid`) REFERENCES `tbltrainer` (`trainerid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbppt`
--

INSERT INTO `tbppt` VALUES (22,85,4,2,'Pending'),(23,84,3,2,'Pending');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed
