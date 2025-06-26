# Medicinal Plant Detection Web App – Setup Guide

This is a Flask-based web application that detects **20 species of medicinal plants** using a deep learning model trained with PyTorch. Users can upload a plant leaf image, and the app will identify the plant species and display detailed information in **English** or **Assamese**.

---

## 🌿 Project Features

- Detects 20 medicinal plant species from leaf images
- Displays plant information in English or Assamese
- Supports image upload via web interface
- Redirects to a fallback page for uncertain predictions

---

## 📁 Folder Structure

```
project_root/
├── app.py                   # Main Flask application
├── model.pt                 # Trained PyTorch model
├── ass_plant_details/       # Assamese HTML info pages (0.html - 19.html)
├── classes/                 # English HTML info pages (0.html - 19.html + unknown.html)
├── images/                  # Optional images (e.g., icons, UI assets)
├── templates/
│   └── index.html           # Upload form (image + language selector)
└── uploads/                 # Auto-created, stores uploaded images temporarily
```

---

## ✅ Setup Instructions (Run Locally)

### 1. Extract the Project

Unzip the project folder to a known location on your computer.

---

### 2. Open Terminal and Navigate to the Project

```bash
cd path_to_project/Medicinal\ Plant\ Detction
```

---

### 3. Create and Activate a Python Virtual Environment

```bash
python -m venv venv
```

- **Windows:**
  ```bash
  venv\Scripts\activate
  ```

- **Linux/macOS:**
  ```bash
  source venv/bin/activate
  ```

---

### 4. Install Required Dependencies

```bash
pip install flask torch torchvision pillow beautifulsoup4
```

---

### 5. Verify Required Files and Pages

Make sure these exist:

- `model.pt` (your trained model)
- `classes/0.html` to `classes/19.html`
- `ass_plant_details/0.html` to `ass_plant_details/19.html`
- `classes/unknown.html` — shown when model confidence is low
- `templates/index.html` — the upload form

---

### 6. Start the Application

```bash
python app.py
```

If needed, modify the last line of `app.py` to change the port:

```python
app.run(host="0.0.0.0", port=5000, debug=True)
```

---

### 7. Open in Your Web Browser

Visit the following address in your browser:

```
http://localhost:5000
```

You will see a form to:

- Upload an image of a plant leaf
- Select the preferred language (English or Assamese)
- View detailed plant information after submission

---

## ⚙️ Model Details

- Architecture: EfficientNet-B0 (`torchvision.models.efficientnet_b0`)
- Trained for: 20 medicinal plant species
- Output: Predicted class ID → redirects to corresponding HTML page

---

## 📌 App Behavior

- Uses softmax to get prediction confidence.
- If confidence ≥ 60%: redirects to corresponding `0.html`–`19.html`.
- If confidence < 60%: redirects to `unknown.html`.

---

## 🖼 Supported Image Formats

- `.jpg`
- `.jpeg`
- `.png`

---

## 🔧 Troubleshooting

- **ModuleNotFoundError**: Ensure virtual environment is active and all dependencies are installed.
- **Model loading issue**: Check if `model.pt` matches architecture in `app.py` and is loaded via `load_state_dict`.
- **Static assets not loading**: Place any needed images or CSS inside `static/` and link them properly in `index.html`.

---

## 🧪 Testing & Sample Images

You can place test images in the `images/` folder or upload them directly through the form to check model predictions.

---

## 🧹 Deactivate the Environment

After you're done:

```bash
deactivate
```

---

