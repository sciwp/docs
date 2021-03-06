---
id: routes
title: HTTP Routes
sidebar_label: HTTP Routes
---

With Sciwp you can define routes in the same way you would define them with any other framework. The routes usually match a file, a function or a controller's class method, which is in charge of parsing the incoming data and provide a response.

> **Bundled version**: If you bundle the framework with your Plugin,
> you should prepend your plugin namespace to the **Sci** namespace when referencing framework components.
> For example, if you use the bundled version you should reference the **MyPlugin\Sci\View** class instead of the **Sci\View** class.

Routes can answer to one or many REST methods, returning just a standard HTTP response, wether synchronous or asynchronous.

The **Sci\Routes\Route** class stores all data needed for a route definition, including the route expression, the parameters and the matching action that will be executed with the defined parameters when the browser route matches the specified route.

## Creating Routes

To create a new route you can just use the `create` static method  of the *Sci\Route* class. The create method accepts the following parameters:

* **method <string|array\>**: This is the request method for this route. You can specify `'get'`, `'post'`, `'put'`, `'patch'`, `'delete'` and `'options'` as values for this parameter. You can also specify an array of values in case you want the route to answer more than one method. If you want the route to answer all HTTP methods, just use `'any'`.

* **route <string\>**: This is the route definition, which is relative to the web domain. You can specify parameters between braces. You will then be able to use these parameters in the function or controller method defined as the action. It's possible to specify restrinctions for these parameters if you write a vertical bar just after the last character of the parameter name, followed by a regular expression.

* **action <mixed\>**: This is the function, class method or file which will be called when the request matches the route expression. You can specify files, callback functions and class methods.

Here is an example of how to create a route using the `create` static method:

```php
namespace MyPlugin;

use Sci\Router\Route;
use MyPlugin\App\Models\Article;

Route::create('get', '/news/{permalink}', function($permalink) {
  # Getting the article from the database
  $article = Article::find($permalink);
});
```

### Request method

When creating a route, the first parameter indicates the request method, which can be **get**, **post**, **put**, **patch**, **delete** or **options**. You can also specify an **array of request methods** so the endpoint answers to more than one methods, or use **any** for the endpoint to answer all request methods.

For example, if you want to specify a route which will call a function in charge of deleting a news article, the route might be the next one:

```php
namespace MyPlugin;

use Sci\Router\Route;
use MyPlugin\App\Models\Article;

Route::create('delete', '/news/{permalink}', function($permalink) {
  # Getting an article from the database
  $article = Article::findOne('permalink', $permalink);

  # Deleting the article
  $article->remove();
});
```
### Route expression

When creating a route using the `create` static method of the Route class, you must specify the matching route using the second parameter. You can specify static routes or add different parameters. 

#### Creating a Static Route

Static routes have no parameters. Here is an example of a static route which will answer to the request **_/news_**:

```php
namespace MyPlugin;

use Sci\Router\Route;

Route::create('get', '/news', function() {
  /*... */
});
```

#### Creating a Dynamic Route

You can specify dynamic parameters or variables between braces. The next example will answer to the get requests **_/cars/seat_**, **_/cars/ford_** and **_/cars/any-model_**.

```php
namespace MyPlugin;

use Sci\Router\Route;

Route::create('get', '/cars/{model}', function($model) {
  /*... */
});
```

You can add all parameters you want:

```php
namespace MyPlugin;

use Sci\Router\Route;

Route::create('get', '/cars/{make}/{model}', function($make, $model) {
  /*... */
});
```

#### Creating a Route With Optional Parameters

To make a parameter optional, just append a question mark after it. In the next example, the route will answer to both the requests **_/cars_** and **_/cars/any-car_**.


```php
namespace MyPlugin;

use Sci\Router\Route;

# If the model is not set, it will default to false
Route::create('get', '/cars/{model?}', function($model = false) {
  /*... */
});
```

#### Parameter Restrictions

It's also possible to set some conditions for the specified parameters in the route definitions using a regular expression. For example, you might want to limit the format of the parameter to the letters which go from **_a_** to **_z_** and also limit the parameter to 10 characters length. To do so, you would write the regular expression after the parameter name, separated with a vertical bar:


```php
namespace MyPlugin;

use Sci\Router\Route;

Route::create('get', '/cars/{model|[a-z]{10}}', function($model) {
  /*... */
});
```

#### Parameter Restrictions with a Where Clause

Another way to define parameter requirements is to use a where clause after the route definition, so the previous example is equivalent to this one:
```php
namespace MyPlugin;

use Sci\Router\Route;;

$routeManager->route('get', '/cars/{make}',  function($model) {
  /*... */
})->where('make', '[a-z]{10}');
```

You also specify additional where clauses:

```php
namespace MyPlugin;

use Sci\Router\Route;;

Route::create('get', '/cars/{make}/{model}', function($model, $model) {
  /*... */
})->where('make', '[a-z]{10}')->where('model', '[a-z0-9]{10}');
```

### Route Actions

The action is the third parameter you need to create a route, and is the function or method which will be executed. You can specify a function, a method or a file to include.

#### Using a Function as an Action

