function GetPluginSettings() {
    return {
        "name": "Cocoon Canvasplus",
        "id": "Cocoon_Canvasplus",
        "version": "1.0",
        "description": "Access to Canvas+ basic functionalities",
        "author": "Ludei",
        "help url": "http://cocoon.io",
        "category": "Platform specific",
        "type": "object", // not in layout
        "rotatable": false,
        "flags": pf_singleglobal
    };
};

/**
 * Conditions
 */

AddCondition(0, cf_none, "Is Canvas+", "Cocoon Canvas+", "Is Canvas+", "True if currently running on Canvas+ (from Cocoon.io platform).", "isCanvasPlus");

// Keyboard
AddCondition(1, cf_trigger, "On keyboard input cancel", "Dialog", "On keyboard input cancel", "Triggered after opening a text input dialog which is then cancelled.", "onKeyboardCancel");

AddCondition(2, cf_trigger, "On keyboard input success", "Dialog", "On keyboard input success", "Triggered after opening a text input dialog which is then OK'd.", "onKeyboardSuccess");

// Confirm dialog
AddCondition(3, cf_trigger, "On confirm cancel", "Dialog", "On confirm cancel", "Triggered after opening a text input dialog which is then cancelled.", "onConfirmCancel");

AddCondition(4, cf_trigger, "On confirm success", "Dialog", "On confirm success", "Triggered after opening a text input dialog which is then OK'd.", "onConfirmSuccess");

AddCondition(5, cf_trigger, "On capture screen async fail", "Utils", "On capture screen async fail", "Triggered if the capture of the screen fails.", "onCaptureScreenAsyncFail");

AddCondition(6, cf_trigger, "On capture screen async success", "Utils", "On capture screen async success", "Triggered if the capture of the screen completes successfully.", "onCaptureScreenAsyncSuccess");

AddCondition(7, cf_trigger, "On capture screen sync and share fail", "Share", "On capture screen sync and share fail", "Triggered if the capture of the screen sync and sharing process fails.", "onShareSyncFail");

AddCondition(8, cf_trigger, "On capture screen sync and share success", "Share", "On capture screen sync and share success", "Triggered if the capture of the screen sync and sharing process completes successfully.", "onShareSyncComplete");

AddCondition(9, cf_trigger, "On webdialog close", "Webdialog", "On webdialog close", "Triggered if the user closes a webdialog", "onWebdialogUserClose");

/**
 * Actions
 */

// Keyboard 
AddStringParam("Title", "The title to appear on the dialog.");
AddStringParam("Message", "A message to appear on the dialog.");
AddStringParam("Initial text", "The initial entered text to show on the dialog.");
AddComboParamOption("Text");
AddComboParamOption("Number");
AddComboParamOption("Phone");
AddComboParamOption("Email");
AddComboParamOption("URL");
AddComboParam("Type", "The type of text input to use.");
AddStringParam("Cancel text", "The 'Cancel' button text.", "\"Cancel\"");
AddStringParam("OK text", "The 'OK' button text.", "\"OK\"");
AddAction(0, af_none, "Prompt text input", "Dialog", "Prompt text input (title <i>{0}</i>, message <i>{1}</i>, initial text <i>{2}</i>, type <i>{3}</i>, cancel text <i>{4}</i>, OK text <i>{5}</i>)", "Open a dialog where the user can enter some text via the on-screen keyboard.", "promptKeyboard");

// Confirm
AddStringParam("Title", "The title to appear on the dialog.");
AddStringParam("Message", "A message to appear on the dialog.");
AddStringParam("Cancel text", "The 'Cancel' button text.", "\"Cancel\"");
AddStringParam("OK text", "The 'OK' button text.", "\"OK\"");
AddAction(1, af_none, "Confirm dialog", "Dialog", "Prompt text input (title <i>{0}</i>, message <i>{1}</i>, cancel text <i>{2}</i>, OK text <i>{3}</i>)", "Pops up a message dialog so the user can decide between a yes or no like confirmation.", "confirmDialog");

// App and utils
AddStringParam("Url", "The URL to be opened by a system service.");
AddAction(2, af_none, "Open URL", "App", "Opens a given URL <i>{0}</i> using a system service that is able to open it", "Opens a given URL using a system service that is able to open it.", "openURL");

AddAction(3, af_none, "Exit app", "App", "Forces the app to finish", "Forces the app to finish.", "exitApp");

AddStringParam("File name", "Desired file name and format (png or jpg). If no value is passed, 'capture.png' value is used by default");
AddComboParamOption("The application storage");
AddComboParamOption("Internal Storage");
AddComboParamOption("External Storage");
AddComboParamOption("Temporary Storage");
AddComboParam("Storage type", "The storageType type");
AddComboParamOption("Captures everything");
AddComboParamOption("Only captures cocoon surface");
AddComboParamOption("Only captures system views");
AddComboParam("Capture type", "The capture type");
// AddComboParamOption("Yes");
// AddComboParamOption("No");
// AddComboParam("Save to gallery", "Specifies if the capture image should be stored in the device image gallery or not.");
AddAction(4, af_none, "Capture screen sync", "Utils", "Captures a image of the screen. It can capture everything, only the cocoon surface or only the system views.", "Captures a image of the screen synchronously and saves it to a file. Sync mode allows to capture the screen in the middle of a frame rendering.", "captureScreenSync");

