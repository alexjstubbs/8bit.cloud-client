import requests

key = "IOIRMXMNTIKE2ONAGASUPFJOZJPQXASD"

def archive(call, query):
        domain = call.split('/')[0]
        if domain == 'api.archive.vg':
            r = requests.get('http://'+call+key+"/"+query, timeout=15.00)
            return r.json()
        else: 
            print "error: incorrect domain"
            return
