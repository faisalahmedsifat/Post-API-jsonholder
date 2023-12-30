import { MongoDBDatabaseWrapper } from "./data/data-sources/mongodb/mongodb-database";
import { MongoDBUserActionDataSource } from "./data/data-sources/mongodb/mongodb-user-action-data-source";
import { NoSQLDatabaseWrapper } from "./data/interfaces/nosql-database-wrapper";
import { UserActionRepositoryImpl } from "./domain/repositories/user-action-repository";
import { CreateUserAction } from "./domain/use-cases/create-user-action";
import PostsRouter from "./presentation/routers/post-router"
import server from "./server"

// Function to get MongoDB data source
async function getMongoDB() {
    const contactDatabase: NoSQLDatabaseWrapper = MongoDBDatabaseWrapper.getInstance();

    return new MongoDBUserActionDataSource(contactDatabase);
}

// Main function
(async () => {
    let dataSource: MongoDBUserActionDataSource | undefined;
    try {
        // Get MongoDB data source
        dataSource = await getMongoDB();
        
        // Create middleware for posts router
        const postMiddleWare = PostsRouter(
            new CreateUserAction(new UserActionRepositoryImpl(dataSource))
        )

        // Use the middleware for "/search" route
        server.use("/search", postMiddleWare)

        // Set the port
        const PORT = process.env.PORT || 3002

        // Start the server
        server.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`))

    } catch (error: any) {
        // Handle errors
        console.log(error.message);
    }

})()