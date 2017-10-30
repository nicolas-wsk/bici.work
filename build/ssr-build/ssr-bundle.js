module.exports =
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "JkW7");
/******/ })
/************************************************************************/
/******/ ({

/***/ "5rBR":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "Cxo9":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! geolib 2.0.23 by Manuel Bieh
* Library to provide geo functions like distance calculation,
* conversion of decimal coordinates to sexagesimal and vice versa, etc.
* WGS 84 (World Geodetic System 1984)
* 
* @author Manuel Bieh
* @url http://www.manuelbieh.com/
* @version 2.0.23
* @license MIT 
**/;(function (global, undefined) {

    "use strict";

    function Geolib() {}

    // Constants
    Geolib.TO_RAD = Math.PI / 180;
    Geolib.TO_DEG = 180 / Math.PI;
    Geolib.PI_X2 = Math.PI * 2;
    Geolib.PI_DIV4 = Math.PI / 4;

    // Setting readonly defaults
    var geolib = Object.create(Geolib.prototype, {
        version: {
            value: "2.0.23"
        },
        radius: {
            value: 6378137
        },
        minLat: {
            value: -90
        },
        maxLat: {
            value: 90
        },
        minLon: {
            value: -180
        },
        maxLon: {
            value: 180
        },
        sexagesimalPattern: {
            value: /^([0-9]{1,3})°\s*([0-9]{1,3}(?:\.(?:[0-9]{1,2}))?)'\s*(([0-9]{1,3}(\.([0-9]{1,4}))?)"\s*)?([NEOSW]?)$/
        },
        measures: {
            value: Object.create(Object.prototype, {
                "m": { value: 1 },
                "km": { value: 0.001 },
                "cm": { value: 100 },
                "mm": { value: 1000 },
                "mi": { value: 1 / 1609.344 },
                "sm": { value: 1 / 1852.216 },
                "ft": { value: 100 / 30.48 },
                "in": { value: 100 / 2.54 },
                "yd": { value: 1 / 0.9144 }
            })
        },
        prototype: {
            value: Geolib.prototype
        },
        extend: {
            value: function value(methods, overwrite) {
                for (var prop in methods) {
                    if (typeof geolib.prototype[prop] === 'undefined' || overwrite === true) {
                        if (typeof methods[prop] === 'function' && typeof methods[prop].bind === 'function') {
                            geolib.prototype[prop] = methods[prop].bind(geolib);
                        } else {
                            geolib.prototype[prop] = methods[prop];
                        }
                    }
                }
            }
        }
    });

    if (typeof Number.prototype.toRad === 'undefined') {
        Number.prototype.toRad = function () {
            return this * Geolib.TO_RAD;
        };
    }

    if (typeof Number.prototype.toDeg === 'undefined') {
        Number.prototype.toDeg = function () {
            return this * Geolib.TO_DEG;
        };
    }

    // Here comes the magic
    geolib.extend({

        decimal: {},

        sexagesimal: {},

        distance: null,

        getKeys: function getKeys(point) {

            // GeoJSON Array [longitude, latitude(, elevation)]
            if (Object.prototype.toString.call(point) == '[object Array]') {

                return {
                    longitude: point.length >= 1 ? 0 : undefined,
                    latitude: point.length >= 2 ? 1 : undefined,
                    elevation: point.length >= 3 ? 2 : undefined
                };
            }

            var getKey = function getKey(possibleValues) {

                var key;

                possibleValues.every(function (val) {
                    // TODO: check if point is an object
                    if (typeof point != 'object') {
                        return true;
                    }
                    return point.hasOwnProperty(val) ? function () {
                        key = val;return false;
                    }() : true;
                });

                return key;
            };

            var longitude = getKey(['lng', 'lon', 'longitude']);
            var latitude = getKey(['lat', 'latitude']);
            var elevation = getKey(['alt', 'altitude', 'elevation', 'elev']);

            // return undefined if not at least one valid property was found
            if (typeof latitude == 'undefined' && typeof longitude == 'undefined' && typeof elevation == 'undefined') {
                return undefined;
            }

            return {
                latitude: latitude,
                longitude: longitude,
                elevation: elevation
            };
        },

        // returns latitude of a given point, converted to decimal
        // set raw to true to avoid conversion
        getLat: function getLat(point, raw) {
            return raw === true ? point[this.getKeys(point).latitude] : this.useDecimal(point[this.getKeys(point).latitude]);
        },

        // Alias for getLat
        latitude: function latitude(point) {
            return this.getLat.call(this, point);
        },

        // returns longitude of a given point, converted to decimal
        // set raw to true to avoid conversion
        getLon: function getLon(point, raw) {
            return raw === true ? point[this.getKeys(point).longitude] : this.useDecimal(point[this.getKeys(point).longitude]);
        },

        // Alias for getLon
        longitude: function longitude(point) {
            return this.getLon.call(this, point);
        },

        getElev: function getElev(point) {
            return point[this.getKeys(point).elevation];
        },

        // Alias for getElev
        elevation: function elevation(point) {
            return this.getElev.call(this, point);
        },

        coords: function coords(point, raw) {

            var retval = {
                latitude: raw === true ? point[this.getKeys(point).latitude] : this.useDecimal(point[this.getKeys(point).latitude]),
                longitude: raw === true ? point[this.getKeys(point).longitude] : this.useDecimal(point[this.getKeys(point).longitude])
            };

            var elev = point[this.getKeys(point).elevation];

            if (typeof elev !== 'undefined') {
                retval['elevation'] = elev;
            }

            return retval;
        },

        // Alias for coords
        ll: function ll(point, raw) {
            return this.coords.call(this, point, raw);
        },

        // checks if a variable contains a valid latlong object
        validate: function validate(point) {

            var keys = this.getKeys(point);

            if (typeof keys === 'undefined' || typeof keys.latitude === 'undefined' || keys.longitude === 'undefined') {
                return false;
            }

            var lat = point[keys.latitude];
            var lng = point[keys.longitude];

            if (typeof lat === 'undefined' || !this.isDecimal(lat) && !this.isSexagesimal(lat)) {
                return false;
            }

            if (typeof lng === 'undefined' || !this.isDecimal(lng) && !this.isSexagesimal(lng)) {
                return false;
            }

            lat = this.useDecimal(lat);
            lng = this.useDecimal(lng);

            if (lat < this.minLat || lat > this.maxLat || lng < this.minLon || lng > this.maxLon) {
                return false;
            }

            return true;
        },

        /**
        * Calculates geodetic distance between two points specified by latitude/longitude using
        * Vincenty inverse formula for ellipsoids
        * Vincenty Inverse Solution of Geodesics on the Ellipsoid (c) Chris Veness 2002-2010
        * (Licensed under CC BY 3.0)
        *
        * @param    object    Start position {latitude: 123, longitude: 123}
        * @param    object    End position {latitude: 123, longitude: 123}
        * @param    integer   Accuracy (in meters)
        * @param    integer   Precision (in decimal cases)
        * @return   integer   Distance (in meters)
        */
        getDistance: function getDistance(start, end, accuracy, precision) {

            accuracy = Math.floor(accuracy) || 1;
            precision = Math.floor(precision) || 0;

            var s = this.coords(start);
            var e = this.coords(end);

            var a = 6378137,
                b = 6356752.314245,
                f = 1 / 298.257223563; // WGS-84 ellipsoid params
            var L = (e['longitude'] - s['longitude']).toRad();

            var cosSigma, sigma, sinAlpha, cosSqAlpha, cos2SigmaM, sinSigma;

            var U1 = Math.atan((1 - f) * Math.tan(parseFloat(s['latitude']).toRad()));
            var U2 = Math.atan((1 - f) * Math.tan(parseFloat(e['latitude']).toRad()));
            var sinU1 = Math.sin(U1),
                cosU1 = Math.cos(U1);
            var sinU2 = Math.sin(U2),
                cosU2 = Math.cos(U2);

            var lambda = L,
                lambdaP,
                iterLimit = 100;
            do {
                var sinLambda = Math.sin(lambda),
                    cosLambda = Math.cos(lambda);
                sinSigma = Math.sqrt(cosU2 * sinLambda * (cosU2 * sinLambda) + (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) * (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda));
                if (sinSigma === 0) {
                    return geolib.distance = 0; // co-incident points
                }

                cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
                sigma = Math.atan2(sinSigma, cosSigma);
                sinAlpha = cosU1 * cosU2 * sinLambda / sinSigma;
                cosSqAlpha = 1 - sinAlpha * sinAlpha;
                cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cosSqAlpha;

                if (isNaN(cos2SigmaM)) {
                    cos2SigmaM = 0; // equatorial line: cosSqAlpha=0 (§6)
                }
                var C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
                lambdaP = lambda;
                lambda = L + (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
            } while (Math.abs(lambda - lambdaP) > 1e-12 && --iterLimit > 0);

            if (iterLimit === 0) {
                return NaN; // formula failed to converge
            }

            var uSq = cosSqAlpha * (a * a - b * b) / (b * b);

            var A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));

            var B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));

            var deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) - B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));

            var distance = b * A * (sigma - deltaSigma);

            distance = distance.toFixed(precision); // round to 1mm precision

            //if (start.hasOwnProperty(elevation) && end.hasOwnProperty(elevation)) {
            if (typeof this.elevation(start) !== 'undefined' && typeof this.elevation(end) !== 'undefined') {
                var climb = Math.abs(this.elevation(start) - this.elevation(end));
                distance = Math.sqrt(distance * distance + climb * climb);
            }

            return this.distance = Math.round(distance * Math.pow(10, precision) / accuracy) * accuracy / Math.pow(10, precision);

            /*
            // note: to return initial/final bearings in addition to distance, use something like:
            var fwdAz = Math.atan2(cosU2*sinLambda,  cosU1*sinU2-sinU1*cosU2*cosLambda);
            var revAz = Math.atan2(cosU1*sinLambda, -sinU1*cosU2+cosU1*sinU2*cosLambda);
             return { distance: s, initialBearing: fwdAz.toDeg(), finalBearing: revAz.toDeg() };
            */
        },

        /**
        * Calculates the distance between two spots.
        * This method is more simple but also far more inaccurate
        *
        * @param    object    Start position {latitude: 123, longitude: 123}
        * @param    object    End position {latitude: 123, longitude: 123}
        * @param    integer   Accuracy (in meters)
        * @return   integer   Distance (in meters)
        */
        getDistanceSimple: function getDistanceSimple(start, end, accuracy) {

            accuracy = Math.floor(accuracy) || 1;

            var distance = Math.round(Math.acos(Math.sin(this.latitude(end).toRad()) * Math.sin(this.latitude(start).toRad()) + Math.cos(this.latitude(end).toRad()) * Math.cos(this.latitude(start).toRad()) * Math.cos(this.longitude(start).toRad() - this.longitude(end).toRad())) * this.radius);

            return geolib.distance = Math.floor(Math.round(distance / accuracy) * accuracy);
        },

        /**
            * Calculates the center of a collection of geo coordinates
            *
            * @param        array       Collection of coords [{latitude: 51.510, longitude: 7.1321}, {latitude: 49.1238, longitude: "8° 30' W"}, ...]
            * @return       object      {latitude: centerLat, longitude: centerLng}
            */
        getCenter: function getCenter(coords) {

            var coordsArray = coords;
            if (typeof coords === 'object' && !(coords instanceof Array)) {

                coordsArray = [];

                for (var key in coords) {
                    coordsArray.push(this.coords(coords[key]));
                }
            }

            if (!coordsArray.length) {
                return false;
            }

            var X = 0.0;
            var Y = 0.0;
            var Z = 0.0;
            var lat, lon, hyp;

            coordsArray.forEach(function (coord) {

                lat = this.latitude(coord).toRad();
                lon = this.longitude(coord).toRad();

                X += Math.cos(lat) * Math.cos(lon);
                Y += Math.cos(lat) * Math.sin(lon);
                Z += Math.sin(lat);
            }, this);

            var nb_coords = coordsArray.length;
            X = X / nb_coords;
            Y = Y / nb_coords;
            Z = Z / nb_coords;

            lon = Math.atan2(Y, X);
            hyp = Math.sqrt(X * X + Y * Y);
            lat = Math.atan2(Z, hyp);

            return {
                latitude: (lat * Geolib.TO_DEG).toFixed(6),
                longitude: (lon * Geolib.TO_DEG).toFixed(6)
            };
        },

        /**
        * Gets the max and min, latitude, longitude, and elevation (if provided).
        * @param        array       array with coords e.g. [{latitude: 51.5143, longitude: 7.4138}, {latitude: 123, longitude: 123}, ...]
        * @return   object      {maxLat: maxLat,
        *                     minLat: minLat
        *                     maxLng: maxLng,
        *                     minLng: minLng,
        *                     maxElev: maxElev,
        *                     minElev: minElev}
        */
        getBounds: function getBounds(coords) {

            if (!coords.length) {
                return false;
            }

            var useElevation = this.elevation(coords[0]);

            var stats = {
                maxLat: -Infinity,
                minLat: Infinity,
                maxLng: -Infinity,
                minLng: Infinity
            };

            if (typeof useElevation != 'undefined') {
                stats.maxElev = 0;
                stats.minElev = Infinity;
            }

            for (var i = 0, l = coords.length; i < l; ++i) {

                stats.maxLat = Math.max(this.latitude(coords[i]), stats.maxLat);
                stats.minLat = Math.min(this.latitude(coords[i]), stats.minLat);
                stats.maxLng = Math.max(this.longitude(coords[i]), stats.maxLng);
                stats.minLng = Math.min(this.longitude(coords[i]), stats.minLng);

                if (useElevation) {
                    stats.maxElev = Math.max(this.elevation(coords[i]), stats.maxElev);
                    stats.minElev = Math.min(this.elevation(coords[i]), stats.minElev);
                }
            }

            return stats;
        },

        /**
        * Calculates the center of the bounds of geo coordinates.
        *
        * On polygons like political borders (eg. states)
        * this may gives a closer result to human expectation, than `getCenter`,
        * because that function can be disturbed by uneven distribution of
        * point in different sides.
        * Imagine the US state Oklahoma: `getCenter` on that gives a southern
        * point, because the southern border contains a lot more nodes,
        * than the others.
        *
        * @param        array       Collection of coords [{latitude: 51.510, longitude: 7.1321}, {latitude: 49.1238, longitude: "8° 30' W"}, ...]
        * @return       object      {latitude: centerLat, longitude: centerLng}
        */
        getCenterOfBounds: function getCenterOfBounds(coords) {
            var b = this.getBounds(coords);
            var latitude = b.minLat + (b.maxLat - b.minLat) / 2;
            var longitude = b.minLng + (b.maxLng - b.minLng) / 2;
            return {
                latitude: parseFloat(latitude.toFixed(6)),
                longitude: parseFloat(longitude.toFixed(6))
            };
        },

        /**
        * Computes the bounding coordinates of all points on the surface
        * of the earth less than or equal to the specified great circle
        * distance.
        *
        * @param object Point position {latitude: 123, longitude: 123}
        * @param number Distance (in meters).
        * @return array Collection of two points defining the SW and NE corners.
        */
        getBoundsOfDistance: function getBoundsOfDistance(point, distance) {

            var latitude = this.latitude(point);
            var longitude = this.longitude(point);

            var radLat = latitude.toRad();
            var radLon = longitude.toRad();

            var radDist = distance / this.radius;
            var minLat = radLat - radDist;
            var maxLat = radLat + radDist;

            var MAX_LAT_RAD = this.maxLat.toRad();
            var MIN_LAT_RAD = this.minLat.toRad();
            var MAX_LON_RAD = this.maxLon.toRad();
            var MIN_LON_RAD = this.minLon.toRad();

            var minLon;
            var maxLon;

            if (minLat > MIN_LAT_RAD && maxLat < MAX_LAT_RAD) {

                var deltaLon = Math.asin(Math.sin(radDist) / Math.cos(radLat));
                minLon = radLon - deltaLon;

                if (minLon < MIN_LON_RAD) {
                    minLon += Geolib.PI_X2;
                }

                maxLon = radLon + deltaLon;

                if (maxLon > MAX_LON_RAD) {
                    maxLon -= Geolib.PI_X2;
                }
            } else {
                // A pole is within the distance.
                minLat = Math.max(minLat, MIN_LAT_RAD);
                maxLat = Math.min(maxLat, MAX_LAT_RAD);
                minLon = MIN_LON_RAD;
                maxLon = MAX_LON_RAD;
            }

            return [
            // Southwest
            {
                latitude: minLat.toDeg(),
                longitude: minLon.toDeg()
            },
            // Northeast
            {
                latitude: maxLat.toDeg(),
                longitude: maxLon.toDeg()
            }];
        },

        /**
        * Checks whether a point is inside of a polygon or not.
        * Note that the polygon coords must be in correct order!
        *
        * @param        object      coordinate to check e.g. {latitude: 51.5023, longitude: 7.3815}
        * @param        array       array with coords e.g. [{latitude: 51.5143, longitude: 7.4138}, {latitude: 123, longitude: 123}, ...]
        * @return       bool        true if the coordinate is inside the given polygon
        */
        isPointInside: function isPointInside(latlng, coords) {

            for (var c = false, i = -1, l = coords.length, j = l - 1; ++i < l; j = i) {

                if ((this.longitude(coords[i]) <= this.longitude(latlng) && this.longitude(latlng) < this.longitude(coords[j]) || this.longitude(coords[j]) <= this.longitude(latlng) && this.longitude(latlng) < this.longitude(coords[i])) && this.latitude(latlng) < (this.latitude(coords[j]) - this.latitude(coords[i])) * (this.longitude(latlng) - this.longitude(coords[i])) / (this.longitude(coords[j]) - this.longitude(coords[i])) + this.latitude(coords[i])) {
                    c = !c;
                }
            }

            return c;
        },

        /**
         * Pre calculate the polygon coords, to speed up the point inside check.
         * Use this function before calling isPointInsideWithPreparedPolygon()
         * @see          Algorythm from http://alienryderflex.com/polygon/
         * @param        array       array with coords e.g. [{latitude: 51.5143, longitude: 7.4138}, {latitude: 123, longitude: 123}, ...]
         */
        preparePolygonForIsPointInsideOptimized: function preparePolygonForIsPointInsideOptimized(coords) {

            for (var i = 0, j = coords.length - 1; i < coords.length; i++) {

                if (this.longitude(coords[j]) === this.longitude(coords[i])) {

                    coords[i].constant = this.latitude(coords[i]);
                    coords[i].multiple = 0;
                } else {

                    coords[i].constant = this.latitude(coords[i]) - this.longitude(coords[i]) * this.latitude(coords[j]) / (this.longitude(coords[j]) - this.longitude(coords[i])) + this.longitude(coords[i]) * this.latitude(coords[i]) / (this.longitude(coords[j]) - this.longitude(coords[i]));

                    coords[i].multiple = (this.latitude(coords[j]) - this.latitude(coords[i])) / (this.longitude(coords[j]) - this.longitude(coords[i]));
                }

                j = i;
            }
        },

        /**
         * Checks whether a point is inside of a polygon or not.
         * "This is useful if you have many points that need to be tested against the same (static) polygon."
         * Please call the function preparePolygonForIsPointInsideOptimized() with the same coords object before using this function.
         * Note that the polygon coords must be in correct order!
         *
         * @see          Algorythm from http://alienryderflex.com/polygon/
         *
         * @param     object      coordinate to check e.g. {latitude: 51.5023, longitude: 7.3815}
         * @param     array       array with coords e.g. [{latitude: 51.5143, longitude: 7.4138}, {latitude: 123, longitude: 123}, ...]
         * @return        bool        true if the coordinate is inside the given polygon
         */
        isPointInsideWithPreparedPolygon: function isPointInsideWithPreparedPolygon(point, coords) {

            var flgPointInside = false,
                y = this.longitude(point),
                x = this.latitude(point);

            for (var i = 0, j = coords.length - 1; i < coords.length; i++) {

                if (this.longitude(coords[i]) < y && this.longitude(coords[j]) >= y || this.longitude(coords[j]) < y && this.longitude(coords[i]) >= y) {

                    flgPointInside ^= y * coords[i].multiple + coords[i].constant < x;
                }

                j = i;
            }

            return flgPointInside;
        },

        /**
        * Shortcut for geolib.isPointInside()
        */
        isInside: function isInside() {
            return this.isPointInside.apply(this, arguments);
        },

        /**
        * Checks whether a point is inside of a circle or not.
        *
        * @param        object      coordinate to check (e.g. {latitude: 51.5023, longitude: 7.3815})
        * @param        object      coordinate of the circle's center (e.g. {latitude: 51.4812, longitude: 7.4025})
        * @param        integer     maximum radius in meters
        * @return       bool        true if the coordinate is within the given radius
        */
        isPointInCircle: function isPointInCircle(latlng, center, radius) {
            return this.getDistance(latlng, center) < radius;
        },

        /**
        * Shortcut for geolib.isPointInCircle()
        */
        withinRadius: function withinRadius() {
            return this.isPointInCircle.apply(this, arguments);
        },

        /**
        * Gets rhumb line bearing of two points. Find out about the difference between rhumb line and
        * great circle bearing on Wikipedia. It's quite complicated. Rhumb line should be fine in most cases:
        *
        * http://en.wikipedia.org/wiki/Rhumb_line#General_and_mathematical_description
        *
        * Function heavily based on Doug Vanderweide's great PHP version (licensed under GPL 3.0)
        * http://www.dougv.com/2009/07/13/calculating-the-bearing-and-compass-rose-direction-between-two-latitude-longitude-coordinates-in-php/
        *
        * @param        object      origin coordinate (e.g. {latitude: 51.5023, longitude: 7.3815})
        * @param        object      destination coordinate
        * @return       integer     calculated bearing
        */
        getRhumbLineBearing: function getRhumbLineBearing(originLL, destLL) {

            // difference of longitude coords
            var diffLon = this.longitude(destLL).toRad() - this.longitude(originLL).toRad();

            // difference latitude coords phi
            var diffPhi = Math.log(Math.tan(this.latitude(destLL).toRad() / 2 + Geolib.PI_DIV4) / Math.tan(this.latitude(originLL).toRad() / 2 + Geolib.PI_DIV4));

            // recalculate diffLon if it is greater than pi
            if (Math.abs(diffLon) > Math.PI) {
                if (diffLon > 0) {
                    diffLon = (Geolib.PI_X2 - diffLon) * -1;
                } else {
                    diffLon = Geolib.PI_X2 + diffLon;
                }
            }

            //return the angle, normalized
            return (Math.atan2(diffLon, diffPhi).toDeg() + 360) % 360;
        },

        /**
        * Gets great circle bearing of two points. See description of getRhumbLineBearing for more information
        *
        * @param        object      origin coordinate (e.g. {latitude: 51.5023, longitude: 7.3815})
        * @param        object      destination coordinate
        * @return       integer     calculated bearing
        */
        getBearing: function getBearing(originLL, destLL) {

            destLL['latitude'] = this.latitude(destLL);
            destLL['longitude'] = this.longitude(destLL);
            originLL['latitude'] = this.latitude(originLL);
            originLL['longitude'] = this.longitude(originLL);

            var bearing = (Math.atan2(Math.sin(destLL['longitude'].toRad() - originLL['longitude'].toRad()) * Math.cos(destLL['latitude'].toRad()), Math.cos(originLL['latitude'].toRad()) * Math.sin(destLL['latitude'].toRad()) - Math.sin(originLL['latitude'].toRad()) * Math.cos(destLL['latitude'].toRad()) * Math.cos(destLL['longitude'].toRad() - originLL['longitude'].toRad())).toDeg() + 360) % 360;

            return bearing;
        },

        /**
        * Gets the compass direction from an origin coordinate to a destination coordinate.
        *
        * @param        object      origin coordinate (e.g. {latitude: 51.5023, longitude: 7.3815})
        * @param        object      destination coordinate
        * @param        string      Bearing mode. Can be either circle or rhumbline
        * @return       object      Returns an object with a rough (NESW) and an exact direction (NNE, NE, ENE, E, ESE, etc).
        */
        getCompassDirection: function getCompassDirection(originLL, destLL, bearingMode) {

            var direction;
            var bearing;

            if (bearingMode == 'circle') {
                // use great circle bearing
                bearing = this.getBearing(originLL, destLL);
            } else {
                // default is rhumb line bearing
                bearing = this.getRhumbLineBearing(originLL, destLL);
            }

            switch (Math.round(bearing / 22.5)) {
                case 1:
                    direction = { exact: "NNE", rough: "N" };
                    break;
                case 2:
                    direction = { exact: "NE", rough: "N" };
                    break;
                case 3:
                    direction = { exact: "ENE", rough: "E" };
                    break;
                case 4:
                    direction = { exact: "E", rough: "E" };
                    break;
                case 5:
                    direction = { exact: "ESE", rough: "E" };
                    break;
                case 6:
                    direction = { exact: "SE", rough: "E" };
                    break;
                case 7:
                    direction = { exact: "SSE", rough: "S" };
                    break;
                case 8:
                    direction = { exact: "S", rough: "S" };
                    break;
                case 9:
                    direction = { exact: "SSW", rough: "S" };
                    break;
                case 10:
                    direction = { exact: "SW", rough: "S" };
                    break;
                case 11:
                    direction = { exact: "WSW", rough: "W" };
                    break;
                case 12:
                    direction = { exact: "W", rough: "W" };
                    break;
                case 13:
                    direction = { exact: "WNW", rough: "W" };
                    break;
                case 14:
                    direction = { exact: "NW", rough: "W" };
                    break;
                case 15:
                    direction = { exact: "NNW", rough: "N" };
                    break;
                default:
                    direction = { exact: "N", rough: "N" };
            }

            direction['bearing'] = bearing;
            return direction;
        },

        /**
        * Shortcut for getCompassDirection
        */
        getDirection: function getDirection(originLL, destLL, bearingMode) {
            return this.getCompassDirection.apply(this, arguments);
        },

        /**
        * Sorts an array of coords by distance from a reference coordinate
        *
        * @param        object      reference coordinate e.g. {latitude: 51.5023, longitude: 7.3815}
        * @param        mixed       array or object with coords [{latitude: 51.5143, longitude: 7.4138}, {latitude: 123, longitude: 123}, ...]
        * @return       array       ordered array
        */
        orderByDistance: function orderByDistance(latlng, coords) {

            var coordsArray = Object.keys(coords).map(function (idx) {
                var distance = this.getDistance(latlng, coords[idx]);
                var augmentedCoord = Object.create(coords[idx]);
                augmentedCoord.distance = distance;
                augmentedCoord.key = idx;
                return augmentedCoord;
            }, this);

            return coordsArray.sort(function (a, b) {
                return a.distance - b.distance;
            });
        },

        /**
        * Check if a point lies in line created by two other points
        *
        * @param    object    Point to check: {latitude: 123, longitude: 123}
        * @param    object    Start of line {latitude: 123, longitude: 123}
        * @param    object    End of line {latitude: 123, longitude: 123}
        * @return   boolean
        */
        isPointInLine: function isPointInLine(point, start, end) {

            return (this.getDistance(start, point, 1, 3) + this.getDistance(point, end, 1, 3)).toFixed(3) == this.getDistance(start, end, 1, 3);
        },

        /**
        * Check if a point lies within a given distance from a line created by two other points
        *
        * @param    object    Point to check: {latitude: 123, longitude: 123}
        * @param    object    Start of line {latitude: 123, longitude: 123}
        * @param    object    End of line {latitude: 123, longitude: 123}
        * @pararm   float     maximum distance from line
        * @return   boolean
        */
        isPointNearLine: function isPointNearLine(point, start, end, distance) {
            return this.getDistanceFromLine(point, start, end) < distance;
        },

        /**
        * return the minimum distance from a point to a line
        *
        * @param    object    Point away from line
        * @param    object    Start of line {latitude: 123, longitude: 123}
        * @param    object    End of line {latitude: 123, longitude: 123}
        * @return   float     distance from point to line
        */
        getDistanceFromLine: function getDistanceFromLine(point, start, end) {
            var d1 = this.getDistance(start, point, 1, 3);
            var d2 = this.getDistance(point, end, 1, 3);
            var d3 = this.getDistance(start, end, 1, 3);
            var distance = 0;

            // alpha is the angle between the line from start to point, and from start to end //
            var alpha = Math.acos((d1 * d1 + d3 * d3 - d2 * d2) / (2 * d1 * d3));
            // beta is the angle between the line from end to point and from end to start //
            var beta = Math.acos((d2 * d2 + d3 * d3 - d1 * d1) / (2 * d2 * d3));

            // if the angle is greater than 90 degrees, then the minimum distance is the
            // line from the start to the point //
            if (alpha > Math.PI / 2) {
                distance = d1;
            }
            // same for the beta //
            else if (beta > Math.PI / 2) {
                    distance = d2;
                }
                // otherwise the minimum distance is achieved through a line perpendular to the start-end line,
                // which goes from the start-end line to the point //
                else {
                        distance = Math.sin(alpha) * d1;
                    }

            return distance;
        },

        /**
        * Finds the nearest coordinate to a reference coordinate
        *
        * @param        object      reference coordinate e.g. {latitude: 51.5023, longitude: 7.3815}
        * @param        mixed       array or object with coords [{latitude: 51.5143, longitude: 7.4138}, {latitude: 123, longitude: 123}, ...]
        * @return       array       ordered array
        */
        findNearest: function findNearest(latlng, coords, offset, limit) {

            offset = offset || 0;
            limit = limit || 1;
            var ordered = this.orderByDistance(latlng, coords);

            if (limit === 1) {
                return ordered[offset];
            } else {
                return ordered.splice(offset, limit);
            }
        },

        /**
        * Calculates the length of a given path
        *
        * @param        mixed       array or object with coords [{latitude: 51.5143, longitude: 7.4138}, {latitude: 123, longitude: 123}, ...]
        * @return       integer     length of the path (in meters)
        */
        getPathLength: function getPathLength(coords) {

            var dist = 0;
            var last;

            for (var i = 0, l = coords.length; i < l; ++i) {
                if (last) {
                    //console.log(coords[i], last, this.getDistance(coords[i], last));
                    dist += this.getDistance(this.coords(coords[i]), last);
                }
                last = this.coords(coords[i]);
            }

            return dist;
        },

        /**
        * Calculates the speed between to points within a given time span.
        *
        * @param        object      coords with javascript timestamp {latitude: 51.5143, longitude: 7.4138, time: 1360231200880}
        * @param        object      coords with javascript timestamp {latitude: 51.5502, longitude: 7.4323, time: 1360245600460}
        * @param        object      options (currently "unit" is the only option. Default: km(h));
        * @return       float       speed in unit per hour
        */
        getSpeed: function getSpeed(start, end, options) {

            var unit = options && options.unit || 'km';

            if (unit == 'mph') {
                unit = 'mi';
            } else if (unit == 'kmh') {
                unit = 'km';
            }

            var distance = geolib.getDistance(start, end);
            var time = end.time * 1 / 1000 - start.time * 1 / 1000;
            var mPerHr = distance / time * 3600;
            var speed = Math.round(mPerHr * this.measures[unit] * 10000) / 10000;
            return speed;
        },

        /**
         * Computes the destination point given an initial point, a distance
         * and a bearing
         *
         * see http://www.movable-type.co.uk/scripts/latlong.html for the original code
         *
         * @param        object     start coordinate (e.g. {latitude: 51.5023, longitude: 7.3815})
         * @param        float      longitude of the inital point in degree
         * @param        float      distance to go from the inital point in meter
         * @param        float      bearing in degree of the direction to go, e.g. 0 = north, 180 = south
         * @param        float      optional (in meter), defaults to mean radius of the earth
         * @return       object     {latitude: destLat (in degree), longitude: destLng (in degree)}
         */
        computeDestinationPoint: function computeDestinationPoint(start, distance, bearing, radius) {

            var lat = this.latitude(start);
            var lng = this.longitude(start);

            radius = typeof radius === 'undefined' ? this.radius : Number(radius);

            var δ = Number(distance) / radius; // angular distance in radians
            var θ = Number(bearing).toRad();

            var φ1 = Number(lat).toRad();
            var λ1 = Number(lng).toRad();

            var φ2 = Math.asin(Math.sin(φ1) * Math.cos(δ) + Math.cos(φ1) * Math.sin(δ) * Math.cos(θ));
            var λ2 = λ1 + Math.atan2(Math.sin(θ) * Math.sin(δ) * Math.cos(φ1), Math.cos(δ) - Math.sin(φ1) * Math.sin(φ2));
            λ2 = (λ2 + 3 * Math.PI) % (2 * Math.PI) - Math.PI; // normalise to -180..+180°

            return {
                latitude: φ2.toDeg(),
                longitude: λ2.toDeg()
            };
        },

        /**
        * Converts a distance from meters to km, mm, cm, mi, ft, in or yd
        *
        * @param        string      Format to be converted in
        * @param        float       Distance in meters
        * @param        float       Decimal places for rounding (default: 4)
        * @return       float       Converted distance
        */
        convertUnit: function convertUnit(unit, distance, round) {

            if (distance === 0) {

                return 0;
            } else if (typeof distance === 'undefined') {

                if (this.distance === null) {
                    throw new Error('No distance was given');
                } else if (this.distance === 0) {
                    return 0;
                } else {
                    distance = this.distance;
                }
            }

            unit = unit || 'm';
            round = null == round ? 4 : round;

            if (typeof this.measures[unit] !== 'undefined') {
                return this.round(distance * this.measures[unit], round);
            } else {
                throw new Error('Unknown unit for conversion.');
            }
        },

        /**
        * Checks if a value is in decimal format or, if neccessary, converts to decimal
        *
        * @param        mixed       Value(s) to be checked/converted (array of latlng objects, latlng object, sexagesimal string, float)
        * @return       float       Input data in decimal format
        */
        useDecimal: function useDecimal(value) {

            if (Object.prototype.toString.call(value) === '[object Array]') {

                var geolib = this;

                value = value.map(function (val) {

                    //if(!isNaN(parseFloat(val))) {
                    if (geolib.isDecimal(val)) {

                        return geolib.useDecimal(val);
                    } else if (typeof val == 'object') {

                        if (geolib.validate(val)) {

                            return geolib.coords(val);
                        } else {

                            for (var prop in val) {
                                val[prop] = geolib.useDecimal(val[prop]);
                            }

                            return val;
                        }
                    } else if (geolib.isSexagesimal(val)) {

                        return geolib.sexagesimal2decimal(val);
                    } else {

                        return val;
                    }
                });

                return value;
            } else if (typeof value === 'object' && this.validate(value)) {

                return this.coords(value);
            } else if (typeof value === 'object') {

                for (var prop in value) {
                    value[prop] = this.useDecimal(value[prop]);
                }

                return value;
            }

            if (this.isDecimal(value)) {

                return parseFloat(value);
            } else if (this.isSexagesimal(value) === true) {

                return parseFloat(this.sexagesimal2decimal(value));
            }

            throw new Error('Unknown format.');
        },

        /**
        * Converts a decimal coordinate value to sexagesimal format
        *
        * @param        float       decimal
        * @return       string      Sexagesimal value (XX° YY' ZZ")
        */
        decimal2sexagesimal: function decimal2sexagesimal(dec) {

            if (dec in this.sexagesimal) {
                return this.sexagesimal[dec];
            }

            var tmp = dec.toString().split('.');

            var deg = Math.abs(tmp[0]);
            var min = ('0.' + (tmp[1] || 0)) * 60;
            var sec = min.toString().split('.');

            min = Math.floor(min);
            sec = (('0.' + (sec[1] || 0)) * 60).toFixed(2);

            this.sexagesimal[dec] = deg + '° ' + min + "' " + sec + '"';

            return this.sexagesimal[dec];
        },

        /**
        * Converts a sexagesimal coordinate to decimal format
        *
        * @param        float       Sexagesimal coordinate
        * @return       string      Decimal value (XX.XXXXXXXX)
        */
        sexagesimal2decimal: function sexagesimal2decimal(sexagesimal) {

            if (sexagesimal in this.decimal) {
                return this.decimal[sexagesimal];
            }

            var regEx = new RegExp(this.sexagesimalPattern);
            var data = regEx.exec(sexagesimal);
            var min = 0,
                sec = 0;

            if (data) {
                min = parseFloat(data[2] / 60);
                sec = parseFloat(data[4] / 3600) || 0;
            }

            var dec = (parseFloat(data[1]) + min + sec).toFixed(8);
            //var   dec = ((parseFloat(data[1]) + min + sec));

            // South and West are negative decimals
            dec = data[7] == 'S' || data[7] == 'W' ? parseFloat(-dec) : parseFloat(dec);
            //dec = (data[7] == 'S' || data[7] == 'W') ? -dec : dec;

            this.decimal[sexagesimal] = dec;

            return dec;
        },

        /**
        * Checks if a value is in decimal format
        *
        * @param        string      Value to be checked
        * @return       bool        True if in sexagesimal format
        */
        isDecimal: function isDecimal(value) {

            value = value.toString().replace(/\s*/, '');

            // looks silly but works as expected
            // checks if value is in decimal format
            return !isNaN(parseFloat(value)) && parseFloat(value) == value;
        },

        /**
        * Checks if a value is in sexagesimal format
        *
        * @param        string      Value to be checked
        * @return       bool        True if in sexagesimal format
        */
        isSexagesimal: function isSexagesimal(value) {

            value = value.toString().replace(/\s*/, '');

            return this.sexagesimalPattern.test(value);
        },

        round: function round(value, n) {
            var decPlace = Math.pow(10, n);
            return Math.round(value * decPlace) / decPlace;
        }

    });

    // Node module
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {

        module.exports = geolib;

        // react native
        if (typeof global === 'object') {
            global.geolib = geolib;
        }

        // AMD module
    } else if (true) {

        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
            return geolib;
        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

        // we're in a browser
    } else {

        global.geolib = geolib;
    }
})(this);

