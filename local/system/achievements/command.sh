#!/bin/bash

# echo -n SYSTEM_RAM >/dev/udp/localhost/55355
while true; do echo -n SYSTEM_RAM >/dev/udp/localhost/55355; sleep 1; done