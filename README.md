#### Distributed Architecture

#### Main AWS Services used:
- ECS / Fargate
- X-Ray
- SQS

#### Folder Structure:
```
src
  ├── container-main [nodejs]
  ├── container-process [python]
  ├── container-consume [nodejs]
  ├── container-xray [xray-daemon]
  ├── .env
  └── docker-compose.yml
```

#### IPs & Ports:
- container-main: 8080
- container-process: 8082
- container-consume: 8081
- container-xray: 2000

#### Container Desccription:
- container-main: our main container that is exposed to the public
- container-process: a simple container that can communicate with the main one
- container-consume: is the container responsible for listening on SQS, if we have a message it consumes it
- container-xray: where our X-Ray daemon is stored, it will be responsible on listening all the http connections going on inside our network

#### APIs:
- Method: GET | Path: /api/path-one
- Method: GET | Path: /api/path-two (will communicate with our private container-process)
- Method: POST | Path: /api/send-message (will send SQS message) (takes message attribute inside the body: the message that needs to be send)