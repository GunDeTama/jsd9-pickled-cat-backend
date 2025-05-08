# Pickled Cat Backend

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Latest LTS version recommended)

### Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/GunDeTama/jsd9-pickled-cat-backend.git
cd jsd9-pickled-cat-backend
npm install
```

### Environment Setup

1. Copy the example environment file:

```sh
# Local/Development environment
cp .env.example .env.local

# Or for production-like environment
cp .env.example .env.local
```

2. Add the **new** `.env` file for loading either development or production
   environment.

```sh
NODE_ENV=development

# Or
NODE_ENV=production
```

### Start the development server

```sh
npm run dev
```

### Run the production server

```sh
npm start
```

## Testing

```sh
npm run test
```

Or if you want it to watch for changes:

```sh
npm run test:watch
```
