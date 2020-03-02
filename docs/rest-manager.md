---
id: framework-rest-manager
title: Rest Routes
sidebar_label: Rest Routes
---

With SCIWP you can define REST API routes in the same way you would define standard routes. REST routes usually match a file, a function or a controller's class method, which is in charge of parsing the incoming data and provide a response.

Although they are defined in similar way, standard routes using the **_Sci\Route_** class and REST routes using the **_Sci\Rest_**  class are managed in a different way, and that's way we need a **_Route Manager_** and a **_Rest Manager_**. The reason for this is that, on one hand, WordPress manages standard routes with permalinks and on the other hand, WordPress manages REST routes with a system wich is similar to the way we usually define routes with most PHP frameworks.

REST routes can answer to one or many REST methods, returning a JSON object.

The **_Sci\Rest_** class stores all data needed for a route definition, including the route expression, the parameters and matching action that will be executed with the defined parameters when the requested route matches the specified route.

## Creating Routes

To create a new route you can just use the **_create_** static method  of the **_Sci\Rest_** class. The create method accepts the following parameters:

* **namespace (string)**: The namespace is prepended to the route parameter (the third parameter of this method). The namespace allows to create different versions of the same endpoints.

* **method (string|array)**: This is the request method for this route. You can specify ```'get'```, ```'post'```, ```'put'```, ```'patch'```, ```'delete'``` and ```'options'``` as values for this parameter. You can also specify an array of values in case you want the route to answer more than one method. If you want the route to answer all HTTP methods, just use ```'any'``` as the value.

* **route (string)**: This is the route definition, which is relative to the web domain and goes just after the namespace. You can specify parameters between braces. You will then be able to use these parameters in the function or controller method defined as the action. It's possible to specify restrinctions for these parameters if you write a vertical bar just after the last character of the parameter name, followed by a regular expression.

* **action (mixed)**: This is the function, class method or file which will be called when the request matches the route expression. You can specify files, callback functions and class methods.

Here is an example of how to create a route using the **_create_** static method:

```php
namespace MyPlugin;

use MyPlugin\Sci\Rest;

Rest::create('myplugin/v1', 'get', '/route/{parameter}', function($parameter) { /* ... */ });
```

You can then access the previous API route at, for example: ```mydomain.tld/wp-json/myplugin/v2/route/whatever```.

### Request method

When creating a REST route, the first parameter indicates the request method, which can be **get**, **post**, **put**, **patch**, **delete** or **options**. You can also specify an **array of request methods** so the endpoint answers to more than one methods, or use **any** for the endpoint to answer all request methods.

For example, if you want to specify a route which will call a function in charge of deleting a news article, the route might be the next one:

```php
namespace MyPlugin;

use MyPlugin\Sci\Rest;
use MyPlugin\App\Controllers\Article;

Rest::create('myplugin/v1', 'delete', '/news/{permalink}', function($permalink) {

  # Getting an article from the database
  $article = Article::findOne('permalink', $permalink);

  if ($article) {
    # Delete the article
    $article->remove();

    # Article deleted: Return 204 status
     wp_send_json([ 'message' => 'Article deleted' ], 204);
  }

  # Return an error
  wp_send_json([ 'message' => 'Article not found' ], 404);
});
```

### Route expression

When creating a route using the **_create_** static method of the Rest class, you must specify the matching route using the second parameter. You can specify static routes or add different parameters. 

#### Creating a Static Route

Static routes have no parameters. Here is an example of a static route which will answer to the request **_/news_**:

```php
namespace MyPlugin;

use MyPlugin\Sci\Rest;

Rest::create('myplugin/v1', 'get', '/news', function() { /*... */ });
```

#### Creating a Dynamic Route

You can specify dynamic parameters or variables between braces. The next example will answer to the get requests **_/cars/seat_**, **_/cars/ford_** and **_/cars/any-model_**.

```php
namespace MyPlugin;

use MyPlugin\Sci\Rest;

Rest::create('myplugin/v1', 'get', '/cars/{model}', function($model) { /*... */ });
```

