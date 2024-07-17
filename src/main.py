import os
from flask import Flask, request, jsonify, send_from_directory, redirect
from utils import APIException, generate_sitemap
from app import app
from admin import setup_admin
from commands import setup_commands

static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')

setup_admin(app)
setup_commands(app)

@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

@app.route('/public/<path:path>')
def send_public(path):
    return send_from_directory(static_file_dir, path)

@app.route('/')
def index():
    return redirect('/app/caja')

@app.route('/admin-dashboard')
def admin_dashboard():
    return generate_sitemap(app)

# Capturar todas las rutas que no coinciden y redirigir al frontend
@app.route('/app/<path:path>', methods=["GET"])
@app.route('/<path:path>', methods=["GET"])
@app.route('/app', methods=["GET"])
def catch_all(path='index.html'):
    return send_from_directory(static_file_dir, 'index.html')

if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=PORT, debug=True)




