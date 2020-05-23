/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/core/Engine.js":
/*!****************************!*\
  !*** ./src/core/Engine.js ***!
  \****************************/
/*! exports provided: Engine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Engine\", function() { return Engine; });\n/* harmony import */ var _Logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Logger */ \"./src/core/Logger.js\");\n/* harmony import */ var _EventManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventManager */ \"./src/core/EventManager.js\");\n\n\n\nclass Engine {\n    constructor() {\n        this._scenesMap = {};\n        this._currentScene = null;\n\n        new _EventManager__WEBPACK_IMPORTED_MODULE_1__[\"EventManager\"](this);\n    }\n\n    startScene(scene) {\n        if (!this._scenesMap[scene]) {\n            _Logger__WEBPACK_IMPORTED_MODULE_0__[\"Logger\"].error('This scene not found', scene);\n            return;\n        }\n\n        let _scene = this._scenesMap[scene]();\n\n        this._currentScene = _scene;\n\n        _scene.clear();\n        _scene.initDebug();\n        _scene.prepare();\n\n        this._gameLoop();\n    }\n\n    _gameLoop() {\n        this._clearSceneLayers(this._currentScene);\n\n        const entities = this._sortEntitiesByDepth(this._currentScene.getEntities());\n\n        entities.forEach((entity) => entity.draw());\n\n        this._currentScene._drawFps();\n\n        this._currentScene.update();\n\n        window.requestAnimationFrame(() => { this._gameLoop() });\n    }\n\n    getCurrentScene() {\n        return this._currentScene;\n    }\n\n    setScenes(scenes) {\n        this._scenesMap = scenes;\n    }\n\n    _sortEntitiesByDepth(entities) {\n        return Object.values(entities).sort((entity1, entity2) => {\n            if (entity1.getDepth() < entity2.getDepth()) {\n                return -1;\n            }\n            if (entity1.getDepth() > entity2.getDepth()) {\n                return 1;\n            }\n\n            return 0;\n        });\n    }\n\n    _clearSceneLayers(scene) {\n        const layers = Object.values(scene.getLayers());\n\n        layers.forEach((layer) => {\n            layer.context.clearRect(0, 0, layer.element.width, layer.element.height);\n        });\n    }\n}\n\n\n//# sourceURL=webpack:///./src/core/Engine.js?");

/***/ }),

/***/ "./src/core/Entity.js":
/*!****************************!*\
  !*** ./src/core/Entity.js ***!
  \****************************/
/*! exports provided: Entity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Entity\", function() { return Entity; });\n/* harmony import */ var _Logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Logger */ \"./src/core/Logger.js\");\n\n\nclass Entity {\n    constructor() {\n        this._x = 0;\n        this._y = 0;\n        this._w = 0;\n        this._h = 0;\n        this._name = null;\n        this._layer = null;\n        this._depth = 0;\n\n        this.triggers = {\n            mouseOver: () => { this.handlers.mouseOver.bind(this)(); },\n            mouseOut: () => { this.handlers.mouseOut.bind(this)(); },\n            mouseMove: () => { this.handlers.mouseMove.bind(this)(); },\n        };\n        this.handlers = {\n            mouseOver: () => {},\n            mouseOut: () => {},\n            mouseMove: () => {},\n        };\n    }\n\n    convertToLocalPosition(containerX, containerY) {\n        return {\n            x: containerX - this.getX(),\n            y: containerY - this.getY()\n        };\n    }\n\n    convertToGlobalPosition(localX, localY) {\n        return {\n            x: localX + this.getX(),\n            y: localY + this.getY()\n        };\n    }\n\n    draw() {\n        throw new Error('method is not implemented');\n    }\n\n    setName(name) {\n        this._name = name;\n    }\n\n    getName() {\n        return this._name;\n    }\n\n    setLayer(layer) {\n        this._layer = layer;\n    }\n\n    getLayer() {\n        return this._layer;\n    }\n\n    setW(w) {\n        this._w = w;\n    }\n\n    getW() {\n        return this._w;\n    }\n\n    setH(h) {\n        this._h = h;\n    }\n\n    getH() {\n        return this._h;\n    }\n\n    setX(x) {\n        this._x = x;\n    }\n\n    getX() {\n        return this._x;\n    }\n\n    setY(y) {\n        this._y = y;\n    }\n\n    getY() {\n        return this._y;\n    }\n\n    setDepth(depth) {\n        this._depth = depth;\n    }\n\n    getDepth() {\n        return this._depth;\n    }\n\n    destroy() {}\n    onClick(x, y) {}\n    onMouseDown(x, y) {}\n    onMouseUp(x, y) {}\n    onMouseMove(x, y) {}\n    onMouseOver(x, y) {}\n    onMouseOut(x, y) {}\n    onKeyDown(event) {}\n    onKeyPress(event) {}\n    onKeyUp(event) {}\n}\n\n\n//# sourceURL=webpack:///./src/core/Entity.js?");

