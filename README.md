# AI-Powered Job Board

A job matching platform that helps users find the best job opportunities based on their preferences and qualifications.

## Features

- 🔍 **Job Search** – Search for jobs based on keywords and location.
- 🎯 **Job Matching** – AI-powered job match scoring for relevant recommendations.
- 📁 **Applications Tracking** – Track active, saved, and expired job applications.
- 🏢 **Company Listings** – Browse and explore company profiles.
- 🎨 **Theming** – Dark and light mode support using Tailwind CSS.
- ⚡ **Fast UI** – Built with Next.js, TypeScript for type-safety and Zustand for global state management.

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (v18 or higher) – [Download](https://nodejs.org/)
- **pnpm** (v9 or higher) – [Install](https://pnpm.io/installation)

## Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/your-username/job-board.git
cd job-board
pnpm install
```

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory and add the necessary API keys and configurations:

```sh
NEXT_PUBLIC_API_URL=https://your-api-endpoint.com
GOOGLE_GEMINI_KEY=[your-api-key-here]
```

## Running the Project

### Development Server

To start the development server:

```sh
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000) or another port if 3000 is in use.

### Production Build

To build and start the production server:

```sh
pnpm build
pnpm start
```

## Usage

- Navigate to `/jobs` to browse job listings.
- Click on a job to view its details.
- Apply to jobs directly or save them for later.
- Track your applications under `/applications`.

## Troubleshooting

- If you encounter package issues, try clearing dependencies and reinstalling:

  ```sh
  rm -rf node_modules pnpm-lock.yaml
  pnpm install
  ```

- Ensure `.env.local` is correctly configured.

## Contribution Guidelines

I welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m "Add new feature"`).
4. Push the branch (`git push origin feature-branch`).
5. Open a pull request.

---

