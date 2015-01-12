# Plumb JSAPI Angular Library

Depends on angular >= 1.2, it will be downloaded at runtime if you are using the script standalone or from www.plummb.com.

# Getting Started

```
bower install plumb-angular --save
```

Add the script to your site

```html
<script src="bower_components/dist/plumb-angular.js"></script>
```

Configure your app

```js
angular.module('ExampleApp', ['plumb'])
  .config(['plumbConfig', function(plumbConfig) {
    plumbConfig.cache = true; // enable caching of data
    plumbConfig.local = false; // set true for local plumb server testing
    plumbConfig.accessToken = 'EFGHIJ123456789'; // get from your Plumb account dashboard
    plumbConfig.mode = 'test' // or live
  }])
```

Use it in another service or controller

```js
angular.module('ExampleApp').controller('TestController', function($scope, plumb) {
  $scope.product_lines = [];
  $scope.products = [];
  
  plumb.session.get(function(err, session) {
    if(err) {
      return console.log(err);
      // handle your error better than that!
    }
    
    plumb.product_lines.list({}, function(err, lines) {
      if(err) {
        return console.log(err);
      }
      
      $scope.product_lines = lines;
      plumb.products.list({conditions: {active: true, category: lines[0].name}}, function(err, products) {
        if(err) {
          return console.log(err);
        }
        
        // do something with products
      });
    });
  });
});
```

# API Documentation

## Sessions

In order to call most of the API functions you must have established a session with Plumb. This session lasts as long as the browser session and will be deleted once the user closes the browser. Server side, the session information can be retained for up to 30 days for use in analytics, lost carts, or incomplete orders.

`plumb.session.get(callback(err, session))`

Performs a GET session. If there is no `Session-Id`, one will be procured if the `Access-Token` is accepted.

`plumb.sessions.save(session, callback(err, session))`

Saves the current session data.

## Cart

`plumb.cart.get(callback(err, cart))`

`plumb.cart.add(product, quantity, callback(err, cart))`

`plumb.cart.update(product, quantity, callback(err, cart))`

`plumb.cart.remove(product, callback(err, cart))`

`plumb.cart.empty(callback(err, cart))`

`plumb.cart.replace(new_cart, callback(err, cart))`

## Authentication

Authentication will create a User with an `Authentication-Key` based on the current API `Access-Token`.

`plumb.auth.login(email, password, callback(err, user))`

`plumb.auth.register(data, callback(err, user))`

`plumb.auth.forgotPassword(email, callback(err, success))`

## Addresses

`plumb.addresses.list(callback(err, addresses))`

`plumb.addresses.create(data, callback(err, address))`

`plumb.addresses.edit(address, callback(err, address))`

`plumb.addresses.remove(address, callback(err, address))`

## Payment Methods

`plumb.payment_methods.list(callback(err, payment_methods))`

`plumb.payment_methods.create(data, callback(err, payment_method))`

`plumb.payment_methods.edit(address, callback(err, payment_method))`

`plumb.payment_methods.remove(address, callback(err, payment_method))`

## Products

`plumb.products.list(options, callback(err, products))`

## Product Lines

`plumb.product_lines.list(options, callback(err, product_lines))`

## Orders

`plumb.orders.list(options, callback(err, orders))`

`plumb.orders.create(data, callback(err, order))`

`plumb.orders.taxes(value, shipment, callback(err, tax))`

## Shipping

`plumb.shipping.rates(data, callback(err, rates)`

data is an object:

```javascript
{
  ship_to: {
    address: {
      address_1: '',
      address_2: '',
      address_3: '',
      city: '',
      state_code: '',
      country_code: '',
      postal_code: ''
    }
  },
  products: <session.data.cart>
}
```

# AngularJS Directives

This Plumb library comes with several AngularJS directives for things like handling the menu widget, product, and product line listings. It also has a useful imager tool for resizing images in the CDN.

## Menu Widget

Should be placed near the ending </body> tag

`<plumb-menu></plumb-menu>`

## Product Widget

`<plumb-product id="'53ff8b2a35ed366c2b939f58'"></plumb-product>`


## Imager

Place anywhere in your project

`<plumb-image src="product.images[0]" options="{size: '300x200'}" alt="product.name"></plumb-image>

Or for a static URL:

`<plumb-image src="'http://mywebsite.com/path/to/image.jpg" options="{size: '300x200'}" alt="product.name"></plumb-image>


# License

The Affero General Public License (AGPL)

Copyright (c) 2014, typefoo a division of uh-sem-blee, Co. (www.uh-sem-blee.com)

This program is free software: you can redistribute it and/or modify it under the terms of the Affero GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the Affero GNU General Public License along with this program. If not, see <http://www.gnu.org/licenses/>.