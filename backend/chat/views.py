from django.shortcuts import render
from sqlalchemy import null
from rest_framework.decorators import api_view  # http methoa access
from rest_framework.response import Response  # response data
from rest_framework import status   # response status (400,404 etc..)

# Create your views here.
@api_view(['POST'])
def chat(request):
    query=request.data.get('message',"");     #body param access - #query = request.query_params.get('message', '') - query param access 
    print("user question",query)
    return Response({
  "response": "React Hooks are functions that allow..."
    })