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

The current API endpoint is configured in `src/lib/api-client.ts`; replace it with your backend URL before release if necessary.
