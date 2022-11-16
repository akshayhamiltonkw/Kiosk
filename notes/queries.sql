-- database
-- database creation
create database requeue;

-- delete database
drop database requeue


-- tables

--table consist multiple row and single column 

-- attribute -- total field names of table

-- tuples --row with single relation called as tuples



-- table constraints
-- constraints--  not null,primary key, check default ,foreign key, index ,unique 

-- table queries

create table tablename (
    id int not null auto_increment,
    ename varchar(20),
    address varchar(20),primary key(id)
)

-- insert queries in nodejs first way
sql="INSERT INTO users(name,email,mono) VALUES ?";
let values=[[name,email,mono]];

query(sql,[values]);

-- second way
let sql="INSERT INTO users(name,email,mono) VALUES (?,?,?)";
query(sql,[name,email,mono]);

-- third way
let sql="INSERT INTO users(name,email,mono) VALUES ('"+name+"','"+email+"','"+mono+"')";

query(sql)

-- restaurant table
/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [id]
      ,[name_en]
      ,[name_ar]
      ,[parentID]
      ,[isFull]
      ,[isOpen]
      ,[maxQueue]
      ,[longitude]
      ,[latitude]
      ,[isActive]
      ,[expiredDate]
      ,[creadteDate]
      ,[areaId]
      ,[createdUser]
      ,[address]
      ,[maxGroup]
      ,[openHour]
      ,[closeHour]
      ,[accountType]
      ,[savedTime]
      ,[logo]
      ,[manualOpen]
      ,[manualFull]
      ,[qrCode]
      ,[orderId]
      ,[rating]
      ,[tablesOptions]
      ,[reviews]
      ,[phone]
      ,[status]
      ,[insideActive]
      ,[outsideActive]
      ,[isOpenManual]
      ,[insideFull]
      ,[outsideFull]
      ,[maxInside]
      ,[maxOutside]
      ,[qTime]
      ,[userHold]
      ,[countryID]
      ,[cancelReasonRequired]
      ,[realTimeChannel]
      ,[branchOrderID]
      ,[preOrder]
      ,[conditionsEn]
      ,[conditionsAr]
      ,[QueueCost]
      ,[FastTrackEnabled]
      ,[RequiredTurnUpgrade]
      ,[LilouNotificationNumber]
      ,[LilouNotificationMessageEn]
      ,[LilouNotificationMessageAr]
      ,[AllowFullListAccess]
      ,[LilouCustomMessageEn]
      ,[LilouCustomMessageAr]
      ,[EnableQueueTags]
      ,[RequiredTickets]
      ,[OnlyWalkIn]
      ,[VendorCategory]
      ,[PickupAvailable]
      ,[QueueAvailable]
      ,[ServiceCharges]
      ,[Vat]
      ,[PickupCustomerFees]
      ,[KioskIsFull]
      ,[KioskInsideFull]
      ,[KioskOutsideFull]
      ,[BranchMinQ]
      ,[InsideMinQ]
      ,[OutsideMinQ]
  FROM [requeuedb].[dbo].[tblRestaurants]

