import requests

def download_picture():
    # Prompt the user for the picture URL
    url = input("Enter the picture URL: ").strip()

    # Prompt the user for the name to save the file as
    file_name = input("Enter the filename to save as (including extension, e.g., image.jpg): ").strip()

    try:
        # Send a GET request to the URL
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for HTTP errors

        # Write the content to a file
        with open(file_name, 'wb') as file:
            file.write(response.content)

        print(f"Picture downloaded successfully as {file_name}!")

    except requests.exceptions.RequestException as e:
        print(f"Error: Unable to download the picture. Details: {e}")