AddStringParam("File name", "Desired file name and format (png or jpg). If no value is passed, 'capture.png' value is used by default");
AddComboParamOption("The application storage");
AddComboParamOption("Internal Storage");
AddComboParamOption("External Storage");
AddComboParamOption("Temporary Storage");
AddComboParam("Storage type", "The storageType type");
AddComboParamOption("Captures everything");
AddComboParamOption("Only captures cocoon surface");
AddComboParamOption("Only captures system views");
AddComboParam("Capture type", "The capture type");
// AddComboParamOption("Yes");
// AddComboParamOption("No");
// AddComboParam("Save to gallery", "Specifies if the capture image should be stored in the device image gallery or not.");
AddAction(5, af_none, "Capture screen async", "Utils", "Captures a image of the screen. It can capture everything, only the cocoon surface or only the system views.", "Captures a image of the screen asynchronously and saves it to a file. Async mode captures a final frame as soon as possible.", "captureScreenAsync");

// Capture screen and share (these action requires the ATP Share plugin for Cordova)

AddStringParam("File name", "Desired file name and format (png or jpg). If no value is passed, 'capture.png' value is used by default");
AddComboParamOption("The application storage");
AddComboParamOption("Internal Storage");
AddComboParamOption("External Storage");
AddComboParamOption("Temporary Storage");
AddComboParam("Storage type", "The storageType type");
AddComboParamOption("Captures everything");
AddComboParamOption("Only captures cocoon surface");
AddComboParamOption("Only captures system views");
AddComboParam("Capture type", "The capture type");
// AddComboParamOption("Yes");
// AddComboParamOption("No");
// AddComboParam("Save to gallery", "Specifies if the capture image should be stored in the device image gallery or not.");
AddStringParam("Text", "The text content that will be shared");
AddAction(6, af_none, "Capture screen sync and share", "Share", "Captures a image of the screen. It can capture everything, only the cocoon surface or only the system views.", "Captures a image of the screen synchronously and saves it to a file. Sync mode allows to capture the screen in the middle of a frame rendering and then shares the image. REQUIRED: ATP Share plugin installation at Cocoon.io.", "captureScreenSyncShare");

AddAction(7, af_none, "Pause app", "App", "Pauses the app", "Pauses the app.", "pauseApp");

AddAction(8, af_none, "Resume app", "App", "Resumes the app", "Resumes the app.", "resumeApp");

AddStringParam("Url", "TThe url to be opened on the Web Dialog");
AddAction(9, af_none, "Show webdialog", "Webdialog", "Shows a webdialog", "Shows a webdialog.", "showWebdialog");

AddAction(10, af_none, "Close webdialog", "Webdialog", "Closes a webdialog", "Closes a webdialog.", "closeWebdialog");

AddAction(11, af_none, "Get device info", "Device", "Gets the device Info", "Gets the device Info.", "getDeviceInfo");

/**
 * Expressions
 */

// Dialog
AddExpression(0, ef_return_string, "", "Keyboard input", "InputText", "In 'On keyboard input success', get the text entered.");

// Utils
AddExpression(1, ef_return_string, "", "Capture image sync", "CaptureScreenSync", "After 'Capture screen', get the image url");

AddExpression(2, ef_return_string, "", "Capture image async", "CaptureScreenAsync", "In 'On capture screen async success', get the image url");

// Device
AddExpression(3, ef_return_string, "", "Device OS", "DeviceOS", "The operating system name (ios, android,...) of the device.");

AddExpression(4, ef_return_string, "", "Device version", "DeviceVersion", "The operating system version (4.2.2, 5.0,...) of the device.");

AddExpression(5, ef_return_string, "", "Device dpi", "DeviceDPI", "The operating system screen density in dpi.");

AddExpression(6, ef_return_string, "", "Device brand", "DeviceBrand", "The device manufacturer (apple, samsung, lg,...).");

AddExpression(7, ef_return_string, "", "Device model", "DeviceModel", "The device model (iPhone 4S, SAMSUNG-SGH-I997, SAMSUNG-SGH-I997R,...).");

AddExpression(8, ef_return_string, "", "Device platform ID", "DevicePlarformId", "The platform Id.");

ACESDone();

/**
 * Plugin properties
 */
var property_list = [];

// Called by IDE when a new object type is to be created
function CreateIDEObjectType() {
    return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType() {
    assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function(instance) {
    return new IDEInstance(instance, this);
}

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type) {
    assert2(this instanceof arguments.callee, "Constructor called as a function");

    // Save the constructor parameters
    this.instance = instance;
    this.type = type;

    // Set the default property values from the property table
    this.properties = {};

    for (var i = 0; i < property_list.length; i++)
        this.properties[property_list[i].name] = property_list[i].initial_value;
}

// Called by the IDE after all initialization on this instance has been completed
IDEInstance.prototype.OnCreate = function() {}

// Called by the IDE after a property has been changed
IDEInstance.prototype.OnPropertyChanged = function(property_name) {}

// Called by the IDE to draw this instance in the editor
IDEInstance.prototype.Draw = function(renderer) {}

// Called by the IDE when the renderer has been released (ie. editor closed)
// All handles to renderer-created resources (fonts, textures etc) must be dropped.
// Don't worry about releasing them - the renderer will free them - just null out references.
IDEInstance.prototype.OnRendererReleased = function() {}