-- tablesgroup

  SELECT TOP (1000) [id]
      ,[name]
      ,[gestNumber]
      ,[minimumTime]
      ,[maxTime]
      ,[isActive]
  FROM [requeuedb].[dbo].[tblTablesGroup]


  -- country currency
  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [shortCode]
      ,[country_name]
      ,[country_code]
      ,[country_curancy]
  FROM [requeuedb].[dbo].[CountryCurrency]


  -- order cart table
  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [Id]
      ,[OrderID]
      ,[ItemID]
      ,[Name]
      ,[Details]
      ,[NameArabic]
      ,[DetailsArabic]
      ,[Price]
      ,[Qty]
      ,[CreatedDate]
      ,[Status]
      ,[Type]
      ,[PackagingPrice]
      ,[SpecialRequest]
      ,[OriginalPrice]
  FROM [requeuedb].[dbo].[order_cart]

  --order table
  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [Id]
      ,[UserID]
      ,[UserUUID]
      ,[PaymentMethod]
      ,[PaymentVendor]
      ,[PaymentStatus]
      ,[Channel]
      ,[OrderDate]
      ,[PaymentDate]
      ,[AddressID]
      ,[VoucherCode]
      ,[DiscountType]
      ,[VoucherAmount]
      ,[VendorID]
      ,[Vat]
      ,[VatAmount]
      ,[Status]
      ,[SubTotal]
      ,[DiscountAmount]
      ,[DeliveryCharges]
      ,[GrandTotal]
      ,[CurrentStep]
      ,[Type]
      ,[ResultDate]
      ,[Note]
      ,[Browser]
      ,[IsNew]
      ,[PayPalTransID]
      ,[UserLocale]
      ,[MapAvailable]
      ,[MapUUID]
      ,[UsDoularGrandTotal]
      ,[IP]
      ,[GeneralRequest]
      ,[ExtraCharge]
      ,[VendorCharges]
      ,[PaidFromWallet]
      ,[VoucherId]
      ,[RefundedAmount]
      ,[CustomerFee]
      ,[PickupOption]
      ,[CarMode]
      ,[CarColor]
  FROM [requeuedb].[dbo].[order_orders]


  -- order_service_charges
  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [Id]
      ,[OrderId]
      ,[Amount]
      ,[ServiceDate]
      ,[Type]
  FROM [requeuedb].[dbo].[order_service_charges]

  -- payment request 
  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [Id]
      ,[MapID]
      ,[OrderToken]
      ,[Status]
      ,[ErrorMessage]
      ,[CreatedDate]
      ,[ResultDate]
      ,[ResponseCode]
      ,[Channel]
      ,[CustomerID]
      ,[OrderRequestJson]
      ,[OrderResponseJson]
      ,[PaymentToken]
      ,[Amount]
      ,[PaymentRequestJson]
      ,[PaymentResponseJson]
  FROM [requeuedb].[dbo].[payment_requests]


  -- restaurant delivery time
  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [Id]
      ,[Name]
      ,[FromTime]
      ,[ToTime]
      ,[Saturday]
      ,[Sunday]
      ,[Monday]
      ,[Tuesday]
      ,[Wednesday]
      ,[Thursday]
      ,[Friday]
      ,[Status]
      ,[OrderID]
      ,[RestaurantID]
  FROM [requeuedb].[dbo].[restaurant_deliverytime] 


--table tags

/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [id]
      ,[TableId]
      ,[TagId]
  FROM [requeuedb].[dbo].[table_tags]


  -- table areas
  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [area_id]
      ,[area_name]
      ,[country_id]
      ,[shipping_cost]
      ,[isActive]
      ,[area_name_ar]
      ,[longitude]
      ,[latitude]
  FROM [requeuedb].[dbo].[tblAreas]


-- auto request
/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [id]
      ,[qID]
      ,[restID]
      ,[action]
      ,[status]
      ,[createdDate]
      ,[executeDate]
      ,[channel]
  FROM [requeuedb].[dbo].[tblAutoRequests]


  -- table banners
  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [b_id]
      ,[b_img_en]
      ,[b_img_ar]
      ,[b_url_en]
      ,[b_url_ar]
      ,[b_views]
      ,[isActive]
      ,[creadteDate]
      ,[startDate]
      ,[expiredDate]
      ,[clickStatus]
      ,[clickID]
      ,[type]
      ,[countryId]
  FROM [requeuedb].[dbo].[tblBanners]


  -- table cart
  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [id]
      ,[orderID]
      ,[itemID]
      ,[nameEn]
      ,[nameAr]
      ,[detailsEn]
      ,[detailsAr]
      ,[media]
      ,[price]
      ,[qty]
      ,[status]
      ,[createdDate]
      ,[specialRequest]
      ,[AddedBy]
  FROM [requeuedb].[dbo].[tblCart]




