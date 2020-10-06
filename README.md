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
