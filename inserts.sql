Insert into ADMIN.USERS (USERNAME, EMAIL, PHONE_NUMBER) values 
('Julián Enrique Espinoza Valenzuela', 'A01254679@tec.mx', '662 480 4758'),
('Santiago Gutiérrez González', 'A00572499@tec.mx', '479 137 0321'),
('Alejandro Moncada Espinosa', 'A01638343@tec.mx', '33 3839 9271'),
('Ana Camila Jimenez Mendoza', 'A01174422@tec.mx', '33 2420 0442'),
('Jorge Ivan Sanchez Gonzalez', 'A01761414@tec.mx', '33 3450 1843');

Insert into ADMIN.CATEGORIES (NAME) values ('Sprint');

Insert into ADMIN.TEAMS (TEAM_NAME, TEAM_SIZE, MANAGER) values ('team24', 5, NULL);

Insert into ADMIN.EMPLOYEES (USER_ID, TEAM_ID, ROLE, CREATED_AT) values
(1, 1, 'Manager', to_timestamp('27/02/25 10:00:00.000000000','DD/MM/RR HH24:MI:SSXFF')),
(2, 1, 'Developer', to_timestamp('27/02/25 10:05:00.000000000','DD/MM/RR HH24:MI:SSXFF')),
(3, 1, 'Developer', to_timestamp('27/02/25 10:10:00.000000000','DD/MM/RR HH24:MI:SSXFF')),
(4, 1, 'Developer', to_timestamp('27/02/25 10:15:00.000000000','DD/MM/RR HH24:MI:SSXFF')),
(5, 1, 'Developer', to_timestamp('27/02/25 10:20:00.000000000','DD/MM/RR HH24:MI:SSXFF'));

UPDATE ADMIN.TEAMS SET MANAGER = 1 WHERE TEAM_NAME = 'team24';

Insert into ADMIN.MODULES (TITLE, CATEGORY_ID, STATUS, SEVERITY, START_DATE, DATE_LIMIT, PARENT_MODULE) values
('Study and Preparation', 1, 1, 2, to_date('05/04/25','DD/MM/RR'), to_date('19/04/25','DD/MM/RR'), NULL),
('Getting Close To Oracle', 1, 1, 2, to_date('05/04/25','DD/MM/RR'), to_date('19/04/25','DD/MM/RR'), NULL),
('Front-End Development', 1, 1, 2, to_date('05/04/25','DD/MM/RR'), to_date('19/04/25','DD/MM/RR'), NULL),
('Back-End Development', 1, 1, 2, to_date('05/04/25','DD/MM/RR'), to_date('19/04/25','DD/MM/RR'), NULL),
('System Integration', 1, 1, 2, to_date('05/04/25','DD/MM/RR'), to_date('19/04/25','DD/MM/RR'), NULL),
('ORACLE Stand-Up Prep', 1, 1, 2, to_date('05/04/25','DD/MM/RR'), to_date('19/04/25','DD/MM/RR'), NULL),
('Data-Base Development', 1, 1, 2, to_date('05/04/25','DD/MM/RR'), to_date('19/04/25','DD/MM/RR'), NULL),
('Oracle project', 1, 1, 2, to_date('27/02/25','DD/MM/RR'), to_date('15/03/25','DD/MM/RR'), NULL),
('Desarrollo del Login', 1, 1, 2, to_date('10/04/25','DD/MM/RR'), to_date('17/04/25','DD/MM/RR'), NULL);