-- cms table
SELECT TOP (1000) [id]
      ,[title]
      ,[cms_key]
      ,[shortDesc]
      ,[cms_desc]
      ,[isActive]
      ,[homeView]
      ,[title_ar]
      ,[shortDesc_ar]
      ,[cms_desc_ar]
  FROM [requeuedb].[dbo].[tblCms]





  -- countries
  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [country_id]
      ,[country_name]
      ,[country_status]
      ,[country_code]
      ,[country_curancy]
      ,[country_name_ar]
      ,[flag]
      ,[restActive]
      ,[length]
      ,[prefix]
      ,[shortCode]
      ,[ticketActive]
      ,[region]
  FROM [requeuedb].[dbo].[tblCountries]




  -- country code
  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [Code_ISO_2]
      ,[Arabic_Name]
      ,[Code_ISO_3]
  FROM [requeuedb].[dbo].[tblCountryCodes]




  -- credit card

  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [id]
      ,[orderID]
      ,[type]
      ,[status]
      ,[statusString]
      ,[errorMessage]
      ,[createdDate]
      ,[resultDate]
      ,[lang]
      ,[authentication]
      ,[channel]
      ,[Message]
  FROM [requeuedb].[dbo].[tblCreditCardRef]



  -- CustomerSubscriptionStatement
  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [id]
      ,[userID]
      ,[type]
      ,[balanceBefor]
      ,[balance]
      ,[createdDate]
      ,[detailsEn]
      ,[detailsAr]
      ,[status]
      ,[refreanceID]
  FROM [requeuedb].[dbo].[tblCustomerSubscriptionStatement]



  -- devices
  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [d_id]
      ,[d_token]
      ,[type]
      ,[isActive]
      ,[clientID]
      ,[createdDate]
      ,[version_id]
      ,[language]
      ,[lastActive]
      ,[deviceUUID]
      ,[country]
  FROM [requeuedb].[dbo].[tblDevices]




  -- favorite
  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [id]
      ,[clientId]
      ,[restId]
      ,[createdDate]
  FROM [requeuedb].[dbo].[tblFavorite]



  -- food type
  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [id]
      ,[name_en]
      ,[name_ar]
      ,[isActive]
      ,[orderId]
  FROM [requeuedb].[dbo].[tblFoodType]



  -- foodtyperestmap
  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [id]
      ,[rest_id]
      ,[type_id]
  FROM [requeuedb].[dbo].[tblFoodTypeRestMap]



  -- groupsRoul
  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [roul_id]
      ,[roul_title]
      ,[roul_key]
  FROM [requeuedb].[dbo].[tblGroupsRoul]



  -- knet table
  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [knet_id]
      ,[paymentID]
      ,[result]
      ,[postdate]
      ,[tranid]
      ,[auth]
      ,[trackid]
      ,[refr]
      ,[udf1]
      ,[udf2]
      ,[udf3]
      ,[udf4]
      ,[udf5]
      ,[result_date]
      ,[knet_result]
      ,[amout]
      ,[type]
      ,[user_ip]
      ,[postdate_org]
  FROM [requeuedb].[dbo].[tblKnet]






-- user table
/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [user_id]
      ,[user_title]
      ,[userName]
      ,[user_password]
      ,[user_group]
      ,[created_date]
      ,[is_active]
      ,[rest_id]
      ,[branch_id]
  FROM [requeuedb].[dbo].[tblUsers]


-- client table
/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [client_id]
      ,[client_name]
      ,[client_phone]
      ,[created_date]
      ,[client_status]
      ,[client_gender]
      ,[password]
      ,[mail]
      ,[birthDate]
      ,[points]
      ,[longitude]
      ,[latitude]
      ,[country]
      ,[savedTime]
      ,[createdMethod]
      ,[userId]
      ,[restId]
      ,[lastSeen]
      ,[avatar]
      ,[activationStep]
      ,[walletBalance]
      ,[realTimeChannel]
      ,[freeQueue]
      ,[subscription]
      ,[subscriptionExpiredOn]
      ,[totalQueue]
      ,[AddedFreeQueue]
      ,[LoginPassword]
      ,[hasApp]
  FROM [requeuedb].[dbo].[tblClient]


