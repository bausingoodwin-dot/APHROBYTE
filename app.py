from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/contact", methods=["POST"])
def contact():
    name = request.form.get("name")
    email = request.form.get("email")
    message = request.form.get("message")

    # You can save to database, send email, or store in file
    print(f"New contact: {name}, {email}: {message}")

    return jsonify({"status": "success", "message": "Thank you! We received your message."})

if __name__ == "__main__":
    app.run(debug=True)
