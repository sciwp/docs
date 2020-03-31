---
id: providers
title: Service Providers
sidebar_label: Service Providers
---

The defined providers allow to manage class dependencies referenced when performing dependency injection. The dependency injection architecture allows to define class dependences in the constructor, so instances for those dependencies are automatically created. Providers allow to configure the creation of those instances.

Providers usually have a **_registered_** and a **_boot_** method. The **_registered_** method is executed when the provider is created, and the **_boot_** method is executed after all the plugins are loaded. Providers are a good way to configure or initialize the plugin services, which are usually used as dependencies of the controllers.

The Provider Manager is the component used by the framework to manage providers. All provider instances created should be registered within the **_Sci\Manager\ProviderManager_** class.

## Creating Providers

To create a new provider you need to create a new class extending  the **_Sci\Provider_** class. Here is an example:

```php

namespace MyPlugin\App\Providers;

use MyPlugin\Sci\Provider;

class AppProvider extends Provider
{
    # Bindings that should be registered
    public $bindings = [
        ServerProvider::class => GreatHostServerProvider::class,
    ];

    # Singletons that should be registered
    public $singletons = [
        DowntimeNotifier::class => GreatDowntimeNotifier::class,
    ];

    # Registered method
	public function registered() { /* ... */ }
    
    # Boot method
	public function boot() { /* ... */ }
}
```




can just use the **_create_** static method  of, which has no parameters. The plugin main file is a good place to instantiate providers and add them to the Provider Manager. However, providers are usually referenced in the plugin config file and automatically created in the boot process.