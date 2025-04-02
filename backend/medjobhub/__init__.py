from flask import Flask,send_from_directory, render_template, request, jsonify, redirect, send_file, url_for, flash
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
import random
from datetime import datetime,timedelta
from flask_mail import Mail, Message
from random import randint
import secrets
import os
from io import BytesIO
from flask import session
from werkzeug.utils import secure_filename
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib import colors
import re,traceback
from flask_login import LoginManager,login_required
from flask_cors import CORS,cross_origin
from config import Config
from flask_restful import fields, marshal


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy()

db.init_app(app)

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

app.config.from_object(Config) 


login_manager=LoginManager(app)
login_manager.login_view='signin'
login_manager.login_message_category='sucess'
otp_storage = {}

upload_folder = os.path.join(os.getcwd(), 'uploads')
if not os.path.exists(upload_folder):
    os.makedirs(upload_folder)


app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.config['UPLOAD_FOLDER'] = upload_folder  
app.config['ALLOWED_EXTENSIONS'] = {'pdf', 'doc', 'docx', 'jpg', 'png'}

# Flask-Mail Configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = "medjobhub1234@gmail.com"
app.config['MAIL_PASSWORD'] = "taen vhzs yuja fztl"  # Use App Password if needed
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True


allowed_url="http://localhost:5173"
def allowed_file(filename):
    allowed_extensions = {'pdf', 'doc', 'docx', 'jpg', 'png'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

from medjobhub.models import User, Job, UserProfile,JobApplication
from medjobhub.routes import signin,signup,verify_otp,logout,job_cards,application_cards,contact_us