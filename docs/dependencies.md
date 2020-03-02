---
id: framework-dependencies
title: Dependencies
sidebar_label: Dependencies
---

Dependency management is done through the service container in the same way as in other frameworks. This allows to perform dependency injection and bind interfaces to implementations or class constructors to existing instances.

## The Container

The **Container** is usually referenced as the **Service Container**, as it's usually used to inject or bind services to the controllers. An instance of the Container is stored in the core **Sci** class. You can access the container and all of the methods it includes by just using the ```container``` method of the **Sci** class:


```php
namespace MyPlugin;

use MyPlugin\Sci\Sci;

# Get Sci instance
$sci = Sci::instance();

# Get container instance
$container = $sci->container();
```

After getting the container instance you will be able to use all the included methods, covered in this section. However, let's learn first an important concept.

## Dependency Injection

The SCIWP Framework container allows to define dependencies in class constructor so the instances of the required dependencies are automatically created. If you are used to use **Dependency Injection (DI)** with other frameworks, then this is exactly the same. However, if you are new, it's worth to check this example, as it's easier than it sounds:

```php

namespace MyPlugin\App\Controllers;

use MyPlugin\Sci\Controller;
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

In the previous example we don't need to create a new instance of the CarManager, as we already injected it in as an argument. But how can this happen? the trick is in the ```make``` method of the Container class, which is called in teh background. This controller is probably the endpoint of a route which creates an instance of this controller with the make method.

```php
namespace MyPlugin;

use MyPlugin\Sci\Route;

Route::get('/cars/{carId}', 'MyPlugin\App\Controllers\CarController@getCar');
```

When a petition is sent to the ```/cars/{carId}``` endpoint, the Route Manger creates a new instance of the **CarController** class using the ```make``` method, which crates all required instances for the injected dependencies in chain.

## Make Method

The ```make``` methods allows to create instances of any class while creating instances of the dependencies defined in the constructor.

### Basic Usage

When using the ```make``` method, dependency instances are created in a recurring way. That is, if the dependencies have more dependencies, they will also be instantiated when creating them, and so on.

For instance, let's create an instance of the **_CarController_** class we defined previously:


```php
namespace MyPlugin;

use MyPlugin\Sci\Sci;
use MyPlugin\App\Controllers\CarController;

# Get the container instance
$container = Sci::instance()->container();

# The CarManager will be injected
$carController = $container->make(CarController:class);

```

Please note that the result of ```CarController:class``` statement is ```'MyPlugin\App\Controllers\CarController'```, so you could also write this code and get the same result:

```php

# The CarManager will be injected
$carController = $container->make('MyPlugin\App\Controllers\CarController');

```

### Passing Arguments

You can also send arguments using a second optional parameter of the ```make``` method. The second parameter should be an array with the name of the parameters as the array keys and the arguments as the array values. Let's modify our CarController class accordingly:

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
$carController = $container->make(CarController:class, ['brand' => 'seat']);

```

However, if the parameters follow the correct order, you can skip the paramater names:


```php
# The CarManager will be injected
$carController = $container->make(CarController:class, ['seat']);

```
For more parameters, just add more elements to the array.

### Shortcut Method

There's a short way of invoking the ```make``` method. All you need to do is call the ```make``` static method in the Sci class. Here is an example:

```php
namespace MyPlugin;

use MyPlugin\Sci\Sci;
use MyPlugin\App\Controllers\CarController;

# The CarManager will be injected
$carController = Sci::make(CarController:class);

```

Easy and for all the family :-)

## Bindings

Imagine that you want to quickly replace a dependence with a different implementation. Ideally, the dependence would be referenced with an interface in the constructor so we can easily swap it for a different one. We can achieve this with bindings, and the best place to do this are the providers. 

**Note**: You will just to use bindings when you wan to modify the default container behaviour. You usually don't need to specify the container where to find the dendences or how to build objects.

### Closure Binding

Imagine that you want to inject an interface and easily swap it with different implementations. You can use the bind method with a closure where you will return an instance of a class which implements the interface. This is useful when we want o return different implementations based on our configuration:


```php
namespace MyPlugin;

use MyPlugin\Sci\Sci;
use MyPlugin\App\Controllers\CarController;
use MyPlugin\App\Services\CarManager;
use MyPlugin\App\Test\Services\CarManager as TestCarManager;

# Bind the CarController to a fixed implementation
$carController = $container->bind(CarController:class, function() {

    if (WP_DEBUG) {
        return new CarController(Sci::make(TestCarManager::class));
    } else {
        return new CarController(Sci::make(CarManager::class));
    }
});

```
However, this is usually done in the providers and it's a good practice to swap the providers and avoid these checks in your code. We will see the providers in depth in the Components section.








If we continue with our previous example, we could replace the **_CarManager_** we used in the **_CarCantroller_** with another implementation, but in this case, the CarManager would be an interface, as this would allow to use different implementations.