/***/ }),

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./style/index.css
var style = __webpack_require__("rq4c");
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// EXTERNAL MODULE: ../node_modules/preact/dist/preact.min.js
var preact_min = __webpack_require__("KM04");
var preact_min_default = /*#__PURE__*/__webpack_require__.n(preact_min);

// CONCATENATED MODULE: ../node_modules/preact-router/dist/preact-router.es.js


var EMPTY$1 = {};

function preact_router_es_assign(obj, props) {
	// eslint-disable-next-line guard-for-in
	for (var i in props) {
		obj[i] = props[i];
	}
	return obj;
}

function exec(url, route, opts) {
	if (opts === void 0) opts = EMPTY$1;

	var reg = /(?:\?([^#]*))?(#.*)?$/,
	    c = url.match(reg),
	    matches = {},
	    ret;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i = 0; i < p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var i$1 = 0; i$1 < max; i$1++) {
		if (route[i$1] && route[i$1].charAt(0) === ':') {
			var param = route[i$1].replace(/(^\:|[+*?]+$)/g, ''),
			    flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
			    plus = ~flags.indexOf('+'),
			    star = ~flags.indexOf('*'),
			    val = url[i$1] || '';
			if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
				break;
			}
		} else if (route[i$1] !== url[i$1]) {
			ret = false;
			break;
		}
	}
	if (opts.default !== true && ret === false) {
		return false;
	}
	return matches;
}

function pathRankSort(a, b) {
	var aAttr = a.attributes || EMPTY$1,
	    bAttr = b.attributes || EMPTY$1;
	if (aAttr.default) {
		return 1;
	}
	if (bAttr.default) {
		return -1;
	}
	var diff = rank(aAttr.path) - rank(bAttr.path);
	return diff || aAttr.path.length - bAttr.path.length;
}

function segmentize(url) {
	return strip(url).split('/');
}

function rank(url) {
	return (strip(url).match(/\/+/g) || '').length;
}

function strip(url) {
	return url.replace(/(^\/+|\/+$)/g, '');
}

var customHistory = null;

var ROUTERS = [];

var subscribers = [];

var EMPTY = {};

function isPreactElement(node) {
	return node.__preactattr_ != null || typeof Symbol !== 'undefined' && node[Symbol.for('preactattr')] != null;
}

function setUrl(url, type) {
	if (type === void 0) type = 'push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	} else if (typeof history !== 'undefined' && history[type + 'State']) {
		history[type + 'State'](null, null, url);
	}
}

function getCurrentUrl() {
	var url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	} else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	} else {
		url = typeof location !== 'undefined' ? location : EMPTY;
	}
	return "" + (url.pathname || '') + (url.search || '');
}

function route(url, replace) {
	if (replace === void 0) replace = false;

	if (typeof url !== 'string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}

/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i = ROUTERS.length; i--;) {
		if (ROUTERS[i].canRoute(url)) {
			return true;
		}
	}
	return false;
}

/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i = 0; i < ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url) === true) {
			didRoute = true;
		}
	}
	for (var i$1 = subscribers.length; i$1--;) {
		subscribers[i$1](url);
	}
	return didRoute;
}

function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) {
		return;
	}

	var href = node.getAttribute('href'),
	    target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) {
		return;
	}

	// attempt to route, if no match simply cede control to browser
	return route(href);
}

function handleLinkClick(e) {
	if (e.button == 0) {
		routeFromLink(e.currentTarget || e.target || this);
		return prevent(e);
	}
}

function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) {
			e.stopImmediatePropagation();
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		e.preventDefault();
	}
	return false;
}

function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
		return;
	}

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href') && isPreactElement(t)) {
			if (t.hasAttribute('native')) {
				return;
			}
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while (t = t.parentNode);
}

