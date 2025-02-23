import os
from flask import Flask, jsonify, request, flash, redirect, url_for
from flask_cors import CORS
from moviepy import *
from youtube_transcript_api import YouTubeTranscriptApi
import google.generativeai as genai
import moviepy.editor as mp
import speech_recognition as sr
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

@app.route("/transcriptvideo", methods=['OPTIONS'])
def options():
    return '', 200

@app.route("/transcriptYT", methods=['OPTIONS'])
def options2():
    return '', 200

@app.after_request
def apply_cors(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response
GEMINI_API_KEY = "AIzaSyCMktM6acrHtvB0gOa3zPXNjcfzFYEtGO4"
genai.configure(api_key=GEMINI_API_KEY)

#CALL THIS FROM THE FRONTEND
@app.route("/summarizeAPI", methods=["POST"])
def summarize_textAPI():
    try:
        data = request.get_json()
        if not data or "text" not in data:
            return jsonify({"error": "Missing 'text' parameter"}), 400

        text = data["text"]
        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content(f"Summarize the following transcript in detailed bullet points: {text}")

        return jsonify({"summary": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/summarize", methods=["POST"])
async def summarize_text(transcript_text):
    try:
        text = transcript_text
        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content(f"Summarize the following transcript in detailed bullet points: {text}")

        return response.text
    except Exception as e:
        return str(e)

@app.route("/transcriptVideo", methods=['GET'])
def returnTranscript():
    try:
        video = mp.VideoFileClip("./geeks.mp4")  # Load the video
        audio_file = video.audio
        audio_file.write_audiofile("geeksforgeeks.wav")  # Extract audio

        # Initialize recognizer
        r = sr.Recognizer()

        # Load and process the audio file
        with sr.AudioFile("geeksforgeeks.wav") as source:
            data = r.record(source)

        # Convert speech to text
        text = r.recognize_google(data)

        print("\nThe resultant text from video is:\n", text)

        return jsonify({"text": text})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/transcriptYT", methods=['POST'])
async def returnYTTranscript():
    data = request.get_json()
    if not data or "text" not in data:
        return jsonify({"error": "Missing 'text' parameter"}), 400

    text = data["text"]
    text= text.split("v=")[-1].split("&")[0] if "v=" in text else text.split("/")[-1]
    video_id = request.args.get("video_id", text)  # Get video ID from query param

    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        transcript_text = " ".join([entry["text"] for entry in transcript])  # Convert to plain text
        summary = await summarize_text(transcript_text)

        # return jsonify({"text": transcript_text})
        return jsonify({"text": transcript_text, "summary": summary})

    except Exception as e:
        return jsonify({"error": str(e)}), 400
#
if __name__ == "__main__":
    app.run(port=5000, debug=True)
