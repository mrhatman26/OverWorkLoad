/* Creat the database */
DROP DATABASE IF EXISTS workloadDB;
CREATE DATABASE workloadDB;
USE workloadDB;

/*Regular tables */
/* Create the users table */
DROP TABLE IF EXISTS table_users;
CREATE TABLE table_users(
    user_id INT NOT NULL,
    user_name TEXT NOT NULL,
    user_pass TEXT NOT NULL,
    PRIMARY KEY(user_id)
);

/* Create the staff table */
DROP TABLE IF EXISTS table_staff;
CREATE TABLE table_staff(
    staff_id INT NOT NULL,
    staff_code TEXT,
    staff_name TEXT,
    staff_grade TEXT,
    staff_fte FLOAT,
    staff_hea BOOLEAN,
    PRIMARY KEY(staff_id)
);

/* Create the uplifts table */
DROP TABLE IF EXISTS table_uplifts;
CREATE TABLE table_uplifts(
    uplift_id INT NOT NULL,
    uplift_name TEXT,
    uplift_type TEXT,
    uplift_hours FLOAT,
    uplift_comment TEXT,
    PRIMARY KEY(uplift_id)
);

/* Create the modules */
DROP TABLE IF EXISTS table_modules;
CREATE TABLE table_modules(
    mod_id INT NOT NULL,
    mod_level INT,
    mod_code TEXT,
    mod_title TEXT,
    PRIMARY KEY(mod_id)
);

/* Link tables */
/* Create the admin link table */
/* This table links a staff memeber to the uplift table representing the link as an ADMIN TASK (Not research or a project or etc. */
DROP TABLE IF EXISTS link_staff_upadmin;
CREATE TABLE link_staff_upadmin(
    staff_id INT NOT NULL,
    uplift_id INT NOT NULL,
    admin_quantity INT,
    admin_override BOOLEAN,
    admin_mod_time INT,
    admin_description TEXT,
    PRIMARY KEY(staff_id, uplift_id),
    FOREIGN KEY(staff_id) REFERENCES table_staff(staff_id),
    FOREIGN KEY(uplift_id) REFERENCES table_uplifts(uplift_id)
);

DROP TABLE IF EXISTS link_staff_uplift;
CREATE TABLE link_staff_uplift(
    staff_id INT NOT NULL,
    uplift_id INT NOT NULL,
    PRIMARY KEY(staff_id, uplift_id),
    FOREIGN KEY(staff_id) REFERENCES table_staff(staff_id),
    FOREIGN KEY(uplift_id) REFERENCES table_uplifts(uplift_id)
);

/* Create module link table */
/* This table links a staff member to the modules table along with information about the link... A whole lot of information... */
DROP TABLE IF EXISTS link_staff_module;
CREATE TABLE link_staff_module(
    staff_id INT NOT NULL,
    mod_id INT NOT NULL,
    mod_delivery TEXT,
    mod_newto BOOLEAN,
    mod_leader BOOLEAN,
    mod_prep BOOLEAN,
    mod_inlab BOOLEAN,
    mod_credits INT, 
    mod_weeks INT, 
    mod_students INT, 
    mod_week_hours INT, 
    mod_weekly_repeats INT, 
    mod_first_lab_hours INT, 
    mod_repeat_lab_hours INT, 
    mod_marking_override BOOLEAN,
    mod_override_mark_hours INT, 
    mod_notes TEXT,
    PRIMARY KEY(staff_id, mod_id),
    FOREIGN KEY(staff_id) REFERENCES table_staff(staff_id),
    FOREIGN KEY(mod_id) REFERENCES table_modules(mod_id)
);

/* Insert starting data */
INSERT INTO table_staff VALUES(0, "JSmith", "John Smith", "GTA", 1.00, 0);

INSERT INTO table_modules VALUES(0, 5, "CO2401", "Software Development");