var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized) {
		return;
	}

	if (typeof addEventListener === 'function') {
		if (!customHistory) {
			addEventListener('popstate', function () {
				return routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}

var preact_router_es_Router = function (Component$$1) {
	function Router(props) {
		Component$$1.call(this, props);
		if (props.history) {
			customHistory = props.history;
		}

		this.state = {
			url: props.url || getCurrentUrl()
		};

		initEventListeners();
	}

	if (Component$$1) Router.__proto__ = Component$$1;
	Router.prototype = Object.create(Component$$1 && Component$$1.prototype);
	Router.prototype.constructor = Router;

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
		if (props.static !== true) {
			return true;
		}
		return props.url !== this.props.url || props.onChange !== this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */
	Router.prototype.canRoute = function canRoute(url) {
		return this.getMatchingChildren(this.props.children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */
	Router.prototype.routeTo = function routeTo(url) {
		this._didRoute = false;
		this.setState({ url: url });

		// if we're in the middle of an update, don't synchronously re-route.
		if (this.updating) {
			return this.canRoute(url);
		}

		this.forceUpdate();
		return this._didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount() {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount() {
		var this$1 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				this$1.routeTo("" + (location.pathname || '') + (location.search || ''));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount() {
		if (typeof this.unlisten === 'function') {
			this.unlisten();
		}
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate() {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate() {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
		return children.slice().sort(pathRankSort).map(function (vnode) {
			var attrs = vnode.attributes || {},
			    path = attrs.path,
			    matches = exec(url, path, attrs);
			if (matches) {
				if (invoke !== false) {
					var newProps = { url: url, matches: matches };
					preact_router_es_assign(newProps, matches);
					return Object(preact_min["cloneElement"])(vnode, newProps);
				}
				return vnode;
			}
			return false;
		}).filter(Boolean);
	};

	Router.prototype.render = function render(ref, ref$1) {
		var children = ref.children;
		var onChange = ref.onChange;
		var url = ref$1.url;

		var active = this.getMatchingChildren(children, url, true);

		var current = active[0] || null;
		this._didRoute = !!current;

		var previous = this.previousUrl;
		if (url !== previous) {
			this.previousUrl = url;
			if (typeof onChange === 'function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(preact_min["Component"]);

var preact_router_es_Link = function Link(props) {
	return Object(preact_min["h"])('a', preact_router_es_assign({ onClick: handleLinkClick }, props));
};

var preact_router_es_Route = function Route(props) {
	return Object(preact_min["h"])(props.component, props);
};

preact_router_es_Router.subscribers = subscribers;
preact_router_es_Router.getCurrentUrl = getCurrentUrl;
preact_router_es_Router.route = route;
preact_router_es_Router.Router = preact_router_es_Router;
preact_router_es_Router.Route = preact_router_es_Route;
preact_router_es_Router.Link = preact_router_es_Link;

/* harmony default export */ var preact_router_es = (preact_router_es_Router);
//# sourceMappingURL=preact-router.es.js.map
// CONCATENATED MODULE: ../node_modules/@material/base/foundation.js
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @template A
 */
var MDCFoundation = function () {
  _createClass(MDCFoundation, null, [{
    key: "cssClasses",

    /** @return enum{cssClasses} */
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports every
      // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
      return {};
    }

    /** @return enum{strings} */

  }, {
    key: "strings",
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
      return {};
    }

    /** @return enum{numbers} */

  }, {
    key: "numbers",
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
      return {};
    }

    /** @return {!Object} */

  }, {
    key: "defaultAdapter",
    get: function get() {
      // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
      // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
      // validation.
      return {};
    }

    /**
     * @param {A=} adapter
     */

  }]);

  function MDCFoundation() {
    var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MDCFoundation);

    /** @protected {!A} */
    this.adapter_ = adapter;
  }

  MDCFoundation.prototype.init = function init() {
    // Subclasses should override this method to perform initialization routines (registering events, etc.)
  };

  MDCFoundation.prototype.destroy = function destroy() {
    // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
  };

  return MDCFoundation;
}();

/* harmony default export */ var foundation = (MDCFoundation);
// CONCATENATED MODULE: ../node_modules/@material/base/component.js
function component__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



/**
 * @template F
 */

var component_MDCComponent = function () {
  /**
   * @param {!Element} root
   * @return {!MDCComponent}
   */
  MDCComponent.attachTo = function attachTo(root) {
    // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
    // returns an instantiated component with its root set to that element. Also note that in the cases of
    // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
    // from getDefaultFoundation().
    return new MDCComponent(root, new foundation());
  };

  /**
   * @param {!Element} root
   * @param {F=} foundation
   * @param {...?} args
   */


  function MDCComponent(root) {
    var foundation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

    component__classCallCheck(this, MDCComponent);

    /** @protected {!Element} */
    this.root_ = root;

    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    this.initialize.apply(this, args);
    // Note that we initialize foundation here and not within the constructor's default param so that
    // this.root_ is defined and can be used within the foundation class.
    /** @protected {!F} */
    this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
    this.foundation_.init();
    this.initialSyncWithDOM();
  }

  MDCComponent.prototype.initialize = function initialize() /* ...args */{}
  // Subclasses can override this to do any additional setup work that would be considered part of a
  // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
  // initialized. Any additional arguments besides root and foundation will be passed in here.


  /**
   * @return {!F} foundation
   */
  ;

  MDCComponent.prototype.getDefaultFoundation = function getDefaultFoundation() {
    // Subclasses must override this method to return a properly configured foundation class for the
    // component.
    throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
  };

  MDCComponent.prototype.initialSyncWithDOM = function initialSyncWithDOM() {
    // Subclasses should override this method if they need to perform work to synchronize with a host DOM
    // object. An example of this would be a form control wrapper that needs to synchronize its internal state
    // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
    // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
  };

  MDCComponent.prototype.destroy = function destroy() {
    // Subclasses may implement this method to release any resources / deregister any listeners they have
    // attached. An example of this might be deregistering a resize event from the window object.
    this.foundation_.destroy();
  };

  /**
   * Wrapper method to add an event listener to the component's root element. This is most useful when
   * listening for custom events.
   * @param {string} evtType
   * @param {!Function} handler
   */


  MDCComponent.prototype.listen = function listen(evtType, handler) {
    this.root_.addEventListener(evtType, handler);
  };

  /**
   * Wrapper method to remove an event listener to the component's root element. This is most useful when
   * unlistening for custom events.
   * @param {string} evtType
   * @param {!Function} handler
   */


  MDCComponent.prototype.unlisten = function unlisten(evtType, handler) {
    this.root_.removeEventListener(evtType, handler);
  };

  /**
   * Fires a cross-browser-compatible custom event from the component root of the given type,
   * with the given data.
   * @param {string} evtType
   * @param {!Object} evtData
   * @param {boolean=} shouldBubble
   */


  MDCComponent.prototype.emit = function emit(evtType, evtData) {
    var shouldBubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var evt = void 0;
    if (typeof CustomEvent === 'function') {
      evt = new CustomEvent(evtType, {
        detail: evtData,
        bubbles: shouldBubble
      });
    } else {
      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(evtType, shouldBubble, false, evtData);
    }

    this.root_.dispatchEvent(evt);
  };

  return MDCComponent;
}();

/* harmony default export */ var component = (component_MDCComponent);
// CONCATENATED MODULE: ../node_modules/@material/ripple/adapter.js
function adapter__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Ripple. Provides an interface for managing
 * - classes
 * - dom
 * - CSS variables
 * - position
 * - dimensions
 * - scroll position
 * - event handlers
 * - unbounded, active and disabled states
 *
 * Additionally, provides type information for the adapter to the Closure
 * compiler.
 *
 * Implement this adapter for your framework of choice to delegate updates to
 * the component in your framework of choice. See architecture documentation
 * for more details.
 * https://github.com/material-components/material-components-web/blob/master/docs/architecture.md
 *
 * @record
 */
var MDCRippleAdapter = function () {
  function MDCRippleAdapter() {
    adapter__classCallCheck(this, MDCRippleAdapter);
  }

  /** @return {boolean} */
  MDCRippleAdapter.prototype.browserSupportsCssVars = function browserSupportsCssVars() {};

  /** @return {boolean} */


  MDCRippleAdapter.prototype.isUnbounded = function isUnbounded() {};

  /** @return {boolean} */


  MDCRippleAdapter.prototype.isSurfaceActive = function isSurfaceActive() {};

  /** @return {boolean} */


  MDCRippleAdapter.prototype.isSurfaceDisabled = function isSurfaceDisabled() {};

  /** @param {string} className */


  MDCRippleAdapter.prototype.addClass = function addClass(className) {};

  /** @param {string} className */


  MDCRippleAdapter.prototype.removeClass = function removeClass(className) {};

  /**
   * @param {string} evtType
   * @param {!Function} handler
   */


  MDCRippleAdapter.prototype.registerInteractionHandler = function registerInteractionHandler(evtType, handler) {};

  /**
   * @param {string} evtType
   * @param {!Function} handler
   */


  MDCRippleAdapter.prototype.deregisterInteractionHandler = function deregisterInteractionHandler(evtType, handler) {};

  /**
   * @param {!Function} handler
   */


  MDCRippleAdapter.prototype.registerResizeHandler = function registerResizeHandler(handler) {};

  /**
   * @param {!Function} handler
   */


  MDCRippleAdapter.prototype.deregisterResizeHandler = function deregisterResizeHandler(handler) {};

  /**
   * @param {string} varName
   * @param {?number|string} value
   */


  MDCRippleAdapter.prototype.updateCssVariable = function updateCssVariable(varName, value) {};

  /** @return {!ClientRect} */


  MDCRippleAdapter.prototype.computeBoundingRect = function computeBoundingRect() {};

  /** @return {{x: number, y: number}} */


  MDCRippleAdapter.prototype.getWindowPageOffset = function getWindowPageOffset() {};

  return MDCRippleAdapter;
}();

/* harmony default export */ var adapter = (MDCRippleAdapter);
// CONCATENATED MODULE: ../node_modules/@material/ripple/constants.js
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var cssClasses = {
  // Ripple is a special case where the "root" component is really a "mixin" of sorts,
  // given that it's an 'upgrade' to an existing component. That being said it is the root
  // CSS class that all other CSS classes derive from.
  ROOT: 'mdc-ripple-upgraded',
  UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
  BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
  BG_ACTIVE_FILL: 'mdc-ripple-upgraded--background-active-fill',
  FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
  FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation'
};

var strings = {
  VAR_SURFACE_WIDTH: '--mdc-ripple-surface-width',
  VAR_SURFACE_HEIGHT: '--mdc-ripple-surface-height',
  VAR_FG_SIZE: '--mdc-ripple-fg-size',
  VAR_LEFT: '--mdc-ripple-left',
  VAR_TOP: '--mdc-ripple-top',
  VAR_FG_SCALE: '--mdc-ripple-fg-scale',
  VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
  VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end'
};

var numbers = {
  PADDING: 10,
  INITIAL_ORIGIN_SCALE: 0.6,
  DEACTIVATION_TIMEOUT_MS: 300,
  FG_DEACTIVATION_MS: 83
};


// CONCATENATED MODULE: ../node_modules/@material/ripple/util.js
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Stores result from supportsCssVariables to avoid redundant processing to detect CSS custom variable support.
 * @private {boolean|undefined}
 */
var supportsCssVariables_ = void 0;

/**
 * Stores result from applyPassive to avoid redundant processing to detect passive event listener support.
 * @private {boolean|undefined}
 */
var supportsPassive_ = void 0;

/**
 * @param {!Window} windowObj
 * @return {boolean}
 */
function detectEdgePseudoVarBug(windowObj) {
  // Detect versions of Edge with buggy var() support
  // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/
  var document = windowObj.document;
  var node = document.createElement('div');
  node.className = 'mdc-ripple-surface--test-edge-var-bug';
  document.body.appendChild(node);

  // The bug exists if ::before style ends up propagating to the parent element.
  // Additionally, getComputedStyle returns null in iframes with display: "none" in Firefox,
  // but Firefox is known to support CSS custom properties correctly.
  // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
  var computedStyle = windowObj.getComputedStyle(node);
  var hasPseudoVarBug = computedStyle !== null && computedStyle.borderTopStyle === 'solid';
  node.remove();
  return hasPseudoVarBug;
}

/**
 * @param {!Window} windowObj
 * @param {boolean=} forceRefresh
 * @return {boolean|undefined}
 */

function supportsCssVariables(windowObj) {
  var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
    return supportsCssVariables_;
  }

  var supportsFunctionPresent = windowObj.CSS && typeof windowObj.CSS.supports === 'function';
  if (!supportsFunctionPresent) {
    return;
  }

  var explicitlySupportsCssVars = windowObj.CSS.supports('--css-vars', 'yes');
  // See: https://bugs.webkit.org/show_bug.cgi?id=154669
  // See: README section on Safari
  var weAreFeatureDetectingSafari10plus = windowObj.CSS.supports('(--css-vars: yes)') && windowObj.CSS.supports('color', '#00000000');

  if (explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus) {
    supportsCssVariables_ = !detectEdgePseudoVarBug(windowObj);
  } else {
    supportsCssVariables_ = false;
  }
  return supportsCssVariables_;
}

//
/**
 * Determine whether the current browser supports passive event listeners, and if so, use them.
 * @param {!Window=} globalObj
 * @param {boolean=} forceRefresh
 * @return {boolean|{passive: boolean}}
 */
function applyPassive() {
  var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (supportsPassive_ === undefined || forceRefresh) {
    var isSupported = false;
    try {
      globalObj.document.addEventListener('test', null, { get passive() {
          isSupported = true;
        } });
    } catch (e) {}

    supportsPassive_ = isSupported;
  }

  return supportsPassive_ ? { passive: true } : false;
}

/**
 * @param {!Object} HTMLElementPrototype
 * @return {!Array<string>}
 */
function getMatchesProperty(HTMLElementPrototype) {
  return ['webkitMatchesSelector', 'msMatchesSelector', 'matches'].filter(function (p) {
    return p in HTMLElementPrototype;
  }).pop();
}

/**
 * @param {!Event} ev
 * @param {!{x: number, y: number}} pageOffset
 * @param {!ClientRect} clientRect
 * @return {!{x: number, y: number}}
 */
function getNormalizedEventCoords(ev, pageOffset, clientRect) {
  var x = pageOffset.x,
      y = pageOffset.y;

  var documentX = x + clientRect.left;
  var documentY = y + clientRect.top;

  var normalizedX = void 0;
  var normalizedY = void 0;
  // Determine touch point relative to the ripple container.
  if (ev.type === 'touchstart') {
    normalizedX = ev.changedTouches[0].pageX - documentX;
    normalizedY = ev.changedTouches[0].pageY - documentY;
  } else {
    normalizedX = ev.pageX - documentX;
    normalizedY = ev.pageY - documentY;
  }

  return { x: normalizedX, y: normalizedY };
}


// CONCATENATED MODULE: ../node_modules/@material/ripple/foundation.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var foundation__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function foundation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






/**
 * @typedef {!{
 *   isActivated: (boolean|undefined),
 *   hasDeactivationUXRun: (boolean|undefined),
 *   wasActivatedByPointer: (boolean|undefined),
 *   wasElementMadeActive: (boolean|undefined),
 *   activationStartTime: (number|undefined),
 *   activationEvent: Event,
 *   isProgrammatic: (boolean|undefined)
 * }}
 */
var ActivationStateType = void 0;

/**
 * @typedef {!{
 *   activate: (string|undefined),
 *   deactivate: (string|undefined),
 *   focus: (string|undefined),
 *   blur: (string|undefined)
 * }}
 */
var ListenerInfoType = void 0;

/**
 * @typedef {!{
 *   activate: function(!Event),
 *   deactivate: function(!Event),
 *   focus: function(),
 *   blur: function()
 * }}
 */
var ListenersType = void 0;

/**
 * @typedef {!{
 *   x: number,
 *   y: number
 * }}
 */
var PointType = void 0;

/**
 * @enum {string}
 */
var DEACTIVATION_ACTIVATION_PAIRS = {
  mouseup: 'mousedown',
  pointerup: 'pointerdown',
  touchend: 'touchstart',
  keyup: 'keydown',
  blur: 'focus'
};

/**
 * @extends {MDCFoundation<!MDCRippleAdapter>}
 */

var foundation_MDCRippleFoundation = function (_MDCFoundation) {
  _inherits(MDCRippleFoundation, _MDCFoundation);

  foundation__createClass(MDCRippleFoundation, null, [{
    key: 'cssClasses',
    get: function get() {
      return cssClasses;
    }
  }, {
    key: 'strings',
    get: function get() {
      return strings;
    }
  }, {
    key: 'numbers',
    get: function get() {
      return numbers;
    }
  }, {
    key: 'defaultAdapter',
    get: function get() {
      return {
        browserSupportsCssVars: function browserSupportsCssVars() /* boolean - cached */{},
        isUnbounded: function isUnbounded() /* boolean */{},
        isSurfaceActive: function isSurfaceActive() /* boolean */{},
        isSurfaceDisabled: function isSurfaceDisabled() /* boolean */{},
        addClass: function addClass() /* className: string */{},
        removeClass: function removeClass() /* className: string */{},
        registerInteractionHandler: function registerInteractionHandler() /* evtType: string, handler: EventListener */{},
        deregisterInteractionHandler: function deregisterInteractionHandler() /* evtType: string, handler: EventListener */{},
        registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
        deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
        updateCssVariable: function updateCssVariable() /* varName: string, value: string */{},
        computeBoundingRect: function computeBoundingRect() /* ClientRect */{},
        getWindowPageOffset: function getWindowPageOffset() /* {x: number, y: number} */{}
      };
    }
  }]);

  function MDCRippleFoundation(adapter) {
    foundation__classCallCheck(this, MDCRippleFoundation);

    /** @private {number} */
    var _this = _possibleConstructorReturn(this, _MDCFoundation.call(this, _extends(MDCRippleFoundation.defaultAdapter, adapter)));

    _this.layoutFrame_ = 0;

    /** @private {!ClientRect} */
    _this.frame_ = /** @type {!ClientRect} */{ width: 0, height: 0 };

    /** @private {!ActivationStateType} */
    _this.activationState_ = _this.defaultActivationState_();

    /** @private {number} */
    _this.xfDuration_ = 0;

    /** @private {number} */
    _this.initialSize_ = 0;

    /** @private {number} */
    _this.maxRadius_ = 0;

    /** @private {!Array<{ListenerInfoType}>} */
    _this.listenerInfos_ = [{ activate: 'touchstart', deactivate: 'touchend' }, { activate: 'pointerdown', deactivate: 'pointerup' }, { activate: 'mousedown', deactivate: 'mouseup' }, { activate: 'keydown', deactivate: 'keyup' }, { focus: 'focus', blur: 'blur' }];

    /** @private {!ListenersType} */
    _this.listeners_ = {
      activate: function activate(e) {
        return _this.activate_(e);
      },
      deactivate: function deactivate(e) {
        return _this.deactivate_(e);
      },
      focus: function focus() {
        return requestAnimationFrame(function () {
          return _this.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
        });
      },
      blur: function blur() {
        return requestAnimationFrame(function () {
          return _this.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
        });
      }
    };

    /** @private {!Function} */
    _this.resizeHandler_ = function () {
      return _this.layout();
    };

    /** @private {!{left: number, top:number}} */
    _this.unboundedCoords_ = {
      left: 0,
      top: 0
    };

    /** @private {number} */
    _this.fgScale_ = 0;

    /** @private {number} */
    _this.activationTimer_ = 0;

    /** @private {number} */
    _this.fgDeactivationRemovalTimer_ = 0;

    /** @private {boolean} */
    _this.activationAnimationHasEnded_ = false;

    /** @private {!Function} */
    _this.activationTimerCallback_ = function () {
      _this.activationAnimationHasEnded_ = true;
      _this.runDeactivationUXLogicIfReady_();
    };
    return _this;
  }

  /**
   * We compute this property so that we are not querying information about the client
   * until the point in time where the foundation requests it. This prevents scenarios where
   * client-side feature-detection may happen too early, such as when components are rendered on the server
   * and then initialized at mount time on the client.
   * @return {boolean}
   * @private
   */


  MDCRippleFoundation.prototype.isSupported_ = function isSupported_() {
    return this.adapter_.browserSupportsCssVars();
  };

  /**
   * @return {!ActivationStateType}
   */


  MDCRippleFoundation.prototype.defaultActivationState_ = function defaultActivationState_() {
    return {
      isActivated: false,
      hasDeactivationUXRun: false,
      wasActivatedByPointer: false,
      wasElementMadeActive: false,
      activationStartTime: 0,
      activationEvent: null,
      isProgrammatic: false
    };
  };

  MDCRippleFoundation.prototype.init = function init() {
    var _this2 = this;

    if (!this.isSupported_()) {
      return;
    }
    this.addEventListeners_();

    var _MDCRippleFoundation$ = MDCRippleFoundation.cssClasses,
        ROOT = _MDCRippleFoundation$.ROOT,
        UNBOUNDED = _MDCRippleFoundation$.UNBOUNDED;

    requestAnimationFrame(function () {
      _this2.adapter_.addClass(ROOT);
      if (_this2.adapter_.isUnbounded()) {
        _this2.adapter_.addClass(UNBOUNDED);
      }
      _this2.layoutInternal_();
    });
  };

  /** @private */


  MDCRippleFoundation.prototype.addEventListeners_ = function addEventListeners_() {
    var _this3 = this;

    this.listenerInfos_.forEach(function (info) {
      Object.keys(info).forEach(function (k) {
        _this3.adapter_.registerInteractionHandler(info[k], _this3.listeners_[k]);
      });
    });
    this.adapter_.registerResizeHandler(this.resizeHandler_);
  };

  /**
   * @param {Event} e
   * @private
   */


  MDCRippleFoundation.prototype.activate_ = function activate_(e) {
    var _this4 = this;

    if (this.adapter_.isSurfaceDisabled()) {
      return;
    }

    var activationState = this.activationState_;

    if (activationState.isActivated) {
      return;
    }

    activationState.isActivated = true;
    activationState.isProgrammatic = e === null;
    activationState.activationEvent = e;
    activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : e.type === 'mousedown' || e.type === 'touchstart' || e.type === 'pointerdown';
    activationState.activationStartTime = Date.now();

    requestAnimationFrame(function () {
      // This needs to be wrapped in an rAF call b/c web browsers
      // report active states inconsistently when they're called within
      // event handling code:
      // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
      // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
      activationState.wasElementMadeActive = e && e.type === 'keydown' ? _this4.adapter_.isSurfaceActive() : true;
      if (activationState.wasElementMadeActive) {
        _this4.animateActivation_();
      } else {
        // Reset activation state immediately if element was not made active.
        _this4.activationState_ = _this4.defaultActivationState_();
      }
    });
  };

  /**
   * @param {?Event=} event Optional event containing position information.
   */


  MDCRippleFoundation.prototype.activate = function activate() {
    var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    this.activate_(event);
  };

  /** @private */


  MDCRippleFoundation.prototype.animateActivation_ = function animateActivation_() {
    var _this5 = this;

    var _MDCRippleFoundation$2 = MDCRippleFoundation.strings,
        VAR_FG_TRANSLATE_START = _MDCRippleFoundation$2.VAR_FG_TRANSLATE_START,
        VAR_FG_TRANSLATE_END = _MDCRippleFoundation$2.VAR_FG_TRANSLATE_END;
    var _MDCRippleFoundation$3 = MDCRippleFoundation.cssClasses,
        BG_ACTIVE_FILL = _MDCRippleFoundation$3.BG_ACTIVE_FILL,
        FG_DEACTIVATION = _MDCRippleFoundation$3.FG_DEACTIVATION,
        FG_ACTIVATION = _MDCRippleFoundation$3.FG_ACTIVATION;
    var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;


    var translateStart = '';
    var translateEnd = '';

    if (!this.adapter_.isUnbounded()) {
      var _getFgTranslationCoor = this.getFgTranslationCoordinates_(),
          startPoint = _getFgTranslationCoor.startPoint,
          endPoint = _getFgTranslationCoor.endPoint;

      translateStart = startPoint.x + 'px, ' + startPoint.y + 'px';
      translateEnd = endPoint.x + 'px, ' + endPoint.y + 'px';
    }

    this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
    this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
    // Cancel any ongoing activation/deactivation animations
    clearTimeout(this.activationTimer_);
    clearTimeout(this.fgDeactivationRemovalTimer_);
    this.rmBoundedActivationClasses_();
    this.adapter_.removeClass(FG_DEACTIVATION);

    // Force layout in order to re-trigger the animation.
    this.adapter_.computeBoundingRect();
    this.adapter_.addClass(BG_ACTIVE_FILL);
    this.adapter_.addClass(FG_ACTIVATION);
    this.activationTimer_ = setTimeout(function () {
      return _this5.activationTimerCallback_();
    }, DEACTIVATION_TIMEOUT_MS);
  };

  /**
   * @private
   * @return {{startPoint: PointType, endPoint: PointType}}
   */


  MDCRippleFoundation.prototype.getFgTranslationCoordinates_ = function getFgTranslationCoordinates_() {
    var activationState = this.activationState_;
    var activationEvent = activationState.activationEvent,
        wasActivatedByPointer = activationState.wasActivatedByPointer;


    var startPoint = void 0;
    if (wasActivatedByPointer) {
      startPoint = getNormalizedEventCoords(
      /** @type {!Event} */activationEvent, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
    } else {
      startPoint = {
        x: this.frame_.width / 2,
        y: this.frame_.height / 2
      };
    }
    // Center the element around the start point.
    startPoint = {
      x: startPoint.x - this.initialSize_ / 2,
      y: startPoint.y - this.initialSize_ / 2
    };

    var endPoint = {
      x: this.frame_.width / 2 - this.initialSize_ / 2,
      y: this.frame_.height / 2 - this.initialSize_ / 2
    };

    return { startPoint: startPoint, endPoint: endPoint };
  };

  /** @private */


  MDCRippleFoundation.prototype.runDeactivationUXLogicIfReady_ = function runDeactivationUXLogicIfReady_() {
    var _this6 = this;

    var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
    var _activationState_ = this.activationState_,
        hasDeactivationUXRun = _activationState_.hasDeactivationUXRun,
        isActivated = _activationState_.isActivated;

    var activationHasEnded = hasDeactivationUXRun || !isActivated;
    if (activationHasEnded && this.activationAnimationHasEnded_) {
      this.rmBoundedActivationClasses_();
      this.adapter_.addClass(FG_DEACTIVATION);
      this.fgDeactivationRemovalTimer_ = setTimeout(function () {
        _this6.adapter_.removeClass(FG_DEACTIVATION);
      }, numbers.FG_DEACTIVATION_MS);
    }
  };

  /** @private */


  MDCRippleFoundation.prototype.rmBoundedActivationClasses_ = function rmBoundedActivationClasses_() {
    var _MDCRippleFoundation$4 = MDCRippleFoundation.cssClasses,
        BG_ACTIVE_FILL = _MDCRippleFoundation$4.BG_ACTIVE_FILL,
        FG_ACTIVATION = _MDCRippleFoundation$4.FG_ACTIVATION;

    this.adapter_.removeClass(BG_ACTIVE_FILL);
    this.adapter_.removeClass(FG_ACTIVATION);
    this.activationAnimationHasEnded_ = false;
    this.adapter_.computeBoundingRect();
  };

  /**
   * @param {Event} e
   * @private
   */


  MDCRippleFoundation.prototype.deactivate_ = function deactivate_(e) {
    var _this7 = this;

    var activationState = this.activationState_;
    // This can happen in scenarios such as when you have a keyup event that blurs the element.

    if (!activationState.isActivated) {
      return;
    }
    // Programmatic deactivation.
    if (activationState.isProgrammatic) {
      var evtObject = null;
      var _state = /** @type {!ActivationStateType} */_extends({}, activationState);
      requestAnimationFrame(function () {
        return _this7.animateDeactivation_(evtObject, _state);
      });
      this.activationState_ = this.defaultActivationState_();
      return;
    }

    var actualActivationType = DEACTIVATION_ACTIVATION_PAIRS[e.type];
    var expectedActivationType = activationState.activationEvent.type;
    // NOTE: Pointer events are tricky - https://patrickhlauke.github.io/touch/tests/results/
    // Essentially, what we need to do here is decouple the deactivation UX from the actual
    // deactivation state itself. This way, touch/pointer events in sequence do not trample one
    // another.
    var needsDeactivationUX = actualActivationType === expectedActivationType;
    var needsActualDeactivation = needsDeactivationUX;
    if (activationState.wasActivatedByPointer) {
      needsActualDeactivation = e.type === 'mouseup';
    }

    var state = /** @type {!ActivationStateType} */_extends({}, activationState);
    requestAnimationFrame(function () {
      if (needsDeactivationUX) {
        _this7.activationState_.hasDeactivationUXRun = true;
        _this7.animateDeactivation_(e, state);
      }

      if (needsActualDeactivation) {
        _this7.activationState_ = _this7.defaultActivationState_();
      }
    });
  };

  /**
   * @param {?Event=} event Optional event containing position information.
   */


  MDCRippleFoundation.prototype.deactivate = function deactivate() {
    var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    this.deactivate_(event);
  };

  /**
   * @param {Event} e
   * @param {!ActivationStateType} options
   * @private
   */


  MDCRippleFoundation.prototype.animateDeactivation_ = function animateDeactivation_(e, _ref) {
    var wasActivatedByPointer = _ref.wasActivatedByPointer,
        wasElementMadeActive = _ref.wasElementMadeActive;
    var BG_FOCUSED = MDCRippleFoundation.cssClasses.BG_FOCUSED;

    if (wasActivatedByPointer || wasElementMadeActive) {
      // Remove class left over by element being focused
      this.adapter_.removeClass(BG_FOCUSED);
      this.runDeactivationUXLogicIfReady_();
    }
  };

  MDCRippleFoundation.prototype.destroy = function destroy() {
    var _this8 = this;

    if (!this.isSupported_()) {
      return;
    }
    this.removeEventListeners_();

    var _MDCRippleFoundation$5 = MDCRippleFoundation.cssClasses,
        ROOT = _MDCRippleFoundation$5.ROOT,
        UNBOUNDED = _MDCRippleFoundation$5.UNBOUNDED;

    requestAnimationFrame(function () {
      _this8.adapter_.removeClass(ROOT);
      _this8.adapter_.removeClass(UNBOUNDED);
      _this8.removeCssVars_();
    });
  };

  /** @private */


  MDCRippleFoundation.prototype.removeEventListeners_ = function removeEventListeners_() {
    var _this9 = this;

    this.listenerInfos_.forEach(function (info) {
      Object.keys(info).forEach(function (k) {
        _this9.adapter_.deregisterInteractionHandler(info[k], _this9.listeners_[k]);
      });
    });
    this.adapter_.deregisterResizeHandler(this.resizeHandler_);
  };

  /** @private */


  MDCRippleFoundation.prototype.removeCssVars_ = function removeCssVars_() {
    var _this10 = this;

    var strings = MDCRippleFoundation.strings;

    Object.keys(strings).forEach(function (k) {
      if (k.indexOf('VAR_') === 0) {
        _this10.adapter_.updateCssVariable(strings[k], null);
      }
    });
  };

  MDCRippleFoundation.prototype.layout = function layout() {
    var _this11 = this;

    if (this.layoutFrame_) {
      cancelAnimationFrame(this.layoutFrame_);
    }
    this.layoutFrame_ = requestAnimationFrame(function () {
      _this11.layoutInternal_();
      _this11.layoutFrame_ = 0;
    });
  };

  /** @private */


  MDCRippleFoundation.prototype.layoutInternal_ = function layoutInternal_() {
    this.frame_ = this.adapter_.computeBoundingRect();

    var maxDim = Math.max(this.frame_.height, this.frame_.width);
    var surfaceDiameter = Math.sqrt(Math.pow(this.frame_.width, 2) + Math.pow(this.frame_.height, 2));

    // 60% of the largest dimension of the surface
    this.initialSize_ = maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE;

    // Diameter of the surface + 10px
    this.maxRadius_ = surfaceDiameter + MDCRippleFoundation.numbers.PADDING;
    this.fgScale_ = this.maxRadius_ / this.initialSize_;
    this.xfDuration_ = 1000 * Math.sqrt(this.maxRadius_ / 1024);
    this.updateLayoutCssVars_();
  };

  /** @private */


  MDCRippleFoundation.prototype.updateLayoutCssVars_ = function updateLayoutCssVars_() {
    var _MDCRippleFoundation$6 = MDCRippleFoundation.strings,
        VAR_SURFACE_WIDTH = _MDCRippleFoundation$6.VAR_SURFACE_WIDTH,
        VAR_SURFACE_HEIGHT = _MDCRippleFoundation$6.VAR_SURFACE_HEIGHT,
        VAR_FG_SIZE = _MDCRippleFoundation$6.VAR_FG_SIZE,
        VAR_LEFT = _MDCRippleFoundation$6.VAR_LEFT,
        VAR_TOP = _MDCRippleFoundation$6.VAR_TOP,
        VAR_FG_SCALE = _MDCRippleFoundation$6.VAR_FG_SCALE;


    this.adapter_.updateCssVariable(VAR_SURFACE_WIDTH, this.frame_.width + 'px');
    this.adapter_.updateCssVariable(VAR_SURFACE_HEIGHT, this.frame_.height + 'px');
    this.adapter_.updateCssVariable(VAR_FG_SIZE, this.initialSize_ + 'px');
    this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);

    if (this.adapter_.isUnbounded()) {
      this.unboundedCoords_ = {
        left: Math.round(this.frame_.width / 2 - this.initialSize_ / 2),
        top: Math.round(this.frame_.height / 2 - this.initialSize_ / 2)
      };

      this.adapter_.updateCssVariable(VAR_LEFT, this.unboundedCoords_.left + 'px');
      this.adapter_.updateCssVariable(VAR_TOP, this.unboundedCoords_.top + 'px');
    }
  };

  return MDCRippleFoundation;
}(foundation);

/* harmony default export */ var ripple_foundation = (foundation_MDCRippleFoundation);
// CONCATENATED MODULE: ../node_modules/@material/ripple/index.js
var ripple__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function ripple__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ripple__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function ripple__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






/**
 * @extends MDCComponent<!MDCRippleFoundation>
 */

var ripple_MDCRipple = function (_MDCComponent) {
  ripple__inherits(MDCRipple, _MDCComponent);

  /** @param {...?} args */
  function MDCRipple() {
    ripple__classCallCheck(this, MDCRipple);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    /** @type {boolean} */
    var _this = ripple__possibleConstructorReturn(this, _MDCComponent.call.apply(_MDCComponent, [this].concat(args)));

    _this.disabled = false;

    /** @private {boolean} */
    _this.unbounded_;
    return _this;
  }

  /**
   * @param {!Element} root
   * @param {{isUnbounded: (boolean|undefined)}=} options
   * @return {!MDCRipple}
   */


  MDCRipple.attachTo = function attachTo(root) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$isUnbounded = _ref.isUnbounded,
        isUnbounded = _ref$isUnbounded === undefined ? undefined : _ref$isUnbounded;

    var ripple = new MDCRipple(root);
    // Only override unbounded behavior if option is explicitly specified
    if (isUnbounded !== undefined) {
      ripple.unbounded = /** @type {boolean} */isUnbounded;
    }
    return ripple;
  };

  /**
   * @param {!RippleCapableSurface} instance
   * @return {!MDCRippleAdapter}
   */


  MDCRipple.createAdapter = function createAdapter(instance) {
    var MATCHES = getMatchesProperty(HTMLElement.prototype);

    return {
      browserSupportsCssVars: function browserSupportsCssVars() {
        return supportsCssVariables(window);
      },
      isUnbounded: function isUnbounded() {
        return instance.unbounded;
      },
      isSurfaceActive: function isSurfaceActive() {
        return instance.root_[MATCHES](':active');
      },
      isSurfaceDisabled: function isSurfaceDisabled() {
        return instance.disabled;
      },
      addClass: function addClass(className) {
        return instance.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return instance.root_.classList.remove(className);
      },
      registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
        return instance.root_.addEventListener(evtType, handler, applyPassive());
      },
      deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
        return instance.root_.removeEventListener(evtType, handler, applyPassive());
      },
      registerResizeHandler: function registerResizeHandler(handler) {
        return window.addEventListener('resize', handler);
      },
      deregisterResizeHandler: function deregisterResizeHandler(handler) {
        return window.removeEventListener('resize', handler);
      },
      updateCssVariable: function updateCssVariable(varName, value) {
        return instance.root_.style.setProperty(varName, value);
      },
      computeBoundingRect: function computeBoundingRect() {
        return instance.root_.getBoundingClientRect();
      },
      getWindowPageOffset: function getWindowPageOffset() {
        return { x: window.pageXOffset, y: window.pageYOffset };
      }
    };
  };

  /** @return {boolean} */


  MDCRipple.prototype.activate = function activate() {
    this.foundation_.activate();
  };

  MDCRipple.prototype.deactivate = function deactivate() {
    this.foundation_.deactivate();
  };

  MDCRipple.prototype.layout = function layout() {
    this.foundation_.layout();
  };

  /** @return {!MDCRippleFoundation} */


  MDCRipple.prototype.getDefaultFoundation = function getDefaultFoundation() {
    return new ripple_foundation(MDCRipple.createAdapter(this));
  };

  MDCRipple.prototype.initialSyncWithDOM = function initialSyncWithDOM() {
    this.unbounded = 'mdcRippleIsUnbounded' in this.root_.dataset;
  };

  ripple__createClass(MDCRipple, [{
    key: 'unbounded',
    get: function get() {
      return this.unbounded_;
    }

    /** @param {boolean} unbounded */
    ,
    set: function set(unbounded) {
      var UNBOUNDED = ripple_foundation.cssClasses.UNBOUNDED;

      this.unbounded_ = Boolean(unbounded);
      if (this.unbounded_) {
        this.root_.classList.add(UNBOUNDED);
      } else {
        this.root_.classList.remove(UNBOUNDED);
      }
    }
  }]);

  return MDCRipple;
}(component);

/**
 * See Material Design spec for more details on when to use ripples.
 * https://material.io/guidelines/motion/choreography.html#choreography-creation
 * @record
 */


var RippleCapableSurface = function RippleCapableSurface() {
  ripple__classCallCheck(this, RippleCapableSurface);
};

/** @protected {!Element} */


RippleCapableSurface.prototype.root_;

/**
 * Whether or not the ripple bleeds out of the bounds of the element.
 * @type {boolean|undefined}
 */
RippleCapableSurface.prototype.unbounded;

/**
 * Whether or not the ripple is attached to a disabled component.
 * @type {boolean|undefined}
 */
RippleCapableSurface.prototype.disabled;


// CONCATENATED MODULE: ../node_modules/preact-material-components/MaterialComponent.js
var MaterialComponent__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function MaterialComponent__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function MaterialComponent__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function MaterialComponent__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




/**
 * Base class for every Material component in this package
 * NOTE: every component should add a ref by the name of `control` to its root dom for autoInit Properties
 *
 * @export
 * @class MaterialComponent
 * @extends {Component}
 */

var MaterialComponent_MaterialComponent = function (_Component) {
  MaterialComponent__inherits(MaterialComponent, _Component);

  function MaterialComponent() {
    MaterialComponent__classCallCheck(this, MaterialComponent);

    // Attributes inside this array will be check for boolean value true
    // and will be converted to mdc classes
    var _this = MaterialComponent__possibleConstructorReturn(this, _Component.call(this));

    _this._mdcProps = [];
    // This will again be used to add apt classname to the component
    _this.componentName = "";
    // The final class name given to the dom
    _this.classText = "";
    return _this;
  }

  MaterialComponent.prototype.attachRipple = function attachRipple() {
    if (this.props.ripple && this.control) {
      ripple_MDCRipple.attachTo(this.control);
    }
  };
  // Build the className


  MaterialComponent.prototype.buildClassName = function buildClassName(props) {
    this.classText = "mdc-" + this.componentName;
    for (var propKey in this.props) {
      if (this.props.hasOwnProperty(propKey)) {
        var prop = this.props[propKey];
        if (typeof prop === "boolean" && prop) {
          if (this._mdcProps.indexOf(propKey) !== -1) {
            this.classText += " mdc-" + this.componentName + "--" + propKey;
          }
        }
      }
    }
  };

  MaterialComponent.prototype.getClassName = function getClassName(element) {
    if (!element) {
      return "";
    }
    var attrs = element.attributes = element.attributes || {};
    var classText = this.classText;
    if (attrs.class) {
      classText += " " + attrs.class;
    }
    if (attrs.className && attrs.className !== attrs.class) {
      classText += " " + attrs.className;
    }
    return classText;
  };
  // Components must implement this method for their specific DOM structure


  MaterialComponent.prototype.materialDom = function materialDom(props) {
    return Object(preact_min["h"])("div", MaterialComponent__extends({}, props), props.children);
  };

  MaterialComponent.prototype.render = function render() {
    this.buildClassName();
    // Fetch a VNode
    var componentProps = this.props;
    if (componentProps.class) {
      // We delete class prop here so that any sub node's class doesn't get over-ridden from this
      delete componentProps.class;
    }
    var element = this.materialDom(componentProps);
    element.attributes = element.attributes || {};
    // Fix for className
    element.attributes.class = this.getClassName(element);
    element.attributes.className = this.getClassName(element);
    // Clean this shit of proxy attributes
    this._mdcProps.forEach(function (prop) {
      delete element.attributes[prop];
    });
    return element;
  };

  return MaterialComponent;
}(preact_min["Component"]);


// CONCATENATED MODULE: ../node_modules/@material/base/index.js
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */





// CONCATENATED MODULE: ../node_modules/@material/toolbar/constants.js
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var constants_cssClasses = {
  FIXED: 'mdc-toolbar--fixed',
  FIXED_LASTROW: 'mdc-toolbar--fixed-lastrow-only',
  FIXED_AT_LAST_ROW: 'mdc-toolbar--fixed-at-last-row',
  TOOLBAR_ROW_FLEXIBLE: 'mdc-toolbar--flexible',
  FLEXIBLE_DEFAULT_BEHAVIOR: 'mdc-toolbar--flexible-default-behavior',
  FLEXIBLE_MAX: 'mdc-toolbar--flexible-space-maximized',
  FLEXIBLE_MIN: 'mdc-toolbar--flexible-space-minimized'
};

var constants_strings = {
  TITLE_SELECTOR: '.mdc-toolbar__title',
  FIRST_ROW_SELECTOR: '.mdc-toolbar__row:first-child',
  CHANGE_EVENT: 'MDCToolbar:change'
};

var constants_numbers = {
  MAX_TITLE_SIZE: 2.125,
  MIN_TITLE_SIZE: 1.25,
  TOOLBAR_ROW_HEIGHT: 64,
  TOOLBAR_ROW_MOBILE_HEIGHT: 56,
  TOOLBAR_MOBILE_BREAKPOINT: 600
};
// CONCATENATED MODULE: ../node_modules/@material/toolbar/foundation.js
var foundation__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var toolbar_foundation__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function toolbar_foundation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function foundation__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function foundation__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



var foundation_MDCToolbarFoundation = function (_MDCFoundation) {
  foundation__inherits(MDCToolbarFoundation, _MDCFoundation);

  toolbar_foundation__createClass(MDCToolbarFoundation, null, [{
    key: 'cssClasses',
    get: function get() {
      return constants_cssClasses;
    }
  }, {
    key: 'strings',
    get: function get() {
      return constants_strings;
    }
  }, {
    key: 'numbers',
    get: function get() {
      return constants_numbers;
    }
  }, {
    key: 'defaultAdapter',
    get: function get() {
      return {
        hasClass: function hasClass() {
          return (/* className: string */ /* boolean */false
          );
        },
        addClass: function addClass() /* className: string */{},
        removeClass: function removeClass() /* className: string */{},
        registerScrollHandler: function registerScrollHandler() /* handler: EventListener */{},
        deregisterScrollHandler: function deregisterScrollHandler() /* handler: EventListener */{},
        registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
        deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
        getViewportWidth: function getViewportWidth() {
          return (/* number */0
          );
        },
        getViewportScrollY: function getViewportScrollY() {
          return (/* number */0
          );
        },
        getOffsetHeight: function getOffsetHeight() {
          return (/* number */0
          );
        },
        getFirstRowElementOffsetHeight: function getFirstRowElementOffsetHeight() {
          return (/* number */0
          );
        },
        notifyChange: function notifyChange() /* evtData: {flexibleExpansionRatio: number} */{},
        setStyle: function setStyle() /* property: string, value: string */{},
        setStyleForTitleElement: function setStyleForTitleElement() /* property: string, value: string */{},
        setStyleForFlexibleRowElement: function setStyleForFlexibleRowElement() /* property: string, value: string */{},
        setStyleForFixedAdjustElement: function setStyleForFixedAdjustElement() /* property: string, value: string */{}
      };
    }
  }]);

  function MDCToolbarFoundation(adapter) {
    toolbar_foundation__classCallCheck(this, MDCToolbarFoundation);

    var _this = foundation__possibleConstructorReturn(this, _MDCFoundation.call(this, foundation__extends(MDCToolbarFoundation.defaultAdapter, adapter)));

    _this.resizeHandler_ = function () {
      return _this.checkRowHeight_();
    };
    _this.scrollHandler_ = function () {
      return _this.updateToolbarStyles_();
    };
    _this.checkRowHeightFrame_ = 0;
    _this.scrollFrame_ = 0;
    _this.executedLastChange_ = false;

    _this.calculations_ = {
      toolbarRowHeight: 0,
      // Calculated Height ratio. We use ratio to calculate corresponding heights in resize event.
      toolbarRatio: 0, // The ratio of toolbar height to row height
      flexibleExpansionRatio: 0, // The ratio of flexible space height to row height
      maxTranslateYRatio: 0, // The ratio of max toolbar move up distance to row height
      scrollThresholdRatio: 0, // The ratio of max scrollTop that we should listen to to row height
      // Derived Heights based on the above key ratios.
      toolbarHeight: 0,
      flexibleExpansionHeight: 0, // Flexible row minus toolbar height (derived)
      maxTranslateYDistance: 0, // When toolbar only fix last row (derived)
      scrollThreshold: 0
    };
    // Toolbar fixed behavior
    // If toolbar is fixed
    _this.fixed_ = false;
    // If fixed is targeted only at the last row
    _this.fixedLastrow_ = false;
    // Toolbar flexible behavior
    // If the first row is flexible
    _this.hasFlexibleRow_ = false;
    // If use the default behavior
    _this.useFlexDefaultBehavior_ = false;
    return _this;
  }

  MDCToolbarFoundation.prototype.init = function init() {
    this.fixed_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.FIXED);
    this.fixedLastrow_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.FIXED_LASTROW) & this.fixed_;
    this.hasFlexibleRow_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.TOOLBAR_ROW_FLEXIBLE);
    if (this.hasFlexibleRow_) {
      this.useFlexDefaultBehavior_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_DEFAULT_BEHAVIOR);
    }
    this.initKeyRatio_();
    this.setKeyHeights_();
    this.adapter_.registerResizeHandler(this.resizeHandler_);
    this.adapter_.registerScrollHandler(this.scrollHandler_);
  };

  MDCToolbarFoundation.prototype.destroy = function destroy() {
    this.adapter_.deregisterResizeHandler(this.resizeHandler_);
    this.adapter_.deregisterScrollHandler(this.scrollHandler_);
  };

  MDCToolbarFoundation.prototype.updateAdjustElementStyles = function updateAdjustElementStyles() {
    if (this.fixed_) {
      this.adapter_.setStyleForFixedAdjustElement('margin-top', this.calculations_.toolbarHeight + 'px');
    }
  };

  MDCToolbarFoundation.prototype.getFlexibleExpansionRatio_ = function getFlexibleExpansionRatio_(scrollTop) {
    // To prevent division by zero when there is no flexibleExpansionHeight
    var delta = 0.0001;
    return Math.max(0, 1 - scrollTop / (this.calculations_.flexibleExpansionHeight + delta));
  };

  MDCToolbarFoundation.prototype.checkRowHeight_ = function checkRowHeight_() {
    var _this2 = this;

    cancelAnimationFrame(this.checkRowHeightFrame_);
    this.checkRowHeightFrame_ = requestAnimationFrame(function () {
      return _this2.setKeyHeights_();
    });
  };

  MDCToolbarFoundation.prototype.setKeyHeights_ = function setKeyHeights_() {
    var newToolbarRowHeight = this.getRowHeight_();
    if (newToolbarRowHeight !== this.calculations_.toolbarRowHeight) {
      this.calculations_.toolbarRowHeight = newToolbarRowHeight;
      this.calculations_.toolbarHeight = this.calculations_.toolbarRatio * this.calculations_.toolbarRowHeight;
      this.calculations_.flexibleExpansionHeight = this.calculations_.flexibleExpansionRatio * this.calculations_.toolbarRowHeight;
      this.calculations_.maxTranslateYDistance = this.calculations_.maxTranslateYRatio * this.calculations_.toolbarRowHeight;
      this.calculations_.scrollThreshold = this.calculations_.scrollThresholdRatio * this.calculations_.toolbarRowHeight;
      this.updateAdjustElementStyles();
      this.updateToolbarStyles_();
    }
  };

  MDCToolbarFoundation.prototype.updateToolbarStyles_ = function updateToolbarStyles_() {
    var _this3 = this;

    cancelAnimationFrame(this.scrollFrame_);
    this.scrollFrame_ = requestAnimationFrame(function () {
      var scrollTop = _this3.adapter_.getViewportScrollY();
      var hasScrolledOutOfThreshold = _this3.scrolledOutOfThreshold_(scrollTop);

      if (hasScrolledOutOfThreshold && _this3.executedLastChange_) {
        return;
      }

      var flexibleExpansionRatio = _this3.getFlexibleExpansionRatio_(scrollTop);

      _this3.updateToolbarFlexibleState_(flexibleExpansionRatio);
      if (_this3.fixedLastrow_) {
        _this3.updateToolbarFixedState_(scrollTop);
      }
      if (_this3.hasFlexibleRow_) {
        _this3.updateFlexibleRowElementStyles_(flexibleExpansionRatio);
      }
      _this3.executedLastChange_ = hasScrolledOutOfThreshold;
      _this3.adapter_.notifyChange({ flexibleExpansionRatio: flexibleExpansionRatio });
    });
  };

  MDCToolbarFoundation.prototype.scrolledOutOfThreshold_ = function scrolledOutOfThreshold_(scrollTop) {
    return scrollTop > this.calculations_.scrollThreshold;
  };

  MDCToolbarFoundation.prototype.initKeyRatio_ = function initKeyRatio_() {
    var toolbarRowHeight = this.getRowHeight_();
    var firstRowMaxRatio = this.adapter_.getFirstRowElementOffsetHeight() / toolbarRowHeight;
    this.calculations_.toolbarRatio = this.adapter_.getOffsetHeight() / toolbarRowHeight;
    this.calculations_.flexibleExpansionRatio = firstRowMaxRatio - 1;
    this.calculations_.maxTranslateYRatio = this.fixedLastrow_ ? this.calculations_.toolbarRatio - firstRowMaxRatio : 0;
    this.calculations_.scrollThresholdRatio = (this.fixedLastrow_ ? this.calculations_.toolbarRatio : firstRowMaxRatio) - 1;
  };

  MDCToolbarFoundation.prototype.getRowHeight_ = function getRowHeight_() {
    var breakpoint = MDCToolbarFoundation.numbers.TOOLBAR_MOBILE_BREAKPOINT;
    return this.adapter_.getViewportWidth() < breakpoint ? MDCToolbarFoundation.numbers.TOOLBAR_ROW_MOBILE_HEIGHT : MDCToolbarFoundation.numbers.TOOLBAR_ROW_HEIGHT;
  };

  MDCToolbarFoundation.prototype.updateToolbarFlexibleState_ = function updateToolbarFlexibleState_(flexibleExpansionRatio) {
    this.adapter_.removeClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MAX);
    this.adapter_.removeClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MIN);
    if (flexibleExpansionRatio === 1) {
      this.adapter_.addClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MAX);
    } else if (flexibleExpansionRatio === 0) {
      this.adapter_.addClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MIN);
    }
  };

  MDCToolbarFoundation.prototype.updateToolbarFixedState_ = function updateToolbarFixedState_(scrollTop) {
    var translateDistance = Math.max(0, Math.min(scrollTop - this.calculations_.flexibleExpansionHeight, this.calculations_.maxTranslateYDistance));
    this.adapter_.setStyle('transform', 'translateY(' + -translateDistance + 'px)');

    if (translateDistance === this.calculations_.maxTranslateYDistance) {
      this.adapter_.addClass(MDCToolbarFoundation.cssClasses.FIXED_AT_LAST_ROW);
    } else {
      this.adapter_.removeClass(MDCToolbarFoundation.cssClasses.FIXED_AT_LAST_ROW);
    }
  };

  MDCToolbarFoundation.prototype.updateFlexibleRowElementStyles_ = function updateFlexibleRowElementStyles_(flexibleExpansionRatio) {
    if (this.fixed_) {
      var height = this.calculations_.flexibleExpansionHeight * flexibleExpansionRatio;
      this.adapter_.setStyleForFlexibleRowElement('height', height + this.calculations_.toolbarRowHeight + 'px');
    }
    if (this.useFlexDefaultBehavior_) {
      this.updateElementStylesDefaultBehavior_(flexibleExpansionRatio);
    }
  };

  MDCToolbarFoundation.prototype.updateElementStylesDefaultBehavior_ = function updateElementStylesDefaultBehavior_(flexibleExpansionRatio) {
    var maxTitleSize = MDCToolbarFoundation.numbers.MAX_TITLE_SIZE;
    var minTitleSize = MDCToolbarFoundation.numbers.MIN_TITLE_SIZE;
    var currentTitleSize = (maxTitleSize - minTitleSize) * flexibleExpansionRatio + minTitleSize;

    this.adapter_.setStyleForTitleElement('font-size', currentTitleSize + 'rem');
  };

  return MDCToolbarFoundation;
}(foundation);


