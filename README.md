# prerender

## 1. Install Google Chrome

https://www.google.com/linuxrepositories/

## 2. Prerender.io

### 2.1. Configuration

USE_PLUGINS:

- Plugins:
    - basicAuth
    - removeScriptTags
    - blockedResources
    - httpHeaders
    - whitelist
    - blacklist
    - in-memory-cache
    
- Separated by comma (,).

- Example: `USE_PLUGINS=removeScriptTags,blockedResources,httpHeaders`