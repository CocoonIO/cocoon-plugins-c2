function GetPluginSettings() {
    return {
        "name": "ATP Share",
        "id": "ATPShare",
        "version": "1.0",
        "description": "Atomic Plugins Share",
        "author": "Ludei",
        "help url": "http://www.ludei.com",
        "category": "Platform specific",
        "type": "object", // not in layout
        "rotatable": false,
        "flags": pf_singleglobal
    };
};

/**
 * Conditions
 */

AddCondition(0, cf_trigger, "On share complete", "Native share", "On share complete", "Triggered when native share is completed.", "onShareComplete");

AddCondition(1, cf_trigger, "On share fail", "Native share", "On share fail", "Triggered when native share fails.", "onShareFail");

/**
 * Actions
 */

AddStringParam("Text", "The text content that will be shared");
AddStringParam("Image", "The image that will be shared. It can be a URL or a base64 image");
AddAction(0, af_none, "Native share", "Share", "Native share", "Share", "Share");

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