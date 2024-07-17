import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from utils import APIException, generate_sitemap
from app import app
from admin import setup_admin
from commands import setup_commands

static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')

setup_admin(app)
setup_commands(app)

@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code


@app.route('/')
def sitemap():
    return send_from_directory(static_file_dir, 'index.html')

@app.route('/admin-dashboard')
def admin_dashboard():
    return generate_sitemap(app)

if __name__ == '__main__':

    
    PORT = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=PORT, debug=True)



