drop table if exists Users;	
drop table if exists tags;	
drop table if exists todolist;	
CREATE TABLE Users (	
    UserID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,	
    UserName varchar(255)	
);	
CREATE TABLE Tags (	
    TagID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT ,	
    TagName varchar(255)	
);	
CREATE TABLE TodoList (	
	TodoID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT ,
	TodoItem VARCHAR (255),
	IsDone BIT ,
	DateCreated DATE ,
	UserID INT,
	TagID INT
	);
	
-- Adam signs up for the TODO APP	
insert INTO USERS (userName)	
values('Adam');	

-- Adam must go to the dentist
	
insert into TodoList (isdone,datecreated,todoitem,UserID)	
values (0,'1/1/2018','Go to the dentist',1);	
	
-- Adam puts a "health" tag on the dentist todo
insert into Tags (tagname)	
values ('Health');	
	
UPDATE TodoList	
SET tagID=1	
WHERE todoid=1;	
	
-- Adam needs to pick up kids from school
insert into TodoList (isdone,datecreated,todoitem,UserID)	
values (0,'2/9/2018','Pick up kids from school',1);	

-- Adam remembers that actually, he needs to pick up the kids from the swimming pool, not the school
UPDATE TodoList	
SET todoitem='Pick up the kids from the swimming pool'	
WHERE todoid=2;	
	
-- Adam must walk the dog	
insert into TodoList (isdone,datecreated,todoitem,UserID)	
values (0,'7/9/2018','Walk the dog',1);	
	
-- Beth signs up for the TODO APP
insert INTO USERS (userName)	
values('Beth');	

-- Beth needs to visit her father, and puts the "family" tag on it	
insert into Tags (tagname)	
values ('Family');	
	
insert into TodoList (isdone,datecreated,todoitem,UserID,TagID)	
values (0,'5/9/2018','Visit her father',2,2);	
	
	
-- Beth must go to the doctor	
insert into TodoList (isdone,datecreated,todoitem,UserID)	
values (0,date('now'),'Go to the doctor',2);	
	
-- Beth puts a "health" tag on the doctor todo	
update TodoList set TagID = 1 where TodoID=5;	
	
insert into TodoList (isdone , datecreated,todoitem,userId,tagid)	
values (0,date('now'),'Brush teeth',2,1);	
	
insert into Tags (tagname)	
values ('Urgent');	
update TodoList set tagID = 3 where TodoID=1;	
	
-- Adam has picked up the kids from school, and has walked the dog	
update TodoList set isDone=1 where todoID=2 or todoid=3; 	
	
-- Adam deletes all tasks that are marked as done
delete  from TodoList where isdone=1;

-- Adam decides he doesn't like the app and removes his account
delete from TodoList 
where userid in (select userid from Users  where username='Adam');
delete from users 
where username='Adam';

-- Beth marks all tasks with a health tag as done
UPDATE TodoList
set isdone=1 where tagid in (select tagid from tags where tagname='Health');


-- Beth convinces Adam to sign back up, and to put back his urgent dentist task on it
insert into users (username) values ('Adam');
insert into TodoList(isdone,datecreated,todoitem,userid,tagid)
values (0,date('now'),'Go to the dentist',3,3);

-- Adam creates a todo which says "Use the todo app more often"
insert into TodoList (isdone,datecreated,todoitem,userid)
values (0,date('now'),'Use the todo app more often',3)


