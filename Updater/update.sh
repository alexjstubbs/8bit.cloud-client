#!/bin/bash
#By Vincent Lee / vlee489
#(c) of Vincent Lee 2015
#See LICENSE file for copyright and license details
#Part of Ignition http://ignition.io

#Updater Version 3.5
#NOT READY FOR USE YET!

#Needs to excuted with root privilages!

#Shortcuts
#------------------------
files="/opt/"
#Tempory files storage during testing
FileStore="http://ignition.bezrepo.fluctis.com"
UpdateFile="ignition.zip"
#lists the Github repo for easily  moving to git later in devlopment and launch.
GitRepositoryBase="https://github.com/alexjstubbs"
BaseRepositoryName="ignition"
#Place where the Updater script and files are stored.
UpdaterStore="/opt/Updater/"


#!STILL NEEDS A WAY TO STOP IGNITION BEFORE UPDATING!

#Makes a directory to store the updates and changes directory into it.
mkdir updates
cd updates
#Removes the ignition  zip file and directory if it already exsitsts.
rm -rf ignition
rm -rf ignition.zip
#Goes to the update server to grab the newest version and unzips it.
wget $FileStore/$UpdateFile
unzip $UpdateFile
#Uncomment line 33 if you want to use git to update and comment out line 31,32
# git clone $GitRepositoryBase/$BaseRepositoryName
clear
echo "Checking if file was downloaded succsessfully"
#Checks if the ignite.js is present in the updates folder.
if [ -f /opt/Updater/updates/ignition/ignite.js ]
  then
    # If download was successful it delets the /opt/ignition folder and copies the new one in place.
    echo "Download successful. Installing update now."
    #Goes into the /opt/ directory
    cd $files
    #Delets the Ignition folder to make way for the new one
    rm -rf ignition
    #Changes directory back to the updates folder.
    cd
    cd $UpdaterStore
    cd updates
    #Moves the Ignition folder into place.
    mv ignition $files
    clear
    #Informs the user the update is done and reboot to let the updates take effect.
    echo "Update Done!"
    echo "Enjoy the new update!"
    echo "Rebooting in 2 Seconds!"
    sleep 2
    echo "You have Been Warned!"
    reboot
  else
    #If updates fails, it aborts further action and reboots back into ignition.
    clear
    echo "Failed to download! Rebooting system"
    sleep 1
    echo "Rebooting in 2 Seconds"
    sleep 2
    echo "you've been warned"
    reboot
fi
