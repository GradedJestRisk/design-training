# Make ORM use optional

The goal is: 
- to use Object Oriented Programming (OOP); 
- while persisting state in a relational database.

## Preliminaries

### Object and data structure
In order to state explicitly what is OOP, let's define an object, according to (Robert Martin)[https://blog.cleancoder.com/uncle-bob/2019/06/16/ObjectsAndDataStructures.html]
> An object is a set of functions that operate on implied data elements.

This way, we can get rid of the ambiguity with its homonym `Object` in Javascript
- which is (a data type)[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object]
- which is does not necessarily implement an object, as in OOP paradigm

The `data` from `data elements` is state, which can be stored apart from function in `data structure`.
> A data structure is a cohesive set of data elements operated upon by
> implied functions.

He then concludes with  
> Objects are the opposite of data structures.
> Databases contain data structures, not objects.

### ORM and object

Still according to (Robert Martin)[blah], an ORM does not deal with object at all
> Doesn’t an ORM (Object Relational Mapper) map database tables to objects ?
> Of course not. There is no mapping between database tables and objects. 
> So then what do ORMs do?
> They transfer data between data structures.

ORM only deal with `data elements` implied in objects.
> ORMs extract the data that our objects operate upon. 
> That data is contained in a data structure loaded by the ORM.

### Different forces acting upon data in database or in objects

We have two different structures on the stage
> Business objects define the structure of the business behavior.
> Database schemas define the structure of the business data.
> Those two structures are constrained by very different forces.
> The structure of the business data is not necessarily the best structure for the business behavior.
> People used to call this the Object/Relational impedance mismatch.

We might object that, most of the time, the data elements in objects will look very much like database's relations, aka tables.
To this, Robert Martin would disagree, when one database is used by several application.
> Each application will have a different object model, tuned to that application’s behavior.
> The database schema is not tuned for just one application; it must serve the entire enterprise.
> So the structure of that data is a compromise between many different applications.

The goal is to get the best of the two paradigms, storage and behaviour.

## ORM

### Where do these paradigms meet ?
In practical terms, `Object/Relational impedance mismatch` states that, most of the time, an object `data elements`
will either:
- be located in different tables;
- not include all table columns.

We'll then need a mapping between objects data elements and database table and columns.
This mapping can be performed manually in SQL.

To keep focus on business behavior, we'll keep this mapping out of objects.
We can put it in a gateway using (clean architecture)[https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html].
The gateway will:
- persist object, reading its data elements and writing them over one of several tables;
- instantiate object, reading data structure from database, and invoking the object constructor.

We can use another architectural pattern, as long as we make persistence a detail.

### ORM, at last

This solution has two drawbacks:
- SQL is usually provided to the database client as a string, not as a DSL, lowering readability;
- the mapping should be performed on each query, therefore repetitive and error-prone.

ORMs are aiming to remove these drawbacks, by:
- storing the mapping itself in declarative files, called models, written in a DSL;
- supplying an API to trigger actions on these models (data reading, creation, update, deletion), acting as gateways, but usually named repositories.

The only knowledge a developer should have of the database was its data structure, which can be
obtained from UIs or from diagrams, therefore dispensing him to learn SQL.

Specifically, we need the following:
- each object may contain its own data collection
- each object may be linked to other objects though composition  
- each object can be persisted in several tables, and some properties should be omitted
- each object can be instantiated from several tables, and some columns may be omitted

## ORM's own problems

### Database agnostic
ORMs have usually added one more constraint: database agnostic. In order to do so, they usually leverage the features
available in all databases. If you need a feature available in Postgresql (eg. SERIALIZABLE isolation level), which
is not available in MySQL, you may not be able to use it in ORM.

### Mapping
A good deal of abstraction was gained between:
- a query in SQL;
- a function call in native language.

However, the actual complexity of the problem was high, and impedance mismatch could 
still be painful to deal with.

Objects hierarchies had to fit into database normalization.
Especially, inherited properties could be stored in numerous way.
To choose among them, the developer has to make performance tradeoffs.

Even without inheritance, mapping would be limited to the most simple case:
- an object's data elements are read in a single table, with all its columns;
- when an object has links with other objects, a separate model should be created;
- when an object is persisted, all of its data elements should match the database column.

In short, everything works if your object schema match your database schema.
If so, if we refer to Robert Martin, we're no longer in OOP.

### ORM isolation
(Clean architecture)[https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html] architecture pattern
advocates to keep database details (ORM Models included) and objects apart, using the gateway pattern.
Object would be created:
- with data elements retrieved by the ORM;
- invoking object constructors (and additional functions on instantiated objects).
As object may contains other objects, especially collections, it should be done following a plan.
  
Such task has to be performed manually, or some tooling must be written, involving object introspection.
It adds complexity and is not done by the ORM.  

### Reporting
Reporting queries make use of analytics functions and nested subqueries.
They didn't may to a few tables, and creating a ORM model for each would be tedious.
Some ORMs, to preserve a database-agnostic solution, supplied their own DSL (eg `HQL` for Hibernate).
This way, they turn to no more than query builder, giving away the implicit mapping.

### Performance
Performance problems popped:
- should we handle the less data possible, making several queries with limited scope (table and columns)
- or should we get lower latency by making less database calls (as they go over network), making less queries with increased scope ?

Potential solutions are:
- to provide on-query control to the developer, letting him choose `lazy-loading` or `eager-loading`
- to include a local cache, thereby reducing network calls.

## 20 years of ORM

Both OOP and ORM are available to a widespread audience since 20 years, with Java and Hibernate.
We can then get some valuable feeback, as:
- Hibernate is the most advanced ORM, and is open-source (no Javascript offer `lazy/eager` loading and cache out of the box)
- developers have had all the time to get used to it.

The main feedbacks are:
- ORMs work well if your object structure mirrors the database structure;
- developer need database experience to make ORMs work with average performance, as in SQL;
- some SQL queries cannot be performed, even using an ORM's own DSL (eg `HQL`).

## Conclusion

In 2006, Ted Neward's (blog post on ORM)[https://blogs.tedneward.com/post/the-vietnam-of-computer-science/]
neatly stated the problem:
> Others call this “the Last Mile Problem”: that as one nears the end of a problem,
> it becomes increasingly difficult in cost terms (both monetary and abstract) to find a 100% complete solution.

### Sweet spot
In some context, an ORM can relieve you of writing boilerplate code. However, such context may
involve simple mapping, few tables accessed together, no sub-queries, no inheritance.
In this is so, are you actually using OOP ? 

As we've seen in (Preliminaries)[./Preliminaries], an ORM does not turn: 
- an application implemented with a OOP-ready language ( most modern language are);
- in an OOP application.

If, most of the time, you have functions (eg. services in MVC) operating over data structure,
straight from database, you're in the sweet spot for a "data structure transfer tool / data mapper",
aka ORM. It's perfectly okay to access the database writing as less code as possible.

### Make ORM optional

You do not have to get rid of your existing ORM and write raw SQL in strings.

#### Skill assessment 

If you work in a codebase with an ORM, and everybody is trained, you can go on to the next section.
However, if there is no ORM used, and nobody in the team has ever used an ORM, think twice, as:
- ORM offers differs greatly between language;
- skills are not easily transferable.

#### Performance

Here's a few guidelines for performance problems:
- make sure everyone at basic skills in DB performance (eg. understand index, read execution plan);
- perform some performance test and/or activate the features to check actual SQL generated.
  
If the ORM is performing badly
- check your ORM capability and do a ROI to train someone (these skills may not be transferable)
- go on, or revert to SQL (DBA can be asked for help) 

#### Complexity

If you had to make changes to ORM models or make convoluted use of API, chances are 
it's so complex than SQL would have been better.

### But raw SQL is not mandatory

You can skip the ORM but still perform SQL queries in an DSL using a query builder.

It also provides additional and valuable features:
- prevent SQL injection;
- DSL for database schema versioning.

Some query-builder even prevent errors by introspecting database'schema and
doing type checking against your code, eg. jooq in Java.

Same advice as for ORM: if the query end up being more complex with a query builder
than in plain SQL, switch back to SQL.
