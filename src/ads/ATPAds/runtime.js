/**
 * Object holder for the plugin
 */
cr.plugins_.ATPAds = function(runtime) {
    this.runtime = runtime;
};

/**
 * C2 plugin
 */
(function() {
        var showBanner = false;
        var bannerReady = false;
        var interstitialReady = false;    
        var pluginProto = cr.plugins_.ATPAds.prototype;
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
                this.isShowingBanner = false;
                this.isShowingInterstitial = false;

                this.androidBannerId = this.properties[0];
                
                switch (this.properties[1]) {
                    case 0:     this.androidBannerSize = "SMART"; break;
                    case 1:     this.androidBannerSize = "BANNER"; break;
                    case 2:     this.androidBannerSize = "MEDIUM_REC"; break;
                    case 3:     this.androidBannerSize = "LEADERBOARD"; break;
                }
                    
                this.androidInterstitialId = this.properties[2];
                
                this.iosBannerId = this.properties[3];

                switch (this.properties[4]) {
                    case 0:     this.iosBannerSize = "SMART"; break;
                    case 1:     this.iosBannerSize = "BANNER"; break;
                    case 2:     this.iosBannerSize = "MEDIUM_REC"; break;
                    case 3:     this.iosBannerSize = "LEADERBOARD"; break;
                }

                this.iosInterstitialId = this.properties[5];
                
                if (this.runtime.isAndroid)
                {
                    this.bannerAdunit = this.androidBannerId;
                    this.bannerSize = this.androidBannerSize;
                    this.interstitialAdunit = this.androidInterstitialId;
                }
                else if (this.runtime.isiOS)
                {
                    this.bannerAdunit = this.iosBannerId;
                    this.bannerSize = this.iosBannerSize;
                    this.interstitialAdunit = this.iosInterstitialId;
                }
                else
                {
                    // unsupported platform
                    this.bannerAdunit = "";
                    this.interstitialAdunit = "";
                }

                this.banner = Cocoon.Ad.createBanner(this.bannerAdunit, this.bannerSize);

                this.interstitial = Cocoon.Ad.createInterstitial(this.interstitialAdunit);

                self = this;
                
                // banner events
                this.banner.on("show", function() {
                    self.isShowingBanner = true;
                    self.runtime.trigger(cr.plugins_.ATPAds.prototype.cnds.onBannerShown, self);
                });

                this.banner.on("load", function() {
                    bannerReady = true;
                    self.runtime.trigger(cr.plugins_.ATPAds.prototype.cnds.onBannerLoaded, self);
                });

                this.banner.on("hide", function() {
                    self.isShowingBanner = false;
                    self.runtime.trigger(cr.plugins_.ATPAds.prototype.cnds.onBannerHidden, self);
                });

                this.banner.on("click", function() {
                    self.runtime.trigger(cr.plugins_.ATPAds.prototype.cnds.onBannerClicked, self);
                });

                this.banner.on("fail", function() {
                    bannerReady = false;
                    self.runtime.trigger(cr.plugins_.ATPAds.prototype.cnds.onBannerFailed, self);
                });

                this.banner.on("dismiss", function() {
                    self.runtime.trigger(cr.plugins_.ATPAds.prototype.cnds.onBannerDismissed, self);
                });

                // interstitial events
                this.interstitial.on("show", function() {
                    self.isShowingInterstitial = true;     
                    self.runtime.trigger(cr.plugins_.ATPAds.prototype.cnds.onInterstitialShown, self);
                });
                this.interstitial.on("load", function() {
                    interstitialReady = true;                      
                    self.runtime.trigger(cr.plugins_.ATPAds.prototype.cnds.onInterstitialLoaded, self);
                });

                this.interstitial.on("click", function() {
                    self.runtime.trigger(cr.plugins_.ATPAds.prototype.cnds.onInterstitialClicked, self);
                });

                this.interstitial.on("fail", function() {
                    interstitialReady = false;   
                    self.runtime.trigger(cr.plugins_.ATPAds.prototype.cnds.onInterstitialFailed, self);
                });                

                this.interstitial.on("dismiss", function() {
                    self.isShowingInterstitial = false;
                    interstitialReady = false;
                    self.runtime.trigger(cr.plugins_.ATPAds.prototype.cnds.onInterstitialDismissed, self);
                });
        };

        function Cnds() {};

        // banner conditions
        Cnds.prototype.onBannerShown = function() {
            return true;
        };
        Cnds.prototype.onBannerHidden = function() {
            return true;
        };
        Cnds.prototype.onBannerLoaded = function() {
            return true;
        };
        Cnds.prototype.onBannerClicked = function() {
            return true;
        };
        Cnds.prototype.onBannerFailed = function() {
             return true;
        };                
        Cnds.prototype.onBannerDismissed = function() {
            return true;
        };

        // interstitial contditions
        Cnds.prototype.onInterstitialShown = function() {
            return true;
        };
        Cnds.prototype.onInterstitialLoaded = function() {
            return true;
        };
        Cnds.prototype.onInterstitialClicked = function() {
            return true;
        };
        Cnds.prototype.onInterstitialFailed = function() {
             return true;
        };           
        Cnds.prototype.onInterstitialDismissed = function() {
            return true;
        }

        pluginProto.cnds = new Cnds();
        /**
         * Plugin actions
         */
        function Acts() {};

        // banner actions
        Acts.prototype.ShowBanner = function() {
            if(bannerReady) {
                showBanner = true;
                self.banner.show();
            }    
            else 
                self.banner.load();
        };
        Acts.prototype.HideBanner = function() {
            if(self.isShowingBanner){
                showBanner = false;
                self.banner.hide();
            }    
        };        
        Acts.prototype.LoadBanner = function() {
            self.banner.load();
        };
        Acts.prototype.SetLayout = function(layout) {
            self.banner.setLayout(layout);
        };
        Acts.prototype.SetPosition = function(x,y) {
            self.banner.setPosition(x,y);
        };

        // interstitial actions
        Acts.prototype.ShowInterstitial = function() {
            if(interstitialReady)
                self.interstitial.show(); 
            else 
                self.interstitial.load();
        };
        Acts.prototype.LoadInterstitial = function() {
            self.interstitial.load();
        };

        pluginProto.acts = new Acts();

}());