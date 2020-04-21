var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
    let base_value = req.query.base_value;
    let method = req.query.method;
    let addition_value = req.query.addition_value;
    let action = req.query.action;
    if (action == '=') {
        if (method == '+') {
            base_value = parseInt(base_value) + parseInt(addition_value);
        } else if (method == '-') {
            base_value = parseInt(base_value) - parseInt(addition_value);
        } else if (method == '*') {
            base_value = parseInt(base_value) * parseInt(addition_value);
        }else if (method == '/') {
        base_value = parseInt(base_value) / parseInt(addition_value);
    }

        method = '';
        addition_value = '';
    } else if (action == '+' || action == '-' ||
        action == '*' || action == '/') {
        method = action
    } else if (action == '0' || action == '1' || action == '2' ||
        action == '3' || action == '4' || action == '5' |
        action == '6' || action == '7' || action == '8' ||
        action == '9') {
        if (method) {
            addition_value = addition_value + action;
        } else {
            base_value = base_value + action;
        }
    } else {
        base_value = '';
        method = '';
        addition_value = '';
    }
    res.render('home', {
        base_value: base_value,
        method: method,
        addition_value: addition_value
    });
});
let port = 3000;
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
