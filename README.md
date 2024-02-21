# Setup project

## Install dependencies

```bash
$ cd media-api && npm i
$ cd media-front && npm i
```

---

## Environment variables

```bash
$ NODE_ENV=development
$ MONGO_URI=mongodb://<user>:<password>@<host>:<port>/<db_name>
```

---

## Retore data base

```bash
$ tar -xzvf dump.tar.gz
$ mongorestore --uri="mongodb://<host>:<port>" -u <db_user> --nsInclude 'midea-api.*' --dir ./dump
```

---

## Start project

```bash
$ cd media-api && npm start
$ cd media-front && npm start
```

---

### API Docs swagger

	http://localhost:3000/api-docs

---

### Users permissions

	Admin - CRUD
	Reader - R
	Creator - CRU
