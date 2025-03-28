from typing import Any, Generator

from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import time
import os
import uvicorn  # Import uvicorn for running the server

app = FastAPI()

LOG_FILE_PATH = "logs/server.log"

# Add CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow requests from Next.js
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def log_stream(log_file_path: str) -> Generator[str, None, None]:
    try:
        with open(log_file_path, "r") as log_file:
            # Move to the end of the file
            _ = log_file.seek(0, os.SEEK_END)
            while True:
                line = log_file.readline()
                if line:
                    yield line
                else:
                    yield "Waiting for new log entries...\n"  # Heartbeat message
                    time.sleep(1)  # Wait for new lines to be written
    except FileNotFoundError:
        yield "Log file not found.\n"
    except Exception as e:
        yield f"Error reading log file: {str(e)}\n"


def simulate_log_generation():
    """Simulate log entries being written to the log file."""
    while True:
        with open(LOG_FILE_PATH, "a") as log_file:
            _ = log_file.write(f"Simulated log entry at {time.ctime()}\n")
        time.sleep(5)  # Write a new log entry every 5 seconds


@app.on_event("startup")
def start_log_simulation():
    """Start the log simulation in a background task."""
    import threading

    threading.Thread(target=simulate_log_generation, daemon=True).start()


@app.get("/stream")
def stream():
    return StreamingResponse(log_stream(LOG_FILE_PATH), media_type="text/plain")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
