USE [master]
GO
/****** Object:  Database [template_database_backend]    Script Date: 14/02/2025 09:09:34 ******/
CREATE DATABASE [template_database_backend]
 CONTAINMENT = NONE

 WITH LEDGER = OFF
GO
ALTER DATABASE [template_database_backend] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [template_database_backend].[dbo].[sp_fulltext_database] @action = 'disable'
end
GO
ALTER DATABASE [template_database_backend] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [template_database_backend] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [template_database_backend] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [template_database_backend] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [template_database_backend] SET ARITHABORT OFF 
GO
ALTER DATABASE [template_database_backend] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [template_database_backend] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [template_database_backend] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [template_database_backend] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [template_database_backend] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [template_database_backend] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [template_database_backend] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [template_database_backend] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [template_database_backend] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [template_database_backend] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [template_database_backend] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [template_database_backend] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [template_database_backend] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [template_database_backend] SET DB_CHAINING OFF 
GO
EXEC sys.sp_db_vardecimal_storage_format N'template_database_backend', N'ON'
GO
ALTER DATABASE [template_database_backend] SET ENCRYPTION ON
GO
ALTER DATABASE [template_database_backend] SET QUERY_STORE = ON
GO
ALTER DATABASE [template_database_backend] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 100, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [template_database_backend]
GO
/****** Object:  User [user-itot-cmms]    Script Date: 14/02/2025 09:09:35 ******/
CREATE USER [user-itot-cmms] FOR LOGIN [user-itot-cmms] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [user-itot-cmms]
GO
ALTER ROLE [db_accessadmin] ADD MEMBER [user-itot-cmms]
GO
ALTER ROLE [db_securityadmin] ADD MEMBER [user-itot-cmms]
GO
ALTER ROLE [db_ddladmin] ADD MEMBER [user-itot-cmms]
GO
ALTER ROLE [db_backupoperator] ADD MEMBER [user-itot-cmms]
GO
ALTER ROLE [db_datareader] ADD MEMBER [user-itot-cmms]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [user-itot-cmms]
GO
/****** Object:  Table [dbo].[makanan]    Script Date: 14/02/2025 09:09:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[makanan](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nama] [nvarchar](100) NOT NULL,
	[deskripsi] [nvarchar](max) NULL,
	[harga] [decimal](10, 2) NOT NULL,
	[stok] [int] NOT NULL,
	[created_at] [datetime2](7) NOT NULL,
	[updated_at] [datetime2](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users]    Script Date: 14/02/2025 09:09:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [nvarchar](255) NOT NULL,
	[password] [nvarchar](255) NOT NULL,
	[created_at] [datetime2](7) NOT NULL,
	[updated_at] [datetime2](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[makanan] ON 

INSERT [dbo].[makanan] ([id], [nama], [deskripsi], [harga], [stok], [created_at], [updated_at]) VALUES (1, N'Nasi Goreng', N'Nasi goreng dengan topping ayam', CAST(15000.00 AS Decimal(10, 2)), 10, CAST(N'2024-10-17T01:07:10.0000000' AS DateTime2), CAST(N'2024-10-17T01:07:10.0000000' AS DateTime2))
INSERT [dbo].[makanan] ([id], [nama], [deskripsi], [harga], [stok], [created_at], [updated_at]) VALUES (2, N'Nasi Goreng Spesial', N'Nasi goreng dengan topping ayam dan telur', CAST(20000.00 AS Decimal(10, 2)), 15, CAST(N'2024-10-17T03:21:36.0000000' AS DateTime2), CAST(N'2024-10-17T03:21:58.0000000' AS DateTime2))
INSERT [dbo].[makanan] ([id], [nama], [deskripsi], [harga], [stok], [created_at], [updated_at]) VALUES (3, N'Coba ts', N'Nasi goreng spesial', CAST(15000.00 AS Decimal(10, 2)), 10, CAST(N'2024-11-19T07:25:45.9007814' AS DateTime2), CAST(N'2024-11-19T07:25:45.9007814' AS DateTime2))
INSERT [dbo].[makanan] ([id], [nama], [deskripsi], [harga], [stok], [created_at], [updated_at]) VALUES (4, N'Nasi Goreng', N'Nasi goreng spesial', CAST(15000.00 AS Decimal(10, 2)), 10, CAST(N'2024-11-19T08:56:52.9716505' AS DateTime2), CAST(N'2024-11-19T08:56:52.9716505' AS DateTime2))
INSERT [dbo].[makanan] ([id], [nama], [deskripsi], [harga], [stok], [created_at], [updated_at]) VALUES (5, N'Nasi Goreng', N'Nasi goreng spesial', CAST(15000.00 AS Decimal(10, 2)), 10, CAST(N'2024-11-20T00:55:48.8850000' AS DateTime2), CAST(N'2024-11-20T00:55:48.8850000' AS DateTime2))
INSERT [dbo].[makanan] ([id], [nama], [deskripsi], [harga], [stok], [created_at], [updated_at]) VALUES (6, N'Nasi Goreng', N'Nasi goreng spesial', CAST(15000.00 AS Decimal(10, 2)), 10, CAST(N'2024-11-20T00:58:30.7870000' AS DateTime2), CAST(N'2024-11-20T00:58:30.7870000' AS DateTime2))
INSERT [dbo].[makanan] ([id], [nama], [deskripsi], [harga], [stok], [created_at], [updated_at]) VALUES (7, N'Nasi Goreng', N'Nasi goreng spesial', CAST(15000.00 AS Decimal(10, 2)), 10, CAST(N'2024-11-20T01:08:05.9100000' AS DateTime2), CAST(N'2024-11-20T01:08:05.9110000' AS DateTime2))
INSERT [dbo].[makanan] ([id], [nama], [deskripsi], [harga], [stok], [created_at], [updated_at]) VALUES (8, N'Nasi Goreng', N'Nasi goreng spesial', CAST(15000.00 AS Decimal(10, 2)), 10, CAST(N'2024-11-20T01:39:41.4500000' AS DateTime2), CAST(N'2024-11-20T01:39:41.4500000' AS DateTime2))
INSERT [dbo].[makanan] ([id], [nama], [deskripsi], [harga], [stok], [created_at], [updated_at]) VALUES (9, N'Nasi Goreng', N'Nasi goreng spesial', CAST(15000.00 AS Decimal(10, 2)), 10, CAST(N'2024-11-20T01:45:36.7340000' AS DateTime2), CAST(N'2024-11-20T01:45:36.7370000' AS DateTime2))
INSERT [dbo].[makanan] ([id], [nama], [deskripsi], [harga], [stok], [created_at], [updated_at]) VALUES (10, N'Nasi Goreng', N'Nasi goreng spesial', CAST(15000.00 AS Decimal(10, 2)), 10, CAST(N'2024-11-20T01:56:02.5560000' AS DateTime2), CAST(N'2024-11-20T01:56:02.5590000' AS DateTime2))
INSERT [dbo].[makanan] ([id], [nama], [deskripsi], [harga], [stok], [created_at], [updated_at]) VALUES (11, N'Nasi Goreng', N'Nasi goreng spesial', CAST(15000.00 AS Decimal(10, 2)), 10, CAST(N'2024-11-20T01:57:39.5390000' AS DateTime2), CAST(N'2024-11-20T01:57:39.5420000' AS DateTime2))
INSERT [dbo].[makanan] ([id], [nama], [deskripsi], [harga], [stok], [created_at], [updated_at]) VALUES (12, N'Nasi Goreng', N'Nasi goreng spesial', CAST(15000.00 AS Decimal(10, 2)), 10, CAST(N'2024-11-20T01:58:18.7270000' AS DateTime2), CAST(N'2024-11-20T01:58:18.7280000' AS DateTime2))
INSERT [dbo].[makanan] ([id], [nama], [deskripsi], [harga], [stok], [created_at], [updated_at]) VALUES (13, N'Nasi Goreng', N'Nasi goreng spesial', CAST(15000.00 AS Decimal(10, 2)), 10, CAST(N'2024-11-20T01:58:52.5720000' AS DateTime2), CAST(N'2024-11-20T01:58:52.5740000' AS DateTime2))
INSERT [dbo].[makanan] ([id], [nama], [deskripsi], [harga], [stok], [created_at], [updated_at]) VALUES (14, N'Nasi Goreng', N'Nasi goreng spesial', CAST(15000.00 AS Decimal(10, 2)), 10, CAST(N'2024-11-20T06:24:31.5070000' AS DateTime2), CAST(N'2024-11-20T06:24:57.7060000' AS DateTime2))
INSERT [dbo].[makanan] ([id], [nama], [deskripsi], [harga], [stok], [created_at], [updated_at]) VALUES (15, N'Nasi Goreng', N'Nasi goreng spesial', CAST(15000.00 AS Decimal(10, 2)), 10, CAST(N'2025-02-13T11:44:08.0450000' AS DateTime2), CAST(N'2025-02-13T11:44:08.0450000' AS DateTime2))
INSERT [dbo].[makanan] ([id], [nama], [deskripsi], [harga], [stok], [created_at], [updated_at]) VALUES (16, N'Nasi Goreng', N'Nasi goreng spesial', CAST(15000.00 AS Decimal(10, 2)), 10, CAST(N'2025-02-13T11:44:09.7690000' AS DateTime2), CAST(N'2025-02-13T11:44:09.7690000' AS DateTime2))
INSERT [dbo].[makanan] ([id], [nama], [deskripsi], [harga], [stok], [created_at], [updated_at]) VALUES (17, N'Nasi Goreng', N'Nasi goreng spesial', CAST(15000.00 AS Decimal(10, 2)), 10, CAST(N'2025-02-13T11:44:10.8580000' AS DateTime2), CAST(N'2025-02-13T11:44:10.8580000' AS DateTime2))
INSERT [dbo].[makanan] ([id], [nama], [deskripsi], [harga], [stok], [created_at], [updated_at]) VALUES (18, N'Nasi Goreng', N'Nasi goreng spesial', CAST(15000.00 AS Decimal(10, 2)), 10, CAST(N'2025-02-13T11:44:26.9420000' AS DateTime2), CAST(N'2025-02-13T11:44:26.9420000' AS DateTime2))
SET IDENTITY_INSERT [dbo].[makanan] OFF
GO
SET IDENTITY_INSERT [dbo].[users] ON 

INSERT [dbo].[users] ([id], [username], [password], [created_at], [updated_at]) VALUES (1, N'user1@gmail.com', N'$2a$10$vaDvjY3PSxLk.VTCE.ibtOx9S0fu4n98uy5kTW7dyeTH/wSU8ZtM.', CAST(N'2024-10-21T01:48:56.0000000' AS DateTime2), CAST(N'2024-10-21T01:48:56.0000000' AS DateTime2))
INSERT [dbo].[users] ([id], [username], [password], [created_at], [updated_at]) VALUES (2, N'user2@gmail.com', N'$2a$10$UkRjsWma.f3EUsDL99oJP.my1BcysAhnTDcGbeioaoxmPfJ8AJ8k6', CAST(N'2024-10-22T02:34:31.9136826' AS DateTime2), CAST(N'2024-10-22T02:34:31.9136826' AS DateTime2))
INSERT [dbo].[users] ([id], [username], [password], [created_at], [updated_at]) VALUES (3, N'bimo@gmail.com', N'$2a$10$RNQ7otMk00l5B/q9yA8kVOWWh2mK0z0BBedpnCR.gmPrnTjCMPkOe', CAST(N'2024-11-19T08:55:25.3768527' AS DateTime2), CAST(N'2024-11-19T08:55:25.3768527' AS DateTime2))
INSERT [dbo].[users] ([id], [username], [password], [created_at], [updated_at]) VALUES (4, N'aryo@gmail.com', N'$2a$10$OcbCOSvfeHi3LSdiAR3w/.PlA/n3WkMl1woKaEF7rZSvECnoe7m6e', CAST(N'2024-11-20T01:37:02.8290000' AS DateTime2), CAST(N'2024-11-20T01:37:02.8310000' AS DateTime2))
INSERT [dbo].[users] ([id], [username], [password], [created_at], [updated_at]) VALUES (6, N'tes@gmail.com', N'$2a$10$1ngjsMD36tyCm01xWPNltu6e35OxOq2/rDuSOMYyM7HgHb8N7/DGm', CAST(N'2024-11-20T01:47:48.4520000' AS DateTime2), CAST(N'2024-11-20T01:47:48.4550000' AS DateTime2))
SET IDENTITY_INSERT [dbo].[users] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__users__F3DBC57229B2645D]    Script Date: 14/02/2025 09:09:35 ******/
ALTER TABLE [dbo].[users] ADD UNIQUE NONCLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[makanan] ADD  CONSTRAINT [DF__makanan__created__29221CFB]  DEFAULT (NULL) FOR [created_at]
GO
ALTER TABLE [dbo].[makanan] ADD  CONSTRAINT [DF__makanan__updated__2A164134]  DEFAULT (NULL) FOR [updated_at]
GO
ALTER TABLE [dbo].[users] ADD  CONSTRAINT [DF__users_nod__creat__2DE6D218]  DEFAULT (NULL) FOR [created_at]
GO
ALTER TABLE [dbo].[users] ADD  CONSTRAINT [DF__users_nod__updat__2EDAF651]  DEFAULT (NULL) FOR [updated_at]
GO
