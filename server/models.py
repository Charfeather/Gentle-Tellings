from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db,bcrypt

# Models go here!
friends_association_table=db.Table('friends_association',
    db.Column('user_id',db.Integer,db.ForeignKey('users.id')),
    db.Column('friend_id',db.Integer,db.ForeignKey('users.id'))
)

class User(db.Model,SerializerMixin):
    __tablename__='users'

    serialize_rules=('-_password_hash','-messages.user','-friend_of.friends','-friend_of.friend_of','-friends.friends','-friends.created_at','-friend_of.created_at','-friend_of.updated_at','-friends.friend_of','-friend_of.messages.responses','-friend_of.responses','-friends.messages.responses','-friends.responses')

    id=db.Column(db.Integer, primary_key=True)
    username=db.Column(db.String)
    _password_hash=db.Column(db.String)
    created_at=db.Column(db.DateTime,server_default=db.func.now())
    updated_at=db.Column(db.DateTime,server_default=db.func.now(), onupdate=db.func.now())
    messages=db.relationship('Message',back_populates='user',cascade='all, delete-orphan')
    responses=db.relationship('Response',back_populates='user',cascade='all, delete-orphan')
    friends=db.relationship(
        'User',
        secondary=friends_association_table,
        primaryjoin=(friends_association_table.c.user_id == id),
        secondaryjoin=(friends_association_table.c.friend_id == id),
        backref=db.backref('friend_of',lazy='dynamic'),
        lazy='dynamic'
    )

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

    serialize_rules=('-user.messages','-user.friend_of','-user.friends','-user.responses')

    id=db.Column(db.Integer,primary_key=True)
    content=db.Column(db.String)
    made_by_user_id=db.Column(db.Integer,db.ForeignKey('users.id'))
    created_at=db.Column(db.DateTime,server_default=db.func.now())
    updated_at=db.Column(db.DateTime,server_default=db.func.now(), onupdate=db.func.now())
    user=db.relationship('User',back_populates='messages')
    responses=db.relationship('Response',back_populates='message',cascade='all, delete-orphan')

class Response(db.Model,SerializerMixin):
    __tablename__='responses'

    serialize_rules=('-user','-message')

    id=db.Column(db.Integer,primary_key=True)
    content=db.Column(db.String)
    user_id=db.Column(db.Integer,db.ForeignKey('users.id'))
    message_id=db.Column(db.Integer,db.ForeignKey('messages.id'))
    created_at=db.Column(db.DateTime,server_default=db.func.now())
    updated_at=db.Column(db.DateTime,server_default=db.func.now(), onupdate=db.func.now())
    user=db.relationship('User',back_populates='responses')
    message=db.relationship('Message',back_populates='responses')