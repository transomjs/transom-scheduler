# Transom Scheduler

A Transom Plugin wrapper around the Simple Event Scheduler. A convenient way to add the 
functionality of the [Simple Event Scheduler](https://www.npmjs.com/package/simple-event-scheduler) to the [TransomJS](https://transomjs.github.io/) Landscape.

# Usage

```
const {TransomScheduler} = require('@transomjs/transom-scheduler');
const Transom = require('@transomjs/transom-core');

const transom = new Transom();
const transomScheduler = new TransomScheduler();

transom.configure(transomSequelize, {
    preMiddleware: []    
});
transom.configure(transomScheduler, {
    jobsTableName:'job'
});

function setupListeners(server){
    const scheduler = server.registry.get('scheduler');

    scheduler.on("jobs", (event) => {
        console.log("Yay, I can handle the event right here!", {event});
    });


    //just a test job, 3 seconds out.
    const d = new Date(new Date().getTime() + 3000);
    scheduler.createOnetimeJob(`onetimer ${d.getTime()}`, d);

    scheduler.start();

}


 transom
    .initialize(apiDefinition)
    .then(function(server) {

        setupListeners(server);
       
        //remainder of the startup here
        ...

    })
    .catch(function(err) {
        console.log('Unable to start the server, exiting');
        console.error(err);
        process.exit(-1);
    });
```

# Need Support?
Transom Scheduler is developed and maintained by [BinaryOps Software Inc.](https://binaryops.ca) in Canada.
