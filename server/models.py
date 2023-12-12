from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db,bcrypt

# Models go here!
class User(db.Model,SerializerMixin):
    __tablename__='users'

    serialize_rules=('-_password_hash','-messages.user')

    id=db.Column(db.Integer, primary_key=True)
    username=db.Column(db.String)
    _password_hash=db.Column(db.String)
    created_at=db.Column(db.DateTime,server_default=db.func.now())
    updated_at=db.Column(db.DateTime,server_default=db.func.now(), onupdate=db.func.now())
    messages=db.relationship('Message',back_populates='user')

    @property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self,plain_text_password):
        byte_object = plain_text_password.encode('utf-8')
        encrypted_password_object=bcrypt.generate_password_hash(byte_object)
        hashed_password_string = encrypted_password_object.decode('utf-8')
        self._password_hash=hashed_password_string 

    def authenticate(self,password_string):
        byte_object=password_string.encode('utf-8')
        return bcrypt.check_password_hash(self.password_hash, byte_object)

class Message(db.Model,SerializerMixin):
    __tablename__='messages'

    serialize_rules=('-user.messages',)

    id=db.Column(db.Integer,primary_key=True)
    content=db.Column(db.String)
    made_by_user_id=db.Column(db.Integer,db.ForeignKey('users.id'))
    created_at=db.Column(db.DateTime,server_default=db.func.now())
    updated_at=db.Column(db.DateTime,server_default=db.func.now(), onupdate=db.func.now())
    user=db.relationship('User',back_populates='messages')