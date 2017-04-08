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

const arrUsername = [];

io.on('connection', socket => {
    socket.on('NEW_USER_SIGN_UP', username => {
        if (arrUsername.indexOf(username) === -1) {
            arrUsername.push(username);
            socket.emit('XAC_NHAN_DANG_KY', arrUsername);
            io.emit('NEW_USER_CONNECTED', username);
        } else {
            socket.emit('XAC_NHAN_DANG_KY', false);
        }
    });
});

//emit, on. on
