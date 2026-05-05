# Konek Barangay

A comprehensive Philippine e-Government system for barangay services, documents, and announcements.

## Features

- **Multi-language Support**: English and Filipino (Tagalog) interface
- **Services Management**: Lost & Found, Requests, Announcements, Alerts, Inquiries
- **Document Management System (DMS)**: Centralized document upload, search, and management
- **Responsive Design**: Mobile-friendly interface following Philippine e-Gov design standards
- **Authentication**: Django-based user authentication and authorization
- **Fixed Navigation**: Consistent header/footer across all pages
- **Interactive Elements**: Filter, search, and sorting capabilities

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Django 4.2
- **Database**: SQLite (default, can be changed)
- **Language Support**: Client-side i18n with localStorage persistence

## Project Structure

```
konek-barangay/
├── index.html                 # Homepage
├── dms.html                   # Document Management System
├── alerts.html                # Alerts page
├── announcements.html         # Announcements page
├── inquiries.html             # Inquiries page
├── lostfound.html             # Lost & Found page
├── requests.html              # Requests page
├── login.html                 # Static login page
├── privacy.html               # Privacy policy
├── terms.html                 # Terms of service
├── styles.css                 # Global stylesheet
├── assets/                    # Images and logos
├── js/
│   ├── i18n.js               # Internationalization logic
│   └── dms.js                # Document Management System logic
├── django_app/
│   ├── __init__.py
│   ├── settings.py           # Django configuration
│   ├── urls.py               # URL routing
│   ├── wsgi.py               # WSGI application
│   └── README.md             # Django app notes
├── templates/
│   ├── base.html             # Django base template
│   └── registration/
│       └── login.html        # Django login template
├── manage.py                 # Django management script
├── requirements.txt          # Python dependencies
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## Setup & Installation

### Static Site Only

1. Clone the repository:
```bash
git clone git@github.com:axelclosagabriel1228-pixel/KONEK.git
cd konek-barangay
```

2. Open `index.html` in a modern web browser.

### With Django Backend

1. **Create a virtual environment:**
```bash
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

2. **Install dependencies:**
```bash
pip install -r requirements.txt
```

3. **Configure Django:**
```bash
# Update SECRET_KEY in django_app/settings.py
# Create database
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser
```

4. **Run development server:**
```bash
python manage.py runserver
```

5. **Access the application:**
- Development: http://localhost:8000
- Admin panel: http://localhost:8000/admin

## Features Guide

### Document Management System (DMS)

- **Upload**: Drag & drop or click to upload documents
- **Search**: Real-time search by document name
- **Filter**: Categorize by Permits, Certificates, Reports, Ordinances, Other
- **Actions**: Download, view, or delete documents
- **Storage**: Browser localStorage (client-side persistence)

### Language Toggle

- Click the language toggle (EN/FIL) button in header
- Language preference saved to browser localStorage
- Affects all pages with i18n attributes

### Authentication

- Static login page available at `login.html`
- Django authentication ready in `templates/registration/login.html`
- Sign in/Log out links in header

## Security Notes

⚠️ **Important for Production:**

1. Change `SECRET_KEY` in `django_app/settings.py`
2. Set `DEBUG = False` in production
3. Use environment variables for sensitive data (use `python-decouple`)
4. Configure ALLOWED_HOSTS for your domain
5. Use HTTPS in production
6. Implement CSRF protection for all forms

## Browser Compatibility

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## File Size Optimization

- CSS: Minified and optimized
- Images: Use SVG logos for scalability
- JavaScript: Vanilla JS (no dependencies)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m "Add new feature"`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## License

This project is part of the Philippine e-Government initiative.

## Support

For issues, feature requests, or questions, please open an issue on GitHub.

## Deployment

### Static Files
- Deploy all HTML, CSS, JS files to any static hosting (GitHub Pages, Netlify, Vercel, etc.)

### Django Backend
- Use Gunicorn + Nginx for production
- Deploy on Heroku, PythonAnywhere, or your own server
- Configure environment variables for sensitive data

## Changelog

### v1.0.0
- Initial release
- Multi-language support
- Document Management System
- Fixed layout and responsive design
- Django authentication setup
