# 🎮 THE ARCADE 🎮

> **Insert Coin to Start**

Welcome to **The Arcade**—a professional playground for our frontend team. This is a shared sandbox where every developer gets their own route to experiment, create, and push boundaries. Think of it as a digital arcade where code meets creativity.

---

## 🎯 The Vibe

**Professional Fun** — High code quality meets creative freedom. Build anything you want, but build it well.

---

## 🚀 Insert Coin to Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run the Development Server**
   ```bash
   npm run dev
   ```

3. **Open Your Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

4. **Start Playing!**
   - Visit the Lobby to see all playgrounds
   - Check out the Landrian page for inspiration
   - Copy the template to create your own

---

## 📋 The Rules of the Arcade

### Architecture Guidelines

1. **Folder Structure**
   ```
   /src
     /app
       /playground
         /[your-name]     <-- Your playground
           page.tsx
     /components          <-- Shared components
     /store              <-- Zustand stores
     /theme              <-- MUI theme config
   ```

2. **Naming Conventions**
   - Use kebab-case for folder names: `your-name`
   - Use PascalCase for component files: `YourComponent.tsx`
   - Use camelCase for utilities and hooks

3. **Code Quality**
   - TypeScript is mandatory
   - Follow ESLint rules
   - Write self-documenting code
   - Add comments for complex logic

4. **State Management**
   - Use Zustand for global state (`useArcadeStore`)
   - Keep component-level state local when possible
   - Don't pollute the global store with page-specific state

5. **Styling**
   - Use Tailwind CSS for utility classes
   - Use MUI components for complex UI elements
   - Custom CSS for unique effects (like the graffiti page)
   - Follow the design system colors

---

## 🎨 Player Selection

### How to Add Your Own Page

1. **Copy the Template**
   ```bash
   cp -r src/app/playground/[template] src/app/playground/your-name
   ```
   Or manually create a new folder: `src/app/playground/your-name`

2. **Create Your Page**
   Edit `src/app/playground/your-name/page.tsx` and build your playground!

3. **Register in the Lobby**
   Open `src/app/page.tsx` and add your entry to the `players` array:
   ```typescript
   {
     name: 'Your Name',
     route: '/playground/your-name',
     description: 'What you\'re building',
     color: '#f77f00', // Pick a color from the palette
   }
   ```

4. **Share Your Creation**
   Commit your changes and let the team know!

---

## ⚡ Power-Ups (Tech Stack)

### Core Framework
- **Next.js 14+** (App Router) - React framework with server components
- **TypeScript** - Type-safe JavaScript
- **React 18** - UI library

### Styling
- **Tailwind CSS** - Utility-first CSS framework
  - Preflight disabled to prevent conflicts with MUI
  - Custom color palette configured
  - Custom fonts: Outfit, Permanent Marker, Rubik Glitch
- **Material UI (MUI) v5** - Component library
  - Theme configured with our color palette
  - Server Component compatible via ThemeRegistry

### State Management
- **Zustand** - Lightweight state management
  - Global store: `useArcadeStore`
  - Features: `globalChaosMode`, `arcadeScore`

### Icons & Fonts
- **@mui/icons-material** - Material Design icons
- **Google Fonts** - Outfit, Permanent Marker, Rubik Glitch

---

## 🎨 Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Deep Space Blue | `#003049` | Primary, backgrounds |
| Flag Red | `#d62828` | Accents, errors |
| Vivid Tangerine | `#f77f00` | Secondary, highlights |
| Sunflower Gold | `#fcbf49` | Accents, warnings |
| Vanilla Custard | `#eae2b7` | Backgrounds, text |

### Typography

- **Primary Font**: Outfit (UI, body text)
- **Accent Fonts**: Permanent Marker, Rubik Glitch (headers, creative elements)

---

## 🎮 Global Features

### Arcade Score
A shared counter that increments across all playgrounds. Use it creatively!

### Chaos Mode
Toggle `globalChaosMode` in the store to enable/disable a chaotic theme effect. Use it for fun experiments!

---

## 📁 Project Structure

```
the-arcade/
├── src/
│   ├── app/
│   │   ├── playground/
│   │   │   ├── landrian/        # Andrew's graffiti page
│   │   │   └── [template]/       # Template for new pages
│   │   ├── layout.tsx           # Root layout with ThemeRegistry
│   │   ├── page.tsx             # Lobby (dashboard)
│   │   └── globals.css          # Global styles
│   ├── components/              # Shared components
│   ├── store/
│   │   └── useArcadeStore.ts    # Global Zustand store
│   └── theme/
│       └── registry.tsx         # MUI ThemeRegistry
├── public/                      # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

---

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

---

## 🎯 Best Practices

1. **Keep It Fun** - This is a playground, experiment!
2. **Keep It Clean** - Write maintainable code
3. **Share Ideas** - Document your experiments
4. **Respect Others** - Don't break other playgrounds
5. **Use the Design System** - Stick to the color palette and fonts

---

## 🐛 Troubleshooting

### MUI Styles Not Working
- Ensure `ThemeRegistry` wraps your components
- Check that `CssBaseline` is included in the registry

### Tailwind Not Applying
- Verify `globals.css` imports Tailwind directives
- Check `tailwind.config.ts` content paths

### TypeScript Errors
- Run `npm install` to ensure all types are installed
- Check `tsconfig.json` paths configuration

---

## 🎉 Have Fun!

This is your space to experiment, learn, and create. Build something awesome, share it with the team, and keep the arcade spirit alive!

**Game On! 🎮**

---

*Built with ❤️ by the Frontend Team*





