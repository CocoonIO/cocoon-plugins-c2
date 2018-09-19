/**
 * Object holder for the plugin
 */
cr.plugins_.ATPAds = function (runtime) {
    this.runtime = runtime;
};

/**
 * C2 plugin
 */
(function () {
    var showBanner = false;
    var bannerReady = false;
    var interstitialReady = false;
    var rewardedReady = false;
    var reward = "";
    var pluginProto = cr.plugins_.ATPAds.prototype;
    pluginProto.Type = function (plugin) {
        this.plugin = plugin;
        this.runtime = plugin.runtime;
    };
    var typeProto = pluginProto.Type.prototype;
    typeProto.onCreate = function () { };

    /**
     * C2 specific behaviour
     */
    pluginProto.Instance = function (type) {
        this.type = type;
        this.runtime = type.runtime;
    };
    var instanceProto = pluginProto.Instance.prototype;
    var self;

    instanceProto.onCreate = function () {

        if (!(this.runtime.isAndroid || this.runtime.isiOS))
            return;
        if (typeof Cocoon == 'undefined')
            return;

        this.isShowingBanner = false;
        this.isShowingInterstitial = false;
        this.isShowingRewarded = false;

        this.androidAppId = this.properties[0];
        this.androidBannerId = this.properties[1];

        switch (this.properties[2]) {
            case 0: this.androidBannerSize = "SMART"; break;
            case 1: this.androidBannerSize = "BANNER"; break;
            case 2: this.androidBannerSize = "MEDIUM_REC"; break;
            case 3: this.androidBannerSize = "LEADERBOARD"; break;
        }

        this.androidInterstitialId = this.properties[3];
        this.androidRewardedVideoId = this.properties[4];

        switch (this.properties[5]) {
            case 0: this.androidPersonalizedAdsConsent = true; break;
            case 1: this.androidPersonalizedAdsConsent = false; break;
        }

        this.iosAppId = this.properties[6];
        this.iosBannerId = this.properties[7];

        switch (this.properties[8]) {
            case 0: this.iosBannerSize = "SMART"; break;
            case 1: this.iosBannerSize = "BANNER"; break;
            case 2: this.iosBannerSize = "MEDIUM_REC"; break;
            case 3: this.iosBannerSize = "LEADERBOARD"; break;
        }

        this.iosInterstitialId = this.properties[9];
        this.iosRewardedVideoId = this.properties[10];

        switch (this.properties[11]) {
            case 0: this.iosPersonalizedAdsConsent = true; break;
            case 1: this.iosPersonalizedAdsConsent = false; break;
        }

        if (this.runtime.isAndroid) {
            this.appId = this.androidAppId;
            this.bannerAdunit = this.androidBannerId;
            this.bannerSize = this.androidBannerSize;
            this.interstitialAdunit = this.androidInterstitialId;
            this.personalizedAdsConsent = this.androidPersonalizedAdsConsent;
            this.rewardedVideoId = this.androidRewardedVideoId;

            Cocoon.Ads.configure({
                android: {
                    appId: this.appId,
                    banner: this.bannerAdunit,
                    interstitial: this.interstitialAdunit,
                    rewardedVideo: this.rewardedVideo,
                    personalizedAdsConsent: this.personalizedAdsConsent
                }
            });
        }
        else if (this.runtime.isiOS) {
            this.appId = this.iosAppId;
            this.bannerAdunit = this.iosBannerId;
            this.bannerSize = this.iosBannerSize;
            this.interstitialAdunit = this.iosInterstitialId;
            this.personalizedAdsConsent = this.iosPersonalizedAdsConsent;
            this.rewardedVideoId = this.iosRewardedVideoId;

            Cocoon.Ads.configure({
                ios: {
                    appId: this.appId,
                    banner: this.bannerAdunit,
                    interstitial: this.interstitialAdunit,
                    rewardedVideo: this.rewardedVideo,
                    personalizedAdsConsent: this.personalizedAdsConsent
                }
            });
        }
        else {
            // unsupported platform
            this.bannerAdunit = "";
            this.interstitialAdunit = "";
        }

        this.banner = Cocoon.Ad.createBanner(this.bannerAdunit, this.bannerSize);

        this.interstitial = Cocoon.Ad.createInterstitial(this.interstitialAdunit);

        this.rewarded = Cocoon.Ad.createRewardedVideo(this.rewardedVideoId);

        self = this;

        // banner events
        this.banner.on("show", function () {
            //console.log("Banner showing MODAL CONTENT");
            self.isShowingBanner = true;
            self.runtime.trigger(cr.plugins_.ATPAds.prototype.cnds.onBannerShown, self);
        });
        this.banner.on("load", function () {
            bannerReady = true;
            self.runtime.trigger(cr.plugins_.ATPAds.prototype.cnds.onBannerLoaded, self);
        });
        this.banner.on("click", function () {
            self.runtime.trigger(cr.plugins_.ATPAds.prototype.cnds.onBannerClicked, self);
        });
        this.banner.on("fail", function () {
            bannerReady = false;
            self.runtime.trigger(cr.plugins_.ATPAds.prototype.cnds.onBannerFailed, self);
        });
        this.banner.on("dismiss", function () {
            //console.log("Banner collapsed after showing its MODAL CONTENT");
            self.isShowingBanner = false;
            self.runtime.trigger(cr.plugins_.ATPAds.prototype.cnds.onBannerDismissed, self);
        });

        // interstitial events
        this.interstitial.on("show", function () {
            self.isShowingInterstitial = true;
            self.runtime.trigger(cr.plugins_.ATPAds.prototype.cnds.onInterstitialShown, self);
        });
        this.interstitial.on("load", function () {
            interstitialReady = true;
            self.runtime.trigger(cr.plugins_.ATPAds.prototype.cnds.onInterstitialLoaded, self);
        });
        this.interstitial.on("click", function () {
            self.runtime.trigger(cr.plugins_.ATPAds.prototype.cnds.onInterstitialClicked, self);
        });
        this.interstitial.on("fail", function () {
            interstitialReady = false;
            self.runtime.trigger(cr.plugins_.ATPAds.prototype.cnds.onInterstitialFailed, self);
        });
        this.interstitial.on("dismiss", function () {
            self.isShowingInterstitial = false;
            interstitialReady = false;
            self.runtime.trigger(cr.plugins_.ATPAds.prototype.cnds.onInterstitialDismissed, self);
        });

        // rewarded events
        this.rewarded.on("show", function () {
            self.isShowingRewarded = true;
            self.runtime.trigger(cr.plugins_.ATPAds.prototype.cnds.onRewardedShown, self);
        });
        this.rewarded.on("load", function () {
            interstitialReady = true;
            self.runtime.trigger(cr.plugins_.ATPAds.prototype.cnds.onRewardedLoaded, self);
        });
        this.rewarded.on("reward", function (rewardId) {
            reward = rewardId;
            self.runtime.trigger(cr.plugins_.ATPAds.prototype.cnds.onReward, self);
        });
        this.rewarded.on("fail", function () {
            rewardedReady = false;
            self.runtime.trigger(cr.plugins_.ATPAds.prototype.cnds.onRewardedFailed, self);
        });
        this.rewarded.on("dismiss", function () {
            self.isShowingRewarded = false;
            rewardedReady = false;
            self.runtime.trigger(cr.plugins_.ATPAds.prototype.cnds.onRewardedDismissed, self);
        });
    };

    function Cnds() { };

    // banner conditions
    Cnds.prototype.onBannerShown = function () {
        return true;
    };
    Cnds.prototype.onBannerHidden = function () {
        return true;
    };
    Cnds.prototype.onBannerLoaded = function () {
        return true;
    };
    Cnds.prototype.onBannerClicked = function () {
        return true;
    };
    Cnds.prototype.onBannerFailed = function () {
        return true;
    };
    Cnds.prototype.onBannerDismissed = function () {
        return true;
    };
    Cnds.prototype.isShowingBanner = function () {
        return this.isShowingBanner;
    };
    // interstitial contditions
    Cnds.prototype.onInterstitialShown = function () {
        return true;
    };
    Cnds.prototype.onInterstitialLoaded = function () {
        return true;
    };
    Cnds.prototype.onInterstitialClicked = function () {
        return true;
    };
    Cnds.prototype.onInterstitialFailed = function () {
        return true;
    };
    Cnds.prototype.onInterstitialDismissed = function () {
        return true;
    }
    Cnds.prototype.isShowingInterstitial = function () {
        return this.isShowingInterstitial;
    };

    // interstitial contditions
    Cnds.prototype.onRewardedShown = function () {
        return true;
    };
    Cnds.prototype.onRewardedLoaded = function () {
        return true;
    };
    Cnds.prototype.onReward = function () {
        return true;
    };
    Cnds.prototype.onRewardedFailed = function () {
        return true;
    };
    Cnds.prototype.onRewardedDismissed = function () {
        return true;
    }
    Cnds.prototype.isShowingRewarded = function () {
        return this.isShowingRewarded;
    };

    pluginProto.cnds = new Cnds();
    /**
     * Plugin actions
     */
    function Acts() { };

    // banner actions
    Acts.prototype.ShowBanner = function () {
        if (bannerReady) {
            showBanner = true;
            this.banner.show();
        }
        else {
            this.bannerReady = false;
            this.banner.load();
        }
    };
    Acts.prototype.HideBanner = function () {
        if (showBanner) {
            showBanner = false;
            this.banner.hide();
        }
    };
    Acts.prototype.LoadBanner = function () {
        this.bannerReady = false;
        this.banner.load();
    };

    Acts.prototype.SetLayout = function (layout) {

        var bannerLayout;

        switch (layout) {
            case 0: bannerLayout = "TOP_CENTER"; break;
            case 1: bannerLayout = "BOTTOM_CENTER"; break;
            case 2: bannerLayout = "CUSTOM"; break;
        }

        this.banner.setLayout(bannerLayout);
    };
    Acts.prototype.SetPosition = function (x, y) {
        this.banner.setPosition(x, y);
    };

    // interstitial actions
    Acts.prototype.ShowInterstitial = function () {
        if (interstitialReady)
            this.interstitial.show();
        else
            this.interstitial.load();
    };
    Acts.prototype.LoadInterstitial = function () {
        this.interstitial.load();
    };

    // rewarded actions
    Acts.prototype.ShowRewarded = function () {
        if (rewardedReady)
            this.rewarded.show();
        else
            this.rewarded.load();
    };
    Acts.prototype.LoadRewarded = function () {
        this.rewarded.load();
    };

    pluginProto.acts = new Acts();

    /**
     * Expressions
     */
    function Exps() { };

    Exps.prototype.Reward = function (ret) {
        ret.set_string(reward);
    };

    pluginProto.exps = new Exps();

}());
