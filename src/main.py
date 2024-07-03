
import os
from flask import Flask, request, jsonify, url_for

from utils import APIException, generate_sitemap
from app import app
from admin import setup_admin
from commands import setup_commands

setup_admin(app)
setup_commands(app)

@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code


@app.route('/')
def sitemap():
    return generate_sitemap(app)


if __name__ == '__main__':

    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
    