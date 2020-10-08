StageCast Audience
==================

Video delivery platform for StageCast, created based on [Puffer](https://github.com/stanfordsnr/puffer).

## Setting up the media server

Media server is the program that serves the video contents to the client over
a WebSocket. It's written in C++.

0. Make sure you have all the following dependencies installed:

```
python3
cmake
gcc >= 8.0
g++ >= 8.0
libcrypto++-dev
libssl-dev
libyaml-cpp-dev
```

1. Clone this repo, and then run the following command to fetch the submodules:

```
git submodule update --init
```

2. The rest should be straightforward:

```
mkdir build
cd build
cmake ..
make -j$(nproc)
```

## Setting up the test video

1. Download [this package](https://stagecast-us-west-1.s3-us-west-1.amazonaws.com/puffer-test-channel.tar.gz) and extract it somewhere *outside* of the project
root.

```
https://stagecast-us-west-1.s3-us-west-1.amazonaws.com/puffer-test-channel.tar.gz
```

5. Create a YAML file `settings.yml` under `src/`, with the following content:

```
media_dir: [path-to-the-puffer-test-channel]
experiments:
  - num_servers: 1
    fingerprint:
      abr: linear_bba
      abr_config:
        upper_reservoir: 0.9
      cc: cubic
channels:
  - test
channel_configs:
  test:
    live: true
    video:
      1280x720: [20]
    audio: [64k]
    present_delay_chunk: 300
ws_base_port: 50000
enable_logging: false
```

>*Remember* to replace `[path-to-the-puffer-test-channel]` with the path to the
>directory that you extracted in step (1).

3. Go to `build/` directory, and make sure that you can start the media server:

```
./ws-media-server ../src/settings.yml 1
```

4. Leave the server running for the next step.

## Setting up the web server

1. Install pip3 (`python3-pip` package on Ubuntu), and use it to install `virtualenv` package:

```
pip3 install virtualenv
```

2. Go to `src/portal`, and create a virtual environment for the server:

```
virtualenv venv
```

3. Activate the environment:

```
source venv/bin/activate
```

4. Install the required dependencies:

```
pip3 install -r requirements.txt
```

5. Append the following to `src/settings.yml` file you created in the previous section.

```
portal_settings:
  allowed_hosts:
    - '*'
  debug: true
  secret_key: ')wjz$3&asr7sm3+cp@*)na__j7fu4smpo^eh8@)-p&o__l@57r'
```

6. Create the database:

```
./manage.py migrate
```

7. Start the development server by running

```
./manage.py runserver 0:9999
```

8. Open `localhost:9999` in your browser, and verify that you can sign up
and log in.

9. Click on "Watch" and enjoy the show! (Make sure that the media server is running).

## Development on Mac with Docker

If you don't have access to a Linux box, you can use Docker to develop and test on Mac.

### Preparing your environment

0. Download and install Docker for Mac from [here](https://download.docker.com/mac/stable/Docker.dmg).

1. Start Docker. It should appear in your macOS menubar, and after a few seconds its status will change to "running":

![Step 1](https://stagecast-us-west-1.s3-us-west-1.amazonaws.com/images/docker-0.png)

2. Open a terminal window, and do the following:

   1. Create a directory for StageCast-related files: `mkdir ~/stagecast`
   2. Switch to the directory you just created: `cd ~/stagecast`
   3. Clone the repo: `git clone --recurse-submodules https://github.com/stanford-stagecast/audience`
   4. Download the test video pack: `curl -OJ https://stagecast-us-west-1.s3-us-west-1.amazonaws.com/puffer-test-channel.tar.gz`
   5. Unpack the videos : `tar xvf puffer-test-channel.tar.gz`
   6. Fetch the development Docker image: `docker pull stanfordsnr/stagecast -a`
   
3. Great! The source code is in `stagecast/audience` and you can use your favorite editor, e.g. [VS Code](https://code.visualstudio.com), for development.

### Configuration file

1. Create a file named `settings.yml` in `audience/src/` with the following contents:

```
media_dir: /stagecast/puffer-test-channel
experiments:
  - num_servers: 1
    fingerprint:
      abr: linear_bba
      abr_config:
        upper_reservoir: 0.9
      cc: cubic
channels:
  - test
channel_configs:
  test:
    live: true
    video:
      1280x720: [20]
    audio: [64k]
    present_delay_chunk: 300
ws_base_port: 50000
enable_logging: false
portal_settings:
  allowed_hosts:
    - '*'
  debug: true
  secret_key: ')wjz$3&asr7sm3+cp@*)na__j7fu4smpo^eh8@)-p&o__l@57r'
```

### Starting the Docker container

1. On your Mac, run `docker image ls` and make a note of *IMAGE ID*:

![Image ID](https://stagecast-us-west-1.s3-us-west-1.amazonaws.com/images/docker-1.png)

2. Run the following command (replace `[IMAGE-ID]` with the ID from the previous step):

```
docker run --name stagecast -p 9999:9999 -p 50001:50001 -v ~/stagecast:/stagecast -td [IMAGE-ID]
```

This will start a Docker container, which is based on Ubuntu 20.04, has all of the necessary packages installed, and can be used to compile and run the project.

### Preparing the client (web interface)

1. Get shell access to the Linux container by running `docker exec -it stagecast /bin/bash`.

2. Go to `/stagecast/audience/src/portal`.

3. Run the following commands:

```
virtualenv venv
source venv/bin/activate
pip3 install -r requirements.txt
./manage.py migrate
```

### Compiling the server

1. Inside the Linux container, navigate to `/stagecast` directory: `cd /stagecast`. This is the same directory as the one that you created in the previous section. It's shared between your macOS and your Linux container.

3. `cd audience`.

4. Now, prepare the build by running the following commands:

```
mkdir build
cd build
cmake ..
```

5. In the `build` directory you just created, run `make -j$(nproc)` to compile the project.

### Running the system

1. On your macOS, open a new Terminal window, and run the following command:

```
docker exec -it stagecast /stagecast/audience/build/ws-media-server /stagecast/audience/src/settings.yml 1
```

This command starts the media server, the one that serves the video over WebSocket to the client. Congratulations! Keep it running.

>**Note:** every time that you make changes to the WebSocket server and recompile the code, you need to restart the server, by killing it and running it again.

2. Open a new terminal window, and run the following command to start the web server:

```
docker exec -it stagecast /stagecast/audience/src/portal/runserver.sh
```

3. Open your browser, and navigate to `http://localhost:9999`. You should be able to create an account, login and then watch the demo video.
