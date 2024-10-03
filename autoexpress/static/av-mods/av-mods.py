from flask import Flask, request, jsonify, render_template, send_from_directory
from werkzeug.utils import secure_filename

import os
import pathlib

from autoexpress.modules import (
    a1111_client,
    image_parser,
    expression_generator,
)

autoexpress = Flask(__name__)

# settings foulder
SETTINGS_FOLDER = "settings"
MAX_FILES = 10
autoexpress.config["SETTINGS_FOLDER"] = SETTINGS_FOLDER

if not os.path.exists(SETTINGS_FOLDER):
    os.makedirs(SETTINGS_FOLDER)


# Settings uploaded
@autoexpress.route("/settings", methods=["POST"])
def upload_settings_file():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_settings_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(autoexpress.config["SETTINGS_FOLDER"], filename)
        file.save(filepath)

        params = image_parser.generate_parameters(filepath)

        return (
            jsonify(params),
            200,
        )


def allowed_settings_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in {
        "json",
    }