-- queue table
/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [id]
      ,[rest_id]
      ,[client_id]
      ,[createdDate]
      ,[minmumGroup]
      ,[maxGroup]
      ,[minmumTime]
      ,[maxTime]
      ,[checkoutUser]
      ,[queueNumber]
      ,[status]
      ,[checkoutDate]
      ,[expectedDate]
      ,[requeuedTemp]
      ,[createdUser]
      ,[position]
      ,[firstQueue]
      ,[insidePosition]
      ,[outsidePosition]
      ,[selectedPosition]
      ,[selectedqNumber]
      ,[isCheckedIn]
      ,[checkedInDate]
      ,[isCalled]
      ,[note]
      ,[callStatus]
      ,[callDate]
      ,[type]
      ,[holdDate]
      ,[clientRequeue]
      ,[clientNote]
      ,[channel]
      ,[notifyDate]
      ,[cancelationReason]
      ,[notifiyTime]
      ,[timeGivingBeforAutoAction]
      ,[category]
      ,[hasOrder]
      ,[realTimeChannel]
      ,[shareStatus]
      ,[IsPaid]
      ,[IsPaidFree]
      ,[QueueTagID]
      ,[LilouCustomNotificationSent]
      ,[LilouCustomNotificationSentDate]
      ,[QueueSubTagID]
      ,[AreaName]
      ,[AreaNameAr]
      ,[InitTurn]
      ,[SeatedTurn]
  FROM [requeuedb].[dbo].[tblQueue]

  


