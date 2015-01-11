#!/usr/bin/python
#: Python Script for launching emulators

import sys
import os
from subprocess import call

# TODO: Replace with subprocess as os.popen is deprecated.
# print sys.argv[0]
# print sys.argv[1]
# print sys.argv[2]
# print sys.argv[3]
# print sys.argv[4]
# # print '/home/pi/Ignition-RetroArch/'+sys.argv[1]+" -c /home/pi/Ignition-RetroArch/retroarch.cfg -"+sys.argv[2]+" "+sys.argv[3]+" \""+sys.argv[4]+"\""
# pipe = os.popen(sys.argv[1]+ " " +sys.argv[2]+ +sys.argv[2]+ " " + "\"" +sys.argv[3]+ "\"").read();

# pipe = os.popen('/opt/emulators/RetroArch/retroarch').read();

pipe = os.popen('/opt/emulators/RetroArch/retroarch -L "/opt/emulatorcores/fceu-next/fceumm-code/fceumm_libretro.so" "/root/roms/nes/Tetris.NES"').read();

# TODO: Call REST Api to present after game profile
