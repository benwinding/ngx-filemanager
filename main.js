(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "../../dist/ngx-filemanager-client-firebase/fesm5/ngx-filemanager-client-firebase.js":
/*!********************************************************************************************************************!*\
  !*** /home/ben/work/ngx-filemanager/dist/ngx-filemanager-client-firebase/fesm5/ngx-filemanager-client-firebase.js ***!
  \********************************************************************************************************************/
/*! exports provided: NgxFileManagerComponent, NgxFilemanagerClientFirebaseModule, ServerFilesystemProviderService, ɵp, ɵq, ɵn, ɵf, ɵr, ɵj, ɵh, ɵg, ɵi, ɵk, ɵs, ɵa, ɵo, ɵm, ɵl, ɵb, ɵd, ɵu, ɵc, ɵe, ɵt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxFileManagerComponent", function() { return NgxFileManagerComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxFilemanagerClientFirebaseModule", function() { return NgxFilemanagerClientFirebaseModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServerFilesystemProviderService", function() { return ServerFilesystemProviderService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵp", function() { return AppBulkActionsComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵq", function() { return AppFolderActionsComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵn", function() { return AppBreadCrumbsComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵf", function() { return BaseDialogComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵr", function() { return AppBtnsCancelOkComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵj", function() { return AppDialogCopyComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵh", function() { return AppDialogNewFolderComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵg", function() { return AppDialogRenameComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵi", function() { return AppDialogSetPermissionsComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵk", function() { return AppDialogUploadFilesComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵs", function() { return FileDetailsComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return ActionHandlersService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵo", function() { return AppActionsMiniBrowserComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵm", function() { return AppFileTableMiniFolderBrowserComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵl", function() { return AppFileTableComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵb", function() { return ClientFileSystemService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵd", function() { return OptimisticFilesystemService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵu", function() { return ConsoleLoggerService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵc", function() { return LoggerService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵe", function() { return NotificationService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵt", function() { return FileSizePipe; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_auto_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-auto-table */ "../../node_modules/ngx-auto-table/fesm5/ngx-auto-table.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var ngx_dropzone_wrapper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-dropzone-wrapper */ "../../node_modules/ngx-dropzone-wrapper/dist/ngx-dropzone-wrapper.es5.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var path_browserify__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! path-browserify */ "../../node_modules/path-browserify/index.js");
/* harmony import */ var path_browserify__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(path_browserify__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");












/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LoggerService = /** @class */ (function () {
    function LoggerService() {
    }
    LoggerService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Injectable"] }
    ];
    return LoggerService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NotificationService = /** @class */ (function () {
    function NotificationService(matSnackbar) {
        this.matSnackbar = matSnackbar;
    }
    /**
     * @param {?} msg
     * @param {?=} title
     * @param {?=} isError
     * @return {?}
     */
    NotificationService.prototype.notify = /**
     * @param {?} msg
     * @param {?=} title
     * @param {?=} isError
     * @return {?}
     */
    function (msg, title, isError) {
        return this.matSnackbar.open(msg, title, {
            duration: 4000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
        });
    };
    /**
     * @return {?}
     */
    NotificationService.prototype.notifyCancelled = /**
     * @return {?}
     */
    function () {
        return this.notify('Cancelled Operation');
    };
    NotificationService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Injectable"] }
    ];
    /** @nocollapse */
    NotificationService.ctorParameters = function () { return [
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSnackBar"] }
    ]; };
    return NotificationService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable:member-ordering
var OptimisticFilesystemService = /** @class */ (function () {
    function OptimisticFilesystemService(logger, notifications) {
        this.logger = logger;
        this.notifications = notifications;
        this.refreshEmitter = new rxjs__WEBPACK_IMPORTED_MODULE_10__["Subject"]();
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_10__["Subject"]();
        this.instanceCountIncr();
    }
    /**
     * @private
     * @return {?}
     */
    OptimisticFilesystemService.prototype.instanceCountIncr = /**
     * @private
     * @return {?}
     */
    function () {
        OptimisticFilesystemService.instanceCount++;
        this.logger.info('new instance created', { instances: this.instances });
    };
    /**
     * @private
     * @return {?}
     */
    OptimisticFilesystemService.prototype.instanceCountDecr = /**
     * @private
     * @return {?}
     */
    function () {
        OptimisticFilesystemService.instanceCount--;
        this.logger.info('instance destroyed', { instances: this.instances });
    };
    Object.defineProperty(OptimisticFilesystemService.prototype, "instances", {
        get: /**
         * @return {?}
         */
        function () {
            return OptimisticFilesystemService.instanceCount;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    OptimisticFilesystemService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.instanceCountDecr();
    };
    Object.defineProperty(OptimisticFilesystemService.prototype, "$CurrentPath", {
        get: /**
         * @return {?}
         */
        function () {
            return this.clientFilesystem.$currentPath;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OptimisticFilesystemService.prototype, "$SelectedFile", {
        get: /**
         * @return {?}
         */
        function () {
            return this.clientFilesystem.$selectedFile;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OptimisticFilesystemService.prototype, "$FilesWithIcons", {
        get: /**
         * @return {?}
         */
        function () {
            return this.clientFilesystem.$FilesWithIcons;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} serverFilesystem
     * @param {?} clientFilesystem
     * @return {?}
     */
    OptimisticFilesystemService.prototype.initialize = /**
     * @param {?} serverFilesystem
     * @param {?} clientFilesystem
     * @return {?}
     */
    function (serverFilesystem, clientFilesystem) {
        var _this = this;
        this.logger.info('initializing...', { serverFilesystem: serverFilesystem, clientFilesystem: clientFilesystem });
        this.serverFilesystem = serverFilesystem;
        this.clientFilesystem = clientFilesystem;
        this.destroyed.next();
        this.refreshEmitter
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["takeUntil"])(this.destroyed), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["tap"])((/**
         * @param {?} currentPath
         * @return {?}
         */
        function (currentPath) {
            _this.clientFilesystem.OnList(currentPath);
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["debounceTime"])(800))
            .subscribe((/**
         * @param {?} currentPath
         * @return {?}
         */
        function (currentPath) { return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(_this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                this.updateListFromServer(currentPath);
                return [2 /*return*/];
            });
        }); }));
    };
    /**
     * @private
     * @param {?} error
     * @param {?} title
     * @param {?} msg
     * @return {?}
     */
    OptimisticFilesystemService.prototype.reportError = /**
     * @private
     * @param {?} error
     * @param {?} title
     * @param {?} msg
     * @return {?}
     */
    function (error, title, msg) {
        /** @type {?} */
        var isApiError = error.message.startsWith('API Error');
        console.error("Error in \"" + title + "\" ->msg: \"" + msg + "\" -> Error.message:\"" + error.message + "\"", { isApiError: isApiError });
        if (isApiError) {
            return;
        }
        this.notifications.notify(msg, title);
    };
    /**
     * @private
     * @param {?} directoryPath
     * @return {?}
     */
    OptimisticFilesystemService.prototype.updateListFromServer = /**
     * @private
     * @param {?} directoryPath
     * @return {?}
     */
    function (directoryPath) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            var apiResult, currentDirectory, error_1;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        this.logger.info('onHandleList', { directoryPath: directoryPath });
                        return [4 /*yield*/, this.serverFilesystem.List(directoryPath)];
                    case 1:
                        apiResult = _a.sent();
                        return [4 /*yield*/, this.clientFilesystem.UpdateList(apiResult, directoryPath)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.$CurrentPath.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["take"])(1)).toPromise()];
                    case 3:
                        currentDirectory = _a.sent();
                        if (!(currentDirectory === directoryPath)) return [3 /*break*/, 5];
                        this.clientFilesystem.OnList(directoryPath);
                        return [4 /*yield*/, this.selectFirstInCurrentDirectory()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        this.reportError(error_1, 'Cannot get directory list', 'List Error');
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param {?} directoryPath
     * @return {?}
     */
    OptimisticFilesystemService.prototype.HandleList = /**
     * @param {?} directoryPath
     * @return {?}
     */
    function (directoryPath) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                this.refreshEmitter.next(directoryPath);
                return [2 /*return*/];
            });
        });
    };
    /**
     * @param {?} newPath
     * @return {?}
     */
    OptimisticFilesystemService.prototype.HandleCreateFolder = /**
     * @param {?} newPath
     * @return {?}
     */
    function (newPath) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            var error_2;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.logger.info('HandleCreateFolder', { newPath: newPath });
                        this.clientFilesystem.OnCreateFolder(newPath);
                        return [4 /*yield*/, this.serverFilesystem.CreateFolder(newPath)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        this.reportError(error_2, 'Cannot create folder', 'Create Folder Error');
                        this.clientFilesystem.OnRemove([newPath]);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param {?} singleFileName
     * @param {?} newPath
     * @return {?}
     */
    OptimisticFilesystemService.prototype.HandleCopy = /**
     * @param {?} singleFileName
     * @param {?} newPath
     * @return {?}
     */
    function (singleFileName, newPath) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            var error_3;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.logger.info('HandleCopy', { singleFileName: singleFileName, newPath: newPath });
                        this.clientFilesystem.OnCopy(singleFileName, newPath);
                        return [4 /*yield*/, this.serverFilesystem.Copy(singleFileName, newPath)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        this.reportError(error_3, 'Cannot copy item', 'Copy Error');
                        this.clientFilesystem.OnRemove([newPath]);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param {?} item
     * @param {?} newPath
     * @return {?}
     */
    OptimisticFilesystemService.prototype.HandleMove = /**
     * @param {?} item
     * @param {?} newPath
     * @return {?}
     */
    function (item, newPath) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                try {
                    this.logger.info('HandleMove', { item: item, newPath: newPath });
                    this.clientFilesystem.OnMove(item, newPath);
                    return [2 /*return*/, this.serverFilesystem.Move(item, newPath)];
                }
                catch (error) {
                    this.reportError(error, 'Cannot move item', 'Move Error');
                    this.clientFilesystem.OnRemove([newPath]);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * @param {?} item
     * @param {?} newItemPath
     * @return {?}
     */
    OptimisticFilesystemService.prototype.HandleRename = /**
     * @param {?} item
     * @param {?} newItemPath
     * @return {?}
     */
    function (item, newItemPath) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                try {
                    this.logger.info('HandleRename', { item: item, newItemPath: newItemPath });
                    this.clientFilesystem.OnRename(item, newItemPath);
                    return [2 /*return*/, this.serverFilesystem.Rename(item, newItemPath)];
                }
                catch (error) {
                    this.reportError(error, 'Cannot rename item', 'Rename Error');
                    this.clientFilesystem.OnRename(newItemPath, item);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * @param {?} item
     * @param {?} content
     * @return {?}
     */
    OptimisticFilesystemService.prototype.HandleEdit = /**
     * @param {?} item
     * @param {?} content
     * @return {?}
     */
    function (item, content) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                try {
                    this.logger.info('HandleEdit', { item: item, content: content });
                    this.clientFilesystem.OnEdit(item, content);
                    return [2 /*return*/, this.serverFilesystem.Edit(item, content)];
                }
                catch (error) {
                    this.reportError(error, 'Cannot edit item', 'Edit Error');
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * @param {?} item
     * @return {?}
     */
    OptimisticFilesystemService.prototype.HandleGetcontent = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            var response, error_4;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.logger.info('HandleGetcontent', { item: item });
                        this.clientFilesystem.OnGetcontent(item);
                        return [4 /*yield*/, this.serverFilesystem.Getcontent(item)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.result];
                    case 2:
                        error_4 = _a.sent();
                        this.reportError(error_4, 'Cannot get item', 'Get Content Error');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param {?} item
     * @param {?} role
     * @param {?} entity
     * @param {?=} recursive
     * @return {?}
     */
    OptimisticFilesystemService.prototype.HandleSetPermissions = /**
     * @param {?} item
     * @param {?} role
     * @param {?} entity
     * @param {?=} recursive
     * @return {?}
     */
    function (item, role, entity, recursive) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                try {
                    this.logger.info('HandleSetPermissions', {
                        item: item,
                        role: role,
                        entity: entity,
                        recursive: recursive
                    });
                    this.clientFilesystem.OnSetPermissions(item, role, entity, recursive);
                    return [2 /*return*/, this.serverFilesystem.SetPermissions(item, role, entity, recursive)];
                }
                catch (error) {
                    this.reportError(error, 'Cannot set permissions to item', 'Permissions Error');
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * @param {?} items
     * @param {?} newPath
     * @return {?}
     */
    OptimisticFilesystemService.prototype.HandleMoveMultiple = /**
     * @param {?} items
     * @param {?} newPath
     * @return {?}
     */
    function (items, newPath) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                try {
                    this.logger.info('HandleMoveMultiple', { items: items, newPath: newPath });
                    this.clientFilesystem.OnMoveMultiple(items, newPath);
                    return [2 /*return*/, this.serverFilesystem.MoveMultiple(items, newPath)];
                }
                catch (error) {
                    this.reportError(error, 'Cannot move items', 'Move Error');
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * @param {?} items
     * @param {?} newPath
     * @return {?}
     */
    OptimisticFilesystemService.prototype.HandleCopyMultiple = /**
     * @param {?} items
     * @param {?} newPath
     * @return {?}
     */
    function (items, newPath) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                try {
                    this.logger.info('HandleCopyMultiple', { items: items, newPath: newPath });
                    this.clientFilesystem.OnCopyMultiple(items, newPath);
                    return [2 /*return*/, this.serverFilesystem.CopyMultiple(items, newPath)];
                }
                catch (error) {
                    this.reportError(error, 'Cannot copy items', 'Copy Error');
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * @param {?} items
     * @param {?} role
     * @param {?} entity
     * @param {?=} recursive
     * @return {?}
     */
    OptimisticFilesystemService.prototype.HandleSetPermissionsMultiple = /**
     * @param {?} items
     * @param {?} role
     * @param {?} entity
     * @param {?=} recursive
     * @return {?}
     */
    function (items, role, entity, recursive) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                try {
                    this.logger.info('HandleSetPermissionsMultiple', {
                        items: items,
                        role: role,
                        entity: entity,
                        recursive: recursive
                    });
                    this.clientFilesystem.OnSetPermissionsMultiple(items, role, entity, recursive);
                    return [2 /*return*/, this.serverFilesystem.SetPermissionsMultiple(items, role, entity, recursive)];
                }
                catch (error) {
                    this.reportError(error, 'Cannot set permissions to items', 'Permissions Error');
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * @param {?} items
     * @return {?}
     */
    OptimisticFilesystemService.prototype.HandleRemove = /**
     * @param {?} items
     * @return {?}
     */
    function (items) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                try {
                    this.logger.info('HandleRemove', { items: items });
                    this.clientFilesystem.OnRemove(items);
                    return [2 /*return*/, this.serverFilesystem.Remove(items)];
                }
                catch (error) {
                    this.reportError(error, 'Cannot remove items', 'Remove Error');
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * @return {?}
     */
    OptimisticFilesystemService.prototype.HandleNavigateUp = /**
     * @return {?}
     */
    function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            var currentPath, parentPath, error_5;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.logger.info('HandleNavigateUp');
                        return [4 /*yield*/, this.$CurrentPath.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["take"])(1)).toPromise()];
                    case 1:
                        currentPath = _a.sent();
                        parentPath = Object(path_browserify__WEBPACK_IMPORTED_MODULE_7__["dirname"])(currentPath);
                        return [2 /*return*/, this.HandleList(parentPath)];
                    case 2:
                        error_5 = _a.sent();
                        this.reportError(error_5, 'Cannot navigate to parent directory', 'Navigate Error');
                        throw new Error(error_5.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param {?} file
     * @return {?}
     */
    OptimisticFilesystemService.prototype.onSelectItem = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                this.clientFilesystem.onSelectItem(file);
                return [2 /*return*/];
            });
        });
    };
    /**
     * @param {?} filePath
     * @return {?}
     */
    OptimisticFilesystemService.prototype.GetItemByName = /**
     * @param {?} filePath
     * @return {?}
     */
    function (filePath) {
        /** @type {?} */
        var currentFiles = this.clientFilesystem.CurrentFiles();
        /** @type {?} */
        var match = currentFiles.find((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return f.fullPath === filePath; }));
        return match;
    };
    /**
     * @param {?} filePath
     * @return {?}
     */
    OptimisticFilesystemService.prototype.onSelectItemByName = /**
     * @param {?} filePath
     * @return {?}
     */
    function (filePath) {
        /** @type {?} */
        var match = this.GetItemByName(filePath);
        this.clientFilesystem.onSelectItem(match);
    };
    /**
     * @private
     * @return {?}
     */
    OptimisticFilesystemService.prototype.selectFirstInCurrentDirectory = /**
     * @private
     * @return {?}
     */
    function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            var currentFiles, firstSelected;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                currentFiles = this.clientFilesystem.CurrentFiles();
                firstSelected = Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__spread"])(currentFiles).shift();
                this.clientFilesystem.onSelectItem(firstSelected);
                return [2 /*return*/];
            });
        });
    };
    OptimisticFilesystemService.instanceCount = 0;
    OptimisticFilesystemService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Injectable"] }
    ];
    /** @nocollapse */
    OptimisticFilesystemService.ctorParameters = function () { return [
        { type: LoggerService },
        { type: NotificationService }
    ]; };
    return OptimisticFilesystemService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// temporary directory for the client while it refreshes
/**
 * @param {?} name
 * @param {?} fullPath
 * @return {?}
 */