-- procedures for tables
USE [requeuedb]
GO
/****** Object:  StoredProcedure [dbo].[usp_WorkingHours]    Script Date: 18-10-2022 00:14:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[usp_WorkingHours]
    @QueryName NVARCHAR(50),
	@WHId INT = NULL OUTPUT,
	@restId INT,
	@name NVARCHAR(150),
	@openHour TIME(7),
	@closeHour TIME(7),
	@sunday BIT,
	@monday BIT,
	@tuesday BIT,
	@wednesday BIT,
	@thursday BIT,
	@friday BIT,
	@saturday BIT,
	@active BIT
AS
BEGIN
	IF(@QueryName='Add')
	BEGIN
		IF @Active=1 AND @sunday=1 AND EXISTS(SELECT 1 FROM tblWorkingHours WHERE restId=@restId AND Active=1 AND sunday=1)
		BEGIN;
			THROW 50001,'Schedule for Sunday is already available in the other active schedule.',1
		END

		IF @Active=1 AND @monday=1 AND EXISTS(SELECT 1 FROM tblWorkingHours WHERE restId=@restId AND Active=1 AND monday=1)
		BEGIN;
			THROW 50001,'Schedule for Monday is already available in the other active schedule.',1
		END

		IF @Active=1 AND @tuesday=1 AND EXISTS(SELECT 1 FROM tblWorkingHours WHERE restId=@restId AND Active=1 AND tuesday=1)
		BEGIN;
			THROW 50001,'Schedule for Tuesday is already available in the other active schedule.',1
		END

		IF @Active=1 AND @wednesday=1 AND EXISTS(SELECT 1 FROM tblWorkingHours WHERE restId=@restId AND Active=1 AND wednesday=1)
		BEGIN;
			THROW 50001,'Schedule for Wednesday is already available in the other active schedule.',1
		END

		IF @Active=1 AND @thursday=1 AND EXISTS(SELECT 1 FROM tblWorkingHours WHERE restId=@restId AND Active=1 AND thursday=1)
		BEGIN;
			THROW 50001,'Schedule for Thursday is already available in the other active schedule.',1
		END

		IF @Active=1 AND @friday=1 AND EXISTS(SELECT 1 FROM tblWorkingHours WHERE restId=@restId AND Active=1 AND friday=1)
		BEGIN;
			THROW 50001,'Schedule for Friday is already available in the other active schedule.',1
		END

		IF @Active=1 AND @saturday=1 AND EXISTS(SELECT 1 FROM tblWorkingHours WHERE restId=@restId AND Active=1 AND saturday=1)
		BEGIN;
			THROW 50001,'Schedule for Saturday is already available in the other active schedule.',1
		END

		IF @Active=1 AND EXISTS(SELECT 1 FROM tblWorkingHours WHERE restId=@restId AND Active=1 AND ((CONVERT(TIME,openHour) BETWEEN CONVERT(TIME,@openHour) AND CONVERT(TIME,@closeHour)) OR (CONVERT(TIME,closeHour) BETWEEN CONVERT(TIME,@openHour) AND CONVERT(TIME,@closeHour))))
		BEGIN;
			THROW 50001,'Scheduled Time is overlapping with Other Shedule.',1
		END

		INSERT INTO tblWorkingHours(restId,[name],openHour,closeHour,sunday,monday,tuesday,wednesday,thursday,friday,saturday,active)
		VALUES (@restId,@name,@openHour,@closeHour,@sunday,@monday,@tuesday,@wednesday,@thursday,@friday,@saturday,@active)

		SET @WHId= @@IDENTITY
	END

	IF(@QueryName='Update')
	BEGIN
		IF @Active=1 AND @sunday=1 AND EXISTS(SELECT 1 FROM tblWorkingHours WHERE id<>@WHId AND restId=@restId AND Active=1 AND sunday=1)
		BEGIN;
			THROW 50001,'Schedule for Sunday is already available in the other active schedule.',1
		END

		IF @Active=1 AND @monday=1 AND EXISTS(SELECT 1 FROM tblWorkingHours WHERE id<>@WHId AND restId=@restId AND Active=1 AND monday=1)
		BEGIN;
			THROW 50001,'Schedule for Monday is already available in the other active schedule.',1
		END

		IF @Active=1 AND @tuesday=1 AND EXISTS(SELECT 1 FROM tblWorkingHours WHERE id<>@WHId AND restId=@restId AND Active=1 AND tuesday=1)
		BEGIN;
			THROW 50001,'Schedule for Tuesday is already available in the other active schedule.',1
		END

		IF @Active=1 AND @wednesday=1 AND EXISTS(SELECT 1 FROM tblWorkingHours WHERE id<>@WHId AND restId=@restId AND Active=1 AND wednesday=1)
		BEGIN;
			THROW 50001,'Schedule for Wednesday is already available in the other active schedule.',1
		END

		IF @Active=1 AND @thursday=1 AND EXISTS(SELECT 1 FROM tblWorkingHours WHERE id<>@WHId AND restId=@restId AND Active=1 AND thursday=1)
		BEGIN;
			THROW 50001,'Schedule for Thursday is already available in the other active schedule.',1
		END

		IF @Active=1 AND @friday=1 AND EXISTS(SELECT 1 FROM tblWorkingHours WHERE id<>@WHId AND restId=@restId AND Active=1 AND friday=1)
		BEGIN;
			THROW 50001,'Schedule for Friday is already available in the other active schedule.',1
		END

		IF @Active=1 AND @saturday=1 AND EXISTS(SELECT 1 FROM tblWorkingHours WHERE id<>@WHId AND restId=@restId AND Active=1 AND saturday=1)
		BEGIN;
			THROW 50001,'Schedule for Saturday is already available in the other active schedule.',1
		END

		IF @Active=1 AND EXISTS(SELECT 1 FROM tblWorkingHours WHERE id<>@WHId AND restId=@restId AND Active=1 AND ((CONVERT(TIME,openHour) BETWEEN CONVERT(TIME,@openHour) AND CONVERT(TIME,@closeHour)) OR (CONVERT(TIME,closeHour) BETWEEN CONVERT(TIME,@openHour) AND CONVERT(TIME,@closeHour))))
		BEGIN;
			THROW 50001,'Scheduled Time is overlapping with Other Shedule.',1
		END

		UPDATE tblWorkingHours
		SET [name]=@name,
		openHour=@openHour,
		closeHour=@closeHour,
		sunday=@sunday,
		monday=@monday,
		tuesday=@tuesday,
		wednesday=@wednesday,
		thursday=@thursday,
		friday=@friday,
		saturday=@saturday,
		active=@active
		WHERE id=@WHId AND restId=@restId
	END
	
END




USE [requeuedb]
GO
/****** Object:  StoredProcedure [dbo].[usp_RestSummaryGet]    Script Date: 18-10-2022 00:09:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[usp_RestSummaryGet]

@RestId INT

AS

BEGIN
	SELECT * FROM (
	(SELECT COUNT(1) as TotalTable from tblTables where restId=@RestId AND isActive=1) A
	LEFT JOIN 
	(SELECT COUNT(1) as BusyTable from tblTables where restId=@RestId AND isActive=1 AND isAvailable=0) B
	ON 1=1
	LEFT JOIN 
	(SELECT SUM(chares) as TotalChairs from tblTables where restId=@RestId AND isActive=1) C
	ON 1=1
	LEFT JOIN 
	(SELECT SUM(chares) as WalkingChairs from tblTables WHERE restId=@RestId AND id IN (SELECT tableId FROM tblQueueTableMap WHERE qId IS NOT NULL AND status=0)) D
	ON 1=1
	LEFT JOIN 
	(select COUNT(1) as TodayQueue from tblQueue WHERE rest_id=@RestId  AND status IN(0,1,6,7) AND DATEDIFF(HOUR,createdDate,GETDATE())<5) E
	ON 1=1
	LEFT JOIN 
	(select COUNT(1) as TotalHold from tblQueue WHERE rest_id=@RestId  AND status IN(8,9) AND DATEDIFF(HOUR,createdDate,GETDATE())<5) F
	ON 1=1
	LEFT JOIN 
	(select COUNT(1) as TotalSeat from tblQueue WHERE rest_id=@RestId  AND status IN(2,3) AND CONVERT(DATE,createdDate)=CONVERT(DATE,GETDATE())) G
	ON 1=1
	LEFT JOIN 
	(select COUNT(1) as TotalCanceled from tblQueue WHERE rest_id=@RestId  AND status IN(4,5) AND CONVERT(DATE,createdDate)=CONVERT(DATE,GETDATE())) H
	ON 1=1
	LEFT JOIN 
	(select COUNT(1) as TotalQueue from tblQueue WHERE rest_id=@RestId  AND (status IN(0,1,6,7,8,9) AND DATEDIFF(HOUR,createdDate,GETDATE())<5) OR (status IN(2,3,4,5) AND CONVERT(DATE,createdDate)=CONVERT(DATE,GETDATE()))) I
	ON 1=1
	LEFT JOIN 
	(SELECT [value] as InsideName FROM tblRestSettings WHERE restID=@RestId AND settingKey=6) J
	ON 1=1
	LEFT JOIN 
	(SELECT [value] as OutsideName FROM tblRestSettings WHERE restID=@RestId AND settingKey=7) K
	ON 1=1
	)
END




USE [requeuedb]
GO
/****** Object:  StoredProcedure [dbo].[usp_TestProc]    Script Date: 18-10-2022 00:10:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[usp_TestProc]
@RestId INT=NULL
AS

BEGIN

DECLARE @tbl TABLE(RestId INT, RestName NVARCHAR(250))

INSERT INTO @tbl
VALUES(1, 'MUGHAL MAHAL')

INSERT INTO @tbl
VALUES(2, 'AVANTI PALACE')	

INSERT INTO @tbl
VALUES(3, 'FREEJ')	

INSERT INTO @tbl
VALUES(4, 'CHOCOLATE BAR')	

INSERT INTO @tbl
VALUES(5, 'DIP & DIP')	


SELECT * FROM @tbl WHERE ISNULL(@RestId,0)=0 OR RestId=@RestId
	
END



