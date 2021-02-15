'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var MediumPost = function (_React$Component) {
    _inherits(MediumPost, _React$Component);

    function MediumPost(props) {
        _classCallCheck(this, MediumPost);

        var _this = _possibleConstructorReturn(this, (MediumPost.__proto__ || Object.getPrototypeOf(MediumPost)).call(this, props));

        _this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
        return _this;
    }

    _createClass(MediumPost, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            fetch(" https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40rajdeepdas.india&api_key=ouyqtkrmmakif82vhnzesowt4nepfun4ngpo0olk").then(function (res) {
                return res.json();
            }).then(function (result) {
                _this2.setState({
                    isLoaded: true,
                    items: result.items
                });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            function (error) {
                _this2.setState({
                    isLoaded: true,
                    error: error
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _state = this.state,
                error = _state.error,
                isLoaded = _state.isLoaded,
                items = _state.items;

            var recentItems = [];

            // use this loop wisely if you have less blog post than five(5)
            // otherwise app may raise error

            for (var i = 0; i < 5; i++) {
                recentItems.push(items[i]);
            }

            if (error) {
                return React.createElement(
                    "div",
                    null,
                    "Error: ",
                    error.message
                );
            } else if (!isLoaded) {
                return React.createElement(
                    "div",
                    null,
                    "Loading..."
                );
            } else {
                return React.createElement(
                    "ul",
                    { style: {
                            listStyleType: "none",
                            width: "100%",
                            padding: "0"
                        } },
                    recentItems.map(function (item) {
                        return React.createElement(
                            "a",
                            { style: { textDecoration: "none" }, href: item.link, key: item.title },
                            React.createElement(
                                "li",
                                { style: { marginTop: "5px" } },
                                item.title
                            )
                        );
                    })
                );
            }
        }
    }]);

    return MediumPost;
}(React.Component);

var domContainer = document.querySelector('#medium_blog_container');ReactDOM.render(e(MediumPost), domContainer);