import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

const path = require('path');
const cors = require('cors');
const router = express.Router();
var LdapStrategy = require('passport-ldapauth');
const authentication = require('./controllers/authentication')

dotenv.config();
const port = process.env.PORT || 4000;


/* passport.use(new LdapStrategy({
    server: {
      url: 'ldap://localhost:389',
      ...
    }
  })); */


const app: Express = express();
app.use(cors());

router.route('/api/authenticate')
.post(authentication.authenticate)