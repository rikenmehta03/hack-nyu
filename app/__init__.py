from . import config

from flask import Flask
from .routes import blueprint

app = Flask(__name__)
app.register_blueprint(blueprint, url_prefix='/api/')