function MakeClientDirectory(name, fullPath) {
    return {
        name: name,
        fullPath: fullPath,
        rightsFirebase: [],
        permissions: (/** @type {?} */ ({})),
        size: null,
        date: new Date().toISOString(),
        type: 'dir'
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var fileIcons = {
    defaultIcon: { name: 'file' },
    icons: [
        { name: 'word', fileExtensions: ['doc', 'docx', 'rtf'] },
        { name: 'pdf', fileExtensions: ['pdf'] },
        { name: 'table', fileExtensions: ['xlsx', 'xls', 'csv', 'tsv'] },
        {
            name: 'html',
            fileExtensions: ['html', 'htm', 'xhtml', 'html_vm', 'asp']
        },
        {
            name: 'markdown',
            fileExtensions: ['md', 'markdown', 'rst']
        },
        { name: 'yaml', fileExtensions: ['yaml', 'YAML-tmLanguage', 'yml'] },
        {
            name: 'xml',
            fileExtensions: [
                'xml',
                'plist',
                'xsd',
                'dtd',
                'xsl',
                'xslt',
                'resx',
                'iml',
                'xquery',
                'tmLanguage',
                'manifest',
                'project'
            ],
            fileNames: ['.htaccess']
        },
        {
            name: 'image',
            fileExtensions: [
                'png',
                'jpeg',
                'jpg',
                'gif',
                'svg',
                'ico',
                'tif',
                'tiff',
                'psd',
                'psb',
                'ami',
                'apx',
                'bmp',
                'bpg',
                'brk',
                'cur',
                'dds',
                'dng',
                'exr',
                'fpx',
                'gbr',
                'img',
                'jbig2',
                'jb2',
                'jng',
                'jxr',
                'pbm',
                'pgf',
                'pic',
                'raw',
                'webp',
                'eps'
            ]
        },
        { name: 'tex', fileExtensions: ['tex', 'cls', 'sty'] },
        {
            name: 'powerpoint',
            fileExtensions: [
                'pptx',
                'ppt',
                'pptm',
                'potx',
                'potm',
                'ppsx',
                'ppsm',
                'pps',
                'ppam',
                'ppa'
            ]
        },
        {
            name: 'video',
            fileExtensions: [
                'webm',
                'mkv',
                'flv',
                'vob',
                'ogv',
                'ogg',
                'gifv',
                'avi',
                'mov',
                'qt',
                'wmv',
                'yuv',
                'rm',
                'rmvb',
                'mp4',
                'm4v',
                'mpg',
                'mp2',
                'mpeg',
                'mpe',
                'mpv',
                'm2v'
            ]
        },
        { name: 'audio', fileExtensions: ['mp3', 'flac', 'm4a', 'wma', 'aiff'] },
        { name: 'document', fileExtensions: ['txt'] }
    ]
};
/** @type {?} */
var folderIcons = [
    {
        name: 'specific',
        defaultIcon: { name: 'folder-aws' },
        rootFolder: { name: 'folder-root' },
        icons: [
            { name: 'folder-src', folderNames: ['src', 'source', 'sources'] },
            { name: 'folder-dist', folderNames: ['dist', 'out', 'build', 'release'] },
            {
                name: 'folder-css',
                folderNames: ['css', 'stylesheet', 'stylesheets', 'style', 'styles']
            },
            { name: 'folder-sass', folderNames: ['sass', '_sass', 'scss', '_scss'] },
            {
                name: 'folder-images',
                folderNames: [
                    'images',
                    'image',
                    'img',
                    'icons',
                    'icon',
                    'ico',
                    'screenshot',
                    'screenshots'
                ]
            },
            { name: 'folder-scripts', folderNames: ['script', 'scripts'] },
            { name: 'folder-node', folderNames: ['node_modules'] },
            {
                name: 'folder-javascript',
                folderNames: ['js', 'javascript', 'javascripts']
            },
            { name: 'folder-font', folderNames: ['font', 'fonts'] },
            { name: 'folder-bower', folderNames: ['bower_components'] },
            {
                name: 'folder-test',
                folderNames: [
                    'test',
                    'tests',
                    'testing',
                    '__tests__',
                    '__snapshots__',
                    '__mocks__',
                    '__test__',
                    'spec',
                    'specs'
                ]
            },
            {
                name: 'folder-jinja',
                folderNames: ['jinja', 'jinja2', 'j2'],
                light: true
            },
            { name: 'folder-markdown', folderNames: ['markdown', 'md'] },
            { name: 'folder-php', folderNames: ['php'] },
            { name: 'folder-phpmailer', folderNames: ['phpmailer'] },
            { name: 'folder-sublime', folderNames: ['sublime'] },
            {
                name: 'folder-docs',
                folderNames: ['doc', 'docs', 'documents', 'documentation']
            },
            {
                name: 'folder-git',
                folderNames: ['.git', 'submodules', '.submodules']
            },
            { name: 'folder-github', folderNames: ['.github'] },
            { name: 'folder-gitlab', folderNames: ['.gitlab'] },
            { name: 'folder-vscode', folderNames: ['.vscode', '.vscode-test'] },
            {
                name: 'folder-views',
                folderNames: [
                    'view',
                    'views',
                    'screen',
                    'screens',
                    'page',
                    'pages',
                    'html'
                ]
            },
            { name: 'folder-vue', folderNames: ['vue'] },
            { name: 'folder-expo', folderNames: ['.expo'] },
            {
                name: 'folder-config',
                folderNames: [
                    'config',
                    'configs',
                    'configuration',
                    'configurations',
                    'settings',
                    'META-INF'
                ]
            },
            {
                name: 'folder-i18n',
                folderNames: [
                    'i18n',
                    'internationalization',
                    'lang',
                    'language',
                    'languages',
                    'locale',
                    'locales',
                    'localization',
                    'translation',
                    'translations'
                ]
            },
            { name: 'folder-components', folderNames: ['components'] },
            { name: 'folder-aurelia', folderNames: ['aurelia_project'] },
            {
                name: 'folder-resource',
                folderNames: [
                    'resource',
                    'resources',
                    'res',
                    'asset',
                    'assets',
                    'static'
                ]
            },
            {
                name: 'folder-lib',
                folderNames: ['lib', 'libs', 'library', 'libraries']
            },
            {
                name: 'folder-theme',
                folderNames: ['themes', 'theme', 'color', 'colors', 'design', 'designs']
            },
            { name: 'folder-webpack', folderNames: ['webpack'] },
            { name: 'folder-global', folderNames: ['global'] },
            { name: 'folder-public', folderNames: ['public', 'wwwroot'] },
            {
                name: 'folder-include',
                folderNames: ['include', 'includes', '_includes']
            },
            { name: 'folder-docker', folderNames: ['docker', '.docker'] },
            { name: 'folder-ngrx-effects', folderNames: ['effects'] },
            { name: 'folder-ngrx-state', folderNames: ['states', 'state'] },
            { name: 'folder-ngrx-reducer', folderNames: ['reducers', 'reducer'] },
            { name: 'folder-ngrx-actions', folderNames: ['actions'] },
            { name: 'folder-ngrx-entities', folderNames: ['entities'] },
            { name: 'folder-redux-reducer', folderNames: ['reducers', 'reducer'] },
            { name: 'folder-redux-actions', folderNames: ['actions'] },
            { name: 'folder-redux-store', folderNames: ['store'] },
            { name: 'folder-react-components', folderNames: ['components'] },
            {
                name: 'folder-database',
                folderNames: ['db', 'database', 'sql', 'data', '_data']
            },
            { name: 'folder-log', folderNames: ['log', 'logs'] },
            {
                name: 'folder-temp',
                folderNames: [
                    'temp',
                    '.temp',
                    'tmp',
                    '.tmp',
                    'cached',
                    'cache',
                    '.cache'
                ]
            },
            { name: 'folder-aws', folderNames: ['aws', '.aws'] },
            { name: 'folder-audio', folderNames: ['audio', 'audios', 'music'] },
            {
                name: 'folder-video',
                folderNames: ['video', 'videos', 'movie', 'movies']
            },
            { name: 'folder-kubernetes', folderNames: ['kubernetes', 'k8s'] },
            { name: 'folder-import', folderNames: ['import', 'imports', 'imported'] },
            { name: 'folder-export', folderNames: ['export', 'exports', 'exported'] },
            { name: 'folder-wakatime', folderNames: ['wakatime'] },
            { name: 'folder-circleci', folderNames: ['.circleci'] },
            { name: 'folder-wordpress', folderNames: ['wp-content'] },
            { name: 'folder-gradle', folderNames: ['gradle', '.gradle'] },
            { name: 'folder-coverage', folderNames: ['coverage', '.nyc-output'] },
            {
                name: 'folder-class',
                folderNames: ['class', 'classes', 'model', 'models']
            },
            {
                name: 'folder-other',
                folderNames: ['other', 'others', 'misc', 'miscellaneous']
            },
            { name: 'folder-typescript', folderNames: ['typescript', 'ts'] },
            { name: 'folder-routes', folderNames: ['routes'] },
            { name: 'folder-ci', folderNames: ['.ci', 'ci'] },
            {
                name: 'folder-benchmark',
                folderNames: [
                    'benchmark',
                    'benchmarks',
                    'performance',
                    'measure',
                    'measures',
                    'measurement'
                ]
            },
            {
                name: 'folder-messages',
                folderNames: [
                    'messages',
                    'forum',
                    'chat',
                    'chats',
                    'conversation',
                    'conversations'
                ]
            },
            { name: 'folder-less', folderNames: ['less'] },
            { name: 'folder-python', folderNames: ['python', '__pycache__'] },
            { name: 'folder-debug', folderNames: ['debug', 'debugging'] },
            { name: 'folder-fastlane', folderNames: ['fastlane'] },
            {
                name: 'folder-plugin',
                folderNames: [
                    'plugin',
                    'plugins',
                    '_plugins',
                    'extension',
                    'extensions',
                    'addon',
                    'addons'
                ]
            },
            {
                name: 'folder-controller',
                folderNames: ['controller', 'controllers', 'service', 'services']
            },
            { name: 'folder-ansible', folderNames: ['ansible'] },
            { name: 'folder-server', folderNames: ['server', 'servers', 'backend'] },
            { name: 'folder-client', folderNames: ['client', 'clients', 'frontend'] },
            { name: 'folder-tasks', folderNames: ['tasks', 'tickets'] },
            { name: 'folder-android', folderNames: ['android'] },
            { name: 'folder-ios', folderNames: ['ios'] },
            { name: 'folder-upload', folderNames: ['uploads', 'upload'] },
            { name: 'folder-download', folderNames: ['downloads', 'download'] },
            { name: 'folder-tools', folderNames: ['tools'] },
            { name: 'folder-helper', folderNames: ['helpers', 'helper'] }
        ]
    },
    {
        name: 'classic',
        defaultIcon: { name: 'folder' },
        rootFolder: { name: 'folder-root' }
    },
    { name: 'none', defaultIcon: { name: '' } }
];
/** @type {?} */
var getFileIconName = (/**
 * @param {?} input
 * @return {?}
 */
function (input) {
    if (!input || !input.includes('.')) {
        return fileIcons.defaultIcon.name;
    }
    /** @type {?} */
    var filename = input.toLowerCase();
    /** @type {?} */
    var ext = getFileExtension(filename);
    /** @type {?} */
    var matchesExt = fileIcons.icons.filter((/**
     * @param {?} x
     * @return {?}
     */
    function (x) { return !!x.fileExtensions && !!x.fileExtensions.filter((/**
     * @param {?} y
     * @return {?}
     */
    function (y) { return y === ext; })).length; }));
    /** @type {?} */
    var matchesFilename = fileIcons.icons.filter((/**
     * @param {?} x
     * @return {?}
     */
    function (x) { return !!x.fileNames && !!x.fileNames.filter((/**
     * @param {?} y
     * @return {?}
     */
    function (y) { return y === filename; })).length; }));
    if (!!matchesFilename.length) {
        return matchesFilename[0].name;
    }
    else if (!!matchesExt.length) {
        return matchesExt[0].name;
    }
    return fileIcons.defaultIcon.name;
});
/** @type {?} */
var isFileImage = (/**
 * @param {?} filename
 * @return {?}
 */
function (filename) { return getFileIconName(filename) === 'image'; });
/** @type {?} */
var getFileExtension = (/**
 * @param {?} filename
 * @return {?}
 */
function (filename) { return filename.split('.').pop(); });
/** @type {?} */
var getFileName = (/**
 * @param {?} filename
 * @return {?}
 */
function (filename) {
    /** @type {?} */
    var slashSegments = filename.split('/');
    /** @type {?} */
    var filenameWithExt = slashSegments.pop();
    /** @type {?} */
    var dotSegments = filenameWithExt.split('.');
    if (dotSegments.length < 2) {
        return filenameWithExt;
    }
    dotSegments.pop();
    return dotSegments.join('.');
});
/** @type {?} */
var getFolderIconName = (/**
 * @param {?} filename
 * @return {?}
 */
function (filename) {
    return 'folder-other';
    filename = filename.toLowerCase();
    /** @type {?} */
    var matches = folderIcons[0].icons.filter((/**
     * @param {?} x
     * @return {?}
     */
    function (x) { return !!x.folderNames && !!x.folderNames.filter((/**
     * @param {?} y
     * @return {?}
     */
    function (y) { return y === filename; })).length; }));
    if (!!matches.length) {
        return matches[0].name;
    }
    return folderIcons[0].defaultIcon.name;
});
/** @type {?} */
var guesser = {
    isFileImage: isFileImage,
    getFileExtension: getFileExtension,
    getFileName: getFileName,
    getFolderIconName: getFolderIconName,
    getFileIconName: getFileIconName,
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var getFileIcon = (/**
 * @param {?} filename
 * @return {?}
 */
function (filename) {
    return '/assets/fileicons/' + guesser.getFileIconName(filename) + '.svg';
});
/** @type {?} */
var getFolderIcon = (/**
 * @param {?} filename
 * @return {?}
 */
function (filename) {
    return '/assets/fileicons/' + guesser.getFolderIconName(filename) + '.svg';
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ConsoleLoggerService = /** @class */ (function () {
    function ConsoleLoggerService() {
    }
    Object.defineProperty(ConsoleLoggerService.prototype, "info", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var boundLogFn = console.log.bind(console, 'ngx-fm:: ');
            return boundLogFn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConsoleLoggerService.prototype, "warn", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var boundLogFn = console.warn.bind(console, 'ngx-fm:: ');
            return boundLogFn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConsoleLoggerService.prototype, "error", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var boundLogFn = console.error.bind(console, 'ngx-fm:: ');
            return boundLogFn;
        },
        enumerable: true,
        configurable: true
    });
    ConsoleLoggerService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Injectable"] }
    ];
    return ConsoleLoggerService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClientCache = /** @class */ (function () {
    function ClientCache() {
        this.logger = new ConsoleLoggerService();
        this.cachedFolders = {};
        this.cacheLimit = 20;
    }
    /**
     * @param {?} folderPath
     * @return {?}
     */
    ClientCache.prototype.GetCached = /**
     * @param {?} folderPath
     * @return {?}
     */
    function (folderPath) {
        return this.cachedFolders[folderPath] || [];
    };
    /**
     * @param {?} folderPath
     * @param {?} newFolderFiles
     * @return {?}
     */
    ClientCache.prototype.SetCached = /**
     * @param {?} folderPath
     * @param {?} newFolderFiles
     * @return {?}
     */
    function (folderPath, newFolderFiles) {
        /** @type {?} */
        var oldFolders = this.GetCached(folderPath);
        this.logger.info('SetCached()', {
            from: oldFolders.length,
            to: newFolderFiles.length
        });
        if (this.cachedCount > this.cacheLimit) {
            this.removeRandomFolderPath();
        }
        this.cachedFolders[folderPath] = newFolderFiles;
    };
    Object.defineProperty(ClientCache.prototype, "cachedCount", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return Object.keys(this.cachedFolders).length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    ClientCache.prototype.removeRandomFolderPath = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var randomIndex = Math.floor(Math.random() * this.cachedCount);
        /** @type {?} */
        var randomKey = Object.keys(this.cachedFolders)[randomIndex];
        delete this.cachedFolders[randomKey];
    };
    return ClientCache;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClientFileSystemDataStore = /** @class */ (function () {
    function ClientFileSystemDataStore() {
        this.cache = new ClientCache();
        this._$currentFiles = new rxjs__WEBPACK_IMPORTED_MODULE_10__["BehaviorSubject"]([]);
        this._$currentPath = new rxjs__WEBPACK_IMPORTED_MODULE_10__["BehaviorSubject"](null);
        this._$selectedFile = new rxjs__WEBPACK_IMPORTED_MODULE_10__["BehaviorSubject"](null);
        this.logger = new ConsoleLoggerService();
    }
    Object.defineProperty(ClientFileSystemDataStore.prototype, "$currentFiles", {
        get: /**
         * @return {?}
         */
        function () {
            return this._$currentFiles;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientFileSystemDataStore.prototype, "$currentPath", {
        get: /**
         * @return {?}
         */
        function () {
            return this._$currentPath;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientFileSystemDataStore.prototype, "$selectedFile", {
        get: /**
         * @return {?}
         */
        function () {
            return this._$selectedFile;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClientFileSystemDataStore.prototype.CurrentPath = /**
     * @return {?}
     */
    function () {
        return this._$currentPath.value;
    };
    /**
     * @return {?}
     */
    ClientFileSystemDataStore.prototype.CurrentFiles = /**
     * @return {?}
     */
    function () {
        return this._$currentFiles.value;
    };
    /**
     * @param {?} directoryPath
     * @return {?}
     */
    ClientFileSystemDataStore.prototype.GetCached = /**
     * @param {?} directoryPath
     * @return {?}
     */
    function (directoryPath) {
        return this.cache.GetCached(directoryPath);
    };
    /**
     * @param {?} files
     * @param {?} directoryPath
     * @return {?}
     */
    ClientFileSystemDataStore.prototype.SetDirectoryFiles = /**
     * @param {?} files
     * @param {?} directoryPath
     * @return {?}
     */
    function (files, directoryPath) {
        this.cache.SetCached(directoryPath, files);
    };
    /**
     * @param {?} path
     * @return {?}
     */
    ClientFileSystemDataStore.prototype.SetPath = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        this.logger.info('datastore.SetPath', { path: path });
        if (!path.startsWith('/')) {
            throw new Error('No / at beginning of path!');
        }
        /** @type {?} */
        var cachedFiles = this.cache.GetCached(path);
        this._$currentPath.next(path);
        this._$currentFiles.next(cachedFiles);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ClientFileSystemDataStore.prototype.SelectFile = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this._$selectedFile.next(item);
    };
    return ClientFileSystemDataStore;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable:member-ordering
var ClientFileSystemService = /** @class */ (function () {
    function ClientFileSystemService(logger) {
        this.logger = logger;
        this.store = new ClientFileSystemDataStore();
        this.instanceCountIncr();
    }
    Object.defineProperty(ClientFileSystemService.prototype, "$currentFiles", {
        get: /**
         * @return {?}
         */
        function () {
            return this.store.$currentFiles;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientFileSystemService.prototype, "$currentPath", {
        get: /**
         * @return {?}
         */
        function () {
            return this.store.$currentPath;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientFileSystemService.prototype, "$selectedFile", {
        get: /**
         * @return {?}
         */
        function () {
            return this.store.$selectedFile;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    ClientFileSystemService.prototype.instanceCountIncr = /**
     * @private
     * @return {?}
     */
    function () {
        ClientFileSystemService.instanceCount++;
        this.logger.info('new instance created', { instances: this.instances });
    };
    /**
     * @private
     * @return {?}
     */
    ClientFileSystemService.prototype.instanceCountDecr = /**
     * @private
     * @return {?}
     */
    function () {
        ClientFileSystemService.instanceCount--;
        this.logger.info('instance destroyed', { instances: this.instances });
    };
    Object.defineProperty(ClientFileSystemService.prototype, "instances", {
        get: /**
         * @return {?}
         */
        function () {
            return ClientFileSystemService.instanceCount;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ClientFileSystemService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.instanceCountDecr();
    };
    /**
     * @param {?} folderPath
     * @return {?}
     */
    ClientFileSystemService.prototype.OnList = /**
     * @param {?} folderPath
     * @return {?}
     */
    function (folderPath) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                this.logger.info('client.OnList', { folderPath: folderPath });
                this.store.SetPath(folderPath);
                return [2 /*return*/];
            });
        });
    };
    /**
     * @param {?} newPath
     * @return {?}
     */
    ClientFileSystemService.prototype.OnCreateFolder = /**
     * @param {?} newPath
     * @return {?}
     */
    function (newPath) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            var directoryPath, cachedFiles, folderName, newFolder;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                directoryPath = Object(path_browserify__WEBPACK_IMPORTED_MODULE_7__["dirname"])(newPath);
                cachedFiles = this.store.GetCached(directoryPath);
                folderName = Object(path_browserify__WEBPACK_IMPORTED_MODULE_7__["basename"])(newPath);
                newFolder = MakeClientDirectory(folderName, newPath);
                cachedFiles.unshift(newFolder);
                this.store.SetDirectoryFiles(cachedFiles, directoryPath);
                this.store.SetPath(directoryPath);
                return [2 /*return*/];
            });
        });
    };
    /**
     * @param {?} singleFileName
     * @param {?} newPath
     * @return {?}
     */
    ClientFileSystemService.prototype.OnCopy = /**
     * @param {?} singleFileName
     * @param {?} newPath
     * @return {?}
     */
    function (singleFileName, newPath) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () { return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    /**
     * @param {?} item
     * @param {?} newPath
     * @return {?}
     */
    ClientFileSystemService.prototype.OnMove = /**
     * @param {?} item
     * @param {?} newPath
     * @return {?}
     */
    function (item, newPath) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                return [2 /*return*/, this.removeSingleFromList(item)];
            });
        });
    };
    /**
     * @param {?} item
     * @param {?} newItemPath
     * @return {?}
     */
    ClientFileSystemService.prototype.OnRename = /**
     * @param {?} item
     * @param {?} newItemPath
     * @return {?}
     */
    function (item, newItemPath) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () { return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    /**
     * @param {?} item
     * @param {?} content
     * @return {?}
     */
    ClientFileSystemService.prototype.OnEdit = /**
     * @param {?} item
     * @param {?} content
     * @return {?}
     */
    function (item, content) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () { return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ClientFileSystemService.prototype.OnGetcontent = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () { return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    /**
     * @param {?} item
     * @param {?} role
     * @param {?} entity
     * @param {?=} recursive
     * @return {?}
     */
    ClientFileSystemService.prototype.OnSetPermissions = /**
     * @param {?} item
     * @param {?} role
     * @param {?} entity
     * @param {?=} recursive
     * @return {?}
     */
    function (item, role, entity, recursive) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () { return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    /**
     * @param {?} items
     * @param {?} newPath
     * @return {?}
     */
    ClientFileSystemService.prototype.OnMoveMultiple = /**
     * @param {?} items
     * @param {?} newPath
     * @return {?}
     */
    function (items, newPath) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                return [2 /*return*/, this.removeMultiple(items)];
            });
        });
    };
    /**
     * @param {?} items
     * @param {?} newPath
     * @return {?}
     */
    ClientFileSystemService.prototype.OnCopyMultiple = /**
     * @param {?} items
     * @param {?} newPath
     * @return {?}
     */
    function (items, newPath) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () { return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    /**
     * @param {?} items
     * @param {?} role
     * @param {?} entity
     * @param {?=} recursive
     * @return {?}
     */
    ClientFileSystemService.prototype.OnSetPermissionsMultiple = /**
     * @param {?} items
     * @param {?} role
     * @param {?} entity
     * @param {?=} recursive
     * @return {?}
     */
    function (items, role, entity, recursive) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () { return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    /**
     * @param {?} items
     * @return {?}
     */
    ClientFileSystemService.prototype.OnRemove = /**
     * @param {?} items
     * @return {?}
     */
    function (items) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                return [2 /*return*/, this.removeMultiple(items)];
            });
        });
    };
    /**
     * @param {?} res
     * @param {?} directoryPath
     * @return {?}
     */
    ClientFileSystemService.prototype.UpdateList = /**
     * @param {?} res
     * @param {?} directoryPath
     * @return {?}
     */
    function (res, directoryPath) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                this.store.SetDirectoryFiles(res.result, directoryPath);
                return [2 /*return*/];
            });
        });
    };
    /**
     * @private
     * @param {?} filePath
     * @return {?}
     */
    ClientFileSystemService.prototype.removeSingleFromList = /**
     * @private
     * @param {?} filePath
     * @return {?}
     */
    function (filePath) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            var directoryPath, currentFiles, itemName, cachedFilesWithout;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                directoryPath = Object(path_browserify__WEBPACK_IMPORTED_MODULE_7__["dirname"])(filePath);
                currentFiles = this.store.GetCached(filePath);
                itemName = this.GetFileNameFromPath(filePath);
                cachedFilesWithout = currentFiles.filter((/**
                 * @param {?} f
                 * @return {?}
                 */
                function (f) { return f.name !== itemName; }));
                this.store.SetDirectoryFiles(cachedFilesWithout, directoryPath);
                return [2 /*return*/];
            });
        });
    };
    /**
     * @private
     * @param {?} inputPath
     * @return {?}
     */
    ClientFileSystemService.prototype.EnsureNoTrailingSlash = /**
     * @private
     * @param {?} inputPath
     * @return {?}
     */
    function (inputPath) {
        /** @type {?} */
        var hasTrailing = inputPath.slice(-1) === '/';
        /** @type {?} */
        var pathParsed = hasTrailing ? inputPath.slice(0, -1) : inputPath;
        return pathParsed;
    };
    /**
     * @private
     * @param {?} inputPath
     * @return {?}
     */
    ClientFileSystemService.prototype.GetFileNameFromPath = /**
     * @private
     * @param {?} inputPath
     * @return {?}
     */
    function (inputPath) {
        /** @type {?} */
        var safePath = inputPath || '';
        /** @type {?} */
        var parsedPath = this.EnsureNoTrailingSlash(safePath);
        /** @type {?} */
        var basename$$1 = parsedPath.split('/').pop();
        return basename$$1;
    };
    /**
     * @private
     * @param {?} filePaths
     * @return {?}
     */
    ClientFileSystemService.prototype.removeMultiple = /**
     * @private
     * @param {?} filePaths
     * @return {?}
     */
    function (filePaths) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            var directoryPath, removeSet, currentFiles, cachedFilesWithout;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                directoryPath = Object(path_browserify__WEBPACK_IMPORTED_MODULE_7__["dirname"])(filePaths[0]);
                removeSet = new Set(filePaths.map((/**
                 * @param {?} filePath
                 * @return {?}
                 */
                function (filePath) { return Object(path_browserify__WEBPACK_IMPORTED_MODULE_7__["basename"])(filePath); })));
                currentFiles = this.store.GetCached(directoryPath);
                cachedFilesWithout = currentFiles.filter((/**
                 * @param {?} f
                 * @return {?}
                 */
                function (f) { return !removeSet.has(f.name); }));
                this.store.SetDirectoryFiles(cachedFilesWithout, directoryPath);
                this.store.SetPath(directoryPath);
                return [2 /*return*/];
            });
        });
    };
    Object.defineProperty(ClientFileSystemService.prototype, "$FilesWithIcons", {
        get: /**
         * @return {?}
         */
        function () {
            var _this = this;
            return this.$currentFiles.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])((/**
             * @param {?} files
             * @return {?}
             */
            function (files) { return (files ? files : []); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])((/**
             * @param {?} files
             * @return {?}
             */
            function (files) { return files.map((/**
             * @param {?} file
             * @return {?}
             */
            function (file) { return _this.addIconPath(file); })); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])((/**
             * @param {?} files
             * @return {?}
             */
            function (files) {
                return files.map((/**
                 * @param {?} file
                 * @return {?}
                 */
                function (file) {
                    return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__assign"])({}, file);
                }));
            })));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientFileSystemService.prototype, "$NoParentFolder", {
        get: /**
         * @return {?}
         */
        function () {
            return this.$currentPath.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["filter"])((/**
             * @param {?} p
             * @return {?}
             */
            function (p) { return !!p; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])((/**
             * @param {?} p
             * @return {?}
             */
            function (p) { return p.split('/').length < 2; })));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} item
     * @return {?}
     */
    ClientFileSystemService.prototype.onSelectItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.store.SelectFile(item);
    };
    /**
     * @return {?}
     */
    ClientFileSystemService.prototype.CurrentFiles = /**
     * @return {?}
     */
    function () {
        return this.store.CurrentFiles();
    };
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    ClientFileSystemService.prototype.addIconPath = /**
     * @private
     * @param {?} file
     * @return {?}
     */
    function (file) {
        if (file.type === 'file') {
            file['icon'] = getFileIcon(file.name);
        }
        else {
            file['icon'] = getFolderIcon(file.name);
        }
        return file;
    };
    ClientFileSystemService.instanceCount = 0;
    ClientFileSystemService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Injectable"] }
    ];
    /** @nocollapse */
    ClientFileSystemService.ctorParameters = function () { return [
        { type: LoggerService }
    ]; };
    return ClientFileSystemService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AppDialogRenameComponent = /** @class */ (function () {
    function AppDialogRenameComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.renamedItem = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]();
        /** @type {?} */
        var name = Object(path_browserify__WEBPACK_IMPORTED_MODULE_7__["basename"])(data.currentPath);
        this.renamedItem.setValue(name);
    }
    /**
     * @return {?}
     */
    AppDialogRenameComponent.prototype.onSubmit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var renamedFullPath = this.newPath;
        this.dialogRef.close(renamedFullPath);
    };
    /**
     * @return {?}
     */
    AppDialogRenameComponent.prototype.onCancel = /**
     * @return {?}
     */
    function () {
        this.dialogRef.close();
    };
    Object.defineProperty(AppDialogRenameComponent.prototype, "newPath", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var directoryPath = Object(path_browserify__WEBPACK_IMPORTED_MODULE_7__["dirname"])(this.data.currentPath);
            /** @type {?} */
            var newItemName = this.renamedItem.value;
            if (this.IsDir) {
                return Object(path_browserify__WEBPACK_IMPORTED_MODULE_7__["join"])(directoryPath, newItemName, '/');
            }
            return Object(path_browserify__WEBPACK_IMPORTED_MODULE_7__["join"])(directoryPath, newItemName);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppDialogRenameComponent.prototype, "IsDir", {
        get: /**
         * @return {?}
         */
        function () {
            return this.data.currentPath.endsWith('/');
        },
        enumerable: true,
        configurable: true
    });
    AppDialogRenameComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Component"], args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'ngx-filemanager-rename-file-dialog',
                    template: "\n    <base-dialog\n      [header]=\"headerTemplate\"\n      [body]=\"bodyTemplate\"\n      [actions]=\"actionsTemplate\"\n    >\n      <ng-template #headerTemplate>\n        <h2>Rename Item</h2>\n      </ng-template>\n      <ng-template #bodyTemplate>\n        <h5 class=\"p5 m0\">Old Path: {{ data.currentPath }}</h5>\n        <h5 class=\"p5 m0\">New Path: {{ newPath }}</h5>\n\n        <mat-form-field>\n          <input\n            matInput\n            placeholder=\"New Name\"\n            [formControl]=\"renamedItem\"\n            (keyup.enter)=\"onSubmit()\"\n          />\n        </mat-form-field>\n      </ng-template>\n      <ng-template #actionsTemplate>\n        <btns-cancel-ok\n          okIcon=\"done\"\n          okLabel=\"Rename Item\"\n          (clickedCancel)=\"onCancel()\"\n          (clickedOk)=\"onSubmit()\"\n        >\n        </btns-cancel-ok>\n      </ng-template>\n    </base-dialog>\n  ",
                    styles: [".is-red{background:red}.flex-col{display:flex;flex-direction:column}.flex-row{display:flex;flex-direction:row}.align-center{align-items:center}.fit-content{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.sans-serif{font-family:sans-serif}.has-pointer{cursor:pointer}.scroll-x{overflow-x:auto}.full-width{width:100%}.text-center{text-align:center}.space-between{justify-content:space-between}.capitalize{text-transform:capitalize}.p5{padding:5px}.m0{margin:0}"]
                }] }
    ];
    /** @nocollapse */
    AppDialogRenameComponent.ctorParameters = function () { return [
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_4__["MAT_DIALOG_DATA"],] }] }
    ]; };
    return AppDialogRenameComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} inputPath
 * @return {?}
 */