// CONCATENATED MODULE: ../node_modules/@material/toolbar/util.js
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var util_supportsPassive_ = void 0;

// Determine whether the current browser supports passive event listeners, and if so, use them.
function util_applyPassive() {
  var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (util_supportsPassive_ === undefined || forceRefresh) {
    var isSupported = false;
    try {
      globalObj.document.addEventListener('test', null, { get passive() {
          isSupported = true;
        } });
    } catch (e) {}

    util_supportsPassive_ = isSupported;
  }

  return util_supportsPassive_ ? { passive: true } : false;
}
// CONCATENATED MODULE: ../node_modules/@material/toolbar/index.js
var toolbar__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function toolbar__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function toolbar__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function toolbar__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */









var toolbar_MDCToolbar = function (_MDCComponent) {
  toolbar__inherits(MDCToolbar, _MDCComponent);

  function MDCToolbar() {
    toolbar__classCallCheck(this, MDCToolbar);

    return toolbar__possibleConstructorReturn(this, _MDCComponent.apply(this, arguments));
  }

  MDCToolbar.attachTo = function attachTo(root) {
    return new MDCToolbar(root);
  };

  MDCToolbar.prototype.getDefaultFoundation = function getDefaultFoundation() {
    var _this2 = this;

    return new foundation_MDCToolbarFoundation({
      hasClass: function hasClass(className) {
        return _this2.root_.classList.contains(className);
      },
      addClass: function addClass(className) {
        return _this2.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return _this2.root_.classList.remove(className);
      },
      registerScrollHandler: function registerScrollHandler(handler) {
        return window.addEventListener('scroll', handler, util_applyPassive());
      },
      deregisterScrollHandler: function deregisterScrollHandler(handler) {
        return window.removeEventListener('scroll', handler, util_applyPassive());
      },
      registerResizeHandler: function registerResizeHandler(handler) {
        return window.addEventListener('resize', handler);
      },
      deregisterResizeHandler: function deregisterResizeHandler(handler) {
        return window.removeEventListener('resize', handler);
      },
      getViewportWidth: function getViewportWidth() {
        return window.innerWidth;
      },
      getViewportScrollY: function getViewportScrollY() {
        return window.pageYOffset;
      },
      getOffsetHeight: function getOffsetHeight() {
        return _this2.root_.offsetHeight;
      },
      getFirstRowElementOffsetHeight: function getFirstRowElementOffsetHeight() {
        return _this2.firstRowElement_.offsetHeight;
      },
      notifyChange: function notifyChange(evtData) {
        return _this2.emit(foundation_MDCToolbarFoundation.strings.CHANGE_EVENT, evtData);
      },
      setStyle: function setStyle(property, value) {
        return _this2.root_.style.setProperty(property, value);
      },
      setStyleForTitleElement: function setStyleForTitleElement(property, value) {
        return _this2.titleElement_.style.setProperty(property, value);
      },
      setStyleForFlexibleRowElement: function setStyleForFlexibleRowElement(property, value) {
        return _this2.firstRowElement_.style.setProperty(property, value);
      },
      setStyleForFixedAdjustElement: function setStyleForFixedAdjustElement(property, value) {
        if (_this2.fixedAdjustElement) {
          _this2.fixedAdjustElement.style.setProperty(property, value);
        }
      }
    });
  };

  toolbar__createClass(MDCToolbar, [{
    key: 'firstRowElement_',
    get: function get() {
      return this.root_.querySelector(foundation_MDCToolbarFoundation.strings.FIRST_ROW_SELECTOR);
    }
  }, {
    key: 'titleElement_',
    get: function get() {
      return this.root_.querySelector(foundation_MDCToolbarFoundation.strings.TITLE_SELECTOR);
    }
  }, {
    key: 'fixedAdjustElement',
    set: function set(fixedAdjustElement) {
      this.fixedAdjustElement_ = fixedAdjustElement;
      this.foundation_.updateAdjustElementStyles();
    },
    get: function get() {
      return this.fixedAdjustElement_;
    }
  }]);

  return MDCToolbar;
}(component);
// CONCATENATED MODULE: ../node_modules/preact-material-components/Toolbar/index.js
function Toolbar__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Toolbar__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Toolbar__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Toolbar__extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};




