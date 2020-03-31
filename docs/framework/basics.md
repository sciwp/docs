---
id: basics
title: Basics
sidebar_label: Basics
---

SCIWP framework architecture is divided into different componentes: The core class, the autoloader, the service container and the core componentes. In this section are covered the basic aspects of all of them.


## Core

SCIWP has a root class, which is the **Sci** class. This class is used to initialize the main components of the framework and to store references to the core componentes, which are a set of managers. However you will usually use the static methods included in the component classes to interact with them.

Once the framework has been configured, you can get the reference to the **Sci** instance by just using the ```instance``` static method:

```php
namespace MyPlugin;

use MyPlugin\Sci\Sci;

$sci = Sci::instance();
```

## Managers

We now have an instance of the Sci class, but what's the purpose of this? **None**, as you will always be able to use the framework components in a simpler way. However, from an architecture purpose is good to know that references to the instances of the managers for the different framework components are stored here:

```php
namespace MyPlugin;

use MyPlugin\Sci\Sci;

$sci = Sci::instance();

# Get the Plugin Manager
$pluginManager =  $sci->pluginManager();

# Get the Provider Manager
$providerManager =  $sci->providerManager();

# Get the Route Manager
$routeManager =  $sci->routeManager();

# Get the Rest Manager
$restManager =  $sci->restManager();

# Get the Template Manager
$templateManager =  $sci->templateManager();

# Get the Style Manager
$assetManager =  $sci->styleManager();

# Get the Script Manager
$scriptManager =  $sci->scriptManager();

```

All the core **components** are deeply explained through this documentation.

## Autoloading

The autoloader is responsible for including referenced classes when they are needed. It's still common in WordPress to require all the class files at the beginning of the files. However you should not follow that practive when using this framework.

When using SCIWP you will just need to reference a class to include it. Here is an example:

```php
namespace MyPlugin;

$hugService = new App\Services\HugService();

```

And that's it. You will not need to require the ```HugService.php``` file, as the Autoloader already knows where it is. However, you will need to follow a folder structure convention so the Autoloader is able to find it. For example, the ```App\Services\HugService``` class should be located in the ```../App/Services/``` folder, relative to your plugin directory, inside the ```HugService.php``` file.

Well, you can place it anywhere if you use reflexive autoloading, but let's attach to this standard for now.

You can [read more about autoloading here] (https://www.php.net/manual/en/language.oop5.autoload.php) for a general overview, or jump to the [Autoloader] (/docs/framework/autoloader) section of this documentation to read about the autoloader included with this framework with more detail.

## Dependencies

SCIWP allows to perform dependency injection, and for this purpose it includes a service container, which allows to inject dependencies in class constructors in chain. An instance of the service container is included in the **_Sci_** class instance. Here is an example of how you can access the service container.

```php
namespace MyPlugin;

use MyPlugin\Sci\Sci;

$sci = Sci::instance();

# Get the Container
$container =  $sci->container();

```

The container includes the required methods to inject dependences and among other things it also allows to bind intefaces to implementations and to bind the constructor of a class to an existing instance. To learn more about the container, check the [Dependencies] (/docs/framework/dependencies) section.