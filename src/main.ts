import mongoose from "mongoose";
import { MongoDBDatabaseWrapper } from "./data/data-sources/mongodb/mongodb-database";
import { MongoDBUserActionDataSource } from "./data/data-sources/mongodb/mongodb-user-action-data-source";
import { NoSQLDatabaseWrapper } from "./data/interfaces/nosql-database-wrapper";
import { UserActionRepositoryImpl } from "./domain/repositories/user-action-repository";
import { CreateUserAction } from "./domain/use-cases/create-user-action";
import PostsRouter from "./presentation/routers/post-router"
import server from "./server"

async function getMongoDB() {

    const contactDatabase: NoSQLDatabaseWrapper = MongoDBDatabaseWrapper.getInstance();

    return new MongoDBUserActionDataSource(contactDatabase);
}

(async () => {
    const dataSource = await getMongoDB();

    const postMiddleWare = PostsRouter(
        new CreateUserAction(new UserActionRepositoryImpl(dataSource))
    )

    server.use("/search", postMiddleWare)

    const PORT = process.env.PORT || 3002
    server.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`))


    process.on('SIGINT', async () => {
        console.log('Received SIGINT. Shutting down gracefully...');
            mongoose.connection.close() 
        });

        process.on('SIGTERM', async () => {
            console.log('Received SIGTERM. Shutting down gracefully...');
            mongoose.connection.close()
        });
})()