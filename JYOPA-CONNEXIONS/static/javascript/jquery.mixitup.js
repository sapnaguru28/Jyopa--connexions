/*
* MIXITUP - A CSS3 and JQuery Filter & Sort Plugin
* Version: 1.5.4
* License: Creative Commons Attribution-NoDerivs 3.0 Unported - CC BY-ND 3.0
* http://creativecommons.org/licenses/by-nd/3.0/
* This software may be used freely on commercial and non-commercial projects with attribution to the author/copyright holder.
* Author: Patrick Kunka
* Copyright 2012-2013 Patrick Kunka, Barrel LLC, All Rights Reserved
* 
* http://mixitup.io
*/

(function (e) {
    function q(c, b, g, d, a) {
        function k() {
            l.unbind("webkitTransitionEnd transitionend otransitionend oTransitionEnd");
            b && w(b, g, d, a);
            a.startOrder = [];
            a.newOrder = [];
            a.origSort = [];
            a.checkSort = [];
            r.removeStyle(a.prefix + "filter, filter, " + a.prefix + "transform, transform, opacity, display").css(a.clean).removeAttr("data-checksum");
            window.atob || r.css({
                display: "none",
                opacity: "0"
            });
            l.removeStyle(a.prefix + "transition, transition, " + a.prefix + "perspective, perspective, " + a.prefix + "perspective-origin, perspective-origin, " + (a.resizeContainer ? "height" : ""));
            "list" == a.layoutMode ? (n.css({
                display: a.targetDisplayList,
                opacity: "1"
            }),
                a.origDisplay = a.targetDisplayList) : (n.css({
                    display: a.targetDisplayGrid,
                    opacity: "1"
                }),
                    a.origDisplay = a.targetDisplayGrid);
            a.origLayout = a.layoutMode;
            setTimeout(function () {
                r.removeStyle(a.prefix + "transition, transition");
                a.mixing = !1;
                if ("function" == typeof a.onMixEnd) {
                    var b = a.onMixEnd.call(this, a);
                    a = b ? b : a
                }
            })
        }
        clearInterval(a.failsafe);
        a.mixing = !0;
        a.filter = c;
        if ("function" == typeof a.onMixStart) {
            var f = a.onMixStart.call(this, a);
            a = f ? f : a
        }
        for (var h = a.transitionSpeed, f = 0; 2 > f; f++) {
            var j = 0 == f ? j = a.prefix : "";
            a.transition[j + "transition"] = "all " + h + "ms linear";
            a.transition[j + "transform"] = j + "translate3d(0,0,0)";
            a.perspective[j + "perspective"] = a.perspectiveDistance + "px";
            a.perspective[j + "perspective-origin"] = a.perspectiveOrigin
        }
        var s = a.targetSelector
            , r = d.find(s);
        r.each(function () {
            this.data = {}
        });
        var l = r.parent();
        l.css(a.perspective);
        a.easingFallback = "ease-in-out";
        "smooth" == a.easing && (a.easing = "cubic-bezier(0.25, 0.46, 0.45, 0.94)");
        "snap" == a.easing && (a.easing = "cubic-bezier(0.77, 0, 0.175, 1)");
        "windback" == a.easing && (a.easing = "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
            a.easingFallback = "cubic-bezier(0.175, 0.885, 0.320, 1)");
        "windup" == a.easing && (a.easing = "cubic-bezier(0.6, -0.28, 0.735, 0.045)",
            a.easingFallback = "cubic-bezier(0.6, 0.28, 0.735, 0.045)");
        f = "list" == a.layoutMode && null != a.listEffects ? a.listEffects : a.effects;
        Array.prototype.indexOf && (a.fade = -1 < f.indexOf("fade") ? "0" : "",
            a.scale = -1 < f.indexOf("scale") ? "scale(.01)" : "",
            a.rotateZ = -1 < f.indexOf("rotateZ") ? "rotate(180deg)" : "",
            a.rotateY = -1 < f.indexOf("rotateY") ? "rotateY(90deg)" : "",
            a.rotateX = -1 < f.indexOf("rotateX") ? "rotateX(90deg)" : "",
            a.blur = -1 < f.indexOf("blur") ? "blur(8px)" : "",
            a.grayscale = -1 < f.indexOf("grayscale") ? "grayscale(100%)" : "");
        var n = e()
            , t = e()
            , u = []
            , q = !1;
        "string" === typeof c ? u = y(c) : (q = !0,
            e.each(c, function (a) {
                u[a] = y(this)
            }));
        "or" == a.filterLogic ? ("" == u[0] && u.shift(),
            1 > u.length ? t = t.add(d.find(s + ":visible")) : r.each(function () {
                var a = e(this);
                if (q) {
                    var b = 0;
                    e.each(u, function () {
                        this.length ? a.is("." + this.join(", .")) && b++ : 0 < b && b++
                    });
                    b == u.length ? n = n.add(a) : t = t.add(a)
                } else
                    a.is("." + u.join(", .")) ? n = n.add(a) : t = t.add(a)
            })) : (n = n.add(l.find(s + "." + u.join("."))),
                t = t.add(l.find(s + ":not(." + u.join(".") + "):visible")));
        c = n.length;
        var v = e()
            , p = e()
            , m = e();
        t.each(function () {
            var a = e(this);
            "none" != a.css("display") && (v = v.add(a),
                m = m.add(a))
        });
        if (n.filter(":visible").length == c && !v.length && !b) {
            if (a.origLayout == a.layoutMode)
                return k(),
                    !1;
            if (1 == n.length)
                return "list" == a.layoutMode ? (d.addClass(a.listClass),
                    d.removeClass(a.gridClass),
                    m.css("display", a.targetDisplayList)) : (d.addClass(a.gridClass),
                        d.removeClass(a.listClass),
                        m.css("display", a.targetDisplayGrid)),
                    k(),
                    !1
        }
        a.origHeight = l.height();
        if (n.length) {
            d.removeClass(a.failClass);
            n.each(function () {
                var a = e(this);
                "none" == a.css("display") ? p = p.add(a) : m = m.add(a)
            });
            if (a.origLayout != a.layoutMode && !1 == a.animateGridList)
                return "list" == a.layoutMode ? (d.addClass(a.listClass),
                    d.removeClass(a.gridClass),
                    m.css("display", a.targetDisplayList)) : (d.addClass(a.gridClass),
                        d.removeClass(a.listClass),
                        m.css("display", a.targetDisplayGrid)),
                    k(),
                    !1;
            if (!window.atob)
                return k(),
                    !1;
            r.css(a.clean);
            m.each(function () {
                this.data.origPos = e(this).offset()
            });
            "list" == a.layoutMode ? (d.addClass(a.listClass),
                d.removeClass(a.gridClass),
                p.css("display", a.targetDisplayList)) : (d.addClass(a.gridClass),
                    d.removeClass(a.listClass),
                    p.css("display", a.targetDisplayGrid));
            p.each(function () {
                this.data.showInterPos = e(this).offset()
            });
            v.each(function () {
                this.data.hideInterPos = e(this).offset()
            });
            m.each(function () {
                this.data.preInterPos = e(this).offset()
            });
            "list" == a.layoutMode ? m.css("display", a.targetDisplayList) : m.css("display", a.targetDisplayGrid);
            b && w(b, g, d, a);
            if (c = b)
                a: if (c = a.origSort,
                    f = a.checkSort,
                    c.length != f.length)
                    c = !1;
                else {
                    for (j = 0; j < f.length; j++)
                        if (c[j].compare && !c[j].compare(f[j]) || c[j] !== f[j]) {
                            c = !1;
                            break a
                        }
                    c = !0
                }
            if (c)
                return k(),
                    !1;
            v.hide();
            p.each(function () {
                this.data.finalPos = e(this).offset()
            });
            m.each(function () {
                this.data.finalPrePos = e(this).offset()
            });
            a.newHeight = l.height();
            b && w("reset", null, d, a);
            p.hide();
            m.css("display", a.origDisplay);
            "block" == a.origDisplay ? (d.addClass(a.listClass),
                p.css("display", a.targetDisplayList)) : (d.removeClass(a.listClass),
                    p.css("display", a.targetDisplayGrid));
            a.resizeContainer && l.css("height", a.origHeight + "px");
            c = {};
            for (f = 0; 2 > f; f++)
                j = 0 == f ? j = a.prefix : "",
                    c[j + "transform"] = a.scale + " " + a.rotateX + " " + a.rotateY + " " + a.rotateZ,
                    c[j + "filter"] = a.blur + " " + a.grayscale;
            p.css(c);
            m.each(function () {
                var b = this.data
                    , c = e(this);
                c.hasClass("mix_tohide") ? (b.preTX = b.origPos.left - b.hideInterPos.left,
                    b.preTY = b.origPos.top - b.hideInterPos.top) : (b.preTX = b.origPos.left - b.preInterPos.left,
                        b.preTY = b.origPos.top - b.preInterPos.top);
                for (var d = {}, f = 0; 2 > f; f++) {
                    var j = 0 == f ? j = a.prefix : "";
                    d[j + "transform"] = "translate(" + b.preTX + "px," + b.preTY + "px)"
                }
                c.css(d)
            });
            "list" == a.layoutMode ? (d.addClass(a.listClass),
                d.removeClass(a.gridClass)) : (d.addClass(a.gridClass),
                    d.removeClass(a.listClass));
            setTimeout(function () {
                if (a.resizeContainer) {
                    for (var b = {}, c = 0; 2 > c; c++) {
                        var d = 0 == c ? d = a.prefix : "";
                        b[d + "transition"] = "all " + h + "ms ease-in-out";
                        b.height = a.newHeight + "px"
                    }
                    l.css(b)
                }
                v.css("opacity", a.fade);
                p.css("opacity", 1);
                p.each(function () {
                    var b = this.data;
                    b.tX = b.finalPos.left - b.showInterPos.left;
                    b.tY = b.finalPos.top - b.showInterPos.top;
                    for (var c = {}, d = 0; 2 > d; d++) {
                        var f = 0 == d ? f = a.prefix : "";
                        c[f + "transition-property"] = f + "transform, " + f + "filter, opacity";
                        c[f + "transition-timing-function"] = a.easing + ", linear, linear";
                        c[f + "transition-duration"] = h + "ms";
                        c[f + "transition-delay"] = "0";
                        c[f + "transform"] = "translate(" + b.tX + "px," + b.tY + "px)";
                        c[f + "filter"] = "none"
                    }
                    e(this).css("-webkit-transition", "all " + h + "ms " + a.easingFallback).css(c)
                });
                m.each(function () {
                    var b = this.data;
                    b.tX = 0 != b.finalPrePos.left ? b.finalPrePos.left - b.preInterPos.left : 0;
                    b.tY = 0 != b.finalPrePos.left ? b.finalPrePos.top - b.preInterPos.top : 0;
                    for (var c = {}, d = 0; 2 > d; d++) {
                        var f = 0 == d ? f = a.prefix : "";
                        c[f + "transition"] = "all " + h + "ms " + a.easing;
                        c[f + "transform"] = "translate(" + b.tX + "px," + b.tY + "px)"
                    }
                    e(this).css("-webkit-transition", "all " + h + "ms " + a.easingFallback).css(c)
                });
                b = {};
                for (c = 0; 2 > c; c++)
                    d = 0 == c ? d = a.prefix : "",
                        b[d + "transition"] = "all " + h + "ms " + a.easing + ", " + d + "filter " + h + "ms linear, opacity " + h + "ms linear",
                        b[d + "transform"] = a.scale + " " + a.rotateX + " " + a.rotateY + " " + a.rotateZ,
                        b[d + "filter"] = a.blur + " " + a.grayscale,
                        b.opacity = a.fade;
                v.css(b);
                l.bind("webkitTransitionEnd transitionend otransitionend oTransitionEnd", function (b) {
                    if (-1 < b.originalEvent.propertyName.indexOf("transform") || -1 < b.originalEvent.propertyName.indexOf("opacity"))
                        -1 < s.indexOf(".") ? e(b.target).hasClass(s.replace(".", "")) && k() : e(b.target).is(s) && k()
                })
            }, 10);
            a.failsafe = setTimeout(function () {
                a.mixing && k()
            }, h + 400)
        } else {
            a.resizeContainer && l.css("height", a.origHeight + "px");
            if (!window.atob)
                return k(),
                    !1;
            v = t;
            setTimeout(function () {
                l.css(a.perspective);
                if (a.resizeContainer) {
                    for (var b = {}, c = 0; 2 > c; c++) {
                        var e = 0 == c ? e = a.prefix : "";
                        b[e + "transition"] = "height " + h + "ms ease-in-out";
                        b.height = a.minHeight + "px"
                    }
                    l.css(b)
                }
                r.css(a.transition);
                if (t.length) {
                    b = {};
                    for (c = 0; 2 > c; c++)
                        e = 0 == c ? e = a.prefix : "",
                            b[e + "transform"] = a.scale + " " + a.rotateX + " " + a.rotateY + " " + a.rotateZ,
                            b[e + "filter"] = a.blur + " " + a.grayscale,
                            b.opacity = a.fade;
                    v.css(b);
                    l.bind("webkitTransitionEnd transitionend otransitionend oTransitionEnd", function (b) {
                        if (-1 < b.originalEvent.propertyName.indexOf("transform") || -1 < b.originalEvent.propertyName.indexOf("opacity"))
                            d.addClass(a.failClass),
                                k()
                    })
                } else
                    a.mixing = !1
            }, 10)
        }
    }
    function w(c, b, g, d) {
        function a(b, a) {
            var d = isNaN(1 * b.attr(c)) ? b.attr(c).toLowerCase() : 1 * b.attr(c)
                , e = isNaN(1 * a.attr(c)) ? a.attr(c).toLowerCase() : 1 * a.attr(c);
            return d < e ? -1 : d > e ? 1 : 0
        }
        function k(a) {
            "asc" == b ? f.prepend(a).prepend(" ") : f.append(a).append(" ")
        }
        g.find(d.targetSelector).wrapAll('<div class="mix_sorter"/>');
        var f = g.find(".mix_sorter");
        d.origSort.length || f.find(d.targetSelector + ":visible").each(function () {
            e(this).wrap("<s/>");
            d.origSort.push(e(this).parent().html().replace(/\s+/g, ""));
            e(this).unwrap()
        });
        f.empty();
        if ("reset" == c)
            e.each(d.startOrder, function () {
                f.append(this).append(" ")
            });
        else if ("default" == c)
            e.each(d.origOrder, function () {
                k(this)
            });
        else if ("random" == c) {
            if (!d.newOrder.length) {
                for (var h = d.startOrder.slice(), j = h.length, s = j; s--;) {
                    var r = parseInt(Math.random() * j)
                        , l = h[s];
                    h[s] = h[r];
                    h[r] = l
                }
                d.newOrder = h
            }
            e.each(d.newOrder, function () {
                f.append(this).append(" ")
            })
        } else if ("custom" == c)
            e.each(b, function () {
                k(this)
            });
        else {
            if ("undefined" === typeof d.origOrder[0].attr(c))
                return console.log("No such attribute found. Terminating"),
                    !1;
            d.newOrder.length || (e.each(d.origOrder, function () {
                d.newOrder.push(e(this))
            }),
                d.newOrder.sort(a));
            e.each(d.newOrder, function () {
                k(this)
            })
        }
        d.checkSort = [];
        f.find(d.targetSelector + ":visible").each(function (b) {
            var a = e(this);
            0 == b && a.attr("data-checksum", "1");
            a.wrap("<s/>");
            d.checkSort.push(a.parent().html().replace(/\s+/g, ""));
            a.unwrap()
        });
        g.find(d.targetSelector).unwrap()
    }
    function y(c) {
        c = c.replace(/\s{2,}/g, " ");
        var b = c.split(" ");
        e.each(b, function (c) {
            "all" == this && (b[c] = "mix_all")
        });
        "" == b[0] && b.shift();
        return b
    }
    var x = {
        init: function (c) {
            return this.each(function () {
                var b = {
                    targetSelector: ".mix",
                    filterSelector: ".filter",
                    sortSelector: ".sort",
                    buttonEvent: "click",
                    effects: ["fade", "scale"],
                    listEffects: null,
                    easing: "smooth",
                    layoutMode: "grid",
                    targetDisplayGrid: "inline-block",
                    targetDisplayList: "block",
                    listClass: "",
                    gridClass: "",
                    transitionSpeed: 600,
                    showOnLoad: "all",
                    sortOnLoad: !1,
                    multiFilter: !1,
                    filterLogic: "or",
                    resizeContainer: !0,
                    minHeight: 0,
                    failClass: "fail",
                    perspectiveDistance: "3000",
                    perspectiveOrigin: "50% 50%",
                    animateGridList: !0,
                    onMixLoad: null,
                    onMixStart: null,
                    onMixEnd: null,
                    container: null,
                    origOrder: [],
                    startOrder: [],
                    newOrder: [],
                    origSort: [],
                    checkSort: [],
                    filter: "",
                    mixing: !1,
                    origDisplay: "",
                    origLayout: "",
                    origHeight: 0,
                    newHeight: 0,
                    isTouch: !1,
                    resetDelay: 0,
                    failsafe: null,
                    prefix: "",
                    easingFallback: "ease-in-out",
                    transition: {},
                    perspective: {},
                    clean: {},
                    fade: "1",
                    scale: "",
                    rotateX: "",
                    rotateY: "",
                    rotateZ: "",
                    blur: "",
                    grayscale: ""
                };
                c && e.extend(b, c);
                this.config = b;
                e.support.touch = "ontouchend" in document;
                e.support.touch && (b.isTouch = !0,
                    b.resetDelay = 350);
                b.container = e(this);
                var g = b.container, d;
                a: {
                    d = g[0];
                    for (var a = ["Webkit", "Moz", "O", "ms"], k = 0; k < a.length; k++)
                        if (a[k] + "Transition" in d.style) {
                            d = a[k];
                            break a
                        }
                    d = "transition" in d.style ? "" : !1
                }
                b.prefix = d;
                b.prefix = b.prefix ? "-" + b.prefix.toLowerCase() + "-" : "";
                g.find(b.targetSelector).each(function () {
                    b.origOrder.push(e(this))
                });
                if (b.sortOnLoad) {
                    var f;
                    e.isArray(b.sortOnLoad) ? (d = b.sortOnLoad[0],
                        f = b.sortOnLoad[1],
                        e(b.sortSelector + "[data-sort=" + b.sortOnLoad[0] + "][data-order=" + b.sortOnLoad[1] + "]").addClass("active")) : (e(b.sortSelector + "[data-sort=" + b.sortOnLoad + "]").addClass("active"),
                            d = b.sortOnLoad,
                            b.sortOnLoad = "desc");
                    w(d, f, g, b)
                }
                for (f = 0; 2 > f; f++)
                    d = 0 == f ? d = b.prefix : "",
                        b.transition[d + "transition"] = "all " + b.transitionSpeed + "ms ease-in-out",
                        b.perspective[d + "perspective"] = b.perspectiveDistance + "px",
                        b.perspective[d + "perspective-origin"] = b.perspectiveOrigin;
                for (f = 0; 2 > f; f++)
                    d = 0 == f ? d = b.prefix : "",
                        b.clean[d + "transition"] = "none";
                "list" == b.layoutMode ? (g.addClass(b.listClass),
                    b.origDisplay = b.targetDisplayList) : (g.addClass(b.gridClass),
                        b.origDisplay = b.targetDisplayGrid);
                b.origLayout = b.layoutMode;
                f = b.showOnLoad.split(" ");
                e.each(f, function () {
                    e(b.filterSelector + '[data-filter="' + this + '"]').addClass("active")
                });
                g.find(b.targetSelector).addClass("mix_all");
                "all" == f[0] && (f[0] = "mix_all",
                    b.showOnLoad = "mix_all");
                var h = e();
                e.each(f, function () {
                    h = h.add(e("." + this))
                });
                h.each(function () {
                    var a = e(this);
                    "list" == b.layoutMode ? a.css("display", b.targetDisplayList) : a.css("display", b.targetDisplayGrid);
                    a.css(b.transition)
                });
                setTimeout(function () {
                    b.mixing = !0;
                    h.css("opacity", "1");
                    setTimeout(function () {
                        "list" == b.layoutMode ? h.removeStyle(b.prefix + "transition, transition").css({
                            display: b.targetDisplayList,
                            opacity: 1
                        }) : h.removeStyle(b.prefix + "transition, transition").css({
                            display: b.targetDisplayGrid,
                            opacity: 1
                        });
                        b.mixing = !1;
                        if ("function" == typeof b.onMixLoad) {
                            var a = b.onMixLoad.call(this, b);
                            b = a ? a : b
                        }
                    }, b.transitionSpeed)
                }, 10);
                b.filter = b.showOnLoad;
                e(b.sortSelector).bind(b.buttonEvent, function () {
                    if (!b.mixing) {
                        var a = e(this)
                            , c = a.attr("data-sort")
                            , d = a.attr("data-order");
                        if (a.hasClass("active")) {
                            if ("random" != c)
                                return !1
                        } else
                            e(b.sortSelector).removeClass("active"),
                                a.addClass("active");
                        g.find(b.targetSelector).each(function () {
                            b.startOrder.push(e(this))
                        });
                        q(b.filter, c, d, g, b)
                    }
                });
                e(b.filterSelector).bind(b.buttonEvent, function () {
                    if (!b.mixing) {
                        var a = e(this);
                        if (!1 == b.multiFilter)
                            e(b.filterSelector).removeClass("active"),
                                a.addClass("active"),
                                b.filter = a.attr("data-filter"),
                                e(b.filterSelector + '[data-filter="' + b.filter + '"]').addClass("active");
                        else {
                            var c = a.attr("data-filter");
                            a.hasClass("active") ? (a.removeClass("active"),
                                b.filter = b.filter.replace(RegExp("(\\s|^)" + c), "")) : (a.addClass("active"),
                                    b.filter = b.filter + " " + c)
                        }
                        q(b.filter, null, null, g, b)
                    }
                })
            })
        },
        toGrid: function () {
            return this.each(function () {
                var c = this.config;
                "grid" != c.layoutMode && (c.layoutMode = "grid",
                    q(c.filter, null, null, e(this), c))
            })
        },
        toList: function () {
            return this.each(function () {
                var c = this.config;
                "list" != c.layoutMode && (c.layoutMode = "list",
                    q(c.filter, null, null, e(this), c))
            })
        },
        filter: function (c) {
            return this.each(function () {
                var b = this.config;
                b.mixing || (e(b.filterSelector).removeClass("active"),
                    e(b.filterSelector + '[data-filter="' + c + '"]').addClass("active"),
                    q(c, null, null, e(this), b))
            })
        },
        sort: function (c) {
            return this.each(function () {
                var b = this.config
                    , g = e(this);
                if (!b.mixing) {
                    e(b.sortSelector).removeClass("active");
                    if (e.isArray(c)) {
                        var d = c[0]
                            , a = c[1];
                        e(b.sortSelector + '[data-sort="' + c[0] + '"][data-order="' + c[1] + '"]').addClass("active")
                    } else
                        e(b.sortSelector + '[data-sort="' + c + '"]').addClass("active"),
                            d = c,
                            a = "desc";
                    g.find(b.targetSelector).each(function () {
                        b.startOrder.push(e(this))
                    });
                    q(b.filter, d, a, g, b)
                }
            })
        },
        multimix: function (c) {
            return this.each(function () {
                var b = this.config
                    , g = e(this);
                multiOut = {
                    filter: b.filter,
                    sort: null,
                    order: "desc",
                    layoutMode: b.layoutMode
                };
                e.extend(multiOut, c);
                b.mixing || (e(b.filterSelector).add(b.sortSelector).removeClass("active"),
                    e(b.filterSelector + '[data-filter="' + multiOut.filter + '"]').addClass("active"),
                    "undefined" !== typeof multiOut.sort && (e(b.sortSelector + '[data-sort="' + multiOut.sort + '"][data-order="' + multiOut.order + '"]').addClass("active"),
                        g.find(b.targetSelector).each(function () {
                            b.startOrder.push(e(this))
                        })),
                    b.layoutMode = multiOut.layoutMode,
                    q(multiOut.filter, multiOut.sort, multiOut.order, g, b))
            })
        },
        remix: function (c) {
            return this.each(function () {
                var b = this.config
                    , g = e(this);
                b.origOrder = [];
                g.find(b.targetSelector).each(function () {
                    var c = e(this);
                    c.addClass("mix_all");
                    b.origOrder.push(c)
                });
                !b.mixing && "undefined" !== typeof c && (e(b.filterSelector).removeClass("active"),
                    e(b.filterSelector + '[data-filter="' + c + '"]').addClass("active"),
                    q(c, null, null, g, b))
            })
        }
    };
    e.fn.mixitup = function (c, b) {
        if (x[c])
            return x[c].apply(this, Array.prototype.slice.call(arguments, 1));
        if ("object" === typeof c || !c)
            return x.init.apply(this, arguments)
    }
        ;
    e.fn.removeStyle = function (c) {
        return this.each(function () {
            var b = e(this);
            c = c.replace(/\s+/g, "");
            var g = c.split(",");
            e.each(g, function () {
                var c = RegExp(this.toString() + "[^;]+;?", "g");
                b.attr("style", function (a, b) {
                    if (b)
                        return b.replace(c, "")
                })
            })
        })
    }
}
)(jQuery);