/***/ }),

/***/ "./src/core/EventManager.js":
/*!**********************************!*\
  !*** ./src/core/EventManager.js ***!
  \**********************************/
/*! exports provided: EventManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EventManager\", function() { return EventManager; });\n/* harmony import */ var _Logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Logger */ \"./src/core/Logger.js\");\n\n\nclass EventManager {\n    constructor(engine) {\n        this._engine = engine;\n\n        let container = document.querySelector('#container');\n\n        container.addEventListener('click', this._onClick.bind(this), false);\n        container.addEventListener('mousedown', this._onMouseDown.bind(this), false);\n        container.addEventListener('mouseup', this._onMouseUp.bind(this), false);\n        container.addEventListener('mousemove', this._onMouseMove.bind(this), false);\n\n        window.addEventListener('keydown', this._onKeyDown.bind(this), false);\n        window.addEventListener('keypress', this._onKeyPress.bind(this), false);\n        window.addEventListener('keyup', this._onKeyUp.bind(this), false);\n    }\n\n    _onClick(event) {\n        let x = event.offsetX;\n        let y = event.offsetY;\n\n        this._engine.getCurrentScene()._onClick(x, y);\n    }\n\n    _onMouseDown(event) {\n        let x = event.offsetX;\n        let y = event.offsetY;\n\n        this._engine.getCurrentScene()._onMouseDown(x, y);\n    }\n\n    _onMouseUp(event) {\n        let x = event.offsetX;\n        let y = event.offsetY;\n\n        this._engine.getCurrentScene()._onMouseUp(x, y);\n    }\n\n    _onMouseMove(event) {\n        let x = event.offsetX;\n        let y = event.offsetY;\n\n        this._engine.getCurrentScene()._onMouseMove(x, y);\n    }\n\n    _onKeyDown(event) {\n        this._engine.getCurrentScene()._onKeyDown(event);\n    }\n\n    _onKeyPress(event) {\n        this._engine.getCurrentScene()._onKeyPress(event);\n    }\n\n    _onKeyUp(event) {\n        this._engine.getCurrentScene()._onKeyUp(event);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/core/EventManager.js?");

/***/ }),

/***/ "./src/core/Logger.js":
/*!****************************!*\
  !*** ./src/core/Logger.js ***!
  \****************************/
/*! exports provided: Logger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Logger\", function() { return Logger; });\nclass Logger {\n    static info(message, context) {\n        window.console.log(`[info]: ${message}`, context);\n    }\n\n    static error(message, context) {\n        window.console.log(`[error]: ${message}`, context);\n    }\n\n    static debug(message, context) {\n        window.console.log(`[debug]: ${message}`, context);\n    }\n\n    static debugger() {\n        debugger;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/core/Logger.js?");

/***/ }),

/***/ "./src/core/Scene.js":
/*!***************************!*\
  !*** ./src/core/Scene.js ***!
  \***************************/
