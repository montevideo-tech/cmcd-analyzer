# CMCD-Analyzer
Welcome to CMCD-Analyzer. 
The CMCD-Analyzer allows any developer or tester to collect and analyze data from any type of player that has CMCD implemented. To be more specific, it will intercept players requests to check if the CMCD keys sent to the CDN are valid or not regarding the [CMCD Standard](https://cdn.cta.tech/cta/media/media/resources/standards/pdfs/cta-5004-final.pdf).
## How to run the enviroment
To run the CMCD-Analyzer enviroment you will need to have installed and running:
 - Docker: [Docker Desktop](https://www.docker.com/products/docker-desktop/)
 - [Docker-compose](https://docs.docker.com/compose/install/)
 
When everything's ready, use docker-compose in your preferred command line with:
````
docker-compose up
````
This command will get the analyzer running on http://localhost:3000.
## How to use it
At this point of the Analyzer, you can only try the system in a local player or using the demo app of this repo [CMCD-Validator-demo-app](https://github.com/montevideo-tech/cmcd-validator/tree/develop/packages/cmcd-validator-demo-app) which contains a platform designed to validate CMCD in certain implemented players.
In the repo you will have the instructions on how to use it.

Inside the CMCD-Analyzer folder, create a `.env` file and inside it have this key:
````
VIDEO_TEST_URL='https://dxclj9vp3m44c.cloudfront.net/hls/'
````
In this example, we already designated the port to 3000 and fed a URL leaving only the relative route without the <file-name>.

To use the CMCD-Analyzer  feed the player a modified URL that points towards the system.
> **_NOTE:_** You can use the modified URL in the example below.
#### Example:
A modified URL should be structured like this:
````
<ip>:<port>/video-test/<id>/<file-name>
````
URL example:
````
https://dxclj9vp3m44c.cloudfront.net/hls/Costa_Rica_144.m3u8
````
The modified URL should look like this:
````
http://localhost:3000/video-test/1/Costa_Rica_144.m3u8
````
Paste the modified URL on the player and press start.
