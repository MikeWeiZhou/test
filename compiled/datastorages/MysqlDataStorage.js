"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
exports.__esModule = true;
var mysql = require("mysql");
var MysqlDataStorage = (function () {
    function MysqlDataStorage(host, db, user, pass) {
        this._REQUIRED_VALUES_ARRAY_LAYER_COUNT = 3;
        this._connection = mysql.createConnection({
            host: host,
            database: db,
            user: user,
            password: pass
        });
    }
    MysqlDataStorage.prototype.Initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this;
            return __generator(this, function (_a) {
                _this = this;
                return [2, new Promise(function (resolve, reject) {
                        _this._connection.connect(function (error) {
                            if (error) {
                                reject(error);
                            }
                            else {
                                resolve();
                            }
                        });
                    })];
            });
        });
    };
    MysqlDataStorage.prototype.Query = function (sql, records) {
        return __awaiter(this, void 0, void 0, function () {
            var _this;
            return __generator(this, function (_a) {
                _this = this;
                return [2, new Promise(function (resolve, reject) {
                        _this._connection.query(sql, records, function (err, results) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(results);
                            }
                        });
                    })];
            });
        });
    };
    MysqlDataStorage.prototype.Write = function (tablename, columns, records) {
        return __awaiter(this, void 0, void 0, function () {
            var insertQuery, insertRecords, results, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        insertQuery = this.getInsertQuery(tablename, columns);
                        insertRecords = this.wrapInsertRecordsArray(records);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.Query(insertQuery, insertRecords)];
                    case 2:
                        results = _a.sent();
                        return [3, 4];
                    case 3:
                        err_1 = _a.sent();
                        throw err_1;
                    case 4: return [2, (results.affectedRows != 0)];
                }
            });
        });
    };
    MysqlDataStorage.prototype.Dispose = function () {
        this._connection.end();
    };
    MysqlDataStorage.prototype.getInsertQuery = function (tablename, columns) {
        var query = "INSERT INTO " + tablename + " (";
        for (var i = 0; i < columns.length; ++i) {
            query += columns[i] + ",";
        }
        query = query.slice(0, -1);
        query += ") VALUES ?";
        return query;
    };
    MysqlDataStorage.prototype.wrapInsertRecordsArray = function (records) {
        var arrayLayersCount = 1;
        var traverse = records;
        while (Array.isArray(traverse[0])) {
            traverse = traverse[0];
            ++arrayLayersCount;
        }
        while (++arrayLayersCount <= this._REQUIRED_VALUES_ARRAY_LAYER_COUNT) {
            records = [records];
        }
        return records;
    };
    return MysqlDataStorage;
}());
exports.MysqlDataStorage = MysqlDataStorage;