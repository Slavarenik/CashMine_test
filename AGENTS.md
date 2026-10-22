This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md

## Conversation logs

Project session notes live in `ai-logs/` (see `ai-logs/README.md`).

- Before non-trivial work, read the latest `ai-logs/YYYY-MM-DD.md` files for prior decisions and gotchas.
- After meaningful work (architecture, fixes, deploy, tooling), append a short entry to today’s `ai-logs/YYYY-MM-DD.md` (create the file if missing).
- Log decisions and pitfalls, not full chat transcripts. Never log secrets.


## Project Architecture & Directory Structure Rules

You must strictly adhere to the following Feature-Based Architecture with Shared & Core Layers tailored for React Native and Expo Router.

├── assets/                  # Splash screens, icons, fonts
├── app/                     # 🧭 ROUTING & NAVIGATION (Expo Router)
│   ├── _layout.tsx          # Root providers (Theme, QueryClient, Zustand, etc.)
│   ├── (auth)/              
│   │   └── login.tsx        # Pure route file: only imports <LoginScreen /> from src/screens
│   └── (tabs)/              
│       └── profile.tsx      # Pure route file: only imports <ProfileScreen /> from src/screens
│
└── src/                     # MAIN APPLICATION SOURCE
    ├── core/                # FUNDAMENTAL LAYER (Global state, API engine, core configuration)
    │   ├── api/             # Base API client (Axios instance, request/response interceptors)
    │   ├── store/           # Global state management (Zustand stores, e.g., authStore, themeStore)
    │   ├── storage/         # Storage wrappers (MMKV, Expo SecureStore)
    │   └── index.ts         # Public API for the core layer
    │
    ├── shared/              # SHARED LAYER (Reusable code with zero domain business logic)
    │   ├── ui/              # Atomic UI Kit components (Button.tsx, Input.tsx, Card.tsx)
    │   ├── hooks/           # Global generic hooks (useDebounce, useForm, etc.)
    │   ├── utils/           # Helper functions (formatDate, validators)
    │   ├── types/           # Global / system-wide TypeScript types
    │   └── index.ts         # Public API for shared elements
    │
    ├── features/            # FEATURES LAYER (Encapsulated business logic grouped by domain)
    │   ├── auth/            
    │   │   ├── api/         # Feature requests (loginMutation, registerMutation)
    │   │   ├── components/  # Domain components (LoginForm, RegisterForm, SocialAuthButtons)
    │   │   ├── hooks/       # Feature-specific hooks (useLogin)
    │   │   └── index.ts     # Public API (Barrel export containing only exposed elements)
    │   │
    │   └── profile/         
    │       ├── api/         # Feature requests (getProfile, updateProfile)
    │       ├── components/  # Domain components (ProfileAvatar, EditProfileForm)
    │       ├── hooks/       # Feature-specific hooks/state
    │       └── index.ts     
    │
    └── screens/             # SCREENS LAYER (Composition layer assembling features)
        ├── auth/
        │   ├── LoginScreen.tsx   # Assembles the screen using <LoginForm /> and shared <Button />
        │   └── RegisterScreen.tsx
        └── profile/
            └── ProfileScreen.tsx # Assembles the screen using profile features + shared components