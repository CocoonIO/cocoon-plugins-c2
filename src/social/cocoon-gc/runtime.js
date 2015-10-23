/**
 * Object holder for the plugin
 */
cr.plugins_.ATPGameCenter = function(runtime) {
    this.runtime = runtime;
};
/**
 * C2 plugin
 */
(function() {

    var requested_score = 0;
    var pluginProto = cr.plugins_.ATPGameCenter.prototype;
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

        if (!this.runtime.isiOS)
            return;
        if (typeof Cocoon == 'undefined')
            return;

        this.GC = null;
        this.GCAvailable = false;
        this.GCClientID = this.properties[0];

        self = this;

        this.startGameCenter = function() {
            this.GC = window.Cocoon && window.Cocoon.Social ? Cocoon.Social.GameCenter : null;
            if (this.GC) {
                var config = {};
                this.GCInterface = this.GC.getSocialInterface();
                
            } else {
                throw new Error("Cannot find Game Center service, are you using the latest ATP for Game Center?");
            }
        };

        this.startGameCenter.apply(this, []);

    };

    function Cnds() {};

    /**
     * Conditions
     */
    Cnds.prototype.isLoggedIn = function() {
        return this.GCInterface ? this.GCInterface.isLoggedIn() : false;
    };
    Cnds.prototype.onGCLoginSuccess = function() {
        return true;
    };
    Cnds.prototype.onGCLoginFail = function() {
        return true;
    };
    Cnds.prototype.onGCLogoutSuccess = function() {
        return true;
    };
    Cnds.prototype.onGCLogoutFail = function() {
        return true;
    };

    /**
     * Leaderboards conditions
     */
    Cnds.prototype.onGCSubmitScoreSuccess = function() {
        return true;
    };
    Cnds.prototype.onGCSubmitScoreFail = function() {
        return true;
    };
    Cnds.prototype.onGCRequestScoreSuccess = function() {
        return true;
    };
    Cnds.prototype.onGCRequestScoreFail = function() {
        return true;
    };
    Cnds.prototype.onGCOpenLeaderBoardSuccess = function() {
        return true;
    };
    Cnds.prototype.onGCOpenLeaderBoardClosed = function() {
        return true;
    };

    /**
     * Achievements conditions
     */
    Cnds.prototype.onGCOpenAchievementsSuccess = function() {
        return true;
    };
    Cnds.prototype.onGCOpenAchievementsClosed = function() {
        return true;
    };
    Cnds.prototype.onGCResetAchievementsComplete = function() {
        return true;
    };
    Cnds.prototype.onGCResetAchievementsFail = function() {
        return true;
    };
    Cnds.prototype.onGCSubmitAchievementComplete = function() {
        return true;
    };
    Cnds.prototype.onGCSubmitAchievementFail = function() {
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
    Acts.prototype.GCRequestLogin = function() {
        if (!this.GCInterface) return;
        if (this.GCInterface.isLoggedIn()) {
            self.runtime.trigger(cr.plugins_.ATPGameCenter.prototype.cnds.onGCLoginSuccess, self);
        } else {
            this.GCInterface.login(function(loggedIn, error) {
                if (loggedIn) {
                    self.runtime.trigger(cr.plugins_.ATPGameCenter.prototype.cnds.onGCLoginSuccess, self);
                } else {
                    console.log(JSON.stringify(error));
                    self.runtime.trigger(cr.plugins_.ATPGameCenter.prototype.cnds.onGCLoginFail, self);
                }
            });
        }
    };

    Acts.prototype.GCRequestLogout = function() {
        if (!this.GCInterface) return;
        this.GCInterface.logout(function(error) {
            if (!error) {
                self.runtime.trigger(cr.plugins_.ATPGameCenter.prototype.cnds.onGCLogoutSuccess, self);
            } else {
                console.log(JSON.stringify(error));
                self.runtime.trigger(cr.plugins_.ATPGameCenter.prototype.cnds.onGCLogoutFail, self);
            }
        });
    };

    /**
     * Social service Leaderboards actions
     */
    Acts.prototype.GCSubmitScore = function(score_, leaderboard_) {
        if (!this.GCInterface) return;
        if (this.GCInterface.isLoggedIn())
            this.GCInterface.submitScore(
                score_,
                function(err) {
                    if (!err) {
                        self.runtime.trigger(cr.plugins_.ATPGameCenter.prototype.cnds.onGCSubmitScoreSuccess, self);
                    } else {
                        console.log(JSON.stringify(error));
                        self.runtime.trigger(cr.plugins_.ATPGameCenter.prototype.cnds.onGCSubmitScoreFail, self);
                    }
                }, {
                    leaderboardID: leaderboard_
                }
            );
    };
    Acts.prototype.GCRequestScore = function(leaderboard_) {
        if (!this.GCInterface) return;
        if (this.GCInterface.isLoggedIn())
            this.GCInterface.requestScore(
                function(loadedScore, err) {
                    if (!err) {
                        requested_score = loadedScore.score || 0;
                        self.runtime.trigger(cr.plugins_.ATPGameCenter.prototype.cnds.onGCRequestScoreSuccess, self);
                    } else {
                        console.log(err);
                        self.runtime.trigger(cr.plugins_.ATPGameCenter.prototype.cnds.onGCRequestScoreFail, self);
                    }
                }, {
                    leaderboardID: leaderboard_
                });
    };
    Acts.prototype.GCOpenLeaderboard = function(leaderboard_) {
        if (!this.GCInterface) return;
        if (!this.GCInterface.isLoggedIn()) return;
        self.runtime.trigger(cr.plugins_.ATPGameCenter.prototype.cnds.onGCOpenLeaderBoardSuccess, self);
        this.GCInterface.showLeaderboard(
            function(err) {
                if (err) {
                    console.log(JSON.stringify(error));
                }
                self.runtime.trigger(cr.plugins_.ATPGameCenter.prototype.cnds.onGCOpenLeaderBoardClosed, self);
            }, {
                leaderboardID: leaderboard_
            }
        );
    };

    /**
     * Social service Achievements actions
     */
    Acts.prototype.GCOpenAchievements = function() {
        if (!this.GCInterface) return;
        if (!this.GCInterface.isLoggedIn()) return;
        self.runtime.trigger(cr.plugins_.ATPGameCenter.prototype.cnds.onGCOpenAchievementsSuccess, self);
        this.GCInterface.showAchievements(function(err) {
            if (err) {
                console.log(JSON.stringify(error));
            }
            self.runtime.trigger(cr.plugins_.ATPGameCenter.prototype.cnds.onGCOpenAchievementsClosed, self);
        });
    };
    Acts.prototype.GCResetAchievements = function() {
        if (!this.GCInterface) return;
        if (!this.GCInterface.isLoggedIn()) return;
        this.GCInterface.resetAchievements(function(err) {
            if (err) {
                try {
                    console.log(JSON.stringify(err));
                } catch (e) {
                    for (var prop in err) {
                        console.log(err[prop]);
                    }
                    console.log(e);
                }
                self.runtime.trigger(cr.plugins_.ATPGameCenter.prototype.cnds.onGCResetAchievementsFail, self);
            } else {
                self.runtime.trigger(cr.plugins_.ATPGameCenter.prototype.cnds.onGCResetAchievementsComplete, self);
            }
        });
    };
    Acts.prototype.GCSubmitAchievement = function(_achievementId) {
        if (!this.GCInterface) return;
        if (!this.GCInterface.isLoggedIn()) return;
        this.GCInterface.submitAchievement(_achievementId, function(err) {
            if (err) {
                try {
                    console.log(JSON.stringify(err));
                } catch (e) {
                    for (var prop in err) {
                        console.log(err[prop]);
                    }
                    console.log(e);
                }
                self.runtime.trigger(cr.plugins_.ATPGameCenter.prototype.cnds.onGCSubmitAchievementFail, self);
            } else {
                self.runtime.trigger(cr.plugins_.ATPGameCenter.prototype.cnds.onGCSubmitAchievementComplete, self);
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
