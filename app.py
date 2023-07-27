from flask import Flask, render_template, url_for, request, redirect, abort
from flask_login import LoginManager, UserMixin, current_user, login_user, logout_user
from db_handler import *
from user import User
import sys

#Server Vars
app = Flask(__name__)
app.secret_key = "OverWorkLoad"
login_manager = LoginManager() #Create an instance of the login manager
login_manager.init_app(app) #And initialize it to the Flask app.
@login_manager.user_loader
def load_fuser(id): #Every time a page is loaded, check if the user is logged in or not.
    user_check = user_get(id)
    if len(user_check) <= 0:
        return None
    else:
        return User(user_check[0], user_check[1])

#General Routes
#Home/Index
@app.route('/')
def home():
    return render_template('home.html', page_name="Home")

#Staff Routes
#Staff List
@app.route('/staff/list')
def staff_list():
    return render_template('staff.html', page_name="Staff List",  staff_list=staff_getall(False))

#Add staff
@app.route('/staff/add+failed=<failed>')
def staff_add(failed):
    if current_user.is_authenticated is not True:
        abort(403)
    else:
        return render_template('staff_add.html', page_name="Staff Add")
@app.route('/staff/add/staffinfo=<staff_info>')
def staff_add_confirm(staff_info):
    if current_user.is_authenticated is not True:
        abort(404)
    else:
        try:
            if staff_create(staff_info) is True:
                return redirect('/staff/list')
            else:
                return redirect('/staff/add+failed=True')
        except:
            return redirect('/staff/add+failed=True')


#Module Routes
#Module list
@app.route('/modules/list')
def module_list():
    return render_template('modules.html', page_name="Modules", module_list=module_getall())
#Module add
@app.route('/modules/add+failed=<failed>')
def module_add(failed):
    if current_user.is_authenticated is not True:
        abort(403)
    else:
        return render_template('modules_add.html', page_name="Module Add")
@app.route('/modules/add/moduleinfo=<module_info>')
def module_add_confirm(module_info):
    if current_user.is_authenticated is not True:
        abort(404)
    else:
        try:
            if module_create(module_info) is True:
                return redirect('/modules/list')
            else:
                return redirect('/modules/add+failed=True')
        except:
            return redirect('/modules/add+failed=True')
        
#Link module and staff member
@app.route('/modules/assign+failed=<failed>')
def module_assign(failed):
    if current_user.is_authenticated is not True:
        abort(403)
    else:
        return render_template('modules_assign.html', page_name="Assign Module", staff_list=staff_getall(False), module_list=module_getall())
@app.route('/modules/assign/linkinfo=<link_info>')
def module_assign_confirm(link_info):
    if current_user.is_authenticated is not True:
        abort(404)
    else:
        #try:
            link_staff_module(link_info)
            return redirect('/')
        #except:
        #    return redirect('/modules/assign+failed=True')
        
#Uplift Routes
#Uplift list
@app.route('/uplifts/list')
def uplift_list():
    return render_template('uplifts.html', page_name="Uplifts", uplift_list=uplift_getall())
#Uplift Add
@app.route('/uplifts/add+failed=<failed>')
def uplift_add(failed):
    if current_user.is_authenticated is not True:
        abort(403)
    else:
        return render_template('uplifts_add.html', page_name="Uplift Add")
@app.route('/uplifts/add/upliftinfo=<uplift_info>')
def uplift_add_confirm(uplift_info):
    if current_user.is_authenticated is not True:
        abort(404)
    else:
        try:
            print(uplift_info, flush=True)
            uplift_create(uplift_info)
            return redirect('/uplifts/list')
        except:
            return redirect('/uplifts/add+failed=True')
        
#User routes
#Login
@app.route('/user/login+failed=<failed>')
def user_login(failed):
    if current_user.is_authenticated:
        return redirect('/')
    else:
        return render_template('login.html', page_name="Login")
@app.route('/user/login/userinfo=<user_info>')
def user_login_confirm(user_info):
    if current_user.is_authenticated:
        return redirect('/')
    else:
        try:
            login_user(user_validate(user_info))
            return redirect('/')
        except:
            return redirect('/user/login+failed=True')

#Signup
@app.route('/users/signup+failed=<failed>')
def user_signup(failed):
    if current_user.is_authenticated:
        return redirect('/')
    else:
        return render_template('signup.html', page_name="Signup")
@app.route('/users/signup/userinfo=<user_info>')
def user_signup_confirm(user_info):
    if current_user.is_authenticated:
        return redirect('/')
    else:
        try:
            if user_create(user_info) is True:
                login_user(user_validate(user_info))
                return redirect('/')
            else:
                return redirect('/users/signup+failed=True')
        except:
            return redirect('/users/signup+failed=True')
        
#Logout
@app.route('/users/logout')
def user_logout():
    if current_user.is_authenticated is not True:
        return redirect('/')
    else:
        logout_user()
        return redirect('/')
#Error Pages
#These pages are only shown when the website encounters an error.
#403 is page forbidden. (Not used)
#404 is page not found.
#500 is server error.
#410 is page gone. (Not used)
@app.errorhandler(403)
def page_forbidden(e):
    return render_template("errors/403.html"), 403
@app.errorhandler(404)
def page_invalid(e):
    return render_template('errors/404.html'), 404
@app.errorhandler(500)
def server_error(e):
    return render_template('errors/500.html'), 500
@app.errorhandler(410)
def page_gone(e):
    return render_template('errors/410.html'), 410

#Launch Website
if __name__ == '__main__':
    #from waitress import serve
    #serve(app, host="0.0.0.0", port=5000)
    app.run(host="0.0.0.0", debug=True) #This launces the website on the local network.