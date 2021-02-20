# Bhai Gurdas Ji Kabit Savaiye

Currently hosted at [https://ks.jujhar.com]()

Quick and simple mobile friendly website to simplify the reading the Kabit Savaiye of Bhai Gurdas Jee 

Original Savaiye [data](src/data) courtesy of the [ShabadOS Project](https://github.com/jujhars13/database)


## Deployment

Deploying using github pages (hence the unorthodox use of the `/docs/` directory for publishing)

## Building

```bash
# OPTIONAL use the awesome `reload` which auto-refreshes your browser on change using websockets
# `npm install -g webpack webpack-cli reload`
webpack --watch
(cd docs && reload -e "html|js|css|json|yml")
# browse to http://localhost:8080/
```

## Licence
[GNU GPL 3.0][LICENSE]