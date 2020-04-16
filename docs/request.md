---
id: request
title: Request
sidebar_label: Request
---

The Request class allows to get the parameters specified in the routes. You can get them, from any funciton or controller.

> **Bundled version**: If you bundle the framework with your Plugin,
> you should prepend your plugin namespace to the **Sci** namespace when referencing framework components.
> For example, if you use the bundled version you should reference the **MyPlugin\Sci\View** class instead of the **Sci\View** class.

## Route Parameters

You can get all route parameters using the `params` method. Thsi method has no parameters:

```php

use Sci\Router\Request;

$parameters =  Request:: params();

```

To get a single parameter you can use the `param` method, which also allows to get a set a default value for the parameter in case it's not possible to find it. It has the next parameters:


* **param <string\>**: The param name used when registering teh route.
* **default <mixed\>**: A value to return in case it's not possible to fint the parameter.

```php
use Sci\Router\Request;

$brand =  Request::param('brand', 'nokia');

```

## Error Page

The request method also allos to return an error page at any time. This code will finish WordPress execution and show the standard 404 not found template. It has one parameter:

* **errorMessage <string\>**: The error message to display. But default it's _'404: Not Found'_.

```php
use Sci\Router\Request;

Request::error('404: It was not possible to get the document.'),

```