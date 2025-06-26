# Plant Detection Web App – Setup Guide

This is a local Flask-based web application that detects plant diseases from uploaded leaf images using a PyTorch model. Based on the prediction, the app displays disease information in **English** or **Assamese**.

---

## Step-by-Step Instructions to Run the Project

### 1. Extract the Project Folder

After receiving or downloading the project as a `.zip` file, extract it to a known location on your computer.

---

### 2. Open a Terminal or Command Prompt

Navigate to the extracted project folder using the terminal or command prompt:

```bash
cd path_to_your_project_folder
```

---

### 3. Create a Python Virtual Environment

Use the following command to create a virtual environment:

```bash
python -m venv venv
```

Then activate the environment:

- **On Windows**:

```bash
venv\Scripts\activate
```

- **On Linux/macOS**:

```bash
source venv/bin/activate
```

---

### 4. Install Required Python Packages

Once the virtual environment is activated, install the necessary dependencies using:

```bash
pip install flask torch torchvision pillow beautifulsoup4
```

---

### 5. Verify the Folder Structure and Required Files

Make sure your project folder has the following structure:

```
project_folder/
├── app.py
├── model.pt
├── classes/                 # English HTML files like 0.html, 1.html, etc.
├── ass_plant_details/       # Assamese HTML files (same filenames as in classes/)
├── templates/
│   └── index.html           # Upload form for images
├── uploads/                 # This folder will be created automatically at runtime
└── classes/unknown.html     # Fallback page for low-confidence predictions
```

> Make sure the `model.pt` file was saved using `model.state_dict()` and matches the architecture in `app.py`.

---

### 6. Run the Application

Start the Flask development server with the following command:

```bash
python app.py
```

---

### 7. Open the Web App in Your Browser

Once the server is running, open this address in your browser:

```
http://localhost:5000
```

You’ll see an upload form where you can:

- Choose an image of a plant leaf.
- Select the language (English or Assamese).
- Submit the form to get the plant disease classification and details.

---

## Notes

- **Supported image formats:** `.jpg`, `.jpeg`, `.png`
- **Confidence threshold:** If the model is less than 60% confident in its prediction, the app will show the `unknown.html` page.
- The number of plant classes is determined by the number of `.html` files in the `classes/` folder.

---

## Optional

If you'd like to deactivate the virtual environment after you're done:

```bash
deactivate
```

---

## Troubleshooting

- **ModuleNotFoundError:** Make sure you've activated your virtual environment and installed all required packages.
- **Model not loading:** Ensure `model.pt` matches the architecture defined in the code.
- **Port already in use:** If port 5000 is busy, you can change it in `app.py` like this:

```python
app.run(host="0.0.0.0", port=5001, debug=True)
```
