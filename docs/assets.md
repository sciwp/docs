---
id: assets
title: Assets
sidebar_label: Assets
---

WordPress already offers a way to inject styles into the website header. It also offers a way to inject scripts both in the header or at the bottom of your website. However it requires to create a new method where you register and enqueue the files. With SCI WP you can add new css files and scripts by just using one line of code, so you don't need to create additional functions.

> **Bundled version**: If you bundle the framework with your Plugin,
> you should prepend your plugin namespace to the **Sci** namespace when referencing framework components.
> For example, if you use the bundled version you should reference the **MyPlugin\Sci\View** class instead of the **Sci\View** class.

## Styles

To enqueue new css files into the WordPress website header you usually need to register and enqueue the files inside a new function. You will then need to attach the function to the `wp_enqueue_scripts` action. Here is an example of how you can enqueue styles by default in WordPress.

```php
function enqueueStyles()
{
	wp_register_style(
        'style-one',
        plugins_url('resources/style-one.css'),
        [],
        '1.0',
        'all'
    );

	wp_register_style(
        'style-two',
        plugins_url('resources/style-two.css'),
        ['style-one'],
        '1.1'
    );

	wp_enqueue_style('style-one');
	wp_enqueue_style('style-two');
}

add_action('wp_enqueue_scripts', 'enqueueStyles');
```
You can [find more information about the **wp_register_style** function here](https://developer.wordpress.org/reference/functions/wp_register_style/). You can also [find more information about the **wp_enqueue_style** function here](https://developer.wordpress.org/reference/functions/wp_enqueue_style/).

If you use the SCI WP framework with your plugin, this process can be simplified.

### Creating Styles

With SCI WP can register and enqueue css files using the `create` method of the **Style** class. The `create` method accepts the following parameters:

* **src <string\>**: The full absolute path to the css file.
* **version <string\>**: The version of the css file (_optional_).
* **dependences <array\>**: The dependences of the the css file. That is, the handles of the files the css file require to work properly (_optional_).
* **media <string\>**: The media for which this stylesheet has been defined. Accepts media types like **_'all'_**, **_'print'_** and **_'screen'_**, or media queries like '(orientation: portrait)' and '(max-width: 640px)'. The default value is **_'all_** (_optional_).

In the next example you can see how to create a new style:

```php
namespace MyPlugin;

use Sci\Asset\Style;

$myStyle = Style::create(plugins_url( 'resources/my-style.css'), '1.0', [], 'all' );
```

### Registering Styles

In the previous section we created a new instance of the Style class, but we still need to register it in into the **Style Manager** with a handle so the file is registeread and enqueued by WordPress.

The easiest way of registering a file is to use the `register` method of the **Style** class. Here are some examples of how you can use it:

```php
$myStyle->register('my-style')
```
The previous statement registered the style so the css file was added to the header of both the WordPress frontend and the WordPress administration panel. You can use a second parameter to just add it to the frontend or just to the administration panel. To add it only to the frontend you shoud use the **_'front'_** value as the second parameter of the register method.

```php
$myStyle->register('my-style', 'front')
```

To add it only to the frontend you shoud use the **_'admin'_** value as the second parameter of the register method.

```php
$myStyle->register('my-style', 'admin')
```

However, you can also write the next statement instead in one line to both create and register the style:

```php
namespace MyPlugin;

use Sci\Asset\Style;

Style::create(plugins_url('resources/my-style.css'), '1.0')->register('my-style');
```

The registered file will be appended to the webstie header.

When you register a Style, you are adding it to the **Style Manager**, which is in charge of registering and enqueuing the file in WordPress. Instead of the previous method we used to add a new file, you can also create the style and then register it directly into the **Style Manager**. However it's recommended to use the previous method, as it's shorter. Here is an example:

```php
namespace MyPlugin;

use Sci\Asset\Style;
use Sci\Asset\Managers\StyleManager;

$myStyle = Style::create(plugins_url('resources/my-style.css'), '1.0')->register('my-style');

StyleManager::instance()->register($myStyle, 'my-style')

```

You can add the file only into the frontend using the **_'front'_** value as the second parameter:

```php
StyleManager::instance()->register($myStyle, 'my-style', 'front')
```

In the same way, you can add the file only into the administration panel using the **_'admin'_** value as the second parameter:

```php
StyleManager::instance()->register($myStyle, 'my-style', 'admin')
```

### Styles Configuration

You can also define styles in the `config.php` file. However you'll first need to enable the **Style Service** in the configuration.

While the Styles class works with absolute paths when defining files, the **Style Service** uses paths which are relative to your plugin root folder. If you want to specify templates in the `config.php` file, you need to enable the **Style Service**.

```php
'services' => [
  'my-style' => Sci\Asset\Services\StyleService::class,
  ...
 ],
 ```

When enabling the **Style Service**, an instance of the service will be attached to each plugin using the framework.

You can now define styles into the `config.php` file, under the `styles` key of the configuration array. Here is an example:

```php
'styles' => [
  'mystyle1' => [
    'src' => 'resources/mystyle1.css',
    'version' => '1.1',
    'dependences' => [],
    'media' => 'all',
    'zone' => 'front' 
  ],
  'mystyle2' => [
    'src' => 'resources/mystyle2.css',
    'version' => '1.0',
    'dependences' => [],
    'media' => 'all',
    'zone' => 'admin' 
  ]
],
```

## Scripts

To enqueue new script files into the WordPress website header or at the bottom of your website, you usually need to register and enqueue the files inside a new function which you will then need to attach to the **_wp_enqueue_scripts_** action. Here is an example of how you can enqueue scripts by default in WordPress.

```php
function enqueueScripts()
{
	wp_register_script(
        'script-one',
        plugins_url('resources/script-one.js'),
        [],
        '1.0',
        'all'
    );

	wp_register_script(
        'script-two',
        plugins_url('resources/script-two.js'),
        ['script-one'],
        '1.1'
    );

	wp_enqueue_style('style-one');
	wp_enqueue_style('script-two');
}

add_action('wp_enqueue_scripts', 'enqueueScripts');
```
You can [find more information about the **wp_register_script** function here](https://developer.wordpress.org/reference/functions/wp_register_script/). You can also [find more information about the **wp_enqueue_script** function here](https://developer.wordpress.org/reference/functions/wp_enqueue_script/).

If you use the SCI WP framework with your plugin, in the same way as with the styles, this process can be simplified.

### Creating Scripts

With SCI WP you can register and enqueue css files using the **create** method **Script** class. The **create** method accepts the following parameters:

* **src <string\>**: The full absolute path to the script file.
* **version <string\>**: The version of the script file (_optional_).
* **dependences <array\>**: The dependences of the the script file. That is, the handles of the files the script file require to work properly (_optional_).
* **footer <boolean\>**: Set it to **_true_** if you want to place the script in the footer of your website or set to to **_false_** if you want to place the script in the header of your website. If not value is specified, it will default to **true** (_optional_).

In the next example you can see how to create a new script:

```php
namespace MyPlugin;

use Sci\Asset\Script;

$myScript = Script::create(plugins_url( 'resources/my-script.js'), '1.0', [], false );
```

### Registering Scripts

In the previous section we created a new instance of the Script class, but we still need to register it in into the **Script Manager** with a handle so the file is registeread and enqueued by WordPress.

```php
$myScript->register('my-script')
```
The previous statement registered the script, so the file was added into the header of both the WordPress frontend and the WordPress administration panel. You can use a second parameter to just add it to the frontend or just to the administration panel.

To add it to the frontend you shoud use the **_'front'_** value as the second parameter of the register method.

```php
$myScript->register('my-script', 'front')
```

To add it to the administration panel you shoud use the **_'admin'_** value as the second parameter of the register method.

```php
$myScript->register('my-script', 'admin')
```

However, you can also write the next statement in one line to both create and register the style:

```php
namespace MyPlugin;

use Sci\Asset\Script;

Script::create(plugins_url('resources/my-script.js'), '1.0')->register('my-script');
```

The registered file will be appended to the webstie header.

When you register a Script, you are adding it the the **Script Manager**, which is in charge of registering and enqueuing the file in WordPress. Instead of the previous method we used to add a new file, you can also create the script and then register it directly into the **Script Manager**. However it's recommended to use the previous method, as it's shorter. Here is an example:

```php
namespace MyPlugin;

use Sci\Asset\Script;
use Sci\Asset\Managers\ScriptManager;

$myScript = Script::create(plugins_url('resources/my-script.js'), '1.0')->register('my-script');

ScriptManager::instance()->register($myScript, 'my-script')

```

You can add the file only into the frontend using the **_'front'_** value as the second parameter:

```php
ScriptManager::instance()->register($myScript, 'my-script', 'front')
```

In the same way, you can add the file only into the administration panel using the **_'admin'_** value as the second parameter:

```php
ScriptManager::instance()->register($myScript, 'my-script', 'admin')
```

### Scripts Configuration

You can also define scripts in the `config.php file` file. However you'll first need to enable the **Script Service** in the configuration.

While the Script class works with absolute paths when defining files, the **Script Service** uses paths which are relative to your plugin root folder. If you want to specify templates in the `config.php file`, you need to enable the **Script Service**.

```php
'scripts' => [
  'my-script' => Sci\Asset\Services\ScriptService::class,
  ...
 ],
 ```

When enabling the **Script Service**, an instance of the service will be attached to each plugin using the framework.

You can now define scripts into the `config.php` file, under the `scripts` key of the configuration array. Here is an example:

```php
'scripts' => [
  'my-script1' => [
    'src' => 'resources/myscript1.jss',
    'version' => '1.0.',
    'dependences' => [],
    'footer' => true,
    'zone' => 'front' 
  ],
  'my-script2' => [
    'src' => 'resources/myscript2.js',
    'version' => '1.1',
    'dependences' => ['my-script1'],
    'footer' => false,
    'zone' => 'front' 
  ]
],
```