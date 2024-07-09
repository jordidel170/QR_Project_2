import os
from flask import Flask, request, jsonify, send_from_directory, redirect
from utils import APIException, generate_sitemap
from app import app
from admin import setup_admin
from commands import setup_commands

static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'public')

setup_admin(app)
setup_commands(app)

@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Rutas para servir archivos estáticos
@app.route('/public/<path:path>')
def send_public(path):
    return send_from_directory(static_file_dir, path)

# Redirigir la raíz a /app/caja
@app.route('/')
def index():
    return redirect('/app/caja')

# Redirigir todas las demás rutas al index.html de React
@app.route('/app/<path:path>')
def catch_all(path):
    if os.path.exists(os.path.join(static_file_dir, path)):
        return send_from_directory(static_file_dir, path)
    return send_from_directory(static_file_dir, 'index.html')

if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=PORT, debug=True)



