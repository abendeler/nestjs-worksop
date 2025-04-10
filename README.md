# NestJs Workshop

## Modules

Modules are stand alone NestJs components that (generally speaking) have no knowledge of the outside. This means that you need to declare explicitly what its dependencies are as well as what it will expose to the outside.

To tell NestJs that a class is a module, you need to annotate it with the @Module decorator. This decorator takes in an object with the following optional parameters:

- imports: this is an array of all stand alone modules that the current module is dependent on
- providers: this is an array of all providers part of the current module.
- exports: this is an array of all providers declared on this module that may be used in another module that imports this module.

## Exercise 2:

- run the app using the command `npm run start:dev`
- Go to app.module.ts
- Notice that AppModule has TasksModule as imported module.
- Go to TasksModule and notice that the module decorator is empty
- Declare TasksController as a controller on the TasksModule
- Save and notice in the terminal that TasksController is initialised
- Go to TasksController and notice 2 methods. They are not hooked to a path yet.
- Use the appropriate decorator for "getTasksBycreator"
- Do not save yet; first inspect the terminal.
- Then save, notice that "LOG [RouterExplorer] Mapped {/tasks, GET} route" has been added to the console logs
- Try out the endpoint using Postman / Insomnia / your browser
- For getTaskById, see if you can declare a route that takes in a param as argument. How do you extract the param from the route? (hint: @Param)
