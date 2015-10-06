#!/bin/bash
#By Vincent Lee / vlee489
#(c) of Vincent Lee 2015
#See LICENSE file for copyright and license details
#Part of Ignition http://ignition.io

#This is the old updater that is for refrence back.

#Needs to excuted with root privilages!

#Shortcuts
#------------------------
#defines place where Ignition is stored.
files="/opt/"
ignition="/opt/ignition/"
#Tempory files storage during testing.
FileStore="http://ignition.bezrepo.fluctis.com"
UpdateFile="ignition.zip"
#lists the Github repo for easily  moving to git later in devlopment and launch.
GitRepositoryBase="https://github.com/alexjstubbs"
BaseRepositoryName="ignition"
#Place where the Updater script and temp files are stored.
UpdatesStore="/opt/Updater/updates"
Updates="/opt/Updater/updates/ignition/"
#Used for fixing the Ignition Directory if it fails to install correctly
FixerFile="fixer.zip"
Fixer="/opt/Updater/fixer/"


#!STILL NEEDS A WAY TO START UPDATE IN IGNITION!

echo "Do not press CTRL + C Or You May Break You Instilation Of Ignition!"
sleep 2
#Makes a directory to store the updates and changes directory into it.
mkdir updates
cd updates
#Removes the ignition  zip file and directory if it already exsitsts.
rm -rf ignition
rm -rf ignition.zip
#Goes to the update server to grab the newest version and unzips it.
echo "Downloading Files"
wget $FileStore/$UpdateFile
echo "Unziping files. May take a while depending on the size."
sleep 2
unzip $UpdateFile
#Uncomment line 47 if you want to use git to update and comment out line 42,45
# git clone $GitRepositoryBase/$BaseRepositoryName
clear
echo "Checking if file was downloaded succsessfully"
#Checks if the ignite.js is present in the updates folder.
if [ -f /opt/Updater/updates/ignition/ignite.js ]
  then
    # If download was successful it moves node_modules out and to the new folder and delets the /opt/ignition folder and copies the new one in place.
    echo "Download successful. Installing update now."
    #Goes into the /opt/ignition directory
    cd $ignition
    #moves the node_modules folder
    echo "Moving Files into place"
    mv node_modules $Updates
    #Goes back to /opt/
    cd files
    #Delets the Ignition folder to make way for the new one
    rm -rf ignition
    #Changes directory back to the updates folder.
    cd
    cd $UpdatesStore
    #Moves the Ignition folder into place.
    mv ignition $files
    clear
    #Informs the user the update is done and reboot to let the updates take effect.
    echo "Update Done!"
    echo "Enjoy the new update!"
    echo "Rebooting in 3 Seconds!"
    sleep 3
    echo "You have Been Warned!"
    reboot
  else
    #If updates fails, it aborts further action and reboots back into ignition.
    clear
    echo "Failed to download! Aborting Further Action!"
    sleep 2
    echo "Rebooting in 3 Seconds"
    sleep 3
    echo "you've been warned"
    reboot
fi
