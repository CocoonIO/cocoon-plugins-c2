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

AddCondition(0, cf_none, "Is store available", "In-App Purchases", "Is store available", "Test if the store is available on the current platform.", "canPurchase");

AddStringParam("Product ID", "A string identifying the product.");
AddCondition(1, cf_trigger, "On purchase started", "In-App Purchases", "On <i>{0}</i> purchase started", "Triggered when the user begins a product purchase.", "onPurchaseStart");

AddStringParam("Product ID", "A string identifying the product.");
AddCondition(2, cf_trigger, "On purchase completed", "In-App Purchases", "On <i>{0}</i> purchase completed", "Triggered when a purchase successfully completes.", "onPurchaseComplete");

AddStringParam("Product ID", "A string identifying the product.");
AddCondition(3, cf_trigger, "On purchase failed", "In-App Purchases", "On <i>{0}</i> purchase failed", "Triggered when a purchase fails.", "onPurchaseFail");

AddStringParam("Product ID", "A string identifying the product.");
AddCondition(4, 0, "Is purchased","In-App Purchases", "Is product <i>{0}</i> purchased", "Test if a particular product is purchased.", "isPurchased");

AddCondition(7, cf_trigger, "On products fetch completed", "In-App Purchases", "On products fetch completed", "Triggered when all the products have been downloaded.", "onProductsFetchComplete");

AddCondition(8, cf_trigger, "On products fetch failed", "In-App Purchases", "On products fetch failed", "Triggered when the fetch product function fails. ", "onProductsFetchFail");

AddCondition(9, cf_trigger, "On consume purchase failed", "In-App Purchases", "On consume purchase failed", "Triggered when the consumption event has failed.", "onConsumeFail");

AddCondition(10, cf_trigger, "On consume purchase completed", "In-App Purchases", "On consume purchase completed", "Triggered when the consumption event is completed.", "onConsumeComplete");

AddCondition(11, cf_trigger, "On restore purchases completed", "In-app purchase", "On restore purchases completed", "Called when the purchase operation is completed", "onRestorePurchasesComplete");

AddCondition(12, cf_trigger, "On restore purchases failed", "In-app purchase", "On restore purchases failed", "Called if the purchase operation has failed", "onRestorePurchasesFail");

/**
 * Actions
 */

AddAction(0, af_none, "Update products list", "In-App Purchases", "Get products", "Returns all the locally cached InApp products.", "GetProducts");

AddStringParam("Product ID", "A string identifying the product.");
AddNumberParam("Quantity", "The quantity of product you'd want to consume.");
AddAction(1, af_none, "Consume product", "In-App Purchases", "Consume product", "Consumes a certain quantity <b>{1}</b> of an already purchased product <b>{0}</b>.", "Consume");

AddStringParam("Product ID", "A string identifying the product.");
AddNumberParam("Quantity", "The quantity of product you'd want to purchase.");
AddAction(2, af_none, "Purchase product", "In-App Purchases", "Purchase product <b>{0}</b>", "Purchases a product by its ID.", "Purchase");

AddStringParam("Product list", 'The product list followed by commas of products IDs that you want to fetch from store server, example: "golden.coins,magical.sword,health.potion"');
AddAction(3, af_none, "Fetch products from store", "In-App Purchases", "Fetch products from store: <i>{0}</i>", "Fetches the selected products from store", "FetchProducts");

AddAction(4, af_none, "Restore purchases", "In-App Purchases", "Restore purchases", "Restores all purchases from the platform's market.", "RestorePurchases");

/**
 * Expressions
 */ 

// products information
AddExpression(0, ef_return_number, "", "In-App Purchases", "NumberOfProducts", "Returns the number of products available for purchase.");

AddNumberParam("Index", "Zero-based index of product to get.");
AddExpression(1, ef_return_string, "", "In-App Purchases", "ProductDescription", "Returs the description of the Nth product.");

AddNumberParam("Index", "Zero-based index of product to get.");
AddExpression(2, ef_return_string, "", "In-App Purchases", "ProductLocalizedPrice", "Returns the price of the Nth product in a localized format.");

AddNumberParam("Index", "Zero-based index of product to get.");
AddExpression(3, ef_return_string, "", "In-App Purchases", "ProductPrice", "Returns the price of the Nth product.");

AddNumberParam("Index", "Zero-based index of product to get.");
AddExpression(4, ef_return_string, "", "In-App Purchases", "ProductId", "Returns the ID of the Nth product.");

AddNumberParam("Index", "Zero-based index of product to get.");
AddExpression(5, ef_return_string, "", "In-App Purchases", "ProductTitle", "Returns the title of the Nth product.");

AddStringParam("Product ID", "A string identifying the product.");
AddExpression(6, ef_return_string, "", "In-App Purchases", "ProductStock", "Returns the stock of the given Product ID.");

// purchases information
AddExpression(7, ef_return_string, "", "In-App Purchases", "PurchaseProductId", "Returns the product id of the last purchased item.");

AddExpression(8, ef_return_string, "", "In-App Purchases", "PurchaseTransactionId", "Returns the transaction id of the last purchased item.");

AddExpression(9, ef_return_number, "", "In-App Purchases", "PurchaseQuantity", "Returns the quantity of purchased product id of the last purchased item.");

AddExpression(10, ef_return_number, "", "In-App Purchases", "PurchaseDate", "Returns the date of the last purchased item.");

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