#!/bin/bash
#By Vincent Lee / vlee489
#(c) of Vincent Lee 2015
#See LICENSE file for copyright and license details
#Part of Ignition http://ignition.io

# WORK IN PROGRESS!

#This is a bash script to fix Ignition
#for any reason it breaks during the update or if the user messes something up.

#fixer Version 0.5
#NOT READY FOR USE YET!

#Needs to excuted with root privilages!

#Shortcuts
#------------------------
files="/opt/"
ignition="/opt/ignition/"
#Tempory files storage during testing
FileStore="http://ignition.bezrepo.fluctis.com"
UpdateFile="ignition.zip"
FixerFile="fixer.zip"
#lists the Github repo for easily  moving to git later in devlopment and launch.
GitRepositoryBase="https://github.com/alexjstubbs"
BaseRepositoryName="ignition"
#Place where the Updater script and files are stored.
UpdatesStore="/opt/Updater/updates"
Updates="/opt/Updater/updates/ignition/"
Fixer="/opt/Updater/fixer/"

echo "Now atempting to fix Ignition"
sleep 2
mkdir fixer
cd fixer
#Removes the fixer ignition zip file and directory if it already exsitsts.
rm -rf ignition
rm -rf ignition.zip
cd $Fixer
wget $FileStore/$FixerFile
unzip fixer.zip
mv ignition $files
if [ -f /opt/ignition/ignite.js]
  then
  echo "Do not press CTRL + C Or You May Break You Instilation Of Ignition AGAIN!"
  sleep 2
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
      echo "Fix done!"
      echo "You may want to run the update.sh file with bash /opt/Updater/update.sh"
      echo "This will update to the newest version of Ignition"
      sleep 10
      echo "Rebooting in 2 Seconds"
      sleep 2
      echo "You have Been Warned!"
      reboot
    else
      #If updates fails, it aborts further action and reboots back into ignition.
      clear
      echo "Failed to download update"
      sleep 1
      echo "You may want to run the update.sh file with bash /opt/Updater/update.sh"
      sleep 10
      echo "Rebooting in 2 Seconds"
      sleep 2
      echo "you've been warned"
      reboot
  fi
else
  echo "Failed to fix Ignition! Please run the fix file again. If that fails please backup and reflash your SD card."
  Sleep 10
fi
