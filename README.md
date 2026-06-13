# 365 Tracker (Git-Style To-Do) ✨

A beautiful, productivity-focused To-Do application built with Electron. Track your daily tasks and watch your productivity grow with a stunning GitHub-style contribution calendar!

## Features

- **GitHub-Style Productivity Graph**: Visualize your task completions over the past year. The more tasks you complete on a specific date, the darker the green square becomes!
- **Date-Wise Task Tracking**: Easily assign tasks to specific dates using the built-in calendar picker.
- **Minimalist Aesthetics**: Clean, modern UI featuring a glassmorphism design with responsive side-by-side panels.
- **Local Storage**: All tasks are saved securely on your local machine and persist between sessions.
- **Cross-Platform**: Built with web technologies (HTML, CSS, JS) and packaged with Electron.

## Installation (Windows)

You don't need to build the project from source to use it! A ready-to-use installer is included right in this repository.

1. Download the `Git Style To-Do Setup 1.0.0.exe` file from the root of this repository.
2. Double-click the `.exe` file to run the installer.
3. The app will install and open automatically.

## Development Setup

If you want to modify the app or run it from the source code, follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.

### Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/basantmahato/Electron-Git-Style-To-Do.git
   cd Electron-Git-Style-To-Do
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the app in development mode:**
   ```bash
   npm start
   ```

4. **Build the executable:**
   To generate a new `.exe` installer (requires `electron-builder`):
   ```bash
   npm run dist
   ```

## Folder Structure

The project uses a standard modular Electron architecture:
- `src/main/`: Contains `main.js` (Electron Main Process).
- `src/preload/`: Contains `preload.js` (IPC Bridge).
- `src/renderer/`: Contains the UI elements (`index.html`, `css/styles.css`, `js/app.js`).

---
*Built with ❤️ using Electron*
