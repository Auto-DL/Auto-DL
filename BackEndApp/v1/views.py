from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import sys
import os
import json
import importlib

sys.path.append('..')

from DLMML.parser import *
from DLMML.utils import json_to_dict


@api_view(['POST'])
def generate(request):
    body_unicode = request.body.decode('utf-8')
    inputs_json = json.loads(body_unicode)
    inputs = json_to_dict.MakeDict(inputs_json).parse()

    lib = inputs['lib']
    lang = inputs['lang']
    parser_path = 'DLMML.parser.'+lang+'.'+lib+'.main'
    parser = importlib.import_module(parser_path)

    status, error = parser.generate_code(inputs)
    if status:
        print("Error", error)
        msg = error
        path = ''
    else:
        print("File generated") 
        msg = 'file generated'
        path = 'file://'+os.getcwd()+os.sep+'test.py'

    return JsonResponse({
                            'message': msg, 
                            'path': path
                        })