/*! exports provided: Scene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Scene\", function() { return Scene; });\n/* harmony import */ var _Logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Logger */ \"./src/core/Logger.js\");\n/* harmony import */ var _entities_FpsText__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../entities/FpsText */ \"./src/entities/FpsText.js\");\n\n\n\n// мои слои, наша отрисовка слоев\nclass Scene {\n    constructor() {\n        this._layers = {};\n        this._entities = {};\n        this._entityDepthCount = 0;\n        this._layerDepthCount = 0;\n        this._cursorInsideEntities = {};\n\n        this._debugInfo = {\n            layerName: '__engineDebugInfo',\n            times: [],\n            fps: 0\n        };\n    }\n\n    clear() {\n        this._layers = {};\n        Scene.getContainer().innerHTML = '';\n    }\n\n    prepare() {\n        throw new Error('method is not implemented');\n    }\n\n    update() {\n        throw new Error('method is not implemented');\n    }\n\n    initDebug() {\n        this.addLayer(this._debugInfo.layerName);\n\n        let fpsText = new _entities_FpsText__WEBPACK_IMPORTED_MODULE_1__[\"FpsText\"]('fps_text', 10, 10);\n        this.addEntity(fpsText, this.getLayer(this._debugInfo.layerName));\n    }\n\n    addLayer(name) {\n        if (this._layers[name]) {\n            _Logger__WEBPACK_IMPORTED_MODULE_0__[\"Logger\"].error('This layer already exists', name);\n            return null;\n        }\n\n        const layer = document.createElement('canvas');\n        layer.id = `layer_${name}`;\n        layer.width = 1024;\n        layer.height = 768;\n\n        Scene.getContainer().append(layer);\n\n        this._layerDepthCount += 1;\n\n        this._layers[name] = {\n            element: layer,\n            context: layer.getContext('2d'),\n            depth: this._layerDepthCount\n        };\n\n        return this._layers[name];\n    }\n\n    getLayer(name) {\n        if (!this._layers[name]) {\n            _Logger__WEBPACK_IMPORTED_MODULE_0__[\"Logger\"].error('This layer not found', name);\n            return null;\n        }\n\n        return this._layers[name];\n    }\n\n    static getContainer() {\n        return document.querySelector('#container');\n    }\n\n    getLayers() {\n        return this._layers;\n    }\n\n    getEntities() {\n        return this._entities;\n    }\n\n    getEntity(name) {\n        if (!this._entities[name]) {\n            _Logger__WEBPACK_IMPORTED_MODULE_0__[\"Logger\"].error('Entity not found', name);\n            return null;\n        }\n\n        return this._entities[name];\n    }\n\n    addEntity(entity, layer) {\n        if (this._entities[entity.getName()]) {\n            _Logger__WEBPACK_IMPORTED_MODULE_0__[\"Logger\"].error('This entity exists', entity);\n            return;\n        }\n\n        entity.setLayer(layer);\n\n        this._entityDepthCount += 1;\n\n        entity.setDepth(this._entityDepthCount);\n\n        this._entities[entity.getName()] = entity;\n    }\n\n    destroyEntity(entity) {\n        entity.destroy();\n        delete this._entities[entity.getName()];\n    }\n\n    onClick(x, y, entity) {}\n    onMouseDown(x, y, entity) {}\n    onMouseUp(x, y, entity) {}\n    onMouseMove(x, y) {}\n    onKeyDown(event) {}\n    onKeyPress(event) {}\n    onKeyUp(event) {}\n\n    _onClick(x, y) {\n        let handleEntity = this._getHandleEntity(x, y);\n\n        if (handleEntity) {\n            handleEntity.onClick(x, y);\n        }\n\n        this.onClick(x, y, handleEntity);\n    }\n\n    _onMouseDown(x, y) {\n        let handleEntity = this._getHandleEntity(x, y);\n\n        if (handleEntity) {\n            handleEntity.onMouseDown(x, y);\n        }\n\n        this.onMouseDown(x, y, handleEntity);\n    }\n\n    _onMouseUp(x, y) {\n        let handleEntity = this._getHandleEntity(x, y);\n\n        if (handleEntity) {\n            handleEntity.onMouseUp(x, y);\n        }\n\n        this.onMouseUp(x, y, handleEntity);\n    }\n\n    _onMouseMove(x, y) {\n        let entities = this.getEntities();\n        let cursorInsideEntitiesByFrame = {};\n        Object.values(entities).forEach((entity) => {\n            if (this._checkCollision(x, y, entity)) {\n                cursorInsideEntitiesByFrame[entity.getName()] = entity;\n            }\n        });\n\n        for (let entityName in cursorInsideEntitiesByFrame) {\n            if (this._cursorInsideEntities[entityName] === undefined) {\n                cursorInsideEntitiesByFrame[entityName].triggers.mouseOver(x, y);\n                cursorInsideEntitiesByFrame[entityName].onMouseOver(x, y);\n            }\n        }\n\n        for (let entityName in this._cursorInsideEntities) {\n            if (cursorInsideEntitiesByFrame[entityName] === undefined) {\n                this._cursorInsideEntities[entityName].triggers.mouseOut(x, y);\n                this._cursorInsideEntities[entityName].onMouseOut(x, y);\n            }\n        }\n\n        this._cursorInsideEntities = cursorInsideEntitiesByFrame;\n\n        Object.values(this._cursorInsideEntities).forEach((entity) => {\n            entity.triggers.mouseMove(x, y);\n            entity.onMouseMove(x, y);\n        });\n\n        this.onMouseMove(x, y);\n    }\n\n    _onKeyDown(event) {\n        let entities = this.getEntities();\n        Object.values(entities).forEach((entity) => {\n            entity.onKeyDown(event);\n        });\n\n        this.onKeyDown(event);\n    }\n\n    _onKeyPress(event) {\n        let entities = this.getEntities();\n        Object.values(entities).forEach((entity) => {\n            entity.onKeyPress(event);\n        });\n\n        this.onKeyPress(event);\n    }\n\n    _onKeyUp(event) {\n        let entities = this.getEntities();\n        Object.values(entities).forEach((entity) => {\n            entity.onKeyUp(event);\n        });\n\n        this.onKeyUp(event);\n    }\n\n    _getHandleEntity(x, y) {\n        let handleEntity = null;\n        let entities = this.getEntities();\n        Object.values(entities).forEach((entity) => {\n            if (this._checkCollision(x, y, entity)) {\n                if (handleEntity === null || this._checkDepth(handleEntity, entity)) {\n                    handleEntity = entity;\n                }\n            }\n        });\n\n        return handleEntity;\n    }\n\n    _checkCollision(x, y, entity) {\n        return x >= entity.getX() && x <= entity.getX() + entity.getW()\n            && y >= entity.getY() && y <= entity.getY() + entity.getH();\n    }\n\n    _checkDepth(handleEntity, entity) {\n        return handleEntity.getDepth() < entity.getDepth() && handleEntity.getLayer().depth <= entity.getLayer().depth;\n    }\n\n    _drawFps() {\n        const now = window.performance.now();\n        while (this._debugInfo.times.length > 0 && this._debugInfo.times[0] <= now - 1000) {\n            this._debugInfo.times.shift();\n        }\n        this._debugInfo.times.push(now);\n        this._debugInfo.fps = this._debugInfo.times.length;\n\n        this.getEntity('fps_text').setFps(this._debugInfo.fps);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/core/Scene.js?");

