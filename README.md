# 🎬 Meadow Movies

> *Comically unrelated to our actual business* 😄

Hey Clem! 👋 Hope your day is going well. I kept this pretty barebones, cURL to test
but I could definitely slap an FE on it if you'd like, or do other things.

## 🚀 Setup Instructions

### 1. Clone the repo
```bash
git@github.com:adubatl/takehome_template.git
```

### 2. Set the environment variables
```bash
# in node_server/.env
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=
RESEND_API_KEY=
OMDB_API_KEY=
```

### 3. Run the backend server
```bash
just dev node
# if you don't have just you can do `npm run dev` from the node_server directory
```

### 4. Run the Inngest server
```bash
# I did not look into bundling this with the node server
# but I bet you could get it all under one startup command.
npx inngest-cli@latest dev
```

### 5. Test the endpoint
```bash
curl -X POST http://localhost:3000/api/movies/watch \
-H "Content-Type: application/json" \
-d '{
    "title": "the materix",
    "userEmail": "clem@hisrealemailforsure.com"
}'
```

## 📝 Implementation Details

### Requirements Fulfilled

#### 🎥 Fetch Movie Data
Use the OMDb API to retrieve information about the movie specified
by movie_title
- Set up `/src/services/omdb.ts` for flexibility for additional movie stuff
- Added error email + very crappy fuzzy search
- Added error handling for omdb being down (did not test)

#### 📧 Send Email
Utilize Resend’s API to send an email to recipient_email containing the
movie’s plot summary.

- Set up `/src/services/resend.ts` for emails
- Used straight up HTML (but I've used react email before)
- Added error handling for resend being down (did not test)

#### ⚠️ Error Handling
Implement appropriate error handling for scenarios such as the movie
not being found or failure to send the email.
- Added error email and a quick attempt at fuzzy search so something was handled

#### 🔄 Configure Inngest
Maximize the chances of successfully sending the email to the
recipient.
- Interpreted this as "send a pass or fail email" because it was easy
- Nothing is more maximized than 100% of the time sending an email, unless ofc servers are down.
- I'm not implementing a fallback email service for a takehome, but if the business demanded it in reality, we could.
- Ensures users always get some kind of response


Improvements:
- Better email styling.
- A better fallback than a terrible fuzzy search
- Re-imagine as a CLI tool, a full application, a phone app etc. Each version of this would use the same endpoints but have flushed out user interactions.
- We could cache movies requests.
- Handle "You already watched this, do you want to add it again?" No idea what that flow is or if its a real need.
- I changed the data structure of the event to match TS syntax, but it would be trivial to change it back to the original.
- Be intentional about debug messages, vs live system messages
