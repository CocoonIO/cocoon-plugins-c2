/**
 * Object holder for the plugin
 */
cr.plugins_.ATPFacebook = function(runtime) {
    this.runtime = runtime;
};

/**
 * C2 plugin
 */
(function() {
    
    var requested_score = 0;
    var pluginProto = cr.plugins_.ATPFacebook.prototype;
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
        this.facebookAppID = this.properties[0];
        this.facebookChannel = this.properties[1];

        self = this;
        
        this.startFacebook = function() {
            console.log("Facebook selected");
            this.facebookService = Cocoon.Social.Facebook;
            if (this.facebookService) {
                var config = {};
                if (this.facebookAppID && this.facebookChannel) {
                    config.appId = this.facebookAppID;
                    config.channelUrl = this.facebookChannel;
                }
                this.facebookService.init(config);
                if (!!this.facebookService.nativeAvailable) {
                    this.facebookServiceInterface = this.facebookService.getSocialInterface();
                    this.facebookServiceInterface.setTemplates("leaderboards.html", "achievements.html");
                }
            } else {
                throw new Error("Cannot find Facebook service, are you using the latest Cocoon Basic Plugin?");
            }
        };

        this.startFacebook.apply(this, []);
    };

    function Cnds() {};

    /**
     * Conditions
     */       
    Cnds.prototype.onFacebookLoginSuccess = function() {
        return true;
    };
    Cnds.prototype.onFacebookLoginFail = function() {
        return true;
    };
    Cnds.prototype.onFacebookLogoutSuccess = function() {
        return true;
    };
    Cnds.prototype.onFacebookLogoutFail = function() {
        return true;
    };
    Cnds.prototype.onPublishMessageWithDialogSuccess = function() {
        return true;
    };
    Cnds.prototype.onPublishMessageWithDialogFail = function() {
        return true;
    };
    
    /**
     * Leaderboards conditions
     */    
    Cnds.prototype.onFacebookSubmitScoreSuccess = function() {
        return true;
    };
    Cnds.prototype.onFacebookSubmitScoreFail = function() {
        return true;
    };
    Cnds.prototype.onFacebookRequestScoreSuccess = function() {
        return true;
    };
    Cnds.prototype.onFacebookRequestScoreFail = function() {
        return true;
    };
    Cnds.prototype.onFacebookOpenLeaderBoardSuccess = function() {
        return true;
    };
    Cnds.prototype.onFacebookOpenLeaderBoardClosed = function() {
        return true;
    };

    /**
     * Achievements conditions
     */    
    Cnds.prototype.onFacebookOpenAchievementsSuccess = function() {
        return true;
    };
    Cnds.prototype.onFacebookOpenAchievementsClosed = function() {
        return true;
    };
    Cnds.prototype.onFacebookResetAchievementsComplete = function() {
        return true;
    };
    Cnds.prototype.onFacebookResetAchievementsFail = function() {
        return true;
    };
    Cnds.prototype.onFacebookSubmitAchievementComplete = function() {
        return true;
    };
    Cnds.prototype.onFacebookSubmitAchievementFail = function() {
        return true;
    };

    pluginProto.cnds = new Cnds();
    
    /**
     * Plugin actions
     */
    function Acts() {};

    /**
     * Facebook actions
     */
    Acts.prototype.facebookRequestLogin = function() {
        if (!this.facebookServiceInterface) return;
        if (this.facebookServiceInterface.isLoggedIn()) {
            self.runtime.trigger(cr.plugins_.ATPFacebook.prototype.cnds.onFacebookLoginSuccess, self);
        } else {
            this.socialServiceInterface.login(function(loggedIn, error) {
                if (loggedIn) {
                    self.runtime.trigger(cr.plugins_.ATPFacebook.prototype.cnds.onFacebookLoginSuccess, self);
                } else {
                    console.log(JSON.stringify(error));
                    self.runtime.trigger(cr.plugins_.ATPFacebook.prototype.cnds.onFacebookLoginFail, self);
                }
            });     
        }
    };
    Acts.prototype.facebookRequestLogout = function() {
        if (!this.facebookServiceInterface) return;
        this.facebookServiceInterface.logout(function(error) {
            if (!error) {
                self.runtime.trigger(cr.plugins_.ATPFacebook.prototype.cnds.onFacebookLogoutSuccess, self);
            } else {
                console.log(JSON.stringify(error));
                self.runtime.trigger(cr.plugins_.ATPFacebook.prototype.cnds.onFacebookLogoutFail, self);
            }
        });
    };
    Acts.prototype.publishMessageWithDialog = function(msg, mediaURL, linkURL, linkText, linkCaption) {
        if (!this.facebookServiceInterface) return;
        if (!this.facebookServiceInterface.isLoggedIn()) return;
        var message = new Cocoon.Social.Message(msg, mediaURL, linkURL, linkText, linkCaption);
        this.facebookServiceInterface.publishMessageWithDialog(message, function(error) {
            if (error) {
                console.error("Error publishing message: " + JSON.stringify(error));
                self.runtime.trigger(cr.plugins_.ATPFacebook.prototype.cnds.onPublishMessageWithDialogFail, self);
            }
            else {
                self.runtime.trigger(cr.plugins_.ATPFacebook.prototype.cnds.onPublishMessageWithDialogSuccess, self);
            }
        });
    };

    /**
     * Facebook Leaderboards actions
     */
    Acts.prototype.facebookSubmitScore = function(score_, leaderboard_) {
        if (!this.facebookServiceInterface) return;
        if (this.facebookServiceInterface.isLoggedIn())
            this.facebookServiceInterface.submitScore(
                score_,
                function(err) {
                    if (!err) {
                        self.runtime.trigger(cr.plugins_.ATPFacebook.prototype.cnds.onFacebookSubmitScoreSuccess, self);
                    } else {
                        console.log(JSON.stringify(error));
                        self.runtime.trigger(cr.plugins_.ATPFacebook.prototype.cnds.onFacebookSubmitScoreFail, self);
                    }
                }, {
                    leaderboardID: leaderboard_
                }
            );
    };
    Acts.prototype.facebookRequestScore = function(leaderboard_) {
        if (!this.facebookServiceInterface) return;
        if (this.facebookServiceInterface.isLoggedIn())
            this.facebookServiceInterface.requestScore(
                function(loadedScore, err) {
                    if (!err) {
                        requested_score = loadedScore.score || 0;
                        self.runtime.trigger(cr.plugins_.ATPFacebook.prototype.cnds.onFacebookRequestScoreSuccess, self);
                    } else {
                        console.log(err);
                        self.runtime.trigger(cr.plugins_.ATPFacebook.prototype.cnds.onFacebookRequestScoreFail, self);
                    }
                }, {
                    leaderboardID: leaderboard_
                });
    };
    Acts.prototype.facebookOpenLeaderboard = function(leaderboard_) {
        if (!this.facebookServiceInterface) return;
        if (!this.facebookServiceInterface.isLoggedIn()) return;
        self.runtime.trigger(cr.plugins_.ATPFacebook.prototype.cnds.onFacebookOpenLeaderBoardSuccess, self);
        this.facebookServiceInterface.showLeaderboard(
            function(err) {
                if (err) {
                    console.log(JSON.stringify(error));
                }
                self.runtime.trigger(cr.plugins_.ATPFacebook.prototype.cnds.onFacebookOpenLeaderBoardClosed, self);
            }, {
                leaderboardID: leaderboard_
            }
        );
    };

    /**
     * Achievements actions
     */    
    Acts.prototype.facebookOpenAchievements = function() {
        if (!this.facebookServiceInterface) return;
        if (!this.facebookServiceInterface.isLoggedIn()) return;
        self.runtime.trigger(cr.plugins_.CJSAds.prototype.cnds.onFacebookOpenAchievementsSuccess, self);
        this.facebookServiceInterface.showAchievements(function(err) {
            if (err) {
                console.log(JSON.stringify(error));
            }
            self.runtime.trigger(cr.plugins_.ATPFacebook.prototype.cnds.onFacebookOpenAchievementsClosed, self);
        });
    };
    Acts.prototype.facebookResetAchievements = function() {
        if (!this.facebookServiceInterface) return;
        if (!this.facebookServiceInterface.isLoggedIn()) return;
        this.facebookServiceInterface.resetAchievements(function(err) {
            if (err) {
                try {
                    console.log(JSON.stringify(err));
                } catch (e) {
                    for (var prop in err) {
                        console.log(err[prop]);
                    }
                    console.log(e);
                }
                self.runtime.trigger(cr.plugins_.ATPFacebook.prototype.cnds.onFacebookResetAchievementsFail, self);
            } else {
                self.runtime.trigger(cr.plugins_.ATPFacebook.prototype.cnds.onFacebookResetAchievementsComplete, self);
            }
        });
    };
    Acts.prototype.facebookSubmitAchievement = function(_achievementId) {
        if (!this.facebookServiceInterface) return;
        if (!this.facebookServiceInterface.isLoggedIn()) return;
        this.facebookServiceInterface.submitAchievement(_achievementId, function(err) {
            if (err) {
                try {
                    console.log(JSON.stringify(err));
                } catch (e) {
                    for (var prop in err) {
                        console.log(err[prop]);
                    }
                    console.log(e);
                }
                self.runtime.trigger(cr.plugins_.ATPFacebook.prototype.cnds.onFacebookSubmitAchievementFail, self);
            } else {
                self.runtime.trigger(cr.plugins_.ATPFacebook.prototype.cnds.onFacebookSubmitAchievementComplete, self);
            }
        });
    };

    pluginProto.acts = new Acts();

    /**
     * Expressions
     */
    function Exps() {};

    Exps.prototype.PlayerScore = function(ret) {
        ret.set_float(requested_score);
    };
    pluginProto.exps = new Exps();
}());