/***/ }),

/***/ "./src/core/Utility.js":
/*!*****************************!*\
  !*** ./src/core/Utility.js ***!
  \*****************************/
/*! exports provided: Utility */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Utility\", function() { return Utility; });\nclass Utility {\n    static getRandomColor() {\n        let letters = '0123456789ABCDEF';\n        let color = '#';\n        for (let i = 0; i < 6; i++) {\n            color += letters[Math.floor(Math.random() * 16)];\n        }\n        return color;\n    }\n\n    static setCursor(cursor) {\n        document.body.style.cursor = cursor;\n    }\n\n    static cloneEntity(entity) {\n        return Object.assign( Object.create( Object.getPrototypeOf(entity)), entity);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/core/Utility.js?");

/***/ }),

/***/ "./src/entities/FpsText.js":
/*!*********************************!*\
  !*** ./src/entities/FpsText.js ***!
  \*********************************/
/*! exports provided: FpsText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FpsText\", function() { return FpsText; });\n/* harmony import */ var _core_Entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Entity */ \"./src/core/Entity.js\");\n\n\nclass FpsText extends _core_Entity__WEBPACK_IMPORTED_MODULE_0__[\"Entity\"] {\n    constructor(name, x, y) {\n        super();\n\n        this.setName(name);\n        this.setX(x);\n        this.setY(y);\n\n        this._fps = 0;\n        this._isShow = true;\n    }\n\n    draw() {\n        if (this._isShow === false) {\n            return;\n        }\n\n        const { context } = this.getLayer();\n\n        let phrase = `FPS: ${this._fps}`;\n\n        context.fillStyle = '#ccc';\n        context.fillRect(this.getX(), this.getY(), 64, 20);\n\n        context.fillStyle = '#000';\n        context.font = '16px Arial';\n        context.textBaseline = 'top';\n        context.fillText(phrase, this.getX() + 4, this.getY() + 4);\n        context.fill();\n    }\n\n    setFps(fps) {\n        this._fps = fps;\n    }\n\n    onKeyUp(event) {\n        if (event.ctrlKey === true && event.code === 'KeyQ') {\n            this._isShow = !this._isShow;\n        }\n    }\n}\n\n//# sourceURL=webpack:///./src/entities/FpsText.js?");

/***/ }),

/***/ "./src/entities/SeaField.js":
/*!**********************************!*\
  !*** ./src/entities/SeaField.js ***!
  \**********************************/
