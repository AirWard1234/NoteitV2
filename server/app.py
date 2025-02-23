import multiprocessing
import os
import wave
import json
from vosk import Model, KaldiRecognizer
from pydub import AudioSegment

MODEL_PATH = os.path.expanduser("~/vosk_models/vosk-model")  # Full path
MP3_FILE = "c.mp3"  # Input MP3 file
NUM_CORES = multiprocessing.cpu_count()  # Detect available CPU cores

def convert_mp3_to_wav(mp3_path):
    """Converts an MP3 file to WAV format for Vosk processing."""
    mp3_path = os.path.abspath(mp3_path)  # Get absolute path
    if not os.path.exists(mp3_path):
        raise FileNotFoundError(f"File not found: {mp3_path}")

    # Convert MP3 to WAV
    audio = AudioSegment.from_mp3(mp3_path)
    wav_path = mp3_path.replace(".mp3", ".wav")
    audio.export(wav_path, format="wav")
    
    return wav_path  # Return new WAV file path

def transcribe_segment(segment_path):
    """Transcribes a given audio segment using Vosk."""
    model = Model(MODEL_PATH)
    wf = wave.open(segment_path, "rb")
    rec = KaldiRecognizer(model, wf.getframerate())
    rec.SetWords(True)

    while True:
        data = wf.readframes(4000)
        if not data:
            break
        rec.AcceptWaveform(data)

    return json.loads(rec.FinalResult())

def split_audio(audio_path, num_chunks):
    """Splits audio into multiple segments for parallel processing."""
    audio = AudioSegment.from_wav(audio_path)
    segment_length = len(audio) // num_chunks  # Divide length evenly

    chunk_paths = []
    for i in range(num_chunks):
        start = i * segment_length
        end = (i + 1) * segment_length if i < num_chunks - 1 else len(audio)
        chunk = audio[start:end]
        chunk_path = f"chunk_{i}.wav"
        chunk.export(chunk_path, format="wav")
        chunk_paths.append(chunk_path)

    return chunk_paths
def main():
    """Main function to transcribe using multiprocessing."""
    # Convert MP3 to WAV first
    wav_file = convert_mp3_to_wav(MP3_FILE)

    # Split audio for parallel processing
    chunks = split_audio(wav_file, NUM_CORES)

    # Use multiprocessing to transcribe in parallel
    with multiprocessing.Pool(NUM_CORES) as pool:
        results = pool.map(transcribe_segment, chunks)

    # Merge results
    for result in results:
        for word in result.get("result", []):
            print(f"{word['word']} (start: {word['start']:.2f}s, end: {word['end']:.2f}s)")

    # Clean up temporary chunk files
    for chunk in chunks:
        os.remove(chunk)

if __name__ == "__main__":
    main()