/**
 * @prop fixed = false
 * @prop fixed-lastrow-only = false
 * @prop waterfall = false
 * @prop flexible = false
 * @prop flexible-default-behavior = false
 */

var Toolbar_Toolbar = function (_MaterialComponent) {
  Toolbar__inherits(Toolbar, _MaterialComponent);

  function Toolbar() {
    Toolbar__classCallCheck(this, Toolbar);

    var _this = Toolbar__possibleConstructorReturn(this, _MaterialComponent.call(this));

    _this.componentName = "toolbar";
    _this._mdcProps = ["fixed", "fixed-lastrow-only", "waterfall", "flexible", "flexible-default-behavior"];
    _this._onChange = _this._onChange.bind(_this);
    return _this;
  }

  Toolbar.prototype._onChange = function _onChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  Toolbar.prototype.componentDidMount = function componentDidMount() {
    this.MDComponent = new toolbar_MDCToolbar(this.control);
    this.MDComponent.listen("MDCToolbar:change", this._onChange);
  };

  Toolbar.prototype.componentWillUnmount = function componentWillUnmount() {
    this.MDComponent.unlisten("MDCToolbar:change", this._onChange);
    this.MDComponent.destroy && this.MDComponent.destroy();
  };

  Toolbar.prototype.materialDom = function materialDom(props) {
    var _this2 = this;

    return Object(preact_min["h"])("header", Toolbar__extends({
      ref: function ref(control) {
        _this2.control = control;
      }
    }, props), props.children);
  };

  return Toolbar;
}(MaterialComponent_MaterialComponent);

var ToolbarRow = function (_MaterialComponent2) {
  Toolbar__inherits(ToolbarRow, _MaterialComponent2);

  function ToolbarRow() {
    Toolbar__classCallCheck(this, ToolbarRow);

    var _this3 = Toolbar__possibleConstructorReturn(this, _MaterialComponent2.call(this));

    _this3.componentName = "toolbar__row";
    return _this3;
  }

  return ToolbarRow;
}(MaterialComponent_MaterialComponent);

/**
 * @prop align-end = false
 * @prop align-start = false
 * @prop shrink-to-fit = false
 */


var Toolbar_ToolbarSection = function (_MaterialComponent3) {
  Toolbar__inherits(ToolbarSection, _MaterialComponent3);

  function ToolbarSection() {
    Toolbar__classCallCheck(this, ToolbarSection);

    var _this4 = Toolbar__possibleConstructorReturn(this, _MaterialComponent3.call(this));

    _this4.componentName = "toolbar__section";
    _this4._mdcProps = ["align-start", "align-end", "shrink-to-fit"];
    return _this4;
  }

  ToolbarSection.prototype.materialDom = function materialDom(props) {
    return Object(preact_min["h"])("section", props, props.children);
  };

  return ToolbarSection;
}(MaterialComponent_MaterialComponent);

/**
 * @prop menu = false
 */


var Toolbar_ToolbarIcon = function (_MaterialComponent4) {
  Toolbar__inherits(ToolbarIcon, _MaterialComponent4);

  function ToolbarIcon(props) {
    Toolbar__classCallCheck(this, ToolbarIcon);

    var _this5 = Toolbar__possibleConstructorReturn(this, _MaterialComponent4.call(this));

    _this5.componentName = "toolbar__icon";
    if (props.menu) {
      _this5.componentName = "toolbar__menu-icon";
    }
    return _this5;
  }

  ToolbarIcon.prototype.materialDom = function materialDom(props) {
    return Object(preact_min["h"])("a", Toolbar__extends({ className: "material-icons" }, props), props.children || "menu");
  };

  return ToolbarIcon;
}(MaterialComponent_MaterialComponent);

/**
 * @prop title = ''
 */


var Toolbar_ToolbarTitle = function (_MaterialComponent5) {
  Toolbar__inherits(ToolbarTitle, _MaterialComponent5);

  function ToolbarTitle() {
    Toolbar__classCallCheck(this, ToolbarTitle);

    var _this6 = Toolbar__possibleConstructorReturn(this, _MaterialComponent5.call(this));

    _this6.componentName = "toolbar__title";
    return _this6;
  }

  ToolbarTitle.prototype.materialDom = function materialDom(props) {
    return Object(preact_min["h"])("span", props, props.children);
  };

  return ToolbarTitle;
}(MaterialComponent_MaterialComponent);

Toolbar_Toolbar.Section = Toolbar_ToolbarSection;
Toolbar_Toolbar.Icon = Toolbar_ToolbarIcon;
Toolbar_Toolbar.Title = Toolbar_ToolbarTitle;
Toolbar_Toolbar.Row = ToolbarRow;

/* harmony default export */ var preact_material_components_Toolbar = (Toolbar_Toolbar);
// CONCATENATED MODULE: ../node_modules/@material/drawer/slidable/constants.js
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var constants_FOCUSABLE_ELEMENTS = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), ' + 'button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]';
// CONCATENATED MODULE: ../node_modules/@material/drawer/slidable/foundation.js
var slidable_foundation__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var slidable_foundation__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function slidable_foundation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function slidable_foundation__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function slidable_foundation__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



var MDCSlidableDrawerFoundation = function (_MDCFoundation) {
  slidable_foundation__inherits(MDCSlidableDrawerFoundation, _MDCFoundation);

  slidable_foundation__createClass(MDCSlidableDrawerFoundation, null, [{
    key: 'defaultAdapter',
    get: function get() {
      return {
        addClass: function addClass() /* className: string */{},
        removeClass: function removeClass() /* className: string */{},
        hasClass: function hasClass() /* className: string */{},
        hasNecessaryDom: function hasNecessaryDom() {
          return (/* boolean */false
          );
        },
        registerInteractionHandler: function registerInteractionHandler() /* evt: string, handler: EventListener */{},
        deregisterInteractionHandler: function deregisterInteractionHandler() /* evt: string, handler: EventListener */{},
        registerDrawerInteractionHandler: function registerDrawerInteractionHandler() /* evt: string, handler: EventListener */{},
        deregisterDrawerInteractionHandler: function deregisterDrawerInteractionHandler() /* evt: string, handler: EventListener */{},
        registerTransitionEndHandler: function registerTransitionEndHandler() /* handler: EventListener */{},
        deregisterTransitionEndHandler: function deregisterTransitionEndHandler() /* handler: EventListener */{},
        registerDocumentKeydownHandler: function registerDocumentKeydownHandler() /* handler: EventListener */{},
        deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler() /* handler: EventListener */{},
        setTranslateX: function setTranslateX() /* value: number | null */{},
        getFocusableElements: function getFocusableElements() /* NodeList */{},
        saveElementTabState: function saveElementTabState() /* el: Element */{},
        restoreElementTabState: function restoreElementTabState() /* el: Element */{},
        makeElementUntabbable: function makeElementUntabbable() /* el: Element */{},
        notifyOpen: function notifyOpen() {},
        notifyClose: function notifyClose() {},
        isRtl: function isRtl() {
          return (/* boolean */false
          );
        },
        getDrawerWidth: function getDrawerWidth() {
          return (/* number */0
          );
        }
      };
    }
  }]);

  function MDCSlidableDrawerFoundation(adapter, rootCssClass, animatingCssClass, openCssClass) {
    slidable_foundation__classCallCheck(this, MDCSlidableDrawerFoundation);

    var _this = slidable_foundation__possibleConstructorReturn(this, _MDCFoundation.call(this, slidable_foundation__extends(MDCSlidableDrawerFoundation.defaultAdapter, adapter)));

    _this.rootCssClass_ = rootCssClass;
    _this.animatingCssClass_ = animatingCssClass;
    _this.openCssClass_ = openCssClass;

    _this.transitionEndHandler_ = function (evt) {
      return _this.handleTransitionEnd_(evt);
    };

    _this.inert_ = false;

    _this.drawerClickHandler_ = function (evt) {
      return evt.stopPropagation();
    };
    _this.componentTouchStartHandler_ = function (evt) {
      return _this.handleTouchStart_(evt);
    };
    _this.componentTouchMoveHandler_ = function (evt) {
      return _this.handleTouchMove_(evt);
    };
    _this.componentTouchEndHandler_ = function (evt) {
      return _this.handleTouchEnd_(evt);
    };
    _this.documentKeydownHandler_ = function (evt) {
      if (evt.key && evt.key === 'Escape' || evt.keyCode === 27) {
        _this.close();
      }
    };
    return _this;
  }

  MDCSlidableDrawerFoundation.prototype.init = function init() {
    var ROOT = this.rootCssClass_;
    var OPEN = this.openCssClass_;

    if (!this.adapter_.hasClass(ROOT)) {
      throw new Error(ROOT + ' class required in root element.');
    }

    if (!this.adapter_.hasNecessaryDom()) {
      throw new Error('Required DOM nodes missing in ' + ROOT + ' component.');
    }

    if (this.adapter_.hasClass(OPEN)) {
      this.isOpen_ = true;
    } else {
      this.detabinate_();
      this.isOpen_ = false;
    }

    this.adapter_.registerDrawerInteractionHandler('click', this.drawerClickHandler_);
    this.adapter_.registerDrawerInteractionHandler('touchstart', this.componentTouchStartHandler_);
    this.adapter_.registerInteractionHandler('touchmove', this.componentTouchMoveHandler_);
    this.adapter_.registerInteractionHandler('touchend', this.componentTouchEndHandler_);
  };

  MDCSlidableDrawerFoundation.prototype.destroy = function destroy() {
    this.adapter_.deregisterDrawerInteractionHandler('click', this.drawerClickHandler_);
    this.adapter_.deregisterDrawerInteractionHandler('touchstart', this.componentTouchStartHandler_);
    this.adapter_.deregisterInteractionHandler('touchmove', this.componentTouchMoveHandler_);
    this.adapter_.deregisterInteractionHandler('touchend', this.componentTouchEndHandler_);
    // Deregister the document keydown handler just in case the component is destroyed while the menu is open.
    this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
  };

  MDCSlidableDrawerFoundation.prototype.open = function open() {
    this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
    this.adapter_.registerDocumentKeydownHandler(this.documentKeydownHandler_);
    this.adapter_.addClass(this.animatingCssClass_);
    this.adapter_.addClass(this.openCssClass_);
    this.retabinate_();
    // Debounce multiple calls
    if (!this.isOpen_) {
      this.adapter_.notifyOpen();
    }
    this.isOpen_ = true;
  };

  MDCSlidableDrawerFoundation.prototype.close = function close() {
    this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
    this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
    this.adapter_.addClass(this.animatingCssClass_);
    this.adapter_.removeClass(this.openCssClass_);
    this.detabinate_();
    // Debounce multiple calls
    if (this.isOpen_) {
      this.adapter_.notifyClose();
    }
    this.isOpen_ = false;
  };

  MDCSlidableDrawerFoundation.prototype.isOpen = function isOpen() {
    return this.isOpen_;
  };

  /**
   *  Render all children of the drawer inert when it's closed.
   */


  MDCSlidableDrawerFoundation.prototype.detabinate_ = function detabinate_() {
    if (this.inert_) {
      return;
    }

    var elements = this.adapter_.getFocusableElements();
    if (elements) {
      for (var i = 0; i < elements.length; i++) {
        this.adapter_.saveElementTabState(elements[i]);
        this.adapter_.makeElementUntabbable(elements[i]);
      }
    }

    this.inert_ = true;
  };

  /**
   *  Make all children of the drawer tabbable again when it's open.
   */


  MDCSlidableDrawerFoundation.prototype.retabinate_ = function retabinate_() {
    if (!this.inert_) {
      return;
    }

    var elements = this.adapter_.getFocusableElements();
    if (elements) {
      for (var i = 0; i < elements.length; i++) {
        this.adapter_.restoreElementTabState(elements[i]);
      }
    }

    this.inert_ = false;
  };

  MDCSlidableDrawerFoundation.prototype.handleTouchStart_ = function handleTouchStart_(evt) {
    if (!this.adapter_.hasClass(this.openCssClass_)) {
      return;
    }
    if (evt.pointerType && evt.pointerType !== 'touch') {
      return;
    }

    this.direction_ = this.adapter_.isRtl() ? -1 : 1;
    this.drawerWidth_ = this.adapter_.getDrawerWidth();
    this.startX_ = evt.touches ? evt.touches[0].pageX : evt.pageX;
    this.currentX_ = this.startX_;

    this.updateRaf_ = requestAnimationFrame(this.updateDrawer_.bind(this));
  };

  MDCSlidableDrawerFoundation.prototype.handleTouchMove_ = function handleTouchMove_(evt) {
    if (evt.pointerType && evt.pointerType !== 'touch') {
      return;
    }

    this.currentX_ = evt.touches ? evt.touches[0].pageX : evt.pageX;
  };

  MDCSlidableDrawerFoundation.prototype.handleTouchEnd_ = function handleTouchEnd_(evt) {
    if (evt.pointerType && evt.pointerType !== 'touch') {
      return;
    }

    this.prepareForTouchEnd_();

    // Did the user close the drawer by more than 50%?
    if (Math.abs(this.newPosition_ / this.drawerWidth_) >= 0.5) {
      this.close();
    } else {
      // Triggering an open here means we'll get a nice animation back to the fully open state.
      this.open();
    }
  };

  MDCSlidableDrawerFoundation.prototype.prepareForTouchEnd_ = function prepareForTouchEnd_() {
    cancelAnimationFrame(this.updateRaf_);
    this.adapter_.setTranslateX(null);
  };

  MDCSlidableDrawerFoundation.prototype.updateDrawer_ = function updateDrawer_() {
    this.updateRaf_ = requestAnimationFrame(this.updateDrawer_.bind(this));
    this.adapter_.setTranslateX(this.newPosition_);
  };

  MDCSlidableDrawerFoundation.prototype.isRootTransitioningEventTarget_ = function isRootTransitioningEventTarget_() {
    // Classes extending MDCSlidableDrawerFoundation should implement this method to return true or false
    // if the event target is the root event target currently transitioning.
    return false;
  };

  MDCSlidableDrawerFoundation.prototype.handleTransitionEnd_ = function handleTransitionEnd_(evt) {
    if (this.isRootTransitioningEventTarget_(evt.target)) {
      this.adapter_.removeClass(this.animatingCssClass_);
      this.adapter_.deregisterTransitionEndHandler(this.transitionEndHandler_);
    }
  };

  slidable_foundation__createClass(MDCSlidableDrawerFoundation, [{
    key: 'newPosition_',
    get: function get() {
      var newPos = null;

      if (this.direction_ === 1) {
        newPos = Math.min(0, this.currentX_ - this.startX_);
      } else {
        newPos = Math.max(0, this.currentX_ - this.startX_);
      }

      return newPos;
    }
  }]);

  return MDCSlidableDrawerFoundation;
}(foundation);
// CONCATENATED MODULE: ../node_modules/@material/drawer/slidable/index.js
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



// CONCATENATED MODULE: ../node_modules/@material/drawer/temporary/constants.js
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



var temporary_constants_cssClasses = {
  ROOT: 'mdc-temporary-drawer',
  OPEN: 'mdc-temporary-drawer--open',
  ANIMATING: 'mdc-temporary-drawer--animating',
  SCROLL_LOCK: 'mdc-drawer-scroll-lock'
};

var temporary_constants_strings = {
  DRAWER_SELECTOR: '.mdc-temporary-drawer__drawer',
  OPACITY_VAR_NAME: '--mdc-temporary-drawer-opacity',
  FOCUSABLE_ELEMENTS: constants_FOCUSABLE_ELEMENTS,
  OPEN_EVENT: 'MDCTemporaryDrawer:open',
  CLOSE_EVENT: 'MDCTemporaryDrawer:close'
};
// CONCATENATED MODULE: ../node_modules/@material/drawer/temporary/foundation.js
var temporary_foundation__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var temporary_foundation__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function temporary_foundation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function temporary_foundation__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function temporary_foundation__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




var foundation_MDCTemporaryDrawerFoundation = function (_MDCSlidableDrawerFou) {
  temporary_foundation__inherits(MDCTemporaryDrawerFoundation, _MDCSlidableDrawerFou);

  temporary_foundation__createClass(MDCTemporaryDrawerFoundation, null, [{
    key: 'cssClasses',
    get: function get() {
      return temporary_constants_cssClasses;
    }
  }, {
    key: 'strings',
    get: function get() {
      return temporary_constants_strings;
    }
  }, {
    key: 'defaultAdapter',
    get: function get() {
      return temporary_foundation__extends(MDCSlidableDrawerFoundation.defaultAdapter, {
        addBodyClass: function addBodyClass() /* className: string */{},
        removeBodyClass: function removeBodyClass() /* className: string */{},
        isDrawer: function isDrawer() {
          return false;
        },
        updateCssVariable: function updateCssVariable() /* value: string */{}
      });
    }
  }]);

  function MDCTemporaryDrawerFoundation(adapter) {
    temporary_foundation__classCallCheck(this, MDCTemporaryDrawerFoundation);

    var _this = temporary_foundation__possibleConstructorReturn(this, _MDCSlidableDrawerFou.call(this, temporary_foundation__extends(MDCTemporaryDrawerFoundation.defaultAdapter, adapter), MDCTemporaryDrawerFoundation.cssClasses.ROOT, MDCTemporaryDrawerFoundation.cssClasses.ANIMATING, MDCTemporaryDrawerFoundation.cssClasses.OPEN));

    _this.componentClickHandler_ = function () {
      return _this.close();
    };
    return _this;
  }

  MDCTemporaryDrawerFoundation.prototype.init = function init() {
    _MDCSlidableDrawerFou.prototype.init.call(this);

    // Make browser aware of custom property being used in this element.
    // Workaround for certain types of hard-to-reproduce heisenbugs.
    this.adapter_.updateCssVariable(0);
    this.adapter_.registerInteractionHandler('click', this.componentClickHandler_);
  };

  MDCTemporaryDrawerFoundation.prototype.destroy = function destroy() {
    _MDCSlidableDrawerFou.prototype.destroy.call(this);

    this.adapter_.deregisterInteractionHandler('click', this.componentClickHandler_);
    this.enableScroll_();
  };

  MDCTemporaryDrawerFoundation.prototype.open = function open() {
    this.disableScroll_();
    // Make sure custom property values are cleared before starting.
    this.adapter_.updateCssVariable('');

    _MDCSlidableDrawerFou.prototype.open.call(this);
  };

  MDCTemporaryDrawerFoundation.prototype.close = function close() {
    // Make sure custom property values are cleared before making any changes.
    this.adapter_.updateCssVariable('');

    _MDCSlidableDrawerFou.prototype.close.call(this);
  };

  MDCTemporaryDrawerFoundation.prototype.prepareForTouchEnd_ = function prepareForTouchEnd_() {
    _MDCSlidableDrawerFou.prototype.prepareForTouchEnd_.call(this);

    this.adapter_.updateCssVariable('');
  };

  MDCTemporaryDrawerFoundation.prototype.updateDrawer_ = function updateDrawer_() {
    _MDCSlidableDrawerFou.prototype.updateDrawer_.call(this);

    var newOpacity = Math.max(0, 1 + this.direction_ * (this.newPosition_ / this.drawerWidth_));
    this.adapter_.updateCssVariable(newOpacity);
  };

  MDCTemporaryDrawerFoundation.prototype.isRootTransitioningEventTarget_ = function isRootTransitioningEventTarget_(el) {
    return this.adapter_.isDrawer(el);
  };

  MDCTemporaryDrawerFoundation.prototype.handleTransitionEnd_ = function handleTransitionEnd_(evt) {
    _MDCSlidableDrawerFou.prototype.handleTransitionEnd_.call(this, evt);
    if (!this.isOpen_) {
      this.enableScroll_();
    }
  };

  MDCTemporaryDrawerFoundation.prototype.disableScroll_ = function disableScroll_() {
    this.adapter_.addBodyClass(temporary_constants_cssClasses.SCROLL_LOCK);
  };

  MDCTemporaryDrawerFoundation.prototype.enableScroll_ = function enableScroll_() {
    this.adapter_.removeBodyClass(temporary_constants_cssClasses.SCROLL_LOCK);
  };

  return MDCTemporaryDrawerFoundation;
}(MDCSlidableDrawerFoundation);


// CONCATENATED MODULE: ../node_modules/@material/drawer/util.js
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var TAB_DATA = 'data-mdc-tabindex';
var TAB_DATA_HANDLED = 'data-mdc-tabindex-handled';

var storedTransformPropertyName_ = void 0;
var drawer_util_supportsPassive_ = void 0;

// Remap touch events to pointer events, if the browser doesn't support touch events.
function remapEvent(eventName) {
  var globalObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;

  if (!('ontouchstart' in globalObj.document)) {
    switch (eventName) {
      case 'touchstart':
        return 'pointerdown';
      case 'touchmove':
        return 'pointermove';
      case 'touchend':
        return 'pointerup';
      default:
        return eventName;
    }
  }

  return eventName;
}

// Choose the correct transform property to use on the current browser.
function getTransformPropertyName() {
  var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (storedTransformPropertyName_ === undefined || forceRefresh) {
    var el = globalObj.document.createElement('div');
    var transformPropertyName = 'transform' in el.style ? 'transform' : '-webkit-transform';
    storedTransformPropertyName_ = transformPropertyName;
  }

  return storedTransformPropertyName_;
}

// Determine whether the current browser supports CSS properties.
function supportsCssCustomProperties() {
  var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;

  if ('CSS' in globalObj) {
    return globalObj.CSS.supports('(--color: red)');
  }
  return false;
}

// Determine whether the current browser supports passive event listeners, and if so, use them.
function drawer_util_applyPassive() {
  var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (drawer_util_supportsPassive_ === undefined || forceRefresh) {
    var isSupported = false;
    try {
      globalObj.document.addEventListener('test', null, { get passive() {
          isSupported = true;
        } });
    } catch (e) {}

    drawer_util_supportsPassive_ = isSupported;
  }

  return drawer_util_supportsPassive_ ? { passive: true } : false;
}

// Save the tab state for an element.
function util_saveElementTabState(el) {
  if (el.hasAttribute('tabindex')) {
    el.setAttribute(TAB_DATA, el.getAttribute('tabindex'));
  }
  el.setAttribute(TAB_DATA_HANDLED, true);
}

// Restore the tab state for an element, if it was saved.
function util_restoreElementTabState(el) {
  // Only modify elements we've already handled, in case anything was dynamically added since we saved state.
  if (el.hasAttribute(TAB_DATA_HANDLED)) {
    if (el.hasAttribute(TAB_DATA)) {
      el.setAttribute('tabindex', el.getAttribute(TAB_DATA));
      el.removeAttribute(TAB_DATA);
    } else {
      el.removeAttribute('tabindex');
    }
    el.removeAttribute(TAB_DATA_HANDLED);
  }
}
// CONCATENATED MODULE: ../node_modules/@material/drawer/temporary/index.js
var temporary__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function temporary__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function temporary__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function temporary__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */








var temporary_MDCTemporaryDrawer = function (_MDCComponent) {
  temporary__inherits(MDCTemporaryDrawer, _MDCComponent);

  function MDCTemporaryDrawer() {
    temporary__classCallCheck(this, MDCTemporaryDrawer);

    return temporary__possibleConstructorReturn(this, _MDCComponent.apply(this, arguments));
  }

  MDCTemporaryDrawer.attachTo = function attachTo(root) {
    return new MDCTemporaryDrawer(root);
  };

  MDCTemporaryDrawer.prototype.getDefaultFoundation = function getDefaultFoundation() {
    var _this2 = this;

    var _MDCTemporaryDrawerFo = foundation_MDCTemporaryDrawerFoundation.strings,
        FOCUSABLE_ELEMENTS = _MDCTemporaryDrawerFo.FOCUSABLE_ELEMENTS,
        OPACITY_VAR_NAME = _MDCTemporaryDrawerFo.OPACITY_VAR_NAME;


    return new foundation_MDCTemporaryDrawerFoundation({
      addClass: function addClass(className) {
        return _this2.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return _this2.root_.classList.remove(className);
      },
      hasClass: function hasClass(className) {
        return _this2.root_.classList.contains(className);
      },
      addBodyClass: function addBodyClass(className) {
        return document.body.classList.add(className);
      },
      removeBodyClass: function removeBodyClass(className) {
        return document.body.classList.remove(className);
      },
      hasNecessaryDom: function hasNecessaryDom() {
        return Boolean(_this2.drawer);
      },
      registerInteractionHandler: function registerInteractionHandler(evt, handler) {
        return _this2.root_.addEventListener(remapEvent(evt), handler, drawer_util_applyPassive());
      },
      deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
        return _this2.root_.removeEventListener(remapEvent(evt), handler, drawer_util_applyPassive());
      },
      registerDrawerInteractionHandler: function registerDrawerInteractionHandler(evt, handler) {
        return _this2.drawer.addEventListener(remapEvent(evt), handler);
      },
      deregisterDrawerInteractionHandler: function deregisterDrawerInteractionHandler(evt, handler) {
        return _this2.drawer.removeEventListener(remapEvent(evt), handler);
      },
      registerTransitionEndHandler: function registerTransitionEndHandler(handler) {
        return _this2.drawer.addEventListener('transitionend', handler);
      },
      deregisterTransitionEndHandler: function deregisterTransitionEndHandler(handler) {
        return _this2.drawer.removeEventListener('transitionend', handler);
      },
      registerDocumentKeydownHandler: function registerDocumentKeydownHandler(handler) {
        return document.addEventListener('keydown', handler);
      },
      deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler(handler) {
        return document.removeEventListener('keydown', handler);
      },
      getDrawerWidth: function getDrawerWidth() {
        return _this2.drawer.offsetWidth;
      },
      setTranslateX: function setTranslateX(value) {
        return _this2.drawer.style.setProperty(getTransformPropertyName(), value === null ? null : 'translateX(' + value + 'px)');
      },
      updateCssVariable: function updateCssVariable(value) {
        if (supportsCssCustomProperties()) {
          _this2.root_.style.setProperty(OPACITY_VAR_NAME, value);
        }
      },
      getFocusableElements: function getFocusableElements() {
        return _this2.drawer.querySelectorAll(FOCUSABLE_ELEMENTS);
      },
      saveElementTabState: function saveElementTabState(el) {
        return util_saveElementTabState(el);
      },
      restoreElementTabState: function restoreElementTabState(el) {
        return util_restoreElementTabState(el);
      },
      makeElementUntabbable: function makeElementUntabbable(el) {
        return el.setAttribute('tabindex', -1);
      },
      notifyOpen: function notifyOpen() {
        return _this2.emit(foundation_MDCTemporaryDrawerFoundation.strings.OPEN_EVENT);
      },
      notifyClose: function notifyClose() {
        return _this2.emit(foundation_MDCTemporaryDrawerFoundation.strings.CLOSE_EVENT);
      },
      isRtl: function isRtl() {
        return getComputedStyle(_this2.root_).getPropertyValue('direction') === 'rtl';
      },
      isDrawer: function isDrawer(el) {
        return el === _this2.drawer;
      }
    });
  };

  temporary__createClass(MDCTemporaryDrawer, [{
    key: 'open',
    get: function get() {
      return this.foundation_.isOpen();
    },
    set: function set(value) {
      if (value) {
        this.foundation_.open();
      } else {
        this.foundation_.close();
      }
    }

    /* Return the drawer element inside the component. */

  }, {
    key: 'drawer',
    get: function get() {
      return this.root_.querySelector(foundation_MDCTemporaryDrawerFoundation.strings.DRAWER_SELECTOR);
    }
  }]);

  return MDCTemporaryDrawer;
}(component);
// CONCATENATED MODULE: ../node_modules/@material/drawer/persistent/constants.js
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



var persistent_constants_cssClasses = {
  ROOT: 'mdc-persistent-drawer',
  OPEN: 'mdc-persistent-drawer--open',
  ANIMATING: 'mdc-persistent-drawer--animating'
};

var persistent_constants_strings = {
  DRAWER_SELECTOR: '.mdc-persistent-drawer__drawer',
  FOCUSABLE_ELEMENTS: constants_FOCUSABLE_ELEMENTS,
  OPEN_EVENT: 'MDCPersistentDrawer:open',
  CLOSE_EVENT: 'MDCPersistentDrawer:close'
};
// CONCATENATED MODULE: ../node_modules/@material/drawer/persistent/foundation.js
var persistent_foundation__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var persistent_foundation__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function persistent_foundation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function persistent_foundation__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function persistent_foundation__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




var foundation_MDCPersistentDrawerFoundation = function (_MDCSlidableDrawerFou) {
  persistent_foundation__inherits(MDCPersistentDrawerFoundation, _MDCSlidableDrawerFou);

  persistent_foundation__createClass(MDCPersistentDrawerFoundation, null, [{
    key: 'cssClasses',
    get: function get() {
      return persistent_constants_cssClasses;
    }
  }, {
    key: 'strings',
    get: function get() {
      return persistent_constants_strings;
    }
  }, {
    key: 'defaultAdapter',
    get: function get() {
      return persistent_foundation__extends(MDCSlidableDrawerFoundation.defaultAdapter, {
        isDrawer: function isDrawer() {
          return false;
        }
      });
    }
  }]);

  function MDCPersistentDrawerFoundation(adapter) {
    persistent_foundation__classCallCheck(this, MDCPersistentDrawerFoundation);

    return persistent_foundation__possibleConstructorReturn(this, _MDCSlidableDrawerFou.call(this, persistent_foundation__extends(MDCPersistentDrawerFoundation.defaultAdapter, adapter), MDCPersistentDrawerFoundation.cssClasses.ROOT, MDCPersistentDrawerFoundation.cssClasses.ANIMATING, MDCPersistentDrawerFoundation.cssClasses.OPEN));
  }

  MDCPersistentDrawerFoundation.prototype.isRootTransitioningEventTarget_ = function isRootTransitioningEventTarget_(el) {
    return this.adapter_.isDrawer(el);
  };

  return MDCPersistentDrawerFoundation;
}(MDCSlidableDrawerFoundation);


// CONCATENATED MODULE: ../node_modules/@material/drawer/persistent/index.js
var persistent__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function persistent__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function persistent__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function persistent__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */








var persistent_MDCPersistentDrawer = function (_MDCComponent) {
  persistent__inherits(MDCPersistentDrawer, _MDCComponent);

  function MDCPersistentDrawer() {
    persistent__classCallCheck(this, MDCPersistentDrawer);

    return persistent__possibleConstructorReturn(this, _MDCComponent.apply(this, arguments));
  }

  MDCPersistentDrawer.attachTo = function attachTo(root) {
    return new MDCPersistentDrawer(root);
  };

  MDCPersistentDrawer.prototype.getDefaultFoundation = function getDefaultFoundation() {
    var _this2 = this;

    var FOCUSABLE_ELEMENTS = foundation_MDCPersistentDrawerFoundation.strings.FOCUSABLE_ELEMENTS;


    return new foundation_MDCPersistentDrawerFoundation({
      addClass: function addClass(className) {
        return _this2.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return _this2.root_.classList.remove(className);
      },
      hasClass: function hasClass(className) {
        return _this2.root_.classList.contains(className);
      },
      hasNecessaryDom: function hasNecessaryDom() {
        return Boolean(_this2.drawer);
      },
      registerInteractionHandler: function registerInteractionHandler(evt, handler) {
        return _this2.root_.addEventListener(remapEvent(evt), handler, drawer_util_applyPassive());
      },
      deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
        return _this2.root_.removeEventListener(remapEvent(evt), handler, drawer_util_applyPassive());
      },
      registerDrawerInteractionHandler: function registerDrawerInteractionHandler(evt, handler) {
        return _this2.drawer.addEventListener(remapEvent(evt), handler);
      },
      deregisterDrawerInteractionHandler: function deregisterDrawerInteractionHandler(evt, handler) {
        return _this2.drawer.removeEventListener(remapEvent(evt), handler);
      },
      registerTransitionEndHandler: function registerTransitionEndHandler(handler) {
        return _this2.root_.addEventListener('transitionend', handler);
      },
      deregisterTransitionEndHandler: function deregisterTransitionEndHandler(handler) {
        return _this2.root_.removeEventListener('transitionend', handler);
      },
      registerDocumentKeydownHandler: function registerDocumentKeydownHandler(handler) {
        return document.addEventListener('keydown', handler);
      },
      deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler(handler) {
        return document.removeEventListener('keydown', handler);
      },
      getDrawerWidth: function getDrawerWidth() {
        return _this2.drawer.offsetWidth;
      },
      setTranslateX: function setTranslateX(value) {
        return _this2.drawer.style.setProperty(getTransformPropertyName(), value === null ? null : 'translateX(' + value + 'px)');
      },
      getFocusableElements: function getFocusableElements() {
        return _this2.drawer.querySelectorAll(FOCUSABLE_ELEMENTS);
      },
      saveElementTabState: function saveElementTabState(el) {
        return util_saveElementTabState(el);
      },
      restoreElementTabState: function restoreElementTabState(el) {
        return util_restoreElementTabState(el);
      },
      makeElementUntabbable: function makeElementUntabbable(el) {
        return el.setAttribute('tabindex', -1);
      },
      notifyOpen: function notifyOpen() {
        return _this2.emit(foundation_MDCPersistentDrawerFoundation.strings.OPEN_EVENT);
      },
      notifyClose: function notifyClose() {
        return _this2.emit(foundation_MDCPersistentDrawerFoundation.strings.CLOSE_EVENT);
      },
      isRtl: function isRtl() {
        return getComputedStyle(_this2.root_).getPropertyValue('direction') === 'rtl';
      },
      isDrawer: function isDrawer(el) {
        return el === _this2.drawer;
      }
    });
  };

  persistent__createClass(MDCPersistentDrawer, [{
    key: 'open',
    get: function get() {
      return this.foundation_.isOpen();
    },
    set: function set(value) {
      if (value) {
        this.foundation_.open();
      } else {
        this.foundation_.close();
      }
    }

    // Return the drawer element inside the component.

  }, {
    key: 'drawer',
    get: function get() {
      return this.root_.querySelector(foundation_MDCPersistentDrawerFoundation.strings.DRAWER_SELECTOR);
    }
  }]);

  return MDCPersistentDrawer;
}(component);
// CONCATENATED MODULE: ../node_modules/preact-material-components/List/index.js
function List__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function List__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function List__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List__extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};