/*! exports provided: SeaField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SeaField\", function() { return SeaField; });\n/* harmony import */ var _core_Entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Entity */ \"./src/core/Entity.js\");\n\n\nclass SeaField extends _core_Entity__WEBPACK_IMPORTED_MODULE_0__[\"Entity\"] {\n    constructor(name, x, y, tileSize, tileCount) {\n        super();\n\n        this.setName(name);\n        this.setX(x);\n        this.setY(y);\n        this.setW(tileSize * tileCount);\n        this.setH(tileSize * tileCount);\n\n        this._tileSize = tileSize;\n        this._tileCount = tileCount;\n\n        this.triggers.mouseMove = this._triggerMouseMove.bind(this);\n    }\n\n    draw() {\n        const {context} = this.getLayer();\n        let lineConfig = {\n            x: this.getX(),\n            y: this.getY()\n        };\n\n        this._drawHorizontalLines(context, lineConfig);\n        lineConfig.y = this.getY();\n        this._drawVerticalLines(context, lineConfig);\n    }\n\n    _drawHorizontalLines(context, lineConfig) {\n        for (let y = 0; y <= this._tileCount; y += 1) {\n            context.beginPath();\n            context.moveTo(lineConfig.x, lineConfig.y);\n            context.lineTo(lineConfig.x + this._tileSize * this._tileCount, lineConfig.y);\n            context.strokeStyle = '#999';\n            context.stroke();\n\n            this._drawLineNumber(context, lineConfig, y);\n\n            lineConfig.y += this._tileSize;\n        }\n    }\n\n    _drawVerticalLines(context, lineConfig) {\n        for (let x = 0; x <= this._tileCount; x += 1) {\n            context.beginPath();\n            context.moveTo(lineConfig.x, lineConfig.y);\n            context.lineTo(lineConfig.x , lineConfig.y + this._tileSize * this._tileCount);\n            context.strokeStyle = '#999';\n            context.stroke();\n\n            this._drawColumnAlphabet(context, lineConfig, x);\n\n            lineConfig.x += this._tileSize;\n        }\n    }\n\n    _drawLineNumber(context, lineConfig, y) {\n        if (y === this._tileCount) {\n            return;\n        }\n\n        context.fillStyle = '#000';\n        context.font = '16px Arial';\n        context.textBaseline = 'top';\n\n        let lineNumber = y+1;\n        let offset = lineNumber < 10 ? 14 : 22;\n        context.fillText(lineNumber.toString(), lineConfig.x - offset, lineConfig.y + 8);\n    }\n\n    _drawColumnAlphabet(context, lineConfig, x) {\n        if (x === this._tileCount) {\n            return;\n        }\n\n        context.fillStyle = '#000';\n        context.font = '16px Arial';\n        context.textBaseline = 'top';\n\n        let columnLetter = String.fromCharCode(64 + x + 1);\n        context.fillText(columnLetter, lineConfig.x + 12, lineConfig.y - 16);\n    }\n\n    _triggerMouseMove(x, y) {\n        let localPosition = this.convertToLocalPosition(x, y);\n        let tileX = Math.floor(localPosition.x / this._tileSize) * this._tileSize;\n        let tileY = Math.floor(localPosition.y / this._tileSize) * this._tileSize;\n        let tileBorderX = this.getW();\n        let tileBorderY = this.getH();\n\n        let globalPosition = this.convertToGlobalPosition(tileX, tileY);\n        let globalBorderPosition = this.convertToGlobalPosition(tileBorderX, tileBorderY);\n\n        this.handlers.mouseMove(\n            globalPosition.x,\n            globalPosition.y,\n            globalBorderPosition.x,\n            globalBorderPosition.y\n        );\n    }\n}\n\n\n//# sourceURL=webpack:///./src/entities/SeaField.js?");

/***/ }),

/***/ "./src/entities/Ship.js":
/*!******************************!*\
  !*** ./src/entities/Ship.js ***!
  \******************************/
/*! exports provided: Ship */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Ship\", function() { return Ship; });\n/* harmony import */ var _core_Entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Entity */ \"./src/core/Entity.js\");\n/* harmony import */ var _core_Utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Utility */ \"./src/core/Utility.js\");\n/* harmony import */ var _enums_ShipState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums/ShipState */ \"./src/enums/ShipState.js\");\n/* harmony import */ var _enums_ShipPosition__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../enums/ShipPosition */ \"./src/enums/ShipPosition.js\");\n\n\n\n\n\nclass Ship extends _core_Entity__WEBPACK_IMPORTED_MODULE_0__[\"Entity\"] {\n    constructor(name, x, y, shipSize, shipCount) {\n        super();\n\n        this._oneFieldSize = 32;\n\n        this.setName(name);\n        this.setX(x);\n        this.setY(y);\n        this.setW(shipSize * this._oneFieldSize);\n        this.setH(this._oneFieldSize);\n\n        this._size = shipSize;\n        this._count = shipCount;\n        this._color = _core_Utility__WEBPACK_IMPORTED_MODULE_1__[\"Utility\"].getRandomColor();\n        this._state = _enums_ShipState__WEBPACK_IMPORTED_MODULE_2__[\"SHIP_STATE\"].DISPLAY_IN_MENU;\n        this._position = _enums_ShipPosition__WEBPACK_IMPORTED_MODULE_3__[\"SHIP_POSITION\"].HORIZONTAL;\n    }\n\n    draw() {\n        const { context } = this.getLayer();\n\n        context.fillStyle = this._color;\n        context.fillRect(this.getX(), this.getY(), this.getW(), this.getH());\n    }\n\n    onKeyPress(event) {\n        if (event.code === 'KeyR' && this._state === _enums_ShipState__WEBPACK_IMPORTED_MODULE_2__[\"SHIP_STATE\"].PICKED_UP) {\n            this._position = this._position === _enums_ShipPosition__WEBPACK_IMPORTED_MODULE_3__[\"SHIP_POSITION\"].VERTICAL ?\n                                _enums_ShipPosition__WEBPACK_IMPORTED_MODULE_3__[\"SHIP_POSITION\"].HORIZONTAL : _enums_ShipPosition__WEBPACK_IMPORTED_MODULE_3__[\"SHIP_POSITION\"].VERTICAL;\n\n            if (this._position === _enums_ShipPosition__WEBPACK_IMPORTED_MODULE_3__[\"SHIP_POSITION\"].HORIZONTAL) {\n                this.setW(this._size * this._oneFieldSize);\n                this.setH(this._oneFieldSize);\n            } else {\n                this.setW(this._oneFieldSize);\n                this.setH(this._size * this._oneFieldSize);\n            }\n        }\n    }\n\n    onClick(x, y) {\n\n    }\n\n    onMouseOver(x, y) {\n        _core_Utility__WEBPACK_IMPORTED_MODULE_1__[\"Utility\"].setCursor('pointer');\n    }\n\n    onMouseOut(x, y) {\n        _core_Utility__WEBPACK_IMPORTED_MODULE_1__[\"Utility\"].setCursor('default');\n    }\n\n    setState(state) {\n        this._state = state;\n    }\n\n    getState() {\n        return this._state;\n    }\n\n    getSize() {\n        return this._size;\n    }\n\n    getCount() {\n        return this._count;\n    }\n\n}\n\n\n//# sourceURL=webpack:///./src/entities/Ship.js?");

