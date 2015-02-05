/*
* jQuery UI iframeDialog Plugin
* Copyright 2015, LiDecai
* jquery > 2.1.1
* jquery-ui > 1.11.1
* https://github.com/mydevin/jquery.ui.iframedialog
*/
(function ($) {
    $.fn.extend({
        iframeDialog: function (options) {
            var opts = {
                title: $(this).attr("title"),
                url: $(this).attr("href"),
                id: "iframeDialog",
                width: $(window).width() - 50,
                height: $(window).height() - 50,
                modal: true,
                closeText: "关闭窗口",
                beforeClose: function () { $("body").removeClass("overflowhidden") }
            };
            $.extend(opts, options);
            $(this).click(function () {
                opts.sTop = $(window).scrollTop();
                var $tp = $(this).position().top + 35;
                var $top = 0;
                if (parseInt($(window).height() - ($tp - opts.sTop)) > opts.height) {
                    $top = $tp - opts.sTop + 35;
                } else {
                    $top = $(window).height() - opts.height + opts.sTop;
                }
                $.extend(opts, { position: { my: "center top", at: "center top+" + $top } });
                if ($("#" + opts.id).length > 0) {
                    $("#" + opts.id).html("").dialog("destroy");
                }
                $("body").addClass("overflowhidden");
                if ($("#" + opts.id).length == 0) {
                    var $div = $("<div/>");
                    $div.attr("id", opts.id);
                    var $style = "<style type=\"text/css\">.overflowhidden { overflow:hidden !important;}.ui-dialog-content { padding: 0px !important; margin-top:3px; overflow: hidden !important; border:1px solid #efefef !important; border-radius:3px; }.ui-dialog-titlebar{ font-size:12px !important;}</style>";
                    $(document.body).append($style).append($div);
                }
                var $iframe = $('<iframe frameborder="0" width="100%" height="100%" marginwidth="0" hspace="0" vspace="0" scrolling="auto" allowtransparency="true" />');
                $iframe.attr("src", opts.url).load(function () {
                    $("#" + opts.id + " iframe").contents().find("body").attr("iframeDialogId", opts.id);
                });
                $("#" + opts.id).html($iframe).dialog(opts);
                return false;
            });
        },
        iframeDialogClose: function (fn) {
            $(this).click(function () {
                setTimeout(function () {
                    window.parent.$("#" + $("body").attr("iframeDialogId")).dialog("close");
                    fn && fn.call(new Object());
                }, 1000);
            });
        }
    });
    $.extend({
        iframeDialog: function (options) {
            var opts = {
                title: "对话框",
                url: "",
                id: "iframeDialog",
                width: $(window).width() - 50,
                height: $(window).height() - 50,
                modal: true,
                closeText: "关闭窗口",
                beforeClose: function () { $("body").removeClass("overflowhidden") }
            };
            $.extend(opts, options);
            if ($("#" + opts.id).length > 0) {
                $("#" + opts.id).html("").dialog("destroy");
            }
            $("body").addClass("overflowhidden");
            if ($("#" + opts.id).length == 0) {
                var $div = $("<div/>");
                $div.attr("id", opts.id);
                var $style = "<style type=\"text/css\">.overflowhidden { overflow:hidden !important;}.ui-dialog-content { padding: 0px !important; margin-top:3px; overflow: hidden !important; border:1px solid #efefef !important; border-radius:3px; }.ui-dialog-titlebar{ font-size:12px !important;}</style>";
                $(document.body).append($style).append($div);
            }
            var $iframe = $('<iframe frameborder="0" width="100%" height="100%" marginwidth="0" hspace="0" vspace="0" scrolling="auto" allowtransparency="true" />');
            $iframe.attr("src", opts.url).load(function () {
                $("#" + opts.id + " iframe").contents().find("body").attr("iframeDialogId", opts.id);
            });
            $("#" + opts.id).html($iframe).dialog(opts);
            return false;
        },
        iframeDialogClose: function (fn) {
            setTimeout(function () {
                window.parent.$("#" + $("body").attr("iframeDialogId")).dialog("close");
                fn && fn.call(new Object());
            }, 1000);
        }
    });
})(jQuery);