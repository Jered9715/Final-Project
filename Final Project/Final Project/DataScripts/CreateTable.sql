create database FinalProject;

use FinalProject;

create table Users (
	UserId int primary key identity,
	FirstName nvarchar(100),
	LastName nvarchar(100)
);

create table ParkVisitHistory (
	ParkVisitId int primary key identity,
	UserId int,
	ParkNotes nvarchar(MAX),
	DateVisited nvarchar(100),
	foreign key (UserId) references Users(UserId)
);

Create Table Wishlist (
	WishListId int primary key identity,
	UserId int,
	ParkId nvarchar(MAX)
	foreign key (UserId) references Users(UserId)
);