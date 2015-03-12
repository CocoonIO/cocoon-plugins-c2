Atomic Plugins for Construct 2
==================

This plugins can be used in Construct 2. It requires a cordova exportation. 

## Configuration

### Ads

The plugin can be configured by selecting the object "ATPAds" from the "Object types" list inside Construct 2.

## Installation

### Manual installation

* **Close Construct 2**
* Checkout the 'master' branch from this repository. You will see several folders, one called "common" and one more for each of the available plugins. Currently there is only one for Ads. 
* Copy the folder which is inside the name of the plugin. They will always start by "atp". For example, inside "ads" there is one called "atpads". 
* Paste the whole folder into *_CONSTRUCT_2_INSTALLATION_FOLDER_*\exporters\html5\plugins.
* Copy the content of the "common" folder. 
* Paste it inside the "atp" folder you added in *_CONSTRUCT_2_INSTALLATION_FOLDER_*\exporters\html5\plugins.

And that's all! You can open Contruct2 and start using them! 

## Adding the plugins in a project after exportation 

### Ads 

After the cordova exportation and the creation of the project, one of the following plugins are needed, depending on the Ad Service you want to use. Copy and paste the command for installing the plugin in your project. 

#### Admob 

* Android
```
	cordova plugin add com.ludei.ads.android.admob;
```
* iOS
```
	cordova plugin add com.ludei.ads.ios.admob; 
```
#### Mopub
* Android
```
	cordova plugin add com.ludei.ads.android.mopub;
```
* iOS
```
	cordova plugin add com.ludei.ads.ios.mopub;
```
In addition, there are optional MoPub adapters for iOS and Android.

* Android
```
	cordova plugin add con.ludei.ads.android.adcolony;
	cordova plugin add con.ludei.ads.android.admob;
	cordova plugin add con.ludei.ads.android.charboost;
	cordova plugin add con.ludei.ads.android.greystripe;
	cordova plugin add con.ludei.ads.android.inmobi;
	cordova plugin add con.ludei.ads.android.millennial;
```
* iOS 
```
	cordova plugin add com.ludei.ads.ios.mopub.charboost;
	cordova plugin add com.ludei.ads.ios.mopub.admob;
	cordova plugin add com.ludei.ads.ios.mopub.millennial;
```
## Important information to take into account 

You can use this plugins in the Webview+ for cordova (ios and android), but not yet at the cloud or in Canvas+. 

## Need help?

Visit [our help center](https://support.ludei.com).

## Changelog

### Mar 11, 2015
* Demo for Ads added. 

### Mar 06, 2015
* Atomic Plugins for Ads added. 
* Supported Ad Services: Mopub and Admob. 

