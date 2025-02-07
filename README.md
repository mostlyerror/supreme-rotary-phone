# MooMinder 🐮

MooMinder is a delightful SMS-based mood tracking application that helps users monitor their daily emotions. With a playful cow theme and user-friendly interface, it makes emotional self-awareness fun and accessible.

## Features

- 📱 **SMS Check-ins**: Receive daily mood check-ins via text message at your preferred time
- 🎯 **Simple Responses**: Reply with one word describing your current emotion
- 📊 **Mood Tracking**: View your recent emotional responses in a clean, organized interface
- 🔔 **Customizable Timing**: Choose when you want to receive your daily check-in
- 🎨 **Beautiful UI**: Clean, modern interface with a fun cow theme

## Tech Stack

- **Frontend**: Next.js 14, React, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: Supabase
- **SMS Service**: Twilio
- **Scheduling**: node-cron

## How It Works

1. Users sign up with their phone number and preferred notification time
2. At the specified time, they receive an SMS asking about their mood
3. Users respond with one word describing their emotion
4. Responses are stored and displayed in a clean interface
5. Users can track their emotional patterns over time

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

## Supabase Management

### Local Development

Note: Docker must be running to start the local Supabase instance.

Start the local Supabase instance:
```bash
npx supabase start
```

Stop the local instance:
```bash
npx supabase stop
```

### Database Migrations

Create a new migration:
```bash
npx supabase migration new your_migration_name
```

Apply migrations:
```bash
npx supabase migration up
```

Reset database and rerun all migrations:
```bash
npx supabase db reset
```

### Troubleshooting

If ports are already in use:
1. Stop existing instances: `npx supabase stop`
2. Check port usage: `lsof -i :54323`
3. Kill processes if needed: `kill -9 <PID>`
4. Alternatively, modify ports in `supabase/config.toml`

### Database Schema

Current tables:
- `users`: Stores user information and notification preferences
  - `id`: UUID primary key
  - `phone_number`: Text, unique
  - `notification_time`: Time
  - `timezone`: Text
  - `created_at`: Timestamp

- `responses`: Stores mood responses
  - `id`: UUID primary key
  - `user_id`: UUID foreign key
  - `emotion`: Text
  - `created_at`: Timestamp

## Project Structure

- `app/components`: React components
- `app/api`: API routes
- `app/utils`: Utility functions
- `app/hooks`: Custom hooks
- `app/lib`: Reusable code
- `app/styles`: Global styles
- `app/types`: TypeScript types
- `app/config`: Configuration files
- `public`: Static assets
- `utils`: Utility functions
- `utils/supabase`: Supabase client and server utilities

## Deployment

Deploy the Next.js app:
```bash
npm run deploy
```

## Additional Notes

- **Error Handling**: Detailed error messages are provided for debugging
- **Security**: Uses Supabase for authentication and database
- **Performance**: Caches responses where appropriate
