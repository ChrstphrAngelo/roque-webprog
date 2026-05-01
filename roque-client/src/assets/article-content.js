import gendaiImage from './images/gendai.png';
import electronicsImage from './images/Electronics.png';

const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23e2e8f0"/%3E%3Ctext x="50%25" y="50%25" font-size="20" fill="%2394a3b8" text-anchor="middle" dy=".3em" font-family="sans-serif"%3ENo Image%3C/text%3E%3C/svg%3E';

const articles = [
  {
    name: "gendai-ordering-system", 
    title: "Gendai Ordering System",
    image: gendaiImage,
    content: [
      "Gendai ordering system is a personal web and mobile project.",
      "This system lets customers view the menu and order from it through the mobile app.",
      "This system also includes an admin web system to manage menus, view order history, as well as manage profiles.",
    ]
  },
  {
    name: "bewair-capstone-project",
    title: "Electronics",
    image: electronicsImage,
    content: [
      "Some of my current projects also involve electronics such as our capstone project BewAir.",
      "I work on different electronic components such as the ESP32 and air sensors.",
    ]
  },
  {
    name: "personal-portfolio-website",
    title: "Personal Portfolio Website",
    image: placeholderImage,
    content: [
      "A responsive portfolio website built with React and Tailwind CSS to showcase my projects and skills.",
      "Features include a dynamic project gallery, contact form with email integration, and dark/light mode toggle.",
      "The site is fully optimized for performance and accessibility, achieving high scores on Lighthouse audits."
    ]
  },
  {
    name: "weather-dashboard-app",
    title: "Weather Dashboard App",
    image: placeholderImage,
    content: [
      "A real-time weather dashboard that displays current conditions and 5-day forecasts for any city.",
      "Built with Vanilla JavaScript and the OpenWeatherMap API, featuring search history and temperature unit toggle.",
      "The app uses localStorage to save recent searches and provides weather icons based on conditions."
    ]
  },
  {
    name: "task-management-api",
    title: "Task Management API",
    image: placeholderImage,
    content: [
      "RESTful API for task management with user authentication, built using Node.js, Express, and MongoDB.",
      "Implements JWT-based authentication, role-based access control, and comprehensive CRUD operations for tasks.",
      "Includes request validation, error handling middleware, and API documentation generated with Swagger."
    ]
  },
  {
    name: "ecommerce-backend-system",
    title: "E‑commerce Backend System",
    image: placeholderImage,
    content: [
      "A scalable backend system for an e-commerce platform, handling product catalog, shopping cart, and order processing.",
      "Developed with Django REST Framework and PostgreSQL, featuring JWT authentication and Stripe payment integration.",
      "Implements caching with Redis, asynchronous email notifications, and admin dashboard for inventory management."
    ]
  }
];

export default articles;