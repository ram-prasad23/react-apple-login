/**
 * npm i react-apple-login is the package for the reference of this code.
 * We have made a small change so that the apple button can be called twice on a single page
 * for the tutor and user. The change is we pass id of the div element to the apple button.
 * For reference how apple authentication works on react refer this --> "https://medium.com/@ertemishakk/sign-in-with-apple-using-react-and-nodejs-b3a19671184d"
 */


import React from "react";

const MyAppleLogin = (props) => {
    var _this = undefined;
    var clientId = props.clientId,
        redirectURI = props.redirectURI,
        _a = props.state,
        state = _a === void 0 ? "" : _a,
        render = props.render,
        _b = props.designProp,
        designProp = _b === void 0 ? {
            locale: "en_US"
        } : _b,
        _c = props.responseMode,
        responseMode = _c === void 0 ? "query" : _c,
        _d = props.responseType,
        responseType = _d === void 0 ? "code" : _d,
        nonce = props.nonce,
        callback = props.callback,
        scope = props.scope,
        _e = props.autoLoad,
        autoLoad = _e === void 0 ? false : _e,
        _f = props.usePopup,
        usePopup = _f === void 0 ? false : _f;

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }


    var generateQueryString = function (q) {
        var queryString = '';
        if (q) {
            var queryKeys = Object.keys(q);
            queryKeys.forEach(function (key) {
                if (q[key]) {
                    if (q[key].toString().length) {
                        queryString += key + "=" + q[key] + "&";
                    }
                }
            });
            if (queryKeys.length > 0 && queryString[queryString.length - 1] === '&') {
                queryString = queryString.slice(0, -1);
            }
        }
        return queryString;
    };


    var onClick = function (e) {
        if (e === void 0) { e = null; }
        return __awaiter(_this, void 0, void 0, function () {
            var data, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (e) {
                            e.preventDefault();
                        }
                        if (!!usePopup) return [3 /*break*/, 1];
                        window.location.href = "https://appleid.apple.com/auth/authorize?" + generateQueryString({
                            response_type: responseType,
                            response_mode: responseMode,
                            client_id: clientId,
                            redirect_uri: encodeURIComponent(redirectURI),
                            state: state,
                            nonce: nonce,
                            scope: responseMode === "query" ? "" : scope
                        });
                        return [3 /*break*/, 4];
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, window.AppleID.auth.signIn()];
                    case 2:
                        data = _a.sent();
                        if (typeof callback === "function" && data) {
                            callback(data);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        if (typeof callback === "function") {
                            callback({ error: err_1 });
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };

    React.useEffect(function () {
        if (!usePopup) {
            if (autoLoad) {
                onClick();
            }
            if (typeof callback === "function" &&
                responseMode === "query" &&
                responseType === "code" &&
                window &&
                window.location) {
                var match = void 0;
                var pl_1 = /\+/g, // Regex for replacing addition symbol with a space
                    search = /([^&=]+)=?([^&]*)/g, decode = function (s) {
                        return decodeURIComponent(s.replace(pl_1, " "));
                    }, query = window.location.search.substring(1);
                var urlParams = {};
                while ((match = search.exec(query))) {
                    urlParams[decode(match[1])] = decode(match[2]);
                }
                if (urlParams["code"]) {
                    callback({
                        code: urlParams["code"]
                    });
                }
            }
        }
        return function () { };
    }, []);
    React.useEffect(function () {
        if (usePopup) {
            window.AppleID.auth.init({
                clientId: clientId,
                scope: scope,
                redirectURI: redirectURI,
                state: state,
                nonce: nonce,
                usePopup: usePopup
            });
            // Call on auto load.
            if (autoLoad) {
                onClick();
            }
        }
        return function () { };
    }, [ usePopup]);
    if (typeof render === "function") {
        return render({ onClick: onClick });
    }

    return (React.createElement("div", { id: props.id, onClick: onClick },
        React.createElement("img", { src: "https://appleid.cdn-apple.com/appleid/button?" + generateQueryString(designProp) })));
}

export default MyAppleLogin;