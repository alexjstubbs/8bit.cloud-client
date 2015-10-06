#!/bin/bash
#By Vincent Lee / vlee489
#(c) of Vincent Lee 2015
#See LICENSE file for copyright and license details
#Part of Ignition http://ignition.io

#Updater Version 4.1
#NOT READY FOR USE YET!

#Needs to excuted with root privilages!

#Shortcuts
#------------------------
#defines place where Ignition is stored.
Files="/opt/"
Ignition="/opt/ignition/"
#Tempory files storage during testing.
FileStore="http://ignition.bezrepo.fluctis.com"
UpdateFile="ignition.zip"
#lists the Github repo for easily  moving to git later in devlopment and launch.
GitRepositoryBase="https://github.com/alexjstubbs"
BaseRepositoryName="ignition-dev"
#Place where the updater script and temp files are stored.
UpdatesStore="/opt/updater/updates"
Updater="/opt/updater"
Updates="/opt/updater/updates/ignition/"
#Defines the Platform the it needs to update from
Platform="Pi2"
#Used for fixing the Ignition Directory if it fails to install correctly
FixerFile="fixer.zip"
Fixer="/opt/updater/fixer"


#!STILL NEEDS A WAY TO START UPDATE IN IGNITION!

clear
echo "Do not press CTRL + C Or You May Break You instillation Of Ignition!"
echo "Starting update in 3 seconds!"
sleep 3
cd $Updater
#Makes a directory to store the updates and changes directory into it.
mkdir updates
cd updates
#Removes the ignition  zip file and directory if it already exsitsts.
rm -rf ignition
rm -rf ignition.zip
#Goes to the update server to grab the newest version and unzips it.
echo "Downloading Files and unpacking!"
echo "This can take a while depending "
echo "on the platform you are using Ignition on"
echo "and the size of the update!"
sleep 1
wget $FileStore/$Platform/$UpdateFile
unzip $UpdateFile
clear
echo "Checking if file was downloaded succsessfully"
#Checks if the ignite.js is present in the updates folder.
if [ -f /opt/plugins/updates/ignition/ignite.js ]
  then
    # If download was successful it moves node_modules out and to the new folder and delets the /opt/ignition folder and copies the new one in place.
    echo "Download successful. Installing update now."
    #Goes into the /opt/ignition directory
    cd $Ignition
    #moves the node_modules and configs folder
    echo "Moving Files into place"
    mv node_modules $Updates
    mv config $Updates
    clear
    #Checks if node_modules copied correctly
    if [ -f /opt/updater/updates/ignition/node_modules/check.txt ]
      then
        #If copied correctly it will continue with the update
        cd $Files
        #Delets the Ignition folder to make way for the new one
        rm -rf ignition
        #Changes directory back to the updates folder.
        cd
        cd $UpdatesStore
        clear
        #Moves the Ignition folder into place.
        echo "Moving into place"
        mv ignition $Files
        #Checks for a extra updates in a form of a extra.sh files that contains the extra updates
        echo "Checking of extra Updates!"
        sleep 1
        if [ -f /opt/ignition/extra.sh ]
          then
            clear
            #If extra updates are found it deletes the previous extra update file and copies the new one in place.
            #Read "extra updates.md" for more infomation
            echo "Extra Updates found!"
            echo "Now Running Extra Updates!"
            cd /opt/updater
            rm extra.sh
            cd /opt/ignition/extra.sh
            mv /opt/ignition/extra.sh /opt/updater
            cd /opt/updater
            #Starts the extra.sh update script.
            bash extra.sh
            echo "Extra updates Installed!"
            #Informs the user the update is done and reboot to let the updates take effect.
            echo "Update Done!"
            echo "Enjoy the new update!"
            echo "Rebooting in 3 Seconds!"
            sleep 3
            echo "You have Been Warned!"
            reboot
          else
            clear
            #if no extra.sh is found it will reboot.
            echo "No extra updates found!"
            sleep 1
            clear
            echo "Update Done!"
            echo "Enjoy the new update!"
            echo "Rebooting in 3 Seconds!"
            sleep 3
            echo "You have Been Warned!"
            reboot
        fi
      else
        #If not it will start the fixer to update back to the last working version.
        echo "Error 1"
        echo "Move of node_modules Failed! Starting fixer!"
        echo "Do Not Reboot or Power Off During This is Running"
        sleep 2
        cd $Fixer
        wget $FileStore/$Platform/$FixerFile
        echo "Checking Fixer File!"
        unzip $FixerFile
        mv ignition $Files
        echo "Fixer Done!"
        echo "Please rerun the updater after reboot!"
        sleep 2
        echo "Rebooting in 3 Seconds"
        sleep 3
        reboot
    fi
  else
    #If updates fails, it aborts further action and reboots back into ignition.
    clear
    echo "Error 2"
    echo "Failed to download! Aborting Further Action!"
    echo "Likely due to a server downage or not having an internet connection!"
    echo "Ignition will still work"
    echo "Rebooting in 3 Seconds"
    sleep 3
    echo "you've been warned"
    reboot
fi