/***/ }),

/***/ "./src/entities/ship_menu/AreaForSelectedObject.js":
/*!*********************************************************!*\
  !*** ./src/entities/ship_menu/AreaForSelectedObject.js ***!
  \*********************************************************/
/*! exports provided: AreaForSelectedObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AreaForSelectedObject\", function() { return AreaForSelectedObject; });\n/* harmony import */ var _core_Entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Entity */ \"./src/core/Entity.js\");\n\n\nclass AreaForSelectedObject extends _core_Entity__WEBPACK_IMPORTED_MODULE_0__[\"Entity\"] {\n    constructor(name, x, y) {\n        super();\n\n        this.setName(name);\n        this.setX(x);\n        this.setY(y);\n        this.setW(150);\n        this.setH(40);\n\n        this._entity = null;\n    }\n\n    draw() {\n        const {context} = this.getLayer();\n\n        context.fillStyle = '#ccc';\n        context.fillRect(this.getX(), this.getY(), this.getW(), this.getH());\n\n        if (this._entity !== null) {\n            this._entity.setX(this.getX() + ((this.getW() / 2) - (this._entity.getW() / 2)));\n            this._entity.setY(this.getY() + 4);\n        }\n    }\n\n    setEntity(entity) {\n        this._entity = entity;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/entities/ship_menu/AreaForSelectedObject.js?");

/***/ }),

/***/ "./src/entities/ship_menu/ShipInfo.js":
/*!********************************************!*\
  !*** ./src/entities/ship_menu/ShipInfo.js ***!
  \********************************************/
/*! exports provided: ShipInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ShipInfo\", function() { return ShipInfo; });\n/* harmony import */ var _core_Entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Entity */ \"./src/core/Entity.js\");\n\n\nclass ShipInfo extends _core_Entity__WEBPACK_IMPORTED_MODULE_0__[\"Entity\"] {\n    constructor(name, x, y, shipCount) {\n        super();\n\n        this.setName(name);\n        this.setX(x);\n        this.setY(y);\n        this.setW(20);\n        this.setH(20);\n\n        this._shipCount = shipCount;\n    }\n\n    draw() {\n        const { context } = this.getLayer();\n\n        let phrase = `${this._shipCount}x`;\n\n        context.fillStyle = '#000';\n        context.font = '16px Arial';\n        context.textBaseline = 'top';\n        context.fillText(phrase, this.getX(), this.getY());\n        context.fill();\n    }\n\n    setShipCount(shipCount) {\n        this._shipCount = shipCount;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/entities/ship_menu/ShipInfo.js?");

/***/ }),

/***/ "./src/enums/ShipPosition.js":
/*!***********************************!*\
  !*** ./src/enums/ShipPosition.js ***!
  \***********************************/
/*! exports provided: SHIP_POSITION */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SHIP_POSITION\", function() { return SHIP_POSITION; });\nconst SHIP_POSITION = {\n    VERTICAL: 0,\n    HORIZONTAL: 1\n};\n\n//# sourceURL=webpack:///./src/enums/ShipPosition.js?");

