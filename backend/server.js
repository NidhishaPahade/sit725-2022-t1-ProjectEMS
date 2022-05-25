const express = require("express");
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;
const vm = require("v-response");
const morgan = require('morgan');
const mongoose = require("mongoose")
const LEAVE = require("./leave/leave.route");
const Employee = require("./employee/employee.route");

app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']

}));

app.use(express.json());
app.use(morgan('dev'));
app.use('/api', LEAVE);
app.use('/employee', Employee);

const database = 'mongodb://localhost:27017/levemanagementdb';


mongoose.connect((database), {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
})
    .then(async () => {
        vm.log("connected to database", database);
    })
    .catch(err => vm.log("error mongodb", err));


app.listen(port, () => vm.log("server running on port:", port));