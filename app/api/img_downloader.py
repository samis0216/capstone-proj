import requests

def download_picture():

    url = input("Enter the picture URL: ").strip()


    file_name = input("Enter the filename to save as (including extension, e.g., image.jpg): ").strip()

    try:

        response = requests.get(url)
        response.raise_for_status()

        with open(file_name, 'wb') as file:
            file.write(response.content)

        print(f"Picture downloaded successfully as {file_name}!")

    except requests.exceptions.RequestException as e:
        print(f"Error: Unable to download the picture. Details: {e}")

if __name__ == "__main__":
    download_picture()
