-- //using database wechat

-- //user account
create table user_account (
	user_id varchar(20) NOT NULL,
	name varchar(20) NOT NULL,
	email varchar(20) NOT NULL,
	nick varchar(20), 
	sex char(5),
	avatar varchar(30),
	sign_info varchar(40),
	password varchar(20) NOT NULL
)DEFAULT CHARSET=utf8;

-- //store the friends list for each user
create table user_friend (
	user_id varchar(20) NOT NULL,
	frined_id varchar(20)
)DEFAULT CHARSET=utf8;

create table message (
	src_name varchar(20),
	dst_name varchar(20),
	content varchar(10000),
	send_time timestamp(14) DEFAULT CURRENT_TIMESTAMP,
	flag smallint
)DEFAULT CHARSET=utf8;