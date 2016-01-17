# Ignition Client

###### A modern social retro gaming OS designed for your living room.

![io logo](http://i.imgur.com/G7Uwcoq.png)


[![badge](https://img.shields.io/badge/CHAT%20NOW-%20SLACK-blue.svg)](https://slackignition.azurewebsites.net/) [![report bugs](https://img.shields.io/badge/REPORT-ISSUES-red.svg)](http://ignitionio.atlassian.net/) [![wiki](https://img.shields.io/badge/PROJECT-WIKI-brightgreen.svg)](https://ignitionio.atlassian.net/wiki/#all-updates)

---



### What is ignition?

Ignition is a single purpose and lightweight embedded linux distribution aimed to run on systems with limited resources, such as the Raspberry Pi. The core focus of ignition is to play retro videogames and software via emulation with custom features and a unique front-end.

The ignition software aims to add additional and modern features to the gameplay experience, which are not found in the emulation software itself. Some of these features include:

* Universal Gaming Achievements
* Social Interaction (messaging, friend notifications, invites, profiles)
* Unified Front End with Gamepad Focused Navigation
* Game Catalog
* Gaming Metrics
* Voice Control
* More...

--

#This Informaion Below Is Soon To Be Updated. Read Wiki for more Information.


### The software stack

The ignition software is a collection of modules written mostly in Javascript utilizing NodeJS.

The front end is presented by a rendering engine such as Webkit. The UI is currently written as ReactJS Components. DOM manipulation is done via vanilla JS with minimal libraries and dependancies.

The communication between the software and client are done via WebSockets which is also utilized for communications between users, the server, and all communication and dialog events.

Some core elements of the software package, such as the low-level graphics API, are written in C++ as well as C/Python.


**Questions?** [admin@ignition.io](mailto:admin@ignition.io)