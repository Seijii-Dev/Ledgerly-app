# Smart Spending and Savings Tracker — Android

Android-only bare React Native expense tracker.

## Stack

- React Native 0.81.5
- TypeScript
- React Navigation
- AsyncStorage
- Native Android Gradle project
- GitHub Actions APK builds

## Local development

```bash
pnpm install
pnpm start
pnpm android
```

## Validation

```bash
pnpm typecheck
```

## GitHub Actions build

The workflow at `.github/workflows/android-apk.yml` builds **only a release APK** using Gradle:

```bash
./gradlew :app:assembleRelease
```

The APK is uploaded as the `expense-tracker-release-apk` workflow artifact. This project does not include iOS or AAB builds.

## API configuration

The app is configured to use the live Ledgerly backend at `https://ledgerly-backend-group6.vercel.app` through `src/config.ts`.

## Google login configuration

Google login is available on both the Sign In and Create Account screens. The app signs in with the native Google SDK, sends the returned ID token to the Ledgerly backend, and stores the resulting Supabase access token.

Before building the app, edit `src/config.ts`:

```ts
export const GOOGLE_WEB_CLIENT_ID = "your-web-client-id.apps.googleusercontent.com";
export const API_BASE_URL = "https://ledgerly-backend-group6.vercel.app";
```

The Google provider must also be enabled in Supabase Authentication. Configure a Web OAuth client ID and an Android OAuth client ID for package `com.ledgerly.app` using the SHA-1 fingerprint of the signing key. The Web client ID is used by `GoogleSignin.configure` and must match the client ID configured in Supabase.