You can add all parameters you want:
```php
namespace MyPlugin;

use MyPlugin\Sci\Rest;

Rest::create('myplugin/v1', 'get', '/cars/{make}/{model}', function($make, $model) { /*... */ });
```


#### Creating a Route With Optional Parameters

To make a parameter optional, just append a question mark after it. In the next example, the route will answer to both the requests **_/cars_** and **_/cars/any-car_**.


```php
namespace MyPlugin;

use MyPlugin\Sci\Rest;

# If the model is not set, it will default to false
Rest::create('myplugin/v1', 'get', '/cars/{model?}', function($model = false) { /*... */ });
```

#### Parameter Restrictions

It's also possible to set some conditions for the specified parameters in the route definitions using a regular expression. For example, you might want to limit the format of the parameter to the letters which go from **_a_** to **_z_** and also limit the parameter to 10 characters length. To do so, you would write the regular expression after the parameter name, separated with a vertical bar:


```php
namespace MyPlugin;

use MyPlugin\Sci\Rest;

Rest::create('myplugin/v1', 'get', '/cars/{model|[a-z]{10}}', function($model) { /*... */ });
```

#### Parameter Restrictions with a Where Clause

Another way to define parameter requirements is to use a where clause after the route definition, so the previous example is equivalent to this one:
```php
namespace MyPlugin;

use MyPlugin\Sci\Rest;

$routeManager->route('myplugin/v1', 'get', '/cars/{make}',  function($model) { /*... */ })->where('make', '[a-z]{10}');
```

You also specify additional where clauses:

```php
namespace MyPlugin;

use MyPlugin\Sci\Rest;

Rest::create('myplugin/v1', 'get', '/cars/{make}/{model}', function($model, $model) { /*... */ })->where('make', '[a-z]{10}')->where('model', '[a-z0-9]{10}');
```

### Route Actions

The action is the third parameter you need to create a route, and is the function or method which will be executed. You can specify a function, a method or a file to include.

#### Using a Function as an Action

This is the action type of the previous examples. If you want the route to use a function, you can add in in this way:
```php
namespace MyPlugin;

use MyPlugin\Sci\Rest;

Rest::create('myplugin/v1', 'get', '/cars/{make}/{model}', function($make, $model) {
    wp_send_json([
      'make' => $make,
      'model' => $model
    ], 200);
});
```

You can also define **default values** for the parameters. If a parameter is optional, don't forget to specify a default value for it in the function definition:

```php
namespace MyPlugin;

use MyPlugin\Sci\Rest;

Rest::create('myplugin/v1', 'get', '/cars/{make}/{model?}', function($make, $model = 'general') {

    wp_send_json([
      'make' => $make,
      'model' => $model
    ], 200);
});
```

Although is not common when using spare functions, it's also possible to **inject dependencies**. An instance of the dependency will be created and sent to the defined function as an argument:

```php
namespace MyPlugin;

use MyPlugin\Sci\Rest;
use MyPlugin\App\Services\Link;

Rest::create('myplugin/v1', 'get', '/news/{permalink}', function($permalink, Link $link) {
  wp_send_json([ 'permalink' => $permalink ], 200);
});
```

#### Using a Method as an Action

You can specify a class method formatted as **_class@method_**. You can use the request object to get the parameters or specify them in the definition of the class method.

```php
namespace MyPlugin;

use MyPlugin\Sci\Rest;

Rest::create('myplugin/v1', 'get', '/cars/{make}/{model}', 'MyPlugin\App\Controller\Cars@showCar');
```

In the previous example, a new instance of the class **_Cars_** will be created when a user access the matching route, and the **_showCar_** method will be called on that instance. A new instance of the specified class will always be created unless the singleton pattern is used. As in the case of functions, you need to define the matching route parameters you want get get into the controller method definition.

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

    if ($car) wp_send_json([ 'data' => $car ], 200);
    else wp_send_json([ 'message' => 'The requested car does not exist' ], 404);
  }    
}
```

If you call a **static method** using the **_class@method_** action format, a the new instance will be created in any case.

#### Using a Static Method as an Action

If you just want to execute a **static method** of a class without creating a new instance, you can define the action using the **_class::method_** format. Here is an example:

```php
namespace MyPlugin;

