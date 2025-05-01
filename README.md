# EduRizz

EduRizz is a Next.js-based educational platform inspired by Rizz GPT, designed to deliver customized, practical training classes. It integrates APIs, n8n for automation, and a Management Control Panel (MCP) to manage courses effectively.

## Features
- **Customized Courses**: Tailored educational content for practical learning.
- **Interactive UI**: Responsive course cards built with Tailwind CSS.
- **API Integration**: Fetches course data dynamically (e.g., `/api/courses`).
- **n8n Automation**: Placeholder for workflow automation (e.g., enrollment notifications).
- **MCP**: Backend for course and user management.

## Tech Stack
- **Frontend**: Next.js 14.x, TypeScript, Tailwind CSS
- **State Management**: React Query (placeholder), Zustand
- **API**: Axios for HTTP requests
- **Dev Tools**: ESLint, Git

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn
- Git

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/EduRizz.git
   cd EduRizz
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
```
EduRizz/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API routes
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── ...           # Other page files
│   ├── components/       # Reusable UI components
│   ├── lib/              # API utilities
│   └── ...               # Other directories
├── public/               # Static assets
├── .gitignore            # Ignored files
├── next.config.mjs       # Next.js config
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript config
```

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/YourFeature`).
3. Commit changes (`git commit -m "Add YourFeature"`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## License
MIT License

## Contact
For issues or suggestions, open an issue or email [your-email@example.com](mailto:your-email@example.com). 