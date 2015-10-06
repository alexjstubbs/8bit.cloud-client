#How to switch from wget to git

###This is only here for reference back to the updaterold.sh

To configure to use git comment out lines 33 and 34 and uncomment line 36.

This will make the updater use git that allows the newest, freshest features to be implemented.

Git only works with public repositories. Private repositories aren't currently supported!

This is not recommended for public use as it may break peoples copies and should only be used for easily updating development copies.

###This currently won't work with the way Ignition is compiled with QT Webkit.
