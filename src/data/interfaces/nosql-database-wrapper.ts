/**
 * Represents a wrapper for a NoSQL database.
 */
export interface NoSQLDatabaseWrapper {
    /**
     * Inserts a document into the database with a one-to-many relationship.
     * @param doc The document to be inserted.
     */
    insertOneToMany(doc: any): Promise<any>;
}