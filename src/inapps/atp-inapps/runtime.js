/**
 * Object holder for the plugin
 */
cr.plugins_.ATPInApps = function(runtime) {
    this.runtime = runtime;
};

/**
 * C2 plugin
 */
(function() {
       
        var PurchaseTransactionId = "";
        var PurchaseProductId = "";
        var PurchaseQuantity = "";
        var PurchaseDate = "";

        var products_list = [];

        var pluginProto = cr.plugins_.ATPInApps.prototype;
        pluginProto.Type = function(plugin) {
            this.plugin = plugin;
            this.runtime = plugin.runtime;
        };
        var typeProto = pluginProto.Type.prototype;
        typeProto.onCreate = function() {};

        /**
         * C2 specific behaviour
         */
        pluginProto.Instance = function(type) {
            this.type = type;
            this.runtime = type.runtime;
        };
        var instanceProto = pluginProto.Instance.prototype;
        var self;
        
        instanceProto.onCreate = function() {
            
            this.storeService = Cocoon.InApp;
           
            this.triggerProduct = "";

            self = this;

            if(this.storeService.canPurchase()) {

                this.storeService.on("purchase", {
                    start: function(productId) {
                        self.triggerProduct = productId;
                        console.log("On product purchase started: " + productId);
                        self.runtime.trigger(cr.plugins_.ATPInApps.prototype.cnds.onPurchaseStart, self);                     
                    },
                    error: function(productId, error) {
                        self.triggerProduct = productId;
                        console.log("On product purchase failed " + productId + ": " + JSON.stringify(error));
                        self.runtime.trigger(cr.plugins_.ATPInApps.prototype.cnds.onPurchaseFail, self);  
                    },
                    complete: function(purchase) {
                        self.triggerProduct = productId;
                        PurchaseTransactionId = purchase.transactionId;
                        PurchaseProductId = purchase.productId;
                        PurchaseQuantity = purchase.quantity;
                        PurchaseDate = purchase.purchaseDate;
                        console.log("On product purchase completed: " + JSON.stringify(purchase));
                        self.runtime.trigger(cr.plugins_.ATPInApps.prototype.cnds.onPurchaseComplete, self);
                    }
                });
                this.storeService.initialize({
                    autofinish: true
                }, 
                function(error){
                    if(error){
                        console.log("Error at service initialization: " + JSON.stringify(error));
                    }
                });
            }
        };

        /**
         * Plugin conditions
         */
        function Cnds() {};

        Cnds.prototype.canPurchase = function() {
            return this.storeService.canPurchase();
        };
        Cnds.prototype.onPurchaseStart = function(productId) {
            return this.triggerProduct === productId;
        };
        Cnds.prototype.onPurchaseComplete = function(productId) {
            return this.triggerProduct === productId;
        };
        Cnds.prototype.onPurchaseFail = function(productId) {
            return this.triggerProduct === productId;
        };               
        Cnds.prototype.isPurchased = function(productId) {
            return this.storeService.isPurchased(productId);
        };
        Cnds.prototype.onProductsFetchComplete = function() {
            return true;
        };
        Cnds.prototype.onProductsFetchFail = function() {
            return true;
        };
        Cnds.prototype.onConsumeFail = function() {
            return true;
        };
        Cnds.prototype.onConsumeComplete = function() {
             return true;
        };           
        Cnds.prototype.onRestorePurchasesComplete = function() {
            return true;
        };
        Cnds.prototype.onRestorePurchasesFail = function() {
            return true;
        };

        pluginProto.cnds = new Cnds();
        
        /**
         * Plugin actions
         */
        function Acts() {};

        Acts.prototype.GetProducts = function() {
            if (this.storeService.canPurchase()){
                products_list = this.storeService.getProducts();
            } 
        };
        Acts.prototype.Consume = function(productId, quantity) {
            this.storeService.consume(productId, quantity, function(consumed, error) {
                if(error){
                    console.log("On product consume failed: " + JSON.stringify(error));
                    self.runtime.trigger(cr.plugins_.ATPInApps.prototype.cnds.onConsumeFail, self);
                }
                else{
                    console.log("On product consume completed: " + consumed + "unit(s) consumed");
                    self.runtime.trigger(cr.plugins_.ATPInApps.prototype.cnds.onConsumeComplete, self);
                }       
            });      
        };        
        Acts.prototype.Purchase = function(productId, quantity) {
            this.storeService.purchase(productId, quantity);
        };
        Acts.prototype.FetchProducts = function(productIds) {
            this.storeService.fetchProducts(productIds.split(","), function(error){   
                if(error){
                    console.log("On fetch products failed: "  + JSON.stringify(error));
                    self.runtime.trigger(cr.plugins_.ATPInApps.prototype.cnds.onProductsFetchFail, self);  
                }
                else{
                    for (var i = productIds.length - 1; i >= 0; i--) {
                        console.log("Product fetched: " + productIds[i].productId);
                    };
                    console.log("On fetch products completed");
                    self.runtime.trigger(cr.plugins_.ATPInApps.prototype.cnds.onProductsFetchComplete, self);
                }     
            });
        };
        Acts.prototype.RestorePurchases = function() {
            this.storeService.restorePurchases(function(error) {
                if (error){
                    console.log("On restore purchases failed: " + JSON.stringify(error));
                    self.runtime.trigger(cr.plugins_.ATPInApps.prototype.cnds.onRestorePurchasesFail, self);  
                } else {
                    console.log("On restore purchases completed");
                    self.runtime.trigger(cr.plugins_.ATPInApps.prototype.cnds.onRestorePurchasesComplete, self);  
                }
            });
        };

        pluginProto.acts = new Acts();

        /**
         * Expressions
         */
        function Exps() {};

        // purchase information
        Exps.prototype.PurchaseTransactionId = function(ret) {
            ret.set_string(PurchaseTransactionId);
        }; 
        Exps.prototype.PurchaseProductId = function(ret) {
            ret.set_string(PurchaseProductId);
        }; 
        Exps.prototype.PurchaseQuantity = function(ret) {
            ret.set_int(PurchaseQuantity);
        }; 
        Exps.prototype.PurchaseDate = function(ret) {
            ret.set_string(PurchaseDate);
        }; 

        // products information
        Exps.prototype.NumberOfProducts = function(ret) {
            ret.set_int(products_list.length);
        }; 
        Exps.prototype.ProductDescription = function(ret, index) {
            index = Math.floor(index);
            if (index < 0 || index >= products_list.length) {
                ret.set_string("");
                return;
            }
            ret.set_string(products_list[index].description);
        }; 
        Exps.prototype.ProductLocalizedPrice = function(ret, index) {
            index = Math.floor(index);
            if (index < 0 || index >= products_list.length) {
                ret.set_string("");
                return;
            }
            ret.set_string(products_list[index].localizedPrice);
        }; 
        Exps.prototype.ProductPrice = function(ret, index) {
            index = Math.floor(index);
            if (index < 0 || index >= products_list.length) {
                ret.set_string("");
                return;
            }
            ret.set_string(products_list[index].price);
        }; 
        Exps.prototype.ProductId = function(ret, index) {
            index = Math.floor(index);
            if (index < 0 || index >= products_list.length) {
                ret.set_string("");
                return;
            }
            ret.set_string(products_list[index].productId);
        }; 
        Exps.prototype.ProductTitle = function(ret, index) {
            index = Math.floor(index);
            if (index < 0 || index >= products_list.length) {
                ret.set_string("");
                return;
            }
            ret.set_string(products_list[index].title);
        }; 
        Exps.prototype.ProductStock = function(ret, productId) {
            ret.set_int(this.storeService.stockOfProduct(productId));0
        };  
        pluginProto.exps = new Exps();
}());