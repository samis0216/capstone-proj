import os
import subprocess
import tkinter as tk
from tkinter import messagebox
import threading
import re  # Import the regular expressions module

# Custom color scheme
BG_COLOR = "#1e1e1e"  # Dark background color
TEXT_COLOR = "#c5c5c5"  # Light text color for readability
ENTRY_COLOR = "#2d2d2d"  # Slightly lighter color for entry fields

# Regex pattern for URL validation
URL_PATTERN = re.compile(
    r'^(https?|ftp):\/\/'  # http:// or https://
    r'(([A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+'  # domain...
    r'[A-Z]{2,6}\.?|'  # domain extension (e.g., .com, .net)
    r'localhost|'  # localhost...
    r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'  # ...or IPv4
    r'(:\d+)?'  # optional port
    r'(\/[-A-Z0-9+&@#\/%=~_|$?!:.,]*)?'  # resource path
    r'(\?[A-Z0-9+&@#\/%=~_|$?!:.,]*)?$', re.IGNORECASE
)

def download_song(event=None):  # Add 'event' parameter for key binding
    url = entry.get().strip()
    if not url:
        messagebox.showwarning("Input Error", "Please enter a URL.")
        return

    if not re.match(URL_PATTERN, url):
        messagebox.showwarning("Input Error", "Please enter a valid URL.")
        return

    # Specify the path to the Downloads folder
    downloads_folder = os.path.expanduser("~/Downloads")
    output_template = os.path.join(downloads_folder, "%(title)s - %(uploader)s.%(ext)s")

    # Determine the download type based on the selected option
    if download_option.get() == "single":
        # Command for downloading a single song
        command = [
            "yt-dlp",
            "--extract-audio",
            "--audio-format", "mp3",
            "--audio-quality", "320K",
            "--output", output_template,
            "--embed-metadata",
            "--embed-thumbnail",
            url
        ]
    elif download_option.get() == "playlist":
        # Command for downloading a playlist
        command = [
            "yt-dlp",
            "--yes-playlist",  # Ensures that entire playlists are downloaded
            "--extract-audio",
            "--audio-format", "mp3",
            "--audio-quality", "320K",
            "--output", output_template,
            "--embed-metadata",
            "--embed-thumbnail",
            url
        ]
