# Handle an incoming call to your Sinch number using Node.js and Express

This project will run an express server, generate an ngrok URL which will be added to your Sinch application's configured callback URL, and handle ICE callbacks from the Sinch Platform @ *POST* `/incoming-call`.

## Requirements

* [Sinch Platform Account](https://dashboard.sinch.com/voice/overview)
* [Docker](https://docs.docker.com/get-docker/)
* [Makefile](https://makefiletutorial.com) - optional

## How to start the server and configure the sinch callback url

Use the `make` commands bellow and follow the next steps:

1. Copy your Sinch application key and secret from one of your [Sinch apps](https://dashboard.sinch.com/voice/apps)
2. Build the docker image
3. Run a container using the built image
4. Done! You can now call any of your Sinch numbers that are assigned to the app credentials that you have used above. Your server will now handle ICE callback events generated by the Sinch Platform when dialing your numbers!

### Basic usage

Run the following command in your terminal to see all the available commands.

```bash
make help
```

#### Build and tag the image

```bash
make build
```

#### Run a container using the built image

```bash
make run
```

#### Stop the running container

```bash
make stop
```
