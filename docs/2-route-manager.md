---
id: sciwp-route-manager
title: Route Manager
sidebar_label: Route Manager
---

With Sciwp you can define routes in the same way you would define them with any other framework. The routes usually match a file, a function or a controller's class method, which is in charge of parsing the incoming data and provide a response.

Routes can can answer to one or many REST methods. You can aslo create an API with different endpoints or just return a standard HTTP response, both synchronous or asynchronous.

The **_Sci\Route_** class stores all data needed for a route definition, including the route expression, the parameters and matching action that will be executed with the defined parameters when the browser route matches the specified route.

## Creating Routes

To create a new route you can just use the **_create_** static method  of the **_Sci\Route_** class.  The create method accepts the following parameters:

* **method (string|array)**: This is the request method for this route. You can specify ```'get'```, ```'post'```, ```'put'```, ```'patch'```, ```'delete'``` and ```'options'``` as values for this parameter. You can also specify an array of values in case you want the route to answer more than one method. If you want the route to answer all HTTP methods, just use ```'any'```.

* **route (string)**: This is the route definition, which is relative to the web domain. You can specify parameters between braces. You will then be able to use these parameters in the function or controller method defined as the action. It's possible to specify restrinctions for these parameters if you write a vertical bar just after the last character of the parameter name, followed by a regular expression.

* **action (mixed)**: This is the function, class method or file which will be called when the request matches the route expression. You can specify files, callback functions and class methods.

Here is an example of how to create a route using the **_create_** static method:

```php
namespace MyPlugin;

use MyPlugin\Sci\Route;
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

use MyPlugin\Sci\Route;
use MyPlugin\App\Models\Article;

Route::create('delete', '/news/{permalink}', function($permalink) {
  # Getting an article from the database
  $article = Article::findOne('permalink', $permalink);

  # Deleting the article
  $article->remove();
});
```
### Route expression

When creating a route using the **_create_** static method pf the Route class, you must specify the matching route using the second parameter. You can specify static routes or add different parameters. 

#### Creating a Static Route

Static routes have no parameters. Here is an example of a static route which will answer to the request **_/news_**:

```php
namespace MyPlugin;

use MyPlugin\Sci\Route;

Route::create('get', '/news', function() { /*... */ });
```

#### Creating a Dynamic Route

You can specify dynamic parameters or variables between braces. The next  example will answer to the get requests **_/cars/seat_**, **_/cars/ford_** and **_/cars/any-model_**.

```php
namespace MyPlugin;

use MyPlugin\Sci\Route;

Route::create('get', '/cars/{model}', function($model) { /*... */ });
```

You can add all parameters you want:
```php
namespace MyPlugin;

use MyPlugin\Sci\Route;

Route::create('get', '/cars/{make}/{model}', function($make, $model) { /*... */ });
```


#### Creating a Route With Optional Parameters

To make a parameter optional, just append a question mark after it. In the next example, the route will answer to both the requests **_/cars_** and **_/cars/any-car_**.


```php
namespace MyPlugin;

use MyPlugin\Sci\Route;

# If the model is not set, it will default to false
Route::create('get', '/cars/{model?}', function($model = false) { /*... */ });
```

#### Parameter Restrictions

It's also possible to set some conditions for the specified parameters in the route definitions using a regular expression. For example, you might want to limit the format of the parameter to the letters which go from **_a_** to **_z_** and also limit the parameter to 10 characters length. To do so, you would write the regular expression after the parameter name, separated with a vertical bar:


```php
namespace MyPlugin;

use MyPlugin\Sci\Route;

Route::create('get', '/cars/{model|[a-z]{10}}', function($model) { /*... */ });
```

#### Parameter Restrictions with a Where Clause

Another way to define parameter requirements is to use a where clause after the route definition, so the previous example is equivalent to this one:
```php
namespace MyPlugin;

use MyPlugin\Sci\Route;

$routeManager->route('get', '/cars/{make}',  function($model) { /*... */ })->where('make', '[a-z]{10}');
```

You also specify additional where clauses:

```php
namespace MyPlugin;

use MyPlugin\Sci\Route;

Route::create('get', '/cars/{make}/{model}', function($model, $model) { /*... */ })->where('make', '[a-z]{10}')->where('model', '[a-z0-9]{10}');
```

