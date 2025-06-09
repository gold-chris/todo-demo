# TypeScript Web & Mobile App Starter

A modern, easy-to-learn TypeScript project template for building both web and mobile applications using React, Vite, and TypeScript.

## 🚀 Features

- **TypeScript** - Type safety and better developer experience
- **React 18** - Modern React with hooks and concurrent features
- **Vite** - Lightning-fast development server and build tool
- **Mobile-Ready** - Responsive design that works on all devices
- **ESLint & Prettier** - Code linting and formatting
- **Hot Module Replacement** - Instant updates during development
- **Path Aliases** - Clean imports with `@/` prefix

## 📦 What's Included

- Complete TypeScript configuration
- React app with a functional todo list demo
- Responsive CSS with dark/light mode support
- ESLint and Prettier configuration
- Vite build configuration
- Mobile-first responsive design

## 🛠️ Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd typescript-web-mobile-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000`

## 📱 Mobile Development

This starter is designed to be mobile-ready from the start:

- **Responsive Design**: Works on all screen sizes
- **Touch-Friendly**: Optimized for touch interactions
- **PWA Ready**: Can be extended to a Progressive Web App
- **Capacitor Compatible**: Can be wrapped with Capacitor for native mobile apps

### Adding Mobile Capabilities

To extend this project for native mobile development:

1. **Option 1: Capacitor** (Recommended for web developers)
   ```bash
   npm install @capacitor/core @capacitor/cli
   npx cap init
   npx cap add ios
   npx cap add android
   ```

2. **Option 2: React Native Web** (For React Native developers)
   - This project can be adapted to work with React Native Web

## 🧰 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 📁 Project Structure

```
typescript-web-mobile-app/
├── src/
│   ├── components/     # Reusable components (create as needed)
│   ├── pages/         # Page components (create as needed)
│   ├── utils/         # Utility functions (create as needed)
│   ├── types/         # TypeScript type definitions (create as needed)
│   ├── App.tsx        # Main app component
│   ├── App.css        # App-specific styles
│   ├── main.tsx       # App entry point
│   └── index.css      # Global styles
├── public/            # Static assets
├── index.html         # HTML template
├── package.json       # Dependencies and scripts
├── tsconfig.json      # TypeScript configuration
├── vite.config.ts     # Vite configuration
├── .eslintrc.json     # ESLint configuration
└── .prettierrc        # Prettier configuration
```

## 🎨 Customization

### Adding New Components

Create components in the `src/components/` directory:

```typescript
// src/components/Button.tsx
interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>
}
```

### Adding New Pages

Create pages in the `src/pages/` directory and use React Router for navigation.

### Styling

- Global styles: `src/index.css`
- Component styles: Create `.css` files alongside components
- CSS Modules: Rename files to `.module.css` for scoped styles

## 🚀 Deployment

### Web Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist/` folder to your hosting provider:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3
   - Any static hosting service

### Mobile Deployment

1. **PWA**: Add a service worker and manifest.json
2. **Capacitor**: Follow Capacitor documentation for iOS/Android builds
3. **Electron**: Use Electron for desktop applications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

MIT License - feel free to use this starter for any project!

## 🆘 Need Help?

- Check the [Vite documentation](https://vitejs.dev/)
- Read the [React documentation](https://react.dev/)
- Learn [TypeScript](https://www.typescriptlang.org/docs/)
- Explore [Capacitor](https://capacitorjs.com/) for mobile development

Happy coding! 🎉
