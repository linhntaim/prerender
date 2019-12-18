# render-man

The module, also an application, to pre-render your SPA on the server.

## 1. As an module

### 1.1. Install

```shell script
npm install render-man
```
### 1.2. Usage

Create a .js file (such as `server.js`) with the following basic content:

```javascript
// server.js

const {parseEnv} = require('dotenv-packed')
const RenderServerManager = require('render-man')

parseEnv()

RenderServerManager.start()
```

.. then run it:

```shell script
node server.js
```

### 1.3. Configuration

Create an .env file along with application script (`server.js`) and make some configurations on it.

See [3. Configuration](#3-configuration) for environment variables that can be set.

## 2. As an application

### 2.1. The Google Chrome

Install [Google Chrome](https://www.google.com/linuxrepositories/).

### 2.2. The Application

Here are things to guide you to install on Ubuntu.

#### 2.2.1. Make the application run

- Clone and prepare the application:

```shell script
cd /var/www
git clone https://github.com/linhntaim/render-man.git render-man
cd render-man
npm install
mkdir logs
```

- Copy and edit the environment variables files (`.env`). (*See [3. Configuration](#3-configuration) for more detail about what you should modify any value*)

```shell script
cp .env.example .env
vi .env
```

- Install the `supervisor` and use it to handle the application's running.

```shell script
npm update && apt install supervisor -y

cat > /etc/supervisor/conf.d/render-man.conf
[program:render-man]
process_name=%(program_name)s_%(process_num)02d
directory=/var/www/render-man
command=npm start
autostart=true
autorestart=true
numprocs=1
environment=NODE_ENV=production
stderr_logfile=/var/www/render-man/logs/err.log
stdout_logfile=/var/www/render-man/logs/out.log
^Z

supervisorctl reread
supervisorctl update
supervisorctl start render-man:*
```

- Now, the application is running. If troubles happen, try those commands:

```shell script
# Restart the application
supervisorctl restart render-man:*

# Or if you want to stop first,
supervisorctl stop render-man:*
# ... then make some changes ...
# ... And finally, start it again.
supervisorctl start render-man:*
``` 

- Do not forget to check the log files at where you have configured in `supervisor`.

```shell script
/var/www/render-man/logs/err.log
/var/www/render-man/logs/out.log
```

#### 2.2.2. Use NGINX as a proxy server to the application:

- Firstly, make a NGINX configuration file such as `render-man.conf` (in folder `etc/nginx`):

```
index index.html;

location / {
    try_files $uri @renderman;
}

location @renderman {
    set $renderman 0;
    if ($http_user_agent ~* "googlebot|bingbot|bingpreview|yandex|baiduspider|twitterbot|facebookexternalhit|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest\/0\.|pinterestbot|slackbot|vkShare|W3C_Validator|whatsapp") {
        set $renderman 1;
    }
    if ($args ~ "_render_man_") {
        set $renderman 1;
    }
    if ($http_user_agent ~ "Render-Man") {
        set $renderman 0;
    }
    if ($uri ~* "\.(js|css|xml|less|png|jpg|jpeg|gif|pdf|doc|txt|ico|rss|zip|mp3|rar|exe|wmv|doc|avi|ppt|mpg|mpeg|tif|wav|mov|psd|ai|xls|mp4|m4a|swf|dat|dmg|iso|flv|m4v|torrent|ttf|woff|svg|eot)") {
        set $renderman 0;
    }

    if ($renderman = 1) {
        set $port = 3000; # Port to run the application, set in .env file
        rewrite .* /$scheme://$host$request_uri? break;
        proxy_pass http://localhost:${port};
    }
    if ($renderman = 0) {
        rewrite .* /index.html?$query_string break;
    }
}
```

- Secondly, just include the configuration in some domain's settings:

```
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    server_name render-man.com www.render-man.com;

    include ssl.conf;

    root /var/www/render-man;

    include render-man.conf; # Render-Man configuration
}
```

- Visit your site to check if the application works (remember to append the url by `?_render_man_=1`):

```
https://render-man.com?_render_man_=1
```

## 3. Configuration

You can make some configuration via `.env` file. 

*View [`.env.example`](https://github.com/linhntaim/render-man/blob/master/.env.example) file for example.*
        
- **`PORT`**
    
    - Port for the application to run
    - Default: `3000`.
    
- **`LOG_REQUESTS`**

    - See [`logRequests`](https://github.com/renderman/renderman#logrequests).
    - Default: `false`.
    
- **`PAGE_DONE_CHECK_INTERVAL`**

    - See [`pageDoneCheckInterval`](https://github.com/renderman/renderman#pagedonecheckinterval).
    - Default: `1000`.
    
- **`PAGE_LOAD_TIMEOUT`**

    - See [`pageLoadTimeout`](https://github.com/renderman/renderman#pageloadtimeout).
    - Default: `20000`.
    
- **`WAIT_AFTER_LAST_REQUEST`**

    - See [`waitAfterLastRequest`](https://github.com/renderman/renderman#waitafterlastrequest).
    - Default: `500`.
    
- **`FOLLOW_REDIRECTS`**

    - See [`followredirects`](https://github.com/renderman/renderman#followRedirects).
    - Default: `false`.
    
- **`CHROME_LOCATION`**

    - See [`chromeLocation`](https://github.com/renderman/renderman#chromelocation).
    - Default: `<empty>`.
    
- **`CHROME_FLAGS`**

    - Run Google Chrome with some options.
    - Each option should be wrapped by double quote (`"`) and separated by comma (`,`). All should lie inside brackets (`[...]`).
        - Example: `CHROME_FLAGS=["--no-sandbox","--headless"]`
    - If there is no options, please leave it as blank inside brackets.
        - Example: `CHROME_FLAGS=[]`.
    - Default: `["--no-sandbox","--headless","--disable-gpu"]`.

- **`USE_PLUGINS`**
    
    - Plugins can be used:
        - `basicAuth`
            - See [`basicAuth`](https://github.com/renderman/renderman#basicauth).
            - Extra environment variables can be added in `.env` files: `BASIC_AUTH_USERNAME`, `BASIC_AUTH_PASSWORD`.
        - `removeScriptTags`
            - See [`removeScriptTags`](https://github.com/renderman/renderman#removescripttags).
        - `blockedResources`
        - `httpHeaders`
            - See [`httpHeaders`](https://github.com/renderman/renderman#httpheaders).
        - `whitelist`
            - See [`whitelist`](https://github.com/renderman/renderman#whitelist).
        - `blacklist`
            - See [`blacklist`](https://github.com/renderman/renderman#blacklist).
        - `in-memory-cache`
            - See [`in-memory-cache`](https://github.com/renderman/renderman#in-memory-cache).
    - Each plugin should be wrapped by double quote (`"`) and separated by comma (`,`). All should lie inside brackets (`[...]`).
        - Example: `USE_PLUGINS=["removeScriptTags","blockedResources,"httpHeaders"]`
    - If there is no plugins, please leave it as blank inside brackets.
        - Example: `USE_PLUGINS=[]`.
    - Default: `[]`