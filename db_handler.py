import mysql, mysql.connector, sys
import hashlib
import random as r
from datetime import datetime
from user import User
from db_config import *

def to_hash(message): #This function hashes the provided variable using the hashlib library. Python's default hash library is NOT used as it gives a different result between each file.
    message = message.encode('utf-8')
    new_hash = hashlib.sha256()
    new_hash.update(message)
    return new_hash.hexdigest()

#User handling
def user_exists(username):
    database = mysql.connector.connect(**dbconfig) #Connects to the database using the variable "dbconfig" from the file "db_config.py".
    cursor = database.cursor()
    cursor.execute("SELECT user_id FROM table_users WHERE user_name = %s", (username,))
    if len(cursor.fetchall()) > 0:
        cursor.close()
        database.close()
        return True
    else:
        cursor.close()
        database.close()
        return False
    
def user_get(id): #This is used when validating a logged in user between pages. 
    user = []
    database = mysql.connector.connect(**dbconfig) #Connects to the database using the variable "dbconfig" from the file "db_config.py".
    cursor = database.cursor()
    cursor.execute("SELECT user_id, user_name FROM table_users WHERE user_id = %s", (str(id),)) #Note, all given variables in these database commands must but tuples! Hence the comma at the end
    #Selects the columns "user_id" and "user_name" from the table "table_users" whoose rows contains the given ID in the "user_id" column.
    for item in cursor.fetchall():
        user.append(item[0]) #ID
        user.append(item[1]) #Username
    cursor.close()
    database.close()
    return user #Returns the user's id and username as

def user_validate(user_info):
    user_info = user_info.split("+")
    current_user = None
    database = mysql.connector.connect(**dbconfig) #Connects to the database using the variable "dbconfig" from the file "db_config.py".
    cursor = database.cursor()
    cursor.execute("SELECT user_id, user_name, user_pass FROM table_users WHERE user_name = %s", (str(user_info[0]),)) #Note, all given variables in these database commands must but tuples! Hence the comma at the end
    #Selects the columns "user_id", "user_name" and "user_pass" from the table "table_users" whoose rows contain the given username.
    cfetch = cursor.fetchall()
    if len(cfetch) > 0: #If the user exists, the length will be greater than 0.
        for item in cfetch:
            if to_hash(user_info[1]) == item[2]: #If the given password, after being hashed, equals what is in the database, then user's info is used to create a User object which is saved to "current_user".
                current_user = User(item[0], item[1])
            else:
                print("Password Denied\n" + str(item[0]) + "|" + item[1] + " | " + item[2], flush=True)
                #If flush is not set to True when printing, nothing will be printed.
    else:
        print("Username Denied", flush=True)
    return current_user

def user_create(user_info):
    user_info = user_info.split("+")
    if user_exists(user_info[0]) is not True:
        database = mysql.connector.connect(**dbconfig) #Connects to the database using the variable "dbconfig" from the file "db_config.py".
        cursor = database.cursor()
        cursor.execute("SELECT user_id FROM table_users")
        new_user_id = len(cursor.fetchall())
        user_info[1] = to_hash(user_info[1])
        cursor.execute("INSERT INTO table_users VALUES(%s, %s, %s)", (new_user_id, user_info[0], user_info[1]))
        database.commit()
        return True
    return False

#Staff handling
def staff_getall(calculate):
    staff = []
    database = mysql.connector.connect(**dbconfig) #Connects to the database using the variable "dbconfig" from the file "db_config.py".
    cursor = database.cursor()
    cursor.execute("SELECT * FROM table_staff")
    if calculate is False:
        for item in cursor.fetchall():
            staff.append({
                'staff_id': item[0],
                'staff_code': item[1],
                'staff_name': item[2],
                'staff_grade': item[3],
                'staff_fte': item[4],
                'staff_hea': item[5]
            })
    else:
        for item in cursor.fetchall():
            staff.append({
                'staff_id': item[0],
                'staff_code': item[1],
                'staff_teaching': None,
                'staff_research': 0, #To be done
                'staff_admin': 0, #To be done
                'staff_total': None,
                'staff_notational': None,
                'staff_workload': None
            })
    return staff

def staff_gethours(staff_id, hour_type):
    hours = 0
    database = mysql.connector.connect(**dbconfig) #Connects to the database using the variable "dbconfig" from the file "db_config.py".
    cursor = database.cursor()
    if hour_type == 0: #Teaching
        cursor.execute("SELECT * FROM link_staff_module WHERE staff_id = %s", (staff_id,))
        cfetch = cursor.fetchall()[0]



def staff_exists(staff_code):
    database = mysql.connector.connect(**dbconfig) #Connects to the database using the variable "dbconfig" from the file "db_config.py".
    cursor = database.cursor()
    cursor.execute("SELECT staff_id FROM table_staff WHERE staff_code = %s", (staff_code,))
    if len(cursor.fetchall()) > 0:
        return True
    else:
        return False
    
