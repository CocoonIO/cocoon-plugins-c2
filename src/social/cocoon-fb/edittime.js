function GetPluginSettings() {
    return {
        "name": "Cocoon Facebook",
        "id": "ATPFacebook",
        "version": "1.0",
        "description": "Cocoon plugin for Facebook",
        "author": "Ludei",
        "help url": "http://cocoon.io",
        "category": "Platform specific",
        "type": "object", // not in layout
        "rotatable": false,
        "flags": pf_singleglobal,
        "dependency": "achievements.html;achievement_locked.png;close.png;loading.gif;main.css;page_achievements.css;page_leaderboards.css;style.css;leaderboards.html;jquery.equalheights.js;"
    };
};

/**
 * Conditions
 */

AddCondition(0, cf_trigger, "On login success", "Social", "On login succeeded", "Triggered when the user has logged into the social service.", "onFacebookLoginSuccess");

AddCondition(1, cf_trigger, "On login fail", "Social", "On login Failed", "Triggered if the login of the social service has failed.", "onFacebookLoginFail");

AddCondition(2, cf_trigger, "On logout success", "Social", "On logout succeeded", "Triggered when the user has logged out the social service.", "onFacebookLogoutSuccess");

AddCondition(3, cf_trigger, "On logout fail", "Social", "On logout failed", "Triggered if the logout of the social service has failed.", "onFacebookLogoutFail");

AddCondition(4, cf_trigger, "On publish message with dialog success", "Social", "On publish message with dialog success", "Triggered when the message has been successfully published", "onPublishMessageWithDialogSuccess");

AddCondition(5, cf_trigger, "On publish message with dialog fail", "Social", "On publish message with dialog fail", "Triggered when the publishing has failed", "onPublishMessageWithDialogFail");

// Leaderboards
AddCondition(6, cf_trigger, "On score submit success", "Leaderboards", "On score submit success", "Triggered after submitting a score completes successfully", "onFacebookSubmitScoreSuccess");

AddCondition(7, cf_trigger, "On score submit failed", "Leaderboards", "On score submit fail", "Triggered after submitting a score fails to complete successfully.", "onFacebookSubmitScoreFail");

AddCondition(8, cf_trigger, "On request score success", "Leaderboards", "On request score success", "Triggered after requesting a score completes successfully.", "onFacebookRequestScoreSuccess");

AddCondition(9, cf_trigger, "On request score failed", "Leaderboards", "On request score fail", "Triggered after requesting a score fails to complete successfully.", "onFacebookRequestScoreFail");

AddCondition(10, cf_trigger, "On Leaderboard open", "Leaderboards", "On Leaderboards view opened", "Triggered when the leaderboard view opens successfully.", "onFacebookOpenLeaderBoardSuccess");

AddCondition(11, cf_trigger, "On Leaderboard closed", "Leaderboards", "On Leaderboards view closed", "Triggered when the leaderboard view is closed by the user.", "onFacebookOpenLeaderBoardClosed");

// Achievements
AddCondition(12, cf_trigger, "On Achievements view closed", "Achievements", "On Achievements view closed", "Triggered when the Achievements view is closed by the user.", "onFacebookOpenAchievementsClosed");

AddCondition(13, cf_trigger, "On Achievements view open", "Achievements", "On Achievements view open", "Triggered when the Achievements view is open by the user.", "onFacebookOpenAchievementsSuccess");

AddCondition(14, cf_trigger, "On reset achievements complete", "Achievements", "On reset achievements completed", "Triggered when the achievements have been reset.", "onFacebookResetAchievementsComplete");

AddCondition(15, cf_trigger, "On reset achievements fail", "Achievements", "On reset achievements failed", "Triggered if something fails when trying to reset the achievements", "onFacebookResetAchievementsFail");

AddCondition(16, cf_trigger, "On submit achievement success", "Achievements", "On submit achievement success", "Triggered when the achievement has been correctly.", "onFacebookSubmitAchievementComplete");

AddCondition(17, cf_trigger, "On submit achievement fail", "Achievements", "On submit achievement failed", "Triggered if something fails when trying to submit an achievement", "onFacebookSubmitAchievementFail");

/**
 * Actions
 */

AddAction(0, af_none, "Request login", "Social", "Request Facebook login", "", "facebookRequestLogin");

AddAction(1, af_none, "Request logout", "Social", "Request Facebook logout", "", "facebookRequestLogout");

AddStringParam("Message", "The message to be published.");
AddStringParam("Media URL", "An URL to a media (image, video, ...).");
AddStringParam("Link URL", "An URL to add to the message so the user can click on that link to get more information.");
AddStringParam("Link Text", "The text that will appear in the message link.");
AddStringParam("Link Caption", "The text caption that will appear in the message link.");
AddAction(2, af_none, "Publish message with dialog", "Social", "Publish message with dialog", "Publishes a message with dialog in Facebook", "publishMessageWithDialog");

// Leaderboards
AddNumberParam("Score", "The score to submit to Game Center.");
AddStringParam("Leaderboard", "The name of the leaderboard to submit to, e.g. \"My Game Name\"");
AddAction(3, af_none, "Submit Facebook score", "Leaderboards", "Submit score of <i>{0}</i> to the leaderboard <i>{1}</i>", "Submit a score to the specified leaderboard.", "facebookSubmitScore");

AddStringParam("Leaderboard", "The name of the leaderboard to retrieve from, e.g. \"My Game Name\"");
AddAction(4, af_none, "Request Facebook player score", "Leaderboards", "Request player score", "Requests the user score from the <i>{0}</i> leaderboard", "facebookRequestScore");

AddStringParam("Leaderboard", "The name of the leaderboard to be openned, e.g. \"My Game Name\"");
AddAction(5, af_none, "Open leaderboard", "Leaderboards", "Open Facebook leaderboard", "Opens Facebook leaderboard", "facebookOpenLeaderboard");

// Achievements
AddAction(6, af_none, "Show achievements", "Achievements", "Show Facebook achievements", "Shows the achievements window", "facebookOpenAchievements");

AddAction(7, af_none, "Reset achievements", "Achievements", "Reset Facebook achievements", "Resets the achievements", "facebookResetAchievements");

AddStringParam("Achievement ID", "The ID of the achievement to be sent");
AddAction(8, af_none, "Submit achievement", "Achievements", "Submit Facebook achievement", "Submits an achievement", "facebookSubmitAchievement");

/**
 * Expressions
 */

AddExpression(8, ef_return_string, "", "Leaderboards", "PlayerScore", "Returns the current player score.");

ACESDone();

/**
 * Plugin properties
 */
var property_list = [
    
    new cr.Property(ept_text,
        "Facebook AppID",
        "",
        "The AppID of your Facebook app (create one at Facebook development site to get yours)",
        ""),
    new cr.Property(ept_text,
        "Facebook channel",
        "",
        "The Facebook channel for your app",
        "")
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
