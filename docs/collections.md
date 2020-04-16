---
id: collections
title: Collections
sidebar_label: Collections
---

Collections are sets of elements organized in an array format. Collections include some methods to make easier data management.

> **Bundled version**: If you bundle the framework with your Plugin,
> you should prepend your plugin namespace to the **Sci** namespace when referencing framework components.
> For example, if you use the bundled version you should reference the **MyPlugin\Sci\View** class instead of the **Sci\View** class.

## Create Collection

You can create a **Collection** by using the `create` method of the `Sci\Support\Collection` class. Here is an example.

```php
use Sci\Support\Collection;

$garage = Collection::create([ 'a1' => 'Ford Focus', 'a2' => 'Renault Megane', 'b1' => 'Seat Ibiza']);
```

Or you can directly use the Collection constructor:

```php
use Sci\Support\Collection;

$garage = new Collection([ 'a1' => 'Ford Focus', 'a2' => 'Renault Megane', 'b1' => 'Seat Ibiza']);
```


## Get Elements

You can get an element to the Collection by using the `get` method:

```php
use Sci\Support\Collection;

$garage = new Collection([ 'a1' => 'Ford Focus', 'a2' => 'Renault Megane', 'b1' => 'Seat Ibiza']);

$car = $garage->get('a1');
```

To get all alements of a collection you can use teh `all` method:

```php
use Sci\Support\Collection;

$garage = new Collection([ 'a1' => 'Ford Focus', 'a2' => 'Renault Megane', 'b1' => 'Seat Ibiza']);

$cars = $garage->all();
```

If one of the elements is a array, you can also get the child elements using the slash format:

```php
use Sci\Support\Collection;

$garage = new Collection([
    'a' => [
        '0' =>'Ford Focus',
        '1' => 'Renault Megane'
    ], 
    'b' => [
        '0' => 'Seat Ibiza'
    ]);

$car = $garage->get('a/0');
```

## Check Elements

You can check if an element is present in the Collection using the `contains` method:

```php
use Sci\Support\Collection;

$garage = new Collection([ 'a1' => 'Ford Focus', 'a2' => 'Renault Megane', 'b1' => 'Seat Ibiza']);

if ($garage->contains('Ford Focus')) {
    echo("Found!");
} else {
    echo("The car was not found.")
}
```

You can also check if an element has the expected value by using the `check` method:

```php
use Sci\Support\Collection;

$garage = new Collection([ 'a1' => 'Ford Focus', 'a2' => 'Renault Megane', 'b1' => 'Seat Ibiza']);

if ($garage->check('a1', 'Ford Focus')) {
    echo("Ford Focus is at place a1");
} else {
    echo("Ford Focus is not at place a1");
}
```

It's possible to check the length of an element using the `length` method:

```php
use Sci\Support\Collection;

$garage = new Collection([ 'a1' => 'Ford Focus', 'a2' => 'Renault Megane', 'b1' => 'Seat Ibiza']);

if ($garage->length('a1', 10)){
    echo('The a1 element has a length of 10');
}
```

If you just want to get the length of an element, use the length method with just one parameter:

```php
use Sci\Support\Collection;

$garage = new Collection([ 'a1' => 'Ford Focus', 'a2' => 'Renault Megane', 'b1' => 'Seat Ibiza']);

$length = $garage->length('a1');
```

## Add Elements

You can add an element using the `add` method:

```php
use Sci\Support\Collection;

$garage = new Collection([ 'a1' => 'Ford Focus', 'a2' => 'Renault Megane', 'b1' => 'Seat Ibiza']);

$garage->add('b2', 'Seat Toledo');
```
You can also add a set of elements in array format:

```php
use Sci\Support\Collection;

$garage = new Collection([ 'a1' => 'Ford Focus', 'a2' => 'Renault Megane', 'b1' => 'Seat Ibiza']);

$garage->add([
    'b2' => 'Seat Toledo',
    'b3' => 'Fiat Panda',
]);
```

## Set Elements

You can set the value of any element using the `set` method:

```php
use Sci\Support\Collection;

$garage = new Collection([ 'a1' => 'Ford Focus', 'a2' => 'Renault Megane', 'b1' => 'Seat Ibiza']);

$garage->set('b2', 'Seat Toledo');
```

You can set the value of many using the `set` method with an array:

```php
use Sci\Support\Collection;

$garage = new Collection([ 'a1' => 'Ford Focus', 'a2' => 'Renault Megane', 'b1' => 'Seat Ibiza']);

$garage->set([
    'b2' => 'Seat Toledo',
    'b3' => 'Fiat Panda',
]);
```
## Remove Elements

You can delete an element using the `remove` method:

```php
use Sci\Support\Collection;

$garage = new Collection([ 'a1' => 'Ford Focus', 'a2' => 'Renault Megane', 'b1' => 'Seat Ibiza']);

$garage->remove('b2');
```
You can also remove a set of elements in array format:

```php
use Sci\Support\Collection;

$garage = new Collection([ 'a1' => 'Ford Focus', 'a2' => 'Renault Megane', 'b1' => 'Seat Ibiza']);

$garage->remove(['b2', 'b3']);
```