def staff_getID(staff_code):
    database = mysql.connector.connect(**dbconfig) #Connects to the database using the variable "dbconfig" from the file "db_config.py".
    cursor = database.cursor()
    cursor.execute("SELECT staff_id FROM table_staff WHERE staff_code = %s", (staff_code,))
    cfetch = cursor.fetchall()
    if len(cfetch) > 0:
        for item in cfetch:
            return item[0]
    else:
        return None

def staff_create(staff_info):
    staff_info = staff_info.split("+")
    if staff_info[4] == "true":
        staff_info[4] = 1
    else:
        staff_info[4] = 0
    if staff_exists(staff_info[0]) is not True:
        print("Staff does not exist", flush=True)
        database = mysql.connector.connect(**dbconfig) #Connects to the database using the variable "dbconfig" from the file "db_config.py".
        cursor = database.cursor()
        cursor.execute("SELECT staff_id FROM table_staff")
        new_staff_id = len(cursor.fetchall())
        cursor.execute("INSERT INTO table_staff VALUES(%s, %s, %s, %s, %s, %s)", (new_staff_id, staff_info[0], staff_info[1], staff_info[2], staff_info[3], staff_info[4],))
        database.commit()
        return True
    else:
        print("Staff exists", flush=True)
        return False
    
#Module handling
def module_getall():
    module_list = []
    database = mysql.connector.connect(**dbconfig) #Connects to the database using the variable "dbconfig" from the file "db_config.py".
    cursor = database.cursor()
    cursor.execute("SELECT * FROM table_modules")
    for item in cursor.fetchall():
        module_list.append({
            "mod_id": item[0],
            "mod_level": item[1],
            "mod_code": item[2],
            "mod_title": item[3]
        })
    cursor.close()
    database.close()
    return module_list

def module_exists(module_code):
    database = mysql.connector.connect(**dbconfig) #Connects to the database using the variable "dbconfig" from the file "db_config.py".
    cursor = database.cursor()
    cursor.execute("SELECT mod_id FROM table_modules WHERE mod_code = %s", (module_code,))
    if len(cursor.fetchall()) > 0:
        return True
    else:
        return False

def module_getID(module_code):
    database = mysql.connector.connect(**dbconfig) #Connects to the database using the variable "dbconfig" from the file "db_config.py".
    cursor = database.cursor()
    cursor.execute("SELECT mod_id FROM table_modules WHERE mod_code = %s", (module_code,))
    cfetch = cursor.fetchall()
    if len(cfetch) > 0:
        for item in cfetch:
            return item[0]
    else:
        return None

def module_create(module_info):
    module_info = module_info.split("+")
    if module_exists(module_info[1]) is False:
        database = mysql.connector.connect(**dbconfig) #Connects to the database using the variable "dbconfig" from the file "db_config.py".
        cursor = database.cursor()
        cursor.execute("SELECT mod_id FROM table_modules")
        new_module_id = len(cursor.fetchall())
        cursor.execute("INSERT INTO table_modules VALUES(%s, %s, %s, %s)", (new_module_id, module_info[0], module_info[1], module_info[2],))
        database.commit()
        return True
    else:
        return False

#Uplift handling
def uplift_getall():
    uplift_list = []
    database = mysql.connector.connect(**dbconfig) #Connects to the database using the variable "dbconfig" from the file "db_config.py".
    cursor = database.cursor()
    cursor.execute("SELECT * FROM table_uplifts")
    for item in cursor.fetchall():
        uplift_list.append({
            "uplift_id": item[0],
            "uplift_name": item[1],
            "uplift_type": item[2],
            "uplift_hours": item[3],
            "uplift_comment": item[4]
        })
    return uplift_list

def uplift_create(uplift_info):
    uplift_info = uplift_info.replace("?", "/")
    uplift_info = uplift_info.split("+")
    database = mysql.connector.connect(**dbconfig) #Connects to the database using the variable "dbconfig" from the file "db_config.py".
    cursor = database.cursor()
    cursor.execute("SELECT uplift_id FROM table_uplifts")
    new_uplift_id = len(cursor.fetchall())
    cursor.execute("INSERT INTO table_uplifts VALUES(%s, %s, %s, %s, %s)", (new_uplift_id, uplift_info[0], uplift_info[1], uplift_info[2], uplift_info[3],))
    database.commit()

#Link handling
def link_staff_module(link_info):
    link_info = link_info.replace("?", "/")
    link_info = link_info.split("+")
    module_id = module_getID(link_info[0])
    staff_id = staff_getID(link_info[1])
    database = mysql.connector.connect(**dbconfig) #Connects to the database using the variable "dbconfig" from the file "db_config.py".
    cursor = database.cursor()
    if link_info[3] == "1": #Check if staff gets new lecture prep uplift
        cursor.execute("INSERT INTO link_staff_uplift")
    cursor.execute("INSERT INTO link_staff_module VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", (staff_id, module_id, link_info[2], link_info[3], link_info[4], link_info[5], link_info[6], link_info[7], link_info[8], link_info[9], link_info[10], link_info[11], link_info[12], link_info[13], link_info[14], link_info[15], link_info[16],))
    database.commit()