use MyPlugin\Sci\Rest;

Rest::create('myplugin/v1', 'get', '/cars/{make}/{model}', 'MyPlugin\App\Controller\Cars::showCarStatic');
```

Please note that the actions defined with the form _class::method_ just work when referencing a static method. No class instance will be created.

#### Using a File as an Action

It's also possible to use use a file as an action. When a user access the matching route, the the specified file will be include. You must specify the full path of the file. Here is an example:

```php
namespace MyPlugin;

use MyPlugin\Sci\Rest;
use MyPlugin\Sci\Manager\PluginManager;

$myPlugin = PluginManager::instance()->get('myplugin');

Rest::create('myplugin/v1', 'get', '/cars/{make}/{model}', $myPlugin->getDir() . '/app/files/actionFile.php');
```

## Request Methods

The Rest class includes short methods for the available HTTP request methods so you don't need to use this parameter, writing less code. You can match all available request methods using the **_any_** method of the **_Sci\Rest_** class. Here is an example:

```php
namespace MyPlugin;

use MyPlugin\Sci\Rest;

Rest::any('myplugin/v1', '/cars', 'MyPlugin\App\Controllers\Cars@getCar');
```
The _getCar_ method of the _Cars_ class will be called regardless of the request method. it's also possible to specify a specific method using one of the specific methods.

###  Get Method

You can use the **_get_** method of the **_Sci\Rest_** class to create a GET endpoint. Here is an example:

```php
namespace MyPlugin;

use MyPlugin\Sci\Rest;

Rest::get('myplugin/v1', '/cars', 'MyPlugin\App\Controllers\Cars@getCar');
```

### Post Method

You can use the **_post_** method of the **_Sci\Rest_** class to create a POST endpoint. Here is an example:

```php
namespace MyPlugin;

use MyPlugin\Sci\Rest;

Rest::post('myplugin/v1', '/cars', 'MyPlugin\App\Controllers\Cars@createCar');
```

### Put Method

You can use the **_put_** method of the **_Sci\Rest_** class to create a PUT endpoint. Here is an example:

```php
namespace MyPlugin;

use MyPlugin\Sci\Rest;

Rest::get('myplugin/v1', '/cars/{carId}', 'MyPlugin\App\Controllers\Cars@updateCar');
```

### Patch Method

You can use the **_patch_** method of the **_Sci\Rest_** class to create a PATCH endpoint. Here is an example:

```php
namespace MyPlugin;

use MyPlugin\Sci\Rest;

Rest::get('myplugin/v1', '/cars/{carId}', 'MyPlugin\App\Controllers\Cars@patchCar');
```

### Delete Method

You can use the **_delete_** method of the **_Sci\Rest_** class to create a DELETE endpoint. Here is an example:

```php
namespace MyPlugin;

use MyPlugin\Sci\Rest;

Rest::get('myplugin/v1', '/cars/{carId}', 'MyPlugin\App\Controllers\Cars@deleteCar');
```

### Options Method

You can use the **_options_** method of the **_Sci\Rest_** class to create a OPTIONS endpoint. Here is an example:

```php
namespace MyPlugin;

use MyPlugin\Sci\Rest;

Rest::get('myplugin/v1', '/cars', 'MyPlugin\App\Controllers\Cars@getOptions');
```


## Where Restrictions

When creating a route it's possible to specify parameter restrictions usin a where clause.

### Single Clause

which includes the next parameters:

* **parameterName (string)**: The parameter that you want to apply the restriction.
* **regularExpression (mixed)**: The regular expression.

In the next example we restrict the **_make_** parameter to include just characters in the range _a-z_ and we also limit the parameter length to have from _1_ to _10_ characters:


```php
namespace MyPlugin;

