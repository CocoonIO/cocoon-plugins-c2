In-App purchases demo
======================

## How to run the demo on a device

The following steps are the minimun required for running this project exported for cordova. It is required to [configure the .capx](https://github.com/ludei/cocoon-plugins-c2/tree/master/demos/inapps#configuring-the-capx) in order to see how the example works using your own InApps configuration. 

### Configuring the .capx 

1. Open the cocoon-inapps-c2.capx
2. Open the InApps events sheet.  
3. Edit the PRODUCT_ID variable for a valid product ID. 
4. In the project properties, include a valid bundle ID.  
5. Export the project for Cordova. 

### Configuring the exported project

1. Create a Cordova project. 
2. Paste the exported files except the **config.xml** in the *www* folder. 
3. Paste the **config.xml** file on the *root* of the project. 
4. Add the desired *plugins* in the project. At least it is neccesary to install one of [these](https://github.com/ludei/cocoon-plugins-c2#in-app-purchases). 
5. Ensure the data you are using is valid for sandbox/debug mode according to the OS in which you are testing. 
6. Run the project from the command line:
```
	cordova run
```