### Route Actions

The action is the third parameter you need to create a route, and is the function or method which will be executed. You can specify a function, a method or a file to include.

#### Using a Function as an Action

This is the action type of the previous examples. If you want the route to use a function, you can add in in this way:
```php
namespace MyPlugin;

use MyPlugin\Sci\Route;

Route::create('get', '/cars/{make}/{model}', function($make, $model) {
  echo('Make: ' . $make . ' | Model: ' . $model);
});
```

You can also define **default values** for the parameters. If a parameter is optional, don't forget to specify a default value for it in the function definition:

```php
namespace MyPlugin;

use MyPlugin\Sci\Route;

Route::create('get', '/cars/{make}/{model?}', function($make, $model = 'general') {
  echo('Make: ' . $make . ' | Model: ' . $model);
});
```

Although is not common when using spare functions, it's also possible to **inject dependencies**. An instance of the dependency will be created and sent to the defined function as an argument:

```php
namespace MyPlugin;

use MyPlugin\Sci\Route;

Route::create('get', '/news/{permalink}', function($permalink, \WP_REST_Request $request) {
  echo('News Permalink: ' . $permalink);
});
```

#### Using a Method as an Action

You can specify a class method formatted as **_class@method_**. You can use the request object to get the parameters or specify them in the definition of the class method.

```php
namespace MyPlugin;

use MyPlugin\Sci\Route;

Route::create('get', '/cars/{make}/{model}', 'MyPlugin\App\Controller\Cars@showCar');
```

In the previous example, a new instance of the class **_Cars_** will be created when a user access the matching route, and the **_showCar_** method will be called on that instance. A new instance of the specified class will always be created unless the singleton pattern is used. As in the case of functions, you need to define the matching route parameters you want get get into the controller method definition.

You can inject dependencies into the controller constructor. This is can example of how you can define dependencies:

```php
namespace  MyPlugin\App\Controllers;

use MyPlugin\App\Services\Cars

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

use MyPlugin\Sci\Route;

Route::create('get', '/cars/{make}/{model}', 'MyPlugin\App\Controller\Cars@showCarStaticMethod');
```

Please note that the actions defined with the _class::method_ actions just work when referencing a static method.

#### Using a File as an Action

It's also possible to use use a file as an action. When a user access the matching route, the the specified file will be include. You must specify the full path of the file. Here is an example:

```php
namespace MyPlugin;

use MyPlugin\Sci\Route;
use MyPlugin\Sci\Manager\PluginManager;

$myPlugin = PluginManager::instance()->get('myplugin');

Route::create('get', '/cars/{make}/{model}', $myPlugin->getDir() . '/app/files/actionFile.php');
```

### Where Clauses

When creating a route it's also possible to specify parameter restrictions usin a where clause.

#### Single Where Clause

which includes the next parameters:

* **parameterName (string)**: The parameter that you want to apply the restriction.
* **regularExpression (mixed)**: The regular expression.

In the next exmaple we restrict the **_make_** parameter tu include just characters in the range _a-z_ and we also limit the parameter length to have from _1_ to _10_ characters:


```php
namespace MyPlugin;

use MyPlugin\Sci\Route;

Route::create('get', '/cars/{make}', 'MyPlugin\App\Controller\Cars@view')->where('make', '[a-z]{1,10}');
```

#### Multiple Where Clauses

It's also possible to concatenate many where clauses:

```php
namespace MyPlugin;

use MyPlugin\Sci\Route;

Route::create('get', '/cars/{make}/{model}', 'MyPlugin\App\Controller\Cars@view')->where('make', '[a-z]{10}')->where('model', '[a-z0-9]{1,10}');
```
Or you can also write it in this way to avoid long lines of code:

```php
namespace MyPlugin;

use MyPlugin\Sci\Route;

$myRoute = Route::create('get', '/cars/{make}/{model}', 'MyPlugin\App\Controller\Cars@view');
$myRoute->where('make', '[a-z]{10}');
$myRoute->where('model', '[a-z0-9]{1,10}');
```

The **_where_** method also accepts an array of where clauses formatted as **_'parameter' => $expression_**, so the previous code could be rewritten in this way:

```php
namespace MyPlugin;

use MyPlugin\Sci\Route;

$myRoute = Route::create('get', '/cars/{make}/{model}', 'MyPlugin\App\Controller\Cars@view');
$myRoute->where(['make' => '[a-z]{10}', 'model' => '[a-z0-9]{1,10}']);
```

## Registering Routes

It's not enough to create routes. Before you are able to access them, route instances must be registered into the Plugin Manager. The **\Sci\Route** class already includes the hability to interact with the Route Manager, so to register a route you just need to call the **_register_** method. The **_register_** method accepts the following parameters:

* **routeId (string)**: This is an optional parameter which will allow to easily retrieve routes from the Route Manager. It's useful when you want other plugin creators to extend your plugin.

Here is how you would create and register a route:

```php
namespace MyPlugin;

use MyPlugin\Sci\Route;

# Create a new route and register the instance
Route::create('get', '/cars/{make}/{model}', 'MyPlugin\App\Controllers\Car@showCar')->register('car_model');
```
**Explanation**: The **_create_** static method returns a **_Route_** instance, so it's possible to use the **_register_** method with the output.

## Shortcut Methods

The Route class includes short methods for the available HTTP request methods so you don't need to use this parameter, writing less code.

###  Get Method

You can use the **_get_** method of the **_Sci\Route_** class to create a GET endpoint. Here is an example:

```php
namespace MyPlugin;

use MyPlugin\Sci\Route;

Route::get('/cars', 'MyPlugin\App\Controllers\Cars@getCar');
```

### Post Method

You can use the **_post_** method of the **_Sci\Route_** class to create a POST endpoint. Here is an example:

```php
namespace MyPlugin;

use MyPlugin\Sci\Route;

Route::post('/cars', 'MyPlugin\App\Controllers\Cars@createCar');
```

### Put Method

You can use the **_put_** method of the **_Sci\Route_** class to create a PUT endpoint. Here is an example:

```php
namespace MyPlugin;

use MyPlugin\Sci\Route;

Route::get('/cars/{carId}', 'MyPlugin\App\Controllers\Cars@updateCar');
```

### Patch Method

You can use the **_patch_** method of the **_Sci\Route_** class to create a PATCH endpoint. Here is an example:

```php
namespace MyPlugin;

use MyPlugin\Sci\Route;

Route::get('/cars/{carId}', 'MyPlugin\App\Controllers\Cars@patchCar');
```

### Delete Method

You can use the **_delete_** method of the **_Sci\Route_** class to create a DELETE endpoint. Here is an example:

```php
namespace MyPlugin;

use MyPlugin\Sci\Route;

Route::get('/cars/{carId}', 'MyPlugin\App\Controllers\Cars@deleteCar');
```

### Options Method

You can use the **_options_** method of the **_Sci\Route_** class to create a OPTIONS endpoint. Here is an example:

```php
namespace MyPlugin;

use MyPlugin\Sci\Route;

Route::get('/cars', 'MyPlugin\App\Controllers\Cars@getOptions');
```




















```
use Wormvc\Wormvc\Manager\RouteManager;

$routeManager = RouteManager::instance();
$routeManager->route('get', '/blog/{permalink|[a-z]{20}}', 'Wormvc\App\Controller\Blog@view');
```


You can create a new route using the **route** method of the **Template Manager**. The first parameter is the request method, the second parameter is the route and the third parameter is the action to execute, which can be a method, a function or a file.

There ware more ways of creating routes. You can create a new instance of the **Route** class and then register it into the **Route Manager**:

```
use Wormvc\Wormvc\Manager\RouteManager;
use Wormvc\Wormvc\Route;

$new_route = new Route('get', '/blog/{permalink|[a-z]{20}}', 'Wormvc\App\Controller\Blog@view');

$routeManager = RouteManager::instance();
$routeManager->registerRoute($new_route);
```



## Defining Routes

To create a new route you need to use the route manager, which is also called router. Here is an example of how to create a route using the route method, which will create a new route and register it into the **route manager**:

```
use Wormvc\Wormvc\Manager\RouteManager;

$routeManager = RouteManager::instance();
$routeManager->route('get', '/blog/{permalink|[a-z]{20}}', 'Wormvc\App\Controller\Blog@view');
```
You can create a new route using the **route** method of the **Template Manager**. The first parameter is the request method, the second parameter is the route and the third parameter is the action to execute, which can be a method, a function or a file.

