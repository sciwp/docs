---
id: framework-basics
title: Basics
sidebar_label: Basics
---

SCIWP framework architecture is divided into different componentes: The Sci class, the autoloader, the service container and the core componentes. In this section are covered the basic aspects of all of them.

**_Note_**: The contents of this section are optional and you will not need these concepts to use the framework. However it is recommended to have a read.


## Core

SCIWP has a root class, which is the **Sci** class. This class uses the Singleton pattern and is used to initialize the main componentes of the framework and to store references to the core componentes, which are a set of managers. However you will usually use the static methods included in the component classes to interact with them.

Once the framework has been configured, you can get the reference to the **Sci** instance by just using the ```instance``` static method:

```php
namespace MyPlugin;

use MyPlugin\Sci\Sci;

$sci = Sci::instance();
```

## Components

We now have an instance of the Sci class, but what's the purpose of this? **None**, as you will always be able to use the framework componentes in a simpler way. However, from an architecture purpose is good to know that references to the instances of the components are stored here:

```php
namespace MyPlugin;

use MyPlugin\Sci\Sci;

$sci = Sci::instance();

# Get the Plugin Manager
$pluginManager =  $sci->pluginManager();

# Get the Provider Manager
$pluginManager =  $sci->ProviderManager();

# Get the Route Manager
$pluginManager =  $sci->routeManager();

# Get the Rest Manager
$pluginManager =  $sci->restManager();


# Get the Template Manager
$pluginManager =  $sci->templateManager();

```

If you want to know more about these componentes, jump to the **Components** section of this documentation.

## Autoloading

The autoloader is responsible for including references classes when they are needed. It's still common in WordPress to require all the class files at the beginning of the files. However you should not follow that practive when using this framework.

When using SCIWP you will just need to reference a class to include it. Here is an example:

```php
namespace MyPlugin;

$hugService = new App\Services\HugService();

```

And that's it. You will not need to require the ```HugService.php``` file, as the Autoloader already knows where it is. However, you will need to follow a folder structure convention so the Autoloader is able to find it. For example, the ```App\Services\HugService``` class should be located in the ```.../MyPlugin/App/Services/``` folder, inside the ```HugService.php``` file.

Well, you can place it anywhere if you use reflexive autoloading, but let's attach to this standard for now.

You can [read more about autoloading here] (https://www.php.net/manual/en/language.oop5.autoload.php) for a general view, or jump to the [Autoloader] (/docs/framework-autoloader) section of this documentation to read about the SCIWP autoloader in detail.

## Dependencies

SCIWP allows to perform dependency injection and for this purpose it includes a service container, which allows to inject dependencies in class constructors in chain. An instance of the service container is included in the **_Sci_** class instance. Here is an example of how you can access the service container.

```php
namespace MyPlugin;

use MyPlugin\Sci\Sci;

$sci = Sci::instance();

# Get the Container
$container =  $sci->container();

```

The container includes the required methods to inject dependences and among other things it also allows to bind intefaces to implementations and to bind the constructor of a class to an existing instance. To know more about the container, check the [Dependencies] (/docs/framework-dependencies) section.