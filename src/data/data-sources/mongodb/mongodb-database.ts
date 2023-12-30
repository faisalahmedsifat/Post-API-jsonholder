import mongoose, { Schema } from "mongoose";
import { NoSQLDatabaseWrapper } from "../../interfaces/nosql-database-wrapper";

export class MongoDBDatabaseWrapper implements NoSQLDatabaseWrapper {
    private static instance: MongoDBDatabaseWrapper;
    private userActionSchema: Schema;
    private postSchema: Schema;
    private userActionModel: any;
    private postModel: any;
    
    private constructor() {
        mongoose.set("strictQuery", false);

        const url = "mongodb+srv://faisalahmed531:sifat@cluster0.mijflto.mongodb.net/ShareTripInterview?retryWrites=true&w=majority"

        console.log("connecting to", url);

        mongoose
            .connect(url)

            .then((result: any) => {
                console.log("connected to MongoDB");
            })
            .catch((error: any) => {
                console.log("error connecting to MongoDB:", error.message);
            });


        this.postSchema = new mongoose.Schema({
            _id: mongoose.Schema.Types.ObjectId,
            id: Number,
            title: String,
            body: String,
            userId: Number,
        });

        this.userActionSchema = new mongoose.Schema({
            _id: mongoose.Schema.Types.ObjectId,
            keyword: String,
            browser: String,
            createdAt: Date,
            modifiedAt: Date,
            posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        });

        this.userActionModel = mongoose.model("UserAction", this.userActionSchema);

        this.postModel = mongoose.model("Post", this.postSchema);

     }
    public static getInstance(): MongoDBDatabaseWrapper {
        if (!MongoDBDatabaseWrapper.instance) {
            MongoDBDatabaseWrapper.instance = new MongoDBDatabaseWrapper();
        }
        return MongoDBDatabaseWrapper.instance;
    }
    public async insertOneToMany(data: any): Promise<any> {
        const userAction = new this.userActionModel({
            _id: new mongoose.Types.ObjectId(),
            keyword: data.keyword,
            browser: data.browser,
            createdAt: data.createdAt,
            modifiedAt: data.modifiedAt,
        });

        const postIds = [];
        console.log("posts count", data.posts.length)
        for (const post of data.posts) {
            let postAction = this.postModel({
                _id: new mongoose.Types.ObjectId(),
                id: post.id,
                title: post.title,
                body: post.body,
                userId: post.userId,
            });

            await postAction.save();

            postIds.push(postAction._id);
        }

        userAction.posts.push(...postIds);
        userAction.modifiedAt = new Date();
        await userAction.save();

        return data;
    }
}