There ware more ways of creating routes. You can create a new instance of the **Route** class and then register it into the **Route Manager**:

```
use Wormvc\Wormvc\Manager\RouteManager;
use Wormvc\Wormvc\Route;

$new_route = new Route('get', '/blog/{permalink|[a-z]{20}}', 'Wormvc\App\Controller\Blog@view');

$routeManager = RouteManager::instance();
$routeManager->registerRoute($new_route);
```

### Request methods

When creating a route, the first parameter indicates the request method, which can be **get**, **post**, **put**, **patch** or **delete**. You can also specify an **array of request methods** so the endpoint answers to more than one methods, or use **any** for the endpoint to answer all request methods.

For example, if you want to specify a delete method which will be in charge of deleting posts, the route might be the next one:

```
$routeManager->route('delete', '/blog/{permalink|[a-z]{20}}', 'Wormvc\App\Controller\Blog@delete');
```

### Route expression

When creating a route using the route method of the route manager, you must specify the matching route using the second parameter. You can specify static routes like the next one, which is supposed to provide the same result when accessing the the URL:

```
$routeManager->route('get', '/a-simple-route', 'Wormvc\App\Controller\Simple@show');
```
In the previous example, the route will answer to the get request _/a-simple-route_.

You can also specify dynamic parameter or variable between braces. 
```
$routeManager->route('get', '/cars/{model}', 'Wormvc\App\Controller\Cars@view');
```

To give an example, the previous example will answer to the get request _/cars/seat_, _/cars/ford_ and _/cars/any-model_.

To make a parameter optional, just append a question mark after it:

```
$routeManager->route('get', '/cars/{model?}', 'Wormvc\App\Controller\Cars@view');
```
Now the route will answer to the requests _/cars_ and _/cars/any-car_.

It's also possible to set some conditions for the specified parameters in the route definitions using a regular expression. For example, you might want to limit the format of the model name to the letters which go from a to z and also limit the model length to 10 characters. To do so, you would write the regular expression after the variable name, separated with a vertical bar:

```
$routeManager->route('get', '/cars/{model|[a-z]{10}', 'Wormvc\App\Controller\Cars@view');
```

Another way to define parameter requirements is to use a where clause after the route definition, so the previous example is equivalent to this one:
```
$routeManager->route('get', '/cars/{make}', 'Wormvc\App\Controller\Cars@view')->where('make', '[a-z]{10}');
```

You also specify additional where clauses:

```
$routeManager->route('get', '/cars/{make}/{model}', 'Wormvc\App\Controller\Cars@view')->where('make', '[a-z]{10}')->where('model', '[a-z0-9]{10}');
```

### Actions

The action is the third parameter you need to define a route, and is the function or method which will be executed. You can specify a function, a method or a file:

If you want the route to use a function, you can add in in this way:
```
$routeManager->route('get', '/cars/{make}/{model}', function($make, $model) {
  echo('Make: ' . $make . ' | Model: ' . $model);
});
```
You can also specify a method of a class formatted as _class@method_. You can use the request object to get the parameters or specify them in the definition of the class method.

```
$routeManager->route('get', '/cars/{make}/{model}', 'App\Controller\Car@showCar');
```

In the previous example, a a new instance of the class Car will be created when a user access the matching route, and the showCar method will be called. An new instance of the specified class will always be created unless the singleton pattern or the included Singleton trait is used. If you call a static method using the _class@method_ action format, a the new instance will also be created.

If you just want to execute a static method of a class without creating a new instance, you can define the action using the _class::method_ format. Here is an example:

```
$routeManager->route('get', '/cars/{make}/{model}', 'App\Controller\Car@showCarStaticMethod');
```

Please note that the actions defined with the _class::method_ actions just work when referencing a static method.

it's also possible to use use a file as an action. When a user access the matching route, the the specified file will be include. You must specify the full path of the file. Here is an example:

```
$routeManager->route('get', '/cars/{make}/{model}', $plugin->getDir().'/app/files/actionFile.php');
```

And this has covered all aspects related to the Route Manager.
