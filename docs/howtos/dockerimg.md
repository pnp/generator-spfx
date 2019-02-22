# How to use Docker with @pnp/spfx generator

The following definiton of a Docker file can be used to run @pnp/generator-spfx in Docker.

## Create a folder for your Docker file

Create a folder on your hard drive and add a file named 'Dockerfile'.


```bash
FROM node:8.12.0

EXPOSE 5432 4321 35729

RUN npm i -g gulp@3 yo @pnp/generator-spfx@latest --unsafe-perm

VOLUME /usr/app/spfx
WORKDIR /usr/app/spfx

RUN useradd --create-home --shell /bin/bash spfx && \
    chown -R spfx:spfx /usr/app/spfx

USER spfx

CMD /bin/bash
```

## Build the image

The following command creates a persitent container for pnp/spfx. It allows you to start the image faster from any spfx container on your hard drive.

To build the docker image execute the form of command:

```bash
docker build -t <imagename>:<tag> .
```

For example a pnpspfx generator version 1.6.2 could be built and tagged like this.

```bash
docker build -t pnpspfx:v162 .
```

After the completion of this command the image can be verified with the following command.

````bash
docker image ls
````

The returned output should look similar to this:

```
REPOSITORY      TAG             IMAGE ID         CREATED             SIZE
pnpspfx         v162            9813ce7b5769     About an hour ago   871MB
node            8.12.0          ce426dead114     3 months ago        670MB
```

## Run Docker image

To run the docker image the following command start the image.

```
docker run -h pnpspfx --name pnpspfx -it -p 5432:5432 -p 4321:4321 -p 35729:35729 pnpspfx:v162
```

This will open the shell of the docker container. In there the generator can now create a project for example through ```yo @pnp/spfx```.

