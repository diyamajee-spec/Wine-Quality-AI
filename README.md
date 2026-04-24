# VinoPredict | Modern Enology AI 🍷

VinoPredict is an end-to-end Machine Learning ecosystem designed to analyze, predict, and archive red wine quality metrics with professional-grade precision. It combines a rigorous Python-based analytical pipeline with a stunning, interactive web dashboard powered by a real-time AI backend.

---

## ✨ Key Features

### 🖥️ Interactive Web Application (VinoPredict)
- **AIA Assessment Engine**: Perform real-time AI quality evaluations based on 11 chemical parameters.
- **Random Sampling**: Instantly load historical data from the UCI Enology Repository for testing.
- **Wine Vault**: A comprehensive digital cellar containing 1,600+ historical records.
- **Molecular Analysis Visualization**: Dynamic progress rings and status badges (Reserve, Premium, Table).

### 🧠 Full-Stack AI Core
- **Integrated Backend**: A Python Flask server that bridges the frontend to the Machine Learning models.
- **Ensemble Intelligence**: Utilizes a sophisticated ensemble of Random Forest, Extra Trees, and Gradient Boosting (`wine_quality_ensemble.pkl`).
- **Real-Time Inference**: Processes chemical data through a production-ready feature scaler (`scaler.pkl`) for 93.75% accurate predictions.
- **Hybrid Architecture**: Includes a local heuristic fallback mechanism to ensure uptime even without backend connectivity.

---

## 🛠️ Tech Stack

- **Backend**: Python 3.x, Flask, Joblib (Model Serialization).
- **Frontend**: Vanilla Javascript (ES6+), Modern CSS3 (Glassmorphism, Dynamic Animations), SVG dynamic components.
- **AI/ML Core**: Scikit-Learn, Pandas, NumPy.
- **Dataset**: UCI Red Wine Quality Dataset.

---

## 🚀 Getting Started

### 1. Install Dependencies
Ensure you have the required Python libraries installed:
```bash
pip install flask joblib pandas scikit-learn
```

### 2. Run the Application
To launch the integrated server and interactive dashboard:

**On Windows (PowerShell):**
```powershell
./run_local.ps1
```

**On Bash/Linux/macOS:**
```bash
chmod +x run_local.sh
./run_local.sh
```
*The application will be available at: **http://localhost:8080***

### 3. Analytical Deep-Dive
To explore the model training process and data science research:
1. Open `wine_quality_analysis.ipynb` in Google Colab or Jupyter.
2. Run all cells to see the full EDA and model benchmarking.

---

## 📈 Results
- **Model Accuracy**: Reached peak performance of **93.75%**.
- **Key Driver**: Alcohol content remains the most significant predictor of quality in the UCI dataset.
- **Efficiency**: Includes `train_optimized.py` for rapid retraining and production-ready model export.

---

*Developed for the modern sommelier and data scientist.*
