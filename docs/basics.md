---
id: basics
title: Basics
sidebar_label: Basics
---

SCI WP framework architecture is divided into different components: The core class, the autoloader, the service container and the core componentes. In this section are covered the basic aspects of all of them.

> **Bundled version**: If you bundle the framework with your Plugin,
> you should prepend your plugin namespace to the **Sci** namespace when referencing framework components.
> For example, if you use the bundled version you should reference the **MyPlugin\Sci\View** class instead of the **Sci\View** class.

## Core

SCI WP has a root class, which is the **Sci\Sci** class. This class is used to initialize the main components of the framework and to store references to the core componentes, which are a set of managers. However you will usually use the static methods included in the component classes to interact with them.

Once the framework has been configured, you can get the reference to the **Sci\Sci** instance by just using the `instance` static method:

```php
namespace MyPlugin;

use Sci\Sci;

$sci = Sci::instance();
```

You can now access all registered plugins. To get an array with all registered plugins you can use the `plugins` method:

```php
$plugins = $sci->plugins();
```
To get a singgle plugin you can use the `plugin` method:

```php
$plugin = $sci->plugin('myplugin');
```

The **Sci\Sci** class also has some quick access method which allow to interact with the service **Container**. These methods can be called both statically or dinamically and are explained in the next section of this documentation.

* **make**: Call the `make` method of the service container.
* **bind**: Call the `bind` method of the service container.
* **alias**: Call the `alias` method of the service container.
* **created**: Call the `created` method of the service container.

## Managers

The framework includes a set of managers, which are the main components of the the framework. The purpose of a manager is to globally manage sets of framework core objects. Managers are created and configured on demand so the framework uses as less resources as possible. In general, you will never need to use a Manager directly, so this section is just for architectural purposes. Here is a list of the available managers:

### Plugin Manager

The Plugin Manager stores registered plugin instances. To get the Plugin Manager:

```php
namespace MyPlugin;

use Sci\Plugin\Managers\PluginManager;

$pluginManager = PluginManager::instance();

```

### Provider Manager

The Provider Manager stores an instance of all registered providers. To get the Provider Manager:

```php
namespace MyPlugin;

use Sci\Support\Managers\ProviderManager;

$providerManager = ProviderManager::instance();

```

### Route Manager

The Route Manager stores all registered routes. To get the Route Manager:

```php
namespace MyPlugin;

use Sci\Router\Managers\RouteManager;

$routeManager = RouteManager::instance();

```

### Rest Manager

The Rest Manager stores all registered rest routes, which are handled in a different way than standard Routes. To get the Rest Manager:

```php
namespace MyPlugin;

use Sci\Router\Managers\RestManager;

$restManager = RestManager::instance();

```

### Template Manager

The Template Manager stores all registered WordPress templates. To get the Template Manager:

```php
namespace MyPlugin;

use Sci\Template\Managers\TemplateManager;

$templateManager = TemplateManager::instance();

```

### Style Manager

The Style Manager stores all the registered css files. To get the Style Manager:

```php
namespace MyPlugin;

use Sci\Asset\Managers\StyleManager;

$styleManager = StyleManager::instance();
```


### Script Manager

The Script Manager stores all the registered css files. To get the Script Manager:

```php
namespace MyPlugin;

use Sci\Asset\Managers\ScriptManager;

$scriptManager = ScriptManager::instance();
```
## Dependency Injection

SCI WP allows to perform Dependency Injection, also known as DI. It includes a **Service Container**, which allows to inject dependencies in class constructors. An instance of the service container is included in the **Sci** class instance. Here is an example of how you can access the service container.

```php
namespace MyPlugin;

use Sci\Sci;

$sci = Sci::instance();

# Get the Container
$container =  $sci->container();

```

The container includes the required methods to inject dependences and among other things it also allows to bind intefaces to implementations and to bind the constructor of a class to an existing instance. To learn more about the container, check the [Dependencies] (/docs/framework/dependencies) section.