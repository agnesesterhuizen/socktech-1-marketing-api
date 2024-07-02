# SockTech-1 🧦

## requirements:

- API
  - receives events on http endpoint

- Event => Marketing Flow system
  - event payload: `{ eventName: string; userEmail: string;}`
  - email should be validated
  - events must have predefined actions that can execute marketing email flows
  - action parameters:
    `{ emailSubject: string; emailBody: string; delay?: number; }`
  - initially support these 2 flows:

        Flow 1:
        “websiteSignup” => wait 2 hours => dispatch welcome email

        Flow 2: 
        “socksPurchased” => payment received email => socks dispatched email

- Event Execution system:
  - take event action data and execute actions
  - send emails
  - support time delays

- Tests:
  - endpoint tests:
    - endpoint can correctly look up actions according to event
    - endpoint only accepts defined events
    - endpoint only accepts valid email addresses
  - event execution tests:
    - actions executed correctly, sends email with correct data
    - timer validation?

---

Notes:

- API is internal so assuming no need for auth on endpoint as it will only be
  called by SockTech-1 marketing site backend
- may be safer to pass a user id in the event payload and look up the email, so
  the system doesn't just accept arbitrary email addresses
- future need for managing the marketing flows so may need to be stored in a DB,
  but will store as a JSON file to start
- error handling:
  - webhook endpoint can return validation errors for event, if no actions
    defined for events or invalid email
  - webhook endpoint shouldn't wait for the email to send, we can track errors
    with some internal error reporting system
- probably best to use a message queue system that supports background jobs,
  delays, retries and error reporting, sending emails can fail and hand rolling
  robust timer logic can be tricky to implement and test
