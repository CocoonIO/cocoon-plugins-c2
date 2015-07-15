/**
 * Object holder for the plugin
 */
cr.plugins_.Cocoon_Canvasplus = function(runtime) {
    this.runtime = runtime;
};

/**
 * C2 plugin
 */
(function() {
    var dialog = "";
    var input_text = "";
    var capture_screen_sync = "";
    var capture_screen_async = "";
    var device_info = "";

    var pluginProto = cr.plugins_.Cocoon_Canvasplus.prototype;
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

        if (!(this.runtime.isAndroid || this.runtime.isiOS))
            return;
        if (typeof Cocoon == 'undefined')
            return;

        self = this;
    };

    function Cnds() {};

    /**
     * Cocoon Basic conditions
     */
    Cnds.prototype.isCanvasPlus = function() {
        return this.runtime.isCocoonJs;
    };
    Cnds.prototype.onKeyboardCancel = function() {
        return true;
    };
    Cnds.prototype.onKeyboardSuccess = function() {
        return true;
    };
    Cnds.prototype.onConfirmCancel = function() {
        return true;
    };
    Cnds.prototype.onConfirmSuccess = function() {
        return true;
    };

    pluginProto.cnds = new Cnds();

    /**
     * Plugin actions
     */
    function Acts() {};

    // Keyboard 
    Acts.prototype.promptKeyboard = function(title_, message_, initial_, type_, canceltext_, oktext_) {
        if (!this.runtime.isCocoonJs)
            return;
        var typestr = ["text", "num", "phone", "email", "url"][type_];
        Cocoon.Dialog.prompt({
            title: title_,
            message: message_,
            text: initial_,
            type: typestr,
            cancelText: canceltext_,
            confirmText: oktext_
        }, {
            success: function(text) {
                input_text = text;
                self.runtime.trigger(cr.plugins_.Cocoon_Canvasplus.prototype.cnds.onKeyboardSuccess, self);
            },
            cancel: function() {
                self.runtime.trigger(cr.plugins_.Cocoon_Canvasplus.prototype.cnds.onKeyboardCancel, self);
            }
        });
    };

    // Confirm
    Acts.prototype.confirmDialog = function(title_, message_, canceltext_, oktext_) {
        if (!this.runtime.isCocoonJs)
            return;
        Cocoon.Dialog.confirm({
            title: title_,
            message: message_,
            cancelText: canceltext_,
            confirmText: oktext_
        }, function(accepted) {
            if (accepted) {
                self.runtime.trigger(cr.plugins_.Cocoon_Canvasplus.prototype.cnds.onConfirmSuccess, self);
            } else {
                self.runtime.trigger(cr.plugins_.Cocoon_Canvasplus.prototype.cnds.onConfirmCancel, self);
            }
        });
    };

    // App and utils 
    Acts.prototype.openURL = function(url_) {
        Cocoon.App.openURL(url_);
    };
    Acts.prototype.exitApp = function() {
        Cocoon.App.exit();
    };
    Acts.prototype.pauseApp = function() {
        Cocoon.App.pause();
    };
    Acts.prototype.resumeApp = function() {
        Cocoon.App.resume();
    };
    Acts.prototype.captureScreenSync = function(filename_, storage_, capture_) {
        if (!this.runtime.isCocoonJs)
            return;
        var storage_type = ["APP_STORAGE", "INTERNAL_STORAGE", "EXTERNAL_STORAGE", "TEMPORARY_STORAGE"][storage_];
                  
        // var gallery = [true, false][gallery_];

        var gallery = false; 

        capture_screen_sync = Cocoon.Utils.captureScreen(filename_, storage_type, capture_, gallery);
    };
    Acts.prototype.captureScreenAsync = function(filename_, storage_, capture_) {
        if (!this.runtime.isCocoonJs)
            return;
        
        var storage_type = ["APP_STORAGE", "INTERNAL_STORAGE", "EXTERNAL_STORAGE", "TEMPORARY_STORAGE"][storage_];
                  
        // var gallery = [true, false][gallery_];

        var gallery = false; 
        
        Cocoon.Utils.captureScreenAsync(filename_, storage_type, capture_, gallery, function(url, error) {
            if (error) {
                self.runtime.trigger(cr.plugins_.Cocoon_Canvasplus.prototype.cnds.onCaptureScreenAsyncFail, self);
            } else {
                capture_screen_async = url;
                self.runtime.trigger(cr.plugins_.Cocoon_Canvasplus.prototype.cnds.onCaptureScreenAsyncSuccess, self);
            }
        });
    };
    Acts.prototype.captureScreenSyncShare = function(filename_, storage_, capture_, text_) {
        if (!this.runtime.isCocoonJs)
            return;
        var storage_type = ["APP_STORAGE", "INTERNAL_STORAGE", "EXTERNAL_STORAGE", "TEMPORARY_STORAGE"][storage_];
                  
        // var gallery = [true, false][gallery_];

        var gallery = false;
        
        url = Cocoon.Utils.captureScreen(filename_, storage_type, capture_, gallery);

        Cocoon.Share.share({
            message: text_,
            image: url
        }, function(activity, completed, error) {
            if (completed) {
                self.runtime.trigger(cr.plugins_.Cocoon_Canvasplus.prototype.cnds.onShareSyncComplete, self);
            } else {
                self.runtime.trigger(cr.plugins_.Cocoon_Canvasplus.prototype.cnds.onShareSyncFail, self);
                console.log(error);
            }
        });
    };
    Acts.prototype.showWebdialog = function(url_){
        dialog = new Cocoon.Widget.WebDialog();
        dialog.show(url_, function(){
            console.log("The user has closed the dialog!");
            self.runtime.trigger(cr.plugins_.Cocoon_Canvasplus.prototype.cnds.onWebdialogUserClose, self);
        });
    };
    Acts.prototype.closeWebdialog = function(){
        dialog.close();
    };
    Acts.prototype.getDeviceInfo = function(){
        device_info = Cocoon.Device.getDeviceInfo();
    };
    pluginProto.acts = new Acts();

    /**
     * Expressions
     */
    function Exps() {};

    // Keyboard
    Exps.prototype.InputText = function(ret) {
        ret.set_string(input_text);
    };
    Exps.prototype.CaptureScreenSync = function(ret) {
        ret.set_string(capture_screen_sync);
    };
    Exps.prototype.CaptureScreenAsync = function(ret) {
        ret.set_string(capture_screen_async);
    };
    Exps.prototype.DeviceOS = function(ret) {
        ret.set_string(device_info.os);
    };
    Exps.prototype.DeviceVersion = function(ret) {
        ret.set_string(device_info.version);
    };
    Exps.prototype.DeviceDPI = function(ret) {
        ret.set_string(device_info.dpi);
    };
    Exps.prototype.DeviceBrand = function(ret) {
        ret.set_string(device_info.brand);
    };    
    Exps.prototype.DeviceModel = function(ret) {
        ret.set_string(device_info.model);
    };
    Exps.prototype.DevicePlatformId = function(ret) {
        ret.set_string(device_info.platformId);
    };    
    pluginProto.exps = new Exps();

}());
