# EduRizz Quickstart Guide

Get EduRizz up and running in minutes!

## Prerequisites
- Node.js 18.x or higher
- npm or yarn
- Git

## Steps

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/EduRizz.git
cd EduRizz
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the App
```bash
npm run dev
```

### 4. Open in Browser
Visit [http://localhost:3000](http://localhost:3000) to see the course platform.

## Basic Usage

### View Courses
Browse the available courses on the homepage.

### Add a New Course
1. Click the "Add Course" button on the homepage.
2. Fill out the course details in the form.
3. Click "Create Course" to add it to the platform.

### Enroll in a Course
Click the "Enroll Now" button on any course card to sign up for that course.

## Troubleshooting

### Port Conflict
If port 3000 is already in use, change the port in the `package.json` file:
```json
"scripts": {
  "dev": "next dev -p 3001"
}
```

### Missing Dependencies
If you encounter issues with missing dependencies, try:
```bash
npm install --force
```

## Next Steps
- Explore the code in `src/app/` and `src/components/`.
- Set up n8n integration for workflow automation.
- Configure the MCP for advanced course management. 