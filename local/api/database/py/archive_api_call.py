#!/usr/bin/python
#: Python Script for communicating with archive.vg API
import sys
import json
import archive_api

argl = len(sys.argv)

if argl > 3:
   print "null"
else:
    query = archive_api.archive(sys.argv[1],sys.argv[2])
    query = json.dumps(query)
    print query