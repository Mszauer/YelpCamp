RESTful Routes

name        url             verb
=================================
INDEX   /campgrounds        GET
NEW     /campgrounds/new    GET
CREATE  /campgrounds        POST
SHOW    /campgrounds/:id    GET

Nested routes
==================================================
NEW     /campgrounds/:id/comments/new   GET
CREATE  /campgrounds/:id/comments       POST