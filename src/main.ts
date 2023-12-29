import PostsRouter from "./presentation/routers/post-router"
import server from "./server"

const postMiddleware = PostsRouter()

server.use("/search", postMiddleware)

const PORT = process.env.PORT || 3002
server.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`))