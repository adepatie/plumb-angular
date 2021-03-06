/**
 *  Plumb AngularJS Library
 *
 *  Service (factory) for plumb operations utilizing the JSAPI
 *
 *  Plumb is a product of typefoo. Copyright 2013 uh-sem-blee, Co.
 *  You may distribute and reproduce this file, but may not claim ownership or manipulate
 *  for your own use.
 *
 */

(function(w, d) {
  'use strict';

  if(!w.PLUMB_CONFIG) {
    console.log('no plumb config');
    w.PLUMB_CONFIG = {
      ANGULAR: 'angular',
      MENU: {

      },
      STRIPEJS: true
    };
  } else {
    if(!w.PLUMB_CONFIG.ANGULAR) {
      w.PLUMB_CONFIG.ANGULAR = 'angular';
    }
  }

  if(typeof w.PLUMB_CONFIG.STRIPEJS === 'undefined') {
    w.PLUMB_CONFIG.STRIPEJS = true;
  }

  if(w.PLUMB_CONFIG.STRIPEJS) {
    var stripe_scrip = d.createElement('script');
    stripe_scrip.type = 'text/javascript';
    stripe_scrip.async = true;
    stripe_scrip.src = 'https://js.stripe.com/v2/';
    d.getElementsByTagName('body')[0].appendChild(stripe_scrip);
    if (stripe_scrip.readyState) {
      stripe_scrip.onreadystatechange = function () {
        if (stripe_scrip.readyState == "loaded" || stripe_scrip.readyState == "complete") {
          stripe_scrip.onreadystatechange = null;
        }
      }
    } else {
      stripe_scrip.onload = function () {
      }
    }
  }

  if (!w[w.PLUMB_CONFIG.ANGULAR] && (typeof w.PLUMB_CONFIG.REQUIRE_ANGULAR === 'undefined' || w.PLUMB_CONFIG.REQUIRE_ANGULAR === true)) {
    var scrip = d.createElement('script');
    scrip.type = 'text/javascript';
    scrip.async = true;
    scrip.src = '//ajax.googleapis.com/ajax/libs/angularjs/1.3.13/angular.min.js';
    d.getElementsByTagName('body')[0].appendChild(scrip);
    if (scrip.readyState) {
      scrip.onreadystatechange = function () {
        if (scrip.readyState == "loaded" || scrip.readyState == "complete") {
          scrip.onreadystatechange = null;
          setupPlumb();
        }
      }
    } else {
      scrip.onload = function () {
        setupPlumb();
      }
    }
  } else {
    setupPlumb();
  }

  function setupPlumb() {
    w[PLUMB_CONFIG.ANGULAR].module('PlumbApp', ['ngMaterial']);
    //$templateCache
    w[PLUMB_CONFIG.ANGULAR].module('PlumbApp')
      .provider('plumbConfig', function() {
        this.cache = w.PLUMB_CONFIG.CACHE ? w.PLUMB_CONFIG.CACHE : false;
        this.local = w.PLUMB_CONFIG.LOCAL ? w.PLUMB_CONFIG.LOCAL : false;
        this.accessToken = w.PLUMB_CONFIG.ACCESS_TOKEN ? w.PLUMB_CONFIG.ACCESS_TOKEN : 'ABC123';
        this.mode = w.PLUMB_CONFIG.MODE ? w.PLUMB_CONFIG.MODE : 'test';
        this.display_logo = true;
        this.phrases = {
          cart_empty: 'You don\'t have anything in your cart'
        };
        this.baseUrls = {
          test: 'http://0.0.0.0:3458/jsapi',
          production: 'https://www.plummb.com/api/jsapi'
        };
        this.menuDirection = 'left';
        this.menuHidden = false;
        this.menuOpen = false;
        this.menuIcon = 'store';
        this.menuHover = true;
        this.menuMouseEnter = function($evt) {
          if(this.menuHover === false) return false;
          this.menuOpen = true;
        };
        this.menuMouseLeave = function($evt) {
          if(this.menuHover === false) return false;
          this.menuOpen = false;
        };
        this.menuTooltipDirection = 'bottom';
        this.display_price_breakdown = true;
        this.months = [
          {
            name: 'January',
            value: 1
          },
          {
            name: 'February',
            value: 2
          },
          {
            name: 'March',
            value: 3
          },
          {
            name: 'April',
            value: 4
          },
          {
            name: 'May',
            value: 5
          },
          {
            name: 'June',
            value: 6
          },
          {
            name: 'July',
            value: 7
          },
          {
            name: 'August',
            value: 8
          },
          {
            name: 'September',
            value: 9
          },
          {
            name: 'October',
            value: 10
          },
          {
            name: 'November',
            value: 11
          },
          {
            name: 'December',
            value: 12
          }
        ];
        // this is so inefficient lol, change
        this.years = [
          {
            name: new Date().getFullYear(),
            value: new Date().getFullYear()
          },
          {
            name: new Date().getFullYear()+1,
            value: new Date().getFullYear()+1
          },
          {
            name: new Date().getFullYear()+2,
            value: new Date().getFullYear()+2
          },
          {
            name: new Date().getFullYear()+3,
            value: new Date().getFullYear()+3
          },
          {
            name: new Date().getFullYear()+4,
            value: new Date().getFullYear()+4
          },
          {
            name: new Date().getFullYear()+5,
            value: new Date().getFullYear()+5
          },
          {
            name: new Date().getFullYear()+6,
            value: new Date().getFullYear()+6
          },
          {
            name: new Date().getFullYear()+7,
            value: new Date().getFullYear()+7
          }
        ];
        this.states =
          [
            {
              'name': 'Alberta',
              'value': 'AB'
            },
            {
              'name': 'Alabama',
              'value': 'AL'
            },
            {
              'name': 'Alaska',
              'value': 'AK'
            },
            {
              'name': 'American Samoa',
              'value': 'AS'
            },
            {
              'name': 'Arizona',
              'value': 'AZ'
            },
            {
              'name': 'Arkansas',
              'value': 'AR'
            },
            {
              'name': 'British Columbia',
              'value': 'BC'
            },
            {
              'name': 'California',
              'value': 'CA'
            },
            {
              'name': 'Colorado',
              'value': 'CO'
            },
            {
              'name': 'Connecticut',
              'value': 'CT'
            },
            {
              'name': 'Delaware',
              'value': 'DE'
            },
            {
              'name': 'District Of Columbia',
              'value': 'DC'
            },
            {
              'name': 'Federated States Of Micronesia',
              'value': 'FM'
            },
            {
              'name': 'Florida',
              'value': 'FL'
            },
            {
              'name': 'Georgia',
              'value': 'GA'
            },
            {
              'name': 'Guam',
              'value': 'GU'
            },
            {
              'name': 'Hawaii',
              'value': 'HI'
            },
            {
              'name': 'Idaho',
              'value': 'ID'
            },
            {
              'name': 'Illinois',
              'value': 'IL'
            },
            {
              'name': 'Indiana',
              'value': 'IN'
            },
            {
              'name': 'Iowa',
              'value': 'IA'
            },
            {
              'name': 'Kansas',
              'value': 'KS'
            },
            {
              'name': 'Kentucky',
              'value': 'KY'
            },
            {
              'name': 'Louisiana',
              'value': 'LA'
            },
            {
              'name': 'Manitoba',
              'value': 'MB'
            },
            {
              'name': 'Maine',
              'value': 'ME'
            },
            {
              'name': 'Marshall Islands',
              'value': 'MH'
            },
            {
              'name': 'Maryland',
              'value': 'MD'
            },
            {
              'name': 'Massachusetts',
              'value': 'MA'
            },
            {
              'name': 'Michigan',
              'value': 'MI'
            },
            {
              'name': 'Minnesota',
              'value': 'MN'
            },
            {
              'name': 'Mississippi',
              'value': 'MS'
            },
            {
              'name': 'Missouri',
              'value': 'MO'
            },
            {
              'name': 'Montana',
              'value': 'MT'
            },
            {
              'name': 'New Brunswich',
              'value': 'NB'
            },
            {
              'name': 'Nebraska',
              'value': 'NE'
            },
            {
              'name': 'Newfoundland and Labrador',
              'value': 'NL'
            },
            {
              'name': 'Nevada',
              'value': 'NV'
            },
            {
              'name': 'New Hampshire',
              'value': 'NH'
            },
            {
              'name': 'New Jersey',
              'value': 'NJ'
            },
            {
              'name': 'New Mexico',
              'value': 'NM'
            },
            {
              'name': 'New York',
              'value': 'NY'
            },
            {
              'name': 'North Carolina',
              'value': 'NC'
            },
            {
              'name': 'North Dakota',
              'value': 'ND'
            },
            {
              'name': 'Nova Scotia',
              'value': 'NS'
            },
            {
              'name': 'Northern Mariana Islands',
              'value': 'MP'
            },
            {
              'name': 'Ohio',
              'value': 'OH'
            },
            {
              'name': 'Oklahoma',
              'value': 'OK'
            },
            {
              'name': 'Ontario',
              'value': 'ON'
            },
            {
              'name': 'Oregon',
              'value': 'OR'
            },
            {
              'name': 'Palau',
              'value': 'PW'
            },
            {
              'name': 'Pennsylvania',
              'value': 'PA'
            },
            {
              'name': 'Prince Edward Island',
              'value': 'PE'
            },
            {
              'name': 'Puerto Rico',
              'value': 'PR'
            },
            {
              'name': 'Quebec',
              'value': 'QB'
            },
            {
              'name': 'Rhode Island',
              'value': 'RI'
            },
            {
              'name': 'South Carolina',
              'value': 'SC'
            },
            {
              'name': 'South Dakota',
              'value': 'SD'
            },
            {
              'name': 'Saskatchewan',
              'value': 'SK'
            },
            {
              'name': 'Tennessee',
              'value': 'TN'
            },
            {
              'name': 'Texas',
              'value': 'TX'
            },
            {
              'name': 'Utah',
              'value': 'UT'
            },
            {
              'name': 'Vermont',
              'value': 'VT'
            },
            {
              'name': 'Virgin Islands',
              'value': 'VI'
            },
            {
              'name': 'Virginia',
              'value': 'VA'
            },
            {
              'name': 'Washington',
              'value': 'WA'
            },
            {
              'name': 'West Virginia',
              'value': 'WV'
            },
            {
              'name': 'Wisconsin',
              'value': 'WI'
            },
            {
              'name': 'Wyoming',
              'value': 'WY'
            },
            {
              'name': 'Yukon',
              'value': 'YT'
            }
          ];
          this.countries = [
            {
              name: 'United States',
              value: 'US'
            },
            {
              name: 'Canada',
              value: 'CA'
            }
          ];

        this.$get = function() {
          return this;
        };
      })
      .factory('plumb', ['$rootScope', '$http', 'plumbConfig', '$q', function ($rootScope, $http, plumbConfig, $q) {
        function Request(plumb, opts) {
          var $scope = this;
          $scope.options = {};

          if (!plumb) {
            return console.log('Missing Plumb object');
          }

          var defaults = {
            type: 'get',
            url: '',
            path: '',
            baseUrl: plumb.options.baseUrl || '',
            data: {},
            dataType: 'json',
            headers: {
              'Access-Token': plumb.options.accessToken,
              'Authentication-Key': plumb.options.authenticationKey ? plumb.options.authenticationKey : undefined,
              'Session-Id': plumb.options.session ? plumb.options.session._id : undefined,
              'Plumb-Mode': plumb.options.mode ? plumb.options.mode : 'test'
            },
            commonError: function (res, status, error) {
              console.log(res);
            }
          };

          $scope.cleanData = function(data) {
            if(!data) {
              return data;
            }
            var newData = w[PLUMB_CONFIG.ANGULAR].copy(data);
            if(typeof newData !== 'object') {
              return newData;
            }
            for(var i in newData) {
              if(i.charAt(0) === '$'
                && i !== '$or'
                && i !== '$not'
                && i !== '$ne'
                && i !== '$and'
                && i !== '$gt'
                && i !== '$gte'
                && i !== '$lt'
                && i !== '$gte'
                && i !== '$in'
                && i !== '$nin'
                && i !== '$exists'
                && i !== '$type'
                && i !== '$mod'
                && i !== '$regex'
                && i !== '$text'
                && i !== '$where'
                && i !== '$geoIntersects'
                && i !== '$geoWithin'
                && i !== '$nearSphere'
                && i !== '$near'
                && i !== '$box'
                && i !== '$centerSphere'
                && i !== '$center'
                && i !== '$geometry'
                && i !== '$maxDistance'
                && i !== '$minDistance'
                && i !== '$polygon'
                && i !== '$uniqueDocs'
                && i !== '$all'
                && i !== '$elemMatch'
                && i !== '$size'
                && i !== '$meta'
                && i !== '$slice'
                && i !== '$options') {
                delete newData[i];
              }
              if(typeof newData[i] === 'object') {
                newData[i] = $scope.cleanData(newData[i]);
              }
            }

            return newData;
          };

          $scope.config = function (opts) {
            $scope.options = w[PLUMB_CONFIG.ANGULAR].extend({}, defaults, opts);

            return $scope;
          };

          $scope.req = function doRequest(type, url, data, error) {
            $rootScope.$broadcast('apiLoading', true);
            var opts = w[PLUMB_CONFIG.ANGULAR].extend({}, $scope.options);
            if(plumb.options.user) {
              opts.headers['authentication-key'] = plumb.options.user.authenticationKey;
            }
            opts.method = type;
            opts.url = url;

            if(data) {
              data = $scope.cleanData(data);
            }

            if (type === 'post' || type === 'put') {
              opts.data = JSON.stringify(data);
              opts.contentType = 'application/json';
            } else {
              opts.params = data;
              if(opts.params && typeof opts.params.conditions === 'object') {
                opts.params.conditions = JSON.stringify(opts.params.conditions);
              }
            }

            var req = $http(opts);

            req.success(function () {
              $rootScope.$broadcast('apiLoading', false);
            });

            req.error(function (res) {
              $rootScope.$broadcast('apiLoading', false);
              $rootScope.$broadcast('apiError', res);
              if (error) {
                return error(res);
              }
            });

            return req;
          };

          $scope.get = function (url, data, error) {
            if (typeof data === 'function') {
              error = data;
              data = null;
            }
            return $scope.req('get', url, data, error);
          };

          $scope.post = function (url, data, error) {
            if (typeof data === 'function') {
              error = data;
              data = null;
            }
            return $scope.req('post', url, data, error);
          };

          $scope.put = function (url, data, error) {
            if (typeof data === 'function') {
              error = data;
              data = null;
            }
            return $scope.req('put', url, data, error);
          };

          $scope.del = function (url, data, error) {
            if (typeof data === 'function') {
              error = data;
              data = null;
            }
            return $scope.req('delete', url, data, error);
          };

          return $scope.config(opts);
        }

        function Stor() {
          var $scope = this;
          var useLocalStorage = false;
          if(typeof Storage !== 'undefined') {
            try {
              sessionStorage['validStorage'] = true;
              useLocalStorage = true;
            } catch(e) {
              useLocalStorage = false;
            }
          }
          if (useLocalStorage) {
            $scope.set = function (name, value) {
              if (typeof value === 'object') {
                sessionStorage[name] = JSON.stringify(value);
              } else {
                sessionStorage[name] = value;
                return sessionStorage[name];
              }
              return sessionStorage[name];
            };

            $scope.get = function (name) {
              var ret;
              try {
                ret = JSON.parse(sessionStorage[name]);
              } catch (e) {
                ret = sessionStorage[name];
              }
              return ret;
            };

            $scope.remove = function (name) {
              delete sessionStorage[name];
              return null;
            };
          } else {
            $scope.set = function (name, value) {
              var expires = "";

              var outVal = typeof value === 'object' ? JSON.stringify(value) : escape(value);
              document.cookie = escape(name) + "=" + outVal + expires + "; path=/";
            };

            $scope.get = function (name) {
              var nameEQ = escape(name) + "=";
              var ca = document.cookie.split(';');
              for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) {
                  var out;
                  try {
                    out = JSON.parse(c.substring(nameEQ.length, c.length));
                  } catch (e) {
                    out = decodeURIComponent(c.substring(nameEQ.length, c.length));
                  }
                  return out;
                }
              }
              return null;
            };

            $scope.remove = function (name) {
              $scope.create(name, "", -1);
            };
          }

          return $scope;
        }

        var Plumb = function (opts) {
          var $scope = this;
          $scope.options = {};
          $scope.Stor = Stor;
          $scope.Request = Request;

          var storage = $scope.storage = new $scope.Stor();
          var cache = {
            products: {},
            product_lines: {}
          };

          if (!window.angular) {
            throw Error('angular is missing');
          }
          var defaults = {
            caching: plumbConfig.caching,
            local: plumbConfig.local,
            accessToken: plumbConfig.accessToken,
            authenticationKey: plumbConfig.authenticationKey, // if user is logged in
            session: null,
            user: null,
            mode: plumbConfig.mode,
            baseUrl: plumbConfig.baseUrls[plumbConfig.local ? 'test' : 'production']
          };

          $scope.config = function (opts) {
            $scope.options = w[PLUMB_CONFIG.ANGULAR].extend({}, defaults, opts);
            if ($scope.options.local) {
              $scope.options.baseUrl = plumbConfig.baseUrls.test;
            } else {
              $scope.options.baseUrl = plumbConfig.baseUrls.production;
            }

            $scope.options.user = storage.get('user');

            return $scope;
          };

          $scope.handleError = function (res) {
            if (res && res.responseCode === 403) {
              storage.remove('session');
              $scope.options.session = null;
            }

            $rootScope.$broadcast('plumbError', res);
          };

          /*
           *
           * Session methods
           *
           */
          function session(options) {
            if (options) {
              $scope.config(options);
            }
          }

          session.prototype.get = function (cb, force) {
            if (!cb) {
              return $scope.options.session;
            }
            $scope.options.session = storage.get('session');
            if (!$scope.options.session || force) {
              var req = new Request($scope).get($scope.options.baseUrl + '/session', null, $scope.handleError);
              req.success(function (res) {
                $scope.options.session = res.pkg.data;
                storage.set('session', $scope.options.session);
                return cb(null, $scope.options.session);
              });
            } else {
              return cb(null, $scope.options.session);
            }
          };
          session.prototype.save = function (session, cb) {
            $scope.options.session = session;
            var req = new Request($scope).post($scope.options.baseUrl + '/session', session.data, $scope.handleError);
            req.success(function (res) {
              $scope.options.session = res.pkg.data;
              storage.set('session', $scope.options.session);
              if(cb) {
                return cb(null, $scope.options.session);
              }
            });
          };

          /*
           *
           * Cart methods
           *
           */
          function cart(options) {
            if (options) {
              $scope.config(options);
            }
          }

          cart.prototype.get = function (cb) {
            $scope.session.get(function (err, session) {
              if (!session.data.cart) {
                session.data.cart = [];
                $scope.session.save(session, function (err, session) {
                  return cb(null, session.data.cart);
                });
              } else {
                return cb(null, session.data.cart);
              }
            });
          };
          cart.prototype.add = function (product, qty, cb) {
            var variants = JSON.stringify(product.variants);
            $scope.cart.get(function (err, cart) {
              for (var i = 0; i < cart.length; i++) {
                if (cart[i]._id === product._id && JSON.stringify(cart[i].variants) === variants) {
                  cart[i].qty += parseInt(qty, 10);
                  return $scope.session.get(function (err, session) {
                    session.data.cart = cart;
                    $scope.session.save(session, function (err, session) {
                      return cb(null, cart);
                    });
                  });
                }
              }

              cart.push({
                _id: product._id,
                name: product.name,
                sub_title: product.sub_title,
                qty: parseInt(qty, 10),
                sku: product.sku,
                image: product.images[0],
                weight: product.weight,
                dimensions: product.dimensions,
                price: product.price,
                product_lines: product.product_lines,
                requires_shipping: product.requires_shipping,
                allow_presale: product.allow_presale,
                taxable: product.taxable,
                minimum_quantity: product.minimum_quantity,
                quantity_in_box: product.quantity_in_box,
                variants: w[PLUMB_CONFIG.ANGULAR].copy(product.variants)
              });
              $scope.session.get(function (err, session) {
                session.data.cart = cart;
                $scope.session.save(session, function (err, session) {
                  return cb(null, cart);
                });
              });
            });
          };
          cart.prototype.update = function (product, qty, cb) {
            $scope.cart.get(function (err, cart) {
              for (var i = 0; i < cart.length; i++) {
                if (cart[i]._id === product._id) {
                  cart[i].qty = parseInt(qty);
                  break;
                }
              }

              $scope.session.get(function (err, session) {
                session.data.cart = cart;
                $scope.session.save(session, function (err, session) {
                  return cb(null, cart);
                });
              });
            });
          };
          cart.prototype.remove = function (product, cb) {
            $scope.cart.get(function (err, cart) {
              for (var i = 0; i < cart.length; i++) {
                if (cart[i]._id === product._id) {
                  cart.splice(i, 1);
                  break;
                }
              }

              $scope.session.get(function (err, session) {
                session.data.cart = cart;
                $scope.session.save(session, function (err, session) {
                  return cb(null, cart);
                });
              });
            });
          };
          cart.prototype.empty = function (cb) {
            $scope.session.get(function (err, session) {
              session.data.cart = [];
              $scope.session.save(session, function (err, session) {
                return cb(null, []);
              });
            });
          };
          cart.prototype.replace = function (cart, cb) {
            $scope.session.get(function (err, session) {
              session.data.cart = cart;
              $scope.session.save(session, function (err, session) {
                if (err) {
                  return cb(err, null);
                }

                return cb(null, session.data.cart);
              });
            });
          };

          /*
           *
           * Authentication methods
           *
           */
          function auth(options) {
            if (options) {
              $scope.config(options);
            }
          }

          auth.prototype.register = function (data, cb) {
            var req = new Request($scope).post($scope.options.baseUrl + '/register', data, $scope.handleError);
            req.success(function (res) {
              session.user_id = res.pkg.data._id;
              $scope.session.get(function (err, session) {
                $scope.auth.setUser(res.pkg.data);
                $rootScope.$broadcast('plumbRegistered', res.pkg.data);
                return cb(null, res.pkg.data);
              }, true);
            });
          };
          auth.prototype.login = function (username, password, cb) {
            var req = new Request($scope).post($scope.options.baseUrl + '/login', {
              username: username,
              password: password
            }, $scope.handleError);
            req.success(function (res) {
              $scope.session.get(function (err, session) {
                $scope.auth.setUser(res.pkg.data);
                $rootScope.$broadcast('plumbSignIn', res.pkg.data);
                return cb(null, res.pkg.data);
              }, true);
            });
          };

          auth.prototype.forgotPassword = function(email, cb) {
            var req = new Request($scope).post($scope.options.baseUrl + '/forgot-password', {email: email}, $scope.handleError);
            req.success(function(res) {
              $rootScope.$broadcast('plumbForgotPassword', res);
              return cb(null, res);
            });
          };

          auth.prototype.signOut = function() {
            storage.remove('session');
            storage.remove('user');
            $scope.options.session = null;
            $scope.options.user = null;
            $rootScope.$broadcast('plumbSignOut', true);
          };

          auth.prototype.loggedIn = function() {
            return storage.get('user');
          };

          auth.prototype.setUser = function(user) {
            storage.set('user', user);
            $scope.options.user = user;
            return user;
          };

          /*
           *
           * Address methods
           *
           */
          function addresses(options) {
            if (options) {
              $scope.config(options);
            }
          }

          addresses.prototype.list = function (cb) {
            $scope.session.get(function (err, session) {
              var req = new Request($scope).get($scope.options.baseUrl + '/addresses', null, $scope.handleError);
              req.success(function (res) {
                return cb(null, res.pkg.data);
              });
            });
          };
          addresses.prototype.create = function (data, cb) {
            $scope.session.get(function (err, session) {
              var req = new Request($scope).post($scope.options.baseUrl + '/addresses', data, $scope.handleError);
              req.success(function (res) {
                return cb(null, res.pkg.data);
              });
            });
          };
          addresses.prototype.edit = function (data, cb) {
            $scope.session.get(function (err, session) {
              var req = new Request($scope).put($scope.options.baseUrl + '/addresses', data, $scope.handleError);
              req.success(function (res) {
                return cb(null, res.pkg.data);
              });
            });
          };
          addresses.prototype.remove = function (data, cb) {
            $scope.session.get(function (err, session) {
              var req = new Request($scope).del($scope.options.baseUrl + '/addresses', data, $scope.handleError);
              req.success(function (res) {
                return cb(null, res.pkg.data);
              });
            });
          };

          /*
           *
           * Payments methods
           *
           */
          function payment_methods(options) {
            if (options) {
              $scope.config(options);
            }
          }

          payment_methods.prototype.list = function (cb) {
            $scope.session.get(function (err, session) {
              var req = new Request($scope).get($scope.options.baseUrl + '/transaction-accounts', null, $scope.handleError);
              req.success(function (res) {
                return cb(null, res.pkg.data);
              });
            });
          };
          payment_methods.prototype.create = function (data, cb) {
            $scope.session.get(function (err, session) {
              var req = new Request($scope).post($scope.options.baseUrl + '/transaction-accounts', data, $scope.handleError);
              req.success(function (res) {
                return cb(null, res.pkg.data);
              });
            });
          };
          payment_methods.prototype.edit = function (data, cb) {
            // User can edit the nickname
            $scope.session.get(function (err, session) {
              var req = new Request($scope).put($scope.options.baseUrl + '/transaction-accounts', data, $scope.handleError);
              req.success(function (res) {
                return cb(null, res.pkg.data);
              });
            });
          };
          payment_methods.prototype.remove = function (data, cb) {
            $scope.session.get(function (err, session) {
              var req = new Request($scope).del($scope.options.baseUrl + '/transaction-accounts', data, $scope.handleError);
              req.success(function (res) {
                return cb(null, res.pkg.data);
              });
            });
          };

          /*
           *
           * Product methods
           *
           */
          function products(options) {
            if (options) {
              $scope.config(options);
            }
          }

          products.prototype.list = function (options, cb) {
            $scope.session.get(function (err, session) {
              var stringOptions = JSON.stringify(options);
              if (cache.products[stringOptions]) {
                return cb(null, cache.products[stringOptions]);
              }
              var req = new Request($scope).get($scope.options.baseUrl + '/products', options, $scope.handleError);
              req.success(function (res) {
                if ($scope.options.caching === true) {
                  cache.products[stringOptions] = res.pkg.data;
                }
                return cb(null, res.pkg.data);
              });
              req.error(function(data, status, headers) {
                return cb(new Error(data.pkg.statusMessage || 'Request failed'))
              });
            });
          };

          products.prototype.total = function (options, cb) {
            $scope.session.get(function (err, session) {
              var stringOptions = JSON.stringify(options);
              var req = new Request($scope).post($scope.options.baseUrl + '/products/total', options, $scope.handleError);
              req.success(function (res) {
                return cb(null, res.pkg.data);
              });
              req.error(function(data, status, headers) {
                return cb(new Error(data.pkg.statusMessage || 'Request failed'))
              });
            });
          };

          products.prototype.getProductPrice = function(product) {
            var use_vendor_pricing = false;
            var userProfile = $scope.options.user && $scope.options.user.current_profile && $scope.options.user.current_profile[$scope.options.session.data._groups] ? $scope.options.user.current_profile[$scope.options.session.data._groups] : null;
            if(userProfile && userProfile.profile_template.use_vendor_pricing) {
              use_vendor_pricing = true;
            }
            if(!product) {
              return null;
            }
            var p = product.price;
            if(use_vendor_pricing) {
              if(product.vendor_price) {
                p = product.vendor_price;
              }
            }
            if(!product.variants) {
              product.variants = [];
              return p;
            }
            for(var i = 0; i < product.variants.length; i++) {
              if(product.variants[i].price && !use_vendor_pricing) {
                p += parseInt(product.variants[i].price, 10);
              } else if(product.variants[i].vendor_price && use_vendor_pricing) {
                p += parseInt(product.variants[i].vendor_price, 10);
              } else if(product.variants[i].price) {
                p += parseInt(product.variants[i].price, 10);
              }
            }
            return p;
          };

          /*
           *
           * Product Line methods
           *
           */
          function product_lines(options) {
            if (options) {
              $scope.config(options);
            }
          }

          product_lines.prototype.list = function (options, cb) {
            $scope.session.get(function (err, session) {
              var stringOptions = JSON.stringify(options);
              if (cache.product_lines[stringOptions]) {
                return cb(null, cache.product_lines[stringOptions]);
              }
              var req = new Request($scope).get($scope.options.baseUrl + '/product-lines', options, $scope.handleError);
              req.success(function (res) {
                if ($scope.options.caching === true) {
                  cache.product_lines[stringOptions] = res.pkg.data;
                }
                return cb(null, res.pkg.data);
              });
              req.error(function(data, status, headers) {
                return cb(new Error(data.pkg.statusMessage || 'Request failed'))
              });
            });
          };

          product_lines.prototype.total = function (options, cb) {
            $scope.session.get(function (err, session) {
              var stringOptions = JSON.stringify(options);
              var req = new Request($scope).post($scope.options.baseUrl + '/product-lines/total', options, $scope.handleError);
              req.success(function (res) {
                return cb(null, res.pkg.data);
              });
              req.error(function(data, status, headers) {
                return cb(new Error(data.pkg.statusMessage || 'Request failed'))
              });
            });
          };

          /*
           *
           * Order methods
           *
           */
          function orders(options) {
            if (options) {
              $scope.config(options);
            }
          }

          orders.prototype.list = function (options, cb) {
            $scope.session.get(function (err, session) {
              var req = new Request($scope).get($scope.options.baseUrl + '/orders', options, $scope.handleError);
              req.success(function (res) {
                return cb(null, res.pkg.data);
              });
              req.error(function(data, status, headers) {
                return cb(new Error(data.pkg.statusMessage || 'Request failed'))
              });
            });
          };
          orders.prototype.create = function (data, cb) {
            $scope.session.get(function (err, session) {
              var req = new Request($scope).post($scope.options.baseUrl + '/orders', data, $scope.handleError);
              req.success(function (res) {
                return cb(null, res.pkg.data);
              });
              req.error(function(data, status, headers) {
                return cb(new Error(data.pkg.statusMessage || 'Request failed'))
              });
            });
          };
          orders.prototype.taxes = function (value, shipment, cb) {
            var params = {
              value: value,
              ship_to: shipment.ship_to
            };
            $scope.session.get(function (err, session) {
              if (err) {
                return cb(err, null);
              }
              var req = new Request($scope).post($scope.options.baseUrl + '/orders/taxes', params, $scope.handleError);
              req.success(function (res) {
                return cb(null, res.pkg.data);
              });
              req.error(function(data, status, headers) {
                return cb(new Error(data.pkg.statusMessage || 'Request failed'))
              });
            });
          };

          /*
           *
           * Store Settings
           *
           */

          function settings(options) {
            if(options) {
              $scope.config(options);
            }
          }

          settings.prototype.get = function(cb) {
            var req = new Request($scope).get($scope.options.baseUrl + '/store/settings', $scope.handleError);
            req.success(function(res) {
              return cb(null, res.pkg.data);
            });
          };

          /*
           *
           * Store discounts & gift cards
           *
           */

          function discounts(options) {
            if(options) {
              $scope.config(options);
            }
          }

          /*
           * getDiscounts - returns an array of discounts for the store
           *
           */
          discounts.prototype.getDiscounts = function(cb) {
            var req = new Request($scope).get($scope.options.baseUrl + '/discounts', $scope.handleError);
            req.success(function(res) {
              return cb(null, res.pkg.data);
            });
          };

          /*
           * checkDiscount - check a code for a discount
           *
           */
          discounts.prototype.checkDiscount = function(code, cb) {
            var req = new Request($scope).get($scope.options.baseUrl + '/discounts/check', {code: code}, $scope.handleError);
            req.success(function(res) {
              return cb(null, res.pkg.data);
            });
          };

          /*
           * checkGiftCard - check a code for a gift card
           *
           */
          discounts.prototype.checkGiftCard = function(code, cb) {
            var req = new Request($scope).get($scope.options.baseUrl + '/gift-cards/check', {code: code}, $scope.handleError);
            req.success(function(res) {
              return cb(null, res.pkg.data);
            });
          };

          discounts.prototype.getDiscountOrderValue = function(discount, products) {
            if(discount.value_type === 'fixed') {
              if(discount.product_restriction && discount.products.length) {
                for(var i = 0; i < discount.products.length; i++) {
                  for(var j = 0; j < products.length; j++) {
                    if(discount.products[i]._id === products[j]._id) {
                      return discount.value;
                    }
                  }
                }
                return 0;
              }
              if(discount.product_line_restrictions && discount.product_lines.length) {
                for(var i = 0; i < discount.product_lines.length; i++) {
                  for(var j = 0; j < products.length; j++) {
                    for(var k = 0; k < products[j].product_lines.length; k++) {
                      if (discount.product_lines[i]._id === products[j].product_lines._id) {
                        return discount.value;
                      }
                    }
                  }
                }
                return 0;
              }
              return discount.value;
            } else if(discount.value_type === 'percent') {
              var value = 0;
              if(discount.product_restriction) {
                for(var i = 0; i < discount.products.length; i++) {
                  for(var j = 0; j < products.length; j++) {
                    if(discount.products[i]._id === products[j]._id) {
                      value += parseInt($scope.products.getProductPrice(products[j]), 10) * parseInt(products[j].qty, 10);
                    }
                  }
                }
                return parseFloat(discount.value)/100 * value;
              }
              if(discount.product_line_restriction) {
                for(var i = 0; i < discount.product_lines.length; i++) {
                  for(var j = 0; j < products.length; j++) {
                    for(var k = 0; k < products[j].product_lines.length; k++) {
                      if (discount.product_lines[i]._id === products[j].product_lines._id) {
                        value += parseInt($scope.products.getProductPrice(products[j]), 10) * parseInt(products[j].qty, 10);
                      }
                    }
                  }
                }
                return parseFloat(discount.value)/100 * value;
              }

              for(var i = 0; i < products.length; i++) {
                value += parseInt($scope.products.getProductPrice(products[i]), 10) * parseInt(products[i].qty, 10);
              }

              return parseFloat(discount.value)/100 * value;
            }
          };

          /*
           *
           * Shipping methods
           *
           */
          function shipping(options) {
            if (options) {
              $scope.config(options);
            }
          }

          function getProductWeight(p) {
            var weight = p.weight;
            if(!p.variants) {
              p.variants = [];
            }
            for(var i = 0; i < p.variants.length; i++) {
              if(p.variants[i].weight && p.variants[i].weight.length > 0) {
                weight += parseInt(p.variants[i].weight, 10);
              }
            }
            return weight;
          }

          shipping.prototype.rates = function (data, cb, errCb) {
            if (!data.products) {
              return cb(new Error('Missing products'), null);
            }
            var params = w[PLUMB_CONFIG.ANGULAR].copy(data);

            delete params.products;
            params.packages = [
              {
                weight: 0,
                price: 0
              }
            ];
            params.products = [];
            for (var i = 0; i < data.products.length; i++) {
              params.packages[0].weight += getProductWeight(data.products[i]) * data.products[i].qty;
              params.packages[0].price += $scope.products.getProductPrice(data.products[i]) * data.products[i].qty;
              params.products.push(data.products[i]);
            }

            if(!errCb) {
              errCb = $scope.handleError;
            }

            $scope.session.get(function (err, session) {
              var req = new Request($scope).post($scope.options.baseUrl + '/shipping/rates', params, errCb);
              req.success(function (res) {
                var rates = res.pkg.data;
                if(!rates) {
                  return cb(res.pkg.meta, null);
                }
                rates.sort(function (a, b) {
                  return a.cost - b.cost;
                });
                return cb(null, rates);
              });
            });
          };

          /*
           *
           * Shipment Model
           *
           */
          function shipment(options) {
            var $scope = this;
            $scope._id = undefined;
            $scope.rate = null;
            $scope.type = 'shipping';
            $scope.ship_to = {
              name: undefined,
              company_name: undefined,
              attention_to: undefined,
              email: undefined,
              phone: undefined,
              address: {
                address_1: undefined,
                address_2: undefined,
                address_3: undefined,
                city: undefined,
                postal_code: undefined,
                state_code: undefined,
                country_code: 'US'
              },
              residential: true,
              call_before: false,
              lift_gate: false,
              inside_delivery: false
            };

            $scope.setRate = function (r) {
              $scope.rate = r;
              return $scope;
            };
            $scope.setShipTo = function (ship_to) {
              $scope.ship_to.name = ship_to.name;
              $scope.ship_to.company_name = ship_to.company_name;
              $scope.ship_to.attention_to = ship_to.attention_to;
              $scope.ship_to.email = ship_to.email;
              $scope.ship_to.phone = ship_to.phone;
              if (ship_to.address) {
                $scope.ship_to.address = ship_to.address;
              }
              return $scope;
            };
            $scope.setAddress = function (address) {
              $scope.ship_to.address = address;
            };

            $scope = w[PLUMB_CONFIG.ANGULAR].extend($scope, options);
            return $scope;
          }

          /*
           *
           * Customer Model
           *
           */
          function customer(options) {
            var $scope = this;
            $scope._id = undefined;
            $scope.type = 'billing';
            $scope.ship_to = {
              name: undefined,
              company_name: undefined,
              attention_to: undefined,
              email: undefined,
              phone: undefined,
              address: {
                address_1: undefined,
                address_2: undefined,
                address_3: undefined,
                city: undefined,
                postal_code: undefined,
                state_code: undefined,
                country_code: 'US'
              },
              residential: true,
              call_before: false,
              lift_gate: false,
              inside_delivery: false
            };

            $scope.setShipTo = function (ship_to) {
              $scope.ship_to.name = ship_to.name;
              $scope.ship_to.company_name = ship_to.company_name;
              $scope.ship_to.attention_to = ship_to.attention_to;
              $scope.ship_to.email = ship_to.email;
              $scope.ship_to.phone = ship_to.phone;
              if (ship_to.address) {
                $scope.ship_to.address = ship_to.address;
              }
              return $scope;
            };
            $scope.setAddress = function (address) {
              $scope.ship_to.address = address;
            };

            $scope = w[PLUMB_CONFIG.ANGULAR].extend($scope, options);
            return $scope;
          }

          /*
           *
           * Payment Method Model
           *
           */
          function payment_method(options) {
            var $scope = this;
            $scope.type = 'credit_card';
            $scope.card = {};
            $scope.bank_account = {};
            $scope.reference_number = undefined;
            $scope = w[PLUMB_CONFIG.ANGULAR].extend($scope, options);

            return $scope;
          }

          /*
           *
           * Credit Card Model, extends Payment Method
           *
           */
          function credit_card(options) {
            var $scope = new payment_method({
              type: 'credit_card'
            });

            $scope._id = undefined;
            $scope.card_token = null;

            $scope = w[PLUMB_CONFIG.ANGULAR].extend($scope, options);

            /*
             * Tokenize a card in Stripe/Balanced
             *
             *
             */
            $scope.tokenizeCard = function(card_data, key) {
              Stripe.setPublishableKey(key);
              var defer = $q.defer();
              Stripe.card.createToken({
                name: card_data.name,
                number: card_data.number,
                cvc: card_data.cvc,
                exp_month: card_data.exp_month,
                exp_year: card_data.exp_year,
                address_zip: card_data.address_zip
              }, function(status, resp) {
                if(resp.error) {
                  return defer.reject(resp.error);
                }

                $scope.card_token = resp.id;
                defer.resolve(resp.id);
              });

              return defer.promise;
            };

            return $scope;
          }

          /*
           *
           * Bank Account Model, extends Payment Method
           *
           */
          function bank_account(options) {
            var $scope = new payment_method({
              type: 'bank_account'
            });

            $scope._id = undefined;
            $scope.bank_account.name = undefined;
            $scope.bank_account.account_number = undefined;
            $scope.bank_account.routing_number = undefined;
            $scope.bank_account.type = 'checking';

            $scope = w[PLUMB_CONFIG.ANGULAR].extend($scope, options);
            return $scope;
          }

          function purchase_order(options) {
            var $scope = new payment_method({
              type: 'purchase_order'
            });

            $scope = w[PLUMB_CONFIG.ANGULAR].extend($scope, options);
            return $scope;
          }

          $scope.session = new session();
          $scope.cart = new cart();
          $scope.auth = new auth();
          $scope.addresses = new addresses();
          $scope.payment_methods = new payment_methods();
          $scope.products = new products();
          $scope.product_lines = new product_lines();
          $scope.orders = new orders();
          $scope.shipping = new shipping();
          $scope.settings = new settings();
          $scope.discounts = new discounts();
          $scope.shipment = shipment;
          $scope.customer = customer;
          $scope.credit_card = credit_card;
          $scope.bank_account = bank_account;
          $scope.purchase_order = purchase_order;

          return $scope.config(opts);
        };

        return new Plumb(plumbConfig);
      }])
      .config(function($sceProvider) {
        $sceProvider.enabled(false);
      })
      .factory('plumbMenuService', ['plumb', 'plumbConfig', '$rootScope', '$filter', function(plumb, plumbConfig, $rootScope, $filter) {
        var $scope = this;

        $scope.menu = [];
        $scope.cart = [];
        $scope.sidebars = [];
        $scope.showing = null;
        $scope.back = null;
        $scope.next = null;
        $scope.quantity_total = 0;

        plumb.cart.get(function(err, cart) {
          $scope.cart = cart;
          $scope.quantity_total = 0;
          for(var i = 0; i < $scope.cart.length; i++) {
            $scope.quantity_total += parseInt($scope.cart[i].qty, 10);
          }
        });

        $rootScope.$on('cartUpdated', function(evt, cart) {
          $scope.cart = cart;
          $scope.quantity_total = 0;
          for(var i = 0; i < $scope.cart.length; i++) {
            $scope.quantity_total += parseInt($scope.cart[i].qty, 10);
          }
        });

        $scope.close = function() {
          $scope.showing = null;
          $rootScope.$broadcast('menuClosed', true);
        };

        $scope.toggle = function(val, back, next) {
          if($scope.showing === val) {
            $scope.showing = null;
          } else {
            $scope.showing = val;
          }

          if(back) {
            $scope.back = back;
          } else {
            $scope.back = null;
          }

          if(next) {
            $scope.next = next;
          } else {
            $scope.next = null;
          }

          for(var i = 0; i < $scope.sidebars.length; i++) {
            if($scope.sidebars[i].tag === val && $scope.sidebars[i].back) {
              $scope.back = $scope.sidebars[i].back;
            }
          }

          $rootScope.$broadcast('menuToggled', {val: val, back: back, next: next});
        };

        $scope.show = function(val) {
          return (val === $scope.showing);
        };

        $scope.addMenuItem = function(item, position) {
          if(!position) {
            position = $scope.menu.length;
          }

          var defaults = {
            name: null,
            tag: null,
            uri: null,
            buttonTemplateUrl: 'plumb-templates/menu/button.html',
            showLoggedIn: false,
            showLoggedOut: false,
            onClick: null
          };

          item = w[PLUMB_CONFIG.ANGULAR].extend({}, defaults, item);

          $scope.menu.splice(position, 0, item);

          return $scope;
        };

        $scope.addSidebar = function(item) {
          var defaults = {
            tag: null,
            className: null,
            templateUrl: null,
            back: null
          };

          item = w[PLUMB_CONFIG.ANGULAR].extend({}, defaults, item);

          $scope.sidebars.push(item);

          return $scope;
        };

        $scope.getUri = function(item) {
          if(item.uri && item.uri.length > 0) {
            return item.uri;
          }

          return null;
        };

        $scope.addToCart = function(product, qty, variants) {
          if(variants && variants.length) {
            product.variants = variants;
          }
          if(product.minimum_quantity && parseInt(qty, 10) < product.minimum_quantity) {
            return $rootScope.$emit('cartError', 'Minimum Quantity of ' + product.minimum_quantity + ' required');
          }
          plumb.cart.add(product, qty, function(err, cart) {
            if(err) {
              $rootScope.$emit('cartError', err);
              return console.log(err);
            }

            $rootScope.$emit('cartUpdated', cart);
          });
        };

        $scope.getPrice = function(product) {
          if(!product) {
            return 'N/A';
          }
          var p = plumb.products.getProductPrice(product);
          return $filter('currency')(p / 100);
        };

        $scope.getTotalPrice = function(product) {
          if(!product) {
            return 'N/A';
          }
          var p = product.price;
          if(!product.variants) {
            return $filter('currency')((product.qty * p) / 100);
          }
          for(var i = 0; i < product.variants.length; i++) {
            if(product.variants[i].price) {
              p += parseInt(product.variants[i].price, 10);
            }
          }
          return $filter('currency')((product.qty * p) / 100);
        };

        $scope.buildSKU = function(product, attributes) {
          if(!attributes || !attributes.length) {
            return product.sku;
          }

          var newSku = product.sku;
          if(typeof newSku === 'object') {
            newSku = '[' + newSku.toString() + ']';
          }
          for(var i = 0; i < attributes.length; i++) {
            var opt = attributes[i];

            if(!opt.sku) {
              continue;
            }

            if(opt.sku.charAt(0) === '@') {
              var split = opt.sku.split('[');
              if(split.length !== 2) {
                continue;
              }
              var loc = split[0].slice(1);
              var sku = split[1].slice(0, -1);
              newSku = newSku.replace('[' + loc + ']', sku);
            }
          }
          return newSku;
        };

        $scope.setVariant = function(product, name, value) {
          if(!product.variants) {
            product.variants = [];
          }
          for(var i = 0; i < product.variants.length; i++) {
            if(product.variants[i].name === name) {
              if(value === null) {
                product.variants.splice(i, 1);
                return product;
              }
              product.variants[i].value = value.name;
              product.variants[i].price = value.price;
              product.variants[i].vendor_price = value.vendor_price;
              product.variants[i].weight = value.weight;
              product.variants[i].sku = value.sku;
              product.variants[i].manufacturer_sku = value.manufacturer_sku;
              return product;
            }
          }

          product.variants.push({name: name, value: value.name, price: value.price, vendor_price: value.vendor_price, weight: value.weight, sku: value.sku, manufacturer_sku: value.manufacturer_sku});
          return product;
        };

        $scope.setMultiVariant = function(product, name, option) {
          if(!product.variants) {
            product.variants = [];
          }
          for(var i = 0; i < product.variants.length; i++) {
            if(product.variants[i].name === name && product.variants[i].value === option.name) {
              product.variants.splice(i, 1);
              return product;
            }
          }

          product.variants.push({name: name, value: option.name, price: option.price, vendor_price: option.vendor_price, weight: option.weight, sku: option.sku, manufacturer_sku: option.manufacturer_sku});
          return product;
        };

        $scope.checkShowing = function(item) {
          var loggedIn = plumb.auth.loggedIn();
          if(loggedIn && item.showLoggedIn) {
            return true;
          }
          if(!loggedIn && item.showLoggedOut) {
            return true;
          }

          return false;
        };

        $scope.clearMenu = function() {
          $scope.menu = [];
          return $scope;
        };

        $scope.clearSidebar = function() {
          $scope.sidebars = [];
          return $scope;
        };

        $scope.checkClass = function(c) {
          if($scope.showing === c) {
            return {active: true};
          }

          return '';
        };

        $scope.checkButtonClass = function(item) {
          if(item.tag === 'cart') {
            if(!$scope.cart || !$scope.cart.length) {
              return {cart: true, 'cart-empty': true};
            }
            return {cart: true, 'cart-empty': $scope.cart.length <= 0};
          } else {
            var obj = {};
            obj[item.tag] = true;
            return obj;
          }
        };

        $scope.addSidebar({
          tag: 'login',
          className: 'plumb-login',
          templateUrl: 'plumb-templates/menu/sign-in.html'
        }).addSidebar({
          tag: 'account',
          className: 'plumb-account',
          templateUrl: 'plumb-templates/menu/account.html'
        }).addSidebar({
          tag: 'cart',
          className: 'plumb-cart',
          templateUrl: 'plumb-templates/menu/cart.html'
        }).addSidebar({
          tag: 'checkout',
          className: 'plumb-checkout',
          templateUrl: 'plumb-templates/menu/checkout.html',
          back: 'cart'
        }).addSidebar({
          tag: 'checkout-2',
          className: 'plumb-checkout',
          templateUrl: 'plumb-templates/menu/checkout-2.html',
          back: 'checkout'
        }).addSidebar({
          tag: 'checkout-3',
          className: 'plumb-checkout',
          templateUrl: 'plumb-templates/menu/checkout-3.html',
          back: 'checkout-2'
        }).addSidebar({
          tag: 'checkout-complete',
          className: 'plumb-checkout',
          templateUrl: 'plumb-templates/menu/checkout-complete.html'
        }).addSidebar({
          tag: 'forgot-password',
          className: 'plumb-forgot-password',
          templateUrl: 'plumb-templates/menu/forgot-password.html'
        }).addSidebar({
          tag: 'register',
          className: 'plumb-register',
          templateUrl: 'plumb-templates/menu/register.html'
        });

        /*
         $scope.addSidebar({
           tag: 'wishlist',
           className: 'plumb-wishlist',
           templateUrl: 'plumb-templates/menu/wishlist.html'
         }).addSidebar({
           tag: 'contact',
           className: 'plumb-contact',
           templateUrl: 'plumb-templates/menu/contact.html'
         });
        */

        $scope.addMenuItem({
          name: 'Sign In',
          tag: 'login',
          icon: 'lock',
          template: 'plumb-templates/menu/sign-in.html',
          showLoggedIn: false,
          showLoggedOut: true
        }).addMenuItem({
          name: 'Account',
          tag: 'account',
          icon: 'account_circle',
          template: 'plumb-templates/menu/account.html',
          showLoggedIn: true,
          showLoggedOut: false
        }).addMenuItem({
          name: 'Shopping Cart',
          tag: 'cart',
          buttonTemplateUrl: 'plumb-templates/menu/button-cart.html',
          template: 'plumb-templates/menu/cart.html',
          showLoggedIn: true,
          showLoggedOut: true
        });

        //Wishlist
        /*
         plumbMenuService.addMenuItem({
         name: 'Wishlist',
         tag: 'wishlist',
         icon: 'kicon-wishlist',
         template: 'plumb-templates/menu/wishlist.html',
         showLoggedIn: true,
         showLoggedOut: true
         });
         */

        //Contact
        /*
         plumbMenuService.addMenuItem({
         name: 'Contact',
         tag: 'contact',
         icon: 'kicon-contact',
         template: 'plumb-templates/menu/contact.html',
         showLoggedIn: true,
         showLoggedOut: true
         });
         */

        $scope.addMenuItem({
          name: 'Sign Out',
          tag: 'sign-out',
          icon: 'exit_to_app',
          onClick: function (evt) {
            plumb.auth.signOut();
          },
          showLoggedIn: true,
          showLoggedOut: false
        });

        return $scope;
      }])
      .directive('plumbPopover', function() {
        return {
          scope: {plumbPopover: '=', showing: '@'},
          restrict: 'A',
          transclude: true,
          templateUrl: function(tElement, tAttrs) {
            var url = 'plumb-templates/plumb-popover.html';
            if(tAttrs.templateUrl) {
              url = tAttrs.templateUrl;
            }

            return url;
          },
          link: function(scope, element, attr) {
            var popover = w[PLUMB_CONFIG.ANGULAR].element(element[0].querySelector('.plumb-popover'));
            element.bind('mouseover', function(evt) {
              scope.showing = true;
              scope.$apply();
            });
            element.bind('mouseout', function(evt) {
              scope.showing = false;
              scope.$apply();
            });
            scope.$watch(function() { return scope.showing; }, function() {
              scope.showing = (scope.showing === 'true' || scope.showing === true);

              if(scope.showing === true) {
                popover.addClass('active');
              } else {
                popover.removeClass('active')
              }
            }, true);
          }
        }
      })
      .directive('plumbImage', ['plumb', 'plumbConfig', '$parse', function(plumb, plumbConfig, $parse) {
        return {
          restrict: 'E',
          scope: {src: '=', options: '=?', alt: '='},
          template: '<img ng-src="{{newSrc}}" alt="{{alt}}">',
          link: function(scope, element, attr) {
            scope.newSrc = null;
            scope.$watch(function() { return scope.src}, function () {
              if (!scope.src) {
                return;
              }
              scope.newSrc = buildUrl(scope.src, scope.options);
            });

            function buildUrl(src, options) {
              var base = plumbConfig.local ? plumbConfig.baseUrls.test : plumbConfig.baseUrls.production;
              var url = base + '/imager?access-token=' + plumbConfig.accessToken + '&url=' + encodeURIComponent(src);
              if(options.size) {
                url += '&size=' + options.size;
              }
              if(options.effect) {
                url += '&effect=' + options.effect;
              }
              if(options.force) {
                url += '&force=true';
              }

              return url;
            }
          }
        }
      }])
      .directive('plumbProduct', ['$rootScope', 'plumb', 'plumbConfig', 'plumbMenuService', '$filter', function($rootScope, plumb, plumbConfig, plumbMenuService, $filter) {
        return {
          restrict: 'E',
          scope: {id: '='},
          templateUrl: function(tElement, tAttrs) {
            var url = 'plumb-templates/plumb-product.html';
            if(tAttrs.templateUrl) {
              url = tAttrs.templateUrl;
            }

            return url;
          },
          replace: true,
          link: function(scope, element, attr) {
            scope.plumb = plumb;
            scope.config = plumbConfig;
            scope.product = {};
            scope.plumbMenuService = plumbMenuService;
            scope.options = {
              quantity: 1
            };

            plumb.products.list({_id: scope.id}, function(err, products) {
              if(!products || !products.length) {
                if(err) {
                  return $rootScope.$broadcast('plumbError', err);
                }
                return $rootScope.$broadcast('plumbError', 'Could not find product');
              }
              scope.product = products[0];

              if(scope.product.attributes && scope.product.attributes.length) {
                for(var i = 0; i < scope.product.attributes.length; i++) {
                  if(scope.product.attributes[i].type === 'select') {
                    scope.product.attributes[i].$selected = null;
                  } else if(scope.product.attributes[i].type === 'multi') {
                    scope.product.attributes[i].$selected = [];
                  }
                  if(scope.product.attributes[i].required) {
                    if(!scope.product.attributes[i].default) {
                      scope.product.attributes[i].$selected = scope.product.attributes[i].options[0];
                      scope.product = plumbMenuService.setVariant(scope.product, scope.product.attributes[i].name, scope.product.attributes[i].options[0]);
                    } else {
                      for(var j = 0; j < scope.product.attributes[i].options.length; j++) {
                        if(scope.product.attributes[i].options[j].name === scope.product.attributes[i].default) {
                          scope.product.attributes[i].$selected = scope.product.attributes[i].options[j];
                          scope.product = plumbMenuService.setVariant(scope.product, scope.product.attributes[i].name, scope.product.attributes[i].options[j]);
                        }
                      }
                    }
                  } else {
                    for(var j = 0; j < scope.product.attributes[i].options.length; j++) {
                      if(scope.product.attributes[i].options[j].name === scope.product.attributes[i].default) {
                        scope.product.attributes[i].$selected = scope.product.attributes[i].options[j];
                        scope.product = plumbMenuService.setVariant(scope.product, scope.product.attributes[i].name, scope.product.attributes[i].options[j]);
                      }
                    }
                  }
                }
              }
            });

            scope.variantDisplay = function(v) {
              var out = v.name;
              if(!plumbConfig.display_price_breakdown) {
                return out;
              }
              if(v.price) {
                out += ' ' + (v.price > 0 ? 'add ' : 'subtract ') + $filter('currency')(v.price/100);
              }
              return out;
            };
          }
        }
      }])
      .directive('plumbMenu', ['plumb', 'plumbConfig', 'plumbMenuService', '$timeout', '$window', '$document', '$rootScope', '$filter', function(plumb, plumbConfig, plumbMenuService, $timeout, $window, $document, $rootScope, $filter) {
        return {
          restrict: 'E',
          templateUrl: function(tElement, tAttrs) {
            var url = 'plumb-templates/plumb-menu.html';
            if(tAttrs.templateUrl) {
              url = tAttrs.templateUrl;
            }

            return url;
          },
          replace: true,
          link: function(scope, element, attr) {
            scope.config = plumbConfig;
            scope.menuService = plumbMenuService;
            scope.cart = null;
            scope.wishlist = null;
            scope.apiLoading = 0;
            scope.paymentEnabled = false;
            scope.requiresShipping = false;
            scope.requiresTax = false;
            scope.addressList = [];
            scope.paymentMethodList = [];
            scope.checkout = {
              service_carrier: null,
              service_code: null,
              shipment: new plumb.customer(),
              billing: new plumb.customer(),
              payment_method: new plumb.credit_card(),
              products: null,
              notes: '',
              discounts: []
            };

            scope.geocodeComplete = false;
            scope.stateList = plumbConfig.states;
            scope.countryList = plumbConfig.countries;
            scope.expirationMonths = plumbConfig.months;
            scope.expirationYears = plumbConfig.years;
            scope.shippingAddressCopied = false;
            scope.packages = [];
            scope.selectedRate = [];
            scope.product_total = 0;
            scope.quantity_total = 0;
            scope.tax_total = 0;
            scope.shipping_total = 0;
            scope.discount_total = 0;
            scope.final_total = 0;
            scope.cartAddText = plumbConfig.cartAddText ? plumbConfig.cartAddText : 'Added to cart';
            scope.shoppingCartPopoverText = 'Added to cart';
            scope.cartAddActive = false;
            scope.order = null;
            scope.settings = null;

            scope.altPaymentType = 'credit_card';

            // load Gmaps if it isn't on the page
            if(!$window.google) {
              var check = $document[0].getElementsByTagName('script');
              var found = false;
              for(var i = 0; i < check.length; i++) {
                if(check[i].src.indexOf('maps.googleapis') > -1) {
                  found = true;
                }
              }
              if(!found) {
                var gscript = d.createElement('script');
                gscript.type = 'text/javascript';
                gscript.async = true;
                gscript.src = '//maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDfl3BRqXwFWerx20m00Hec6mSFyL42w0Y&callback=initialize';
                d.getElementsByTagName('body')[0].appendChild(gscript);
              }
            }

            scope.plumb = plumb;

            scope.switchPaymentMethod = function(type) {
              if(type === 'purchase_order') {
                scope.checkout.payment_method = new plumb.purchase_order();
                scope.altPaymentType = 'purchase_order';
              } else if(type === 'credit_card') {
                scope.checkout.payment_method = new plumb.credit_card();
                scope.altPaymentType = 'credit_card';
              }
            };

            scope.getActivePayment = function(type) {
              if(type === scope.altPaymentType) {
                return {active: true};
              }

              return null;
            };

            scope.updateProductTotal = function() {
              scope.product_total = 0;
              scope.quantity_total = 0;
              var line_total;

              for(var i = 0; i < scope.cart.length; i++) {
                if(scope.cart[i].requires_shipping) {
                  scope.requiresShipping = true;
                }
                if(scope.cart[i].taxable) {
                  scope.requiresTax = true;
                }
                scope.quantity_total += parseInt(scope.cart[i].qty, 10);
                line_total = parseInt(scope.cart[i].qty, 10) * scope.getProductPrice(scope.cart[i]);
                scope.product_total += line_total;
              }
            };

            scope.getProductPrice = plumb.products.getProductPrice;

            scope.lookupGeoCode = function(address, postal_code, obj) {
              if(!postal_code || postal_code.length < 5) {
                return;
              }

              if(!$window.google) {
                return scope.geocodeComplete = true;
              }

              var geocoder = new google.maps.Geocoder();
              geocoder.geocode({
                address: address + ' ' + postal_code
              }, function(res, status) {
                if(status !== google.maps.GeocoderStatus.OK) {
                  return scope.geocodeComplete = true;
                }

                for(var i = 0; i < res[0].address_components.length; i++) {
                  var part = res[0].address_components[i];
                  if(part.types[0] === 'locality') {
                    obj.ship_to.address.city = part.long_name;
                  }
                  if(part.types[0] === 'administrative_area_level_1') {
                    obj.ship_to.address.state_code = part.short_name;
                  }
                  if(part.types[0] === 'country') {
                    obj.ship_to.country_code = part.short_name;
                  }
                }
                scope.geocodeComplete = true;
                scope.$apply();
              });
            };

            scope.updateCheckout = function() {
              scope.checkout.shipment = plumb.session.get().data.shipment || new plumb.customer();
              scope.checkout.billing = plumb.session.get().data.billing || new plumb.customer();
              scope.checkout.discounts = plumb.session.get().data.discounts || [];
              if(scope.checkout.shipment.ship_to.address.address_1) {
                scope.lookupGeoCode(scope.checkout.shipment.ship_to.address.address_1, scope.checkout.shipment.ship_to.address.postal_code, scope.checkout.shipment);
              }
              if(scope.checkout.billing.ship_to.address.address_1) {
                scope.lookupGeoCode(scope.checkout.billing.ship_to.address.address_1, scope.checkout.billing.ship_to.address.postal_code, scope.checkout.billing);
              }
            };

            plumb.cart.get(function(err, cart) {
              scope.cart = cart;
              plumb.settings.get(function(err, settings) {
                plumb.options.store_settings = settings;
              });
              scope.updateProductTotal();
              scope.updateCheckout();
            });

            function getDiscountTotal() {
              var total = 0;
              for(var i = 0; i < scope.checkout.discounts.length; i++) {
                switch(scope.checkout.discounts[i].type) {
                  case 'code':
                    total += plumb.discounts.getDiscountOrderValue(scope.checkout.discounts[i], scope.cart);
                    break;
                  case 'gift-card':
                    total += parseInt(scope.checkout.discounts[i].amount, 10);
                    break;
                }
              }

              return total;
            }

            scope.updateFinalTotal = function() {
              scope.final_total = scope.product_total +
                scope.shipping_total +
                scope.tax_total - scope.discount_total;

              if(scope.final_total < 0) {
                scope.final_total = 0;
              }
            };

            scope.$on('cartUpdated', function(evt, cart) {
              var tmp = scope.shoppingCartPopoverText;
              scope.shoppingCartPopoverText = scope.cartAddText;
              scope.cartAddActive = true;
              (function(tmp) {
                $timeout(function () {
                  scope.shoppingCartPopoverText = tmp;
                  scope.cartAddActive = false;
                }, 3000);
                scope.cart = cart;
                scope.updateProductTotal();
                scope.updateFinalTotal();
              })(tmp);
            });

            scope.updateQuantity = function(product) {
              if(product.minimum_quantity && product.minimum_quantity > product.qty) {
                product.qty = product.minimum_quantity;
              }
              scope.updateProductTotal();
              plumb.cart.update(product, product.qty, function(err, cart) {
                scope.cart = cart;
                scope.getRates();
              });
            };

            scope.removeProduct = function(product) {
              plumb.cart.remove(product, function(err, cart) {
                scope.cart = cart;
                scope.updateProductTotal();
              });
            };

            scope.saveAddress = function(address) {
              var user = plumb.auth.loggedIn();
              if(!user) {
                return;
              }
              if(address._id) {
                plumb.addresses.edit(address, function(err, address) {
                  scope.getUserDetails();
                });
              }
              plumb.addresses.create(address, function(err, address) {
                scope.getUserDetails();
              });
            };

            scope.deleteAddress = function(address) {
              plumb.addresses.remove({_id: address._id}, function(err, status){
                if(err) {
                  return console.log(err);
                }

                scope.getUserDetails();
              });
            };

            scope.savePaymentMethod = function(payment_method) {
              var user = plumb.auth.loggedIn();
              if(!user) {
                return;
              }
              if(payment_method._id) {
                plumb.payment_methods.edit(payment_method, function(err, address) {
                  scope.getUserDetails();
                });
              }
            };

            scope.getPaymentMethodType = function(payment_method) {
              if(payment_method.type === 'credit_card') {
                return 'Credit Card';
              } else if(payment_method.type === 'bank_account') {
                return 'Bank Account';
              } else if(payment_method.type === 'credit_line') {
                return 'Credit Line';
              }
            };

            scope.deletePaymentMethod = function(payment_method) {
              plumb.payment_methods.remove({_id: payment_method._id}, function(err, status){
                if(err) {
                  return console.log(err);
                }

                scope.getUserDetails();
              });
            };

            scope.copyShippingAddress = function() {
              scope.checkout.billing.ship_to = w[PLUMB_CONFIG.ANGULAR].copy(scope.checkout.shipment.ship_to);
              scope.shippingAddressCopied = true;
            };

            scope.getTaxes = function() {
              if(!scope.product_total) {
                scope.tax_total = 0;
                return scope.updateFinalTotal();
              }
              scope.discount_total = getDiscountTotal();
              var total = scope.product_total + scope.shipping_total;
              if(total < 0) {
                total = 0;
                scope.tax_total = 0;
                return scope.updateFinalTotal();
              }
              if(!scope.requiresTax) {
                scope.tax_total = 0;
                return scope.updateFinalTotal();
              }
              plumb.orders.taxes(total, {
                ship_to: {
                  address: {
                    postal_code: scope.checkout.shipment.ship_to.address.postal_code
                  }
                }
              }, function(err, tax) {
                scope.tax_total = tax;
                scope.updateFinalTotal();
              });
            };

            scope.getRates = function() {
              if(!scope.checkout.shipment.ship_to.address.postal_code
                || scope.checkout.shipment.ship_to.address.postal_code.length < 5) {
                return;
              }

              scope.packages = [];
              scope.selectedRate = [];

              plumb.shipping.rates({
                ship_to: scope.checkout.shipment.ship_to,
                products: scope.cart,
                discounts: scope.checkout.discounts
              }, function(err, packages) {
                if(err) {
                  for(var i = 0; i < err.length; i++) {
                    scope.addMessage('error', err[i], 'shipping-rates');
                  }
                  return console.log(err);
                }

                if(!(packages instanceof Array)) {
                  packages = [].push({rates: packages});
                }

                scope.packages = packages;
                for(var i = 0; i < scope.packages.length; i++) {
                  scope.selectedRate[i] = scope.packages[i].rates[0];
                  scope.selectedRate[i].products = scope.packages[i].products;
                }
                scope.getTaxes();
              }, function(err) {
                if(err.pkg.statusMessage instanceof Array) {
                  for (var i = 0; i < err.pkg.statusMessage.length; i++) {
                    scope.addMessage('error', err.pkg.statusMessage[i], 'shipping-rates');
                  }
                } else {
                  scope.addMessage('error', err.pkg.statusMessage, 'shipping-rates');
                }
                if(err.pkg.meta.discounts && err.pkg.meta.discounts === 'invalid') {
                  scope.checkout.discounts = [];
                  scope.getRates();
                }
                return console.log(err);
              });
            };

            scope.getUserDetails = function() {
              var user = plumb.auth.loggedIn();
              if(!user) {
                return;
              }

              scope.checkout.shipment.ship_to.name = user.first_name + ' ' + user.last_name;
              scope.checkout.shipment.ship_to.email = user.email;
              scope.checkout.shipment.ship_to.phone = user.phone;
              plumb.addresses.list(function(err, addresses) {
                if(!addresses.length) {
                  return;
                }
                scope.addressList = addresses;
                scope.checkout.shipment.ship_to = addresses[0];
                scope.geocodeComplete = true;
              });

              plumb.payment_methods.list(function(err, payment_methods) {
                scope.paymentMethodList = payment_methods;
              });
            };

            scope.changedAddress = function(address) {
              scope.geocodeComplete = true;
            };

            scope.$on('plumbSignIn', function(evt, user) {
              scope.getUserDetails();
            });

            if(plumb.auth.loggedIn()) {
              scope.getUserDetails();
            }

            scope.$on('plumbRegistered', function(evt, user) {
              scope.getUserDetails();
            });

            scope.$watch('selectedRate', function() {
              if(!scope.selectedRate || !scope.checkout.shipment.ship_to.address.postal_code) {
                return;
              }
              scope.shipping_total = 0;
              scope.checkout.shipping_rates = [];
              for(var i = 0; i < scope.selectedRate.length; i++) {
                scope.shipping_total += scope.selectedRate[i].cost * 100;
                scope.checkout.shipping_rates.push(scope.selectedRate[i]);
              }
              scope.getTaxes();
            }, true);

            scope.onRateChange = function(i, rate, pkg) {
              scope.selectedRate[i].products = pkg;
            };

            scope.completeOrder = function() {
              if(scope.apiLoading > 0) {
                scope.addMessage('error', 'Please wait, we are processing your order');
                return;
              }

              scope.apiLoading++;

              if(scope.final_total === 0) {
                return scope.finishCompleteOrder(null);
              }

              if(!scope.checkout.payment_method._id) {
                if(scope.checkout.payment_method.type === 'credit_card') {
                  new plumb.credit_card().tokenizeCard({
                    name: scope.checkout.payment_method.card.name,
                    number: scope.checkout.payment_method.card.card_number,
                    exp_month: scope.checkout.payment_method.card.expiration_month,
                    exp_year: scope.checkout.payment_method.card.expiration_year,
                    cvc: scope.checkout.payment_method.card.security_code,
                    address_zip: scope.checkout.billing.ship_to.postal_code
                  }, plumb.options.session.stripe_publishable_key).then(function (card_id) {
                    scope.finishCompleteOrder({type: 'credit_card', card: {card_token: card_id}});
                  }).catch(function (err) {
                    scope.addMessage('error', err.message);
                    scope.apiLoading--;
                  });
                } else {
                  scope.finishCompleteOrder(scope.checkout.payment_method);
                }
              } else {
                scope.finishCompleteOrder(scope.checkout.payment_method);
              }
            };

            scope.finishCompleteOrder = function(payment) {
              plumb.orders.create({
                shipping_rates: scope.checkout.shipping_rates,
                ship_to: scope.checkout.shipment.ship_to,
                customer: scope.checkout.billing.ship_to,
                payment_method: payment,
                products: w[PLUMB_CONFIG.ANGULAR].copy(scope.cart),
                discounts: scope.checkout.discounts,
                notes: ''
              }, function(err, order) {
                if(err) {
                  return scope.apiLoading--;
                }
                scope.order = order;

                plumb.cart.empty(function(err, cart) {
                  scope.cart = cart;
                  scope.apiLoading--;
                  $rootScope.$emit('cartUpdated', cart);
                  plumbMenuService.toggle('checkout-complete');
                  scope.checkout.discounts = [];
                });
              });
            };

            scope.addMessage = function(type, msg, section) {
              if(type === 'error') {
                return $rootScope.$broadcast('apiError', msg);
              }
              $rootScope.$broadcast('apiMessage', {type: type, msg: msg, section: section});
            };

            scope.resetForms = function() {
              scope.login = {
                username: null,
                password: null
              };
              scope.register = {
                first_name: null,
                last_name: null,
                email: null,
                password: null
              };
              scope.forgot = {
                email: null
              };
              scope.contact = {
                name: null,
                email: null,
                phone: null,
                message: null
              }

              scope.showDetail = true;
              scope.packages = [];
              scope.selectedRate = [];
            };

            scope.loginUser = function(section) {
              plumb.auth.login(scope.login.username, scope.login.password, function(user) {
                scope.addMessage('success', 'Successfully logged in');
                $timeout(function() {
                  if(plumbMenuService.next) {
                    plumbMenuService.toggle(plumbMenuService.next);
                  } else {
                    if(section) {
                      plumbMenuService.showing = section;
                    } else {
                      plumbMenuService.showing = null;
                    }
                  }
                }, 500);
              });
            };

            scope.registerUser = function(section) {
              scope.register.confirm_password = scope.register.password;
              plumb.auth.register(scope.register, function(user) {
                scope.addMessage('success', 'Account registered, and logged in');
                $timeout(function() {
                  if(plumbMenuService.next) {
                    plumbMenuService.toggle(plumbMenuService.next);
                  } else {
                    if(section) {
                      plumbMenuService.showing = section;
                    } else {
                      plumbMenuService.showing = null;
                    }
                  }
                }, 500);
              });
            };

            scope.forgotPassword = function() {
              plumb.auth.forgotPassword(scope.forgot.email, function(res) {
                scope.addMessage('success', 'Instructions sent to your email, go check it');
              });
            };

            scope.$on('plumbError', function(evt, res) {
              console.log(res);
              if(!res || !res.pkg) {
                return scope.addMessage('error', 'An error occurred connecting to Plumb\'s servers, check your connection.');
              }
            });

            scope.$on('plumbSignOut', function(evt) {
              plumbMenuService.showing = null;
              scope.paymentMethodList = [];
              scope.addressList = [];
              plumb.cart.get(function(err, cart) {
                scope.cart = cart;
                scope.updateProductTotal();
              });

              scope.checkout = {
                service_carrier: null,
                service_code: null,
                shipment: new plumb.customer(),
                billing: new plumb.customer(),
                payment_method: new plumb.credit_card(),
                products: null,
                notes: ''
              };
            });

            scope.$on('apiLoading', function(evt, val) {
              if(val === true) {
                scope.apiLoading++;
              } else if(scope.apiLoading > 0) {
                scope.apiLoading--;
              }
            });

            scope.$on('menuToggled', function(evt, data) {
              scope.resetForms();
              if(data.val === 'checkout-2') {
                plumb.options.session.data.shipment = scope.checkout.shipment;
                plumb.session.save(plumb.options.session);
              } else if(data.val === 'checkout-3') {
                plumb.options.session.data.billing = scope.checkout.billing;
                plumb.session.save(plumb.options.session);
                if(!scope.checkout.shipment.ship_to.address || !scope.checkout.shipment.ship_to.address.postal_code) {
                  scope.checkout.shipment.ship_to.address = angular.copy(scope.checkout.billing.ship_to.address);
                }
                scope.getRates();
                scope.getTaxes();
              }
            });

            scope.displayProductPrice = function(p) {
              if(!plumbConfig.display_price_breakdown) {
                return plumbMenuService.getPrice(p);
              }

              return $filter('currency')(p.price/100);
            };

            scope.displayVariantPrice = function(v) {
              if(!plumbConfig.display_price_breakdown) {
                return '&nbsp;';
              }

              return $filter('currency')(v.price/100);
            };

            /*
             * Discount Methods
             */

            scope.addDiscount = function(type) {
              scope.checkout.discounts.push({
                type: type,
                code: null,
                amount: null
              })
            };

            scope.updateDiscountStatus = function(d) {
              if(!d.code || !d.code.length) {
                for(var i = 0; i < scope.checkout.discounts.length; i++) {
                  if(scope.checkout.discounts[i].$$hashKey === d.$$hashKey) {
                    scope.checkout.discounts.splice(i, 1);
                    return;
                  }
                }
              }
              switch(d.type) {
                case 'code':
                  plumb.discounts.checkDiscount(d.code, function(err, res) {
                    angular.extend(d, res);

                    scope.getRates();
                  });
                  break;
                case 'gift-card':
                  plumb.discounts.checkGiftCard(d.code, function(err, res) {
                    angular.extend(d, res);

                    scope.getRates();
                  });
                  break;
              }
            };

            scope.getDiscountType = function(type) {
              switch(type) {
                case 'code':
                  return 'Discount Code';
                  break;
                case 'gift-card':
                  return 'Gift Card';
                  break;
              }
            };

            scope.getDiscountStatus = function(d) {
              if(d.value === null || d.code === null || !d.code.length) {
                return 'Enter code to get amount';
              }
              switch(d.type) {
                case 'code':
                  var val = plumb.discounts.getDiscountOrderValue(d, scope.cart);
                  if(!val) {
                    return 'Code is expired or invalid for this discount';
                  }
                  return 'Amount: ' + $filter('currency')(val / 100);
                  break;
                case 'gift-card':
                  if(d.amount) {
                    return 'Amount: ' + $filter('currency')(d.amount / 100);
                  }
                  return 'Amount: ' + $filter('currency')(d.amount / 100);
                  break;
              }
            };

            scope.toggleDetail = function() {
              scope.showDetail = !scope.showDetail;
            };

            scope.resetForms();
          }
        }
      }])
      .directive('codeInput', [function() {
        return {
          restrict: 'A',
          require: 'ngModel',
          link: function(scope, element, attrs, ctrl) {
            ctrl.$parsers.push(function(data) {
              if(!data) {
                return data;
              }

              var dataArr = data.toUpperCase().replace(/-/g, '').split('');
              var copy = dataArr.slice(0);
              for(var i = 0; i < dataArr.length; i++) {
                if(i > 0 && i % 4 === 0) {
                  copy.splice(i + (i / 4)-1, 0, '-');
                }
              }
              var newData = copy.join('');

              if(newData !== data) {
                ctrl.$setViewValue(newData);
                ctrl.$render();
              }

              return newData.replace(/-/g, '');
            });

            ctrl.$formatters.push(function(data) {
              if(!data) {
                return data;
              }
              var dataArr = data.toUpperCase().split('');
              var copy = dataArr.slice(0);
              for(var i = 0; i < dataArr.length; i++) {
                if(i > 0 && i % 4 === 0) {
                  copy.splice(i + (i / 4)-1, 0, '-');
                }
              }
              return copy.join('');
            });
          }
        }
      }]);

    if(w.PLUMB_CONFIG) {
      // we are using plumb from an embed standpoint
      /*
      if(!w.PLUMB_CONFIG.integrated) {
        w[PLUMB_CONFIG.ANGULAR].injector(['ng', 'PlumbApp']).invoke(['$compile', '$rootScope', 'plumb', 'plumbConfig', 'plumbMenuService', function ($compile, $rootScope, plumb, plumbConfig, plumbMenuService) {
          var body = w[PLUMB_CONFIG.ANGULAR].element(d).find('body');
          if (plumbConfig.accessToken) {
            body.append('<plumb-menu></plumb-menu>');
          }
          var injectors = w[PLUMB_CONFIG.ANGULAR].element(d).injector();
          if(!d.querySelectorAll('[ng-app]').length && !injectors) {
            w[PLUMB_CONFIG.ANGULAR].bootstrap(body[0], ['PlumbApp']);
          }
        }]);
      }
      */
      if(typeof w.PLUMB_CONFIG.GOOGLE_FONTS === 'undefined' || w.PLUMB_CONFIG.GOOGLE_FONTS === true) {
        w.WebFontConfig = {
          google: { families: [ 'Questrial::latin', 'Material+Icons' ] }
        };
        (function () {
          var wf = document.createElement('script');
          wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
            '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
          wf.type = 'text/javascript';
          wf.async = 'true';
          var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(wf, s);
        })();
      }
    }

    w.initialize = function() {
      // for Gmaps
      //console.log(w.google);
    };
  }
})(window, document);
