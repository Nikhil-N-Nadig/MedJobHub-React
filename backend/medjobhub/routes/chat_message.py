from medjobhub import SocketIO, join_room, emit,request,app,db,allowed_url
from medjobhub.models import ChatMessage
socketio = SocketIO(app, cors_allowed_origins=allowed_url)

@socketio.on("join")
def on_join(data):
    room = data["room"]
    join_room(room)

    messages = ChatMessage.query.filter_by(room=room).order_by(ChatMessage.timestamp).all()
    history = [{"sender": msg.sender_id, "message": msg.message} for msg in messages]

    emit("chat_history", history, room=request.sid)

@socketio.on("message")
def handle_message(data):
    room = data["room"]
    sender_id = data["sender_id"]
    receiver_id = data["receiver_id"]
    message = data["message"]

    msg = ChatMessage(
        sender_id=sender_id,
        receiver_id=receiver_id,
        message=message,
        room=room
    )
    db.session.add(msg)
    db.session.commit()

    emit("message", {"sender": sender_id, "message": message}, room=room)
