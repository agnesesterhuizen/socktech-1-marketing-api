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

## Event flows

Email event flows are stored in `src/data/email-event-data.json`, as an object
where an event name string is associated with an array of email actions.

example:

```json
{
  "socksPurchased": [
    {
      "subject": "Payment received",
      "body": "Thank you!"
    },
    {
      "subject": "Socks dispatched!",
      "body": "Get ready!"
    }
  ]
}
```

an action is defined with these properties:

| property     | type   | description                                                |
| ------------ | ------ | ---------------------------------------------------------- |
| subject      | string | the subject line of the email                              |
| body         | string | the body text of the email                                 |
| delaySeconds | number | (optional) time delay before sending the email, in seconds |

Actions are executed in the order they are defined in the array.

## Testing events example

```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"eventName":"socksPurchased","userEmail":"test@healthtech1.uk"}' \
  http://localhost:3000/event
```

## Architecture

![SockTech-1 architecture diagram](/docs/SockTech-1.drawio.png)
