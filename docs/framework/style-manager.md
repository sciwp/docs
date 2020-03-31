---
id: style-manager
title: Styles
sidebar_label: Styles
---

WordPress already offer a way to inject styles into the website header. However it requires to create a new method where you register and enqueue the files. With SCIWP you can add new CSS files by just using one line of code, so you don't need to create additional methods.

## Introduction

To enqueue new css files into the WordPress website header you usually need to register and enqueue the files inside a new function which you will then need to attach to the **_wp_enqueue_scripts_** action. Here is an example of how you can enqueue styles by default in WordPress.

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

If you use the SCIWP framework with your plugin, this process can be simplified.

## Creating styles

With SCIWP can register and enqueue css files using the **create** method of the **Style** class. The **create** method accepts the following parameters:

* **src (string)**: The full absolute path to the css file.
* **version (string)**: The version of the css file (optional).
* **dependences (array)**: The dependences of the the css file. That is, the handles of the files the css file require to work properly (optional).
* **media (string)**: The media for which this stylesheet has been defined. Accepts media types like **_'all'_**, **_'print'_** and **_'screen'_**, or media queries like '(orientation: portrait)' and '(max-width: 640px)'. The default value is **_'all_** (optional).

In the next example you can see how to create a new style:

```php
namespace MyPlugin;

use MyPlugin\Sci\Assets\Style;

$myStyle = Style::create(plugins_url( 'resources/my-style.css'), '1.0', [], 'all' );
```

## Registering styles

in the previous section we created a new instance of the Style class, but we still need to register it in into the **Style Manager** with a handle so the file is registeread and enqueued by WordPress.

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

use MyPlugin\Sci\Assets\Style;

Style::create(plugins_url('resources/my-style.css'), '1.0')->register('my-style');
```

The registered file will be appended to the webstie header.

## The Style Manager

When you register a Style, you are adding it the the **Style Manager**, which is in charge of registering and enqueuing the file in WordPress. Instead of the previous method we used to add a new file, you can also create the style and then register it directly into the **Style Manager**. However it's recommended to use the previous method, as it's shorter. Here is an example:

```php
namespace MyPlugin;

use MyPlugin\Sci\Assets\Style;
use MyPlugin\Sci\Manager\StyleManager;

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