function HasPrefixSlash(inputPath) {
    if (!inputPath || !inputPath.length) {
        return false;
    }
    /** @type {?} */
    var hasPrefix = inputPath.startsWith('/');
    return hasPrefix;
}
/**
 * @param {?} inputPath
 * @return {?}
 */
function HasTrailingSlash(inputPath) {
    if (!inputPath || !inputPath.length) {
        return false;
    }
    /** @type {?} */
    var hasPrefix = inputPath.endsWith('/');
    return hasPrefix;
}
/**
 * @param {?} inputPath
 * @return {?}
 */
function EnsurePrefixSlash(inputPath) {
    /** @type {?} */
    var hasPrefix = HasPrefixSlash(inputPath);
    /** @type {?} */
    var pathParsed = hasPrefix ? inputPath : '/' + inputPath;
    return pathParsed;
}
/**
 * @param {?} inputPath
 * @return {?}
 */
function EnsureTrailingSlash(inputPath) {
    /** @type {?} */
    var hasTrailing = HasTrailingSlash(inputPath);
    /** @type {?} */
    var pathParsed = hasTrailing ? inputPath : inputPath + '/';
    return pathParsed;
}
/**
 * @param {?} inputPath
 * @return {?}
 */
function EnsureAbsoluteDirectory(inputPath) {
    /** @type {?} */
    var pathParsed = EnsureTrailingSlash(EnsurePrefixSlash(inputPath));
    return pathParsed;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AppDialogCopyComponent = /** @class */ (function () {
    function AppDialogCopyComponent(logger, dialogRef, data) {
        this.logger = logger;
        this.dialogRef = dialogRef;
        this.data = data;
        this.logger.info('initializing dialog:', { data: this.data });
        this.items = data.files;
        if (this.data.isCopy) {
            this.OkLabel = 'Copy';
            this.OkIcon = 'content_copy';
        }
        else {
            this.OkLabel = 'Move';
            this.OkIcon = 'forward';
        }
        this.serverFilesystem = data.serverFilesystem;
        /** @type {?} */
        var firstFile = Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__spread"])(this.items).pop();
        this.currentDir = EnsureTrailingSlash(Object(path_browserify__WEBPACK_IMPORTED_MODULE_7__["dirname"])(firstFile.fullPath));
    }
    Object.defineProperty(AppDialogCopyComponent.prototype, "SelectedFolder", {
        get: /**
         * @return {?}
         */
        function () {
            return !!this.copyToPath;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppDialogCopyComponent.prototype, "SameAsRoot", {
        get: /**
         * @return {?}
         */
        function () {
            return this.copyToPath === this.currentDir;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppDialogCopyComponent.prototype, "DisableCopy", {
        get: /**
         * @return {?}
         */
        function () {
            return !this.SelectedFolder || this.SameAsRoot;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} selectedDirectory
     * @return {?}
     */
    AppDialogCopyComponent.prototype.onClickedItem = /**
     * @param {?} selectedDirectory
     * @return {?}
     */
    function (selectedDirectory) {
        this.logger.info('clicked this item:', { file: selectedDirectory });
        this.copyToPath = selectedDirectory;
    };
    /**
     * @return {?}
     */
    AppDialogCopyComponent.prototype.onSubmit = /**
     * @return {?}
     */
    function () {
        this.dialogRef.close(this.copyToPath);
    };
    /**
     * @return {?}
     */
    AppDialogCopyComponent.prototype.onCancel = /**
     * @return {?}
     */
    function () {
        this.dialogRef.close();
    };
    AppDialogCopyComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Component"], args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'ngx-filemanager-copy-dialog',
                    template: "\n    <base-dialog\n      [header]=\"headerTemplate\"\n      [body]=\"bodyTemplate\"\n      [actions]=\"actionsTemplate\"\n    >\n      <ng-template #headerTemplate>\n        <h2>{{OkLabel}} Items</h2>\n      </ng-template>\n      <ng-template #bodyTemplate>\n        <h5>Selected Items</h5>\n        <ol>\n          <li *ngFor=\"let file of items\">\n            {{ file.name }}\n          </li>\n        </ol>\n        <div>\n          <app-file-table-mini-folder-browser\n            (selectedDirectory)=\"onClickedItem($event)\"\n            [serverFilesystem]=\"this.serverFilesystem\"\n            currentDirectory=\"/\"\n          >\n          </app-file-table-mini-folder-browser>\n        </div>\n      </ng-template>\n      <ng-template #actionsTemplate>\n        <h5 class=\"p5 m0\" *ngIf=\"!SelectedFolder\">No folder selected</h5>\n        <h5 class=\"p5 m0\" *ngIf=\"SameAsRoot\">Cannot copy to the same folder</h5>\n        <h5 class=\"p5 m0\" *ngIf=\"!DisableCopy\">CopyTo Path: {{copyToPath}}</h5>\n        <btns-cancel-ok\n          [okIcon]=\"OkIcon\"\n          [okLabel]=\"OkLabel\"\n          [okDisabled]=\"DisableCopy\"\n          (clickedCancel)=\"onCancel()\"\n          (clickedOk)=\"onSubmit()\"\n        >\n        </btns-cancel-ok>\n      </ng-template>\n    </base-dialog>\n  ",
                    styles: [".is-red{background:red}.flex-col{display:flex;flex-direction:column}.flex-row{display:flex;flex-direction:row}.align-center{align-items:center}.fit-content{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.sans-serif{font-family:sans-serif}.has-pointer{cursor:pointer}.scroll-x{overflow-x:auto}.full-width{width:100%}.text-center{text-align:center}.space-between{justify-content:space-between}.capitalize{text-transform:capitalize}.p5{padding:5px}.m0{margin:0}"]
                }] }
    ];
    /** @nocollapse */
    AppDialogCopyComponent.ctorParameters = function () { return [
        { type: LoggerService },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_4__["MAT_DIALOG_DATA"],] }] }
    ]; };
    return AppDialogCopyComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AppDialogSetPermissionsComponent = /** @class */ (function () {
    function AppDialogSetPermissionsComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.roleControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('READER');
        this.roleOptions = ['OWNER', 'WRITER', 'READER'];
        this.entityTypeControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('group');
        this.entityTypeOptions = ['user', 'group'];
        this.entityControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]();
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_10__["Subject"]();
        this.items = data.files;
        /** @type {?} */
        var config = data.config;
        this.$users = config.users.pipe(this.pipeConvertToEntity('user'));
        this.$groups = config.groups.pipe(this.pipeConvertToEntity('group'));
    }
    /**
     * @param {?} type
     * @return {?}
     */
    AppDialogSetPermissionsComponent.prototype.pipeConvertToEntity = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_10__["pipe"])(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])((/**
         * @param {?} arr
         * @return {?}
         */
        function (arr) {
            return arr.map((/**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                /** @type {?} */
                var entity = {
                    name: value.name,
                    id: value.uid,
                    type: type
                };
                return entity;
            }));
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["tap"])((/**
         * @param {?} vals
         * @return {?}
         */
        function (vals) { return console.log('dialog setpermissions', { type: type, vals: vals }); })));
    };
    /**
     * @return {?}
     */
    AppDialogSetPermissionsComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroyed.next();
    };
    Object.defineProperty(AppDialogSetPermissionsComponent.prototype, "EntityControlLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.entityTypeControl.value === 'user' ? 'User' : 'Group';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppDialogSetPermissionsComponent.prototype, "HasSelectedUser", {
        get: /**
         * @return {?}
         */
        function () {
            return this.entityTypeControl.value === 'user';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AppDialogSetPermissionsComponent.prototype.onSubmit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var response = {
            role: this.roleControl.value,
            entity: this.entityControl.value,
            files: this.data.files
        };
        this.dialogRef.close(response);
    };
    /**
     * @return {?}
     */
    AppDialogSetPermissionsComponent.prototype.onCancel = /**
     * @return {?}
     */
    function () {
        this.dialogRef.close();
    };
    AppDialogSetPermissionsComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Component"], args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'ngx-filemanager-setpermissions-dialog',
                    template: "\n    <base-dialog\n      [header]=\"headerTemplate\"\n      [body]=\"bodyTemplate\"\n      [actions]=\"actionsTemplate\"\n    >\n      <ng-template #headerTemplate>\n        <h2>Set Permissions</h2>\n      </ng-template>\n      <ng-template #bodyTemplate>\n        <h5>Selected Items</h5>\n        <ol>\n          <li *ngFor=\"let file of items\">\n            {{ file.name }}\n          </li>\n        </ol>\n\n        <mat-form-field class=\"full-width\">\n          <mat-select\n            matInput\n            [formControl]=\"entityTypeControl\"\n            placeholder=\"Type\"\n          >\n            <mat-option\n              *ngFor=\"let option of entityTypeOptions\"\n              [value]=\"option\"\n            >\n              {{ option }}\n            </mat-option>\n          </mat-select>\n        </mat-form-field>\n\n        <mat-form-field class=\"full-width\" *ngIf=\"HasSelectedUser\">\n          <mat-select\n            matInput\n            [formControl]=\"entityControl\"\n            [placeholder]=\"EntityControlLabel\"\n          >\n            <mat-option\n              *ngFor=\"let entity of ($users | async)\"\n              [value]=\"entity\"\n            >\n              {{ entity.name }}\n            </mat-option>\n          </mat-select>\n        </mat-form-field>\n\n        <mat-form-field class=\"full-width\" *ngIf=\"!HasSelectedUser\">\n          <mat-select\n            matInput\n            [formControl]=\"entityControl\"\n            [placeholder]=\"EntityControlLabel\"\n          >\n            <mat-option\n              *ngFor=\"let entity of ($groups | async)\"\n              [value]=\"entity\"\n            >\n              {{ entity.name }}\n            </mat-option>\n          </mat-select>\n        </mat-form-field>\n\n        <mat-form-field class=\"full-width\">\n          <mat-select\n            matInput\n            [formControl]=\"roleControl\"\n            placeholder=\"Permissions\"\n          >\n            <mat-option *ngFor=\"let option of roleOptions\" [value]=\"option\">\n              {{ option }}\n            </mat-option>\n          </mat-select>\n        </mat-form-field>\n      </ng-template>\n      <ng-template #actionsTemplate>\n        <btns-cancel-ok\n          okIcon=\"done\"\n          okLabel=\"Set Permissions\"\n          (clickedCancel)=\"onCancel()\"\n          (clickedOk)=\"onSubmit()\"\n        >\n        </btns-cancel-ok>\n      </ng-template>\n    </base-dialog>\n  ",
                    styles: [".is-red{background:red}.flex-col{display:flex;flex-direction:column}.flex-row{display:flex;flex-direction:row}.align-center{align-items:center}.fit-content{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.sans-serif{font-family:sans-serif}.has-pointer{cursor:pointer}.scroll-x{overflow-x:auto}.full-width{width:100%}.text-center{text-align:center}.space-between{justify-content:space-between}.capitalize{text-transform:capitalize}.p5{padding:5px}.m0{margin:0}"]
                }] }
    ];
    /** @nocollapse */
    AppDialogSetPermissionsComponent.ctorParameters = function () { return [
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_4__["MAT_DIALOG_DATA"],] }] }
    ]; };
    return AppDialogSetPermissionsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AppDialogNewFolderComponent = /** @class */ (function () {
    function AppDialogNewFolderComponent(dialogRef) {
        this.dialogRef = dialogRef;
        this.folderName = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('New folder');
    }
    /**
     * @return {?}
     */
    AppDialogNewFolderComponent.prototype.onSubmit = /**
     * @return {?}
     */
    function () {
        this.dialogRef.close(this.folderName.value);
    };
    /**
     * @return {?}
     */
    AppDialogNewFolderComponent.prototype.onCancel = /**
     * @return {?}
     */
    function () {
        this.dialogRef.close();
    };
    AppDialogNewFolderComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Component"], args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'ngx-filemanager-new-folder-dialog',
                    template: "\n    <base-dialog\n      [header]=\"headerTemplate\"\n      [body]=\"bodyTemplate\"\n      [actions]=\"actionsTemplate\"\n    >\n      <ng-template #headerTemplate>\n        <h2>Create Folder</h2>\n      </ng-template>\n      <ng-template #bodyTemplate>\n        <div>\n          <mat-form-field>\n            <input\n              matInput\n              placeholder=\"New Folder Name\"\n              [formControl]=\"folderName\"\n              (keyup.enter)=\"onSubmit()\"\n            />\n          </mat-form-field>\n        </div>\n      </ng-template>\n      <ng-template #actionsTemplate>\n        <btns-cancel-ok\n          okIcon=\"done\"\n          okLabel=\"Create Folder\"\n          (clickedCancel)=\"onCancel()\"\n          (clickedOk)=\"onSubmit()\"\n        >\n        </btns-cancel-ok>\n      </ng-template>\n    </base-dialog>\n  ",
                    styles: [".is-red{background:red}.flex-col{display:flex;flex-direction:column}.flex-row{display:flex;flex-direction:row}.align-center{align-items:center}.fit-content{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.sans-serif{font-family:sans-serif}.has-pointer{cursor:pointer}.scroll-x{overflow-x:auto}.full-width{width:100%}.text-center{text-align:center}.space-between{justify-content:space-between}.capitalize{text-transform:capitalize}.p5{padding:5px}.m0{margin:0}"]
                }] }
    ];
    /** @nocollapse */
    AppDialogNewFolderComponent.ctorParameters = function () { return [
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"] }
    ]; };
    return AppDialogNewFolderComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AppDialogUploadFilesComponent = /** @class */ (function () {
    function AppDialogUploadFilesComponent(logger, notifications, dialogRef, data) {
        this.logger = logger;
        this.notifications = notifications;
        this.dialogRef = dialogRef;
        this.data = data;
        this.currentDirectory = '';
        this.dropzoneConfig = {
            url: 'https://httpbin.org/post/upload?bucketname=resvu-integration-tests.appspot.com&directoryPath=/',
            maxFilesize: 50,
            // acceptedFiles: 'image/*',
            uploadMultiple: false
        };
        this.uploadQueue = {};
        this.currentDirectory = data.currentPath;
        this.dropzoneConfig.url = data.uploadApiUrl;
    }
    Object.defineProperty(AppDialogUploadFilesComponent.prototype, "isDoneUploading", {
        get: /**
         * @return {?}
         */
        function () {
            return Object.keys(this.uploadQueue).length < 1;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AppDialogUploadFilesComponent.prototype.onSubmit = /**
     * @return {?}
     */
    function () {
        this.dialogRef.close();
    };
    /**
     * @return {?}
     */
    AppDialogUploadFilesComponent.prototype.onCancel = /**
     * @return {?}
     */
    function () {
        this.dialogRef.close();
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    AppDialogUploadFilesComponent.prototype.onProcessingBegin = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        /** @type {?} */
        var uuid = $event.upload.uuid;
        this.logger.info('onProcessingBegin', { $event: $event, uuid: uuid });
        this.addToQueue(uuid);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    AppDialogUploadFilesComponent.prototype.onUploadSuccess = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        /** @type {?} */
        var file = $event.shift();
        /** @type {?} */
        var uuid = file.upload.uuid;
        this.logger.info('onUploadSuccess', { $event: $event, uuid: uuid });
        this.removeFromQueue(uuid);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    AppDialogUploadFilesComponent.prototype.onError = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        /** @type {?} */
        var file = $event.shift();
        /** @type {?} */
        var uuid = file.upload.uuid;
        /** @type {?} */
        var message = $event.shift();
        console.error('Error uploading file to server', { $event: $event });
        this.notifications.notify('Error uploading file: ' + message, 'Upload Error');
        this.removeFromQueue(uuid);
    };
    /**
     * @param {?} uuid
     * @return {?}
     */
    AppDialogUploadFilesComponent.prototype.addToQueue = /**
     * @param {?} uuid
     * @return {?}
     */
    function (uuid) {
        this.uploadQueue[uuid] = true;
    };
    /**
     * @param {?} uuid
     * @return {?}
     */
    AppDialogUploadFilesComponent.prototype.removeFromQueue = /**
     * @param {?} uuid
     * @return {?}
     */
    function (uuid) {
        delete this.uploadQueue[uuid];
    };
    AppDialogUploadFilesComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Component"], args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'ngx-filemanager-upload-files-dialog',
                    template: "\n    <base-dialog\n      [header]=\"headerTemplate\"\n      [body]=\"bodyTemplate\"\n      [actions]=\"actionsTemplate\"\n    >\n      <ng-template #headerTemplate>\n        <h2>Upload Files</h2>\n        <h5>To Folder: {{ currentDirectory }}</h5>\n      </ng-template>\n      <ng-template #bodyTemplate>\n        <dropzone\n          *ngIf=\"dropzoneConfig\"\n          [config]=\"dropzoneConfig\"\n          (success)=\"onUploadSuccess($event)\"\n          (processing)=\"onProcessingBegin($event)\"\n          (error)=\"onError($event)\"\n        ></dropzone>\n      </ng-template>\n      <ng-template #actionsTemplate>\n        <btns-cancel-ok\n          okIcon=\"done\"\n          okLabel=\"Finish\"\n          (clickedCancel)=\"onCancel()\"\n          (clickedOk)=\"onSubmit()\"\n          [okDisabled]=\"!isDoneUploading\"\n        >\n        </btns-cancel-ok>\n      </ng-template>\n    </base-dialog>\n  ",
                    styles: [".is-red{background:red}.flex-col{display:flex;flex-direction:column}.flex-row{display:flex;flex-direction:row}.align-center{align-items:center}.fit-content{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.sans-serif{font-family:sans-serif}.has-pointer{cursor:pointer}.scroll-x{overflow-x:auto}.full-width{width:100%}.text-center{text-align:center}.space-between{justify-content:space-between}.capitalize{text-transform:capitalize}.p5{padding:5px}.m0{margin:0}"]
                }] }
    ];
    /** @nocollapse */
    AppDialogUploadFilesComponent.ctorParameters = function () { return [
        { type: LoggerService },
        { type: NotificationService },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_4__["MAT_DIALOG_DATA"],] }] }
    ]; };
    return AppDialogUploadFilesComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ActionHandlersService = /** @class */ (function () {
    function ActionHandlersService(clientFilesystem, optimisticFs, dialog, logger, notifications) {
        this.clientFilesystem = clientFilesystem;
        this.optimisticFs = optimisticFs;
        this.dialog = dialog;
        this.logger = logger;
        this.notifications = notifications;
    }
    Object.defineProperty(ActionHandlersService.prototype, "$CurrentPath", {
        // Getters
        get: 
        // Getters
        /**
         * @return {?}
         */
        function () {
            return this.optimisticFs.$CurrentPath;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ActionHandlersService.prototype.GetCurrentPath = /**
     * @return {?}
     */
    function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                return [2 /*return*/, this.$CurrentPath.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["take"])(1)).toPromise()];
            });
        });
    };
    Object.defineProperty(ActionHandlersService.prototype, "$CurrentPathIsRoot", {
        get: /**
         * @return {?}
         */
        function () {
            var _this = this;
            return this.$CurrentPath.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])((/**
             * @param {?} p
             * @return {?}
             */
            function (p) { return p === _this.config.virtualRoot; })));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActionHandlersService.prototype, "$SelectedFile", {
        get: /**
         * @return {?}
         */
        function () {
            return this.optimisticFs.$SelectedFile;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActionHandlersService.prototype, "$FilesWithIcons", {
        get: /**
         * @return {?}
         */
        function () {
            return this.optimisticFs.$FilesWithIcons;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} fileSystem
     * @param {?} config
     * @return {?}
     */
    ActionHandlersService.prototype.init = /**
     * @param {?} fileSystem
     * @param {?} config
     * @return {?}
     */
    function (fileSystem, config) {
        this.config = config;
        this.fileSystem = fileSystem;
        this.optimisticFs.initialize(this.fileSystem, this.clientFilesystem);
    };
    /**
     * @param {?} file
     * @return {?}
     */
    ActionHandlersService.prototype.OnRename = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            var data, renamedPath, error_1;
            var _this = this;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            currentPath: file.fullPath
                        };
                        this.logger.info('OnRename', { data: data });
                        return [4 /*yield*/, this.openDialog(AppDialogRenameComponent, data)];
                    case 1:
                        renamedPath = _a.sent();
                        if (!renamedPath) {
                            this.notifications.notifyCancelled();
                            return [2 /*return*/];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.optimisticFs.HandleRename(file.fullPath, renamedPath)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.RefreshExplorer()];
                    case 4:
                        _a.sent();
                        setTimeout((/**
                         * @return {?}
                         */
                        function () {
                            _this.optimisticFs.onSelectItemByName(renamedPath);
                        }), 300);
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        this.logger.error('OnRename', { error: error_1 });
                        this.notifications.notify(error_1.message, 'Rename Error');
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param {?} files
     * @return {?}
     */
    ActionHandlersService.prototype.OnMoveMultiple = /**
     * @param {?} files
     * @return {?}
     */
    function (files) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            var data, newFolderPath, filePaths, error_2;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            files: files,
                            isCopy: false,
                            serverFilesystem: this.fileSystem
                        };
                        return [4 /*yield*/, this.openDialog(AppDialogCopyComponent, data)];
                    case 1:
                        newFolderPath = _a.sent();
                        if (!newFolderPath) {
                            this.notifications.notifyCancelled();
                            return [2 /*return*/];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        filePaths = files.map((/**
                         * @param {?} f
                         * @return {?}
                         */
                        function (f) { return f.fullPath; }));
                        return [4 /*yield*/, this.optimisticFs.HandleMoveMultiple(filePaths, newFolderPath)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.RefreshExplorer()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        this.logger.error('OnMoveMultiple', { error: error_2 });
                        this.notifications.notify(error_2.message, 'Move Error');
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param {?} files
     * @return {?}
     */
    ActionHandlersService.prototype.OnCopyMultiple = /**
     * @param {?} files
     * @return {?}
     */
    function (files) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            var data, newFolderPath, filePaths, error_3;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            files: files,
                            isCopy: true,
                            serverFilesystem: this.fileSystem
                        };
                        return [4 /*yield*/, this.openDialog(AppDialogCopyComponent, data)];
                    case 1:
                        newFolderPath = _a.sent();
                        this.logger.info('OnCopyMultiple', { files: files, newFolderPath: newFolderPath });
                        if (!newFolderPath) {
                            this.notifications.notifyCancelled();
                            return [2 /*return*/];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        filePaths = files.map((/**
                         * @param {?} f
                         * @return {?}
                         */
                        function (f) { return f.fullPath; }));
                        return [4 /*yield*/, this.optimisticFs.HandleCopyMultiple(filePaths, newFolderPath)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.RefreshExplorer()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_3 = _a.sent();
                        this.logger.error('OnCopyMultiple', { error: error_3 });
                        this.notifications.notify(error_3.message, 'Copy Error');
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param {?} files
     * @return {?}
     */
    ActionHandlersService.prototype.OnSetPermissionsMultiple = /**
     * @param {?} files
     * @return {?}
     */
    function (files) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            var data, res, filePaths, error_4;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            files: files,
                            config: this.config
                        };
                        try {
                            if (!this.config.users) {
                                throw new Error('The "config.users" property was not defined');
                            }
                            if (!this.config.groups) {
                                throw new Error('The "config.groups" property was not defined');
                            }
                        }
                        catch (error) {
                            this.notifications.notify(error.message, 'Permissions Error');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.openDialog(AppDialogSetPermissionsComponent, data)];
                    case 1:
                        res = _a.sent();
                        if (!res) {
                            this.notifications.notifyCancelled();
                            return [2 /*return*/];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        filePaths = files.map((/**
                         * @param {?} f
                         * @return {?}
                         */
                        function (f) { return f.fullPath; }));
                        return [4 /*yield*/, this.optimisticFs.HandleSetPermissionsMultiple(filePaths, res.role, res.entity, true)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.RefreshExplorer()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_4 = _a.sent();
                        this.logger.error('OnSetPermissionsMultiple', { error: error_4 });
                        this.notifications.notify(error_4.message, 'Permissions Error');
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param {?} files
     * @return {?}
     */
    ActionHandlersService.prototype.OnDeleteMultiple = /**
     * @param {?} files
     * @return {?}
     */
    function (files) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            var deletedPaths, error_5;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        deletedPaths = files.map((/**
                         * @param {?} f
                         * @return {?}
                         */
                        function (f) { return f.fullPath; }));
                        this.logger.info('deleting files', { files: files, deletedPaths: deletedPaths });
                        return [4 /*yield*/, this.optimisticFs.HandleRemove(deletedPaths)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.RefreshExplorer()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        this.logger.error('OnDeleteMultiple', { error: error_5 });
                        this.notifications.notify(error_5.message, 'Deletion Error');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Misc
    // Misc
    /**
     * @param {?} folderPath
     * @return {?}
     */
    ActionHandlersService.prototype.OnNavigateTo = 
    // Misc
    /**
     * @param {?} folderPath
     * @return {?}
     */
    function (folderPath) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                this.logger.info('action-handlers.OnNavigateTo', { folderPath: folderPath });
                this.optimisticFs.HandleList(folderPath);
                return [2 /*return*/];
            });
        });
    };
    /**
     * @return {?}
     */
    ActionHandlersService.prototype.OnNavigateToParent = /**
     * @return {?}
     */
    function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.info('OnNavigateToParent');
                        return [4 /*yield*/, this.optimisticFs.HandleNavigateUp()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param {?} itemPath
     * @return {?}
     */
    ActionHandlersService.prototype.OnSelectItemByPath = /**
     * @param {?} itemPath
     * @return {?}
     */
    function (itemPath) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                this.optimisticFs.onSelectItemByName(itemPath);
                return [2 /*return*/];
            });
        });
    };
    /**
     * @return {?}
     */
    ActionHandlersService.prototype.OnUploadFilesToCurrentDirectory = /**
     * @return {?}
     */
    function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            var currentPath, data, res;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.info('onClickUpload');
                        return [4 /*yield*/, this.GetCurrentPath()];
                    case 1:
                        currentPath = _a.sent();
                        data = {
                            currentPath: currentPath,
                            uploadApiUrl: this.fileSystem.GetUploadApiUrl(currentPath)
                        };
                        return [4 /*yield*/, this.openDialog(AppDialogUploadFilesComponent, data)];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, this.optimisticFs.HandleList(currentPath)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @return {?}
     */
    ActionHandlersService.prototype.OnNewFolderInCurrentDirectory = /**
     * @return {?}
     */
    function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            var newDirName, currentDirectory, newDirectoryPath;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.info('onClickNewFolder');
                        return [4 /*yield*/, this.openDialog(AppDialogNewFolderComponent)];
                    case 1:
                        newDirName = _a.sent();
                        if (!newDirName) {
                            this.logger.info('onClickNewFolder   no folder created...');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.GetCurrentPath()];
                    case 2:
                        currentDirectory = _a.sent();
                        newDirectoryPath = Object(path_browserify__WEBPACK_IMPORTED_MODULE_7__["join"])(currentDirectory, newDirName);
                        return [4 /*yield*/, this.optimisticFs.HandleCreateFolder(newDirectoryPath)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.optimisticFs.HandleList(currentDirectory)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param {?} file
     * @return {?}
     */
    ActionHandlersService.prototype.OnDownloadFile = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            var url, link;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fileSystem.CreateDownloadLink(file)];
                    case 1:
                        url = _a.sent();
                        this.logger.info('downloading file', { file: file, url: url });
                        link = document.createElement('a');
                        link.download = file.name;
                        link.target = '_blank';
                        link.href = url;
                        link.click();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @return {?}
     */
    ActionHandlersService.prototype.RefreshExplorer = /**
     * @return {?}
     */
    function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            var currentPath;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.GetCurrentPath()];
                    case 1:
                        currentPath = _a.sent();
                        this.optimisticFs.HandleList(currentPath);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @private
     * @param {?} comp
     * @param {?=} data
     * @return {?}
     */
    ActionHandlersService.prototype.openDialog = /**
     * @private
     * @param {?} comp
     * @param {?=} data
     * @return {?}
     */
    function (comp, data) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            var ref, result;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ref = this.dialog.open(comp, {
                            width: '400px',
                            hasBackdrop: true,
                            disableClose: false,
                            data: data
                        });
                        return [4 /*yield*/, ref
                                .afterClosed()
                                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["take"])(1))
                                .toPromise()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    ActionHandlersService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Injectable"] }
    ];
    /** @nocollapse */
    ActionHandlersService.ctorParameters = function () { return [
        { type: ClientFileSystemService },
        { type: OptimisticFilesystemService },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialog"] },
        { type: LoggerService },
        { type: NotificationService }
    ]; };
    return ActionHandlersService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxFileManagerComponent = /** @class */ (function () {
    function NgxFileManagerComponent(actionHandlers, logger) {
        this.actionHandlers = actionHandlers;
        this.logger = logger;
        this.isFileDetailsOpen = true;
        this.$BulkSelected = new rxjs__WEBPACK_IMPORTED_MODULE_10__["BehaviorSubject"]([]);
        this.$triggerClearSelected = new rxjs__WEBPACK_IMPORTED_MODULE_10__["Subject"]();
    }
    Object.defineProperty(NgxFileManagerComponent.prototype, "$CurrentPath", {
        // Getters
        get: 
        // Getters
        /**
         * @return {?}
         */
        function () {
            return this.actionHandlers.$CurrentPath;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxFileManagerComponent.prototype, "$CurrentPathIsRoot", {
        get: /**
         * @return {?}
         */
        function () {
            return this.actionHandlers.$CurrentPathIsRoot;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxFileManagerComponent.prototype, "$SelectedFile", {
        get: /**
         * @return {?}
         */
        function () {
            return this.actionHandlers.$SelectedFile;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgxFileManagerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                if (!this.fileSystem) {
                    throw new Error('<ngx-filemanager> must have input selector [fileSystem] set');
                }
                if (!this.config) {
                    throw new Error('<ngx-filemanager> must have input selector [config] set');
                }
                this.actionHandlers.init(this.fileSystem, this.config);
                this.makeConfig();
                if (this.config && this.config.virtualRoot) {
                    this.actionHandlers.OnNavigateTo(this.config.virtualRoot);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * @return {?}
     */
    NgxFileManagerComponent.prototype.makeConfig = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.autoTableConfig = {
            data$: this.actionHandlers.$FilesWithIcons,
            // debug: true,
            actionsBulk: [
                {
                    label: 'Copy',
                    icon: 'content_copy',
                    onClick: (/**
                     * @param {?} files
                     * @return {?}
                     */
                    function (files) { return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(_this, void 0, void 0, function () { return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                        return [2 /*return*/, this.actionHandlers.OnCopyMultiple(files)];
                    }); }); })
                }
            ],
            actions: [
                {
                    label: 'Copy',
                    icon: 'content_copy',
                    onClick: (/**
                     * @param {?} file
                     * @return {?}
                     */
                    function (file) { return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(_this, void 0, void 0, function () { return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                        return [2 /*return*/, this.actionHandlers.OnCopyMultiple([file])];
                    }); }); })
                },
                {
                    label: 'Move',
                    icon: 'forward',
                    onClick: (/**
                     * @param {?} file
                     * @return {?}
                     */
                    function (file) { return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(_this, void 0, void 0, function () { return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                        return [2 /*return*/, this.actionHandlers.OnMoveMultiple([file])];
                    }); }); })
                },
                {
                    label: 'Rename',
                    icon: 'border_color',
                    onClick: (/**
                     * @param {?} file
                     * @return {?}
                     */
                    function (file) { return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(_this, void 0, void 0, function () { return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                        return [2 /*return*/, this.actionHandlers.OnRename(file)];
                    }); }); })
                },
                {
                    label: 'Permissions',
                    icon: 'lock_outline',
                    onClick: (/**
                     * @param {?} file
                     * @return {?}
                     */
                    function (file) { return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(_this, void 0, void 0, function () { return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                        return [2 /*return*/, this.actionHandlers.OnSetPermissionsMultiple([file])];
                    }); }); })
                },
                {
                    label: 'Delete',
                    icon: 'delete',
                    onClick: (/**
                     * @param {?} file
                     * @return {?}
                     */
                    function (file) { return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(_this, void 0, void 0, function () { return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                        return [2 /*return*/, this.actionHandlers.OnDeleteMultiple([file])];
                    }); }); })
                }
            ],
            onSelectedBulk: (/**
             * @param {?} files
             * @return {?}
             */
            function (files) {
                _this.logger.info('onSelectedBulk', {
                    files: files,
                    length: files.length
                });
                _this.$BulkSelected.next(files);
            }),
            onSelectItemDoubleClick: (/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(_this, void 0, void 0, function () {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                    this.logger.info('onSelectItemDoubleClick!', { item: item });
                    if (item.type === 'dir') {
                        this.clearBulkSelected();
                        this.actionHandlers.OnNavigateTo(item.fullPath);
                    }
                    return [2 /*return*/];
                });
            }); }),
            onSelectItem: (/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                _this.logger.info('onSelectItem!', { item: item });
                _this.actionHandlers.OnSelectItemByPath(item.fullPath);
            }),
            $triggerSelectItem: this.$SelectedFile,
            $triggerClearSelected: this.$triggerClearSelected,
            filterText: 'Search here...',
            hideChooseColumns: true,
            hideFilter: true
        };
    };
    /**
     * @param {?} file
     * @return {?}
     */
    NgxFileManagerComponent.prototype.onDetailsClickDelete = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionHandlers.OnDeleteMultiple([file])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param {?} file
     * @return {?}
     */
    NgxFileManagerComponent.prototype.onDetailsClickDownload = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionHandlers.OnDownloadFile(file)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param {?} file
     * @return {?}
     */
    NgxFileManagerComponent.prototype.onDetailsClickRename = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionHandlers.OnRename(file)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param {?} file
     * @return {?}
     */
    NgxFileManagerComponent.prototype.onDetailsClickSinglePermissions = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionHandlers.OnSetPermissionsMultiple([file])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.actionHandlers.OnSelectItemByPath(file.fullPath)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @return {?}
     */
    NgxFileManagerComponent.prototype.onClickNewFolder = /**
     * @return {?}
     */
    function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                return [2 /*return*/, this.actionHandlers.OnNewFolderInCurrentDirectory()];
            });
        });
    };
    /**
     * @return {?}
     */
    NgxFileManagerComponent.prototype.onClickUpFolder = /**
     * @return {?}
     */
    function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                return [2 /*return*/, this.actionHandlers.OnNavigateToParent()];
            });
        });
    };
    /**
     * @return {?}
     */
    NgxFileManagerComponent.prototype.onClickUploadFiles = /**
     * @return {?}
     */
    function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                return [2 /*return*/, this.actionHandlers.OnUploadFilesToCurrentDirectory()];
            });
        });
    };
    /**
     * @return {?}
     */
    NgxFileManagerComponent.prototype.onClickRefresh = /**
     * @return {?}
     */
    function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                return [2 /*return*/, this.actionHandlers.RefreshExplorer()];
            });
        });
    };
    /**
     * @return {?}
     */
    NgxFileManagerComponent.prototype.onClickedCancelBulk = /**
     * @return {?}
     */
    function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                this.logger.info('onClickCancelBulk');
                this.clearBulkSelected();
                return [2 /*return*/];
            });
        });
    };
    /**
     * @return {?}
     */
    NgxFileManagerComponent.prototype.onClickedBulkCopy = /**
     * @return {?}
     */
    function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            var selected, selectedCopied;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.$BulkSelected.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["take"])(1)).toPromise()];
                    case 1:
                        selected = _a.sent();
                        selectedCopied = Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__spread"])(selected);
                        this.logger.info('clickedBulkCopy', { selectedCopied: selectedCopied });
                        return [4 /*yield*/, this.actionHandlers.OnCopyMultiple(selectedCopied)];
                    case 2:
                        _a.sent();
                        this.clearBulkSelected();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @return {?}
     */
    NgxFileManagerComponent.prototype.onClickedBulkMove = /**
     * @return {?}
     */
    function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            var selected;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.$BulkSelected.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["take"])(1)).toPromise()];
                    case 1:
                        selected = _a.sent();
                        this.logger.info('clickedBulkMove', { selected: selected });
                        return [4 /*yield*/, this.actionHandlers.OnMoveMultiple(selected)];
                    case 2:
                        _a.sent();
                        this.clearBulkSelected();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @return {?}
     */
    NgxFileManagerComponent.prototype.onClickedBulkDelete = /**
     * @return {?}
     */
    function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            var selected;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.$BulkSelected.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["take"])(1)).toPromise()];
                    case 1:
                        selected = _a.sent();
                        this.clearBulkSelected();
                        return [2 /*return*/, this.actionHandlers.OnDeleteMultiple(selected)];
                }
            });
        });
    };
    /**
     * @return {?}
     */
    NgxFileManagerComponent.prototype.onClickedBulkPermissions = /**
     * @return {?}
     */
    function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            var selected;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.info('clickedBulkPermissions');
                        return [4 /*yield*/, this.$BulkSelected.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["take"])(1)).toPromise()];
                    case 1:
                        selected = _a.sent();
                        return [4 /*yield*/, this.actionHandlers.OnSetPermissionsMultiple(selected)];
                    case 2:
                        _a.sent();
                        this.clearBulkSelected();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param {?} newPath
     * @return {?}
     */
    NgxFileManagerComponent.prototype.onClickCrumb = /**
     * @param {?} newPath
     * @return {?}
     */
    function (newPath) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                this.clearBulkSelected();
                this.logger.info('onClickCrumb', { newPath: newPath });
                return [2 /*return*/, this.actionHandlers.OnNavigateTo(newPath)];
            });
        });
    };
    /**
     * @private
     * @return {?}
     */
    NgxFileManagerComponent.prototype.clearBulkSelected = /**
     * @private
     * @return {?}
     */
    function () {
        this.$triggerClearSelected.next();
        this.$BulkSelected.next([]);
    };
    NgxFileManagerComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Component"], args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'ngx-filemanager',
                    template: "<div class=\"page-container\">\n  <mat-drawer-container>\n    <mat-drawer-content>\n      <div\n        class=\"bulk-actions-container\"\n        [class.hidden]=\"($BulkSelected | async).length < 1\"\n      >\n        <bulk-actions\n          (clickedCancelBulk)=\"this.onClickedCancelBulk()\"\n          (clickedBulkCopy)=\"this.onClickedBulkCopy()\"\n          (clickedBulkMove)=\"this.onClickedBulkMove()\"\n          (clickedBulkPermissions)=\"this.onClickedBulkPermissions()\"\n          (clickedBulkDelete)=\"this.onClickedBulkDelete()\"\n        >\n        </bulk-actions>\n      </div>\n      <div class=\"folder-actions-container\">\n        <folder-actions\n          (clickedNewFolder)=\"this.onClickNewFolder()\"\n          (clickedUpFolder)=\"this.onClickUpFolder()\"\n          (clickedRefresh)=\"this.onClickRefresh()\"\n          (clickedUploadFiles)=\"this.onClickUploadFiles()\"\n          [$CurrentPathIsRoot]=\"$CurrentPathIsRoot\"\n        >\n        </folder-actions>\n      </div>\n      <div class=\"flex-h space-between\">\n        <bread-crumbs\n          [currentPath]=\"$CurrentPath | async\"\n          (clickedCrumb)=\"this.onClickCrumb($event)\"\n          [config]=\"config\"\n        >\n        </bread-crumbs>\n        <div\n          class=\"mat-elevation-z8 expander-container has-pointer mat-table\"\n          (click)=\"isFileDetailsOpen = !isFileDetailsOpen\"\n        >\n          <mat-icon\n            matTooltip=\"View File Details\"\n            class=\"expander-icon\"\n            [class.drawer-out]=\"isFileDetailsOpen\"\n            [class.drawer-in]=\"!isFileDetailsOpen\"\n            >expand_more</mat-icon\n          >\n        </div>\n      </div>\n      <app-file-table [config]=\"autoTableConfig\"> </app-file-table>\n    </mat-drawer-content>\n    <mat-drawer\n      #drawer\n      [(opened)]=\"isFileDetailsOpen\"\n      class=\"history-drawer\"\n      mode=\"side\"\n      position=\"end\"\n      opened\n    >\n      <ngx-filemanager-file-details\n        [file]=\"$SelectedFile | async\"\n        [fileSystem]=\"fileSystem\"\n        (clickedDelete)=\"this.onDetailsClickDelete($event)\"\n        (clickedDownload)=\"this.onDetailsClickDownload($event)\"\n        (clickedRename)=\"this.onDetailsClickRename($event)\"\n        (clickedSetPermissions)=\"this.onDetailsClickSinglePermissions($event)\"\n      >\n      </ngx-filemanager-file-details>\n    </mat-drawer>\n  </mat-drawer-container>\n</div>\n",
                    providers: [
                        ActionHandlersService,
                        ClientFileSystemService,
                        OptimisticFilesystemService
                    ],
                    styles: [".heading{font-family:sans-serif;margin-left:10px}mat-drawer{width:300px}mat-drawer-container{width:100%}.page-container{height:calc(100% - 65px);display:flex}.expander-container{flex-direction:row-reverse;right:0;top:0;display:flex;align-items:center;z-index:1;cursor:pointer}.expander-icon{transition:transform .5s;transition:transform .5s,-webkit-transform .5s;font-size:2em;width:1em;height:1em}.bulk-actions-container{position:absolute;overflow:hidden;height:80px;width:100%;z-index:2;transition:top .7s;top:0}.hidden{top:-90px}.drawer-out{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.drawer-in{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.flex-h{display:flex;flex-direction:row;align-items:center}.space-between{justify-content:space-between}button.top{margin-left:10px}", ".is-red{background:red}.flex-col{display:flex;flex-direction:column}.flex-row{display:flex;flex-direction:row}.align-center{align-items:center}.fit-content{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.sans-serif{font-family:sans-serif}.has-pointer{cursor:pointer}.scroll-x{overflow-x:auto}.full-width{width:100%}.text-center{text-align:center}.space-between{justify-content:space-between}.capitalize{text-transform:capitalize}.p5{padding:5px}.m0{margin:0}"]
                }] }
    ];
    /** @nocollapse */
    NgxFileManagerComponent.ctorParameters = function () { return [
        { type: ActionHandlersService },
        { type: LoggerService }
    ]; };
    NgxFileManagerComponent.propDecorators = {
        fileSystem: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Input"] }],
        config: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Input"] }]
    };
    return NgxFileManagerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} ms
 * @return {?}
 */
