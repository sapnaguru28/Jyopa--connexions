/*! waitForImages jQuery Plugin 2013-07-20 */
!function (a) {
    var b = "waitForImages";
    a.waitForImages = {
        hasImageProperties: ["backgroundImage", "listStyleImage", "borderImage", "borderCornerImage", "cursor"]
    },
        a.expr[":"].uncached = function (b) {
            if (!a(b).is('img[src!=""]'))
                return !1;
            var c = new Image;
            return c.src = b.src,
                !c.complete
        }
        ,
        a.fn.waitForImages = function (c, d, e) {
            var f = 0
                , g = 0;
            if (a.isPlainObject(arguments[0]) && (e = arguments[0].waitForAll,
                d = arguments[0].each,
                c = arguments[0].finished),
                c = c || a.noop,
                d = d || a.noop,
                e = !!e,
                !a.isFunction(c) || !a.isFunction(d))
                throw new TypeError("An invalid callback was supplied.");
            return this.each(function () {
                var h = a(this)
                    , i = []
                    , j = a.waitForImages.hasImageProperties || []
                    , k = /url\(\s*(['"]?)(.*?)\1\s*\)/g;
                e ? h.find("*").addBack().each(function () {
                    var b = a(this);
                    b.is("img:uncached") && i.push({
                        src: b.attr("src"),
                        element: b[0]
                    }),
                        a.each(j, function (a, c) {
                            var d, e = b.css(c);
                            if (!e)
                                return !0;
                            for (; d = k.exec(e);)
                                i.push({
                                    src: d[2],
                                    element: b[0]
                                })
                        })
                }) : h.find("img:uncached").each(function () {
                    i.push({
                        src: this.src,
                        element: this
                    })
                }),
                    f = i.length,
                    g = 0,
                    0 === f && c.call(h[0]),
                    a.each(i, function (e, i) {
                        var j = new Image;
                        a(j).on("load." + b + " error." + b, function (a) {
                            return g++,
                                d.call(i.element, g, f, "load" == a.type),
                                g == f ? (c.call(h[0]),
                                    !1) : void 0
                        }),
                            j.src = i.src
                    })
            })
        }
}(jQuery);
