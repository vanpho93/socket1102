const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
server.listen(process.env.PORT || 3000, () => console.log('server started'));

app.get('/', (req, res) => res.render('home'));

app.get('/chat', (req, res) => {
    res.render('chat');
});

class User {
    constructor(username, id) {
        this.username = username;
        this.id = id;
    }
}

const arrUsername = [];
const arrUser = [];

io.on('connection', socket => {
    console.log(socket.id);
    socket.on('NEW_USER_SIGN_UP', username => {
        if (arrUsername.indexOf(username) === -1) {
            arrUsername.push(username);
            arrUser.push(new User(username, socket.id));
            socket.emit('XAC_NHAN_DANG_KY', arrUsername);
            socket.broadcast.emit('NEW_USER_CONNECTED', username);
        } else {
            socket.emit('XAC_NHAN_DANG_KY', false);
        }
    });

    socket.on('CLIENT_SEND_NEW_MESSAGE', msg => {

    });
});

//emit, on. on
