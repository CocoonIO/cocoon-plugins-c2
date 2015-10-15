function GetPluginSettings() {
    return {
        "name": "Cocoon GameCenter",
        "id": "ATPGameCenter",
        "version": "1.0",
        "description": "Cocoon plugin for Game Center",
        "author": "Ludei",
        "help url": "http://cocoon.io",
        "category": "Platform specific",
        "type": "object", // not in layout
        "rotatable": false,
        "flags": pf_singleglobal
    };
};

/**
 * Conditions
 */

AddCondition(0, cf_trigger, "On login success", "Social", "On login success", "Triggered when the user has logged into the social service.", "onGCLoginSuccess");

AddCondition(1, cf_trigger, "On login fail", "Social", "On login failed", "Triggered if the login of the social service has failed.", "onGCLoginFail");

AddCondition(2, cf_trigger, "On logout success", "Social", "On logout success", "Triggered when the user has logged out the social service.", "onGCLogoutSuccess");

AddCondition(3, cf_trigger, "On logout fail", "Social", "On logout fail", "Triggered if the logout of the social service has failed.", "onGCLogoutFail");

// Leaderboards
AddCondition(4, cf_trigger, "On score submit success", "Leaderboards", "On score submit success", "Triggered after submitting a score completes successfully", "onGCSubmitScoreSuccess");

AddCondition(5, cf_trigger, "On score submit failed", "Leaderboards", "On score submit fail", "Triggered after submitting a score fails to complete successfully.", "onGCSubmitScoreFail");

AddCondition(6, cf_trigger, "On request score success", "Leaderboards", "On request score success", "Triggered after requesting a score completes successfully.", "onGCRequestScoreSuccess");

AddCondition(7, cf_trigger, "On request score failed", "Leaderboards", "On request score fail", "Triggered after requesting a score fails to complete successfully.", "onGCRequestScoreFail");

AddCondition(8, cf_trigger, "On Leaderboard open", "Leaderboards", "On Leaderboards view opened", "Triggered when the leaderboard view opens successfully.", "onGCOpenLeaderBoardSuccess");

AddCondition(9, cf_trigger, "On Leaderboard closed", "Leaderboards", "On Leaderboards view closed", "Triggered when the leaderboard view is closed by the user.", "onGCOpenLeaderBoardClosed");

// Achievements
AddCondition(11, cf_trigger, "On Achievements view closed", "Achievements", "On Achievements view closed", "Triggered when the Achievements view is closed by the user.", "onGCOpenAchievementsClosed");

AddCondition(12, cf_trigger, "On Achievements view open", "Achievements", "On Achievements view open", "Triggered when the Achievements view is open by the user.", "onGCOpenAchievementsSuccess");

AddCondition(13, cf_trigger, "On reset achievements complete", "Achievements", "On reset achievements completed", "Triggered when the achievements have been reset.", "onGCResetAchievementsComplete");

AddCondition(14, cf_trigger, "On reset achievements fail", "Achievements", "On reset achievements failed", "Triggered if something fails when trying to reset the achievements", "onGCResetAchievementsFail");

AddCondition(15, cf_trigger, "On submit achievement success", "Achievements", "On submit achievement success", "Triggered when the achievement has been correctly.", "onGCSubmitAchievementComplete");

AddCondition(16, cf_trigger, "On submit achievement fail", "Achievements", "On submit achievement failed", "Triggered if something fails when trying to submit an achievement", "onGCSubmitAchievementFail");

AddCondition(17, cf_none, "Is Logged In", "Social", "Is Logged In", "Checks if the user is already logged in in.", "isLoggedIn");

/**
 * Actions
 */

// Social service actions
AddAction(0, af_none, "Request login", "Social", "Request login", "", "GCRequestLogin");

AddAction(1, af_none, "Request logout", "Social", "Request logout", "", "GCRequestLogout");

// Social service leaderboards
AddNumberParam("Score", "The score to submit to Game Center.");
AddStringParam("Leaderboard", "The name of the leaderboard to submit to, e.g. \"My Game Name\"");
AddAction(2, af_none, "Submit score", "Leaderboards", "Submit score of <i>{0}</i> to the specified leaderboard <i>{1}</i>", "Submit a score to the specified leaderboard.", "GCSubmitScore");

AddStringParam("Leaderboard", "The name of the leaderboard to retrieve from, e.g. \"My Game Name\"");
AddAction(3, af_none, "Request player score", "Leaderboards", "Request player score", "Requests the user score from the <i>{0}</i> leaderboard", "GCRequestScore");

AddStringParam("Leaderboard", "The name of the leaderboard to be openned, e.g. \"My Game Name\"");
AddAction(4, af_none, "Open Leaderboard", "Leaderboards", "Open Leaderboard", "Opens the given leaderboard", "GCOpenLeaderboard");

// AddAction(5, af_none, "Open Leaderboards", "Leaderboards", "Open Leaderboard", "Opens leaderboards", "GCOpenLeaderboards");

// Social service achievements
AddAction(6, af_none, "Show Achievements", "Achievements", "Show Achievements", "Shows the achievements window", "GCOpenAchievements");

AddAction(7, af_none, "Reset Achievements", "Achievements", "Reset Achievements", "Resets the achievements", "GCResetAchievements");

AddStringParam("Achievement ID", "The ID of the achievement to be sent");
AddAction(8, af_none, "Submit Achievement", "Achievements", "Submit Achievement", "Submits an achievement", "GCSubmitAchievement");

//AddAction(9, af_none, "Request Achievements", "Achievements", "Reset Achievements", "Resets the achievements", "GCRequestAchievements");

//AddAction(10, af_none, "Request All Achievements", "Achievements", "Reset Achievements", "Resets the achievements", "GCRequestAllAchievements");

/**
 * Expressions
 */

AddExpression(0, ef_return_string, "", "Leaderboards", "PlayerScore", "Returns the current player score.");

ACESDone();

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