function promiseDelay(ms) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
            return [2 /*return*/, new Promise((/**
                 * @param {?} resolve
                 * @return {?}
                 */
                function (resolve) { return setTimeout(resolve, ms); }))];
        });
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FileDetailsComponent = /** @class */ (function () {
    function FileDetailsComponent() {
        this.clickedDownload = new _angular_core__WEBPACK_IMPORTED_MODULE_9__["EventEmitter"]();
        this.clickedDelete = new _angular_core__WEBPACK_IMPORTED_MODULE_9__["EventEmitter"]();
        this.clickedRename = new _angular_core__WEBPACK_IMPORTED_MODULE_9__["EventEmitter"]();
        this.clickedSetPermissions = new _angular_core__WEBPACK_IMPORTED_MODULE_9__["EventEmitter"]();
    }
    Object.defineProperty(FileDetailsComponent.prototype, "file", {
        get: /**
         * @return {?}
         */
        function () {
            return this._file;
        },
        set: /**
         * @param {?} newFile
         * @return {?}
         */
        function (newFile) {
            this._file = newFile;
            this.setImageUrl();
            this.setPermissions();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} fileName
     * @return {?}
     */
    FileDetailsComponent.prototype.getFileType = /**
     * @param {?} fileName
     * @return {?}
     */
    function (fileName) {
        return guesser.getFileIconName(fileName);
    };
    Object.defineProperty(FileDetailsComponent.prototype, "hasInput", {
        get: /**
         * @return {?}
         */
        function () {
            return !!this.file;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileDetailsComponent.prototype, "isFile", {
        get: /**
         * @return {?}
         */
        function () {
            return this.file.type === 'file';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileDetailsComponent.prototype, "isImage", {
        get: /**
         * @return {?}
         */
        function () {
            return guesser.getFileIconName(this.file.name) === 'image';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FileDetailsComponent.prototype.setImageUrl = /**
     * @return {?}
     */
    function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            var _a, error_1;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.imageUrl = null;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, promiseDelay(300)];
                    case 2:
                        _b.sent();
                        if (!this.hasInput || !this.isFile) {
                            return [2 /*return*/];
                        }
                        _a = this;
                        return [4 /*yield*/, this.fileSystem.CreateDownloadLink(this.file)];
                    case 3:
                        _a.imageUrl = _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        console.error('Error setting ImageUrl', { error: error_1 });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @return {?}
     */
    FileDetailsComponent.prototype.setPermissions = /**
     * @return {?}
     */
    function () {
        if (!this._file || !this._file.metaData) {
            return;
        }
        try {
            /** @type {?} */
            var permissions = this._file.permissions;
            this.readers = permissions.readers;
            this.writers = permissions.writers;
            this.owners = permissions.owners;
        }
        catch (error) {
            console.error('file-details: setPermissions', {
                error: error,
                file: this._file
            });
        }
    };
    FileDetailsComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Component"], args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'ngx-filemanager-file-details',
                    template: "\n    <div class=\"details-container p5\">\n      <div *ngIf=\"!hasInput\" class=\"none-selected\">\n        <h2>No item selected ...</h2>\n      </div>\n      <div *ngIf=\"hasInput\">\n        <span class=\"flex-row space-between align-center\">\n          <h2 *ngIf=\"isFile\">File Details</h2>\n          <h2 *ngIf=\"!isFile\">Directory Details</h2>\n          <span>\n            <button\n              mat-mini-fab\n              color=\"warn\"\n              class=\"has-pointer\"\n              (click)=\"this.clickedDelete.emit(file)\"\n            >\n              <mat-icon>delete</mat-icon>\n            </button>\n          </span>\n        </span>\n        <h5>Name</h5>\n        <span class=\"flex-row align-center\">\n          <h6 class=\"filename\">{{ file.name }}</h6>\n          <button\n            mat-mini-fab\n            color=\"primary\"\n            class=\"has-pointer\"\n            (click)=\"this.clickedRename.emit(file)\"\n          >\n            <mat-icon>border_color</mat-icon>\n          </button>\n        </span>\n        <h5>Size</h5>\n        <h6>{{ file.size | fileSize }}</h6>\n        <h5>Date</h5>\n        <h6>{{ file.date | date: 'short' }}</h6>\n        <span class=\"flex-row align-center\">\n          <h5>Permissions</h5>\n          <button\n            mat-mini-fab\n            color=\"primary\"\n            class=\"has-pointer\"\n            (click)=\"this.clickedSetPermissions.emit(file)\"\n          >\n            <mat-icon>lock_outline</mat-icon>\n          </button>\n        </span>\n        <div>\n          <h6 *ngIf=\"owners && owners.length\">Owners</h6>\n          <p *ngFor=\"let entity of owners\">\n            {{ entity.name }}\n          </p>\n          <h6 *ngIf=\"writers && writers.length\">Writers</h6>\n          <p *ngFor=\"let entity of writers\">\n            {{ entity.name }}\n          </p>\n          <h6 *ngIf=\"readers && readers.length\">readers</h6>\n          <p *ngFor=\"let entity of readers\">\n            {{ entity.name }}\n          </p>\n        </div>\n        <h5>Full Path</h5>\n        <h6>{{ file.fullPath }}</h6>\n        <h5>Type</h5>\n        <h6 *ngIf=\"!isFile\">Directory</h6>\n        <h6 *ngIf=\"isFile\" class=\"capitalize\">{{ getFileType(file.name) }}</h6>\n        <button\n          *ngIf=\"isFile\"\n          mat-mini-fab\n          color=\"primary\"\n          class=\"has-pointer\"\n          (click)=\"this.clickedDownload.emit(file)\"\n        >\n          <mat-icon>open_in_new</mat-icon>\n        </button>\n        <div class=\"preview\" [class.hidden]=\"!(isImage && imageUrl)\">\n          <h5>Preview</h5>\n          <div class=\"has-pointer\" (click)=\"this.clickedDownload.emit(file)\">\n            <img *ngIf=\"imageUrl\" [src]=\"imageUrl\" />\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
                    styles: ["\n      .filename {\n        margin: 0px;\n        padding-right: 10px;\n      }\n      .none-selected {\n        color: grey;\n        text-align: center;\n        width: 100%;\n        margin-top: 100px;\n      }\n      h2,\n      h5,\n      h6 {\n        font-family: sans-serif;\n      }\n      h5 {\n        margin: 0px;\n      }\n      h6 {\n        margin: 0px;\n        font-size: 1em;\n        overflow-wrap: break-word;\n        font-weight: normal;\n        margin-bottom: 10px;\n      }\n      img {\n        max-width: 100%;\n        max-height: 400px;\n      }\n      .preview {\n        opacity: 1;\n        transition: opacity 1s;\n      }\n      .hidden {\n        opacity: 0;\n        height: 0px;\n        overflow: hidden;\n      }\n    ", ".is-red{background:red}.flex-col{display:flex;flex-direction:column}.flex-row{display:flex;flex-direction:row}.align-center{align-items:center}.fit-content{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.sans-serif{font-family:sans-serif}.has-pointer{cursor:pointer}.scroll-x{overflow-x:auto}.full-width{width:100%}.text-center{text-align:center}.space-between{justify-content:space-between}.capitalize{text-transform:capitalize}.p5{padding:5px}.m0{margin:0}"]
                }] }
    ];
    FileDetailsComponent.propDecorators = {
        file: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Input"] }],
        fileSystem: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Input"] }],
        clickedDownload: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Output"] }],
        clickedDelete: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Output"] }],
        clickedRename: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Output"] }],
        clickedSetPermissions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Output"] }]
    };
    return FileDetailsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Convert bytes into largest possible unit.
 * Takes an precision argument that defaults to 2.
 * Usage:
 *   bytes | fileSize:precision
 * Example:
 *   {{ 1024 |  fileSize}}
 *   formats to: 1 KB
*/
var FileSizePipe = /** @class */ (function () {
    function FileSizePipe() {
        this.units = [
            'bytes',
            'KB',
            'MB',
            'GB',
            'TB',
            'PB'
        ];
    }
    /**
     * @param {?} bytesInput
     * @param {?=} precision
     * @return {?}
     */
    FileSizePipe.prototype.transform = /**
     * @param {?} bytesInput
     * @param {?=} precision
     * @return {?}
     */
    function (bytesInput, precision) {
        if (precision === void 0) { precision = 0; }
        /** @type {?} */
        var bytes = +bytesInput;
        if (!isFinite(bytes)) {
            return '?';
        }
        /** @type {?} */
        var unit = 0;
        while (bytes >= 1024) {
            bytes /= 1024;
            unit++;
        }
        return bytes.toFixed(+precision) + ' ' + this.units[unit];
    };
    FileSizePipe.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Pipe"], args: [{ name: 'fileSize' },] }
    ];
    return FileSizePipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ServerFilesystemProviderService = /** @class */ (function () {
    function ServerFilesystemProviderService(http, logger, notifications) {
        this.http = http;
        this.logger = logger;
        this.notifications = notifications;
    }
    /**
     * @private
     * @template T
     * @param {?} url
     * @param {?} body
     * @return {?}
     */
    ServerFilesystemProviderService.prototype.fetchPostAuth = /**
     * @private
     * @template T
     * @param {?} url
     * @param {?} body
     * @return {?}
     */
    function (url, body) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            var options, response, error_1, errorStr;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = {
                            headers: {}
                        };
                        options['responseType'] = 'json';
                        options.headers['Content-Type'] = 'application/json';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.post(url, body, options).toPromise()];
                    case 2:
                        response = _a.sent();
                        this.logger.info('fetchPostAuth: ', {
                            action: body.action,
                            reqBody: body,
                            resBody: response
                        });
                        return [2 /*return*/, (/** @type {?} */ (response))];
                    case 3:
                        error_1 = _a.sent();
                        errorStr = void 0;
                        try {
                            errorStr = JSON.stringify(error_1.error, null, 4);
                        }
                        catch (jsonError) {
                            errorStr = 'Could not parse error response: ' + error_1.error;
                        }
                        this.notifications.notify('Cannot connect to file server...', 'API Error');
                        throw new Error('API Error: ' + error_1.message + ', ' + errorStr);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @private
     * @param {?} action
     * @return {?}
     */
    ServerFilesystemProviderService.prototype.makeBaseRequest = /**
     * @private
     * @param {?} action
     * @return {?}
     */
    function (action) {
        return {
            action: action,
            bucketname: this.bucketname
        };
    };
    /**
     * @param {?} bucketname
     * @param {?} apiEndpoint
     * @return {?}
     */
    ServerFilesystemProviderService.prototype.Initialize = /**
     * @param {?} bucketname
     * @param {?} apiEndpoint
     * @return {?}
     */
    function (bucketname, apiEndpoint) {
        this.bucketname = bucketname;
        this.apiEndpoint = apiEndpoint;
    };
    /**
     * @param {?} path
     * @return {?}
     */
    ServerFilesystemProviderService.prototype.List = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        /** @type {?} */
        var req = Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__assign"])({}, this.makeBaseRequest('list'), { path: path });
        return this.fetchPostAuth(this.apiEndpoint, req);
    };
    /**
     * @param {?} newPath
     * @return {?}
     */
    ServerFilesystemProviderService.prototype.CreateFolder = /**
     * @param {?} newPath
     * @return {?}
     */
    function (newPath) {
        /** @type {?} */
        var req = Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__assign"])({}, this.makeBaseRequest('createFolder'), { newPath: newPath });
        return this.fetchPostAuth(this.apiEndpoint, req);
    };
    /**
     * @param {?} singleFileName
     * @param {?} newPath
     * @return {?}
     */
    ServerFilesystemProviderService.prototype.Copy = /**
     * @param {?} singleFileName
     * @param {?} newPath
     * @return {?}
     */
    function (singleFileName, newPath) {
        /** @type {?} */
        var req = Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__assign"])({}, this.makeBaseRequest('copy'), { singleFileName: singleFileName, newPath: newPath });
        return this.fetchPostAuth(this.apiEndpoint, req);
    };
    /**
     * @param {?} item
     * @param {?} newPath
     * @return {?}
     */
    ServerFilesystemProviderService.prototype.Move = /**
     * @param {?} item
     * @param {?} newPath
     * @return {?}
     */
    function (item, newPath) {
        /** @type {?} */
        var req = Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__assign"])({}, this.makeBaseRequest('move'), { items: [item], newPath: newPath });
        return this.fetchPostAuth(this.apiEndpoint, req);
    };
    /**
     * @param {?} item
     * @param {?} newItemPath
     * @return {?}
     */
    ServerFilesystemProviderService.prototype.Rename = /**
     * @param {?} item
     * @param {?} newItemPath
     * @return {?}
     */
    function (item, newItemPath) {
        /** @type {?} */
        var req = Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__assign"])({}, this.makeBaseRequest('rename'), { item: item, newItemPath: newItemPath });
        return this.fetchPostAuth(this.apiEndpoint, req);
    };
    /**
     * @param {?} item
     * @param {?} content
     * @return {?}
     */
    ServerFilesystemProviderService.prototype.Edit = /**
     * @param {?} item
     * @param {?} content
     * @return {?}
     */
    function (item, content) {
        /** @type {?} */
        var req = Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__assign"])({}, this.makeBaseRequest('edit'), { item: item, content: content });
        return this.fetchPostAuth(this.apiEndpoint, req);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ServerFilesystemProviderService.prototype.Getcontent = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        /** @type {?} */
        var req = Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__assign"])({}, this.makeBaseRequest('getContent'), { item: item });
        return this.fetchPostAuth(this.apiEndpoint, req);
    };
    /**
     * @param {?} item
     * @param {?} role
     * @param {?} entity
     * @param {?=} recursive
     * @return {?}
     */
    ServerFilesystemProviderService.prototype.SetPermissions = /**
     * @param {?} item
     * @param {?} role
     * @param {?} entity
     * @param {?=} recursive
     * @return {?}
     */
    function (item, role, entity, recursive) {
        /** @type {?} */
        var req = Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__assign"])({}, this.makeBaseRequest('changePermissions'), { items: [item], role: role, entity: entity, recursive: recursive });
        return this.fetchPostAuth(this.apiEndpoint, req);
    };
    /**
     * @param {?} items
     * @param {?} newPath
     * @return {?}
     */
    ServerFilesystemProviderService.prototype.MoveMultiple = /**
     * @param {?} items
     * @param {?} newPath
     * @return {?}
     */
    function (items, newPath) {
        /** @type {?} */
        var req = Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__assign"])({}, this.makeBaseRequest('move'), { items: items, newPath: newPath });
        return this.fetchPostAuth(this.apiEndpoint, req);
    };
    /**
     * @param {?} items
     * @param {?} newPath
     * @return {?}
     */
    ServerFilesystemProviderService.prototype.CopyMultiple = /**
     * @param {?} items
     * @param {?} newPath
     * @return {?}
     */
    function (items, newPath) {
        /** @type {?} */
        var req = Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__assign"])({}, this.makeBaseRequest('copy'), { items: items, newPath: newPath });
        return this.fetchPostAuth(this.apiEndpoint, req);
    };
    /**
     * @param {?} items
     * @param {?} role
     * @param {?} entity
     * @param {?=} recursive
     * @return {?}
     */
    ServerFilesystemProviderService.prototype.SetPermissionsMultiple = /**
     * @param {?} items
     * @param {?} role
     * @param {?} entity
     * @param {?=} recursive
     * @return {?}
     */
    function (items, role, entity, recursive) {
        /** @type {?} */
        var req = Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__assign"])({}, this.makeBaseRequest('changePermissions'), { items: items, role: role, entity: entity, recursive: recursive });
        return this.fetchPostAuth(this.apiEndpoint, req);
    };
    /**
     * @param {?} items
     * @return {?}
     */
    ServerFilesystemProviderService.prototype.Remove = /**
     * @param {?} items
     * @return {?}
     */
    function (items) {
        /** @type {?} */
        var req = Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__assign"])({}, this.makeBaseRequest('remove'), { items: items });
        return this.fetchPostAuth(this.apiEndpoint, req);
    };
    /**
     * @param {?} currentPath
     * @return {?}
     */
    ServerFilesystemProviderService.prototype.GetUploadApiUrl = /**
     * @param {?} currentPath
     * @return {?}
     */
    function (currentPath) {
        /** @type {?} */
        var uploadApiEndpoint = this.apiEndpoint +
            '/upload?' +
            'bucketname=' +
            this.bucketname +
            '&directoryPath=' +
            currentPath;
        return uploadApiEndpoint;
    };
    /**
     * @param {?} file
     * @return {?}
     */
    ServerFilesystemProviderService.prototype.CreateDownloadLink = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            var req, response, url, error_2;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        req = Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__assign"])({}, this.makeBaseRequest('getMeta'), { item: file.fullPath });
                        return [4 /*yield*/, this.fetchPostAuth(this.apiEndpoint, req)];
                    case 1:
                        response = _a.sent();
                        url = response.result.url;
                        return [2 /*return*/, url];
                    case 2:
                        error_2 = _a.sent();
                        throw new Error(error_2.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServerFilesystemProviderService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Injectable"] }
    ];
    /** @nocollapse */
    ServerFilesystemProviderService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClient"] },
        { type: LoggerService },
        { type: NotificationService }
    ]; };
    return ServerFilesystemProviderService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AppFileTableComponent = /** @class */ (function () {
    function AppFileTableComponent() {
        this.clickedDownload = new _angular_core__WEBPACK_IMPORTED_MODULE_9__["EventEmitter"]();
    }
    /**
     * @return {?}
     */
    AppFileTableComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.setExplorerHeight('650px');
    };
    /**
     * @param {?} heightVal
     * @return {?}
     */
    AppFileTableComponent.prototype.setExplorerHeight = /**
     * @param {?} heightVal
     * @return {?}
     */
    function (heightVal) {
        /** @type {?} */
        var tableEl = document.getElementById('main-table');
        if (tableEl) {
            /** @type {?} */
            var containerDiv = (/** @type {?} */ (tableEl.children.item(0)));
            containerDiv.style.height = heightVal;
        }
    };
    AppFileTableComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Component"], args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'app-file-table',
                    template: "\n    <ngx-auto-table\n      [config]=\"config\"\n      [columnDefinitions]=\"{\n        icon: { template: iconTemplate },\n        name: { template: nameTemplate, forceWrap: true },\n        date: { template: dateTemplate }\n      }\"\n      id=\"main-table\"\n    >\n      <ng-template #iconTemplate let-row>\n        <img class=\"icon\" [src]=\"row.icon\" matTooltip=\"Click For Details\" />\n      </ng-template>\n      <ng-template #nameTemplate let-row>\n        <div class=\"break-word\" matTooltip=\"Click For Details\">\n          {{ row.name }}\n        </div>\n      </ng-template>\n      <ng-template #sizeTemplate let-row>\n        <div matTooltip=\"Click For Details\">\n          {{ row.size | fileSize }}\n        </div>\n      </ng-template>\n      <ng-template #dateTemplate let-row>\n        <div matTooltip=\"Click For Details\">\n          {{ row.date | date: 'short' }}\n        </div>\n      </ng-template>\n      <ng-template #actionsTemplate let-row>\n        <button\n          mat-mini-fab\n          color=\"primary\"\n          (click)=\"this.clickedDownload.emit(row)\"\n        >\n          <mat-icon>launch</mat-icon>\n        </button>\n      </ng-template>\n    </ngx-auto-table>\n  ",
                    styles: ["\n      .icon {\n        height: 35px;\n      }\n      .break-word {\n        overflow-wrap: break-word;\n        word-break: break-all;\n      }\n    "]
                }] }
    ];
    AppFileTableComponent.propDecorators = {
        config: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Input"] }],
        clickedDownload: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Output"] }]
    };
    return AppFileTableComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} virtualRoot
 * @return {?}
 */
function MakeRootCrumb(virtualRoot) {
    return {
        label: 'Root',
        path: virtualRoot,
        virtualPath: '/'
    };
}
/** @type {?} */
var MakeCrumbs = (/**
 * @param {?} virtualRoot
 * @param {?} absolutePath
 * @return {?}
 */
function (virtualRoot, absolutePath) {
    /** @type {?} */
    var virtualRootParsed = EnsureAbsoluteDirectory(virtualRoot);
    /** @type {?} */
    var absolutePathParsed = EnsureAbsoluteDirectory(absolutePath);
    if (absolutePathParsed.indexOf(virtualRootParsed) !== 0) {
        throw new Error('Absolute path is not within the virtualRoot');
    }
    if (absolutePathParsed === virtualRootParsed) {
        return [MakeRootCrumb(virtualRootParsed)];
    }
    /** @type {?} */
    var relativeVirtualRoot = absolutePathParsed.slice(virtualRootParsed.length);
    /** @type {?} */
    var crumbs = [];
    relativeVirtualRoot
        .split('/')
        .filter((/**
     * @param {?} p
     * @return {?}
     */
    function (p) { return !!p; }))
        .reduce((/**
     * @param {?} currentPath
     * @param {?} curr
     * @return {?}
     */
    function (currentPath, curr) {
        /** @type {?} */
        var dirname$$1 = Object(path_browserify__WEBPACK_IMPORTED_MODULE_7__["basename"])(currentPath);
        /** @type {?} */
        var crumb = {
            label: dirname$$1,
            path: EnsureAbsoluteDirectory(virtualRootParsed + currentPath),
            virtualPath: EnsureAbsoluteDirectory(currentPath)
        };
        crumbs.unshift(crumb);
        /** @type {?} */
        var parentPath = Object(path_browserify__WEBPACK_IMPORTED_MODULE_7__["dirname"])(currentPath);
        return parentPath;
    }), relativeVirtualRoot);
    crumbs.unshift(MakeRootCrumb(virtualRootParsed));
    return crumbs;
});
/** @type {?} */
var crumbFactory = {
    MakeCrumbs: MakeCrumbs
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AppBreadCrumbsComponent = /** @class */ (function () {
    function AppBreadCrumbsComponent(logger) {
        this.logger = logger;
        this.clickedCrumb = new _angular_core__WEBPACK_IMPORTED_MODULE_9__["EventEmitter"]();
    }
    Object.defineProperty(AppBreadCrumbsComponent.prototype, "currentPath", {
        set: /**
         * @param {?} newPath
         * @return {?}
         */
        function (newPath) {
            this._currentPath = newPath;
            this.makeCrumbs(newPath);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppBreadCrumbsComponent.prototype, "config", {
        set: /**
         * @param {?} newConfig
         * @return {?}
         */
        function (newConfig) {
            this._config = newConfig;
            this.makeCrumbs(this._currentPath);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?} newPath
     * @return {?}
     */
    AppBreadCrumbsComponent.prototype.makeCrumbs = /**
     * @private
     * @param {?} newPath
     * @return {?}
     */
    function (newPath) {
        if (!this._config) {
            return;
        }
        /** @type {?} */
        var virtualRoot = this._config.virtualRoot;
        this.crumbs = crumbFactory.MakeCrumbs(virtualRoot, newPath);
        this.logger.info('makeCrumbs', {
            crumbs: this.crumbs,
            virtualRoot: virtualRoot,
            newPath: newPath
        });
    };
    /**
     * @param {?} crumb
     * @return {?}
     */
    AppBreadCrumbsComponent.prototype.onClickCrumb = /**
     * @param {?} crumb
     * @return {?}
     */
    function (crumb) {
        this.logger.info('onClickCrumb', { crumb: crumb });
        this.clickedCrumb.emit(crumb.path);
    };
    AppBreadCrumbsComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Component"], args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'bread-crumbs',
                    template: "\n    <div class=\"flex-row align-center\">\n      <div\n        class=\"flex-row align-center\"\n        *ngFor=\"let crumb of crumbs; let first = first; let last = last\"\n      >\n        <div class=\"divider\" *ngIf=\"!first\">\n          >\n        </div>\n        <button\n          #myButton\n          class=\"crumb\"\n          mat-raised-button\n          color=\"secondary\"\n          [disabled]=\"last\"\n          (click)=\"onClickCrumb(crumb); myButton.disabled = true\"\n        >\n          {{ crumb.label }}\n        </button>\n      </div>\n    </div>\n  ",
                    styles: [".is-red{background:red}.flex-col{display:flex;flex-direction:column}.flex-row{display:flex;flex-direction:row}.align-center{align-items:center}.fit-content{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.sans-serif{font-family:sans-serif}.has-pointer{cursor:pointer}.scroll-x{overflow-x:auto}.full-width{width:100%}.text-center{text-align:center}.space-between{justify-content:space-between}.capitalize{text-transform:capitalize}.p5{padding:5px}.m0{margin:0}"]
                }] }
    ];
    /** @nocollapse */
    AppBreadCrumbsComponent.ctorParameters = function () { return [
        { type: LoggerService }
    ]; };
    AppBreadCrumbsComponent.propDecorators = {
        clickedCrumb: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Output"] }],
        currentPath: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Input"] }],
        config: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Input"] }]
    };
    return AppBreadCrumbsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AppBulkActionsComponent = /** @class */ (function () {
    function AppBulkActionsComponent() {
        this.clickedCancelBulk = new _angular_core__WEBPACK_IMPORTED_MODULE_9__["EventEmitter"]();
        this.clickedBulkCopy = new _angular_core__WEBPACK_IMPORTED_MODULE_9__["EventEmitter"]();
        this.clickedBulkMove = new _angular_core__WEBPACK_IMPORTED_MODULE_9__["EventEmitter"]();
        this.clickedBulkPermissions = new _angular_core__WEBPACK_IMPORTED_MODULE_9__["EventEmitter"]();
        this.clickedBulkDelete = new _angular_core__WEBPACK_IMPORTED_MODULE_9__["EventEmitter"]();
    }
    /**
     * @return {?}
     */
    AppBulkActionsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.bulkActions = [
            {
                label: 'Cancel',
                icon: 'clear',
                onClick: (/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    _this.clickedCancelBulk.emit();
                }),
                color: 'secondary'
            },
            {
                label: 'Copy',
                icon: 'content_copy',
                onClick: (/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    _this.clickedBulkCopy.emit();
                }),
                color: 'secondary'
            },
            {
                label: 'Move',
                icon: 'forward',
                onClick: (/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    _this.clickedBulkMove.emit();
                }),
                color: 'secondary'
            },
            {
                label: 'Set Permissions',
                icon: 'lock_outline',
                onClick: (/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    _this.clickedBulkPermissions.emit();
                }),
                color: 'secondary'
            },
            {
                label: 'Delete',
                icon: 'delete',
                onClick: (/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    _this.clickedBulkDelete.emit();
                }),
                color: 'secondary'
            }
        ];
    };
    AppBulkActionsComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Component"], args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'bulk-actions',
                    template: "\n    <mat-toolbar color=\"primary\">\n      <mat-toolbar-row class=\"scroll-x\">\n        <div class=\"flex-row\">\n          <div *ngFor=\"let action of bulkActions\">\n            <button\n              class=\"action flex-row align-center\"\n              mat-raised-button\n              [color]=\"action.color\"\n              (click)=\"action.onClick(action)\"\n            >\n              <mat-icon>{{ action.icon }}</mat-icon>\n              {{ action.label }}\n            </button>\n          </div>\n        </div>\n      </mat-toolbar-row>\n    </mat-toolbar>\n  ",
                    styles: ["\n      button.action {\n        margin-right: 10px;\n      }\n    ", ".is-red{background:red}.flex-col{display:flex;flex-direction:column}.flex-row{display:flex;flex-direction:row}.align-center{align-items:center}.fit-content{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.sans-serif{font-family:sans-serif}.has-pointer{cursor:pointer}.scroll-x{overflow-x:auto}.full-width{width:100%}.text-center{text-align:center}.space-between{justify-content:space-between}.capitalize{text-transform:capitalize}.p5{padding:5px}.m0{margin:0}"]
                }] }
    ];
    AppBulkActionsComponent.propDecorators = {
        bulkActions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Input"] }],
        clickedCancelBulk: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Output"] }],
        clickedBulkCopy: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Output"] }],
        clickedBulkMove: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Output"] }],
        clickedBulkPermissions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Output"] }],
        clickedBulkDelete: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Output"] }]
    };
    return AppBulkActionsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AppFolderActionsComponent = /** @class */ (function () {
    function AppFolderActionsComponent() {
        this.clickedUpFolder = new _angular_core__WEBPACK_IMPORTED_MODULE_9__["EventEmitter"]();
        this.clickedRefresh = new _angular_core__WEBPACK_IMPORTED_MODULE_9__["EventEmitter"]();
        this.clickedNewFolder = new _angular_core__WEBPACK_IMPORTED_MODULE_9__["EventEmitter"]();
        this.clickedUploadFiles = new _angular_core__WEBPACK_IMPORTED_MODULE_9__["EventEmitter"]();
    }
    /**
     * @return {?}
     */
    AppFolderActionsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var $isRefreshing = new rxjs__WEBPACK_IMPORTED_MODULE_10__["BehaviorSubject"](false);
        this.bulkActions = [
            {
                label: 'Back',
                icon: 'reply',
                onClick: (/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    _this.clickedUpFolder.emit();
                }),
                color: 'secondary',
                $disabled: this.$CurrentPathIsRoot
            },
            {
                label: 'Upload Files',
                icon: 'file_upload',
                onClick: (/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    _this.clickedUploadFiles.emit();
                }),
                color: 'secondary',
                $disabled: Object(rxjs__WEBPACK_IMPORTED_MODULE_10__["of"])(false)
            },
            {
                label: 'Refresh',
                icon: 'refresh',
                onClick: (/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    $isRefreshing.next(true);
                    setTimeout((/**
                     * @return {?}
                     */
                    function () {
                        $isRefreshing.next(false);
                    }), 1000);
                    _this.clickedRefresh.emit();
                }),
                color: 'secondary',
                $disabled: $isRefreshing
            },
            {
                label: 'New Folder',
                icon: 'create_new_folder',
                onClick: (/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    _this.clickedNewFolder.emit();
                }),
                color: 'secondary',
                $disabled: Object(rxjs__WEBPACK_IMPORTED_MODULE_10__["of"])(false)
            },
        ];
    };
    AppFolderActionsComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Component"], args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'folder-actions',
                    template: "\n    <mat-toolbar>\n      <mat-toolbar-row class=\"scroll-x\">\n        <div *ngFor=\"let action of bulkActions\">\n          <button\n            class=\"action has-pointer\"\n            mat-raised-button\n            [color]=\"action.color\"\n            (click)=\"action.onClick(action)\"\n            [disabled]=\"action.$disabled | async\"\n          >\n            <mat-icon inline=\"true\" >{{ action.icon }}</mat-icon>\n            {{ action.label }}\n          </button>\n        </div>\n      </mat-toolbar-row>\n    </mat-toolbar>\n  ",
                    styles: ["\n      button.action {\n        margin-right: 10px;\n      }\n    ", ".is-red{background:red}.flex-col{display:flex;flex-direction:column}.flex-row{display:flex;flex-direction:row}.align-center{align-items:center}.fit-content{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.sans-serif{font-family:sans-serif}.has-pointer{cursor:pointer}.scroll-x{overflow-x:auto}.full-width{width:100%}.text-center{text-align:center}.space-between{justify-content:space-between}.capitalize{text-transform:capitalize}.p5{padding:5px}.m0{margin:0}"]
                }] }
    ];
    AppFolderActionsComponent.propDecorators = {
        bulkActions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Input"] }],
        clickedUpFolder: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Output"] }],
        clickedRefresh: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Output"] }],
        clickedNewFolder: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Output"] }],
        clickedUploadFiles: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Output"] }],
        $CurrentPathIsRoot: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Input"] }]
    };
    return AppFolderActionsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable:component-selector
