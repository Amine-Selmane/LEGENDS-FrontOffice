import speech_recognition as sr

r = sr.Recognizer()

while True:
    try:
        with sr.Microphone() as source:
            print("Say something")
            audio = r.listen(source)
            text = r.recognize_google(audio)
            text = text.lower()

            print(f"Recognized text: {text}")
    except sr.UnknownValueError:
        print("Speech recognition could not understand audio")
    except sr.RequestError as e:
        print(f"Could not request results from Google Speech Recognition service; {e}")
    except KeyboardInterrupt:
        print("Interrupted")
        break


# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import speech_recognition as sr

# app = Flask(__name__)
# CORS(app)  # Active CORS pour toutes les routes de l'application

# @app.route('/transcribe', methods=['POST'])
# def transcribe_audio():
#     print("Received POST request at /transcribe")

#     if 'audio' not in request.files:
#         print("No audio file provided")
#         return jsonify({'error': 'No audio file provided'}), 400

#     audio_file = request.files['audio']
#     recognizer = sr.Recognizer()

#     try:
#         with sr.AudioFile(audio_file) as source:
#             audio_data = recognizer.record(source)
#             text = recognizer.recognize_google(audio_data, language='fr-FR')
#             print("Transcription successful:", text)
#             return jsonify({'transcript': text}), 200
#     except Exception as e:
#         print("Error transcribing audio:", str(e))
#         return jsonify({'error': str(e)}), 500


# if __name__ == '__main__':
#     app.run(debug=True, port=3000, host='0.0.0.0')