/**
 * @prop dense = false
 * @prop two-line = false
 * @prop interactive = false
 */

var List_List = function (_MaterialComponent) {
  List__inherits(List, _MaterialComponent);

  function List() {
    List__classCallCheck(this, List);

    var _this = List__possibleConstructorReturn(this, _MaterialComponent.call(this));

    _this.componentName = "list";
    _this._mdcProps = ["dense", "two-line"];
    return _this;
  }

  List.prototype.materialDom = function materialDom(props) {
    var _this2 = this;

    if (props.interactive) {
      return Object(preact_min["h"])("nav", List__extends({ ref: function ref(control) {
          return _this2.control = control;
        } }, props), props.children);
    }

    return Object(preact_min["h"])("ul", List__extends({}, props, { ref: function ref(control) {
        return _this2.control = control;
      } }), props.children);
  };

  return List;
}(MaterialComponent_MaterialComponent);

var List_ListItem = function (_MaterialComponent2) {
  List__inherits(ListItem, _MaterialComponent2);

  function ListItem() {
    List__classCallCheck(this, ListItem);

    var _this3 = List__possibleConstructorReturn(this, _MaterialComponent2.call(this));

    _this3.componentName = "list-item";
    return _this3;
  }

  ListItem.prototype.materialDom = function materialDom(props) {
    var _this4 = this;

    return Object(preact_min["h"])("li", List__extends({ role: "option" }, props, { ref: function ref(control) {
        return _this4.control = control;
      } }), props.children);
  };

  return ListItem;
}(MaterialComponent_MaterialComponent);

var List_LinkItem = function (_MaterialComponent3) {
  List__inherits(LinkItem, _MaterialComponent3);

  function LinkItem() {
    List__classCallCheck(this, LinkItem);

    var _this5 = List__possibleConstructorReturn(this, _MaterialComponent3.call(this));

    _this5.componentName = "list-item";
    return _this5;
  }

  LinkItem.prototype.componentDidMount = function componentDidMount() {
    _MaterialComponent3.prototype.attachRipple.call(this);
  };

  LinkItem.prototype.materialDom = function materialDom(props) {
    var _this6 = this;

    return Object(preact_min["h"])("a", List__extends({ role: "option" }, props, { ref: function ref(control) {
        return _this6.control = control;
      } }), props.children);
  };

  return LinkItem;
}(MaterialComponent_MaterialComponent);

/**
 * @prop start-detail = true
 * @prop end-detail = false
 */


var List_ListItemIcon = function (_MaterialComponent4) {
  List__inherits(ListItemIcon, _MaterialComponent4);

  function ListItemIcon() {
    List__classCallCheck(this, ListItemIcon);

    var _this7 = List__possibleConstructorReturn(this, _MaterialComponent4.call(this));

    _this7.componentName = "mdc-list-item__icon";
    return _this7;
  }

  ListItemIcon.prototype.getProxyClassName = function getProxyClassName(props) {
    var classNames = [];

    // default behavior
    props["start-detail"] = props["start-detail"] || true;

    // setting class names mutually exclusive
    if (props["end-detail"]) {
      classNames.push("mdc-list-item__end-detail");
    } else if (props["start-detail"]) {
      classNames.push("mdc-list-item__start-detail");
    }
    return classNames.join(" ");
  };

  ListItemIcon.prototype.materialDom = function materialDom(props) {
    var _this8 = this;

    var className = "material-icons " + this.getProxyClassName(props);
    return Object(preact_min["h"])("i", List__extends({
      className: className,
      "aria-hidden": "true"
    }, props, {
      ref: function ref(control) {
        return _this8.control = control;
      }
    }), props.children);
  };

  return ListItemIcon;
}(MaterialComponent_MaterialComponent);

/**
 * @prop start-detail = true
 * @prop end-detail = false
 */


var List_ListItemAvatar = function (_ListItemIcon) {
  List__inherits(ListItemAvatar, _ListItemIcon);

  function ListItemAvatar() {
    List__classCallCheck(this, ListItemAvatar);

    var _this9 = List__possibleConstructorReturn(this, _ListItemIcon.call(this));

    _this9.componentName = "mdc-list-item__avatar";
    return _this9;
  }

  ListItemAvatar.prototype.materialDom = function materialDom(props) {
    var _this10 = this;

    return Object(preact_min["h"])("img", List__extends({}, props, {
      className: _ListItemIcon.prototype.getProxyClassName.call(this, props)
    }, props, {
      ref: function ref(control) {
        return _this10.control = control;
      },
      width: props.width || "56",
      height: props.height || "56",
      alt: props.alt || ""
    }));
  };

  return ListItemAvatar;
}(List_ListItemIcon);

var List_ListDivider = function (_MaterialComponent5) {
  List__inherits(ListDivider, _MaterialComponent5);

  function ListDivider() {
    List__classCallCheck(this, ListDivider);

    var _this11 = List__possibleConstructorReturn(this, _MaterialComponent5.call(this));

    _this11.componentName = "list-divider";
    _this11._mdcProps = ["inset"];
    return _this11;
  }

  ListDivider.prototype.materialDom = function materialDom(props) {
    var _this12 = this;

    return Object(preact_min["h"])("li", List__extends({
      role: "separator"
    }, props, {
      ref: function ref(control) {
        return _this12.control = control;
      }
    }));
  };

  return ListDivider;
}(MaterialComponent_MaterialComponent);

var List_ListTextContainer = function (_MaterialComponent6) {
  List__inherits(ListTextContainer, _MaterialComponent6);

  function ListTextContainer() {
    List__classCallCheck(this, ListTextContainer);

    var _this13 = List__possibleConstructorReturn(this, _MaterialComponent6.call(this));

    _this13.componentName = "list-item__text";
    return _this13;
  }

  ListTextContainer.prototype.materialDom = function materialDom(props) {
    var _this14 = this;

    return Object(preact_min["h"])("span", List__extends({}, props, { ref: function ref(control) {
        return _this14.control = control;
      } }), props.children);
  };

  return ListTextContainer;
}(MaterialComponent_MaterialComponent);

var ListPrimaryText = function (_ListTextContainer) {
  List__inherits(ListPrimaryText, _ListTextContainer);

  function ListPrimaryText() {
    List__classCallCheck(this, ListPrimaryText);

    var _this15 = List__possibleConstructorReturn(this, _ListTextContainer.call(this));

    _this15.componentName = "list-item__text__primary";
    return _this15;
  }

  return ListPrimaryText;
}(List_ListTextContainer);

var ListSecondaryText = function (_ListTextContainer2) {
  List__inherits(ListSecondaryText, _ListTextContainer2);

  function ListSecondaryText() {
    List__classCallCheck(this, ListSecondaryText);

    var _this16 = List__possibleConstructorReturn(this, _ListTextContainer2.call(this));

    _this16.componentName = "list-item__text__secondary";
    return _this16;
  }

  return ListSecondaryText;
}(List_ListTextContainer);

List_List.Item = List_ListItem;
List_List.LinkItem = List_LinkItem;
List_List.ItemIcon = List_ListItemIcon;
List_List.ItemAvatar = List_ListItemAvatar;
List_List.Divider = List_ListDivider;
List_List.TextContainer = List_ListTextContainer;
List_List.PrimaryText = ListPrimaryText;
List_List.SecondaryText = ListSecondaryText;

/* harmony default export */ var preact_material_components_List = (List_List);
// CONCATENATED MODULE: ../node_modules/preact-material-components/Drawer/index.js
function Drawer__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Drawer__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Drawer__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Drawer__extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};







/*
 * Default props for drawers
 */
var defaultProps = {
  open: false
};

var Drawer_TemporaryDrawer = function (_MaterialComponent) {
  Drawer__inherits(TemporaryDrawer, _MaterialComponent);

  function TemporaryDrawer() {
    Drawer__classCallCheck(this, TemporaryDrawer);

    var _this = Drawer__possibleConstructorReturn(this, _MaterialComponent.call(this));

    _this.componentName = "temporary-drawer";
    _this._open = _this._open.bind(_this);
    _this._close = _this._close.bind(_this);
    return _this;
  }

  TemporaryDrawer.prototype._open = function _open() {
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  };

  TemporaryDrawer.prototype._close = function _close() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  TemporaryDrawer.prototype.componentDidMount = function componentDidMount() {
    this.MDComponent = temporary_MDCTemporaryDrawer.attachTo(this.control);
    this.MDComponent.listen("MDCTemporaryDrawer:open", this._open);
    this.MDComponent.listen("MDCTemporaryDrawer:close", this._close);
    toggleDrawer(defaultProps, this.props, this.MDComponent);
  };

  TemporaryDrawer.prototype.componentWillUnmount = function componentWillUnmount() {
    this.MDComponent.unlisten("MDCTemporaryDrawer:close", this._close);
    this.MDComponent.unlisten("MDCTemporaryDrawer:open", this._open);
    this.MDComponent.destroy && this.MDComponent.destroy();
  };

  TemporaryDrawer.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
    toggleDrawer(this.props, nextProps, this.MDComponent);
  };

  TemporaryDrawer.prototype.materialDom = function materialDom(props) {
    var _this2 = this;

    return Object(preact_min["h"])("aside", Drawer__extends({
      className: "mdc-typography",
      ref: function ref(control) {
        _this2.control = control;
      }
    }, props), Object(preact_min["h"])("nav", { className: "mdc-temporary-drawer__drawer" }, props.children));
  };

  return TemporaryDrawer;
}(MaterialComponent_MaterialComponent);

var Drawer_TemporaryDrawerHeader = function (_MaterialComponent2) {
  Drawer__inherits(TemporaryDrawerHeader, _MaterialComponent2);

  function TemporaryDrawerHeader() {
    Drawer__classCallCheck(this, TemporaryDrawerHeader);

    var _this3 = Drawer__possibleConstructorReturn(this, _MaterialComponent2.call(this));

    _this3.componentName = "temporary-drawer__header";
    return _this3;
  }

  TemporaryDrawerHeader.prototype.materialDom = function materialDom(props) {
    var _this4 = this;

    return Object(preact_min["h"])("header", Drawer__extends({
      ref: function ref(control) {
        _this4.control = control;
      }
    }, props), Object(preact_min["h"])("div", { className: "mdc-temporary-drawer__header-content" }, props.children));
  };

  return TemporaryDrawerHeader;
}(MaterialComponent_MaterialComponent);

var Drawer_TemporaryDrawerContent = function (_MaterialComponent3) {
  Drawer__inherits(TemporaryDrawerContent, _MaterialComponent3);

  function TemporaryDrawerContent() {
    Drawer__classCallCheck(this, TemporaryDrawerContent);

    var _this5 = Drawer__possibleConstructorReturn(this, _MaterialComponent3.call(this));

    _this5.componentName = "temporary-drawer__content";
    return _this5;
  }

  TemporaryDrawerContent.prototype.materialDom = function materialDom(props) {
    var _this6 = this;

    return Object(preact_min["h"])("nav", Drawer__extends({
      className: "mdc-list",
      ref: function ref(control) {
        _this6.control = control;
      }
    }, props), props.children);
  };

  return TemporaryDrawerContent;
}(MaterialComponent_MaterialComponent);

/**
 * @prop spacer = false
 */


var Drawer_PermanentDrawer = function (_MaterialComponent4) {
  Drawer__inherits(PermanentDrawer, _MaterialComponent4);

  function PermanentDrawer() {
    Drawer__classCallCheck(this, PermanentDrawer);

    var _this7 = Drawer__possibleConstructorReturn(this, _MaterialComponent4.call(this));

    _this7.componentName = "permanent-drawer";
    return _this7;
  }

  PermanentDrawer.prototype.materialDom = function materialDom(props) {
    return Object(preact_min["h"])("nav", Drawer__extends({ className: "mdc-typography" }, props), props.spacer && Object(preact_min["h"])("div", { className: "mdc-permanent-drawer__toolbar-spacer" }), Object(preact_min["h"])("div", { className: "mdc-permanent-drawer__content" }, Object(preact_min["h"])("nav", { className: "mdc-list" }, props.children)));
  };

  return PermanentDrawer;
}(MaterialComponent_MaterialComponent);

var Drawer_PermanentDrawerHeader = function (_MaterialComponent5) {
  Drawer__inherits(PermanentDrawerHeader, _MaterialComponent5);

  function PermanentDrawerHeader() {
    Drawer__classCallCheck(this, PermanentDrawerHeader);

    var _this8 = Drawer__possibleConstructorReturn(this, _MaterialComponent5.call(this));

    _this8.componentName = "permanent-drawer__header";
    return _this8;
  }

  PermanentDrawerHeader.prototype.materialDom = function materialDom(props) {
    var _this9 = this;

    return Object(preact_min["h"])("header", Drawer__extends({
      ref: function ref(control) {
        _this9.control = control;
      }
    }, props), Object(preact_min["h"])("div", { className: "mdc-permanent-drawer__header-content" }, props.children));
  };

  return PermanentDrawerHeader;
}(MaterialComponent_MaterialComponent);

var PermanentDrawerContent = function (_TemporaryDrawerConte) {
  Drawer__inherits(PermanentDrawerContent, _TemporaryDrawerConte);

  function PermanentDrawerContent() {
    Drawer__classCallCheck(this, PermanentDrawerContent);

    var _this10 = Drawer__possibleConstructorReturn(this, _TemporaryDrawerConte.call(this));

    _this10.componentName = "permanent-drawer__content";
    return _this10;
  }

  return PermanentDrawerContent;
}(Drawer_TemporaryDrawerContent);

var Drawer_PersistentDrawer = function (_MaterialComponent6) {
  Drawer__inherits(PersistentDrawer, _MaterialComponent6);

  function PersistentDrawer() {
    Drawer__classCallCheck(this, PersistentDrawer);

    var _this11 = Drawer__possibleConstructorReturn(this, _MaterialComponent6.call(this));

    _this11.componentName = "persistent-drawer";
    _this11._open = _this11._open.bind(_this11);
    _this11._close = _this11._close.bind(_this11);
    return _this11;
  }

  PersistentDrawer.prototype._open = function _open() {
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  };

  PersistentDrawer.prototype._close = function _close() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  PersistentDrawer.prototype.componentDidMount = function componentDidMount() {
    this.MDComponent = persistent_MDCPersistentDrawer.attachTo(this.control);
    this.MDComponent.listen("MDCPersistentDrawer:open", this._open);
    this.MDComponent.listen("MDCPersistentDrawer:close", this._close);
    toggleDrawer(defaultProps, this.props, this.MDComponent);
  };

  PersistentDrawer.prototype.componentWillUnmount = function componentWillUnmount() {
    this.MDComponent.unlisten("MDCPersistentDrawer:close", this._close);
    this.MDComponent.unlisten("MDCPersistentDrawer:open", this._open);
    this.MDComponent.destroy && this.MDComponent.destroy();
  };

  PersistentDrawer.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
    toggleDrawer(this.props, nextProps, this.MDComponent);
  };

  PersistentDrawer.prototype.materialDom = function materialDom(props) {
    var _this12 = this;

    return Object(preact_min["h"])("aside", Drawer__extends({
      className: "mdc-typography",
      ref: function ref(control) {
        _this12.control = control;
      }
    }, props), Object(preact_min["h"])("nav", { className: "mdc-persistent-drawer__drawer" }));
  };

  return PersistentDrawer;
}(MaterialComponent_MaterialComponent);

var Drawer_PersistentDrawerHeader = function (_MaterialComponent7) {
  Drawer__inherits(PersistentDrawerHeader, _MaterialComponent7);

  function PersistentDrawerHeader() {
    Drawer__classCallCheck(this, PersistentDrawerHeader);

    var _this13 = Drawer__possibleConstructorReturn(this, _MaterialComponent7.call(this));

    _this13.componentName = "persistent-drawer__header";
    return _this13;
  }

  PersistentDrawerHeader.prototype.materialDom = function materialDom(props) {
    var _this14 = this;

    return Object(preact_min["h"])("header", Drawer__extends({
      ref: function ref(control) {
        _this14.control = control;
      }
    }, props), Object(preact_min["h"])("div", { className: "mdc-persistent-drawer__header-content" }, props.children));
  };

  return PersistentDrawerHeader;
}(MaterialComponent_MaterialComponent);

var PersistentDrawerContent = function (_TemporaryDrawerConte2) {
  Drawer__inherits(PersistentDrawerContent, _TemporaryDrawerConte2);

  function PersistentDrawerContent() {
    Drawer__classCallCheck(this, PersistentDrawerContent);

    var _this15 = Drawer__possibleConstructorReturn(this, _TemporaryDrawerConte2.call(this));

    _this15.componentName = "persistent-drawer__content";
    return _this15;
  }

  return PersistentDrawerContent;
}(Drawer_TemporaryDrawerContent);

/**
 * @prop selected = false
 */


var DrawerItem = function (_List$LinkItem) {
  Drawer__inherits(DrawerItem, _List$LinkItem);

  function DrawerItem() {
    Drawer__classCallCheck(this, DrawerItem);

    return Drawer__possibleConstructorReturn(this, _List$LinkItem.call(this));
  }

  DrawerItem.prototype.materialDom = function materialDom(props) {
    var returnedNode = _List$LinkItem.prototype.materialDom.call(this, props);
    /* Logic to add selected class */
    if (props.selected) {
      returnedNode.attributes["className"] = "mdc-temporary-drawer--selected mdc-permanent-drawer--selected";
    }
    return returnedNode;
  };

  return DrawerItem;
}(preact_material_components_List.LinkItem);

/*
 * Function to add declarative opening/closing to drawer
 */


function toggleDrawer(oldprops, newprops, drawer) {
  if ("open" in oldprops && "open" in newprops && oldprops.open !== newprops.open) {
    drawer.open = newprops.open;
  }
}

var Drawer = {};

Drawer.DrawerItem = DrawerItem;
Drawer.TemporaryDrawer = Drawer_TemporaryDrawer;
Drawer.TemporaryDrawerHeader = Drawer_TemporaryDrawerHeader;
Drawer.TemporaryDrawerContent = Drawer_TemporaryDrawerContent;
Drawer.PermanentDrawer = Drawer_PermanentDrawer;
Drawer.PermanentDrawerHeader = Drawer_PermanentDrawerHeader;
Drawer.PermanentDrawerContent = PermanentDrawerContent;
Drawer.PersistentDrawer = Drawer_PersistentDrawer;
Drawer.PersistentDrawerHeader = Drawer_PersistentDrawerHeader;
Drawer.PersistentDrawerContent = PersistentDrawerContent;

/* harmony default export */ var preact_material_components_Drawer = (Drawer);
// EXTERNAL MODULE: ../node_modules/preact-material-components/Drawer/style.css
var Drawer_style = __webpack_require__("RYBc");
var Drawer_style_default = /*#__PURE__*/__webpack_require__.n(Drawer_style);

// EXTERNAL MODULE: ../node_modules/preact-material-components/List/style.css
var List_style = __webpack_require__("u+vq");
var List_style_default = /*#__PURE__*/__webpack_require__.n(List_style);

// EXTERNAL MODULE: ../node_modules/preact-material-components/Toolbar/style.css
var Toolbar_style = __webpack_require__("LbTS");
var Toolbar_style_default = /*#__PURE__*/__webpack_require__.n(Toolbar_style);

// CONCATENATED MODULE: ./components/header/index.js


function header__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function header__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function header__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






// import Dialog from 'preact-material-components/Dialog';
// import Switch from 'preact-material-components/Switch';
// import 'preact-material-components/Switch/style.css';
// import 'preact-material-components/Dialog/style.css';



// import style from './style';

var header__ref = Object(preact_min["h"])(
	preact_material_components_Toolbar.Title,
	null,
	'Bici.work'
);

var header__ref2 = Object(preact_min["h"])(
	preact_material_components_List.ItemIcon,
	null,
	'home'
);

var _ref3 = Object(preact_min["h"])(
	preact_material_components_List.ItemIcon,
	null,
	'account_circle'
);

