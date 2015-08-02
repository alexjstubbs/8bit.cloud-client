#This is a test script that allows me to test on a pi without using a pen drive
#by downloading a copy from the dev server.

#DO NOT INCLUDE IN SOFTWARE!!

#(C) Vincent Lee / vlee489

#Shorteners
#----------
Storage="/opt/plugins"
FileStorage="http://ignition.bezrepo.fluctis.com/dev"
FileName="update.sh"

mkdir $Storage
cd $Storage
rm update.sh
wget $FileStorage/$FileName
bash update.sh
