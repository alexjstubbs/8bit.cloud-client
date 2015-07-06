#!/usr/bin/python
#: Python Script for launching emulators

import sys
import os
from subprocess import call

# TODO: Replace with subprocess as os.popen is deprecated.
print sys.argv[4]
# print '/home/pi/Ignition-RetroArch/'+sys.argv[1]+" -c /home/pi/Ignition-RetroArch/retroarch.cfg -"+sys.argv[2]+" "+sys.argv[3]+" \""+sys.argv[4]+"\""
pipe = os.popen('/home/pi/Ignition-RetroArch/'+sys.argv[1]+" -c /home/pi/Ignition-RetroArch/retroarch.cfg -"+sys.argv[2]+" "+sys.argv[3]+" \""+sys.argv[4]+"\"").read()
stpipe = os.popen("kill $(ps aux | grep 'command.sh' | awk '{print $2}')").read()
stopipe = os.popen('pkill -CONT chromium').read()

# TODO: Call REST Api to present after game profile