# VoteBoston

**VoteBoston** is an interactive Next.js application designed to help Boston residents find their nearest polling locations. This project serves as an educational tool for demonstrating how to build a useful web application using AI tools and prompt engineering.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Generate a Google Maps API Key](#2-generate-a-google-maps-api-key)
  - [3. Set Up Environment Variables](#3-set-up-environment-variables)
  - [4. Install Dependencies](#4-install-dependencies)
  - [5. Run the Development Server](#5-run-the-development-server)
- [Security Considerations](#security-considerations)
- [Extending the Project](#extending-the-project)
  - [1. Complete the Voting Squad Feature](#1-complete-the-voting-squad-feature)
  - [2. Enhance User Experience](#2-enhance-user-experience)
  - [3. Implement User Authentication](#3-implement-user-authentication)
  - [4. Integrate Additional APIs](#4-integrate-additional-apis)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Address Autocomplete:** Utilizes Google Maps Places API to provide real-time address suggestions as users type.
- **Nearest Polling Location Finder:** Parses a CSV dataset to identify and display the closest polling location based on user input.
- **Interactive Map:** Displays user and polling location markers with walking directions rendered on Google Maps.
- **Responsive Design:** Ensures a seamless experience across various devices and screen sizes.
- **Voting Squad Feature:** _(Upcoming)_ Allows users to create a group of voters to collaborate on voting locations.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Install the latest LTS version from [Node.js Official Website](https://nodejs.org/).
- **npm or Yarn**: Package managers for JavaScript. npm comes bundled with Node.js.
- **Google Cloud Account**: To generate and manage your Google Maps API key.

## Getting Started

Follow these steps to set up and run VoteBoston on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/voteboston.git
cd voteboston
```

### 2. Generate a Google Maps API Key

To enable the map functionalities, you'll need a Google Maps API key.

1. **Create a Project in Google Cloud Console:**

   - Navigate to the [Google Cloud Console](https://console.cloud.google.com/).
   - Click on **Select a project** and then **New Project**.
   - Enter a project name (e.g., `VoteBoston`) and click **Create**.

2. **Enable Required APIs:**

   - Within your project, go to **APIs & Services > Library**.
   - Enable the following APIs:
     - **Maps JavaScript API**
     - **Places API**
     - **Directions API**
     - **Geocoding API**

3. **Generate an API Key:**

   - Go to **APIs & Services > Credentials**.
   - Click on **Create Credentials > API Key**.
   - Copy the generated API key.

4. **Restrict Your API Key:**

   - Click on your newly created API key to edit its restrictions.
   - **Application Restrictions:**
     - Select **HTTP referrers (web sites)**.
     - Add your development domain, e.g., `http://localhost:3000/*`.
   - **API Restrictions:**
     - Restrict the key to the APIs you enabled earlier.
   - Save the changes.

   **⚠️ Important:** Never expose your API key in public repositories or client-side code without restrictions.

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory of the project to securely store your API key.

```bash
touch .env.local
```

Add the following line to `.env.local`:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

_Replace `your_google_maps_api_key_here` with the API key you obtained earlier._

### 4. Install Dependencies

Use npm or Yarn to install the required dependencies.

**Using npm:**

```bash
npm install
```

**Using Yarn:**

```bash
yarn install
```

### 5. Run the Development Server

Start the development server to view the application locally.

**Using npm:**

```bash
npm run dev
```

**Using Yarn:**

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see VoteBoston in action.

## Security Considerations

When deploying VoteBoston to production, it's crucial to secure your Google Maps API key to prevent unauthorized usage and potential billing issues.

1. **Restrict API Key Usage:**

   - **HTTP Referrers:** Limit the key to your production domain (e.g., `https://yourdomain.com/*`).
   - **API Restrictions:** Ensure the key is only authorized to use the necessary APIs (Maps JavaScript API, Places API, Directions API, Geocoding API).

2. **Do Not Expose API Keys:**

   - Avoid committing `.env.local` or any files containing sensitive information to version control.
   - Use environment variables and secure secrets management practices in your deployment setup.

3. **Monitor API Usage:**
   - Regularly check your Google Cloud Console for API usage and set up billing alerts to monitor unexpected spikes.

## Extending the Project

VoteBoston provides a solid foundation, but there's ample opportunity to enhance and expand its functionalities. Here are some ideas to take the project further:

### 1. Complete the Voting Squad Feature

**Description:** Enable users to create a group (Voting Squad) to collaborate on voting plans.

**Getting Started:**

- **User Authentication:** Implement user login/signup using NextAuth.js or another authentication library.
- **Group Management:** Allow users to create, join, and manage squads.
- **Real-Time Collaboration:** Integrate WebSockets or use services like Firebase to enable real-time updates within squads.
- **Voting Plans:** Allow squads to plan their voting routes, share information, and track attendance.

**Resources:**

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Firebase Realtime Database](https://firebase.google.com/products/realtime-database)
- [WebSockets in Next.js](https://nextjs.org/docs/advanced-features/custom-server)

### 2. Enhance User Experience

- **Loading Indicators:** Implement more refined loading states or skeleton screens to improve perceived performance.
- **Responsive Design:** Optimize the UI for various devices, including tablets and smartphones.
- **Accessibility:** Ensure that all interactive elements are accessible via keyboard navigation and screen readers.

### 3. Implement User Authentication

- **Secure Access:** Restrict certain features to authenticated users.
- **Profile Management:** Allow users to manage their profiles, view past voting squads, and track their voting history.

### 4. Integrate Additional APIs

- **Voting Information API:** Provide users with detailed information about their voting process, requirements, and deadlines.
- **Social Sharing:** Enable users to share their voting plans or squad details on social media platforms.
- **Analytics:** Integrate analytics tools to track user engagement and app performance.

### 5. Optimize Performance

- **Caching:** Implement server-side caching for API responses to reduce latency.
- **Lazy Loading:** Load heavy components like maps only when necessary to improve initial load times.

### 6. Expand Polling Locations Data

- **Dynamic Data Source:** Connect to a live database or API for real-time polling locations updates.
- **User-Submitted Locations:** Allow users to suggest or verify polling locations.

## Troubleshooting

If you encounter issues while setting up or running VoteBoston, consider the following troubleshooting steps:

1. **Google Maps API Issues:**

   - **Invalid API Key:** Ensure that the API key is correctly added to `.env.local` and is active.
   - **API Restrictions:** Verify that the API key has the necessary API permissions and is restricted to the correct domains.

2. **Environment Variables Not Loading:**

   - **Server Restart:** After creating or modifying `.env.local`, restart the development server.
   - **Naming:** Ensure the environment variable is prefixed with `NEXT_PUBLIC_` to be accessible on the client side.

3. **Dependency Errors:**

   - **Install Dependencies:** Run `npm install` or `yarn install` to ensure all dependencies are installed.
   - **Version Compatibility:** Check for any version conflicts or deprecated packages.

4. **Infinite Reloads or Duplicate Markers:**

   - **Component Rendering:** Ensure that components like `Map` are not being rendered multiple times unintentionally.
   - **State Management:** Verify that state updates within `useEffect` hooks are not causing re-render loops.

5. **Console Errors:**
   - **Inspect Errors:** Open the browser's developer console to identify specific error messages.
   - **Search Solutions:** Look up error messages online or refer to documentation for guidance.

## Contributing

Contributions are welcome! If you'd like to enhance VoteBoston, please follow these steps:

1. **Fork the Repository:**

   Click the **Fork** button at the top right of the repository page to create your own copy.

2. **Clone the Forked Repository:**

   ```bash
   git clone https://github.com/your-username/voteboston.git
   cd voteboston
   ```

3. **Create a New Branch:**

   ```bash
   git checkout -b feature/YourFeatureName
   ```

4. **Make Your Changes:**

   Implement your feature or fix issues as desired.

5. **Commit Your Changes:**

   ```bash
   git commit -m "Add Your Feature Description"
   ```

6. **Push to Your Fork:**

   ```bash
   git push origin feature/YourFeatureName
   ```

7. **Create a Pull Request:**

   Navigate to the original repository and create a pull request from your fork.

**Please ensure that your contributions adhere to the project's coding standards and include relevant tests where applicable.**

## License

This project is licensed under the MIT License.

---

_Thank you for using VoteBoston! We hope this project serves as a valuable learning tool and inspires further innovation._
