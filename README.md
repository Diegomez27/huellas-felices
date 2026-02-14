# Huellas Felices 🐾

**Huellas Felices** is a smart pet management platform designed to give pet owners peace of mind. It integrates with a smart collar to monitor real-time location, health, and activity, accessible via a mobile-first web application.

## 🚀 Tech Stack

- **Frontend**: Angular 19+ (Standalone Components, Signals, Zoning).
- **Styling**: Tailwind CSS v4 (Custom Theme).
- **Backend**: NestJS (Planned).
- **State Management**: Angular Signals.

## 🛠️ Prerequisites

- **Node.js**: v18 or higher.
- **npm**: v10 or higher.
- **Angular CLI**: v19+.

## 📦 Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/huellas-felices.git
    cd huellas-felices
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npm start
    # or
    ng serve
    ```

4.  **Open the app**:
    Navigate to `http://localhost:4200`.

## 🏗️ Project Architecture

The project follows a **Feature-Based Architecture** with a strict separation of concerns.

```text
src/app/
├── core/           # Singleton services, models, guards, interceptors (e.g., AuthService, PetService).
├── shared/         # Reusable "dumb" components, pipes, directives (e.g., CardComponent, ButtonComponent).
├── layout/         # Structural components (Header, BottomNav, MainLayout).
├── features/       # Feature modules containing "smart" components (pages).
│   ├── dashboard/  # Home view with summary stats.
│   ├── pets/       # Pet management (list, details).
│   ├── map/        # Real-time location view.
│   └── profile/    # User settings.
└── app.routes.ts   # Lazy-loaded route definitions.
```

## ✨ Best Practices & Guidelines

This project strictly adheres to the following guidelines defined in `.gemini/GEMINI.md`.

### TypeScript
- **Strict Typing**: No `any`. Use `unknown` if necessary.
- **Type Inference**: Let TS infer types when obvious.

### Angular
- **Standalone Components**: No `NgModules`.
- **Signals**: Use `signal()`, `computed()`, and `effect()` for all local state.
- **OnPush Change Detection**: All components must use `changeDetection: ChangeDetectionStrategy.OnPush`.
- **Control Flow**: Use new syntax `@if`, `@for`, `@switch`.
- **Lazy Loading**: All feature routes are lazy-loaded.
- **Image Optimization**: Use `NgOptimizedImage` (`ngSrc`) for all static assets.

### Accessibility (a11y)
- **Semantic HTML**: Use correct elements (`<button>`, `<nav>`, `<header>`).
- **ARIA**: Use `aria-label` where visual context is missing.
- **Focus Management**: Ensure interactive elements are reachable via keyboard.

### CSS / Styling
- **Tailwind CSS**: Use utility classes.
- **No `ngStyle`/`ngClass`**: Use `[style.prop]` or `[class.name]`.
- **Theme**: Defined in `src/styles.css` using CSS variables mapped to Tailwind theme.

## 📱 Mobile-First Design

- **Bottom Navigation**: Primary navigation is located at the bottom for mobile users.
- **Touch Targets**: Buttons and interactive elements are sized for touch (min 44x44px where possible).
- **Responsive**: Layout adapts to desktop by switching to a sidebar/header model (implementation in progress).

## 🧪 Development Commands

- `ng serve`: Run dev server.
- `ng build`: Build for production.
- `ng test`: Run unit tests.
- `ng lint`: Run linter (if configured).

---