var BaseDialogComponent = /** @class */ (function () {
    function BaseDialogComponent() {
    }
    BaseDialogComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Component"], args: [{
                    selector: 'base-dialog',
                    template: "\n    <div class=\"dialog-wrapper\">\n      <div class=\"header sans-serif flex-col align-center\">\n        <ng-container *ngTemplateOutlet=\"header\"> </ng-container>\n      </div>\n      <div class=\"body sans-serif flex-col align-center\">\n        <ng-container *ngTemplateOutlet=\"body\"> </ng-container>\n      </div>\n      <div class=\"actions sans-serif flex-col align-center\">\n        <ng-container *ngTemplateOutlet=\"actions\"> </ng-container>\n      </div>\n    </div>\n  ",
                    styles: ["\n      .dialog-wrapper {\n        max-height: 80vh;\n      }\n      .header {\n      }\n      .body {\n        overflow-y: auto;\n        max-height: 60vh;\n      }\n      .actions {\n        max-height: 200px;\n      }\n    ", ".is-red{background:red}.flex-col{display:flex;flex-direction:column}.flex-row{display:flex;flex-direction:row}.align-center{align-items:center}.fit-content{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.sans-serif{font-family:sans-serif}.has-pointer{cursor:pointer}.scroll-x{overflow-x:auto}.full-width{width:100%}.text-center{text-align:center}.space-between{justify-content:space-between}.capitalize{text-transform:capitalize}.p5{padding:5px}.m0{margin:0}"]
                }] }
    ];
    BaseDialogComponent.propDecorators = {
        header: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Input"] }],
        body: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Input"] }],
        actions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Input"] }]
    };
    return BaseDialogComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AppBtnsCancelOkComponent = /** @class */ (function () {
    function AppBtnsCancelOkComponent() {
        this.clickedOk = new _angular_core__WEBPACK_IMPORTED_MODULE_9__["EventEmitter"]();
        this.clickedCancel = new _angular_core__WEBPACK_IMPORTED_MODULE_9__["EventEmitter"]();
    }
    AppBtnsCancelOkComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Component"], args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'btns-cancel-ok',
                    template: "\n    <div class=\"full-width text-center\">\n      <button mat-raised-button (click)=\"clickedCancel.emit()\">\n        <mat-icon>clear</mat-icon>\n        Cancel\n      </button>\n      <button\n        mat-raised-button\n        color=\"primary\"\n        (click)=\"clickedOk.emit()\"\n        [disabled]=\"okDisabled\"\n      >\n        <mat-icon>{{ okIcon }}</mat-icon>\n        {{ okLabel }}\n      </button>\n    </div>\n  ",
                    styles: ["\n      button {\n        margin: 5px;\n      }\n    "]
                }] }
    ];
    AppBtnsCancelOkComponent.propDecorators = {
        okDisabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Input"] }],
        okIcon: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Input"] }],
        okLabel: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Input"] }],
        clickedOk: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Output"] }],
        clickedCancel: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Output"] }]
    };
    return AppBtnsCancelOkComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AppFileTableMiniFolderBrowserComponent = /** @class */ (function () {
    function AppFileTableMiniFolderBrowserComponent(actionHandlers, logger) {
        this.actionHandlers = actionHandlers;
        this.logger = logger;
        this.selectedDirectory = new _angular_core__WEBPACK_IMPORTED_MODULE_9__["EventEmitter"]();
    }
    /**
     * @return {?}
     */
    AppFileTableMiniFolderBrowserComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.actionHandlers.init(this.serverFilesystem, null);
        this.tableConfig = {
            data$: this.actionHandlers.$FilesWithIcons,
            onSelectItemDoubleClick: (/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(_this, void 0, void 0, function () {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.info('onSelectItemDoubleClick!', { item: item });
                            if (!(item.type === 'dir')) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.actionHandlers.OnNavigateTo(item.fullPath)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); }),
            onSelectItem: (/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                if (item.type === 'dir') {
                    _this.selectedDirectory.emit(item.fullPath);
                }
            })
        };
        this.tableConfig.hideFilter = true;
        this.tableConfig.hideChooseColumns = true;
        this.actionHandlers.OnNavigateTo(this.currentDirectory);
    };
    Object.defineProperty(AppFileTableMiniFolderBrowserComponent.prototype, "$CurrentPathIsRoot", {
        get: /**
         * @return {?}
         */
        function () {
            return this.actionHandlers.$CurrentPathIsRoot;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AppFileTableMiniFolderBrowserComponent.prototype.onUpFolder = /**
     * @return {?}
     */
    function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            var selectedDirectory;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionHandlers.OnNavigateToParent()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.actionHandlers.GetCurrentPath()];
                    case 2:
                        selectedDirectory = _a.sent();
                        this.selectedDirectory.emit(selectedDirectory);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @return {?}
     */
    AppFileTableMiniFolderBrowserComponent.prototype.onNewFolder = /**
     * @return {?}
     */
    function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__generator"])(this, function (_a) {
                this.logger.info('onClickNewFolder');
                return [2 /*return*/, this.actionHandlers.OnNewFolderInCurrentDirectory()];
            });
        });
    };
    AppFileTableMiniFolderBrowserComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Component"], args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'app-file-table-mini-folder-browser',
                    template: "\n    <actions-mini-browser\n      (clickedUpFolder)=\"onUpFolder()\"\n      (clickedNewFolder)=\"onNewFolder()\"\n      [$CurrentPathIsRoot]=\"$CurrentPathIsRoot\"\n    >\n    </actions-mini-browser>\n    <ngx-auto-table\n      [config]=\"tableConfig\"\n      [columnDefinitions]=\"{\n        icon: { template: iconTemplate },\n        name: { template: nameTemplate, forceWrap: true },\n        date: { template: dateTemplate }\n      }\"\n    >\n      <ng-template #iconTemplate let-row>\n        <img\n          class=\"icon\"\n          [class.greyed]=\"row.type === 'file'\"\n          [src]=\"row.icon\"\n          matTooltip=\"Click For Details\"\n        />\n      </ng-template>\n      <ng-template #nameTemplate let-row>\n        <div class=\"break-word\" matTooltip=\"Click For Details\">\n          {{ row.name }}\n        </div>\n      </ng-template>\n      <ng-template #sizeTemplate let-row>\n        <div matTooltip=\"Click For Details\">\n          {{ row.size | fileSize }}\n        </div>\n      </ng-template>\n      <ng-template #dateTemplate let-row>\n        <div matTooltip=\"Click For Details\">\n          {{ row.date | date: 'short' }}\n        </div>\n      </ng-template>\n    </ngx-auto-table>\n  ",
                    providers: [
                        ActionHandlersService,
                        ClientFileSystemService,
                        OptimisticFilesystemService
                    ],
                    styles: ["\n      .icon {\n        height: 35px;\n      }\n      .break-word {\n        overflow-wrap: break-word;\n        word-break: break-all;\n      }\n      .greyed {\n        filter: grayscale(1);\n      }\n    "]
                }] }
    ];
    /** @nocollapse */
    AppFileTableMiniFolderBrowserComponent.ctorParameters = function () { return [
        { type: ActionHandlersService },
        { type: LoggerService }
    ]; };
    AppFileTableMiniFolderBrowserComponent.propDecorators = {
        serverFilesystem: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Input"] }],
        currentDirectory: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Input"] }],
        config: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Input"] }],
        selectedDirectory: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Output"] }]
    };
    return AppFileTableMiniFolderBrowserComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AppActionsMiniBrowserComponent = /** @class */ (function () {
    function AppActionsMiniBrowserComponent() {
        this.clickedUpFolder = new _angular_core__WEBPACK_IMPORTED_MODULE_9__["EventEmitter"]();
        this.clickedNewFolder = new _angular_core__WEBPACK_IMPORTED_MODULE_9__["EventEmitter"]();
    }
    /**
     * @return {?}
     */
    AppActionsMiniBrowserComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.bulkActions = [
            {
                label: 'Back',
                icon: 'reply',
                onClick: (/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    _this.clickedUpFolder.emit();
                }),
                color: 'secondary',
                $disabled: this.$CurrentPathIsRoot
            },
            {
                label: 'New Folder',
                icon: 'create_new_folder',
                onClick: (/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    _this.clickedNewFolder.emit();
                }),
                color: 'secondary',
                $disabled: Object(rxjs__WEBPACK_IMPORTED_MODULE_10__["of"])(false)
            }
        ];
    };
    AppActionsMiniBrowserComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Component"], args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'actions-mini-browser',
                    template: "\n    <mat-toolbar>\n      <mat-toolbar-row class=\"scroll-x\">\n        <div *ngFor=\"let action of bulkActions\">\n          <button\n            class=\"action has-pointer\"\n            mat-raised-button\n            [color]=\"action.color\"\n            (click)=\"action.onClick(action)\"\n            [disabled]=\"action.$disabled | async\"\n          >\n            <mat-icon inline=\"true\">{{ action.icon }}</mat-icon>\n            {{ action.label }}\n          </button>\n        </div>\n      </mat-toolbar-row>\n    </mat-toolbar>\n  ",
                    styles: ["\n      button.action {\n        margin-right: 10px;\n      }\n    ", ".is-red{background:red}.flex-col{display:flex;flex-direction:column}.flex-row{display:flex;flex-direction:row}.align-center{align-items:center}.fit-content{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.sans-serif{font-family:sans-serif}.has-pointer{cursor:pointer}.scroll-x{overflow-x:auto}.full-width{width:100%}.text-center{text-align:center}.space-between{justify-content:space-between}.capitalize{text-transform:capitalize}.p5{padding:5px}.m0{margin:0}"]
                }] }
    ];
    AppActionsMiniBrowserComponent.propDecorators = {
        bulkActions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Input"] }],
        clickedUpFolder: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Output"] }],
        clickedNewFolder: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Output"] }],
        $CurrentPathIsRoot: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["Input"] }]
    };
    return AppActionsMiniBrowserComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var dialogComponents = [
    BaseDialogComponent,
    AppDialogRenameComponent,
    AppDialogNewFolderComponent,
    AppDialogSetPermissionsComponent,
    AppDialogCopyComponent,
    AppDialogUploadFilesComponent
];
var NgxFilemanagerClientFirebaseModule = /** @class */ (function () {
    function NgxFilemanagerClientFirebaseModule() {
    }
    NgxFilemanagerClientFirebaseModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_9__["NgModule"], args: [{
                    entryComponents: Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__spread"])(dialogComponents),
                    declarations: Object(tslib__WEBPACK_IMPORTED_MODULE_8__["__spread"])(dialogComponents, [
                        NgxFileManagerComponent,
                        AppFileTableComponent,
                        AppFileTableMiniFolderBrowserComponent,
                        AppBreadCrumbsComponent,
                        AppActionsMiniBrowserComponent,
                        AppBulkActionsComponent,
                        AppFolderActionsComponent,
                        AppBtnsCancelOkComponent,
                        FileDetailsComponent,
                        FileSizePipe
                    ]),
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                        _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                        ngx_auto_table__WEBPACK_IMPORTED_MODULE_3__["AutoTableModule"],
                        ngx_dropzone_wrapper__WEBPACK_IMPORTED_MODULE_5__["DropzoneModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatAutocompleteModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatButtonModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatButtonToggleModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatCheckboxModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatCardModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialogModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatFormFieldModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatIconModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatInputModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatMenuModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatPaginatorModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatProgressBarModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatProgressSpinnerModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSelectModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSidenavModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSnackBarModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSortModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTableModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTabsModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatToolbarModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTooltipModule"]
                    ],
                    exports: [NgxFileManagerComponent],
                    providers: [
                        ServerFilesystemProviderService,
                        NotificationService,
                        // OptimisticFilesystemService,
                        { provide: LoggerService, useClass: ConsoleLoggerService }
                    ]
                },] }
    ];
    return NgxFilemanagerClientFirebaseModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=ngx-filemanager-client-firebase.js.map

