/* Database for E Wallet App ( Electronic Wallet ) */

/* Create Database with name e_wallet_db */
create database `e_wallet_db`;

/* Use e_wallet_db to execute furthur queries */
use `e_wallet_db`;

/* Users */
create table `e_wallet_db`.`users` (
	UserID int not null auto_increment,
    UserName varchar(25) not null,
    Email varchar(40) not null unique,
    Password varchar(15) not null,
    primary key (UserID)
    );

/* To Store Expense Categories */
create table `e_wallet_db`.`categories` (
	categoryID int not null auto_increment,
    categoryname varchar(40) not null,
    userID int not null	,
    primary key (categoryID),
    foreign key (userID) references users(UserID)
    );

/* User Ledger to keep track of transactions */
create table `e_wallet_db`.`ledger` (
	LedgerID int not null auto_increment,
    UserID int not null,
    DepositAmount int null,
    DepositDate date null,
    WithdrawAmount int null,
    WithdrawDate date null,
    Balance int not null,
    primary key (LedgerID),
    foreign key (UserID) references users(UserID)
	);

/* Wallets */
create table `e_wallet_db`.`wallets` (
	WalletID int not null auto_increment,
    UserID int not null,
    Balance int not null,
    primary key (WalletID),
    foreign key (UserID) references users(UserID)
	);
    
/* To Store Expenses */
create table `e_wallet_db`.`expenses` (
	ExpenseID int not null auto_increment,
    Description varchar(40) not null,
    ExpenseAmount int not null,
    CategoryID int not null,
    ExpenseDate date not null,
    WalletID int not null,
    primary key (ExpenseID),
    foreign key (WalletID) references wallets(WalletID),
    foreign key (CategoryID) references categories(CategoryID)
	);
    
