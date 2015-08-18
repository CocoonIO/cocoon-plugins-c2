function GetPluginSettings() {
    return {
        "name": "Cocoon GooglePlayGames",
        "id": "ATPGooglePlayGames",
        "version": "1.0",
        "description": "Cocoon plugin for Google Play Games",
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
 
AddCondition(0, cf_trigger, "On login success", "Social", "On login success", "Triggered when the user has logged into the social service.", "onGPGLoginSuccess");

AddCondition(1, cf_trigger, "On login fail", "Social", "On login failed", "Triggered if the login of the social service has failed.", "onGPGLoginFail");

AddCondition(2, cf_trigger, "On logout success", "Social", "On logout success", "Triggered when the user has logged out the social service.", "onGPGLogoutSuccess");

AddCondition(3, cf_trigger, "On logout fail", "Social", "On logout fail", "Triggered if the logout of the social service has failed.", "onGPGLogoutFail");

// Leaderboards
AddCondition(4, cf_trigger, "On score submit success", "Leaderboards", "On score submit success", "Triggered after submitting a score completes successfully", "onGPGSubmitScoreSuccess");

AddCondition(5, cf_trigger, "On score submit failed", "Leaderboards", "On score submit fail", "Triggered after submitting a score fails to complete successfully.", "onGPGSubmitScoreFail");

AddCondition(6, cf_trigger, "On request score success", "Leaderboards", "On request score success", "Triggered after requesting a score completes successfully.", "onGPGRequestScoreSuccess");

AddCondition(7, cf_trigger, "On request score failed", "Leaderboards", "On request score fail", "Triggered after requesting a score fails to complete successfully.", "onGPGRequestScoreFail");

AddCondition(8, cf_trigger, "On Leaderboard open", "Leaderboards", "On Leaderboards view opened", "Triggered when the leaderboard view opens successfully.", "onGPGOpenLeaderBoardSuccess");

AddCondition(9, cf_trigger, "On Leaderboard closed", "Leaderboards", "On Leaderboards view closed", "Triggered when the leaderboard view is closed by the user.", "onGPGOpenLeaderBoardClosed");

// Achievements
AddCondition(11, cf_trigger, "On Achievements view closed", "Achievements", "On Achievements view closed", "Triggered when the Achievements view is closed by the user.", "onGPGOpenAchievementsClosed");

AddCondition(12, cf_trigger, "On Achievements view open", "Achievements", "On Achievements view open", "Triggered when the Achievements view is open by the user.", "onGPGOpenAchievementsSuccess");

AddCondition(13, cf_trigger, "On reset achievements complete", "Achievements", "On reset achievements completed", "Triggered when the achievements have been reset.", "onGPGResetAchievementsComplete");

AddCondition(14, cf_trigger, "On reset achievements fail", "Achievements", "On reset achievements failed", "Triggered if something fails when trying to reset the achievements", "onGPGResetAchievementsFail");

AddCondition(15, cf_trigger, "On submit achievement success", "Achievements", "On submit achievement success", "Triggered when the achievement has been submitted correctly.", "onGPGSubmitAchievementComplete");

AddCondition(16, cf_trigger, "On submit achievement fail", "Achievements", "On submit achievement failed", "Triggered if something fails when trying to submit an achievement", "onGPGSubmitAchievementFail");

// User information
AddCondition(17, cf_trigger, "On request user image success", "User data", "On request user image success", "Triggered when the image request has completed correctly.", "onGPGRequestUserImageComplete");

AddCondition(18, cf_trigger, "On request user image fail", "User data", "On request user image failed", "Triggered if something fails when trying to request the image", "onGPGRequestUserImageFail");

/**
 * Actions
 */

// Social service actions
AddAction(0, af_none, "Request login", "Social", "Request login", "", "GPGRequestLogin");

AddAction(1, af_none, "Request logout", "Social", "Request logout", "", "GPGRequestLogout");

// Social service leaderboards
AddNumberParam("Score", "The score to submit to Game Center.");
AddStringParam("Leaderboard", "The name of the leaderboard to submit to, e.g. \"My Game Name\"");
AddAction(2, af_none, "Submit score", "Leaderboards", "Submit score of <i>{0}</i> to the specified leaderboard <i>{1}</i>", "Submit a score to the specified leaderboard.", "GPGSubmitScore");

AddStringParam("Leaderboard", "The name of the leaderboard to retrieve from, e.g. \"My Game Name\"");
AddAction(3, af_none, "Request player score", "Leaderboards", "Request player score", "Requests the user score from the <i>{0}</i> leaderboard", "GPGRequestScore");

AddStringParam("Leaderboard", "The name of the leaderboard to be openned, e.g. \"My Game Name\"");
AddAction(4, af_none, "Open Leaderboard", "Leaderboards", "Open Leaderboard", "Opens the given leaderboard", "GPGOpenLeaderboard");

// AddAction(5, af_none, "Open Leaderboards", "Leaderboards", "Open Leaderboard", "Opens leaderboards", "GPGOpenLeaderboards");

// Social service achievements
AddAction(6, af_none, "Show Achievements", "Achievements", "Show Achievements", "Shows the achievements window", "GPGOpenAchievements");

AddAction(7, af_none, "Reset Achievements", "Achievements", "Reset Achievements", "Resets the achievements", "GPGResetAchievements");

AddStringParam("Achievement ID", "The ID of the achievement to be sent");
AddAction(8, af_none, "Submit Achievement", "Achievements", "Submit Achievement", "Submits an achievement", "GPGSubmitAchievement");

AddComboParamOption("THUMB");
AddComboParamOption("SMALL");
AddComboParamOption("MEDIUM");
AddComboParamOption("LARGE");
AddComboParam("Image size", "The size of the image to request.");
AddAction(9, af_none, "Request image", "User data", "Request image", "Request the user image", "GPGRequestUserImage");

/**
 * Expressions
 */

AddExpression(0, ef_return_string, "", "Leaderboards", "PlayerScore", "Returns the current player score.");

// User data
AddExpression(1, ef_return_string, "", "User data", "UserID", "Returns the current user id.");

AddExpression(2, ef_return_string, "", "User data", "UserName", "Returns the current user name.");

AddExpression(3, ef_return_string, "", "User data", "UserImage", "Returns the current user image. It is necessary to request it first.");


ACESDone();

/**
 * Plugin properties
 */

var property_list = [
/**    new cr.Property(ept_text,
            "Google Play Games ClientID",
            "",
            "The ClientID for Google Play Games (only for iOs when using Google Play Games)",
            "")
*/
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