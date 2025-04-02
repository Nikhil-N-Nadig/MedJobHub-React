from medjobhub import app, request, session, db, os,secrets
from medjobhub.models import User
from flask import jsonify

SECRET_KEY = os.getenv("SECRET_KEY", "default_secret_key")

#Verify_Otp
@app.route('/verify_otp', methods=['POST'])
def verify_otp():
    try:
        data = request.json
        username = data.get('username')
        entered_otp = data.get('otp')

        if not username or not entered_otp:
            return jsonify({"success": False, "message": "Username and OTP are required."}), 400

        stored_otp = session.pop(f"otp_{username}", None)  
        if stored_otp and int(entered_otp) == stored_otp:
            user = User.query.filter_by(username=username).first()
            if user:
                session["user_id"] = user.id
                session["role"] = user.role
                session.permanent = True  

                auth_token = secrets.token_hex(16) 
                user.auth_token = auth_token  
                user.is_verified = True 
                db.session.commit()

                return jsonify({
                    "success": True,
                    "message": "Login successful.",
                    "user": {
                        "id": user.id, 
                        "username": user.username, 
                        "role": user.role, 
                        "auth_token": auth_token,
                        "resume":user.resume
                    }
                })

        return jsonify({"success": False, "message": "Invalid OTP. Please try again."}), 401

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
