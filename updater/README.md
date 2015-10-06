#Updater

This is a way to update Ignition itself over the air, does nothing else. This doesn't update the emulators.

This is a backbone and still needs a front end in Ignition itself to take advantage of the update script.

###To use place the updater folder in /opt/.

    bash /opt/updater/update.sh

###You Need to change the platform for each platform. E.g. Pi1 or Pi2. This is done by changing the platform name on line 28.

#####To use this properly the node_modlules requires a file named check.txt to allow the Updater to check if the files have been copied properly!

###!Requires root privileges to be able to write to /opt/!

To use it there need to be a way for the end user to be notified of an update and needs a way to stop Ignition before the update can take place.

This script is configured to use wget to grab a zip file. Then it unzips the file and places it into place.

This update script is by Vincent Lee/vlee489  
