---
id: plugin-options
title: Plugin Options
sidebar_label: Plugin Options
---

SCI WP includes an **Option Service**. This service is an interface which allows to manage options for each plugin. Plugin options are stored in JSON format in a single database field, under the `wp_options` table. This allows to keep database ordered, avoiding the use of many fields, which would consume more resources.

> **Bundled version**: If you bundle the framework with your Plugin,
> you should prepend your plugin namespace to the **Sci** namespace when referencing framework components.
> For example, if you use the bundled version you should reference the **MyPlugin\Sci\View** class instead of the **Sci\View** class.


## Enabling the Service

To use the **Option Service** you need to add the Option Service class under the `'services'` section of the `config.php` file of each plugin. If this file is not created, create it and open it with any plain text editor.

```php
'services' => [
  'option' => \MyPlugin\Sci\Services\OptionService::class,
],
```

You can now get the **Option Service** instance after a Plugin is registered.

```php
namespace MyPlugin;

use Sci\Plugin\Managers\PluginManager;

# Get the Plugin from the Plugin Manager
$myPlugin = PluginManager::instance()->get('myplugin');

# You can now get the Option Service
$optionService = $myPlugin->service('option');

```

## Options

Options are stored in the options table of the database, in JSON format. They are sotored in different sets, however you will just usually need to use the default one.

### Store an Option

To add an option you can use the `set` method of the **Option Service** class. This method has the next parameters:

* **$option <array|string\>**: If this value is a string, this value is the name of the option in the default option set. If it's an array, the first element is the name of the option, and the second is the key of the option set.
* **$value <mixed\>**: The value to store.

If an option does not exist in the option set, it will be created. If the option already exists, its value will be replaced.

Here is an example of how to store an option in the default option set:

```php

# Store a value for the option 'myoption'
$optionService->set('myoption', 'value');
```

The previous option will be stored in the option set with the key `'myoption'`. The set in a database field whose key is the identifier you used to register your plugin.


Here is an example of how to store an option in a custom set, where you specify the option to store as the first element of the array and the set name as the second element of the array:

```php

# Store a value for the option 'myoption' in the custom option set 'set_key'
$optionService->set(['myoption', 'set_key'], 'value');
```

### Get an Option

To get an option you can use the `get` method of the **Option Service** class. This method has the next parameters:

* **$option <array|string\>**: If this value is a string, this value is the name of the option in the default option set. If it's an array, the first element is the name of the option, and the second is the key of the option in the key of the option set.
* **$default <mixed\>**: This is the value which will be returned in case the option does not exist.

If an option does not exist, the default value will be returned instead.

Here is an example:

```php

# Get the value of the option 'myoption'
$optionService->get('myoption', 'default_value');
```

In the previous example, we are trying to get the option `'myoption'` from the default option set of this plugin, stored in a single database field. If you want to get the value from a different set, you can specify it by using the array format:

```php

# Get the value of the option 'myoption' from the set whose key is 'set_key'
$optionService->get(['myoption', 'option_key'], 'set_key');
```

### Remove an Option

To remove an option you can use the `remove` method of the **Option Service** class. This method has the next parameters:

* **$option <array|string\>**: Then name of the option to delete from the default option set. If an array is used, the first element is the name of the option to delete, and the second represents the option set where the option is saved. If no option set is specified, the default one will be used.

This method returns `true` if the option was successfully deleted and false if it was not possible to delete it.

Here is an example of how to delete an option from the default option set:

```php

# Remove the option 'myoption'
$optionService->remove('myoption');
```

Here is an example of how to delete an option from a custom option set, where you specify the option to delete as the first element of the array and the set key as the second element of the array:

```php

# Remove the option 'myoption' from the set 'set_key'
$optionService->remove(['myoption', 'set_key']);
```

## Option Sets

Options sets are collections of options, and each one is stored ina different database field.

### Store an Option Set

You can create or save a full option set by using the `storeSet` method of the **Option Service**. It includes the next paramters:

* **$name <array|string\>**: This is the name of the set. Just use true as a value to use the default option set.
* **$data <array\>**: This is the full data for the set. Any option in this set will be replaced by the matching values of the data array.

In this example we are first storing the data array in the default option set, and then in a custom option set:

```php
$data = [
    'key1' => 'value1',
    'key2' => 'value2',
    'key3' => [
        'key3_1' => 'value3_1',
        'key3_2' => 'value3_2'
    ]
];

# Store the data in the default option set
$optionService->storeSet(true, $data);

# Store the data in a custom option set
$optionService->storeSet('custom_set', $data);
```

### Get an Option Set

You can get a full option set by using the `getSet` method of the **Option Service**. It includes the next paramters:

* **$name <array|string\>**: This is the name of the set. Just use true as a value to get the default option set, or the option set name to get a custom option set.

In this example we are first getting the data pf the default option set, and then we are getting it from a custom option set:

```php
# Get the data from the default option set
$dataDefaultSet = $optionService->getSet(true, $data);

# Get the data from a custom option set
$dataCustomSet = $optionService->getSet('custom_set', $data);
```

### Remove an Option Set

You can remove a full option set by using the `removeSet` method of the **Option Service**. It includes the next paramters:

* **$name <array|string\>**: This is the name of the set. Just use true as a value or do not provide a name to remove the default option set, or use the option set name to remove a custom option set.

In this example we are first removing the data from the default option set, and then we are removing it from a custom option set:

```php
# Get the data from the default option set
$optionService->removeSet();

# Get the data from a custom option set
$optionService->removeSet('custom_set');
```
