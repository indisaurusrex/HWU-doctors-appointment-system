"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _viewEngine = require("./config/viewEngine");

var _viewEngine2 = _interopRequireDefault(_viewEngine);

var _web = require("./routes/web");

var _web2 = _interopRequireDefault(_web);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _connectFlash = require("connect-flash");

var _connectFlash2 = _interopRequireDefault(_connectFlash);

var _cookieParser = require("cookie-parser");

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _session = require("./config/session");

var _session2 = _interopRequireDefault(_session);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("dotenv").config();


var app = (0, _express2.default)();

// config express cookie
app.use((0, _cookieParser2.default)('secret'));

// show flash messages 
app.use((0, _connectFlash2.default)());

// config body-parser to post data
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

//config view Engine
(0, _viewEngine2.default)(app);

// config app session
(0, _session2.default)(app);

// config passport middleware
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

//init all web routes
(0, _web2.default)(app);

var port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log("App is running at the port " + port);
});