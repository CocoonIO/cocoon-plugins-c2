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
            this.storeServiceAvailable = (this.runtime.isCocoonJs && typeof Cocoon.Store.nativeAvailable !== "undefined");
            this.onConsumePurchaseFailedTransactionId = "";
            this.onConsumePurchaseCompleted = "";
            this.onPurchaseCompleteInfo = "";
               
                self = this;
                
                // events
               
        };

        /**
         * Plugin conditions
         */
        function Cnds() {};

        Cnds.prototype.canPurchase = function() {
            return this.storeService.canPurchase();
        };
        Cnds.prototype.onPurchaseStart = function() {
            return true;
        };
        Cnds.prototype.onPurchaseComplete = function() {
            return true;
        };
        Cnds.prototype.onPurchaseFail = function() {
            return true;
        };
        Cnds.prototype.onBannerFailed = function() {
             return true;
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
        Acts.prototype.Consume = function() {
         
        };        
        Acts.prototype.Purchase = function(productId, quantity) {
            this.storeService.purchase(productId, quantity, function(error) {
                if(error){
                    console.log("On product purchase failed: " + error);
                    self.runtime.trigger(cr.plugins_.ATPInApps.prototype.cnds.onPurchaseFail, self);  
                }
                else {
                    console.log("On product purchase completed");
                    self.runtime.trigger(cr.plugins_.ATPInApps.prototype.cnds.onPurchaseComplete, self);  
                }
            });
        };
        Acts.prototype.FetchProducts = function(productIds) {
         this.storeService.fetchProducts(products.split(","), funtion(error){   

            if(error){
                   console.log("On fetch products failed: " + error);

                   //MORE
              }
              else{
                   console.log(JSON.stringify(products));
                   //MORE
              }     
        });

        };
        Acts.prototype.RestorePurchases = function() {
            this.storeService.restorePurchases(function(error) {
                if (error){
                    console.log("On restore purchases failed: " + error);
                    self.runtime.trigger(cr.plugins_.ATPInApps.prototype.cnds.onRestorePurchasesFail, self);  
                } else {
                    console.log("On restore purchases completed");
                    self.runtime.trigger(cr.plugins_.ATPInApps.prototype.cnds.onRestorePurchasesComplete, self);  
                }
            });
        };
        Acts.prototype.FinishPurchase = function() {
          
        };

        pluginProto.acts = new Acts();

}());