This is the action type of the previous examples. If you want the route to use a function, you can add in in this way:
```php
namespace MyPlugin;

use Sci\Router\Route;;

Route::create('get', '/cars/{make}/{model}', function($make, $model) {
  echo('Make: ' . $make . ' | Model: ' . $model);
});
```

You can also define **default values** for the parameters. If a parameter is optional, don't forget to specify a default value for it in the function definition:

```php
namespace MyPlugin;

use Sci\Router\Route;;

Route::create('get', '/cars/{make}/{model?}', function($make, $model = 'general') {
  echo('Make: ' . $make . ' | Model: ' . $model);
});
```

Although is not common when using spare functions, it's also possible to **inject dependencies**. An instance of the dependency will be created and sent to the defined function as an argument:

```php
namespace MyPlugin;

use Sci\Router\Route;;
use MyPlugin\App\Services\Link;

Route::create('get', '/news/{permalink}', function($permalink, Link $link)) {
  echo('News Permalink: ' . $permalink);
});
```

#### Using a Method as an Action

You can specify a class method formatted as **_class@method_**. You can use the request object to get the parameters or specify them in the definition of the class method.

```php
namespace MyPlugin;

use Sci\Router\Route;;

Route::create('get', '/cars/{make}/{model}', 'MyPlugin\App\Controller\Cars@showCar');
```

In the previous example, a new instance of the class `Cars` will be created when a user access the matching route, and the `showCar` method will be called on that instance. A new instance of the specified class will always be created unless the singleton pattern is used. As in the case of functions, you need to define the matching route parameters you want get get into the controller method definition.

You can inject dependencies into the controller constructor. This is can example of how you can define dependencies:

```php
namespace  MyPlugin\App\Controllers;

use MyPlugin\App\Services\Cars;

class Cars
{
  private $carsService;
  
  public function __construct(Cars $carsService)
  {
    $this->carsService = $carsService;
  }
  
  public function showCar($make, $model)
  {
    $car = $this->carsService->getCar($make, $model);

    if ($car) echo('My car is a:' . $car->make . ' ' . $car->model);
    else echo('The requested car does not exist');
  }    
}
```

If you call a **static method** using the **_class@method_** action format, a the new instance will be created in any case.

#### Using a Static Method as an Action

If you just want to execute a **static method** of a class without creating a new instance, you can define the action using the **_class::method_** format. Here is an example:

```php
namespace MyPlugin;

use Sci\Router\Route;;

Route::create('get', '/cars/{make}/{model}', 'MyPlugin\App\Controller\Cars::showCarStatic');
```

Please note that the actions defined with the form _class::method_ just work when referencing a static method. No class instance will be created.

#### Using a File as an Action

It's also possible to use use a file as an action. When a user access the matching route, the the specified file will be include. You must specify the full path of the file. Here is an example:

```php
namespace MyPlugin;

use Sci\Router\Route;;
use Sci\Plugin\Managers\PluginManager;

$myPlugin = PluginManager::instance()->get('myplugin');

Route::create('get', '/cars/{make}/{model}', $myPlugin->getDir() . '/app/files/actionFile.php');
```

## Request Methods

The Route class includes short methods for the available HTTP request methods so you don't need to use this parameter, writing less code. You can match all available request methods using the **_any_** method of the **_Sci\Route_** class. Here is an example:

```php
namespace MyPlugin;

use Sci\Router\Route;;

Route::any('/cars', 'MyPlugin\App\Controllers\Cars@getCar');
```
The _getCar_ method of the _Cars_ class will be called regardless of the request method. it's also possible to specify a specific method using one of the specific methods.

###  Get Method

You can use the **_get_** method of the **_Sci\Route_** class to create a GET endpoint. Here is an example:

```php
namespace MyPlugin;

use Sci\Router\Route;;

Route::get('/cars', 'MyPlugin\App\Controllers\Cars@getCar');
```

### Post Method

You can use the **_post_** method of the **_Sci\Route_** class to create a POST endpoint. Here is an example:

```php
namespace MyPlugin;

use Sci\Router\Route;;

Route::post('/cars', 'MyPlugin\App\Controllers\Cars@createCar');
```

### Put Method

You can use the **_put_** method of the **_Sci\Route_** class to create a PUT endpoint. Here is an example:

```php
namespace MyPlugin;

use Sci\Router\Route;;

Route::get('/cars/{carId}', 'MyPlugin\App\Controllers\Cars@updateCar');
```

### Patch Method

You can use the **_patch_** method of the **_Sci\Route_** class to create a PATCH endpoint. Here is an example:

```php
namespace MyPlugin;

use Sci\Router\Route;;

Route::get('/cars/{carId}', 'MyPlugin\App\Controllers\Cars@patchCar');
```

### Delete Method

You can use the **_delete_** method of the **_Sci\Route_** class to create a DELETE endpoint. Here is an example:

```php
namespace MyPlugin;

use Sci\Router\Route;;

Route::get('/cars/{carId}', 'MyPlugin\App\Controllers\Cars@deleteCar');
```

### Options Method

You can use the **_options_** method of the **_Sci\Route_** class to create a OPTIONS endpoint. Here is an example:

