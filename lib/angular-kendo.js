/**
 * Created by Terios on 12/11/13.
 */
/*! angular-kendo 0.6.0 2013-11-15 */
!function (a) {
    "use strict";
    a.module("kendo.directives", []), a.module("kendo.directives", [], ["$provide", function (b) {
        var c = [];
        a.forEach([kendo.ui, kendo.dataviz && kendo.dataviz.ui], function (b) {
            a.forEach(b, function (a, b) {
                b.match(/^[A-Z]/) && "Widget" !== b && c.push("kendo" + b)
            })
        }), b.value("kendoWidgets", c)
    }]), a.module("kendo.directives").provider("kendoDecorator", [function () {
        var b = this, c = "$kendoOptionsDecorators", d = {};
        b.addGlobalOptionsDecorator = function (b, c) {
            if (a.isString(b) && a.isFunction(c))return d[b] = d[b] || [], d[b].push(c), function () {
                d[b].splice(d[b].indexOf(c), 1)
            };
            throw new Error("Illegal Arguments")
        }, b.getGlobalOptionsDecorator = function (a) {
            return d[a] || []
        }, b.$get = [function () {
            function d(b) {
                var d = b.data(c);
                return a.isArray(d) || (d = [], b.data(c, d)), d
            }

            function e(a, b, c) {
                for (var d = 0; d < b.length; d++)b[d](a, c)
            }

            function f(a, d, f) {
                var g = b.getGlobalOptionsDecorator(d);
                e(a, g, f), g = a.data(c) || [], e(a, g, f)
            }

            function g(b, c) {
                if (a.isFunction(c)) {
                    var e = d(b);
                    return e.push(c), function () {
                        e.splice(e.indexOf(c), 1)
                    }
                }
            }

            return{getOptionsDecorator: d, addOptionsDecorator: g, decorateOptions: f}
        }]
    }]), a.module("kendo.directives").factory("widgetFactory", ["$parse", "$log", "kendoDecorator", function (b, c, d) {
        var e = {kDataSource: !0, kOptions: !0, kRebind: !0}, f = function (d, f, g, h, i) {
            var j = /k(On)?([A-Z].*)/;
            if (!e[h]) {
                var k, l, m = h.match(j);
                m && (k = m[2].charAt(0).toLowerCase() + m[2].slice(1), m[1] ? (l = b(i), g[k] = function (a) {
                    "$apply" === f.$root.$$phase || "$digest" === f.$root.$$phase ? l({kendoEvent: a}) : f.$apply(function () {
                        l(f, {kendoEvent: a})
                    })
                }) : (g[k] = a.copy(f.$eval(i)), void 0 === g[k] && i.match(/^\w*$/) && c.warn(d + "'s " + h + " attribute resolved to undefined. Maybe you meant to use a string literal like: '" + i + "'?")))
            }
        }, g = function (b, c, e, g) {
            var h = a.element.extend(!0, {}, b.$eval(e.kOptions));
            return a.forEach(e, function (a, c) {
                f(g, b, h, c, a)
            }), h.dataSource = c.inheritedData("$kendoDataSource") || h.dataSource, d.decorateOptions(c, g, h), h
        }, h = function (a, b, c, d) {
            var e = g(a, b, c, d);
            return b[d](e).data(d)
        };
        return{create: h}
    }]), a.module("kendo.directives").factory("directiveFactory", ["widgetFactory", "$timeout", "$parse", function (a, b, c) {
        function d(a, b, d, e) {
            if (d[e]) {
                var f = c(d[e]).assign;
                if (!f)throw new Error(e + " attribute used but expression in it is not assignable: " + d[e]);
                f(b, a)
            }
        }

        var e = null, f = function () {
            e = null
        }, g = function (c) {
            return{restrict: "ACE", transclude: !0, require: "?ngModel", scope: !1, controller: ["$scope", "$attrs", "$element", "$transclude", function (a, b, c, d) {
                d(function (a) {
                    c.append(a)
                })
            }], link: function (g, h, i, j) {
                var k;
                e || (e = b(f)), e.then(function () {
                    if (k = a.create(g, h, i, c), d(k, g, i, c), i.kRebind && g.$watch(i.kRebind, function (b, e) {
                        b !== e && (k = a.create(g, h, i, c), d(k, g, i, c))
                    }, !0), g.$on("$destroy", function () {
                        k.destroy()
                    }), j) {
                        if (!k.value)throw new Error("ng-model used but " + c + " does not define a value accessor");
                        j.$render = function () {
                            k.value(j.$viewValue || null)
                        }, void 0 !== k.value && k.value(j.$viewValue || null), k.bind("change", function () {
                            "$apply" === g.$root.$$phase || "$digest" === g.$root.$$phase ? j.$setViewValue(k.value()) : g.$apply(function () {
                                j.$setViewValue(k.value())
                            })
                        })
                    }
                })
            }}
        };
        return{create: g}
    }]), function (a) {
        var b = a.injector(["kendo.directives"]).get("kendoWidgets");
        a.forEach(b, function (b) {
            a.module("kendo.directives").directive(b, ["directiveFactory", function (a) {
                return a.create(b)
            }])
        })
    }(a), a.module("kendo.directives").directive("kDataSource", [function () {
        function a(a) {
            var b = ["TreeView"], c = ["Scheduler"];
            return-1 !== jQuery.inArray(a, b) ? "HierarchicalDataSource" : -1 !== jQuery.inArray(a, c) ? "SchedulerDataSource" : "DataSource"
        }

        function b(a) {
            for (var b in a)if (a.hasOwnProperty(b) && b.match(/kendo/))return b.replace("kendo", "")
        }

        function c(a, b) {
            return kendo.data[b].create(a)
        }

        return{restrict: "A", controller: ["$scope", "$attrs", "$element", function (d, e, f) {
            var g = b(e), h = a(g);
            f.data("$kendoDataSource", c(d.$eval(e.kDataSource), h)), d.$watch(e.kDataSource, function (a, b) {
                a !== b && f.data("$kendoDataSource", c(a, h))
            })
        }]}
    }]), a.module("kendo.directives").directive("kendoGrid", ["$compile", "kendoDecorator", "$parse", function (b, c, d) {
        function e(a, c, d) {
            var e = c.data("kendoGrid"), f = e.tbody.children("tr");
            f.each(function (c, f) {
                var g = a.$new();
                g.$index = c, g[d] = e.dataItem(f), b(f)(g)
            })
        }

        function f(b) {
            var c = b.data("kendoGrid").tbody.children("tr.ng-scope");
            c.each(function (b, c) {
                var d = a.element(c).scope();
                d.$destroy()
            })
        }

        function g(b, c) {
            return function (d, g) {
                var h = g.dataBinding, i = g.dataBound;
                g.dataBound = function () {
                    e(b, d, c), a.isFunction(i) && i()
                }, g.dataBinding = function () {
                    f(d), a.isFunction(h) && h()
                }
            }
        }

        function h(b, c) {
            return function (d, e) {
                e.change = function (d) {
                    var f, g, h, i, j, k, l = {kendoEvent: d};
                    a.isString(e.selectable) && (f = -1 !== e.selectable.indexOf("cell"), g = -1 !== e.selectable.indexOf("multiple")), h = l.selected = this.select(), i = l.data = [], j = l.columns = [];
                    for (var m = 0; m < h.length; m++) {
                        var n = this.dataItem(f ? h[m].parentNode : h[m]);
                        f ? (a.element.inArray(n, i) < 0 && i.push(n), k = a.element(h[m]).index(), a.element.inArray(k, j) < 0 && j.push(k)) : i.push(n)
                    }
                    g || (l.data = i[0], l.selected = h[0]), b.$apply(function () {
                        c(b, l)
                    })
                }
            }
        }

        return{restrict: "ACE", link: function (a, b, e) {
            c.addOptionsDecorator(b, g(a, "dataItem")), e.kOnChange && c.addOptionsDecorator(b, h(a, d(e.kOnChange)))
        }}
    }])
}(angular);