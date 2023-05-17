
# CMCD-Analyzer

**Welcome to CMCD-Analyzer.**

The CMCD-Analyzer allows any developer or tester to collect and analyze data from any type of player that has CMCD implemented. To be more specific, it will intercept players requests to check if the CMCD keys sent to the CDN are valid or not regarding the [CMCD Standard](https://cdn.cta.tech/cta/media/media/resources/standards/pdfs/cta-5004-final.pdf).

## Table of Contents

* [Run the environment](#Run-the-environment)
* [Usage](#Usage)
	* [Build modified URL](#Build-modified-URL)
	* [Analyze data](#Analyze-data)

## Run the enviroment

To run the CMCD-Analyzer enviroment you will need to have installed and running:

- Docker: [Docker Desktop](https://www.docker.com/products/docker-desktop/)

- [Docker-compose](https://docs.docker.com/compose/install/)

When everything's ready, use docker-compose in your preferred command line running the command:

````

docker-compose up

````

>  **_NOTE:_** This command will get the analyzer running and you can see every CMCD request being validated in the command line.

## Usage

>  **_NOTE:_ Inside the CMCD-Analyzer folder, change the .env.tmp file to  .env.**

You can use the system in any player by feeding a modified URL to it. Also, if you want to try the anylizer fast and easy, you can use the demo app of this repository: [CMCD-Validator-demo-app](https://github.com/montevideo-tech/cmcd-validator/tree/develop/packages/cmcd-validator-demo-app).

**At the current state of the Analyzer, the URL has to be builded manually.**

>  **_NOTE:_ You can use the modified URL in the example below.**

### Modified URL example:
````

http://localhost:3000/video/1/ew0KIOKAnHVybOKAnTog4oCcaHR0cHM6Ly9keGNsajl2cDNtNDRjLmNsb3VkZnJvbnQubmV0L2hscyINCn0=/Costa_Rica_144.m3u8

````

## Build modified URL
#### A modified URL should be structured like this:
````

<ip>:<port>/video/<id>/base_64_encoded/<file-name>

````
>  **_NOTE:_** The 'base_64_encoded' is the relative path of the url put into a json and encoded to base64.

#### Non-modified URL example:
````
https://dxclj9vp3m44c.cloudfront.net/hls/Costa_Rica_144.m3u8
````

>  **_NOTE:_** The relative path of this URL you should build as a JSON and encode is: ````https://dxclj9vp3m44c.cloudfront.net/hls/````
>It would look like this:
````
{
 “url”: “https://dxclj9vp3m44c.cloudfront.net/hls"
}
````
>  To encode it you can use [Base64 Encode](https://www.base64encode.org/)
####  URL example modified:
````

http://localhost:3000/video/1/ew0KIOKAnHVybOKAnTog4oCcaHR0cHM6Ly9keGNsajl2cDNtNDRjLmNsb3VkZnJvbnQubmV0L2hscyINCn0=/Costa_Rica_144.m3u8

````

## Analyze data

**To see the collected data, you simply have to access Elastic in ````http://localhost:5601/```` and follow these steps:**

1. Log in with the following credentials:


2. Got to the hamburguer menu and select ````discover```` from analytics:


3. Press ````Create data view````:

4. Name it as you want and set the index pattern to ````*1````, then select ````received_datetime```` as Timestamp field and press ````save data view to Kibana````.

5. Watch the collected data: