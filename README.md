# TBM Mobile

Mobile companion app for TBM (TB Marketing). Create AI-powered social media content, schedule posts in batches, manage personas, and monitor campaign analytics on the go.

## Tech Stack

- **Runtime**: Expo SDK 55 / React Native 0.83
- **Navigation**: React Navigation 7 (bottom tabs + stack)
- **Animations**: react-native-reanimated 4 + gesture-handler
- **Language**: TypeScript 5.9

## Screens

| Screen | Description |
|--------|-------------|
| `DashboardScreen` | Campaign overview with key metrics and quick actions |
| `AICaptionScreen` | Generate AI-powered captions and post copy |
| `AnalyticsScreen` | Campaign performance charts and engagement metrics |
| `BatchScheduleScreen` | Schedule multiple posts across platforms at once |
| `CalendarScreen` | Visual calendar view of scheduled content |
| `ContentScoringScreen` | AI scoring and suggestions for post quality |
| `NotificationsScreen` | Campaign alerts, approvals, and engagement notifications |
| `PersonasScreen` | Manage marketing personas for targeted content |
| `QuickPostScreen` | Rapid single-post creation with AI assist |
| `WhatsAppScreen` | WhatsApp broadcast management and templates |
| `MoreScreen` | Settings, account, and additional tools |

## Components

| Component | Description |
|-----------|-------------|
| `CampaignCard` | Campaign summary card with status and metrics |
| `MetricCard` | Single KPI display with trend indicator |
| `PersonaCard` | Persona preview with avatar and tone summary |

## Project Structure

```
src/
  screens/          # 11 screen components
  components/       # 3 shared components
  navigation/       # Tab and stack navigators
  services/         # API client (connects to TBM backend)
  types/            # TypeScript interfaces
```

## Getting Started

```bash
# Install dependencies
npm install

# Start Expo dev server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

## Environment

The app connects to the TBM API backend:

| Variable | Description |
|----------|-------------|
| `TBM_API_URL` | TBM backend API endpoint |

## Related

- [tbm](../tbm) -- Backend marketing platform
- [tbm-email](../tbm-email) -- Email marketing service
- [tbm-sms](../tbm-sms) -- SMS marketing service
