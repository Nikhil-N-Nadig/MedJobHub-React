from medjobhub import app,db
from medjobhub.models import User
from medjobhub.routes.chat_message import socketio
if __name__ == '__main__':
    with app.app_context():
        # db.drop_all()
        db.create_all()
        
        # # Reset verification status for all users
        users = User.query.all()
        for user in users:
            user.is_verified = False
        db.session.commit()

    socketio.run(app, debug=True, port=5001)