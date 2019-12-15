# prerender

The application to pre-render your SPA on the server.

## 1. Install

### 1.1. The Google Chrome

https://www.google.com/linuxrepositories/

### 1.2. The Application

- Clone and prepare the application:

```shell script
cd /var/www
git clone https://github.com/linhntaim/prerender.git prerender
cd prerender
npm install
mkdir logs
```

- Copy and edit the environment variables files (`.env`). (*See [2. Configuration](#2-configuration) for more detail about what you should modify any value*)

```shell script
cp .env.example .env
vi .env
```

- Install the `supervisor` and use it to handle the application's running.

```shell script
npm update && apt install supervisor -y
cat > /etc/supervisor/conf.d/prerender.conf
[program:prerender]
process_name=%(program_name)s_%(process_num)02d
directory=/var/www/prerender
command=npm start
autostart=true
autorestart=true
numprocs=1
environment=NODE_ENV=production
stderr_logfile=/var/www/prerender/logs/err.log
stdout_logfile=/var/www/prerender/logs/out.log
^Z
supervisorctl reread
supervisorctl update
supervisorctl start prerender:*
```

- Now, the application is running. If troubles happen, try those commands:

```shell script
# Restart the application
supervisorctl restart prerender:*

# Or if you want to stop first,
supervisorctl stop prerender:*
# ... then make some changes ...
# ... And finally, start it again.
supervisorctl start prerender:*
``` 

- Do not forget to check the log files at where you have configured in `supervisor`.

```shell script
/var/www/prerender/logs/err.log
/var/www/prerender/logs/out.log
```

### 2. Configuration

You can make some configuration via `.env` file. 

*View `.env.example` file for example.*
        
- **`PORT`**
    
    - Port for the application to run
    - Default: `3000`.
    
- **`LOG_REQUESTS`**

    - See [`logRequests`](https://github.com/prerender/prerender#logrequests).
    - Default: `false`.
    
- **`PAGE_DONE_CHECK_INTERVAL`**

    - See [`pageDoneCheckInterval`](https://github.com/prerender/prerender#pagedonecheckinterval).
    - Default: `1000`.
    
- **`PAGE_LOAD_TIMEOUT`**

    - See [`pageLoadTimeout`](https://github.com/prerender/prerender#pageloadtimeout).
    - Default: `20000`.
    
- **`WAIT_AFTER_LAST_REQUEST`**

    - See [`waitAfterLastRequest`](https://github.com/prerender/prerender#waitafterlastrequest).
    - Default: `500`.
    
- **`FOLLOW_REDIRECTS`**

    - See [`followredirects`](https://github.com/prerender/prerender#followRedirects).
    - Default: `false`.
    
- **`CHROME_LOCATION`**

    - See [`chromeLocation`](https://github.com/prerender/prerender#chromelocation).
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
            - See [`basicAuth`](https://github.com/prerender/prerender#basicauth).
            - Extra environment variables can be added in `.env` files: `BASIC_AUTH_USERNAME`, `BASIC_AUTH_PASSWORD`.
        - `removeScriptTags`
            - See [`removeScriptTags`](https://github.com/prerender/prerender#removescripttags).
        - `blockedResources`
        - `httpHeaders`
            - See [`httpHeaders`](https://github.com/prerender/prerender#httpheaders).
        - `whitelist`
            - See [`whitelist`](https://github.com/prerender/prerender#whitelist).
        - `blacklist`
            - See [`blacklist`](https://github.com/prerender/prerender#blacklist).
        - `in-memory-cache`
            - See [`in-memory-cache`](https://github.com/prerender/prerender#in-memory-cache).
    - Each plugin should be wrapped by double quote (`"`) and separated by comma (`,`). All should lie inside brackets (`[...]`).
        - Example: `USE_PLUGINS=["removeScriptTags","blockedResources,"httpHeaders"]`
    - If there is no plugins, please leave it as blank inside brackets.
        - Example: `USE_PLUGINS=[]`.
    - Default: `[]`