Ads demo
==============

## How to run the demo on a device

The following steps are the minimun required for running this project exported for cordova. 

### Configuring the .capx 

1. Open the .capx
2. Click on the "ATP Ads" object. 
3. Add your AdUnits in the object properties. 
4. Export the project for Cordova. 

### Configuring the exported project

5. Create a Cordova project. 
6. Paste the exported files except the **config.xml** in the *www* folder. 
7. Paste the **config.xml** file on the *root* of the project. 
9. Add the desired *plugins* in the project. At least it is neccesary to install one of [these](https://github.com/ludei/atomic-plugins-c2#ads-1). As long as the AdUnits included in the capx are correct and correspond to the plugin installed, the project will work properlly. 
8. Run the project from the command line using "cordova run" command.

