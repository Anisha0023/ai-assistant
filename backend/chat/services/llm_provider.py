import os
from google import genai


class LLMProviderError(Exception):
    """Raised when the Gemini provider cannot generate a response."""

def generate_response(prompt:str)->str:
     """
    Send a prompt to Gemini and return the generated text.
    """
     if not prompt or not prompt.strip():
          raise ValueError("Prompt cannot be empty")
     api_key=os.getenv("GEMINI_API_KEY")
     model=os.getenv("GEMINI_MODEL")

     if not api_key:
          raise LLMProviderError("API key is not configured yet")
     try:
          client=genai.Client(api_key=api_key)

          response=client.models.generate_content(
               model=model,
               contents=prompt.strip()
          )

          generated_text=response.text
          if not generated_text:
            raise LLMProviderError("Gemini returned an empty response.")
          return generated_text.strip()
     except LLMProviderError:
         raise
     except Exception as exe:
         raise LLMProviderError("Failed to generate response from model") from exe
          