/***/ }),

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _test_functions_remote_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./test-functions-remote.component */ "./src/app/test-functions-remote.component.ts");
/* harmony import */ var _test_functions_locally_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./test-functions-locally.component */ "./src/app/test-functions-locally.component.ts");
/* harmony import */ var _test_stub_filesystem_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./test-stub-filesystem.component */ "./src/app/test-stub-filesystem.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var routes = [
    {
        path: 'test-functions-locally',
        component: _test_functions_locally_component__WEBPACK_IMPORTED_MODULE_3__["AppTestFunctionsLocallyComponent"]
    },
    {
        path: 'test-functions-remote',
        component: _test_functions_remote_component__WEBPACK_IMPORTED_MODULE_2__["AppTestFunctionsRemoteComponent"]
    },
    {
        path: 'test-stub-filesystem',
        component: _test_stub_filesystem_component__WEBPACK_IMPORTED_MODULE_4__["AppTestStubFilesystemComponent"]
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () { };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: "\n    <div style=\"text-align:center\">\n      <a [routerLink]=\"['/']\"> Test App for NgxFilemanager </a>\n    </div>\n\n    <ol>\n      <li>\n        <a [routerLink]=\"['/test-functions-locally']\"> Test functions locally </a>\n      </li>\n      <li>\n        <a [routerLink]=\"['/test-functions-remote']\"> Test functions remote </a>\n      </li>\n      <li>\n        <a [routerLink]=\"['/test-stub-filesystem']\"> Test stub filesystem </a>\n      </li>\n    </ol>\n\n    <router-outlet></router-outlet>\n  "
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "../../node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser/animations */ "../../node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var ngx_filemanager_client_firebase__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-filemanager-client-firebase */ "../../dist/ngx-filemanager-client-firebase/fesm5/ngx-filemanager-client-firebase.js");
/* harmony import */ var _test_functions_locally_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./test-functions-locally.component */ "./src/app/test-functions-locally.component.ts");
/* harmony import */ var _test_stub_filesystem_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./test-stub-filesystem.component */ "./src/app/test-stub-filesystem.component.ts");
/* harmony import */ var _test_functions_remote_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./test-functions-remote.component */ "./src/app/test-functions-remote.component.ts");
/* harmony import */ var _permissions_selection_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./permissions-selection.component */ "./src/app/permissions-selection.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                _permissions_selection_component__WEBPACK_IMPORTED_MODULE_12__["AppPermissionsSelectionComponent"],
                _test_functions_locally_component__WEBPACK_IMPORTED_MODULE_9__["AppTestFunctionsLocallyComponent"],
                _test_functions_remote_component__WEBPACK_IMPORTED_MODULE_11__["AppTestFunctionsRemoteComponent"],
                _test_stub_filesystem_component__WEBPACK_IMPORTED_MODULE_10__["AppTestStubFilesystemComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["BrowserAnimationsModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
                ngx_filemanager_client_firebase__WEBPACK_IMPORTED_MODULE_8__["NgxFilemanagerClientFirebaseModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/file-system-stub.ts":
/*!*************************************!*\
  !*** ./src/app/file-system-stub.ts ***!
  \*************************************/
/*! exports provided: FileSystemStub */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileSystemStub", function() { return FileSystemStub; });
/* harmony import */ var path_browserify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path-browserify */ "../../node_modules/path-browserify/index.js");
/* harmony import */ var path_browserify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path_browserify__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logger */ "./src/app/logger.ts");
var __assign = (undefined && undefined.__assign) || function () {
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
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
};


