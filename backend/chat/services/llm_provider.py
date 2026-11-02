import base64
from google import genai

client=genai.Client();

interaction=client.interactions.create(
    model=""
)


stream=client.interactions.create(
    stream=True
)