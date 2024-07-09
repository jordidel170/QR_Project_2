import os
from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager

# Cargar el archivo .env
load_dotenv()

app = Flask(__name__)

# Configuraciones de la aplicación
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['ENV'] = os.getenv('FLASK_ENV')

# Inicialización de extensiones
db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
CORS(app, resources={r"/app/*": {"origins": "*"}})

# Modelo de prueba
class TestTable(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

# Ruta para probar la conexión a la base de datos
@app.route('/test_db', methods=['GET'])
def test_db():
    try:
        test_entry = TestTable(name="test")
        db.session.add(test_entry)
        db.session.commit()
        return jsonify({"message": "Database connection successful!", "entry_id": test_entry.id}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Registro de blueprints
from api.blueprints.table import table_bp
from api.blueprints.product import product_bp
from api.blueprints.client import client_bp
from api.blueprints.productTable import productTable_bp
from api.blueprints.sessions import sessions_bp
from api.blueprints.auth import auth_bp
from api.blueprints.restaurants import restaurants_bp
from api.blueprints.generateqr import generateqr_bp

app.register_blueprint(table_bp, url_prefix='/app')
app.register_blueprint(product_bp, url_prefix='/app')
app.register_blueprint(client_bp, url_prefix='/app')
app.register_blueprint(productTable_bp, url_prefix='/app')
app.register_blueprint(sessions_bp, url_prefix='/app')
app.register_blueprint(auth_bp, url_prefix='/app')
app.register_blueprint(restaurants_bp, url_prefix='/app')
app.register_blueprint(generateqr_bp, url_prefix='/app')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv('PORT', 5000)))