use MyPlugin\Sci\Rest;

Rest::create('myplugin/v1', 'get', '/cars/{make}', 'MyPlugin\App\Controller\Cars@view')->where('make', '[a-z]{1,10}');
```

### Multiple Clauses

It's also possible to concatenate many where clauses as long as they make reference to different parameters:

```php
namespace MyPlugin;

use MyPlugin\Sci\Rest;

Rest::create('myplugin/v1', 'get', '/cars/{make}/{model}', 'MyPlugin\App\Controller\Cars@view')->where('make', '[a-z]{10}')->where('model', '[a-z0-9]{1,10}');
```
Or you can also write it in this way to avoid long lines of code:

```php
namespace MyPlugin;

use MyPlugin\Sci\Rest;

$myRoute = Rest::create('myplugin/v1', 'get', '/cars/{make}/{model}', 'MyPlugin\App\Controller\Cars@view');
$myRoute->where('make', '[a-z]{10}');
$myRoute->where('model', '[a-z0-9]{1,10}');
```

The **_where_** method also accepts an array of where clauses formatted as **_'parameter' => $expression_**, so the previous code could be rewritten in this way:

```php
namespace MyPlugin;

use MyPlugin\Sci\Rest;

$myRoute = Rest::create('myplugin/v1', 'get', '/cars/{make}/{model}', 'MyPlugin\App\Controller\Cars@view');
$myRoute->where(['make' => '[a-z]{10}', 'model' => '[a-z0-9]{1,10}']);
```

## Registering Routes

It's not enough to create routes. Before you are able to access them, route instances must be registered into the Rest Manager. The **\Sci\Rest** class already includes the hability to interact with the Rest Manager, so to register a route you just need to call the **_register_** method. The **_register_** method accepts the following parameters:

* **routeId (string)**: This is an optional parameter which will allow to easily retrieve routes from the Rest Manager. It's useful when you want other plugin creators to extend your plugin.

Here is how you would create and register a route:

```php
namespace MyPlugin;

use MyPlugin\Sci\Rest;

# Create a new route and register the instance
Rest::create('myplugin/v1', 'get', '/cars/{make}/{model}', 'MyPlugin\App\Controllers\Car@showCar')->register('car_model');
```
**Explanation**: The **_create_** static method returns a **_Rest_** route instance, so it's possible to use the **_register_** method with the output.

## Rest Request Object

You can access the WordPress API request object via the **_request_** attribute of the Rest class. The request object is included by defautl with WordPress and includes many useful method to sanitize and get the request paramenters.
```php
namespace MyPlugin;

use MyPlugin\Sci\Rest;
use MyPlugin\App\Controllers\Article;

Rest::create('myplugin/v1', 'delete', '/news/{permalink}', function($permalink) {

  # Get the permalink parameter from the request object
  $permalink = Rest::request()->get_param('permalink');   

});
```

You can find  [more information about the WP_REST_request class here] (https://developer.wordpress.org/reference/classes/wp_rest_request/).

## Rest Manager

When you register a route, is registered into the Rest Manager, which is in charge of adding the new permalink structures to WordPress and clearing the permalink cache. The Rest Manager is shared among all plugins using SCIWP. To get the Rest Manager you just need to get the already created instance.

```php
use MyPlugin\Sci\Manager\RestManager;

$restManager = RestManager::instance();
```

If you have already created a rest route, you can use the **_register_** method of the  **_MyPlugin\Sci\Rest_** class or also the **_register_** method of the **_MyPlugin\Sci\Manager\RestManager_** class to register it into the **Rest Manager**:

```php
use MyPlugin\Sci\Manager\RestManager;
use MyPlugin\Sci\Rest;

$myRoute = Rest::create('myplugin/v1', 'get', '/blog/{permalink}', 'MyPlugin\App\Controller\Blog@view');

$restManager = RestManager::instance();
$restManager->register($myRoute);
```

And this has covered all aspects related to the Rest Manager.
