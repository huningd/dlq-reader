# DLQ-Reader


#WebSockets
To inform the web app about new messages we use native web sockets. In case of cross browser compatibility and fallbacks if native websockets aren't present it is also possible to use librarys as [SockJS](https://github.com/sockjs/sockjs-client) or [Socket.io](https://socket.io/get-started/). In the backend I use the abstraction of spring-websocket to establish a web socket connection. Under the hood this abstraction uses the tomcat-embed-websocket implementation of JSR-356.

# How to start
## Service
./gradlew bootRun

## App
ng serve --host 0.0.0.0 --port 4201

# Task Board
https://trello.com/b/JfOjbjxf/dlq-reader

# Links
- https://github.com/angular/angular-cli
- https://dzone.com/articles/spring-webflux-first-steps
- http://mmrath.com/post/websockets-with-angular2-and-spring-boot/
- https://jaxenter.de/websockets-mit-angular-2-49543
- http://docs.spring.io/spring/docs/current/spring-framework-reference/html/websocket.html
- Icons: https://material.io/icons/#ic_delete_forever
- Md: https://coursetro.com/posts/code/67/Angular-4-Material-Tutorial
- https://blog.lgohlke.de/java/websockets/2015/01/21/websockets-mit-springboot-und-jetty.html
- The WebSocket Protocol https://tools.ietf.org/html/rfc6455

