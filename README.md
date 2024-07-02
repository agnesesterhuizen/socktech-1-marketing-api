# SockTech-1 🧦 Marketing API

## Getting started

install dependencies:

```
npm install
```

start app:

```
npm start
```

run tests:

```
npm test
```

## Testing events example

```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"eventName":"socksPurchased","userEmail":"test@healthtech1.uk"}' \
  http://localhost:3000/event
```

## Architecture

![SockTech-1 architecture diagram](/docs/SockTech-1.drawio.png)
