#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, Flask, make_response, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User,Message


# Views go here!
class Messages(Resource):
    def get(self):
        messages=[e.to_dict() for e in Message.query.all()]
        return make_response(messages,200)
    
    def post(self):
        data = request.get_json()
        message=Message(content=data['content'],made_by_user_id=data['made_by_user_id'])
        db.session.add(message)
        db.session.commit()
        return make_response({'message':message.to_dict()},201)
api.add_resource(Messages,'/api/v1/messages')

class Messagesbyid(Resource):
    def get(self,id):
        message=Message.query.get(id)
        return(message.to_dict(),200)

    def patch(self,id):
        data=request.json
        message=Message.query.get(id)
        for attr in data:
            setattr(message,attr,data[attr])
        db.session.commit()
        return make_response(message.to_dict(),200)

    def delete(self,id):
        message=Message.query.get(id)
        db.session.delete(message)
        db.session.commit()
        return make_response('',204)
api.add_resource(Messagesbyid,'/api/v1/messages/<int:id>')

class Users(Resource):
    def get(self):
        users=[e.to_dict() for e in User.query.all()]
        return make_response(users,200)

    def post(self):
        data = request.get_json()
        user= User(username=data['username'],password_hash=data['password'])
        db.session.add(user)
        db.session.commit()
        session['user_id']=user.id
        #maybe add validation errors, 'try and except'
        return make_response({'user':user.to_dict()},201)
api.add_resource(Users,'/api/v1/users')

class Usersbyid(Resource):
    def get(self,id):
        user=User.query.get(id)
        if not user:
            return make_response({'error':'User not found'},404)
        return make_response(user.to_dict(),200)

    def delete(self,id):
        user=User.query.get(id)
        if not user:
            return make_response({'error':'User not found'},404)
        db.session.delete(user)
        db.session.commit()
        return make_response('',204)

api.add_resource(Usersbyid,'/api/v1/users/<int:id>')

@app.route('/api/v1/authorized')
def authorized():
    try:
        user=User.query.filter_by(id=session.get('user_id')).first()
        return make_response(user.to_dict(),200)
    except:
        return make_response({"error":"User not found"},404)

@app.route('/api/v1/login',methods=['POST'])
def login():
    data = request.get_json()
    try:
        user = User.query.filter_by(username=data['username']).first()
        if user.authenticate(data['password']):
            session['user_id']=user.id
            return make_response({'user':user.to_dict()},201)
        else:
            return make_response({'error':'incorrect password'},401)
    except:
        return make_response({'error':'username wrong'},401)

@app.route('/api/v1/logout',methods=['DELETE'])
def logout():
    session['user_id']=None
    return make_response('',204)

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

