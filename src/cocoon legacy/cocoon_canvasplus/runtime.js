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
        var input_text = "";
        var capture_screen_sync = "";
        var capture_screen_async = "";

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

        /**
         * Cocoon basic actions
         */

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

        Acts.prototype.captureScreenSync = function(filename_, storage_, capture_, gallery_) {
            if (!this.runtime.isCocoonJs)
                return;
            var storage_type = [Cocoon.Utils.StorageType.APP_STORAGE, Cocoon.Utils.StorageType.INTERNAL_STORAGE, Cocoon.Utils.StorageType.EXTERNAL_STORAGE, Cocoon.Utils.StorageType.TEMPORARY_STORAGE][storage_];

            var gallery = [true, false][gallery_];

            capture_screen_sync = Cocoon.Utils.captureScreen(filename_, storage_type, capture_, gallery);
        };

        Acts.prototype.captureScreenAsync = function(filename_, storage_, capture_, gallery_) {
            if (!this.runtime.isCocoonJs)
                return;
            var storage_type = [Cocoon.Utils.StorageType.APP_STORAGE, Cocoon.Utils.StorageType.INTERNAL_STORAGE, Cocoon.Utils.StorageType.EXTERNAL_STORAGE, Cocoon.Utils.StorageType.TEMPORARY_STORAGE][storage_];

            var gallery = [true, false][gallery_];

            Cocoon.Utils.captureScreenAsync(filename_, storage_type, capture_, gallery, function(url, error) {
                if (error) {
                    self.runtime.trigger(cr.plugins_.Cocoon_Canvasplus.prototype.cnds.onCaptureScreenAsyncFail, self);
                } else {
                    capture_screen_async = url;
                    self.runtime.trigger(cr.plugins_.Cocoon_Canvasplus.prototype.cnds.onCaptureScreenAsyncSuccess, self);
                }
            });
        };

        Acts.prototype.captureScreenSyncShare = function(filename_, storage_, capture_, gallery_, text_) {
            if (!this.runtime.isCocoonJs)
                return;
            var storage_type = [Cocoon.Utils.StorageType.APP_STORAGE, Cocoon.Utils.StorageType.INTERNAL_STORAGE, Cocoon.Utils.StorageType.EXTERNAL_STORAGE, Cocoon.Utils.StorageType.TEMPORARY_STORAGE][storage_];

            var gallery = [true, false][gallery_];

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

        Acts.prototype.captureScreenAsyncShare = function(filename_, storage_, capture_, gallery_, text_) {
            if (!this.runtime.isCocoonJs)
                return;
            var storage_type = [Cocoon.Utils.StorageType.APP_STORAGE, Cocoon.Utils.StorageType.INTERNAL_STORAGE, Cocoon.Utils.StorageType.EXTERNAL_STORAGE, Cocoon.Utils.StorageType.TEMPORARY_STORAGE][storage_];

            var gallery = [true, false][gallery_];

            Cocoon.Utils.captureScreenAsync(filename_, storage_type, capture_, gallery, function(url, error) {
                if (error) {
                    self.runtime.trigger(cr.plugins_.Cocoon_Canvasplus.prototype.cnds.onCaptureScreenAsyncFail, self);
                    console.log(error);
                } else {
                    self.runtime.trigger(cr.plugins_.Cocoon_Canvasplus.prototype.cnds.onCaptureScreenAsyncSuccess, self);

                    Cocoon.Share.share({
                        message: text_,
                        image: url
                    }, function(activity, completed, error) {
                        if (completed) {
                            self.runtime.trigger(cr.plugins_.Cocoon_Canvasplus.prototype.cnds.onShareAsyncComplete, self);
                        } else {
                            self.runtime.trigger(cr.plugins_.Cocoon_Canvasplus.prototype.cnds.onShareAsyncFail, self);
                            console.log(error);
                        }
                    });
                }
            });
        };
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

    pluginProto.exps = new Exps();

}());
