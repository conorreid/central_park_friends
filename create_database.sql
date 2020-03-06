-- Open a postgres shell as the superuser (commonly postgres):
-- psql postgres

-- then create a database 
CREATE DATABASE test_central_park_friends;

-- and user
CREATE USER the_people

-- grant priveleges to the user you use locally
-- in my case I login using the the_people user
GRANT ALL ON DATABASE test_central_park_friends TO the_people;
