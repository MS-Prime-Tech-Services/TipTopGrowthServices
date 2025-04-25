# TipTop Growth Service

A Flask-powered social media engagement service that enables users to purchase customized TikTok followers, likes, comments, and views with intelligent pricing mechanisms and seamless transaction processes.

![TipTop Growth Service](https://i.imgur.com/PLACEHOLDER.png)

## 🌟 Features

- **Multiple Service Options:**
  - Followers (real TikTok accounts)
  - Likes (quick delivery)
  - Comments (random or custom text)
  - Views (with random or custom watch time)

- **Dynamic Pricing Engine:**
  - Real-time price calculation based on user selections
  - Transparent pricing displayed during order process
  - Automatic price rounding system

- **Personal Information Collection:**
  - Customer name and contact details
  - Email address for order notifications
  - Phone and WhatsApp numbers for communication

- **Flexible Payment Options:**
  - JazzCash
  - NayaPay
  - Meezan Bank

- **Modern User Interface:**
  - Mobile-responsive design
  - Real-time form validation
  - Live price calculation as users adjust quantities

## 💻 Technologies

- **Backend:** Flask (Python)
- **Frontend:** HTML, CSS, JavaScript, Bootstrap 5
- **Email Processing:** Web3Forms API
- **Validation:** Client-side form validation with JavaScript
- **Animation:** Three.js for interactive background effects

## 🚀 Installation & Setup

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/tiptop-growth-service.git
   cd tiptop-growth-service
   ```

2. Install required dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Set environment variables:
   ```
   export WEB3FORMS_API_KEY=your_web3forms_api_key
   export SESSION_SECRET=your_session_secret
   ```

4. Run the application:
   ```
   python main.py
   ```

5. Access the application at `http://localhost:5000`

## 📝 Usage

1. Enter your personal details (name, email, phone, WhatsApp)
2. Fill out the order form with the TikTok profile you want to enhance
3. Select desired services (followers, likes, comments, views)
4. See the calculated price update in real-time
5. Complete the payment via one of the available payment methods
6. Submit the form and provide payment screenshot via WhatsApp

## 🔒 Security Features

- CSRF protection
- Input validation and sanitization
- Secure payment processing workflow

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## ⚙️ Configuration

Key configurations are managed through environment variables:
- `WEB3FORMS_API_KEY`: API key for email form submission
- `SESSION_SECRET`: Secret key for session management

## 🧩 Project Structure

```
tiptop-growth-service/
├── main.py                # Main application file
├── static/                # Static assets
│   ├── css/               # CSS stylesheets
│   ├── js/                # JavaScript files
│   └── img/               # Images
├── templates/             # HTML templates
│   ├── base.html          # Base template
│   ├── index.html         # Main order form
│   ├── success.html       # Order confirmation
│   └── ...                # Other pages
└── README.md              # This file
```

## 🌐 Deployment

The application can be deployed to various platforms:
- Heroku
- PythonAnywhere
- AWS
- Replit

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Developer

- Muhammad Saad - TipTop Growth Service
- Contact: +92 328 4336247

---

Designed with ❤️ for TikTok content creators