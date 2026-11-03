import logging

from django.shortcuts import render
from sqlalchemy import null
from rest_framework.decorators import api_view  # http methoa access
from rest_framework.response import Response  # response data
from rest_framework import status   # response status (400,404 etc..)

from .services.llm_provider import(
    generate_response,LLMProviderError
)

logger=logging.getLogger(__name__)

@api_view(['POST'])
def chat(request):
    message=request.data.get("message",'')

    if not isinstance(message,str) or not message.strip():
        return Response(
            {"error":"message cannot be empty"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        answer=generate_response(message)

        return Response({
            "response":answer
        },status=status.HTTP_200_OK)
    except LLMProviderError:
        
        logger.exception("Gemini response generation failed")

        return Response({
            "error":"Response generation failed due to some issues"
        },status=status.HTTP_502_BAD_GATEWAY)