function MakeItem(filePath) {
    var isDir = filePath.endsWith('/');
    return {
        name: isDir ? path_browserify__WEBPACK_IMPORTED_MODULE_0__["basename"](filePath) : filePath,
        fullPath: filePath,
        rightsFirebase: [],
        permissions: {},
        size: '111',
        date: new Date().toISOString(),
        type: isDir ? 'dir' : 'file'
    };
}
var FileSystemStub = /** @class */ (function () {
    function FileSystemStub() {
        this.logger = new _logger__WEBPACK_IMPORTED_MODULE_1__["ConsoleLoggerService"]();
        this.files = [
            MakeItem('/image1.png'),
            MakeItem('/image2.jpeg'),
            MakeItem('/subfile.txt'),
            MakeItem('/subfile.mp3'),
            MakeItem('/subfile.mp4'),
            MakeItem('/tables.csv'),
            MakeItem('/time.docx'),
            MakeItem('/emptyFolder/'),
            MakeItem('/subfolder/'),
            MakeItem('/subfolder/file.txt'),
            MakeItem('/subfolder/sub1/'),
            MakeItem('/subfolder/sub1/file.txt'),
            MakeItem('/subfolder/sub1/sub1/'),
            MakeItem('/subfolder/sub1/sub1/file.txt'),
            MakeItem('/subfolder/sub1/sub1/sub1/'),
            MakeItem('/subfolder/sub1/sub1/sub1/file.txt'),
            MakeItem('/subfolder/sub1/sub2/'),
            MakeItem('/subfolder/sub1/sub2/file.txt'),
            MakeItem('/subfolder/sub1/sub2/sub1/'),
            MakeItem('/subfolder/sub1/sub2/sub1/file.txt'),
            MakeItem('/subfolder/sub2/'),
            MakeItem('/subfolder/sub2/file.txt'),
            MakeItem('/subfolder/sub2/sub1/'),
            MakeItem('/subfolder/sub2/sub1/file.txt'),
            MakeItem('/subfolder/sub2/sub1/sub1/'),
            MakeItem('/subfolder/sub2/sub1/sub1/file.txt'),
            MakeItem('/subfolder/sub2/sub2/'),
            MakeItem('/subfolder/sub2/sub2/file.txt'),
            MakeItem('/subfolder/sub2/sub2/sub1/'),
            MakeItem('/subfolder/sub2/sub2/sub1/file.txt'),
        ];
    }
    FileSystemStub.prototype.fakeDelay = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            resolve();
                        }, 2000);
                    })];
            });
        });
    };
    FileSystemStub.prototype.selectMatches = function (items, isMatch) {
        var itemsSet = new Set(items);
        if (isMatch) {
            return this.files.filter(function (f) { return itemsSet.has(f.fullPath); });
        }
        else {
            return this.files.filter(function (f) { return !itemsSet.has(f.fullPath); });
        }
    };
    FileSystemStub.prototype.isInDirectory = function (dirPath, filePath) {
        try {
            var relative = path_browserify__WEBPACK_IMPORTED_MODULE_0__["relative"](dirPath, filePath);
            var isSubdir = relative && !relative.startsWith('..') && !relative.includes('/');
            return isSubdir;
        }
        catch (error) {
            this.logger.warn('isInDirectory error', { dirPath: dirPath, filePath: filePath, error: error });
            return false;
        }
    };
    FileSystemStub.prototype.List = function (inputPath) {
        return __awaiter(this, void 0, void 0, function () {
            var folderPath, matches;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fakeDelay()];
                    case 1:
                        _a.sent();
                        folderPath = this.ensurePrefixSlash(this.ensureTrailingSlash(inputPath));
                        matches = this.files.filter(function (k) {
                            return _this.isInDirectory(folderPath, k.fullPath);
                        });
                        this.logger.info('List', { folderPath: folderPath, files: this.files, matches: matches });
                        return [2 /*return*/, {
                                result: matches
                            }];
                }
            });
        });
    };
    FileSystemStub.prototype.Rename = function (item, newItemPath) {
        return __awaiter(this, void 0, void 0, function () {
            var baseName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fakeDelay()];
                    case 1:
                        _a.sent();
                        baseName = path_browserify__WEBPACK_IMPORTED_MODULE_0__["basename"](newItemPath);
                        this.selectMatches([item], true).map(function (match) {
                            match.name = baseName;
                            match.fullPath = newItemPath;
                        });
                        return [2 /*return*/, null];
                }
            });
        });
    };
    FileSystemStub.prototype.Move = function (item, newPath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fakeDelay()];
                    case 1:
                        _a.sent();
                        this.selectMatches([item], true).map(function (match) {
                            match.fullPath = newPath;
                        });
                        return [2 /*return*/, null];
                }
            });
        });
    };
    FileSystemStub.prototype.Copy = function (singleFileName, newPath) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fakeDelay()];
                    case 1:
                        _a.sent();
                        this.selectMatches([singleFileName], true).map(function (match) {
                            var copy = __assign({}, match);
                            copy.fullPath = newPath;
                            _this.files.push(copy);
                        });
                        return [2 /*return*/, null];
                }
            });
        });
    };
    FileSystemStub.prototype.Edit = function (item, content) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fakeDelay()];
                    case 1:
                        _a.sent();
                        this.selectMatches([item], true).map(function (match) {
                            match['content'] = content;
                        });
                        return [2 /*return*/, null];
                }
            });
        });
    };
    FileSystemStub.prototype.Getcontent = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var matches;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fakeDelay()];
                    case 1:
                        _a.sent();
                        matches = this.selectMatches([item], true);
                        return [2 /*return*/, matches.pop()['content']];
                }
            });
        });
    };
    FileSystemStub.prototype.CreateFolder = function (newPath) {
        return __awaiter(this, void 0, void 0, function () {
            var parsed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fakeDelay()];
                    case 1:
                        _a.sent();
                        parsed = newPath.endsWith('/') ? newPath : newPath + '/';
                        this.files.push(MakeItem(parsed));
                        return [2 /*return*/, null];
                }
            });
        });
    };
    FileSystemStub.prototype.SetPermissions = function (item, role, entity, recursive) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fakeDelay()];
                    case 1:
                        _a.sent();
                        this.selectMatches([item], true).map(function (f) {
                            // f.rightsFirebase = [perms];
                            if (recursive) {
                                // this.SetPermissions(f.fullPath, perms, permsCode, recursive);
                            }
                        });
                        return [2 /*return*/, null];
                }
            });
        });
    };
    FileSystemStub.prototype.CopyMultiple = function (items, newPath) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fakeDelay()];
                    case 1:
                        _a.sent();
                        this.selectMatches(items, true).map(function (f) {
                            var copy = __assign({}, f);
                            copy.fullPath = path_browserify__WEBPACK_IMPORTED_MODULE_0__["join"](newPath, f.name);
                            _this.files.push(copy);
                        });
                        return [2 /*return*/, null];
                }
            });
        });
    };
    FileSystemStub.prototype.MoveMultiple = function (items, newPath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fakeDelay()];
                    case 1:
                        _a.sent();
                        this.selectMatches(items, true).map(function (f) {
                            f.fullPath = path_browserify__WEBPACK_IMPORTED_MODULE_0__["join"](newPath, f.name);
                        });
                        return [2 /*return*/, null];
                }
            });
        });
    };
    FileSystemStub.prototype.SetPermissionsMultiple = function (items, role, entity, recursive) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fakeDelay()];
                    case 1:
                        _a.sent();
                        this.logger.info('file-system-stub: SetPermissionsMultiple', {
                            items: items,
                            files: this.files
                        });
                        this.selectMatches(items, true).map(function (f) {
                            // f.rightsFirebase = [perms];
                            // if (recursive) {
                            //   this.SetPermissions(f.fullPath, perms, permsCode, recursive);
                            // }
                        });
                        return [2 /*return*/, null];
                }
            });
        });
    };
    FileSystemStub.prototype.Remove = function (items) {
        return __awaiter(this, void 0, void 0, function () {
            var itemsSet, itemsNotDeleted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fakeDelay()];
                    case 1:
                        _a.sent();
                        itemsSet = new Set(items);
                        itemsNotDeleted = this.files.filter(function (f) { return !itemsSet.has(f.fullPath); });
                        this.files = itemsNotDeleted;
                        return [2 /*return*/, null];
                }
            });
        });
    };
    FileSystemStub.prototype.ensureTrailingSlash = function (inputPath) {
        var hasTrailing = inputPath.slice(-1) === '/';
        if (hasTrailing) {
            return inputPath;
        }
        return inputPath + '/';
    };
    FileSystemStub.prototype.ensurePrefixSlash = function (inputPath) {
        var hasPrefix = inputPath.slice(0, 1) === '/';
        if (hasPrefix) {
            return inputPath;
        }
        return '/' + inputPath;
    };
    FileSystemStub.prototype.GetUploadApiUrl = function (currentPath) {
        return 'https://httpbin.org/post';
    };
    FileSystemStub.prototype.CreateDownloadLink = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, 'https://upload.wikimedia.org/wikipedia/commons/8/85/Exponential_Function_%28Abs_Imag_Part_at_Infinity%29_Density.png'];
            });
        });
    };
    return FileSystemStub;
}());



