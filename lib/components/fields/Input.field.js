"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputField = void 0;
var classnames_1 = require("classnames");
var React = require("react");
var InputField = function (props) {
    var formRef = props.formRef, label = props.label, subLabel = props.subLabel, name = props.name, _a = props.disabled, disabled = _a === void 0 ? false : _a, _b = props.wrapperClasses, classes = _b === void 0 ? "" : _b, _c = props.validationErrorLabel, validationErrorLabel = _c === void 0 ? "A validation error has occurred" : _c, inputProps = __rest(props, ["formRef", "label", "subLabel", "name", "disabled", "wrapperClasses", "validationErrorLabel"]);
    var errors = formRef.formState.errors, register = formRef.register;
    var wrapperClasses = classnames_1.default(classes, {
        "opacity-40 pointer-events-none": disabled
    });
    return (React.createElement("div", { className: wrapperClasses },
        React.createElement("label", { htmlFor: name, className: "block text-sm font-medium text-gray-900" },
            label,
            React.createElement("div", { className: "mt-1" },
                React.createElement("input", __assign({}, register(name), { id: name }, inputProps, { className: "input" })))),
        errors[name] && React.createElement("p", { className: "mt-2 text-sm text-red-500" },
            "* ",
            errors[name].message || name + ": " + validationErrorLabel + "."),
        subLabel && React.createElement("p", { className: "mt-2 text-xs text-gray-500" }, subLabel)));
};
exports.InputField = InputField;
exports.default = exports.InputField;
//# sourceMappingURL=Input.field.js.map