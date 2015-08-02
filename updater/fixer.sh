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
#place where files and Igntion is kept
Files="/opt/"
Ignition="/opt/ignition/"
#Tempory files storage during testing
FileStore="http://ignition.bezrepo.fluctis.com/fix"
FixerFile="fixer.zip"
#Place where the Updater script and files are stored.
Fixer="/opt/updater/fixer/"
FixerIgnition="/opt/updater/fixer/ignition"
#Defines the Platform
Platform="Pi2"

clear
echo "We DO NOT take reposibility it this fixer breaks Ignition!"
echo "You have 5 seconds to press CTRL + C to cancel this fixer!"
echo " If not we will begin!"
sleep 5
clear
echo "Fixer started please do not touch when fixer is working!"
sleep 1
cd $Fixer
rm -rf $FixerFile
rm -rf ignition
wget $FileStore/$Platform/$FixerFile
clear
unzip $FixerFile
cd $Files
rm -rf ignition
cd $Fixer
mv ignition $Files
clear
echo "Finished"
