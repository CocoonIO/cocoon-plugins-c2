function GetPluginSettings() {
    return {
        "name": "ATP InApps",
        "id": "ATPInApps",
        "version": "1.0",
        "description": "Atomic Plugins for In-App Purchases",
        "author": "Ludei",
        "help url": "http://www.ludei.com",
        "category": "Platform specific",
        "type": "object", // not in layout
        "rotatable": false,
        "flags": pf_singleglobal,
        "dependency": "cocoon.js;cocoon_inapps.js"
    };
};

/**
 * Conditions
 */

AddCondition(0, 0, "Is store available", "In-app purchase", "Is store available", "Test if the store is available on the current platform.", "IsStoreAvailable");

AddStringParam("Product ID", "A string identifying the product.");
AddCondition(1, cf_trigger, "On purchase started", "In-app purchase", "On <i>{0}</i> purchase started", "Triggered when the user begins a product purchase.", "OnPurchaseStart");

AddStringParam("Product ID", "A string identifying the product.");
AddCondition(2, cf_trigger, "On purchase completed", "In-app purchase", "On <i>{0}</i> purchase completed", "Triggered when a purchase successfully completes.", "OnPurchaseComplete");

AddStringParam("Product ID", "A string identifying the product.");
AddCondition(3, cf_trigger, "On purchase failed", "In-app purchase", "On <i>{0}</i> purchase failed", "Triggered when a purchase fails.", "OnPurchaseFail");

AddStringParam("Product ID", "A string identifying the product.");
AddCondition(4, 0, "Is product purchased", "In-app purchase", "Is product <i>{0}</i> purchased", "Test if a particular product is purchased.", "IsProductPurchased");

AddCondition(5, cf_trigger, "On input cancelled", "Keyboard input", "On keyboard input cancelled", "Triggered after opening a text input dialog which is then cancelled.", "OnKeyboardCancelled");

AddCondition(6, cf_trigger, "On input OK", "Keyboard input", "On keyboard input OK", "Triggered after opening a text input dialog which is then OK'd.", "OnKeyboardOK");

AddCondition(7, cf_trigger, "On products fetch completed", "In-app purchase", "On products fetch completed", "Triggered when all the products have been downloaded.", "onProductsFetchCompleted");

AddCondition(8, cf_trigger, "On products fetch failed", "In-app purchase", "On products fetch failed", "Triggered when the fetch product function fails. ", "onProductsFetchFailed");

AddCondition(9, cf_trigger, "On products fetch started", "In-app purchase", "On products fetch started", "Triggered when the download of products starts.", "onProductsFetchStarted");

AddCondition(10, cf_trigger, "On consume purchase failed", "In-app purchase", "On consume purchase failed", "Triggered when the consumption event has failed.", "onConsumePurchaseFailed");

/**
 * Actions
 */

// Banners

// Layout 
AddComboParamOption("TOP_CENTER");
AddComboParamOption("BOTTOM_CENTER");
AddComboParamOption("CUSTOM");
AddComboParam("Layout", "Choose where the banner ad will appear.");
AddAction(4, 0, "Set banner layout", "Banners", "Set banner layout", "Set banner layout. If CUSTOM, 'set banner position' can be called afterwards.", "SetLayout");

// Position 
AddNumberParam("x", "The top lef x coordinate of the banner.");
AddNumberParam("y", "The top lef y coordinate of the banner.");
AddAction(5, 0, "Set banner position", "Banners", "Set banner position", "Set banner position given the x{0} and y{1} coordinates. It requires the CUSTOM layout (see 'set banner layout')", "SetPosition");

// Show
AddAction(6, 0, "Show banner", "Banners", "Show the banner ad", "Show a banner ad on the screen while the game is running.", "ShowBanner");

// Hide
AddAction(7, 0, "Hide banner", "Banners", "Hide the banner ad", "Hide any currently showing banner ad.", "HideBanner");

// Load 
AddAction(8, 0, "Load banner", "Banners", "Load a banner ad", "Start loading a banner ad in the background.", "LoadBanner");

// Interstitials

AddStringParam("Transaction Id", "The transaction id of the purchase you'd want to consume.");
AddStringParam("Product id", "The product id of the purchase.");
AddAction(21, 0, "Consume Purchase", "In-app purchase", "Consume Purchase", "Consumes a purchase", "ConsumePurchase");

/**
 * Expressions
 */ 

AddExpression(1, ef_return_number, "", "In-app purchase", "ProductCount", "Return the number of products available for purchase.");

AddNumberParam("Index", "Zero-based index of product to get.");
AddExpression(2, ef_return_string, "", "In-app purchase", "ProductDescription", "Return the description of the Nth product.");

AddNumberParam("Index", "Zero-based index of product to get.");
AddExpression(3, ef_return_string, "", "In-app purchase", "ProductLocalizedPrice", "Return the price of the Nth product in a localized format.");

AddNumberParam("Index", "Zero-based index of product to get.");
AddExpression(4, ef_return_string, "", "In-app purchase", "ProductPrice", "Return the price of the Nth product.");

AddNumberParam("Index", "Zero-based index of product to get.");
AddExpression(5, ef_return_string, "", "In-app purchase", "ProductAlias", "Return the alias of the Nth product.");

AddNumberParam("Index", "Zero-based index of product to get.");
AddExpression(6, ef_return_string, "", "In-app purchase", "ProductID", "Return the ID of the Nth product.");

AddNumberParam("Index", "Zero-based index of product to get.");
AddExpression(7, ef_return_string, "", "In-app purchase", "ProductTitle", "Return the title of the Nth product.");

AddExpression(9, ef_return_string, "", "In-app purchase", "PurchaseProductId", "Returns the product id of the last purchased item.");
AddExpression(10, ef_return_string, "", "In-app purchase", "PurchaseTransactionId", "Returns the transaction id of the last purchased item.");


ACESDone();

/**
 * Plugin properties
 */

var property_list = [
    new cr.Property(ept_section, "Android", "", "Ad unit IDs for Android."),
    new cr.Property(ept_text,   "Banner ID (Android)",  "", "Ad unit ID from admob or mopub for the banner ad."),
    new cr.Property(ept_combo,  "Banner size (Android)",    "SMART",    "The size of the banner ad to display", "SMART|BANNER|MEDIUM_RECT|LEADERBOARD"),
    new cr.Property(ept_text,   "Interstitial ID (Android)", "",        "Ad unit ID from admob or mopub for the interstitials."),
    
    new cr.Property(ept_section, "iOS", "", "Ad unit IDs for iOS."),
    new cr.Property(ept_text,   "Banner ID (iOS)",  "", "Ad unit ID admob or mopub for the banner ad."),
    new cr.Property(ept_combo,  "Banner size (iOS)",    "SMART",    "The size of the banner ad to display", "SMART|BANNER|MEDIUM_RECT|LEADERBOARD"),
    new cr.Property(ept_text,   "Interstitial ID (iOS)",    "", "Ad unit ID admob or mopub for the interstitials.")
];

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