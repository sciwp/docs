---
id: providers
title: Service Providers
sidebar_label: Service Providers
---

The defined providers allow to execute tasks when the plugins using the framework boot. If you want to define class bindings, providers are probably the best place. Also, if you want to create a post type, you can do it in a service, which can be called from any code wich is executed when the plugin is loaded, or also from a service provider.

> **Bundled version**: If you bundle the framework with your Plugin,
> you should prepend your plugin namespace to the **Sci** namespace when referencing framework components.
> For example, if you use the bundled version you should reference the **MyPlugin\Sci\View** class instead of the **Sci\View** class.

Providers have a `registered` and a `boot` method. The `registered` method is executed when the provider is created, and the `boot` method is executed after all the plugins are loaded. Providers are a good way to configure or initialize any services.

## Creating Providers

To create a new provider you need to create a new class extending  the **_Sci\Provider_** class. Here is an example:

```php

namespace MyPlugin\App\Providers;

use Sci\Support\Provider;

class AppProvider extends Provider
{
    # Registered method
	public function registered() { /* ... */ }
    
    # Boot method
	public function boot() { /* ... */ }
}
```

To load and create the provider you can just use the **_create_** static method of the **Provider** class, which has no parameters. The plugin main file is a good place to instantiate providers and add them to the **Provider Manager**.

```php

namespace MyPlugin;

use MyPlugin\App\Providers\AppProvider;

AppProvider::create();
```

Providers can be also referenced in the plugin config file and automatically created and registered in the boot process.

## Registering Providers

The **Provider Manager** is the component used by the framework to manage providers. All provider instances created should be registered in the **Provider Manager**.

```php

namespace MyPlugin;

use MyPlugin\App\Providers\AppProvider;

AppProvider::create()->register('provider_name');
```

## Provider Configuration

You can also automatically create and register the providers using the provider configuration array of the `config.php` file. Here is an example:

```php

'providers' => [
    \MyPlugin\App\Providers\AppProvider::class,
    \MyPlugin\App\Providers\OtherProvider::class
],
```

The providers defined in the `config.php` file will automatically instantiated and registered.


## Provider Methods

Providers include the `registered` and the  `boot` method by default. In a provider you can always access the **Sci** instance via the `sci` attribute.

### Registered Method

The `registered` method is executed when a provider is loaded. At this point maybe not all plugins have been loaded.

```php
public function registered()
{
    # We can perform any action here wich does not involve other providers or plugins
    $this->sci->created('\MyPlugin\App\Services\CarManager', function ($object, $sci) {
        echo("A CarManager instance has been created,");
    });
}
```

### Boot Method

The `boot` method is executed after all plugins and providers have been loaded. Imagine that you have added binding to the `HouseManager` class, located in a different Plugin. By the time the `boot` method is executed, all bindings should have already been loaded.

```php
public function boot()
{
    # All bindings have already been added
    $this->sci->make('\MyOtherPlugin\App\Services\HouseManager');
}
```


## Provider Manager

The **Provider Manager** is the class where all providers are registered. You will never need to use this class, as all processes related to this class are performed in the backfround. For example, let's create a provider and register it with the Provider Manager instead of using the `register`method of the **Provider** class:


```php
namespace MyPlugin;

use MyPlugin\App\Providers\AppProvider;
use Sci\Support\Managers\ProviderManager;

# Create the provider
$appProvider = AppProvider::create();

# Get an instance of the Provider Manager
$providerManager = ProviderManager::instance();

# Add the provider to the Provider Manager
$providerManager->register($appProvider);

```
The **Provider Manager** is also in charge of calling the `registerd` and the `boot`methods.