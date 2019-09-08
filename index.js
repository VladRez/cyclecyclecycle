const app = require("./server/server")

const port = process.env.PORT || 5000;
console.log(process.env.NODE_ENV)
app.listen(port, () => {
    console.log(`listening on ${port}`);
})