/***/ }),

/***/ "./src/enums/ShipState.js":
/*!********************************!*\
  !*** ./src/enums/ShipState.js ***!
  \********************************/
/*! exports provided: SHIP_STATE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SHIP_STATE\", function() { return SHIP_STATE; });\nconst SHIP_STATE = {\n    DISPLAY_IN_MENU: 0,\n    PICKED_UP: 1,\n    PUT_ON_FIELD: 2\n};\n\n//# sourceURL=webpack:///./src/enums/ShipState.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core_Engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/Engine */ \"./src/core/Engine.js\");\n/* harmony import */ var _scenes_Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scenes/Game */ \"./src/scenes/Game.js\");\n/* harmony import */ var _scenes_Menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scenes/Menu */ \"./src/scenes/Menu.js\");\n\n\n\n\nconst engine = new _core_Engine__WEBPACK_IMPORTED_MODULE_0__[\"Engine\"]();\n\nengine.setScenes({\n    game: () => new _scenes_Game__WEBPACK_IMPORTED_MODULE_1__[\"Game\"](),\n    menu: () => new _scenes_Menu__WEBPACK_IMPORTED_MODULE_2__[\"Menu\"](),\n});\n\nengine.startScene('game');\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/scenes/Game.js":
/*!****************************!*\
  !*** ./src/scenes/Game.js ***!
  \****************************/
