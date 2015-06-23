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
AddCondition(1, cf_trigger, "On keyboard input cancel", "Cocoon Canvas+", "On keyboard input cancel", "Triggered after opening a text input dialog which is then cancelled.", "onKeyboardCancel");

AddCondition(2, cf_trigger, "On keyboard input success", "Cocoon Canvas+", "On keyboard input success", "Triggered after opening a text input dialog which is then OK'd.", "onKeyboardSuccess");

// Confirm dialog
AddCondition(3, cf_trigger, "On confirm cancel", "Cocoon Canvas+", "On confirm cancel", "Triggered after opening a text input dialog which is then cancelled.", "onConfirmCancel");

AddCondition(4, cf_trigger, "On confirm success", "Cocoon Canvas+", "On confirm success", "Triggered after opening a text input dialog which is then OK'd.", "onConfirmSuccess");

AddCondition(5, cf_trigger, "On capture screen async fail", "Cocoon Canvas+", "On capture screen async fail", "Triggered if the capture of the screen fails.", "onCaptureScreenAsyncFail");

AddCondition(6, cf_trigger, "On capture screen async success", "Cocoon Canvas+", "On capture screen async success", "Triggered if the capture of the screen completes successfully.", "onCaptureScreenAsyncSuccess");

AddCondition(7, cf_trigger, "On capture screen sync and share fail", "Cocoon Canvas+", "On capture screen sync and share fail", "Triggered if the capture of the screen sync and sharing process fails.", "onShareSyncFail");

AddCondition(8, cf_trigger, "On capture screen sync and share success", "Cocoon Canvas+", "On capture screen sync and share success", "Triggered if the capture of the screen sync and sharing process completes successfully.", "onShareSyncComplete");

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
AddAction(0, af_none, "Prompt text input", "Cocoon Canvas+", "Prompt text input (title <i>{0}</i>, message <i>{1}</i>, initial text <i>{2}</i>, type <i>{3}</i>, cancel text <i>{4}</i>, OK text <i>{5}</i>)", "Open a dialog where the user can enter some text via the on-screen keyboard.", "promptKeyboard");

// Confirm
AddStringParam("Title", "The title to appear on the dialog.");
AddStringParam("Message", "A message to appear on the dialog.");
AddStringParam("Cancel text", "The 'Cancel' button text.", "\"Cancel\"");
AddStringParam("OK text", "The 'OK' button text.", "\"OK\"");
AddAction(1, af_none, "Confirm dialog", "Cocoon Canvas+", "Prompt text input (title <i>{0}</i>, message <i>{1}</i>, cancel text <i>{2}</i>, OK text <i>{3}</i>)", "Pops up a message dialog so the user can decide between a yes or no like confirmation.", "confirmDialog");

// App and utils
AddStringParam("Url", "The URL to be opened by a system service.");
AddAction(2, af_none, "Open URL", "Cocoon Canvas+", "Opens a given URL <i>{0}</i> using a system service that is able to open it", "Opens a given URL using a system service that is able to open it.", "openURL");

AddAction(3, af_none, "Exit app", "Cocoon Canvas+", "Forces the app to finish", "Forces the app to finish.", "exitApp");

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
AddComboParamOption("Yes");
AddComboParamOption("No");
AddComboParam("Save to gallery", "Specifies if the capture image should be stored in the device image gallery or not.");
AddAction(4, af_none, "Capture screen", "Cocoon Canvas+", "Captures a image of the screen. It can capture everything, only the cocoon surface or only the system views.", "Captures a image of the screen synchronously and saves it to a file. Sync mode allows to capture the screen in the middle of a frame rendering.", "captureScreenSync");

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
AddComboParamOption("Yes");
AddComboParamOption("No");
AddComboParam("Save to gallery", "Specifies if the capture image should be stored in the device image gallery or not.");
AddAction(5, af_none, "Capture screen async", "Cocoon Canvas+", "Captures a image of the screen. It can capture everything, only the cocoon surface or only the system views.", "Captures a image of the screen asynchronously and saves it to a file. Async mode captures a final frame as soon as possible.", "captureScreenAsync");

// Capture screen and share (these actions require the ATP Share plugin for Cordova)

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
AddComboParamOption("Yes");
AddComboParamOption("No");
AddComboParam("Save to gallery", "Specifies if the capture image should be stored in the device image gallery or not.");
AddStringParam("Text", "The text content that will be shared");
AddAction(6, af_none, "Capture screen sync and share", "Cocoon Canvas+", "Captures a image of the screen. It can capture everything, only the cocoon surface or only the system views.", "Captures a image of the screen synchronously and saves it to a file. Sync mode allows to capture the screen in the middle of a frame rendering and then shares the image. REQUIRED: ATP Share plugin installation at Cocoon.io.", "captureScreenSyncShare");

/**
 * Expressions
 */

// Keyboard 
AddExpression(0, ef_return_string, "", "Keyboard input", "InputText", "In 'On keyboard input success', get the text entered.");

AddExpression(1, ef_return_string, "", "Capture image sync", "CaptureScreenSync", "After 'Capture screen', get the image url");

AddExpression(2, ef_return_string, "", "Capture image async", "CaptureScreenAsync", "In 'On capture screen async success', get the image url");

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