```php
namespace MyPlugin;

use Sci\Router\Route;;

Route::get('/cars', 'MyPlugin\App\Controllers\Cars@getOptions');
```


## Where Restrictions

When creating a route it's possible to specify parameter restrictions usin a where clause.

### Single Clause

which includes the next parameters:

* **parameterName <string\>**: The parameter that you want to apply the restriction.
* **regularExpression <mixed\>**: The regular expression.

In the next example we restrict the **_make_** parameter to include just characters in the range _a-z_ and we also limit the parameter length to have from _1_ to _10_ characters:


```php
namespace MyPlugin;

use Sci\Router\Route;;

Route::create('get', '/cars/{make}', 'MyPlugin\App\Controller\Cars@view')->where('make', '[a-z]{1,10}');
```

### Multiple Clauses

It's also possible to concatenate many where clauses as long as they make reference to different parameters:

```php
namespace MyPlugin;

use Sci\Router\Route;;

Route::create('get', '/cars/{make}/{model}', 'MyPlugin\App\Controller\Cars@view')->where('make', '[a-z]{10}')->where('model', '[a-z0-9]{1,10}');
```
Or you can also write it in this way to avoid long lines of code:

```php
namespace MyPlugin;

use Sci\Router\Route;;

$myRoute = Route::create('get', '/cars/{make}/{model}', 'MyPlugin\App\Controller\Cars@view');
$myRoute->where('make', '[a-z]{10}');
$myRoute->where('model', '[a-z0-9]{1,10}');
```

The **_where_** method also accepts an array of where clauses formatted as **_'parameter' => $expression_**, so the previous code could be rewritten in this way:

```php
namespace MyPlugin;

use Sci\Router\Route;;

$myRoute = Route::create('get', '/cars/{make}/{model}', 'MyPlugin\App\Controller\Cars@view');
$myRoute->where(['make' => '[a-z]{10}', 'model' => '[a-z0-9]{1,10}']);
```

## Registering Routes

It's not enough to create routes. Before you are able to access them, route instances must be registered into the Route Manager. The **\Sci\Route** class already includes the hability to interact with the Route Manager, so to register a route you just need to call the **_register_** method. The **_register_** method accepts the following parameters:

* **routeId <string\>**: This is an optional parameter which will allow to easily retrieve routes from the Route Manager. It's useful when you want other plugin creators to extend your plugin.

Here is how you would create and register a route:

```php
namespace MyPlugin;

use Sci\Router\Route;;

# Create a new route and register the instance
Route::create('get', '/cars/{make}/{model}', 'MyPlugin\App\Controllers\Car@showCar')->register('car_model');
```
**Explanation**: The **_create_** static method returns a **_Route_** instance, so it's possible to use the **_register_** method with the output.

## Route Configuration

### Layout Options

Routes can be configured so the WordPress header and footer is included or excluded. The header and the footer are included by default. To configure the layout you can use the **_layout_** method of the **_Route_** class. The layout method accepts the following parameter:

* **value <boolean\>**: Set it to true to include both the header and the footer.

The next route will include both the WordPress header and the footer:

```php
namespace MyPlugin;

use Sci\Router\Route;;

$myRoute = Route::create('get', '/blog/{permalink}', 'MyPlugin\App\Controller\Blog@view');
$myRoute->layout(true)->register();

```

Use the **_layout_** method with a **_false_** value to exclude both the WordPress header and footer:

```php
namespace MyPlugin;

use Sci\Router\Route;;

$myRoute = Route::create('get', '/blog/{permalink}', 'MyPlugin\App\Controller\Blog@view');
$myRoute->layout(false)->register();

```

### Sync/Async Routes

Routes are configured by default as synchronous, so they just answer to synchronous requests. You can configure this behaviour by using the **_async_** method of the **_Route_** class. The async method accepts the following parameter:

* **value <boolean\>**: Set it to true for the route to accept asynchronous AJAX requests. Set it to false to accept only synchronous requests.

Here is an example of an asynchronous route:

```php

namespace MyPlugin;

use Sci\Router\Route;;

$myRoute = Route::create('get', '/blog/{permalink}', 'MyPlugin\App\Controller\Blog@view');
$myRoute->async(true)->register();

```

## Route Manager

When you register a route, is registered into the route manager, which is in charge of adding the new permalink structures to WordPress and clearing the permalink cache. The Route Manager is shared among all plugins using SCI WP. To get the Route Manager you just need to get the already created instance.

```php
use Sci\Route\Managers\RouteManager;

$routeManager = RouteManager::instance();
```

If you have already created a route, you can use the **_register_** method of the  **_Sci\Router\Route_** class or also the **_register_** method of the **_Sci\Router\Managers\RouteManager_** class to register it into the **Route Manager**:

```php
use Sci\Router\\Managers\RouteManager;
use Sci\Router\Route;;

$myRoute = Route::create('get', '/blog/{permalink}', 'MyPlugin\App\Controller\Blog@view');

$routeManager = RouteManager::instance();
$routeManager->register($myRoute);
```

And this has covered all aspects related to the Route Manager.
