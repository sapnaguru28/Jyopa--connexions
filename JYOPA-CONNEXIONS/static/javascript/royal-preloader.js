/*
|------------------------------------------|
| MelonHTML5 - Royal Preloader             |
|------------------------------------------|
| @author:  Lee Le (lee@melonhtml5.com)    |
| @version: 1.06 (06 March 2013)           |
| @website: www.melonhtml5.com             |
|------------------------------------------|
*/

window.requestAnimFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (e) {
        window.setTimeout(e, 1e3 / 60)
    }
}();
var Royal_Preloader = {
    _overlay: null,
    _overlay_bg: null,
    _loader: null,
    _name: null,
    _percentage: null,
    _text_loader: null,
    _text_loader_overlay: null,
    _logo_loader: null,
    _logo_loader_meter: null,
    _total: 0,
    _loaded: 0,
    _image_queue: [],
    _percentage_loaded: 0,
    _mode: function () {
        return "undefined" !== typeof Royal_Preloader && "undefined" !== typeof Royal_Preloader._mode ? Royal_Preloader._mode : "number"
    }(),
    _text: function () {
        return "undefined" !== typeof Royal_Preloader && "undefined" !== typeof Royal_Preloader._text ? Royal_Preloader._text : "loading..."
    }(),
    _opacity: function () {
        return "undefined" !== typeof Royal_Preloader && "undefined" !== typeof Royal_Preloader._opacity ? Royal_Preloader._opacity : 1
    }(),
    _images: function () {
        return "undefined" !== typeof Royal_Preloader && "undefined" !== typeof Royal_Preloader._images ? Royal_Preloader._images : {}
    }(),
    _show_info: function () {
        return "undefined" !== typeof Royal_Preloader && "undefined" !== typeof Royal_Preloader._show_info ? Royal_Preloader._show_info : !0
    }(),
    _show_percentage: function () {
        return "undefined" !== typeof Royal_Preloader && "undefined" !== typeof Royal_Preloader._show_percentage ? Royal_Preloader._show_percentage : !0
    }(),
    _background: function () {
        return "undefined" !== typeof Royal_Preloader && "undefined" !== typeof Royal_Preloader._background ? Royal_Preloader._background : ["#000000"]
    }(),
    _logo: function () {
        return "undefined" !== typeof Royal_Preloader && "undefined" !== typeof Royal_Preloader._logo ? Royal_Preloader._logo : "none"
    }(),
    _timeout: 10,
    _use_css_animation: !0,
    _css3SupportDetect: function () {
        var e = document.body.style;
        if ("string" == typeof e.transition)
            return Royal_Preloader._use_css_animation = !0;
        for (var t = ["Webkit", "Moz", "Khtml", "O", "ms"], n = 0; n < t.length; n++)
            if ("string" == typeof e[t[n] + "Transition"])
                return Royal_Preloader._use_css_animation = !0;
        return Royal_Preloader._use_css_animation = !1
    },
    _init: function () {
        Royal_Preloader._css3SupportDetect();
        Royal_Preloader._total = 0;
        jQuery.each(Royal_Preloader._images, function () {
            Royal_Preloader._total++
        });
        Royal_Preloader._build();
        Royal_Preloader._load()
    },
    _build: function () {
        this._overlay = jQuery("<div>").attr("id", "royal_preloader").addClass(this._mode);
        this._overlay_bg = jQuery("<div>").addClass("background").appendTo(this._overlay).css("background-color", this._background[0]);
        "number" === this._mode ? this._percentage = jQuery("<div>").addClass("percentage").appendTo(this._overlay) : "text" === this._mode ? (this._text_loader = jQuery("<div>").addClass("loader").text(this._text).appendTo(this._overlay),
            this._text_loader_overlay = jQuery("<div>").css("background-color", this._background[0]).appendTo(this._text_loader)) : (this._logo_loader = jQuery("<div>").css("background-image", 'url("' + this._logo + '")').addClass("loader").appendTo(this._overlay),
                this._logo_loader_meter = jQuery("<div>").css("background-color", this._background[0]).appendTo(this._logo_loader),
                this._percentage = jQuery("<div>").css("background-color", this._background[0]).addClass("percentage").appendTo(this._overlay),
                this._show_percentage || this._percentage.hide());
        1 !== this._opacity && (this._overlay_bg.css("opacity", this._opacity),
            jQuery(document.body).css("visibility", "visible"));
        this._overlay.appendTo(jQuery(document.body));
        "text" === this._mode && this._text_loader.css("margin-left", -1 * (this._text_loader.width() / 2))
    },
    _load: function () {
        if ("number" === this._mode || "logo" === this._mode)
            this._percentage.data("num", 0),
                this._show_percentage && this._percentage.text("0%");
        jQuery.each(this._images, function (e, t) {
            var n = function () {
                Royal_Preloader._imageOnLoad(e, t)
            }
                , r = new Image;
            r.onload = n;
            r.onerror = n;
            r.src = t
        });
        setTimeout(function () {
            Royal_Preloader._overlay && Royal_Preloader._animatePercentage(Royal_Preloader._percentage_loaded, 100)
        }, 1e3 * this._timeout)
    },
    _animatePercentage: function (e, t) {
        Royal_Preloader._percentage_loaded = e;
        e < t && (e++,
            setTimeout(function () {
                "number" === Royal_Preloader._mode ? Royal_Preloader._show_percentage && Royal_Preloader._percentage.text(e + "%") : "text" === Royal_Preloader._mode ? Royal_Preloader._text_loader_overlay.css("left", e + "%") : (Royal_Preloader._show_percentage && Royal_Preloader._percentage.text(e + "%"),
                    Royal_Preloader._logo_loader_meter.css("bottom", e + "%"));
                Royal_Preloader._animatePercentage(e, t)
            }, 5),
            100 === e && Royal_Preloader._loadFinish())
    },
    _animateName: function (e, t) {
        if ("number" === this._mode) {
            var n = this._name = jQuery("<div>").addClass("name").text(e).appendTo(this._overlay);
            requestAnimFrame(function () {
                n.css("transform", "rotateZ(" + parseInt(60 * Math.random() - 30) + "deg)")
            });
            this._use_css_animation ? this._overlay_bg.css("background-color", this._background[this._loaded % this._background.length]) : (this._name.css({
                opacity: 1,
                top: "50%"
            }),
                this._name.animate({
                    top: "20%",
                    opacity: 0
                }, 300),
                this._overlay_bg.animate({
                    backgroundColor: this._background[this._loaded % this._background.length]
                }, 300, "linear"))
        }
        setTimeout(function () {
            t()
        }, 300)
    },
    _imageOnLoad: function (e, t) {
        this._image_queue.push({
            name: e,
            image_src: t
        });
        this._image_queue.length && this._image_queue[0].image_src === t && this._processQueue()
    },
    _reQueue: function () {
        Royal_Preloader._image_queue.splice(0, 1);
        Royal_Preloader._processQueue()
    },
    _processQueue: function () {
        0 !== this._image_queue.length && (this._loaded++,
            Royal_Preloader._animatePercentage(Royal_Preloader._percentage_loaded, parseInt(100 * (this._loaded / this._total), 10)),
            this._show_info ? this._animateName(this._image_queue[0].name, this._reQueue) : this._reQueue())
    },
    _loadFinish: function () {
        this._use_css_animation ? (this._overlay.addClass("complete"),
            jQuery(document.body).removeClass("royal_loader")) : setTimeout(function () {
                Royal_Preloader._overlay.addClass("complete");
                jQuery(document.body).removeClass("royal_loader")
            }, 500);
        setTimeout(function () {
            Royal_Preloader._overlay.remove();
            Royal_Preloader._overlay = null
        }, 1e3)
    },
    config: function (e) {
        "undefined" !== typeof e.mode && (this._mode = e.mode);
        "undefined" !== typeof e.text && (this._text = e.text);
        "undefined" !== typeof e.timeout && (this._timeout = parseInt(e.timeout));
        "undefined" !== typeof e.showPercentage && (this._show_percentage = e.showPercentage ? !0 : !1);
        "undefined" !== typeof e.showInfo && (this._show_info = e.showInfo ? !0 : !1);
        "undefined" !== typeof e.background && (this._background = e.background);
        "undefined" !== typeof e.logo && (this._logo = e.logo);
        "undefined" !== typeof e.opacity && (this._opacity = e.opacity);
        "undefined" !== typeof e.images && (this._images = e.images,
            Royal_Preloader._total = 0,
            jQuery.each(this._images, function () {
                Royal_Preloader._total++
            }))
    }
};
jQuery(document).ready(Royal_Preloader._init)
