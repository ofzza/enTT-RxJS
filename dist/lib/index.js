"use strict";
// enTT RxJS lib
// ----------------------------------------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// (Re) export everything from base entt module
tslib_1.__exportStar(require("@ofzza/entt"), exports);
// Import and (re)export base class
var entt_1 = require("./entt");
Object.defineProperty(exports, "EnTT", { enumerable: true, get: function () { return entt_1.EnTT; } });
Object.defineProperty(exports, "cast", { enumerable: true, get: function () { return entt_1.cast; } });
//# sourceMappingURL=index.js.map