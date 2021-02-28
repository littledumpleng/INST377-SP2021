import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import reload from 'livereload';
import connectReload from 'connect-livereload';

console.log('hello');

function onLoad() {
    console.log('script loaded');
}

window.onload = onLoad;

app.route('/api') // '/api' is the endpoint you want to go to
    .post(async (req, res) => { // use async for external resources, which take time to get back to you
        console.log("POST request detected");
        console.log("Hello World");
    });

// http://localhost:3000/api


// how to use cypress
// shy isn't app.route working and how to do the POST request
// In Server.js, edit the contents of the callback in the .post() route in server.js to send a response back to the front end.
// You will need the Express documentation to do this:
// Cypress will check that the response says "Hello World