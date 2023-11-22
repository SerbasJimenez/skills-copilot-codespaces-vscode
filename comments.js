// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var comments = [];
var server = http.createServer(function (request, response) {
  // Parse the URL
  var parsedUrl = url.parse(request.url, true);
  // Get the path
  var path = parsedUrl.pathname;
  // Get the query
  var query = parsedUrl.query;
  // Get the HTTP method
  var method = request.method;
  // Log the path
  console.log('Path: ' + path + ' Method: ' + method);
  // If the path is /comments
  if (path === '/comments') {
    // If the method is GET
    if (method === 'GET') {
      // If the query is approved
      if (query.approved === 'true') {
        // Filter the comments
        var filteredComments = comments.filter(function (comment) {
          return comment.approved;
        });
        // Set the response status code to 200
        response.statusCode = 200;
        // Set the content type to JSON
        response.setHeader('Content-Type', 'application/json');
        // Send the filtered comments
        response.end(JSON.stringify(filteredComments));
      // If the query is not approved
      } else {
        // Set the response status code to 200
        response.statusCode = 200;
        // Set the content type to JSON
        response.setHeader('Content-Type', 'application/json');
        // Send all the comments
        response.end(JSON.stringify(comments));
      }
    // If the method is POST
    } else if (method === 'POST') {
      // Create a variable to store the data
      var body = '';
      // When the request gets data
      request.on('data', function (data) {
        // Append the data to the body
        body += data;
      });
      // When the request ends
      request.on('end', function () {
        // Parse the body
        var comment = JSON.parse(body);
        // Set the approved property to false
        comment.approved = false;
        // Add the comment to the comments array
        comments.push(comment);
        // Set the response status code to 201
        response.statusCode = 201;
        // Set the content type to JSON
        response.setHeader('Content-Type', 'application/json');
        // Send the comment