INSERT INTO table_uplifts VALUES(
    0, "Lecture Prep (New) / Hour", "Teaching Allowances", 2.5, "N/A"),(
    1, "Lecture Prep (Existing) / Hour", "Teaching Allowances", 1.5, "Repeated refers to weather the member of staff has taught this before."),(
    2, "Lab or Class Prep (New) / Hour", "Teaching Allowances", 2.5, "N/A"),(
    3, "Lab or Class Prep (Existing) / Hour", "Teaching Allowances", 1.5, "Repeated refers to weather the member of staff has taught this before."),(
    4, "Lab Support By GTAs (Per Session)", "Teaching Allowances", 0.5, "For first iteration only-delivery of material prepared by someone else. (extra 30 mins for GTAs)"),(
    5, "Lab Support (Per Session)", "Teaching Allowances", 1, "For first iteration only-delivery of material prepared by somoneon else."),(
    6, "Marking/Student (20 Credit Module)", "Teaching Allowances", 1, "15 day feedback requirement."),(
    7, "Apprenticeship End Point Assessment", "Teaching Allowances", 1.5, "Per learner."),(
    8, "Ad-Hoc Admin", "Admin Allowances", 0, "(TBD) For one-off tasks as required by SET."),(
    9, "Academic Apprenticeship Student", "Admin Allowances", 316, "N/A"),(
    10, "Academic Apprenticeship Mentor", "Admin Allowances", 24, "N/A"),(
    11, "Admissions Tutor", "Admin Allowances", 0, "N/A"),(
    12, "Athena Swan", "Admin Allowances", 50, "N/A"),(
    13, "Apprenticeship Co-Ordinator", "Admin Allowances", 50, "N/A"),(
    14, "BCS Liasion", "Admin Allowances", 50, "N/A"),(
    15, "Coach", "Admin Allowances", 900, "N/A"),(
    16, "COG Member", "Admin Allowances", 30, "Computing Operational Group"),(
    17, "College Liasion", "Admin Allowances", 50, "N/A"),(
    18, "Committee Membership", "Admin Allowances", 0, "N/A"),(
    19, "Course Leader - Software Engineering (BAE)", "Admin Allowances", 200, "N/A"),(
    20, "Course Leader - PG Super", "Admin Allowances", 50, "Oversee PG leadership team"),(
    21, "Course Leader Role", "Admin Allowances", 150, "N/A"),(
    22, "Course Leader (Up to 50 Students)", "Admin Allowances", 50, "N/A"),(
    23, "Course Leader (Up to 100 Students)", "Admin Allowances", 75, "N/A"),(
    24, "Disability Leader", "Admin Allowances", 50, "N/A"),(
    25, "EDI Leader", "Admin Allowances", 50, "N/A"),(
    26, "Employability Leader", "Admin Allowances", 50, "N/A"),(
    27, "General Admin (Fixed)", "Admin Allowances", 90, "Available to everyone."),(
    28, "HEA Mentor", "Admin Allowances", 38, "N/A"),(
    29, "HEA Student", "Admin Allowances", 25, "Only available for one year."),(
    30, "Health and Safety Lead", "Admin Allowances", 0, "N/A"),(
    31, "Induction (Year 1)", "Admin Allowances", 30, "N/A"),(
    32, "Internation Lead", "Admin Allowances", 0, "N/A"),(
    33, "International Part Co-Ordinator", "Admin Allowances", 50, "N/A"),(
    34, "Mandatory Training (Fixed)", "Admin Allowances", 0, "Included in general admin/support time."),(
    35, "Marketing Lead", "Admin Allowances", 100, "N/A"),(
    36, "Marketing Team Member", "Admin Allowances", 40, "N/A"),(
    37, "MSC Module Admin Uplift", "Admin Allowances", 25, "N/A"),(
    38, "Module Leadership - PG Projects", "Admin Allowances", 100, "N/A"),(
    39, "Module Leadership - UG Projects", "Admin Allowances", 100, "N/A"),(
    40, "Module Iteration (SEGi)", "Admin Allowances", 10, "N/A"),(
    41, "Module Iteration (Sri Lanka)", "Admin Allowances", 10, "N/A"),(
    42, "Module Iteration (Cyprus)", "Admin Allowances", 10, "N/A"),(
    43, "Module Iteration (Yeovil)", "Admin Allowances", 10, "N/A"),(
    44, "Module Leadership (Up to 50 Students)", "Admin Allowances",  25, "N/A"),(
    45, "Module Leadership (Between 50 and 199 Students)", "Admin Allowances",  50, "N/A"),(
    46, "Module Leadership XL (Over 200 Students)", "Admin Allowances", 75, "N/A"),(
    47, "Module Leadership (Burnley)", "Admin Allowances", 75, "N/A"),(
    48, "Module Moderation", "Admin Allowances", 10, "N/A"),(
    49, "New Staff Development Time", "Admin Allowances", 150, "N/A"),(
    50, "Open and Applicant Day Co-Ordinator", "Admin Allowances", 0, "N/A"), (
    51, "Open Days", "Admin Allowances", 0, "N/A"),(
    52, "Outreach Activities/Public Engagment", "Admin Allowances", 0, "Must be documented in Outreach spreadsheet."),(
    53, "Outreach Co-Ordinator", "Admin Allowances", 50, "N/A"),(
    54, "PASS Co-Ordinator", "Admin Allowances", 50, "N/A"),(
    55, "PG Placements Co-Ordinator", "Admin Allowances", 50, "N/A"),(
    56, "PL Post", "Admin Allowances", 750, "N/A"),(
    57, "Placement Visit", "Admin Allowances", 7.5, "N/A"),(
    58, "Quality Officer", "Admin Allowances", 200, "N/A"),(
    59, "Recruitment Activites", "Admin Allowances", 50, "Working with Andy Morley."),(
    60, "Recruitment Lead", "Admin Allowances", 0, "N/A"),(
    70, "Staff Development", "Admin Allowances", 0, "Agreed with appraiser."),(
    71, "Research Lead", "Admin Allowances", 0, "N/A"),(
    72, "SET Member", "Admin Allowances", 100, "N/A"),(
    73, "Social Media Officer", "Admin Allowances", 50, "Develop social media strategy; create content; monitor accounts."),(
    74, "Staff Mentor", "Admin Allowances", 10, "N/A"),(
    75, "Teaching and Learning Committe Chair", "Admin Allowances", 0, "N/A"),(
    76, "Timetable Stategic Lead (UG and PG)", "Admin Allowances", 200, "N/A"),(
    78, "UG Placements Co-Ordinator", "Admin Allowances", 50, "N/A"),(
    79, "Welcome Activites", "Admin Allowances", 0, "N/A"),(
    80, "Year 0 Tutor (Including Welcome Week)", "Admin Allowances", 100, "N/A"),(
    81, "Year 1 Tutor (Including Welcome Week)", "Admin Allowances", 275, "N/A"),(
    82, "Year 2 Tutor", "Admin Allowances", 200, "N/A"),(
    83, "Year 3 Tutor", "Admin Allowances", 200, "N/A"),(
    84, "Year Tutor - PG", "Admin Allowances", 200, "N/A"
);