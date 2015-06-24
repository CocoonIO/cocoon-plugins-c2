/**
 * Object holder for the plugin
 */
cr.plugins_.ATPGooglePlayGames = function(runtime) {
    this.runtime = runtime;
};

/**
 * C2 plugin
 */
(function() {

    var requested_score = 0;
    var pluginProto = cr.plugins_.ATPGooglePlayGames.prototype;
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

        this.GPG = null;
        this.GPGAvailable = false;
        //this.GPGClientID = this.properties[0];

        self = this;

        this.startGooglePlay = function() {
            this.GPG = Cocoon.Social.GooglePlayGames;
            if (this.GPG) {
                var config = {};
                //if (this.GPGClientID) config.clientId = this.GPGClientID;
                this.GPG.init(config);
                if (!!this.GPG.nativeAvailable) {
                    this.GPGInterface = this.GPG.getSocialInterface();
                }
            } else {
                throw new Error("Cannot find Google Play Games service, are you using the latest ATP for Google Play Games?");
            }
        };

        this.startGooglePlay.apply(this, []);

    };

    function Cnds() {};

    /**
     * Conditions
     */
    Cnds.prototype.onGPGGPGGPGLoginSuccess = function() {
        return true;
    };
    Cnds.prototype.onGPGGPGLoginFail = function() {
        return true;
    };
    Cnds.prototype.onGPGLogoutSuccess = function() {
        return true;
    };
    Cnds.prototype.onGPGLogoutFail = function() {
        return true;
    };

    /**
     * Leaderboards conditions
     */
    Cnds.prototype.onGPGSubmitScoreSuccess = function() {
        return true;
    };
    Cnds.prototype.onGPGSubmitScoreFail = function() {
        return true;
    };
    Cnds.prototype.onGPGRequestScoreSuccess = function() {
        return true;
    };
    Cnds.prototype.onGPGRequestScoreFail = function() {
        return true;
    };
    Cnds.prototype.onGPGOpenLeaderBoardSuccess = function() {
        return true;
    };
    Cnds.prototype.onGPGOpenLeaderBoardClosed = function() {
        return true;
    };

    /**
     * Achievements conditions
     */
    Cnds.prototype.onGPGOpenAchievementsSuccess = function() {
        return true;
    };
    Cnds.prototype.onGPGOpenAchievementsClosed = function() {
        return true;
    };
    Cnds.prototype.onGPGResetAchievementsComplete = function() {
        return true;
    };
    Cnds.prototype.onGPGResetAchievementsFail = function() {
        return true;
    };
    Cnds.prototype.onGPGSubmitAchievementComplete = function() {
        return true;
    };
    Cnds.prototype.onGPGSubmitAchievementFail = function() {
        return true;
    };

    pluginProto.cnds = new Cnds();
    /**
     * Plugin actions
     */
    function Acts() {};


    /**
     * Social service actions
     */
    Acts.prototype.GPGRequestLogin = function() {
        if (!this.GPGInterface) return;
        if (this.GPGInterface.isLoggedIn()) {
            self.runtime.trigger(cr.plugins_.ATPGooglePlayGames.prototype.cnds.onGPGLoginSuccess, self);
        } else {
            this.GPGInterface.login(function(loggedIn, error) {
                if (loggedIn) {
                    self.runtime.trigger(cr.plugins_.ATPGooglePlayGames.prototype.cnds.onGPGLoginSuccess, self);
                } else {
                    console.log(JSON.stringify(error));
                    self.runtime.trigger(cr.plugins_.ATPGooglePlayGames.prototype.cnds.onGPGLoginFail, self);
                }
            });
        }
    };

    Acts.prototype.GPGRequestLogout = function() {
        if (!this.GPGInterface) return;
        this.GPGInterface.logout(function(error) {
            if (!error) {
                self.runtime.trigger(cr.plugins_.ATPGooglePlayGames.prototype.cnds.onGPGLogoutSuccess, self);
            } else {
                console.log(JSON.stringify(error));
                self.runtime.trigger(cr.plugins_.ATPGooglePlayGames.prototype.cnds.onGPGLogoutFail, self);
            }
        });
    };

    /**
     * Social service Leaderboards actions
     */
    Acts.prototype.GPGSubmitScore = function(score_, leaderboard_) {
        if (!this.GPGInterface) return;
        if (this.GPGInterface.isLoggedIn())
            this.GPGInterface.submitScore(
                score_,
                function(err) {
                    if (!err) {
                        self.runtime.trigger(cr.plugins_.ATPGooglePlayGames.prototype.cnds.onGPGSubmitScoreSuccess, self);
                    } else {
                        console.log(JSON.stringify(error));
                        self.runtime.trigger(cr.plugins_.ATPGooglePlayGames.prototype.cnds.onGPGSubmitScoreFail, self);
                    }
                }, {
                    leaderboardID: leaderboard_
                }
            );
    };
    Acts.prototype.GPGRequestScore = function(leaderboard_) {
        if (!this.GPGInterface) return;
        if (this.GPGInterface.isLoggedIn())
            this.GPGInterface.requestScore(
                function(loadedScore, err) {
                    if (!err) {
                        requested_score = loadedScore.score || 0;
                        self.runtime.trigger(cr.plugins_.ATPGooglePlayGames.prototype.cnds.onGPGRequestScoreSuccess, self);
                    } else {
                        console.log(err);
                        self.runtime.trigger(cr.plugins_.ATPGooglePlayGames.prototype.cnds.onGPGRequestScoreFail, self);
                    }
                }, {
                    leaderboardID: leaderboard_
                });
    };
    Acts.prototype.GPGOpenLeaderboard = function(leaderboard_) {
        if (!this.GPGInterface) return;
        if (!this.GPGInterface.isLoggedIn()) return;
        self.runtime.trigger(cr.plugins_.ATPGooglePlayGames.prototype.cnds.onGPGOpenLeaderBoardSuccess, self);
        this.GPGInterface.showLeaderboard(
            function(err) {
                if (err) {
                    console.log(JSON.stringify(error));
                }
                self.runtime.trigger(cr.plugins_.ATPGooglePlayGames.prototype.cnds.onGPGOpenLeaderBoardClosed, self);
            }, {
                leaderboardID: leaderboard_
            }
        );
    };

    /**
     * Social service Achievements actions
     */
    Acts.prototype.GPGOpenAchievements = function() {
        if (!this.GPGInterface) return;
        if (!this.GPGInterface.isLoggedIn()) return;
        self.runtime.trigger(cr.plugins_.CJSAds.prototype.cnds.onGPGOpenAchievementsSuccess, self);
        this.GPGInterface.showAchievements(function(err) {
            if (err) {
                console.log(JSON.stringify(error));
            }
            self.runtime.trigger(cr.plugins_.ATPGooglePlayGames.prototype.cnds.onGPGOpenAchievementsClosed, self);
        });
    };
    Acts.prototype.GPGResetAchievements = function() {
        if (!this.GPGInterface) return;
        if (!this.GPGInterface.isLoggedIn()) return;
        this.GPGInterface.resetAchievements(function(err) {
            if (err) {
                try {
                    console.log(JSON.stringify(err));
                } catch (e) {
                    for (var prop in err) {
                        console.log(err[prop]);
                    }
                    console.log(e);
                }
                self.runtime.trigger(cr.plugins_.ATPGooglePlayGames.prototype.cnds.onGPGResetAchievementsFail, self);
            } else {
                self.runtime.trigger(cr.plugins_.ATPGooglePlayGames.prototype.cnds.onGPGResetAchievementsComplete, self);
            }
        });
    };
    Acts.prototype.GPGSubmitAchievement = function(_achievementId) {
        if (!this.GPGInterface) return;
        if (!this.GPGInterface.isLoggedIn()) return;
        this.GPGInterface.submitAchievement(_achievementId, function(err) {
            if (err) {
                try {
                    console.log(JSON.stringify(err));
                } catch (e) {
                    for (var prop in err) {
                        console.log(err[prop]);
                    }
                    console.log(e);
                }
                self.runtime.trigger(cr.plugins_.ATPGooglePlayGames.prototype.cnds.onGPGSubmitAchievementFail, self);
            } else {
                self.runtime.trigger(cr.plugins_.ATPGooglePlayGames.prototype.cnds.onGPGSubmitAchievementComplete, self);
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
