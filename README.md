# Automatic Identification of Retro-commissioning Measures (AIRCx)

---

## Quick Start Guide

This guide has been written, tested, and intended for Windows and Linux installations.

---

### Prerequesites

These applications should be installed on the host machine.

- [Git](https://git-scm.com/) - optional
- [Node.js](https://nodejs.org/) - required
- [Yarn](https://yarnpkg.com/) - required

### Installation

Download the AIRCx application source code from the PNNL Github repository. It's recommended to use the latest stable release from the master branch.

- [Github](https://github.com/pnnl/aircx/tree/master/)

If Git is installed you can checkout directly from Github which will make updating to the latest release easier. You will only have to clone the repository once. After that you can pull to get the latest updates. Every time the application is updated you'll need to go through the build process.

```bash
git clone https://github.com/pnnl/aircx.git
```

### Updating

If you downloaded directly from the Github site then you will need to repeat all steps in this guide as you would for a new installation. If you cloned from Github then follow these steps. This will stash your configuration changes, update to the latest, and then re-apply your configuration to the updated files.

```bash
git stash
git pull
git stash pop
```

### Building

If build errors occur it is very likely that Node.js or Yarn is out of date. The following steps assumes the user is in the root directory of the application.

Install or update all of the dependencies for the client. If the yarn install command fails it will often succeed when running it again.

```bash
cd client
yarn install
```

Build and deploy the client application to the server public directory.

```bash
yarn build
yarn deploy
```

Install or update all of the dependencies for the server.

```bash
cd ../server
yarn install
```

### Configuration

The client configuration must be edited before building and deploying. The primary configuration file used for the client is `/client/.env.production`.

- REACT_APP_TITLE: The displayed title of the application.
- REACT_APP_API_URL: The relative path of the server API.
- REACT_APP_NOTICE: Set to true to display a government notice to users visiting the application.

If the client is not going to be deployed to a base URL (E.g. https://pnl.gov/aircx instead of https://pnl.gov) then the `homepage` attribute in `/client/package.json` will need to be set accordingly.

The server configuration consists of a primary configuration file and a directory for AIRCx configuration files. The primary configuration file used for the server is `/server/.env`. The server must be restarted in order for the changes to take effect.

- SERVER_PORT: The server port.
- SERVER_ADDRESS: The server domain address.
- HTTPS: Set to true in order to host using SSL.
- PASSWORD_SALT: Not currently used because login and user accounts are not required.
- SERVER_KEY: The SSL key which must be generated for the host machine. The supplied one is not secure and should only be used for testing.
- SERVER_CERT: The SSL cert which must be generated for the host mahine. The supplied one is not secure and should only be used for testing.
- PUBLIC_KEY: Not currently used because login and user accounts are not required.
- PRIVATE_KEY: Not currently used because login and user accounts are not required.
- LOG_CONSOLE: The logging level that should be displayed in the console.
- LOG_FILE: The logging level that should be written to the log file `/server/server.log`.
- HISTORIAN_ADDRESS: The base URL which is hosting the historian REST service.
- HISTORIAN_USERNAME: The username to use when logging into the historian REST service.
- HISTORIAN_PASSWORD: The password to use when logging into the historian REST service.
- HISTORIAN_DATA_ID: The topic id for the historian data.
- HISTORIAN_ANALYSIS_ID: The topic id for the analysis data.
- NODE_TLS_REJECT_UNAUTHORIZED: This should be set to 1 to ensure that only historian REST api's with valid certificates are allowed. If the historian service is using SSL with a self signed certificate then it must be set to 0. However, this is not a secure way to access the service and should not be used in a production environment.
- CLEAN_DATA: Set this to true to parse invalid JSON returned from topics. Enabling this setting is extremely inefficient.
- PARSE_DATA: Set this to true to parse string data returned from topics.
- DEFAULT_TIMEZONE: Specify the default timezone (with DST) to use for converting timestamps. This can also be specified within the configuration files by setting the value for timezone.
- DEFAULT_UTC_OFFSET: Can be used instead of specifying a default timezone. This can also be specified within the configuration files by setting the value for utc_offset.
- POINT_MAPPING_CONVERSION_REGEX: Regular expression used to identify point mapping key or value that should be converted for clarity within visualizations. This currently multipies the associated values by 10.

The AIRCx configuration files should be placed in the `/server/data/validation` folder. The files can have any name and folder organization. However, the files must be valid JSON and can't contain any comments. If configuration files are missing for existing analysis sources then detailed data will not be available within the visualization detailed popup line chart. There are free JSON validators available such as [https://jsonlint.com/](https://jsonlint.com/).

### Running

To start the server issue the following command.

```bash
yarn start
```

Type `CTRL-C` to stop the server.

### License

TBD
