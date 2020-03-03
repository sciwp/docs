---
id: framework-models
title: Models
sidebar_label: Models
---

SCIWP allows to create models, link them to database tables and execute queries directly from the models in the same way you would do it with any other PHP framework. The idea behind the SCIWP core Model class is to provide a zero configuration abstraction, so the model just works by setting the database table matching the model.

## Defining Models

To create a model you just need to extend the class **YourPlugin\Sci\Model**. Here is an example of how to create a model:

```
namespace MyPlugin\App\Models;
use MyPlugin\Sci\Model;

class Orc extends Model;
{
}
```
And the model is created. You don't need to configure anything else if you don't want to.

### Instantiation

You can create a new instance of a model like with any other PHP class:

```
use \MyPlugin\App\Models\Orc;

$orc = new Orc([
  'name' => 'Thrall',
  'job' => "warchief'
]);
```

As you can see, When creating a new instance, the attributes are sent along with an array. You can also create it by using the create static method:

```
use \MyPlugin\App\Models\Orc;

$orc = Orc::create([
  'name' => 'Thrall',
  'job' => "warchief'
]);
```
## Model attributes

In SCIWP the attributes of the models are stored in the **$attributes**. The attributeswill be mapped with the model database table. You can set or get the attributes just like a standard attribute of any other PHP class, as SCIWP hooks into the **__get** and **__set** magic methods:

```
// Set an attribute
$orc->faction = 'alliance';

// This will print _alliance_
echo($orc->faction);
```
You don't need to define the attributes in the class definition, as they will be mapped automatically based on its name with the database fields. However, you can use the $attributes array to set default values to the model attributes:

### Default attributes

Let's create a instance of the Orc class and assing default values to some attributes:

```
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

```
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

```
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

```
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

```
namespace MyPlugin\App\Models;
use MyPlugin\Sci\Model;

class Orc extends Model;
{
  const TIMESTAMPS = true;
}
```
By default, the model will search for the fields `created_at`, `updated_at` and `deleted_at`, which you need to add to the database table used by the model. However, you can configure the name of these fields by changing the value of the **CREATED_AT**, **UPDATED_AT** and **DELETED_AT** constants:
```
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

### How to save a model instance

To save or store an instance into the database you just need to use the **save** method:
 
```
$instance = $orc->save();
```
When a model is saved and if it does not exist in the database, the id of the object will be added to the model as an attribute. The save method returns the instance itself, so you can continue executing additional model functions.

```
echo($instance->id);
```
The model instance has now an id which was generated by the database.

### How to update a model instance

Although we cover the model basic queries in the next section, let's get the previously saved record form the database to create a model instance.

```
$orc = App\Models\Orc::find(2);
```
If you want to update some attributes and then update the matching record in the database, just use the save method again.

```
$orc->faction = 'neutral';
$orc->save();
```
### How to delete a model instance

Our orc has completed its mission bringing diplomacy between the alliance and the order, so it´s time to say him goodbye. To delete an instace from the database, just use the delete method.

```
$orc->delete();
```

The `delete` method will permanently remove the record from the database. However, you can use the remove method to soft delete the record, as it will just set **deleted_at** timestamp value to the current date. TO use this method, the **TIMESTAMP** constant must be set to true.

```
$orc->remove();
```

In case tyou want to use another field to store the date, you just need to set the name of the field as the value for the **DELETED_AT** constant in the model definition:

```
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

```
$orcs = App\Models\Orc::findAll()

foreach ($orcs as $orc) {
    echo $orc->name;
}
```
However, it's not always the most optimum to get all records of a database table. You can easily paginate them via the $skip and $limit parameters, selecting only a range of records. If we wanto to create a list of orcs and we want to display 10 orcs per page, we can use the `findAll` method in this way to, for example, get the elements in the third page:

```
$orcs = App\Models\Orc::findAll(20, 10);

foreach ($orcs as $orc) {
    echo $orc->name;
}
```
You can also use the `all` method to archive the same results, as  it's just an alias to the `findAll` method:
```
$orcs = App\Models\Orc::all(20, 10);

```
### Retrieve a set of records

You can use the the `find` method to add constraints and search for a set of specific records. This is a dynamic method which allows to filter the data in many different ways. The constraints are added via arrays composed of a field to filter, an comparation operator and a value. Here is an example:

```
$orcs = App\Models\Orc::find(['strength', '<', 20 ]);

foreach ($orcs as $orc) {
    echo $orc->name;
}
```
The previous code will print the name of all the orcs whose strenght is lower than 20.

You can also add more conditions by just adding them as parameters of the `find` method:

```
$orcs = App\Models\Orc::find(['strength', '<', 20 ], ['armor', '>=', 30]);

foreach ($orcs as $orc) {
    echo $orc->name;
}
```

The previous code will print the name of all the orcs whose strenght is lower than 20 **and** whose armor points are more or equals than 30. You can add all conditions you want, without limit.

What happens if you want to get all orcs whose strenght is lower than 20 **or** whose armor points are more or equals than 30?. Easy; just add a third element to the second constraint array, which can take an **OR** or an **AND** value.

```
$orcs = App\Models\Orc::find(['strength', '<', 20 ], ['armor', '>=', 30, 'OR']);
```

You don't need to specify this fourth value of the condition if you want to add an **AND** value, as it's the default value. You can even especify just an attribute name and the value it should take, in which case, the operator value will default to **equals (=)**, and the condition will be added as an **AND** condition. So, if for example you want to get all orcs which armor value is exactly 15, you can just use this query:

```
$orcs = App\Models\Orc::find(['armor', 30]);
```

In case you only have one constraint, you can omit the brackets:

```
$orcs = App\Models\Orc::find('armor', 30);
```

And that's not all, as you can just specify an element in the constraint array, in which case, the field name will default to the model primary key. For example, you can get the or whose primary key is 2 by this way:

```
$orcs = App\Models\Orc::find([2]);
```

You can also omit the brackets and get the same results:

```
$orcs = App\Models\Orc::find(2);
```

If you want to paginate the result or get a specific range, you can add the `$skip` and the $limit parameters at the end, as the last two arguments. However, if you want to use the pagination all constraints must be between brackets, using the array format.

```
$orcs = App\Models\Orc::find(['strength', '<', 20 ], ['armor', '>=', 30, 'OR'], 20, 10);
```
This will get the third page of orcs, displaying ten per page.

You can add many values in a constraint to, for instance, check if the value of a a field is equals to any value of a set. Here is an example:

$orcs = App\Models\Orc::find(['name', '=', [Thrall, 'Orgrim']);

### Retrieve a single record

To get a single record for a model you can use the `one` method, which works almos exatly as the find method, but limiting the results to one record. For example to get a single record you can use this function, which look for the orc whose primary key is 2.

```
$orcs = App\Models\Orc::one(2);
```
It's important to say that this function will not get an array of instanves, but the instance it self in case it was found, or false if it was not found. You can use this function exactly like the `find` method, seatching for many records, but only the first instance found will be returned.

## Query builder

You can use the query method to start an advanced query with the model. The method will return the query itself so you can add condition after condition and get the results in the end. This is the most simple query, which will get all record in the database table without any conditions specified:

```
$orcs = App\Models\Orc::query()->get();
foreach ($orcs as $orc) {
    echo $orc->name;
}
```
There are many constraints and options you can add. You can use them in any order, but the only one requirement is that the get method is used at the end to execute the query and get the results. In the next secitons you can view all query options.

### The where clause

Allows to add a standard where clause, which accepts the next parameters:

* **Column**: The name of the column where you want to check the condition. If no value is specified, the default column will be the primary key of the model.
* **Operator**: The operator, which accepts any valid SQL comparison operator, like `'='`, `'>'`, `'>='`, `'<'`, `'<='` and more. If no value is specified, the operator `'='` will be used by default.
* **Value**: The value to compare with the field value. The value is always required.
* **Append**: If the condition should be appended to the previous one with an `AND` or an `OR`. If no value is specified, `AND` will be used by default.
* **Boolean**: It's used to negate the current constraint, getting the opposite condition. Use `true` to validate the current statement and `false` to negate it.
* **Many**: By default, when you specify a set of values in a constraint, the field should match any of the values in the set, using `OR` by default. You can make the field match all values in the set by using `AND`. If this is not specified, `OR` will be used by default.

You must specify at least a value, and the rest of the arguments are optional. Here is an example which uses all parameters:

```
$orcs = App\Models\Orc::query()->where([
  'name', // Apply the constraint to the name filed
  '=', //The condition operator
  ['Trall', 'Orgrim'], // Value or array of values to compare
  'AND', // Relation with the previous constraints if many are specified
  true, // The condition is not negated
  'OR' // Match any of the specified values
])->get();
```

If there is just one clause, it can be also specified in this way, using the default values for the other parameters:

```
$orcs = App\Models\Orc::query()->where('name', ['Trall', 'Orgrim'])->get();
```

You can concatenate many where clauses by appending them to the returned value of the previous one:

```
$orcs = App\Models\Orc::query()->where('name', ['Trall', 'Orgrim'])->where(['armor', '>', 5])->get();
```

Or if you want, it's possible to specify many constraints in the same where clause as long as they are between brackets, in array format:

```
$orcs = App\Models\Orc::query()->where(['name', ['Trall', 'Orgrim']], ['armor', '>', 5])->get();

```
### The whereNot clause

This clause adds a negated standard where constraint. It accepts the same parameters as the standard where clause. Here is an example:

```
$orcs = App\Models\Orc::query()->whereNot(['name', '=', 'Orgrim'])->get();
```
The the previous example we search for an orc whose name is not Orgrim. It's also possible to get the same result using the not equals `!=` operator with a standard `where` clause. You can also specify many comma separated constraints.

### The whereAny clause

This clause adds a standard where constraint, but validating the field value against any of the values by default, in case an array of values is provided. It accepts the same parameters as the standard where clause. Here is an example:

```
$orcs = App\Models\Orc::query()->whereAny(['name', '=', ['Trall', 'Orgrim']])->get();
```
The the previous example we are searching for any orc whose name matches any of the patterns in the array. You can also specify many comma separated constraints.

### The whereAll clause

This clause adds a standard where constraint, but validating the field value against all the values by default, in case an array of values is provided. It accepts the same parameters as the standard where clause. Here is an example:

```
$orcs = App\Models\Orc::query()->whereAll(['name', 'LIKE', ['%tr%', '%al%']])->get();
```
The the previous example we are searching for any orc whose name matches all the patterns in the array. You can also specify many comma separated constraints.

### The orWhere clause

This clause adds a standard where clause, but joining it with the previous one using the **OR** operator instead of the default **AND** operator, so both conditions or sets of conditions need to be true. It accepts the same parameters as the standard where clause. Here is an example:

```
$orcs = App\Models\Orc::query()->where(['armor', '>', 10])->orWhere(['strength', '>', 30])->get();
```
The the previous example we search for the orcs whose armor has more than 10 points or whose strength has more than 30 points. You can also specify many comma separated constraints.

### The orWhereNot clause

This clause adds a negated orWhere clause, joining it with the previous one with the **OR** operator instead of the default **AND** operator. It accepts the same parameters as the standard where clause. Here is an example:

```
$orcs = App\Models\Orc::query()->where(['armor', '>', 10])->orWhereNot(['strength', '>', 20])->get();
```
The the previous example we search for the orcs whose armor has more than 10 points or whose strength does not have more than 20 points. You can also specify many comma separated constraints.

### The orWhereAny clause

This clause adds a orWhere constraint, validating the field value against any of the values if an array of values is provided. It accepts the same parameters as the standard where clause. Here is an example:

```
$orcs = App\Models\Orc::query()->where(['armor', '>', 10])->orWhereAny(['name', '=', ['Trall', 'Orgrim']])->get();
```
The the previous example we are searching for any orc whose armor has more than 10 points and whose name matches any the patterns in the array. You can also specify many comma separated constraints.

### The orWhereAll clause

This clause adds a orWhere constraint, but validating the field value against all the values if an array of values is provided. It accepts the same parameters as the standard where clause. Here is an example:

```
$orcs = App\Models\Orc::query()->where(['armor', '>', 10])->orWhereAll(['name', 'LIKE', ['%tr%', '%al%']])->get();
```
The the previous example we are searching for any orc whose armor has more than 10 points and whose name matches all the patterns in the array. You can also specify many comma separated constraints.

### The whereRaw clause

This clause appends a custom raw SQL query to the query. It accepts three arguments:

* **Query**: The raw query in SQL format.
* **Replacement**: If this is set to true, the dangerous characters will be replaced. This option is set to false by default.
* **Append**: If the condition should be appended to the previous one with an `AND` or an `OR`. If no value is specified, `AND` will be used by default.
* **Boolean**: It's used to negate the current constraint, getting the opposite condition. Use `true` to validate the current statement and `false` to negate it.

Here is an example.

```
$orcs = App\Models\Orc::query()->whereRaw("strength < 20")->get();
```
The previous query will search for all the orcs whose strength is lower than 20 points.

### The whereNotRaw clause

This clause adds a negated whereRaw caluse. It accepts the same parameters as the whereRaw clause. Here is an example:

```
$orcs = App\Models\Orc::query()->whereNotRaw("strength < 20")->get();
```
The previous query will search for all the orcs whose strength is not lower than 20 points. You can also specify many comma separated queries using the array format.

### The orWhereRaw clause

This clause appends a custom raw SQL query to the query, appending it to the previous one using the `OR` operator. It accepts the same parameters as the whereRaw clause. Here is an example:

```
$orcs = App\Models\Orc::query()->whereRaw("armor > 10")->orWhereRaw("strength < 20")->get();
```
The previous query will search for all the orcs whose armor is more than 10 points or whose strength is lower than 20 points. You can also specify many comma separated queries using the array format.

### The orWhereNotRaw clause

This clause adds a negated orWhereRaw caluse, appending it to the previous one using the `OR` operator. It accepts the same parameters as the whereRaw clause. Here is an example:

```
$orcs = App\Models\Orc::query()->whereRaw("armor > 10")->orWhereNotRaw("strength < 20")->get();
```
The previous query will search for all the orcs whose armor is more than 10 points or whose strength is not lower than 20 points. You can also specify many comma separated queries using the array format.

### The whereLt clause

Add a where clause using the less than `<` operator. It accepts a field and a value as main arguments. Here is the full list of arguments.

* **Field**: The name of the table column to compare.
* **Value**: The value to compare againts the field.
* **Append**: If the condition should be appended to the previous one with an `AND` or an `OR`. If no value is specified, `AND` will be used by default.
* **Boolean**: It's used to negate the current constraint, getting the opposite condition. Use `true` to validate the current statement and `false` to negate it.

Here is an example:

```
$orcs = App\Models\Orc::query()->whereLt ('armor', 30)->get();
```
The previous query will select all orcs whose armor is lower than 30 points.

It's also possible to use an array or a set of arrays containing multiple queries.
```
$orcs = App\Models\Orc::query()->whereLt(['armor', 30],['strength', 15])->get();
```
The previous query will select all orcs whose armor is lower than 30 points and whose strength is lower than 15 points.

### The whereNotLt clause

Add a negated where clause using the less than `<` operator. It accepts the same arguments as the whereLt constraint. Here is an example:

```
$orcs = App\Models\Orc::query()->whereNotLt ('armor', 30)->get();
```
The previous query will select all orcs whose armor is not lower than 30 points. It's also possible to use an array or a set of arrays containing multiple queries.

### The whereLte clause

Add a where clause using the less or equals `<=` operator. It accepts a field and a value as main arguments. Here is the full list of arguments.

* **Field**: The name of the table column to compare.
* **Value**: The value to compare against the field.
* **Append**: If the condition should be appended to the previous one with an `AND` or an `OR`. If no value is specified, `AND` will be used by default.
* **Boolean**: It's used to negate the current constraint, getting the opposite condition. Use `true` to validate the current statement and `false` to negate it.

Here is an example:

```
$orcs = App\Models\Orc::query()->whereLte('armor', 30)->get();
```
The previous query will select all orcs whose armor is lower or equal than 30 points.

It's also possible to use an array or a set of arrays containing multiple queries.
```
$orcs = App\Models\Orc::query()->whereLte(['armor', 30],['strength', 15])->get();
```
The previous query will select all orcs whose armor is lower or equal than 30 points and whose strength is lower or equal than 15 points.

### The whereNotLte clause

Add a negated where clause using the  less or equals `<=` operator. It accepts the same arguments as the whereLte constraint. Here is an example:

```
$orcs = App\Models\Orc::query()->whereNotLte('armor', 30)->get();
```
The previous query will select all orcs whose armor is not lower or equal than 30 points. It's also possible to use an array or a set of arrays containing multiple queries.

### The whereGt clause

Add a where clause using the greater than `>` operator. It accepts a field and a value as main arguments. Here is the full list of arguments.

* **Field**: The name of the table column to compare.
* **Value**: The value to compare against the field.
* **Append**: If the condition should be appended to the previous one with an `AND` or an `OR`. If no value is specified, `AND` will be used by default.
* **Boolean**: It's used to negate the current constraint, getting the opposite condition. Use `true` to validate the current statement and `false` to negate it.

Here is an example:

```
$orcs = App\Models\Orc::query()->whereGt('armor', 30)->get();
```
The previous query will select all orcs whose armor is greater than 30 points.

It's also possible to use an array or a set of arrays containing multiple queries.
```
$orcs = App\Models\Orc::query()->whereGt(['armor', 30],['strength', 15])->get();
```
The previous query will select all orcs whose armor is greater than 30 points and whose strength is bigger than 15 points.

### The whereNotGt clause

Add a negated where clause using the greater than `>` operator. It accepts the same arguments as the whereGt constraint. Here is an example:

```
$orcs = App\Models\Orc::query()->whereNotGt('armor', 30)->get();
```
The previous query will select all orcs whose armor is not greater than 30 points. It's also possible to use an array or a set of arrays containing multiple queries.

### The whereGte clause

Add a where clause using the greater or equals `>=` operator. It accepts a field and a value as main arguments. Here is the full list of arguments.

* **Field**: The name of the table column to compare.
* **Value**: The value to compare against the field.
* **Append**: If the condition should be appended to the previous one with an `AND` or an `OR`. If no value is specified, `AND` will be used by default.
* **Boolean**: It's used to negate the current constraint, getting the opposite condition. Use `true` to validate the current statement and `false` to negate it.

Here is an example:

```
$orcs = App\Models\Orc::query()->whereGte('armor', 30)->get();
```
The previous query will select all orcs whose armor is greater or equal than 30 points.

It's also possible to use an array or a set of arrays containing multiple queries.
```
$orcs = App\Models\Orc::query()->whereGte(['armor', 30],['strength', 15])->get();
```
The previous query will select all orcs whose armor is lower or equal than 30 points and whose strength is lower or equal than 15 points.

### The whereNotGte clause

Add a negated where clause using the greater or equals `>=` operator. It accepts the same arguments as the whereGte constraint. Here is an example:

```
$orcs = App\Models\Orc::query()->whereNotGte('armor', 30)->get();
```
The previous query will select all orcs whose armor is not greater or equal than 30 points. It's also possible to use an array or a set of arrays containing multiple queries.

### The orWhereLt clause

Add a where clause using the less than `<` operator, appending it to the previous one using the `OR` operator. It acceps a field and a value as main arguments. Here is the full list of arguments.

* **Field**: The name of the table column to compare.
* **Value**: The value to compare against the field.
* **Append**: If the condition should be appended to the previous one with an `AND` or an `OR`. If no value is specified, `AND` will be used by default.
* **Boolean**: It's used to negate the current constraint, getting the opposite condition. Use `true` to validate the current statement and `false` to negate it.

Here is an example:

```
$orcs = App\Models\Orc::query()->where('surname', 'Doomhammer')->orWhereLt ('armor', 30)->get();
```
The previous query will select all orcs whose surname is Doomhammer or whose armor is lower than 30 points.

It's also possible to use an array or a set of arrays containing multiple queries.
```
$orcs = App\Models\Orc::query()->where('surname', 'Doomhammer')->orWhereLt(['armor', 30],['strength', 15])->get();
```
The previous query will select all orcs whose surname is Doomhammer or the orcs whose armor is lower than 30 points and whose strength is lower than 15 points.

### The orWhereNotLt clause

Add a negated where clause using the less than `<` operator, appending it to the previous one using the `OR` operator. It accepts the same arguments as the orWhereLt constraint. Here is an example:

```
$orcs = App\Models\Orc::query()->where('surname', 'Doomhammer')->orWhereNotLt ('armor', 30)->get();
```
The previous query will select all orcs whose surname is Doomhammer or whose armor is not lower than 30 points. It's also possible to use an array or a set of arrays containing multiple queries.

### The orWhereLte clause

Add a where clause using the less or equals `<=` operator, appending it to the previous one using the `OR` operator. It accepts a field and a value as main arguments. Here is the full list of arguments.

* **Field**: The name of the table column to compare.
* **Value**: The value to compare against the field.
* **Append**: If the condition should be appended to the previous one with an `AND` or an `OR`. If no value is specified, `AND` will be used by default.
* **Boolean**: It's used to negate the current constraint, getting the opposite condition. Use `true` to validate the current statement and `false` to negate it.

Here is an example:

```
$orcs = App\Models\Orc::query()->where('surname', 'Doomhammer')->orWhereLte('armor', 30)->get();
```
The previous query will select all orcs whose surname is Doomhammer or whose armor is lower or equal than 30 points.

It's also possible to use an array or a set of arrays containing multiple queries.
```
$orcs = App\Models\Orc::query()->where('surname', 'Doomhammer')->orWhereLte(['armor', 30],['strength', 15])->get();
```
The previous query will select all orcs whose surname is Doomhammer or those orcs whose armor is lower or equal than 30 points and whose strength is lower or equal than 15 points.

### The orWhereNotLte clause

Add a negated where clause using the less or equals `<=` operator, appending it to the previous one using the `OR` operator. It accepts the same arguments as the orWhereLte constraint. Here is an example:

```
$orcs = App\Models\Orc::query()->where('surname', 'Doomhammer')->orWhereNotLte('armor', 30)->get();
```
The previous query will select all orcs whose surname is Doomhammer or whose armor is not lower or equal than 30 points. It's also possible to use an array or a set of arrays containing multiple queries.

### The orWhereGt clause

Add a where clause using the greater than `>` operator, appending it to the previous one using the `OR` operator. It accepts a field and a value as main arguments. Here is the full list of arguments.

* **Field**: The name of the table column to compare.
* **Value**: The value to compare against the field.
* **Append**: If the condition should be appended to the previous one with an `AND` or an `OR`. If no value is specified, `AND` will be used by default.
* **Boolean**: It's used to negate the current constraint, getting the opposite condition. Use `true` to validate the current statement and `false` to negate it.

Here is an example:

```
$orcs = App\Models\Orc::query()->where('surname', 'Doomhammer')->orWhereGt('armor', 30)->get();
```
The previous query will select all orcs whose surname is Doomhammer or whose armor is greater than 30 points.

It's also possible to use an array or a set of arrays containing multiple queries.
```
$orcs = App\Models\Orc::query()->where('surname', 'Doomhammer')->orWhereGt(['armor', 30],['strength', 15])->get();
```
The previous query will select all orcs whose whose surname is Doomhammer or those orcs whose armor is greater than 30 points and whose strength is bigger than 15 points.




### The orWhereNotGt clause

Add a negated where clause using the greater than `>` operator, appending it to the previous one using the `OR` operator.  It accepts the same arguments as the orWhereGt constraint. Here is an example:

```
$orcs = App\Models\Orc::query()->where('surname', 'Doomhammer')->orWhereNotGt('armor', 30)->get();
```
The previous query will select all orcs whose surname is Doomhammer or whose armor is not greater than 30 points. It's also possible to use an array or a set of arrays containing multiple queries.

### The orWhereGte clause

Add a where clause using the greater or equals `>=` operator, appending it to the previous one using the `OR` operator. It accepts a field and a value as main arguments. Here is the full list of arguments.

* **Field**: The name of the table column to compare.
* **Value**: The value to compare against the field.
* **Append**: If the condition should be appended to the previous one with an `AND` or an `OR`. If no value is specified, `AND` will be used by default.
* **Boolean**: It's used to negate the current constraint, getting the opposite condition. Use `true` to validate the current statement and `false` to negate it.

Here is an example:

```
$orcs = App\Models\Orc::query()->where('surname', 'Doomhammer')->orWhereGte('armor', 30)->get();
```
The previous query will select all orcs whose surname is Doomhammer or whose armor is greater or equal than 30 points.

It's also possible to use an array or a set of arrays containing multiple queries.
```
$orcs = App\Models\Orc::query()->where('surname', 'Doomhammer')->orWhereGte(['armor', 30],['strength', 15])->get();
```
The previous query will select all orcs whose surname is Doomhammer or those orcs whose armor is lower or equal than 30 points and whose strength is lower or equal than 15 points.

### The orWhereNotGte clause

Add a where clause using the greater or equals `>=` operator, appending it to the previous one using the `OR` operator.It accepts the same arguments as the orWhereGte constraint. Here is an example:

```
$orcs = App\Models\Orc::query()->where('surname', 'Doomhammer')->orWhereNotGte('armor', 30)->get();
```
The previous query will select all orcs whose surname is Doomhammer or whose armor is not greater or equal than 30 points. It's also possible to use an array or a set of arrays containing multiple queries.

### The whereIn clause

Add a where clause using the `IN` operator to select the rows of a table which have a field which value is in the specified set of values. It accepts these arguments:

* **Field**: The name of the table column to compare.
* **Values**: The set of values to compare against the field.
* **Append**: If the condition should be appended to the previous one with an `AND` or an `OR`. If no value is specified, `AND` will be used by default.
* **Boolean**: It's used to negate the current constraint, getting the opposite condition. Use `true` to validate the current statement and `false` to negate it.

Here is an example:

```
$orcs = App\Models\Orc::query()->whereIn('surname', ['Doomhammer', 'Blackrock'])->get();
```
The previous query will select all orcs whose surname is Doomhammer or Blackrock. It's also possible to use an array or a set of arrays containing multiple queries.
```
$orcs = App\Models\Orc::query()->whereIn(['surname', ['Doomhammer', 'Blackrock']],['name', ['Orgrim', 'Thrall'], 'AND'])->get();
```
The previous query will select all orcs whose surname is Doomhammer or Blackrock and whose name is Orgrim or Thrall.

### The whereNotIn clause

Add a negated where clause using the `IN` operator to select the rows of a table which have a field which value is in the specified set of values. It uses the same operator as the whereIn clause. Here is an example:

```
$orcs = App\Models\Orc::query()->whereNotIn('surname', ['Doomhammer', 'Blackrock'])->get();
```
The previous query will select all orcs whose surname is not Doomhammer or Blackrock. It's also possible to use an array or a set of arrays containing multiple queries.

### The orWhereIn clause

Add a where clause using the `IN` operator to select the rows of a table which have a field which value is in the specified set of values. The constraint will be appended to the previous one using the `OR` operator. It uses the same operator as the whereIn clause.

Here is an example:

```
$orcs = App\Models\Orc::query()->where('armor', '>', 10)->orWhereIn ('surname', ['Doomhammer', 'Blackrock'])->get();
```
The previous query will select all orcs whose armor is greater than 10 or whose surname is Doomhammer or Blackrock. It's also possible to use an array or a set of arrays containing multiple queries.

### The orWhereNotIn clause

Add a negated where clause using the `IN` operator to select the rows of a table which have a field which value is in the specified set of values. The constraint will be appended to the previous one using the `OR` operator. It uses the same operator as the whereIn clause. Here is an example:

```
$orcs = App\Models\Orc::query()->where('armor', '>', 10)->orWhereNotIn('surname', ['Doomhammer', 'Blackrock'])->get();
```
The previous query will select all orcs whose armor is greater than 10 or whose surname is not Doomhammer or Blackrock. It's also possible to use an array or a set of arrays containing multiple queries.

### The whereLike clause

Add a where clause using the `LIKE` operator to select the rows of a table which have a field which value matches a pattern. It accepts these arguments:

* **Field**: The name of the table column to compare.
* **Pattern**: The pattern or set of patterns to match.
* **Append**: If the condition should be appended to the previous one with an `AND` or an `OR`. If no value is specified, `AND` will be used by default.
* **Boolean**: It's used to negate the current constraint, getting the opposite condition. Use `true` to validate the current statement and `false` to negate it.

Here is an example:
```
$orcs = App\Models\Orc::query()->whereLike('name', '%al%')->get();
```
The previous query will select all orcs whose name contains the `'al'` substring. You can also specify many patterns in an array format:

```
$orcs = App\Models\Orc::query()->whereLike('name', ['%al%','%al%'])->get();
```
It's also possible to use an array or a set of arrays containing multiple queries. Here is an example:

```
$orcs = App\Models\Orc::query()->whereLike(['name', '%al%'],['surname', '%im%', 'AND')->get();
```
The previous query will select all orcs whose name contains the `'al'` substring and whose surname contains the `'im'` substring.

### The whereNotLike clause

Add a negated where clause using the `LIKE` operator to select the rows of a table which have a field which value matches a pattern. It accepts the same arguments as the whereLike clause. Here is an example:
```
$orcs = App\Models\Orc::query()->whereNotLike('name', '%al%')->get();
```
The previous query will select all orcs whose name does not contain the `'al'` substring. It's also possible to use an array or a set of arrays containing multiple queries.

### The orWhereLike clause

Add a where clause using the `LIKE` operator to select the rows of a table which have a field which value matches a pattern. The clause will be appended to the previous one using the `'OR'` operator. It accepts the same arguments as the whereLike clause. Here is an example:
```
$orcs = App\Models\Orc::query()->where('armor', '>', 10)->orWhereLike ('name', '%al%')->get();
```
The previous query will select all orcs whose armor is greater than 10 and whose name contains the `'al'` substring. It's also possible to use an array or a set of arrays containing multiple queries.

### The orWhereNotLike clause

Add a negated where clause using the `LIKE` operator to select the rows of a table which have a field which value matches a pattern. The clause will be appended to the previous one using the `'OR'` operator. It accepts the same arguments as the whereLike clause. Here is an example:
```
$orcs = App\Models\Orc::query()->where('armor', '>', 10)->orWhereNotLike ('name', '%al%')->get();
```
The previous query will select all orcs whose armor is greater than 10 and whose name does not contain the `'al'` substring. It's also possible to use an array or a set of arrays containing multiple queries.
