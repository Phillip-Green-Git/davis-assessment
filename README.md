# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Requirements

1. **Expo Version**: ^51.0.30
2. **expo-image-picker Version**: ^13.3.1

## CHANGES

### Update to `expo-image-picker` Implementation

This update involves modifying the way `ExponentImagePicker` is imported in the `expo-image-picker` library. The changes have been made to both the JavaScript (`ExponentImagePicker.js`) and TypeScript (`ExponentImagePicker.ts`) files.

#### Files Affected

- **JavaScript File**: `expo-image-picker/build/ExponentImagePicker.js`
- **TypeScript File**: `expo-image-picker/src/ExponentImagePicker.ts`

#### Summary of Changes

The import statement for the `ExponentImagePicker` module has been updated to use `requireNativeModule` instead of directly accessing `NativeModulesProxy`.

##### Old Import Statement

```javascript
import { NativeModulesProxy } from 'expo-modules-core';
export default NativeModulesProxy.ExponentImagePicker;
```

##### New Import Statement

```javascript
import { requireNativeModule } from 'expo-modules-core';
export default requireNativeModule('ExponentImagePicker');
```

#### Why This Change?

This change was necessary due to a version conflict between the latest version of Expo and `expo-image-picker` version 13. To ensure compatibility and to avoid any potential issues caused by this version mismatch, we updated the import method for `ExponentImagePicker`. By using `requireNativeModule`, we align with the latest Expo standards, ensuring the module is correctly loaded and utilized across different platforms and environments.

#### How to Use the Updated `expo-image-picker`

After pulling the latest changes, the usage of `expo-image-picker` in your project remains the same. However, to take advantage of the updates:

1. Make sure your project is using the updated version of `expo-image-picker`.
2. Rebuild your project to ensure all native modules are correctly linked and updated.

#### Additional Notes

- If you encounter any issues with the new import statement, please ensure you have the latest version of `expo-modules-core` in your project dependencies.
- This change is backward-compatible, but it is recommended to update to the latest version to avoid any potential issues in future updates.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