var header_Header = function (_Component) {
	header__inherits(Header, _Component);

	function Header() {
		header__classCallCheck(this, Header);

		return header__possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Header.prototype.closeDrawer = function closeDrawer() {
		this.drawer.MDComponent.open = false;
		this.state = {
			darkThemeEnabled: false
		};
	};

	Header.prototype.render = function render() {
		var _this2 = this;

		return Object(preact_min["h"])(
			'div',
			null,
			Object(preact_min["h"])(
				preact_material_components_Toolbar,
				{ className: 'toolbar' },
				Object(preact_min["h"])(
					preact_material_components_Toolbar.Row,
					null,
					Object(preact_min["h"])(
						preact_material_components_Toolbar.Section,
						{ 'align-start': true },
						Object(preact_min["h"])(
							preact_material_components_Toolbar.Icon,
							{ menu: true, onClick: function onClick() {
									_this2.drawer.MDComponent.open = true;
								} },
							'menu'
						),
						header__ref
					)
				)
			),
			Object(preact_min["h"])(
				preact_material_components_Drawer.TemporaryDrawer,
				{ ref: function ref(drawer) {
						_this2.drawer = drawer;
					} },
				Object(preact_min["h"])(
					preact_material_components_Drawer.TemporaryDrawerContent,
					null,
					Object(preact_min["h"])(
						preact_material_components_List,
						null,
						Object(preact_min["h"])(
							preact_material_components_List.LinkItem,
							{ onClick: function onClick() {
									route('/');_this2.closeDrawer();
								} },
							header__ref2,
							'Home'
						),
						Object(preact_min["h"])(
							preact_material_components_List.LinkItem,
							{ onClick: function onClick() {
									route('/profile');_this2.closeDrawer();
								} },
							_ref3,
							'Profile'
						)
					)
				)
			)
		);
	};

	return Header;
}(preact_min["Component"]);


// EXTERNAL MODULE: ../node_modules/preact-material-components/Card/style.css
var Card_style = __webpack_require__("UlEV");
var Card_style_default = /*#__PURE__*/__webpack_require__.n(Card_style);

// EXTERNAL MODULE: ../node_modules/preact-material-components/Button/style.css
var Button_style = __webpack_require__("aqQ4");
var Button_style_default = /*#__PURE__*/__webpack_require__.n(Button_style);

// EXTERNAL MODULE: ./routes/home/style.css
var home_style = __webpack_require__("ZAL5");
var home_style_default = /*#__PURE__*/__webpack_require__.n(home_style);

// EXTERNAL MODULE: ./components/list-container/style.css
var list_container_style = __webpack_require__("5rBR");
var list_container_style_default = /*#__PURE__*/__webpack_require__.n(list_container_style);

// EXTERNAL MODULE: ../node_modules/geolib/dist/geolib.js
var geolib = __webpack_require__("Cxo9");
var geolib_default = /*#__PURE__*/__webpack_require__.n(geolib);

// CONCATENATED MODULE: ./components/list-container/index.js


function list_container__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function list_container__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function list_container__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var list_container_ListContainer = function (_Component) {
  list_container__inherits(ListContainer, _Component);

  function ListContainer() {
    var _temp, _this, _ret;

    list_container__classCallCheck(this, ListContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = list_container__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      listStations: []
    }, _temp), list_container__possibleConstructorReturn(_this, _ret);
  }

  ListContainer.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    // let url = "https://wservice.viabicing.cat/v2/stations"
    var url = "/assets/mock-bici.json";
    fetch(url).then(function (response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(Error("error"));
    }).catch(function (error) {
      return Promise.reject(Error(error.message));
    }).then(function (res) {
      var stations = res.stations;

      _this2.setState({ listStations: stations });
    });
  };

  ListContainer.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.position !== this.props.position) {
      if (typeof this.props.position.latitude !== "undefined") {
        this.distanceToStation();
      }
    }
  };

  ListContainer.prototype.distanceToStation = function distanceToStation() {
    var _this3 = this;

    var newListStations = this.state.listStations.map(function (el) {
      var positionUser = {
        latitude: _this3.props.position.latitude,
        longitude: _this3.props.position.longitude
      };
      var distance = geolib_default.a.getDistance(positionUser, {
        latitude: el.latitude,
        longitude: el.longitude
      });
      el.distance = distance;
      return el;
    });
    this.setState({
      listStations: newListStations.sort(function (prev, next) {
        return prev.distance - next.distance;
      })
    });
    console.log(this.state);
  };

  ListContainer.prototype.render = function render() {
    return Object(preact_min["h"])(
      preact_material_components_List,
      { "two-line": "true" },
      this.state.listStations.map(function (el) {
        return Object(preact_min["h"])(
          preact_material_components_List.Item,
          null,
          Object(preact_min["h"])(
            preact_material_components_List.TextContainer,
            null,
            Object(preact_min["h"])(
              preact_material_components_List.PrimaryText,
              null,
              el.streetName,
              ", ",
              el.streetNumber
            ),
            Object(preact_min["h"])(
              preact_material_components_List.SecondaryText,
              null,
              el.bikes,
              " \uD83D\uDEB2 - ",
              el.slots,
              " \uD83C\uDD7F\uFE0F - Distance: ",
              el.distance,
              " "
            )
          )
        );
      })
    );
  };

  return ListContainer;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./routes/home/index.js


function home__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function home__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function home__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var home_Home = function (_Component) {
  home__inherits(Home, _Component);

  function Home() {
    var _temp, _this, _ret;

    home__classCallCheck(this, Home);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = home__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      position: {}
    }, _temp), home__possibleConstructorReturn(_this, _ret);
  }

  Home.prototype.getPosition = function getPosition(options) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.watchPosition(resolve, reject, options);
    });
  };

  Home.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    this.getPosition(options).then(function (position) {
      _this2.setState({
        position: position.coords
      });
    }).catch(function (err) {
      console.error(err.message);
    });
  };

  Home.prototype.render = function render() {
    return Object(preact_min["h"])(
      "div",
      { "class": home_style_default.a.home },
      Object(preact_min["h"])(list_container_ListContainer, { position: this.state.position })
    );
  };

  return Home;
}(preact_min["Component"]);


// CONCATENATED MODULE: ../node_modules/preact-material-components/Icon/index.js
function Icon__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Icon__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Icon__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Icon__extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};




/**
 * @prop disabled = false
 */

var Icon_Icon = function (_MaterialComponent) {
  Icon__inherits(Icon, _MaterialComponent);

  function Icon() {
    Icon__classCallCheck(this, Icon);

    var _this = Icon__possibleConstructorReturn(this, _MaterialComponent.call(this));

    _this.componentName = "icon";
    return _this;
  }

  Icon.prototype.materialDom = function materialDom(props) {
    return Object(preact_min["h"])("i", Icon__extends({}, props, { className: "material-icons" }), props.children);
  };

  return Icon;
}(MaterialComponent_MaterialComponent);


// CONCATENATED MODULE: ../node_modules/preact-material-components/Button/index.js
function Button__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Button__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Button__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button__extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};





/**
 *  @prop dense = false
 *  @prop raised = false
 *  @prop compact = false
 *  @prop disabled = false
 *  @prop unelevated = false
 *  @prop stroked = false
 */

var Button_Button = function (_MaterialComponent) {
  Button__inherits(Button, _MaterialComponent);

  function Button() {
    Button__classCallCheck(this, Button);

    var _this = Button__possibleConstructorReturn(this, _MaterialComponent.call(this));

    _this.componentName = "button";
    _this._mdcProps = ["dense", "raised", "compact", "unelevated", "stroked"];
    return _this;
  }

  Button.prototype.componentDidMount = function componentDidMount() {
    _MaterialComponent.prototype.attachRipple.call(this);
  };

  Button.prototype.materialDom = function materialDom(props) {
    var _this2 = this;

    var ButtonElement = props.href ? "a" : "button";

    return Object(preact_min["h"])(ButtonElement, Button__extends({
      ref: function ref(control) {
        _this2.control = control;
      }
    }, props), this.props.children);
  };

  return Button;
}(MaterialComponent_MaterialComponent);

var ButtonIcon = function (_Icon) {
  Button__inherits(ButtonIcon, _Icon);

  function ButtonIcon() {
    Button__classCallCheck(this, ButtonIcon);

    var _this3 = Button__possibleConstructorReturn(this, _Icon.call(this));

    _this3.componentName = "button__icon";
    return _this3;
  }

  return ButtonIcon;
}(Icon_Icon);

Button_Button.Icon = ButtonIcon;
/* harmony default export */ var preact_material_components_Button = (Button_Button);
// EXTERNAL MODULE: ./routes/profile/style.css
var profile_style = __webpack_require__("Tv6c");
var profile_style_default = /*#__PURE__*/__webpack_require__.n(profile_style);

// CONCATENATED MODULE: ./routes/profile/index.js


function profile__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function profile__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function profile__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var profile_Profile = function (_Component) {
	profile__inherits(Profile, _Component);

	function Profile() {
		var _temp, _this, _ret;

		profile__classCallCheck(this, Profile);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = profile__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
			time: Date.now(),
			count: 10
		}, _this.updateTime = function () {
			_this.setState({ time: Date.now() });
		}, _this.increment = function () {
			_this.setState({ count: _this.state.count + 1 });
		}, _temp), profile__possibleConstructorReturn(_this, _ret);
	}

	// gets called when this route is navigated to
	Profile.prototype.componentDidMount = function componentDidMount() {
		// start a timer for the clock:
		this.timer = setInterval(this.updateTime, 1000);
	};

	// gets called just before navigating away from the route


	Profile.prototype.componentWillUnmount = function componentWillUnmount() {
		clearInterval(this.timer);
	};

	// update the current time


	// Note: `user` comes from the URL, courtesy of our router
	Profile.prototype.render = function render(_ref, _ref2) {
		var user = _ref.user;
		var time = _ref2.time,
		    count = _ref2.count;

		return Object(preact_min["h"])(
			'div',
			{ 'class': profile_style_default.a.profile },
			Object(preact_min["h"])(
				'h1',
				null,
				'Profile: ',
				user
			),
			Object(preact_min["h"])(
				'p',
				null,
				'This is the user profile for a user named ',
				user,
				'.'
			),
			Object(preact_min["h"])(
				'div',
				null,
				'Current time: ',
				new Date(time).toLocaleString()
			),
			Object(preact_min["h"])(
				'p',
				null,
				Object(preact_min["h"])(
					preact_material_components_Button,
					{ raised: true, primary: true, ripple: true, onClick: this.increment },
					'Click Me'
				),
				' ',
				'Clicked ',
				count,
				' times.'
			)
		);
	};

	return Profile;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./components/app.js


function app__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function app__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function app__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';

var app__ref = Object(preact_min["h"])(header_Header, null);

var app__ref2 = Object(preact_min["h"])(home_Home, { path: '/' });

var app__ref3 = Object(preact_min["h"])(profile_Profile, { path: '/profile/', user: 'me' });

var app_App = function (_Component) {
	app__inherits(App, _Component);

	function App() {
		var _temp, _this, _ret;

		app__classCallCheck(this, App);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = app__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleRoute = function (e) {
			_this.currentUrl = e.url;
		}, _temp), app__possibleConstructorReturn(_this, _ret);
	}
	/** Gets fired when the route changes.
  *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
  *	@param {string} event.url	The newly routed URL
  */


	App.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			{ id: 'app' },
			app__ref,
			Object(preact_min["h"])(
				preact_router_es_Router,
				{ onChange: this.handleRoute },
				app__ref2,
				app__ref3
			)
		);
	};

	return App;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./index.js



/* harmony default export */ var index = __webpack_exports__["default"] = (app_App);

/***/ }),

/***/ "KM04":
/***/ (function(module, exports, __webpack_require__) {

!function () {
  "use strict";
  function e() {}function t(t, n) {
    var o,
        r,
        i,
        l,
        a = E;for (l = arguments.length; l-- > 2;) {
      W.push(arguments[l]);
    }n && null != n.children && (W.length || W.push(n.children), delete n.children);while (W.length) {
      if ((r = W.pop()) && void 0 !== r.pop) for (l = r.length; l--;) {
        W.push(r[l]);
      } else "boolean" == typeof r && (r = null), (i = "function" != typeof t) && (null == r ? r = "" : "number" == typeof r ? r += "" : "string" != typeof r && (i = !1)), i && o ? a[a.length - 1] += r : a === E ? a = [r] : a.push(r), o = i;
    }var u = new e();return u.nodeName = t, u.children = a, u.attributes = null == n ? void 0 : n, u.key = null == n ? void 0 : n.key, void 0 !== S.vnode && S.vnode(u), u;
  }function n(e, t) {
    for (var n in t) {
      e[n] = t[n];
    }return e;
  }function o(e, o) {
    return t(e.nodeName, n(n({}, e.attributes), o), arguments.length > 2 ? [].slice.call(arguments, 2) : e.children);
  }function r(e) {
    !e.__d && (e.__d = !0) && 1 == A.push(e) && (S.debounceRendering || P)(i);
  }function i() {
    var e,
        t = A;A = [];while (e = t.pop()) {
      e.__d && k(e);
    }
  }function l(e, t, n) {
    return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && a(e, t.nodeName) : n || e._componentConstructor === t.nodeName;
  }function a(e, t) {
    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
  }function u(e) {
    var t = n({}, e.attributes);t.children = e.children;var o = e.nodeName.defaultProps;if (void 0 !== o) for (var r in o) {
      void 0 === t[r] && (t[r] = o[r]);
    }return t;
  }function _(e, t) {
    var n = t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);return n.__n = e, n;
  }function p(e) {
    var t = e.parentNode;t && t.removeChild(e);
  }function c(e, t, n, o, r) {
    if ("className" === t && (t = "class"), "key" === t) ;else if ("ref" === t) n && n(null), o && o(e);else if ("class" !== t || r) {
      if ("style" === t) {
        if (o && "string" != typeof o && "string" != typeof n || (e.style.cssText = o || ""), o && "object" == typeof o) {
          if ("string" != typeof n) for (var i in n) {
            i in o || (e.style[i] = "");
          }for (var i in o) {
            e.style[i] = "number" == typeof o[i] && !1 === V.test(i) ? o[i] + "px" : o[i];
          }
        }
      } else if ("dangerouslySetInnerHTML" === t) o && (e.innerHTML = o.__html || "");else if ("o" == t[0] && "n" == t[1]) {
        var l = t !== (t = t.replace(/Capture$/, ""));t = t.toLowerCase().substring(2), o ? n || e.addEventListener(t, f, l) : e.removeEventListener(t, f, l), (e.__l || (e.__l = {}))[t] = o;
      } else if ("list" !== t && "type" !== t && !r && t in e) s(e, t, null == o ? "" : o), null != o && !1 !== o || e.removeAttribute(t);else {
        var a = r && t !== (t = t.replace(/^xlink\:?/, ""));null == o || !1 === o ? a ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof o && (a ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), o) : e.setAttribute(t, o));
      }
    } else e.className = o || "";
  }function s(e, t, n) {
    try {
      e[t] = n;
    } catch (e) {}
  }function f(e) {
    return this.__l[e.type](S.event && S.event(e) || e);
  }function d() {
    var e;while (e = D.pop()) {
      S.afterMount && S.afterMount(e), e.componentDidMount && e.componentDidMount();
    }
  }function h(e, t, n, o, r, i) {
    H++ || (R = null != r && void 0 !== r.ownerSVGElement, j = null != e && !("__preactattr_" in e));var l = m(e, t, n, o, i);return r && l.parentNode !== r && r.appendChild(l), --H || (j = !1, i || d()), l;
  }function m(e, t, n, o, r) {
    var i = e,
        l = R;if (null != t && "boolean" != typeof t || (t = ""), "string" == typeof t || "number" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || r) ? e.nodeValue != t && (e.nodeValue = t) : (i = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(i, e), b(e, !0))), i.__preactattr_ = !0, i;var u = t.nodeName;if ("function" == typeof u) return U(e, t, n, o);if (R = "svg" === u || "foreignObject" !== u && R, u += "", (!e || !a(e, u)) && (i = _(u, R), e)) {
      while (e.firstChild) {
        i.appendChild(e.firstChild);
      }e.parentNode && e.parentNode.replaceChild(i, e), b(e, !0);
    }var p = i.firstChild,
        c = i.__preactattr_,
        s = t.children;if (null == c) {
      c = i.__preactattr_ = {};for (var f = i.attributes, d = f.length; d--;) {
        c[f[d].name] = f[d].value;
      }
    }return !j && s && 1 === s.length && "string" == typeof s[0] && null != p && void 0 !== p.splitText && null == p.nextSibling ? p.nodeValue != s[0] && (p.nodeValue = s[0]) : (s && s.length || null != p) && v(i, s, n, o, j || null != c.dangerouslySetInnerHTML), g(i, t.attributes, c), R = l, i;
  }function v(e, t, n, o, r) {
    var i,
        a,
        u,
        _,
        c,
        s = e.childNodes,
        f = [],
        d = {},
        h = 0,
        v = 0,
        y = s.length,
        g = 0,
        w = t ? t.length : 0;if (0 !== y) for (var C = 0; C < y; C++) {
      var x = s[C],
          N = x.__preactattr_,
          k = w && N ? x._component ? x._component.__k : N.key : null;null != k ? (h++, d[k] = x) : (N || (void 0 !== x.splitText ? !r || x.nodeValue.trim() : r)) && (f[g++] = x);
    }if (0 !== w) for (var C = 0; C < w; C++) {
      _ = t[C], c = null;var k = _.key;if (null != k) h && void 0 !== d[k] && (c = d[k], d[k] = void 0, h--);else if (!c && v < g) for (i = v; i < g; i++) {
        if (void 0 !== f[i] && l(a = f[i], _, r)) {
          c = a, f[i] = void 0, i === g - 1 && g--, i === v && v++;break;
        }
      }c = m(c, _, n, o), u = s[C], c && c !== e && c !== u && (null == u ? e.appendChild(c) : c === u.nextSibling ? p(u) : e.insertBefore(c, u));
    }if (h) for (var C in d) {
      void 0 !== d[C] && b(d[C], !1);
    }while (v <= g) {
      void 0 !== (c = f[g--]) && b(c, !1);
    }
  }function b(e, t) {
    var n = e._component;n ? L(n) : (null != e.__preactattr_ && e.__preactattr_.ref && e.__preactattr_.ref(null), !1 !== t && null != e.__preactattr_ || p(e), y(e));
  }function y(e) {
    e = e.lastChild;while (e) {
      var t = e.previousSibling;b(e, !0), e = t;
    }
  }function g(e, t, n) {
    var o;for (o in n) {
      t && null != t[o] || null == n[o] || c(e, o, n[o], n[o] = void 0, R);
    }for (o in t) {
      "children" === o || "innerHTML" === o || o in n && t[o] === ("value" === o || "checked" === o ? e[o] : n[o]) || c(e, o, n[o], n[o] = t[o], R);
    }
  }function w(e) {
    var t = e.constructor.name;(I[t] || (I[t] = [])).push(e);
  }function C(e, t, n) {
    var o,
        r = I[e.name];if (e.prototype && e.prototype.render ? (o = new e(t, n), T.call(o, t, n)) : (o = new T(t, n), o.constructor = e, o.render = x), r) for (var i = r.length; i--;) {
      if (r[i].constructor === e) {
        o.__b = r[i].__b, r.splice(i, 1);break;
      }
    }return o;
  }function x(e, t, n) {
    return this.constructor(e, n);
  }function N(e, t, n, o, i) {
    e.__x || (e.__x = !0, (e.__r = t.ref) && delete t.ref, (e.__k = t.key) && delete t.key, !e.base || i ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, o), o && o !== e.context && (e.__c || (e.__c = e.context), e.context = o), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== n && (1 !== n && !1 === S.syncComponentUpdates && e.base ? r(e) : k(e, 1, i)), e.__r && e.__r(e));
  }function k(e, t, o, r) {
    if (!e.__x) {
      var i,
          l,
          a,
          _ = e.props,
          p = e.state,
          c = e.context,
          s = e.__p || _,
          f = e.__s || p,
          m = e.__c || c,
          v = e.base,
          y = e.__b,
          g = v || y,
          w = e._component,
          x = !1;if (v && (e.props = s, e.state = f, e.context = m, 2 !== t && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(_, p, c) ? x = !0 : e.componentWillUpdate && e.componentWillUpdate(_, p, c), e.props = _, e.state = p, e.context = c), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !x) {
        i = e.render(_, p, c), e.getChildContext && (c = n(n({}, c), e.getChildContext()));var U,
            T,
            M = i && i.nodeName;if ("function" == typeof M) {
          var W = u(i);l = w, l && l.constructor === M && W.key == l.__k ? N(l, W, 1, c, !1) : (U = l, e._component = l = C(M, W, c), l.__b = l.__b || y, l.__u = e, N(l, W, 0, c, !1), k(l, 1, o, !0)), T = l.base;
        } else a = g, U = w, U && (a = e._component = null), (g || 1 === t) && (a && (a._component = null), T = h(a, i, c, o || !v, g && g.parentNode, !0));if (g && T !== g && l !== w) {
          var E = g.parentNode;E && T !== E && (E.replaceChild(T, g), U || (g._component = null, b(g, !1)));
        }if (U && L(U), e.base = T, T && !r) {
          var P = e,
              V = e;while (V = V.__u) {
            (P = V).base = T;
          }T._component = P, T._componentConstructor = P.constructor;
        }
      }if (!v || o ? D.unshift(e) : x || (e.componentDidUpdate && e.componentDidUpdate(s, f, m), S.afterUpdate && S.afterUpdate(e)), null != e.__h) while (e.__h.length) {
        e.__h.pop().call(e);
      }H || r || d();
    }
  }function U(e, t, n, o) {
    var r = e && e._component,
        i = r,
        l = e,
        a = r && e._componentConstructor === t.nodeName,
        _ = a,
        p = u(t);while (r && !_ && (r = r.__u)) {
      _ = r.constructor === t.nodeName;
    }return r && _ && (!o || r._component) ? (N(r, p, 3, n, o), e = r.base) : (i && !a && (L(i), e = l = null), r = C(t.nodeName, p, n), e && !r.__b && (r.__b = e, l = null), N(r, p, 1, n, o), e = r.base, l && e !== l && (l._component = null, b(l, !1))), e;
  }function L(e) {
    S.beforeUnmount && S.beforeUnmount(e);var t = e.base;e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;var n = e._component;n ? L(n) : t && (t.__preactattr_ && t.__preactattr_.ref && t.__preactattr_.ref(null), e.__b = t, p(t), w(e), y(t)), e.__r && e.__r(null);
  }function T(e, t) {
    this.__d = !0, this.context = t, this.props = e, this.state = this.state || {};
  }function M(e, t, n) {
    return h(n, e, {}, !1, t, !1);
  }var S = {},
      W = [],
      E = [],
      P = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
      V = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
      A = [],
      D = [],
      H = 0,
      R = !1,
      j = !1,
      I = {};n(T.prototype, { setState: function setState(e, t) {
      var o = this.state;this.__s || (this.__s = n({}, o)), n(o, "function" == typeof e ? e(o, this.props) : e), t && (this.__h = this.__h || []).push(t), r(this);
    }, forceUpdate: function forceUpdate(e) {
      e && (this.__h = this.__h || []).push(e), k(this, 2);
    }, render: function render() {} });var $ = { h: t, createElement: t, cloneElement: o, Component: T, render: M, rerender: i, options: S }; true ? module.exports = $ : self.preact = $;
}();
//# sourceMappingURL=preact.min.js.map

/***/ }),

/***/ "LbTS":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "RYBc":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "Tv6c":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"profile":"profile__t2Dqz"};

/***/ }),

/***/ "UlEV":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "ZAL5":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"home":"home__MseGd"};

/***/ }),

/***/ "aqQ4":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "rq4c":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "u+vq":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map