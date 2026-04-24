# WAP Group Project

This is a React + Vite desktop-style project built as a group assignment.

## Team Members

1. Krish Kothari
2. Maske Shrungar
3. Vijay Mate

## Project Status (As of 24 April 2026)

The following work has been completed so far:

1. React + Vite project setup is complete.
2. Core desktop layout is in place with clickable app icons.
3. Reusable Desktop, Icon, Taskbar, StartMenu, and Window components have been created.
4. Start menu opens from the taskbar and closes on outside click.
5. Taskbar shows current date and time.
6. Desktop, taskbar, start menu, and window styling are implemented using CSS modules.
7. Development scripts are configured (dev, build, lint, preview).
8. YouTube app UI is connected with home and watch views.
9. Stone Paper Scissor and Calculator apps are available in the window system.
10. Todo app with localStorage-based task persistence is integrated.
11. YouTube app supports search, comments, watch history, and recommendation panels.
12. YouTube API integration now supports RapidAPI key setup with sample-data fallback.

## Current Progress Notes

1. The desktop layout is visible and interactive.
2. Start menu includes pinned apps, recommended items, and a search box UI.
3. Taskbar clock updates from the system date and time.
4. YouTube app can switch between the home grid and a video watch view.
5. This PC and Microsoft Edge views are still placeholder content and need feature implementation.
6. The UI works well on desktop, but responsiveness still needs improvement.

## Run the Project

```bash
npm install
npm run dev
```

## YouTube API Setup

To load real YouTube videos in the YouTube app, create a `.env` file in the project root and add:

```bash
VITE_RAPID_API_KEY=your_rapidapi_key_here
```

Optional fallback:

```bash
VITE_YOUTUBE_API_KEY=your_google_youtube_data_api_key
```

If no valid key is present, the app falls back to sample videos.

## Next Planned Work

1. Complete fuller YouTube app integration and polish the watch experience.
2. Replace placeholder window content for This PC and Microsoft Edge with functional views.
3. Improve responsiveness and polish the UI.
4. Add more desktop/taskbar interactions and app shortcuts.
5. Extend the calculator and game experiences with more features.


## Long Term Goal

1. Complete the YouTube clone experience.
2. Add more functional desktop apps and interactive window content.