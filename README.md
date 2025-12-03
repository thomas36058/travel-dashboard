# ✈️ Travel Dashboard

A comprehensive web application for planning and managing your travels. Organize your itineraries, track expenses, manage accommodations, and maintain a wishlist of dream destinations.

## 🎯 Features

- **Dashboard**: Overview of your current travels and wishlist
- **Calendar View**: Visualize your trips on an interactive calendar
- **Travel Details**: Comprehensive travel management with:
  - 📅 **Daily Itineraries**: Plan activities for morning, afternoon, and night
  - 💰 **Expense Tracking**: Categorize and monitor all travel costs
  - 🏨 **Hotels Management**: Keep track of accommodations and prices
  - 🚗 **Transport Costs**: Record transportation expenses
  - 🎫 **Tours & Activities**: Organize tours and activities for your trips
- **Destination Information**: Best travel seasons for various countries

## 🛠 Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite (with Hot Module Replacement)
- **Routing**: React Router v7
- **State Management**: Redux Toolkit
- **UI Components**: Radix UI
- **Styling**: Tailwind CSS
- **Date Handling**: date-fns
- **Icons**: Lucide React
- **Utilities**: clsx, class-variance-authority

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd travel-dashboard

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
# Build for production
npm run build
```

### Preview

```bash
# Preview the production build locally
npm run preview
```

### Linting

```bash
# Run ESLint
npm run lint
```

## 📁 Project Structure

```
travel-dashboard/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── CardTravels.tsx
│   │   ├── CardWishlist.tsx
│   │   ├── DailyItinerary.tsx
│   │   ├── Navbar.tsx
│   │   ├── NewTravel.tsx
│   │   └── ui/             # Radix UI component wrappers
│   ├── pages/              # Page components
│   │   ├── Dashboard.tsx
│   │   ├── Calendar.tsx
│   │   └── TravelDetail.tsx
│   ├── stores/             # Redux stores
│   │   └── travels.store.ts
│   ├── types/              # TypeScript type definitions
│   │   └── travel.ts
│   ├── data/               # Static data
│   │   └── travelData.ts
│   ├── lib/                # Utilities
│   │   └── utils.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── package.json
├── vite.config.ts
├── tsconfig.json
└── tailwind.config.js
```

## 🎨 Key Components

### Dashboard
Main landing page showing active travels and wishlist items.

### Calendar
Interactive calendar view of scheduled travels with seasonal information for various countries.

### Travel Detail
Detailed page for managing individual travel with all related information (itinerary, expenses, hotels, etc.).

### Daily Itinerary
Component for organizing daily activities by time periods (morning, afternoon, night).

## 📦 Dependencies

See `package.json` for the complete list of dependencies and their versions.

## 🔧 Configuration

- **Vite Configuration**: `vite.config.ts`
- **TypeScript Configuration**: `tsconfig.json`
- **Tailwind CSS**: `tailwind.config.js`
- **PostCSS**: `postcss.config.js`
- **ESLint**: `eslint.config.js`

## 📝 Notes

- Radix UI components are used for accessible, unstyled components
- Tailwind CSS provides the styling system
- Component shadcn/ui pattern is used for custom UI components

## 📄 License

This project is private and maintained by thomas36058.

## 🤝 Contributing

For contributions, please create a feature branch and submit a pull request.

---

**Happy travels! 🌍**