Insert into ADMIN.TASKS (TITLE, MODULE_ID, DATE_LIMIT, RESPONSIBLE, ENDING_DATE, ESTIMATED_TIME, ACTUAL_TIME, CREATION_TS, DONE, STORY_POINTS) values
('OCI and Cloud Native Study', 1, NULL, NULL, NULL, 3, 5, to_timestamp('05/04/25 14:50:36.399389000','DD/MM/RR HH24:MI:SSXFF'), 1, 7),
('Implement login', 9, NULL, NULL, NULL, 4, 4, to_timestamp('25/04/25 02:58:19.819203000','DD/MM/RR HH24:MI:SSXFF'), 1, 4),
('demo video', 6, to_date('25/04/25','DD/MM/RR'), NULL, NULL, 1, NULL, to_timestamp('25/04/25 04:02:14.041358000','DD/MM/RR HH24:MI:SSXFF'), 0, 1),
('Select the change to do for first period.', 2, NULL, NULL, NULL, 2, 6, to_timestamp('05/04/25 14:54:39.768315000','DD/MM/RR HH24:MI:SSXFF'), 1, 3),
('Task and responsibility administration for second and third period.', 8, NULL, NULL, NULL, 1, 2, to_timestamp('05/04/25 14:56:33.220188000','DD/MM/RR HH24:MI:SSXFF'), 1, 5),
(NULL, 8, NULL, 3, NULL, 0, 2, to_timestamp('05/04/25 15:34:48.380708000','DD/MM/RR HH24:MI:SSXFF'), 1, 5),
('Initial task and responsabilities distribution.', 2, NULL, 1, NULL, 1, 1, to_timestamp('05/04/25 14:51:16.386314000','DD/MM/RR HH24:MI:SSXFF'), 1, 3),
('Connect UI to API endpoints', 3, NULL, 4, NULL, 3, 7, to_timestamp('05/04/25 15:10:58.428912000','DD/MM/RR HH24:MI:SSXFF'), 1, 6),
('Understanding of the gived Back-End logic', 4, NULL, 4, NULL, 3, 8, to_timestamp('05/04/25 15:13:09.788241000','DD/MM/RR HH24:MI:SSXFF'), 1, 7),
('Implement core business logic', 4, NULL, 2, NULL, 4, 3, to_timestamp('05/04/25 15:13:52.786245000','DD/MM/RR HH24:MI:SSXFF'), 1, 8),
('Videos', 6, NULL, 2, NULL, 1, 2, to_timestamp('25/04/25 02:09:10.860234000','DD/MM/RR HH24:MI:SSXFF'), 1, 3),
('Java and Springboot Study', 1, NULL, 2, NULL, 4, NULL, to_timestamp('05/04/25 14:49:35.489336000','DD/MM/RR HH24:MI:SSXFF'), 0, 7),
('Development of the final presentation 1st Period', 2, NULL, 5, NULL, 2, 3, to_timestamp('05/04/25 14:55:07.719128000','DD/MM/RR HH24:MI:SSXFF'), 1, 4),
('Design of the relational data base model.', 7, NULL, 4, NULL, 2, 5, to_timestamp('05/04/25 15:01:31.953420000','DD/MM/RR HH24:MI:SSXFF'), 1, 5),
('Creation of the data base in OCI', 7, NULL, 2, NULL, 3, 4, to_timestamp('05/04/25 15:03:59.124405000','DD/MM/RR HH24:MI:SSXFF'), 1, 5),
('Populate the database in OCI', 7, NULL, 2, NULL, 1, 2, to_timestamp('05/04/25 15:04:40.523605000','DD/MM/RR HH24:MI:SSXFF'), 1, 3),
('Understanding of the gived front-end logic', 3, NULL, 3, NULL, 2, 4, to_timestamp('05/04/25 15:09:40.066682000','DD/MM/RR HH24:MI:SSXFF'), 1, 4),
('Develop main UI components', 3, NULL, 3, NULL, 3, 6, to_timestamp('05/04/25 15:10:30.911519000','DD/MM/RR HH24:MI:SSXFF'), 1, 5),
('Create and secure APIs', 4, NULL, 2, NULL, 3, 7, to_timestamp('05/04/25 15:14:24.786171000','DD/MM/RR HH24:MI:SSXFF'), 1, 8),
('Stand Up Presentation', 6, NULL, 2, NULL, 2, 0, to_timestamp('25/04/25 02:10:33.399140000','DD/MM/RR HH24:MI:SSXFF'), 0, 2),
('Create tasks kpi', 3, to_date('25/04/25','DD/MM/RR'), 5, NULL, 6, 6, to_timestamp('25/04/25 02:53:09.478565000','DD/MM/RR HH24:MI:SSXFF'), 1, 4),
('Research', 9, NULL, 1, NULL, 2, NULL, to_timestamp('25/04/25 02:56:07.724490000','DD/MM/RR HH24:MI:SSXFF'), 0, 2),
('prepare the demo for we-app', 6, NULL, 2, NULL, 1, 2, to_timestamp('25/04/25 06:18:04.033804000','DD/MM/RR HH24:MI:SSXFF'), 1, 2);

Insert into ADMIN.TODOITEM (DESCRIPTION, CREATION_TS, DONE, STORY_POINTS)
values ('To do Item', to_timestamp_tz('31/03/25 19:30:35.455260000 AMERICA/MEXICO_CITY','DD/MM/RR HH24:MI:SSXFF TZR'), 0, 4);

Insert into ADMIN.TEAMS_WORKING_MODULES (MODULE_ID, TEAM_ID) values (1, 1);
