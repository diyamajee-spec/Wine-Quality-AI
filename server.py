from flask import Flask, request, jsonify, send_from_directory
import joblib
import pandas as pd
import numpy as np
import os

app = Flask(__name__, static_folder='app')

# Load Model and Scaler
MODEL_PATH = 'models/wine_quality_ensemble.pkl'
SCALER_PATH = 'models/scaler.pkl'

try:
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
    print("✅ Model and Scaler loaded successfully.")
except Exception as e:
    print(f"❌ Error loading model or scaler: {e}")
    model = None
    scaler = None

@app.route('/')
def index():
    return send_from_directory('app', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('app', path)

@app.route('/predict', methods=['POST'])
def predict():
    if model is None or scaler is None:
        return jsonify({'error': 'Model not loaded on server'}), 500

    try:
        data = request.json
        # The frontend sends IDs like 'fixed-acidity', but the model expects specific columns.
        # Order should match training: fixed acidity;volatile acidity;citric acid;residual sugar;chlorides;free sulfur dioxide;total sulfur dioxide;density;pH;sulphates;alcohol
        
        features = [
            data.get('fixed_acidity'),
            data.get('volatile_acidity'),
            data.get('citric_acid'),
            data.get('residual_sugar'),
            data.get('chlorides'),
            data.get('free_sulfur_dioxide'),
            data.get('total_sulfur_dioxide'),
            data.get('density'),
            data.get('ph'),
            data.get('sulphates'),
            data.get('alcohol')
        ]
        
        # Convert to DataFrame for scaler
        cols = ['fixed acidity', 'volatile acidity', 'citric acid', 'residual sugar', 'chlorides', 
                'free sulfur dioxide', 'total sulfur dioxide', 'density', 'pH', 'sulphates', 'alcohol']
        df = pd.DataFrame([features], columns=cols)
        
        # Scale features
        scaled_features = scaler.transform(df)
        
        # Predict
        # Get probability if possible
        if hasattr(model, "predict_proba"):
            probs = model.predict_proba(scaled_features)[0]
            # Assuming binary classification where class 1 is 'Good'
            score = float(probs[1]) * 100
        else:
            pred = model.predict(scaled_features)[0]
            score = 90 if pred == 1 else 40 # Fallback if no proba
            
        return jsonify({
            'score': round(score, 1),
            'status': 'Reserve' if score >= 85 else 'Premium' if score >= 70 else 'Table'
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
