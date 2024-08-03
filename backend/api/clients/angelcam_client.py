import requests

class Angelcam_client:
    def __init__(self, access_token):
        self.base_url = "https://api.angelcam.com/v1/"
        self.access_token = access_token
        self.headers = {
            "Authorization": f"PersonalAccessToken {self.access_token}"
        }

    def get(self, endpoint, params=None):
        url = f"{self.base_url}{endpoint}"
        response = requests.get(url, headers=self.headers, params=params)
        response.raise_for_status()
        return response.json()

    def post(self, endpoint, data=None):
        url = f"{self.base_url}{endpoint}"
        response = requests.post(url, headers=self.headers, json=data)
        response.raise_for_status()
        return response.json()