/*! exports provided: Game */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Game\", function() { return Game; });\n/* harmony import */ var _core_Scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Scene */ \"./src/core/Scene.js\");\n/* harmony import */ var _core_Logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Logger */ \"./src/core/Logger.js\");\n/* harmony import */ var _entities_ship_menu_AreaForSelectedObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entities/ship_menu/AreaForSelectedObject */ \"./src/entities/ship_menu/AreaForSelectedObject.js\");\n/* harmony import */ var _entities_Ship__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../entities/Ship */ \"./src/entities/Ship.js\");\n/* harmony import */ var _entities_ship_menu_ShipInfo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../entities/ship_menu/ShipInfo */ \"./src/entities/ship_menu/ShipInfo.js\");\n/* harmony import */ var _core_Utility__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/Utility */ \"./src/core/Utility.js\");\n/* harmony import */ var _entities_SeaField__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../entities/SeaField */ \"./src/entities/SeaField.js\");\n/* harmony import */ var _enums_ShipState__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../enums/ShipState */ \"./src/enums/ShipState.js\");\n\n\n\n\n\n\n\n\n\nclass Game extends _core_Scene__WEBPACK_IMPORTED_MODULE_0__[\"Scene\"] {\n    prepare() {\n        _core_Logger__WEBPACK_IMPORTED_MODULE_1__[\"Logger\"].debug('Our game');\n        this.layers = {\n            background: this.addLayer('background'),\n            userMap: this.addLayer('userMap')\n        };\n        this._hand = null;\n        this._x = 0;\n        this._y = 0;\n\n        let areaForSelectedObject = new _entities_ship_menu_AreaForSelectedObject__WEBPACK_IMPORTED_MODULE_2__[\"AreaForSelectedObject\"]('areaForSelectedObject', 10, 40);\n        this.addEntity(areaForSelectedObject, this.layers.userMap);\n\n        let ship1 = new _entities_Ship__WEBPACK_IMPORTED_MODULE_3__[\"Ship\"]('ship1', 30, 86, 1, 4);\n        let ship2 = new _entities_Ship__WEBPACK_IMPORTED_MODULE_3__[\"Ship\"]('ship2', 30, 128, 2, 3);\n        let ship3 = new _entities_Ship__WEBPACK_IMPORTED_MODULE_3__[\"Ship\"]('ship3', 30, 170, 3, 2);\n        let ship4 = new _entities_Ship__WEBPACK_IMPORTED_MODULE_3__[\"Ship\"]('ship4', 30, 212, 4, 1);\n\n        this.addEntity(ship1, this.layers.userMap);\n        this.addEntity(ship2, this.layers.userMap);\n        this.addEntity(ship3, this.layers.userMap);\n        this.addEntity(ship4, this.layers.userMap);\n\n        let textForShip1 = new _entities_ship_menu_ShipInfo__WEBPACK_IMPORTED_MODULE_4__[\"ShipInfo\"]('shipInfo1', 10, 96, ship1.getCount());\n        let textForShip2 = new _entities_ship_menu_ShipInfo__WEBPACK_IMPORTED_MODULE_4__[\"ShipInfo\"]('shipInfo2', 10, 138, ship2.getCount());\n        let textForShip3 = new _entities_ship_menu_ShipInfo__WEBPACK_IMPORTED_MODULE_4__[\"ShipInfo\"]('shipInfo3', 10, 180, ship3.getCount());\n        let textForShip4 = new _entities_ship_menu_ShipInfo__WEBPACK_IMPORTED_MODULE_4__[\"ShipInfo\"]('shipInfo4', 10, 222, ship4.getCount());\n\n        this.addEntity(textForShip1, this.layers.userMap);\n        this.addEntity(textForShip2, this.layers.userMap);\n        this.addEntity(textForShip3, this.layers.userMap);\n        this.addEntity(textForShip4, this.layers.userMap);\n\n        let seaField = new _entities_SeaField__WEBPACK_IMPORTED_MODULE_6__[\"SeaField\"]('seaField', 200, 40, 32, 10);\n        seaField.handlers.mouseMove = this._moveObjectInHand.bind(this);\n        seaField.handlers.mouseOut = this._hideObjectInHand.bind(this);\n\n        this.addEntity(seaField, this.layers.background);\n    }\n\n    update() {\n\n    }\n\n    onClick(x, y, entity) {\n        if (!entity) {\n            this._clearHand();\n        }\n\n        this._takeObject(entity);\n    }\n\n    onMouseMove(x, y) {\n        this._x = x;\n        this._y = y;\n    }\n\n    onKeyPress(event) {\n        if (event.code === 'KeyR' && this._hand) {\n            this.getEntity('seaField').triggers.mouseMove(this._x, this._y);\n        }\n    }\n\n    _moveObjectInHand(tileX, tileY, tileBorderX, tileBorderY) {\n        if (this._hand) {\n            if (this._hand.getW() + tileX <= tileBorderX) {\n                this._hand.setX(tileX);\n            } else {\n                this._hand.setX(tileBorderX - this._hand.getW());\n            }\n\n            if (this._hand.getH() + tileY <= tileBorderY) {\n                this._hand.setY(tileY);\n            } else {\n                this._hand.setY(tileBorderY - this._hand.getH());\n            }\n        }\n    }\n\n    _hideObjectInHand() {\n        if (this._hand) {\n            this._hand.setX(-1000);\n            this._hand.setY(-1000);\n        }\n    }\n\n    _takeObject(entity) {\n        if (entity === null || !(entity instanceof _entities_Ship__WEBPACK_IMPORTED_MODULE_3__[\"Ship\"]) || entity.getState() !== _enums_ShipState__WEBPACK_IMPORTED_MODULE_7__[\"SHIP_STATE\"].DISPLAY_IN_MENU) {\n            return;\n        }\n\n        this._clearHand();\n\n        let objectInHand = _core_Utility__WEBPACK_IMPORTED_MODULE_5__[\"Utility\"].cloneEntity(entity);\n        objectInHand.setName('objectInHand');\n        objectInHand.setX(-1000);\n        objectInHand.setY(-1000);\n        objectInHand.setState(_enums_ShipState__WEBPACK_IMPORTED_MODULE_7__[\"SHIP_STATE\"].PICKED_UP);\n        this.addEntity(objectInHand, this.layers.userMap);\n        this._hand = objectInHand;\n\n        let selectedObject = _core_Utility__WEBPACK_IMPORTED_MODULE_5__[\"Utility\"].cloneEntity(entity);\n        selectedObject.setName('selectedObject');\n        selectedObject.setX(-1000);\n        selectedObject.setY(-1000);\n        this.addEntity(selectedObject, this.layers.userMap);\n\n        this.getEntity('areaForSelectedObject').setEntity(selectedObject);\n    }\n\n    _clearHand() {\n        let previousSelectedObject = this.getEntity('selectedObject');\n        if (previousSelectedObject) {\n            this.destroyEntity(previousSelectedObject);\n        }\n\n        if (this._hand) {\n            this.destroyEntity(this._hand);\n        }\n    }\n}\n\n\n//# sourceURL=webpack:///./src/scenes/Game.js?");

/***/ }),

/***/ "./src/scenes/Menu.js":
/*!****************************!*\
  !*** ./src/scenes/Menu.js ***!
  \****************************/
/*! exports provided: Menu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Menu\", function() { return Menu; });\n/* harmony import */ var _core_Scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Scene */ \"./src/core/Scene.js\");\n/* harmony import */ var _core_Logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Logger */ \"./src/core/Logger.js\");\n\n\n\nclass Menu extends _core_Scene__WEBPACK_IMPORTED_MODULE_0__[\"Scene\"] {\n    draw() {\n        _core_Logger__WEBPACK_IMPORTED_MODULE_1__[\"Logger\"].debug('Menu');\n    }\n}\n\n\n//# sourceURL=webpack:///./src/scenes/Menu.js?");

/***/ })

/******/ });