Ads demo
==============

## How to run the demo on a device

The following steps are the minimun required for running this project exported for cordova. You can try to [configure the .capx](https://github.com/ludei/cocoon-plugins-c2/tree/master/demos/ads#configuring-the-capx) to see how the example works using your own AdUnits, or you can [run the provided compiled files](https://github.com/ludei/cocoon-plugins-c2/tree/master/demos/ads#running-the-already-compiled-files). 

### Configuring the .capx 

1. Open the cocoon-ads-c2.capx
2. Click on the *Cocoon Ads* object. 
3. Add your AdUnits in the object properties. 
4. Export the project for Cordova. 

### Configuring the exported project

1. Create a Cordova project. 
2. Paste the exported files except the **config.xml** in the *www* folder. 
3. Paste the **config.xml** file on the *root* of the project. 
4. Add the desired *plugins* in the project. At least it is neccesary to install one of [these](https://github.com/ludei/cocoon-plugins-c2#ads-1). As long as the AdUnits included in the capx are correct and correspond to the plugin installed, the project will work properlly. 
5. Run the project from the command line:
```
	cordova run
```
### Running the already compiled files

#### Android

* Run *adb install PATH/TO/FILE/cocoon-ads-c2-debug.apk* from the command line. 
