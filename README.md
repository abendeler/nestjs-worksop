# NestJs Workshop

## Modules & Controllers

Modules are stand alone NestJs components that (generally speaking) have no knowledge of the outside. This means that you need to declare explicitly what its dependencies are as well as what it will expose to the outside.

To tell NestJs that a class is a module, you need to annotate it with the @Module decorator. This decorator takes in an object with the following optional parameters:

- imports: this is an array of all stand alone modules that the current module is dependent on
- providers: this is an array of all providers part of the current module.
- exports: this is an array of all providers declared on this module that may be used in another module that imports this module.

## Exercise 1:

The Goal of this exercise is to get more hands on experience to become familliar with how NestJs modules work. You will have completed this exercise when you have a running openApi UI where you can call the endpoint of the tasks controller in the UI (or Postman / Insomnia).

- Go to main.ts; this is where the application bootstraps
- Notice that Swagger Open Api is configured here and that a port is assigned to the server. Also notice that SwaggerModule dictates that the Open Api UI can be found on /docs.
- run the app using the command `npm run start:dev`
- check the logs and see which port the application is running on
- Navigate to Swagger Open Api UI; what do you see?

We need to be able to call an endpoint on this app

- Go to app.module.ts
- Notice that AppModule has no dependencies aside from the ConfigModule (for loading env variables).
- Import TasksModule and declare that it is a module dependency of AppModule
- Save and reload the page; what do you see?

- Go to tasks.module.ts
- Notice that the module has declared its dependencies but that they are all empty arrays.
- Add TasksController as a dependency, save and reload the page; what do you see?
- Navigate to tasks.controller.ts
- Notice an unused import. This is a decorator, just like @ApiTags and @Controller. Can you figure out what to do in order to be able to call getHello?

## Exercise 2:

Now it is time to create your own controller and module, load it into the application and call it from the Swagger Open Api UI.

- Create another module in a separate file and folder with the name of your choosing
- Define a controller in a separate file with the name of your choosing. Use the tasks.controller.ts as an example to help you with the annotations
- Declare a method on the controller, delare it as the GET handler
- Make the controller a dependency of the module you created
- Make the module a dependency of AppModule
- See if you can call the newly created endpoint
