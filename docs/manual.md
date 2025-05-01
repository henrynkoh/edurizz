# EduRizz Manual

## Overview
EduRizz is a platform for customized education, featuring course management, API integrations, and automation via n8n. This manual covers setup, configuration, and administration.

## System Requirements
- Node.js 18.x or higher
- npm 9.x or higher
- Git
- Optional: n8n instance for automation

## Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/EduRizz.git
   cd EduRizz
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Run the Application**:
   ```bash
   npm run dev
   ```

   Access at [http://localhost:3000](http://localhost:3000).

## Project Structure
```
EduRizz/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API routes
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   ├── components/       # Reusable UI components
│   │   │   ├── CourseCard.tsx   # Course display component
│   │   │   ├── CourseForm.tsx   # Form for adding courses
│   │   │   ├── Navbar.tsx       # Navigation component
│   │   ├── lib/             # API utilities
│   │   │   ├── api.ts        # API functions
│   ├── public/              # Static assets
│   ├── docs/                # Documentation
│   ├── .gitignore           # Ignored files
│   ├── next.config.mjs      # Next.js config
│   ├── package.json         # Dependencies and scripts
│   └── tsconfig.json        # TypeScript config
```

## Configuration

### API Routes
API routes are located in `src/app/api/`. The main endpoints are:

- **GET /api/courses**: Fetch all courses
- **POST /api/courses**: Create a new course
- **PUT /api/courses?id={id}**: Update a course
- **DELETE /api/courses?id={id}**: Delete a course

### n8n Integration
Update `src/lib/api.ts` with your n8n API endpoint:

```typescript
export const triggerN8nWorkflow = async (workflowId: string, data: any) => {
  const response = await axios.post(`https://your-n8n-instance.com/webhook/${workflowId}`, data);
  return response.data;
};
```

### Course Management
Courses can be managed either through the UI or via direct API calls. The basic course structure is:

```typescript
interface Course {
  id: number;
  title: string;
  description: string;
  category?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
}
```

## Administration

### Adding Courses
1. Click the "Add Course" button on the home page
2. Fill in the course details
3. Click "Create Course"

### Managing Courses (Future Feature)
In future updates, an admin panel will be added to:
- View all courses
- Edit existing courses
- Delete courses
- View enrollment statistics

### User Management (Future Feature)
Authentication and user management will be added in future releases to support:
- User registration and login
- Role-based access control
- Student progress tracking

## Troubleshooting

### Dependency Issues
If you encounter problems with dependencies:
```bash
npm install --force
```
or delete `node_modules` and `package-lock.json`, then reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### API Errors
Check `.env.local` for correct `NEXT_PUBLIC_API_URL`. For local development, it should be `http://localhost:3000`.

### n8n Connection Issues
Ensure your n8n instance is running and accessible, and check that the webhook URL in `triggerN8nWorkflow` is correct.

## Support and Development
For issues or feature requests, please:
1. Check the existing issues on GitHub
2. Open a new issue with a detailed description
3. For contributions, follow the guidelines in the README 