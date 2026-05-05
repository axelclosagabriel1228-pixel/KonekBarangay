Django integration notes
------------------------

1. Copy the `templates/` folder into your Django project's templates directory, or add this folder to `TEMPLATES['DIRS']` in settings.py.
2. Ensure `django.contrib.auth` and `django.contrib.staticfiles` are in `INSTALLED_APPS` and `STATIC_URL` is set.
3. Include the auth URL patterns (or include `django_app.urls`) in your project's `urls.py`:

    from django.urls import include, path
    urlpatterns = [
        path('', include('django_app.urls')),
        # ... other patterns
    ]

4. Place `styles.css`, `js/i18n.js`, `assets/` in your static files directory and serve them via staticfiles.
5. Optionally set `LOGIN_REDIRECT_URL = '/'` in settings.py.

This repo provides a minimal `templates/registration/login.html` that uses Django's `AuthenticationForm` (rendered as `form`).