/***/ }),

/***/ "./src/app/logger.ts":
/*!***************************!*\
  !*** ./src/app/logger.ts ***!
  \***************************/
/*! exports provided: ConsoleLoggerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConsoleLoggerService", function() { return ConsoleLoggerService; });
var ConsoleLoggerService = /** @class */ (function () {
    function ConsoleLoggerService() {
    }
    Object.defineProperty(ConsoleLoggerService.prototype, "info", {
        get: function () {
            var boundLogFn = console.log.bind(console, 'demo app:: ');
            return boundLogFn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConsoleLoggerService.prototype, "warn", {
        get: function () {
            var boundLogFn = console.warn.bind(console, 'demo app:: ');
            return boundLogFn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConsoleLoggerService.prototype, "error", {
        get: function () {
            var boundLogFn = console.error.bind(console, 'demo app:: ');
            return boundLogFn;
        },
        enumerable: true,
        configurable: true
    });
    return ConsoleLoggerService;
}());



/***/ }),

/***/ "./src/app/permissions-selection.component.ts":
/*!****************************************************!*\
  !*** ./src/app/permissions-selection.component.ts ***!
  \****************************************************/
/*! exports provided: AppPermissionsSelectionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppPermissionsSelectionComponent", function() { return AppPermissionsSelectionComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppPermissionsSelectionComponent = /** @class */ (function () {
    function AppPermissionsSelectionComponent() {
    }
    AppPermissionsSelectionComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-permissions-selection',
            template: "\n  <div>\n\n  </div>\n  "
        })
    ], AppPermissionsSelectionComponent);
    return AppPermissionsSelectionComponent;
}());



/***/ }),

/***/ "./src/app/test-functions-locally.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/test-functions-locally.component.ts ***!
  \*****************************************************/
/*! exports provided: AppTestFunctionsLocallyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppTestFunctionsLocallyComponent", function() { return AppTestFunctionsLocallyComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_filemanager_client_firebase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-filemanager-client-firebase */ "../../dist/ngx-filemanager-client-firebase/fesm5/ngx-filemanager-client-firebase.js");
/* harmony import */ var _users_factory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./users-factory */ "./src/app/users-factory.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppTestFunctionsLocallyComponent = /** @class */ (function () {
    function AppTestFunctionsLocallyComponent(firebaseClientProvider) {
        this.firebaseClientProvider = firebaseClientProvider;
        this.config = {
            virtualRoot: '/clientTesting/',
            users: _users_factory__WEBPACK_IMPORTED_MODULE_2__["$users"],
            groups: _users_factory__WEBPACK_IMPORTED_MODULE_2__["$groups"]
        };
        var bucketName = 'resvu-integration-tests.appspot.com';
        var apiEndpoint = 'http://localhost:4444/ApiPublic/files';
        // const bucketName = 'cl-building-storage';
        // const apiEndpoint =
        //   'http://localhost:8010/communitilink-r3/us-central1/ApiPublic/files';
        this.firebaseClientProvider.Initialize(bucketName, apiEndpoint);
    }
    AppTestFunctionsLocallyComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-test-page',
            template: "\n    <h2>File Explorer</h2>\n    <div>\n      <ngx-filemanager [fileSystem]=\"firebaseClientProvider\" [config]=\"config\">\n      </ngx-filemanager>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [ngx_filemanager_client_firebase__WEBPACK_IMPORTED_MODULE_1__["ServerFilesystemProviderService"]])
    ], AppTestFunctionsLocallyComponent);
    return AppTestFunctionsLocallyComponent;
}());



/***/ }),

/***/ "./src/app/test-functions-remote.component.ts":
/*!****************************************************!*\
  !*** ./src/app/test-functions-remote.component.ts ***!
  \****************************************************/
/*! exports provided: AppTestFunctionsRemoteComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppTestFunctionsRemoteComponent", function() { return AppTestFunctionsRemoteComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_filemanager_client_firebase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-filemanager-client-firebase */ "../../dist/ngx-filemanager-client-firebase/fesm5/ngx-filemanager-client-firebase.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _users_factory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./users-factory */ "./src/app/users-factory.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
};






var AppTestFunctionsRemoteComponent = /** @class */ (function () {
    function AppTestFunctionsRemoteComponent(firebaseClientProvider) {
        var _this = this;
        this.firebaseClientProvider = firebaseClientProvider;
        this.config = {
            virtualRoot: '/',
            users: _users_factory__WEBPACK_IMPORTED_MODULE_5__["$users"],
            groups: _users_factory__WEBPACK_IMPORTED_MODULE_5__["$groups"]
        };
        this.bucketName = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('my-test-bucketname');
        this.apiEndpoint = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('http://localhost:4444/ApiPublic/files');
        this.showExplorer = true;
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        var bucketName = localStorage.getItem('bucketname');
        this.bucketName.setValue(bucketName);
        this.reInitializeExplorer();
        this.bucketName.valueChanges
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["debounceTime"])(500), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this.destroyed))
            .subscribe(function () { return _this.reInitializeExplorer(); });
        this.apiEndpoint.valueChanges
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["debounceTime"])(500), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this.destroyed))
            .subscribe(function () { return _this.reInitializeExplorer(); });
    }
    AppTestFunctionsRemoteComponent.prototype.ngOnDestroy = function () {
        this.destroyed.next();
    };
    AppTestFunctionsRemoteComponent.prototype.reInitializeExplorer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.showExplorer = false;
                this.firebaseClientProvider.Initialize(this.bucketName.value, this.apiEndpoint.value);
                localStorage.setItem('bucketname', this.bucketName.value);
                setTimeout(function () {
                    _this.showExplorer = true;
                }, 100);
                return [2 /*return*/];
            });
        });
    };
    AppTestFunctionsRemoteComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-test-page',
            template: "\n    <mat-card>\n      <mat-form-field>\n        <input\n          matInput\n          placeholder=\"bucketName\"\n          type=\"text\"\n          [formControl]=\"bucketName\"\n        />\n      </mat-form-field>\n      <mat-form-field>\n        <input\n          matInput\n          placeholder=\"apiEndpoint\"\n          type=\"text\"\n          [formControl]=\"apiEndpoint\"\n        />\n      </mat-form-field>\n    </mat-card>\n\n    <h2>File Explorer</h2>\n    <div *ngIf=\"showExplorer\">\n      <ngx-filemanager [fileSystem]=\"firebaseClientProvider\" [config]=\"config\">\n      </ngx-filemanager>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [ngx_filemanager_client_firebase__WEBPACK_IMPORTED_MODULE_1__["ServerFilesystemProviderService"]])
    ], AppTestFunctionsRemoteComponent);
    return AppTestFunctionsRemoteComponent;
}());



/***/ }),

/***/ "./src/app/test-stub-filesystem.component.ts":
/*!***************************************************!*\
  !*** ./src/app/test-stub-filesystem.component.ts ***!
  \***************************************************/
/*! exports provided: AppTestStubFilesystemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppTestStubFilesystemComponent", function() { return AppTestStubFilesystemComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _file_system_stub__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./file-system-stub */ "./src/app/file-system-stub.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var AppTestStubFilesystemComponent = /** @class */ (function () {
    function AppTestStubFilesystemComponent() {
        this.blankFileSystem = new _file_system_stub__WEBPACK_IMPORTED_MODULE_1__["FileSystemStub"]();
        this.config = {
            virtualRoot: '/subfolder'
        };
    }
    AppTestStubFilesystemComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-test-blank',
            template: "\n    <h2>Test Blank</h2>\n    <div>\n      <ngx-filemanager [config]=\"config\" [fileSystem]=\"blankFileSystem\">\n      </ngx-filemanager>\n    </div>\n  "
        })
    ], AppTestStubFilesystemComponent);
    return AppTestStubFilesystemComponent;
}());



/***/ }),

/***/ "./src/app/users-factory.ts":
/*!**********************************!*\
  !*** ./src/app/users-factory.ts ***!
  \**********************************/
/*! exports provided: MakeUser, $users, $groups */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MakeUser", function() { return MakeUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$users", function() { return $users; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$groups", function() { return $groups; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
/* harmony import */ var uuid_v1__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid/v1 */ "../../node_modules/uuid/v1.js");
/* harmony import */ var uuid_v1__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(uuid_v1__WEBPACK_IMPORTED_MODULE_1__);


function MakeUser(name) {
    return {
        name: name,
        uid: uuid_v1__WEBPACK_IMPORTED_MODULE_1__()
    };
}
var $users = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"]([
    MakeUser('Jim'),
    MakeUser('Bob'),
    MakeUser('Frank'),
    MakeUser('John')
]);
var $groups = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"]([
    MakeUser('Residents'),
    MakeUser('Managers')
]);


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "../../node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! hammerjs */ "../../node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_4__);





if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/ben/work/ngx-filemanager/projects/ngx-filemanager-client-firebase-demo/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map