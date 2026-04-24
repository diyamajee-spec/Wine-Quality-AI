import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier, ExtraTreesClassifier, GradientBoostingClassifier, VotingClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import joblib
import os

# 1. Load Dataset
print("Loading dataset...")
url = "https://archive.ics.uci.edu/ml/machine-learning-databases/wine-quality/winequality-red.csv"
df = pd.read_csv(url, sep=';')

# 2. Feature Engineering
def engineer_features(data):
    df_eng = data.copy()
    # Total acidity
    df_eng['total_acidity'] = df_eng['fixed acidity'] + df_eng['volatile acidity']
    # Alcohol to sugar ratio
    df_eng['alcohol_sugar_ratio'] = df_eng['alcohol'] / (df_eng['residual sugar'] + 1e-5)
    # Free sulfur to total sulfur ratio
    df_eng['sulfur_ratio'] = df_eng['free sulfur dioxide'] / (df_eng['total sulfur dioxide'] + 1e-5)
    return df_eng

print("Engineering features...")
df = engineer_features(df)

# 3. Target Conversion
df['quality_label'] = df['quality'].apply(lambda x: 1 if x >= 7 else 0)
X = df.drop(['quality', 'quality_label'], axis=1)
y = df['quality_label']

# 4. Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# 5. Scaling
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 6. Model Training & Tuning
print("Tuning models to reach 90%+ accuracy...")

# Random Forest
rf_param_grid = {
    'n_estimators': [100, 200, 300],
    'max_depth': [None, 10, 20, 30],
    'min_samples_split': [2, 5],
    'class_weight': ['balanced', 'balanced_subsample']
}

rf_grid = GridSearchCV(RandomForestClassifier(random_state=42), rf_param_grid, cv=5, scoring='accuracy', n_jobs=-1)
rf_grid.fit(X_train_scaled, y_train)
best_rf = rf_grid.best_estimator_
print(f"Best RF Accuracy (CV): {rf_grid.best_score_:.4f}")

# Extra Trees
et_param_grid = {
    'n_estimators': [100, 200, 300],
    'max_depth': [None, 10, 20, 30],
    'class_weight': ['balanced']
}
et_grid = GridSearchCV(ExtraTreesClassifier(random_state=42), et_param_grid, cv=5, scoring='accuracy', n_jobs=-1)
et_grid.fit(X_train_scaled, y_train)
best_et = et_grid.best_estimator_
print(f"Best ET Accuracy (CV): {et_grid.best_score_:.4f}")

# Gradient Boosting
gb_param_grid = {
    'n_estimators': [100, 200],
    'learning_rate': [0.05, 0.1, 0.2],
    'max_depth': [3, 5, 7]
}
gb_grid = GridSearchCV(GradientBoostingClassifier(random_state=42), gb_param_grid, cv=5, scoring='accuracy', n_jobs=-1)
gb_grid.fit(X_train_scaled, y_train)
best_gb = gb_grid.best_estimator_
print(f"Best GB Accuracy (CV): {gb_grid.best_score_:.4f}")

# 7. Ensemble Voting Classifier
print("Creating Ensemble...")
ensemble = VotingClassifier(
    estimators=[('rf', best_rf), ('et', best_et), ('gb', best_gb)],
    voting='soft'
)
ensemble.fit(X_train_scaled, y_train)

# 8. Evaluation
y_pred = ensemble.predict(X_test_scaled)
acc = accuracy_score(y_test, y_pred)
print(f"\nFinal Ensemble Accuracy: {acc:.4f}")
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# 9. Save Models
if not os.path.exists('models'):
    os.makedirs('models')

joblib.dump(ensemble, 'models/wine_quality_ensemble.pkl')
joblib.dump(scaler, 'models/scaler.pkl')
print("\nModels saved to 'models/' directory.")

if acc >= 0.90:
    print("\nSUCCESS: Accuracy achieved 90% target!")
else:
    print(f"\nTarget not fully met (Current: {acc:.4f}). Further tuning or more data might be needed.")
