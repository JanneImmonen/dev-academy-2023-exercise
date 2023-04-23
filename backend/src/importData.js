"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var csvParser = require("csv-parser");
var pg_1 = require("pg");
var dotenv = require("dotenv");
dotenv.config();
var connectionString = process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

var pool = new Pool({
    connectionString,
});
function importStations(stations) {
    return __awaiter(this, void 0, void 0, function () {
        var client, _i, stations_1, station, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool.connect()];
                case 1:
                    client = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 9, 11, 12]);
                    return [4 /*yield*/, client.query('BEGIN')];
                case 3:
                    _a.sent();
                    _i = 0, stations_1 = stations;
                    _a.label = 4;
                case 4:
                    if (!(_i < stations_1.length)) return [3 /*break*/, 7];
                    station = stations_1[_i];
                    return [4 /*yield*/, client.query('INSERT INTO stations (id, name, address, lat, lon) VALUES ($1, $2, $3, $4, $5)', [station.id, station.name, station.address, station.lat, station.lon])];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7: return [4 /*yield*/, client.query('COMMIT')];
                case 8:
                    _a.sent();
                    return [3 /*break*/, 12];
                case 9:
                    error_1 = _a.sent();
                    console.error('Error importing stations:', error_1);
                    return [4 /*yield*/, client.query('ROLLBACK')];
                case 10:
                    _a.sent();
                    return [3 /*break*/, 12];
                case 11:
                    client.release();
                    return [7 /*endfinally*/];
                case 12: return [2 /*return*/];
            }
        });
    });
}
function importJourneys(journeys) {
    return __awaiter(this, void 0, void 0, function () {
        var client, _i, journeys_1, journey, durationInSeconds, distanceInMeters, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool.connect()];
                case 1:
                    client = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 9, 11, 12]);
                    return [4 /*yield*/, client.query('BEGIN')];
                case 3:
                    _a.sent();
                    _i = 0, journeys_1 = journeys;
                    _a.label = 4;
                case 4:
                    if (!(_i < journeys_1.length)) return [3 /*break*/, 7];
                    journey = journeys_1[_i];
                    durationInSeconds = parseInt(journey.duration, 10) / 1000;
                    distanceInMeters = parseFloat(journey.distance);
                    if (!(durationInSeconds >= 10 && distanceInMeters >= 10)) return [3 /*break*/, 6];
                    return [4 /*yield*/, client.query('INSERT INTO journeys (departure_station_id, return_station_id, distance, duration, started_at, ended_at) VALUES ($1, $2, $3, $4, $5, $6)', [
                            journey.departure_station_id,
                            journey.return_station_id,
                            journey.distance,
                            journey.duration,
                            journey.started_at,
                            journey.ended_at,
                        ])];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7: return [4 /*yield*/, client.query('COMMIT')];
                case 8:
                    _a.sent();
                    return [3 /*break*/, 12];
                case 9:
                    error_2 = _a.sent();
                    console.error('Error importing journeys:', error_2);
                    return [4 /*yield*/, client.query('ROLLBACK')];
                case 10:
                    _a.sent();
                    return [3 /*break*/, 12];
                case 11:
                    client.release();
                    return [7 /*endfinally*/];
                case 12: return [2 /*return*/];
            }
        });
    });
}
function parseCsvFile(filepath) {
    return new Promise(function (resolve, reject) {
        var data = [];
        fs.createReadStream(filepath)
            .pipe(csvParser())
            .on('data', function (row) {
            // Map the correct columns from the CSV file
            data.push({
                id: row.ID,
                name: row.Name,
                address: row.Osoite,
                lat: parseFloat(row.y),
                lon: parseFloat(row.x),
            });
        })
            .on('end', function () { return resolve(data); })
            .on('error', function (error) { return reject(error); });
    });
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var stationDataFile, stationDataPromise, journeyDataFiles, journeyDataPromises, stationData, journeyData, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, 6, 7]);
                stationDataFile = path.join(__dirname, '..', 'data', 'stations.csv');
                stationDataPromise = parseCsvFile(stationDataFile);
                journeyDataFiles = [
                    path.join(__dirname, '..', 'data', '2021-05.csv'),
                    path.join(__dirname, '..', 'data', '2021-06.csv'),
                    path.join(__dirname, '..', 'data', '2021-07.csv'),
                ];
                journeyDataPromises = journeyDataFiles.map(parseCsvFile);
                return [4 /*yield*/, stationDataPromise];
            case 1:
                stationData = _a.sent();
                return [4 /*yield*/, importStations(stationData)];
            case 2:
                _a.sent();
                return [4 /*yield*/, Promise.all(journeyDataPromises)];
            case 3:
                journeyData = (_a.sent()).flat();
                return [4 /*yield*/, importJourneys(journeyData)];
            case 4:
                _a.sent();
                console.log('Data import complete');
                return [3 /*break*/, 7];
            case 5:
                error_3 = _a.sent();
                console.error('Error during data import:', error_3);
                return [3 /*break*/, 7];
            case 6:
                pool.end();
                return [7 /*endfinally*/];
            case 7: return [2 /*return*/];
        }
    });
}); })();
