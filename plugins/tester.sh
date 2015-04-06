#Web Updater Downloaded

#This is a download script to download and update Ignition.
#This downloads the updater.sh file in this repo and loads it.
#This is used currently to test versions of the updater.sh script.

#Not to be used in this form for final public version!

#(C) Vincent Lee / vlee489

#Shorteners
#----------
Storage="/opt/plugins"
FileStorage="http://ignition.bezrepo.fluctis.com/dev"
FileName="update.sh"

cd $Storage
wget $FileStorage/$FileName
bash update.sh
