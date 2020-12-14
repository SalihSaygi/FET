"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var react_1 = require("react");
var FormUserDetails_1 = require("./FormUserDetails");
var FormPersonalDetails_1 = require("./FormPersonalDetails");
var Confirm_1 = require("./Confirm");
var Success_1 = require("./Success");
var Stepper_1 = require("@material-ui/core/Stepper");
var Step_1 = require("@material-ui/core/Step");
var StepLabel_1 = require("@material-ui/core/StepLabel");
var Button_1 = require("@material-ui/core/Button");
var Typography_1 = require("@material-ui/core/Typography");
var styles_1 = require("@material-ui/core/styles");
var prop_types_1 = require("prop-types");
// import { login } from "../utils/login";
var styles = function (theme) { return ({
    root: {
        width: '100%'
    },
    backButton: {
        marginRight: theme.spacing(1)
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}); };
var Register = /** @class */ (function (_super) {
    __extends(Register, _super);
    function Register() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            step: 1,
            nickname: '',
            firstName: '',
            lastName: '',
            password: '',
            email: '',
            phoneNumber: '',
            adress: '',
            profilePhoto: '',
            age: '',
            pronouns: '',
            bio: ''
        };
        // Proceed to next step
        _this.nextStep = function () {
            var step = _this.state.step;
            _this.setState({
                step: step + 1
            });
        };
        // Go back to prev step
        _this.prevStep = function () {
            var step = _this.state.step;
            _this.setState({
                step: step - 1
            });
        };
        _this.resetStep = function () {
            var step = _this.state.step;
            _this.setState({
                step: 1
            });
        };
        // Handle fields change
        _this.handleChange = function (input) { return function (e) {
            var _a;
            _this.setState((_a = {}, _a[input] = e.target.value, _a));
        }; };
        return _this;
    }
    Register.prototype.getStepLabels = function () {
        return ['Required User Details', 'Optional User Details', 'Confirm'];
    };
    Register.prototype.getStepContent = function (step) {
        switch (step) {
            case 1:
                return (react_1["default"].createElement(FormUserDetails_1["default"], { nextStep: this.nextStep, handleChange: this.handleChange, values: this.state.values }));
            case 2:
                return (react_1["default"].createElement(FormPersonalDetails_1["default"], { nextStep: this.nextStep, prevStep: this.prevStep, handleChange: this.handleChange, values: this.state.values }));
            case 3:
                return (react_1["default"].createElement(Confirm_1["default"], { nextStep: this.nextStep, prevStep: this.prevStep, values: this.state.values }));
            case 4:
                return react_1["default"].createElement(Success_1["default"], null);
            default:
                return 'Unknown Index';
        }
    };
    Register.prototype.render = function () {
        var _a = this.state, nickname = _a.nickname, firstName = _a.firstName, lastName = _a.lastName, password = _a.password, email = _a.email, phoneNumber = _a.phoneNumber, adress = _a.adress, profilePhoto = _a.profilePhoto, age = _a.age, pronouns = _a.pronouns, bio = _a.bio;
        var values = { nickname: nickname, firstName: firstName, lastName: lastName, password: password, email: email, phoneNumber: phoneNumber, adress: adress, profilePhoto: profilePhoto, age: age, pronouns: pronouns, bio: bio };
        var classes = this.props.classes;
        var step = this.state.step;
        var steps = this.getStepLabels();
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(Stepper_1["default"], { activeStep: step, alternativeLabel: true }, steps.map(function (label) { return (react_1["default"].createElement(Step_1["default"], { key: label },
                react_1["default"].createElement(StepLabel_1["default"], null, label))); })),
            react_1["default"].createElement("div", null, step === steps.length ? (react_1["default"].createElement("div", null,
                react_1["default"].createElement(Typography_1["default"], { className: classes.instructions }, "All steps completed"),
                react_1["default"].createElement(Button_1["default"], { onClick: this.resetStep }, "Reset"))) : (react_1["default"].createElement("div", null,
                react_1["default"].createElement(Typography_1["default"], { className: classes.instructions }, this.getStepContent(step)),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement(Button_1["default"], { disabled: step === 0, onClick: this.prevStep, className: classes.backButton }, "Back"),
                    react_1["default"].createElement(Button_1["default"], { variant: "contained", color: "primary", onClick: this.nextStep }, step === steps.length - 1 ? 'Finish' : 'Next')))))));
    };
    return Register;
}(react_1.Component));
Register.propTypes = {
    classes: prop_types_1["default"].object.isRequired
};
exports["default"] = styles_1.withStyles(styles)(Register);
