---
id: dependencies
title: Dependencies
sidebar_label: Dependencies
---

Dependency management is done through the service container in the same way as in other frameworks. This allows to perform dependency injection and bind interfaces to implementations or class constructors to existing instances.

> **Bundled version**: If you bundle the framework with your Plugin,
> you should prepend your plugin namespace to the **Sci** namespace when referencing framework components.
> For example, if you use the bundled version you should reference the **MyPlugin\Sci\View** class instead of the **Sci\View** class.

## Introduction

The **Container** is usually referenced as the **Service Container**, as it's usually used to inject or bind services to the controllers. An instance of the Container is stored in the core **Sci\Sci** class. You can access the container and all of the methods it includes by just using the `container` method of the **Sci\Sci** class:


```php
namespace MyPlugin;

use Sci\Sci;

# Get Sci instance
$sci = Sci::instance();

# Get container instance
$container = $sci->container();
```

After getting the container instance you will be able to use all the included methods, covered in this section. However, let's learn first an important concept.

The SCI WP Framework container allows to define dependencies in class constructor so the instances of the required dependencies are automatically created. If you are used to use **Dependency Injection (DI)** with other frameworks, then this is exactly the same. However, if you are new to it, it's worth to check this example, as it's easier than it sounds:

```php

namespace MyPlugin\App\Controllers;

use Sci\Controller;
use MyPlugin\App\Services\CarManager;

class CarController extends Controller
{
    # Will contain the CarManager instance
    protected $carManager;

    # We use type in the CarManager dependency
    public function __construct(CarManager $carManager)
    {
        # The CarManager instance is already created
        $this->carManager = $carManager;
    }

    # Use the CarManager to get a car
    public function getCar($carId)
    {
        $car = $this->carManager->get($carId);
        return $car;
    }
}
```

In the previous example we don't need to create a new instance of the CarManager, as we already injected it in as an argument. But how can this happen? the trick is in the `make` method of the Container class. This controller is probably the endpoint of a route which creates an instance of this controller with the make method. Here is an example of a possible route linked to this controller:

```php
namespace MyPlugin;

use Sci\Route;

Route::get('/cars/{carId}', 'MyPlugin\App\Controllers\CarController@getCar');
```

When a petition is sent to the `/cars/{carId}` endpoint, the Route Manger creates a new instance of the **CarController** class using the `make` method, which crates all required instances for the injected dependencies.

## Make Method

The `make` method of the **Sci\Container** class allows to create instances of any class, while creating also instances of the dependencies defined in the constructor.

You can also use the `make` shortcut method included in the **Sci\Sci** class.

### Usage

When using the `make` method, dependency instances are created in a recurring way. That is, if the dependencies have more dependencies, they will also be instantiated when creating them, and so on.

For instance, let's create an instance of the **CarController** class we defined previously:


```php
namespace MyPlugin;

use Sci\Sci;
use MyPlugin\App\Controllers\CarController;

# Get the container instance
$container = Sci::instance()->container();

# The CarManager will be injected
$carController = $container->make(CarController:class);

```

Please note that the result of `CarController:class` statement is equivalent to `'MyPlugin\App\Controllers\CarController'`, so you could also write this code and get the same result:

```php

# The CarManager will be injected
$carController = $container->make('MyPlugin\App\Controllers\CarController');

```

Yu can also do the same using the `make` shortcut method of the **Sci\Sci** class. This method can be used both statically and dynamically. here is an example:

```php
namespace MyPlugin;

use Sci\Sci;
use MyPlugin\App\Controllers\CarController;

# The CarManager will be injected
$carController = Sci::make(CarController:class);

```

### Arguments

You can also send arguments using a second optional parameter of the `make` method. The second parameter should be an array with the name of the parameters as the array keys and the arguments as the array values. Let's modify our **CarController** class accordingly:

```php

namespace MyPlugin\App\Controllers;

use MyPlugin\Sci\Controller;
use MyPlugin\App\Services\CarManager;

class CarController extends Controller
{
  # Will contain the CarManager instance
  protected $carManager;

  # We use type in the CarManager dependency
  public function __construct($brand, CarManager $carManager)
  {
    # The CarManager instance is already created
    $this->carManager = $carManager;
  }

  # Use the CarManager to get a car
  public function getCar($carId)
  {
    $car = $this->carManager->get($carId);
    if ($car) {
      echo($car->model);
    }
  }
}
```

And now imagine that we want to create an instance injecting the required dependencys while sending tha brand as an argument. All you need to do is send the brand in the arguments array:

```php
# The CarManager will be injected
$carController = Sci::make(CarController:class, ['brand' => 'seat']);

```

However, if the parameters follow the correct order, you can skip the paramater names:


```php
# The CarManager will be injected
$carController = Sci::make(CarController:class, ['seat']);

```
For more parameters, just add more elements to the array.

## Class Bindings

Imagine that you want to quickly replace a dependence with a different implementation. Ideally, the dependence would be referenced with an interface in the constructor so we can easily swap it for a different one. We can achieve this with bindings, and the best place to do this are the providers. 

### Closure Binding

You can use the `bind` method of the **Sci\Container** class with a closure where you will return an instance of the requested class. The `bind` also has a shortcut method in the **Sci\Sci** class. You can bind a single implementation:


```php
namespace MyPlugin;

use Sci\Sci;
use MyPlugin\App\Services\Storage;
use MyPlugin\App\Services\CarManager;

# Binding the CarManager inside a provider
Sci::bind(CarManager:class, function() {
    $storage = Sci::make(Storage::class, ['my-storage']);
    return new CarManager($storage);
});


# Get an instance
$instance Sci::make(CarManager::class);

```
The previous function will be executed everytime a **CarManager** instance is crated with the `make` method.

You can also use parameters with the function:

```php
namespace MyPlugin;

use Sci\Sci;
use MyPlugin\App\Services\Storage;
use MyPlugin\App\Services\CarManager;

# Binding the CarManager inside a provider
Sci::bind(CarManager:class, function($text) {
    echo($parameter);
    $storage = Sci::make(Storage::class, ['my-storage']);
    return new CarManager($storage);
});


# Get an instance
$text = 'This text will be printed every time an instance is created with the make method.';
$instance = Sci::make(CarManager::class, [$text]);

```

Or you can bind different implementations of the **CarManager**. For example, you can provide a different implementation based on the environment:

```php
namespace MyPlugin;

use Sci\Sci;
use MyPlugin\App\Services\Storage;
use MyPlugin\App\Services\CarManager;

# Bind the CarManager to a fixed implementation
Sci::bind(CarManager:class, function() {
    if (WP_DEBUG) {
        $storage = Sci::make(Storage::class, ['dev-storage']);
    } else {
        $storage = Sci::make(Storage::class ['my-storage']);
    }
    return new CarManager($storage);
});

```

The previous results can also be achieved by having two service providers, swapping them based in the environment. We will see the providers in depth in the [Providers] (/docs/framework/providers) section.

### Instance Binding

You can bind an interface or a class with a specific instance of the class or interface. To do so, you just need create an instance of the class you want to bind and bind the class with the created instance. Here is an example: 

```php
namespace MyPlugin;

use Sci\Sci;
use MyPlugin\App\Services\CarManager;

$carManager = new CarManager();

# Bind the class with the created instance
Sci::bind(CarManager:class, $carManager);
```

### Method Binding

You can also bind a method of any class. Here we are binding a static method:

```php
namespace MyPlugin;

use Sci\Sci;
use MyPlugin\App\Services\CarManager;

# Bind the class to a static method
Sci::bind(CarManager:class, 'MyPlugin\App\Services\CarManagerCreator::create');
```

And again, you can also use parameters with the method as long as the method accepts them:

```php
namespace MyPlugin;

use Sci\Sci;
use MyPlugin\App\Services\CarManager;

# Bind the class to a static method with parameters
Sci::bind(CarManager:class, 'MyPlugin\App\Services\CarManagerCreator::create');
$instance = Sci::make(CarManager::class, ['text' => 'my-storage']);
```

You can also bind the class to a method of any instance:


```php
namespace MyPlugin;

use Sci\Sci;
use MyPlugin\App\Service
use MyPlugin\Test\Services\TestServiceCreator;

$testServiceCreator = new TestServiceCreator();

# Bind the class to a instance method with parameters
Sci::bind(CarManager:class, [$testServiceCreator, 'createInstance']);

$instance = Sci::make(CarManager::class, ['text' => 'my-storage']);
```
You don't even need to create the class, as the container will try to create an instance of the called class if the used method is not static:


```php
namespace MyPlugin;

use Sci\Sci;
use MyPlugin\App\Service
use MyPlugin\Test\Services\TestServiceCreator;

# Bind the class to a non static method with parameters
Sci::bind(CarManager:class, [TestServiceCreator::class, 'createInstance']);

# The constructor will be called in the background
$instance = Sci::make(CarManager::class, ['text' => 'my-storage']);
```

## Singleton Binding
You can bind a singleton if you want to bind a single instance of any class in your plugin. This will allow to have just one instance of a class. Ideally, you should define singletons using the `singleton` container method:

### Class Singleton

You can force the creation of one instance of a class using the `singleton` method with just the class as a paremeter:

```php
namespace MyPlugin;

use Sci\Sci;
use MyPlugin\App\Services\CarManager;

# Once created, always return the same instance
Sci::singleton(CarManager:class);

# We create an instance
Sci::make('\MyPlugin\App\Services\SingletonService', 'text' => 'my-storage');

# And if we try to create another instance, the previous instance will be returned. The new parameters are not useful any more.
Sci::make('\MyPlugin\App\Services\SingletonService', 'text' => 'my-other-storage');
```

### Closure Binding

Here we bind a method. The binded method will just be executed one time. For subsequent calls, the first created instance will be returned:

```php
namespace MyPlugin;

use Sci\Sci;
use MyPlugin\App\Services\Storage;
use MyPlugin\App\Services\CarManager;

# Always return the same instance
Sci::singleton(CarManager:class, function($text) {
    $storage = Sci::make(Storage::class, [$text]);
    return new CarManager($storage);
});

$carManager = Sci::make(CarManager:class, 'my-other-storage');

```

### Instance Binding

You can also bind an instance to be resolved with the singleton method. To bind an instance:

```php
namespace MyPlugin;

use Sci\Sci;
use MyPlugin\App\Services\CarManager;


# Create an instance of the CarManager
$carManager = Sci::make(CarManager::class, ['text' => 'my-storage']);

# Bind the instance with the class
Sci::singleton(CarManager:class, $carManager);

# The instance with the new parameters will not be created, as the first created instance will be returned instead
$carManager = Sci::make(CarManager:class, ['text' => 'my-other-storage']]);

```

### Method Binding

Using the `singleton` method you can also bind any method. Here we are binding a static method:

```php
namespace MyPlugin;

use Sci\Sci;
use MyPlugin\App\Services\CarManager;

# Bind the class to a static method
Sci::singleton(CarManager:class, 'MyPlugin\App\Services\CarManagerCreator::create');
```

And again, you can also use parameters with the method as long as the method accepts them:

```php
namespace MyPlugin;

use Sci\Sci;
use MyPlugin\App\Services\CarManager;

# Bind the class to a static method with parameters
Sci::singleton(CarManager:class, 'MyPlugin\App\Services\CarManagerCreator::create');
$instance = Sci::make(CarManager::class, ['text' => 'my-storage']);
```

You can also bind the class to a method of any instance:


```php
namespace MyPlugin;

use Sci\Sci;
use MyPlugin\App\Service
use MyPlugin\Test\Services\TestServiceCreator;

$testServiceCreator = new TestServiceCreator();

# Bind the class to a instance method with parameters
Sci::singleton(CarManager:class, [$testServiceCreator, 'createInstance']);

$instance = Sci::make(CarManager::class, ['text' => 'my-storage']);
```
You don't even need to create the class, as the container will try to create an instance of the called class if the used method is not static:


```php
namespace MyPlugin;

use Sci\Sci;
use MyPlugin\App\Service
use MyPlugin\Test\Services\TestServiceCreator;

# Bind the class to a non static method with parameters
Sci::singleton(CarManager:class, [TestServiceCreator::class, 'createInstance']);

# The constructor will be called in the background
$instance = Sci::make(CarManager::class, ['text' => 'my-storage']);
```

## Interface Binding

Imagine that you want to inject an interface and easily swap it with different implementations. You can also use the ```bind``` method to bind the interface to a specific implementation. For example, this is useful when we want o return different implementations based on any environment variable. Here is an example:

```php
namespace MyPlugin;

use Sci\Sci;
use MyPLugin\App\Services\IMotorService;
use MyPLugin\App\Services\MyMotorService;

# Bind the IMotorService interface to the AcmeMotorService implementation
$container->bind(IMotorService::class, MyMotorService::class);
```
Once the interface is binded, everytime the **IMotorService** is requested as an dependency, the **MyMotorService** implementation will be injected.

## Instance Actions

The service container allows to add and execute a set of custom actions when a new instance of an object is created. You can add actions using the ```created``` method. Here are the parameters supported by the ```created``` method:

* **class <string\>**: The class to add the action.
* **action <string\>**: This is the function to be executed when an instance is created.

This action will be executed immediately after the container creates an instance of the specified class. Here is an example of how to bind an action to the creation event of a class:

```php
namespace MyPlugin;

use Sci\Sci;
use MyPLugin\App\Services\MotorService;

# Action executed when an instance of the MotorService class is created
Sci::created(MotorService::class, function ($object, $sci) { /* ... */ });
```

This action will be executed when the instance is created. The function used can have a two optional arguments. The first one is the object which was just created, and the second one an instance of the **_Sci_** class. You can add more custom parameters after those.

```php
namespace MyPlugin;

use Sci\Sci;
use MyPLugin\App\Services\MotorService;

# You can add more paramters after the default ones
Sci::created(MotorService::class, function ($object, $sci, $customParameter = 'value') { /* ... */ });
```