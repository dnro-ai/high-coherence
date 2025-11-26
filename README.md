# High Coherence

Employee development platform featuring HEXACO-based personality assessments and 360 reviews.

## Features

- **Dashboard** - Personal development overview with HEXACO profile scores and progress tracking
- **Assessments** - HEXACO personality assessments for employees
- **360 Reviews** - Comprehensive feedback collection from peers, managers, and direct reports
- **Reports** - Company-wide analytics and department performance insights
- **AI Coach** - Personalized coaching recommendations based on assessment results

## Tech Stack

- **Framework**: Nuxt 4
- **UI**: Nuxt UI 4
- **Styling**: Tailwind CSS
- **Icons**: Lucide
- **Email**: Resend

## Setup

```bash
npm install
```

## Environment Variables

Create a `.env` file:

```
RESEND_API_KEY=your_resend_api_key
NUXT_PUBLIC_APP_URL=http://localhost:3000
```

## Development

```bash
npm run dev
```

## Production

```bash
npm run build
npm run start
```

## License

MIT
