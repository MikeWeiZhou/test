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
var PythonShellJsonDataCollector_1 = require("./datacollectors/PythonShellJsonDataCollector");
var QaBuildsAndRunsFromBambooDataInterface_1 = require("./datainterfaces/QaBuildsAndRunsFromBambooDataInterface");
var Scheduler_1 = require("./scheduler/Scheduler");
var config = require("../config/config");
function startscheduler(storage) {
    return __awaiter(this, void 0, void 0, function () {
        var scheduler, schedules, i, isScheduled, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Starting scheduler...");
                    scheduler = new Scheduler_1.Scheduler(storage);
                    schedules = [
                        {
                            name: "QaBuildsAndRunsFromBamboo from test_print_json.py",
                            schedule: {
                                DataCollector: new PythonShellJsonDataCollector_1.PythonShellJsonDataCollector("./data/test_print_json.py", "*"),
                                DataInterface: new QaBuildsAndRunsFromBambooDataInterface_1.QaBuildsAndRunsFromBambooDataInterface(),
                                RunIntervalInMinutes: config.scheduler.interval.qa_builds_and_runs_from_bamboo,
                                DataFromDate: new Date("2017-01-01"),
                                DataToDate: new Date("2017-04-01")
                            }
                        }
                    ];
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < schedules.length)) return [3, 7];
                    isScheduled = false;
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4, scheduler.Schedule(schedules[i].schedule)];
                case 3:
                    isScheduled = _a.sent();
                    return [3, 5];
                case 4:
                    err_1 = _a.sent();
                    console.log("ERROR:");
                    console.log(err_1);
                    return [3, 5];
                case 5:
                    console.log((isScheduled)
                        ? "Scheduled: " + schedules[i].name + ". Interval: " + schedules[i].schedule.RunIntervalInMinutes + " minutes."
                        : "Failed to schedule: " + schedules[i].name + ".");
                    _a.label = 6;
                case 6:
                    ++i;
                    return [3, 1];
                case 7: return [2];
            }
        });
    });
}
exports.startscheduler = startscheduler;