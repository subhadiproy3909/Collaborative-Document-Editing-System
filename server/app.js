require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();


const connectDB = require("./database/config");


connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("hello from server side");
});

app.use('/document/', require("./routes/documentRoute"));
app.use('/user/', require("./routes/userRoute"));

const server = app.listen(PORT, () => {
    console.log(`Running on port: http://localhost:${PORT}`);
});


const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ['GET', 'POST'],
    },
    pingTimeout: 60000,
})

io.on("connection", socket => {
    console.log("socket connected");
    let documentId = '';
    socket.on("open-document", (id) => {
        socket.join(id);
        documentId=id;
        socket.emit("load-document", documentId);

        socket.on('send-changes', (delta) => {
            socket.broadcast.to(documentId).emit("receive-changes", delta);
        })
        socket.on('typing', (delta) => {
            socket.emit("document-saved", delta);
        })
    })

})