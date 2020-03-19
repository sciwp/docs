---
id: framework-models
title: Models
sidebar_label: Models
---

SCIWP allows to create models, link them to database tables and execute queries directly from the models in the same way you would do it with any other PHP framework. The idea behind the SCIWP core Model class is to provide a zero configuration abstraction, so the model just works by setting the database table matching the model.

## Defining Models

To create a model you just need to extend the class **YourPlugin\Sci\Model**. Here is an example of how to create a model:

```php
namespace MyPlugin\App\Models;
use MyPlugin\Sci\Model;

class Orc extends Model;
{
}
```
And the model is created. You don't need to configure anything else if you don't want to.

### Instantiation

You can create a new instance of a model like with any other PHP class:

```php
use \MyPlugin\App\Models\Orc;

$orc = new Orc([
  'name' => 'Thrall',
  'job' => "warchief'
]);
```

As you can see, When creating a new instance, the attributes are sent along with an array. You can also create it by using the create static method:

```php
use \MyPlugin\App\Models\Orc;

$orc = Orc::create([
  'name' => 'Thrall',
  'job' => "warchief'
]);
```
## Model attributes

In SCIWP the attributes of the models are stored in the **$attributes**. The attributeswill be mapped with the model database table. You can set or get the attributes just like a standard attribute of any other PHP class, as SCIWP hooks into the **__get** and **__set** magic methods:

```php
// Set an attribute
$orc->faction = 'alliance';

// This will print _alliance_
echo($orc->faction);
```
You don't need to define the attributes in the class definition, as they will be mapped automatically based on its name with the database fields. However, you can use the $attributes array to set default values to the model attributes:

### Default attributes

Let's create a instance of the Orc class and assing default values to some attributes:

```php
namespace MyPlugin\App\Models;
use MyPlugin\Sci\Model;

class Orc extends Model;
{
  protected $attributes = [
    'faction' => 'horde',
    'strength' => 20,
    'armor' => 10
  ];
}
```
## Model Conventions

The previous example was simple, but there are some consideration and conventions you need to know.

### Table Names

The class Orc we previously created will be matched with a table which name is the **plural** of **Orc**, in lowercase. The **wordpress table prefix** will also be added by default, so, for this model to work, the database table should be named **wp_orcs** if the prefix of the tables is the default one.

You can customize moth the table name and the database prefix using the **TABLE_NAME** and the **TABLE_PREFIX** constansts. You can write any name for the name of the table and enable or disache the TABLE_PREFIX setting it to _true_ or to `false`.

```php
namespace MyPlugin\App\Models;
use MyPlugin\Sci\Model;

class Orcs extends Model;
{
  // The table name
  const TABLE_NAME = 'orcs_table';

  // Enable or disable the table prefix
  const TABLE_PREFIX = false;
}
```
In this example we are Assigning the table `orcs_table` to the **Orc** model and disabling the table prefix so it's not prended to the table name. The prefix is enabled by default.

### Primary key

SCIWP assumes that each table has a primary key column named `id`. You can define another colum for the primary key by using the **PRIMARY_KEY** constant in the model definition:

```php
namespace MyPlugin\App\Models;
use MyPlugin\Sci\Model;

class Orc extends Model;
{
  // Primary key column name
  const PRIMARY_KEY= 'orcId';
}
```
In this examble we assign the column orcId as the primary key column for the model.

### Auto increment

By default, a new field with an auto incremente value is expected for the primary key by default. However, this can be disabled by setting the value off the **AUTO_INCREMENT** constant to false. Here is an example:

```php
namespace MyPlugin\App\Models;
use MyPlugin\Sci\Model;

class Orc extends Model;
{
  // Disable auto increment
  const AUTO_INCREMENT= false;
}
```
When disabling the auto increment option, you should also set a value for the primary key of each model instance, as it will not be generated automatically by the database. If the primary key value is not set and the model is saved, a unique id will be generated, although it will not have a relation with the primary key value of the previous element wich was saved.

### Timestamps

The timestamps are a set of optional fields to track the changes of a database record, so it's possible to know when a record was created, when it was updated for the last time and when it was deleted, if that's the case. To enable the timestamps, just set the `TIMESTAMPS` constant to tru when defining a model.

```php
namespace MyPlugin\App\Models;
use MyPlugin\Sci\Model;

class Orc extends Model;
{
  const TIMESTAMPS = true;
}
```
By default, the model will search for the fields `created_at`, `updated_at` and `deleted_at`, which you need to add to the database table used by the model. However, you can configure the name of these fields by changing the value of the **CREATED_AT**, **UPDATED_AT** and **DELETED_AT** constants:
```php
namespace MyPlugin\App\Models;
use MyPlugin\Sci\Model;

class Orc extends Model;
{
  const TIMESTAMPS = true;

  const CREATED_AT = 'date_created';
  const UPDATED_AT = 'date_updated';
  const DELETED_AT = 'date_deleted';
}
```
When these fields are set, SCIWP will update them when the records of a model change.
## Save, Update and Delete operations

With SCIWP it is possible to save or update a model instance using functions of the model.

### Save a model instance

To save or store an instance into the database you just need to use the **save** method:
 
```php
$instance = $orc->save();
```
When a model is saved and if it does not exist in the database, the id of the object will be added to the model as an attribute. The save method returns the instance itself, so you can continue executing additional model functions.

