from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt, jwt_required, create_access_token
from api.ModelUser import User, db

signup_bp = Blueprint('signup', __name__)

@signup_bp.route('/signup', methods=['POST'])
def handle_signup():
    data = request.get_json()
    if User.query.filter_by(email = data['email']).first():
        return jsonify('User already exist')
    new_user = User(
        email = data['email'],
        password = data['password'],
        is_active = True)
    db.session.add(new_user)
    db.session.commit()    
   
    access_token = create_access_token(identity=new_user.id)
    return jsonify({ "token": access_token, "user": new_user.serialize() })

