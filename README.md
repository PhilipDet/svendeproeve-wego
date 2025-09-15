## Get started!

### Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Setup Database Prisma

.env template

```bash
# Db Access : Replace url with your own database credentials
# EXAMPLE: DATABASE_URL="mysql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME"
# LOCALHOST: DATABASE_URL="mysql://root@127.0.0.1:3306/DATEBASE_NAME"
# Token Access Key
TOKEN_ACCESS_KEY = 123 # SECRET STRING
TOKEN_ACCESS_EXPIRATION_SECS = 3600 # NUMBER OF EXPIRATION SECONDS: 1 HOUR

# Token Refresh Key
TOKEN_REFRESH_KEY = 456 # SECRET STRING
TOKEN_REFRESH_EXPIRATION_SECS = 86400 # NUMBER OF EXPIRATION SECONDS: 1 DAY
```

```bash
npm run init # does everything
# or
npm run push # makes tables
npm run generate # makes prisma client
npm run seed # seeds files to db
```

### Run build

```bash
npm run build # creates build and makes prisma client
```