```php
echo($instance->id);
```
The model instance has now an id which was generated by the database.

### Update a model instance

Although we cover the model basic queries in the next section, let's get the previously saved record form the database to create a model instance.

```php
$orc = App\Models\Orc::find(2);
```
If you want to update some attributes and then update the matching record in the database, just use the save method again.

```php
$orc->faction = 'neutral';
$orc->save();
```
### Delete a model instance

Our orc has completed its mission bringing diplomacy between the alliance and the order, so it´s time to say him goodbye. To delete an instace from the database, just use the delete method.

```php
$orc->delete();
```

The `delete` method will permanently remove the record from the database. However, you can use the remove method to soft delete the record, as it will just set **deleted_at** timestamp value to the current date. TO use this method, the **TIMESTAMP** constant must be set to true.

```php
$orc->remove();
```

In case tyou want to use another field to store the date, you just need to set the name of the field as the value for the **DELETED_AT** constant in the model definition:

```php
namespace MyPlugin\App\Models;
use MyPlugin\Sci\Model;

class MyModel extends Model;
{
 // Enable timestamps
  const TIMESTAMPS = true;

  // Switch the default field
  const DELETED_AT = 'field_name';
}
```

## Retrieving Models

Once you have created a model and the matching database table, you can start retrieving data from the database. Before entering in detail with the query builder, we are going to see how to retrieve both single model records or collections of records.

### Retrieving all records

You can retrieve all records of a model using the method `findAll`. Here is an example of how to retrieve all records of the model we previously created:

```php
$orcs = App\Models\Orc::findAll()

foreach ($orcs as $orc) {
    echo $orc->name;
}
```
However, it's not always the most optimum to get all records of a database table. You can easily paginate them via the $skip and $limit parameters, selecting only a range of records. If we wanto to create a list of orcs and we want to display 10 orcs per page, we can use the `findAll` method in this way to, for example, get the elements in the third page:

```php
$orcs = App\Models\Orc::findAll(20, 10);

foreach ($orcs as $orc) {
    echo $orc->name;
}
```
You can also use the `all` method to archive the same results, as  it's just an alias to the `findAll` method:
```php
$orcs = App\Models\Orc::all(20, 10);

```
### Retrieve a set of records

You can use the the `find` method to add constraints and search for a set of specific records. This is a dynamic method which allows to filter the data in many different ways. The constraints are added via arrays composed of a field to filter, an comparation operator and a value. Here is an example:

```php
$orcs = App\Models\Orc::find(['strength', '<', 20 ]);

foreach ($orcs as $orc) {
    echo $orc->name;
}
```
The previous code will print the name of all the orcs whose strenght is lower than 20.

You can also add more conditions by just adding them as parameters of the `find` method:

```php
$orcs = App\Models\Orc::find(['strength', '<', 20 ], ['armor', '>=', 30]);

foreach ($orcs as $orc) {
    echo $orc->name;
}
```

The previous code will print the name of all the orcs whose strenght is lower than 20 **and** whose armor points are more or equals than 30. You can add all conditions you want, without limit.

What happens if you want to get all orcs whose strenght is lower than 20 **or** whose armor points are more or equals than 30?. Easy; just add a third element to the second constraint array, which can take an **OR** or an **AND** value.

```php
$orcs = App\Models\Orc::find(['strength', '<', 20 ], ['armor', '>=', 30, 'OR']);
```

You don't need to specify this fourth value of the condition if you want to add an **AND** value, as it's the default value. You can even especify just an attribute name and the value it should take, in which case, the operator value will default to **equals (=)**, and the condition will be added as an **AND** condition. So, if for example you want to get all orcs which armor value is exactly 15, you can just use this query:

```php
$orcs = App\Models\Orc::find(['armor', 30]);
```

In case you only have one constraint, you can omit the brackets:

```php
$orcs = App\Models\Orc::find('armor', 30);
```

And that's not all, as you can just specify an element in the constraint array, in which case, the field name will default to the model primary key. For example, you can get the or whose primary key is 2 by this way:

```php
$orcs = App\Models\Orc::find([2]);
```

You can also omit the brackets and get the same results:

```php
$orcs = App\Models\Orc::find(2);
```

If you want to paginate the result or get a specific range, you can add the `$skip` and the $limit parameters at the end, as the last two arguments. However, if you want to use the pagination all constraints must be between brackets, using the array format.

```php
$orcs = App\Models\Orc::find(['strength', '<', 20 ], ['armor', '>=', 30, 'OR'], 20, 10);
```
This will get the third page of orcs, displaying ten per page.

You can add many values in a constraint to, for instance, check if the value of a a field is equals to any value of a set. Here is an example:

$orcs = App\Models\Orc::find(['name', '=', [Thrall, 'Orgrim']);

### Retrieve a single record

To get a single record for a model you can use the `one` method, which works almos exatly as the find method, but limiting the results to one record. For example to get a single record you can use this function, which look for the orc whose primary key is 2.

```php
$orcs = App\Models\Orc::one(2);
```
It's important to say that this function will not get an array of instanves, but the instance it self in case it was found, or false if it was not found. You can use this function exactly like the `find` method, seatching for many records, but only the first instance found will be returned.