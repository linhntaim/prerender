export const loadConfigurations = env => {
    const config = {
        port: 'PORT',

        chromeLocation: 'CHROME_LOCATION',
        chromeFlags: 'CHROME_FLAGS',

        logRequests: 'LOG_REQUESTS',
        pageDoneCheckInterval: 'PAGE_DONE_CHECK_INTERVAL',
        pageLoadTimeout: 'PAGE_LOAD_TIMEOUT',
        waitAfterLastRequest: 'WAIT_AFTER_LAST_REQUEST',
        followRedirects: 'FOLLOW_REDIRECTS',
    }
    for (const key in config) {
        config[key] = env[config[key]]
    }
    return config
}

export const loadPlugins = env => {
    return env['USE_PLUGINS']
}

