import {SequelizeAdapter, SimpleEventScheduler} from "simple-event-scheduler";
import createDebug from "debug";

const debug = createDebug('Transom-Scheduler')
export interface TransomSchedulerOptions {
    /**
     * The name of the sequelize object in the Transom server registry
     */
    sequelizeName?: string;

    /**
     * The name of the jobs table in the database
     */
    jobsTableName?: string;

    /**
     * The name of the Simple-Event-Scheduler object in the Transom server registry
     */
    schedulerName?: string;
}

class TransomScheduler {

    private mySettings: TransomSchedulerOptions = {};


/**
 * The initialize method, part of the Transom Plugin interface. It is called by the Transom Server, initializing all the
 * configured plugins.
 * @param server Transom-Core instance, provides access to the server registry among others
 * @param options The options passed in, configures the plugin. 
 */
    public initialize(server:any, options?: TransomSchedulerOptions): Promise<void>{

        debug("Initializing ...");

        return Promise.resolve()
        .then(() => {
            this.mySettings = options || {};
            this.mySettings.jobsTableName = this.mySettings.jobsTableName || 'jobs';
            this.mySettings.sequelizeName = this.mySettings.sequelizeName || 'sequelize';
            this.mySettings.schedulerName = this.mySettings.schedulerName || 'scheduler';
            return;
        });
    }

    /**
     * The PreStart method, part of the Transom plugin interface. Is called by the server before the server starts listening on it's port, 
     * but after all the plugins are initialized.
     * @param server The Transom core instance
     * @param options any additional options as may be necessary. Not used by this plugin.
     */
    public preStart(server: any, options: any): Promise<void>{
        debug("Prestarting Transom Scheduler");
        return Promise.resolve()
        .then(() => {
            const sequelize = server.registry.get(this.mySettings.sequelizeName);
            if (!sequelize) {
                throw new Error("No Sequelize Found in the registry");
            }
            const adapter = new SequelizeAdapter(sequelize, {tablename: this.mySettings.jobsTableName});
            const scheduler = new SimpleEventScheduler(adapter,);
            server.registry.set(this.mySettings.schedulerName, scheduler);
            return;
        })
    }

}

export {TransomScheduler}