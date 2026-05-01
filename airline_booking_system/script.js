// Language System
console.info('Airline Booking System script loaded');
let currentLanguage = localStorage.getItem('preferredLanguage') || 'en';

const translations = {
    'en': {
        'system_title': 'Airline Booking System',
        'main_title': 'Airline Booking System',
        'main_subtitle': 'welcome to Airline Booking System',
        'passenger_register': 'Passenger Registration',
        'admin_login': 'Admin Login',
        'passenger_login': 'Passenger Login',
        'existing_users': 'Existing Users:',
        'back': '← Back',
        'register': 'Register',
        'login': 'Login',
        'logout': '🚪 Logout',
        'welcome': 'Welcome!',
        'welcome_admin': 'Welcome, Admin!',
        'full_name': 'Full Name',
        'age': 'Age',
        'passport_number': 'Passport Number',
        'password': 'Password',
        'username': 'Username',
        'your_name': 'Your Name',
        'have_account': 'Already have an account?',
        'login_here': 'Login here',
        'no_account': 'Don\'t have an account?',
        'register_here': 'Register here',
        'quick_login': 'Quick Login (Existing Passengers):',
        'quick_login_admin': 'Quick Login (Existing Admins):',
        'passenger_dashboard': 'Passenger Dashboard',
        'book_flight': 'Book Flight',
        'search_flights': 'Search Flights',
        'my_bookings': 'My Bookings',
        'available_flights': 'Available Flights',
        'from': 'From',
        'to': 'To',
        'search': 'Search',
        'admin_dashboard': 'Admin Dashboard',
        'add_flight': 'Add Flight',
        'manage_flights': 'Manage Flights',
        'view_bookings': 'View Bookings',
        'statistics': 'Statistics',
        'add_new_flight': 'Add New Flight',
        'flight_number': 'Flight Number',
        'departure_time': 'Departure Time (HH:MM)',
        'seats_available': 'Seats Available',
        'price': 'Price ($)',
        'all_bookings': 'All Bookings',
        'flight_statistics': 'Flight Statistics',
        'payment_for': 'Payment for',
        'amount': 'Amount: $',
        'card_number': 'Card Number',
        'cvv': 'CVV',
        'expiry_date': 'MM/YY',
        'pay_now': 'Pay Now',
        'cancel': 'Cancel',
        'update_seats': 'Update Seats',
        'new_seats': 'New number of seats',
        'please_login': 'Please login first!',
        'no_seats': 'No seats available on this flight!',
        'flight_not_found': 'Flight not found!',
        'edit_flight': 'Edit Flight',
        'delete_flight': 'Delete Flight',
        'confirm_delete': 'Confirm Delete',
        'update_flight': 'Update Flight',
        'flight_updated': 'Flight updated successfully!',
        'flight_deleted': 'Flight deleted successfully!',
        'about_system': 'About Airline Booking System',
        'airline_name': 'ETHIOPIAN AIRLINES',
        'airline_tagline': 'THE NEW EXPERIENCE',
        'about_title': 'About Ethiopian Airlines Booking System',
        'about_features': 'System Features',
        'feature_registration': 'Easy Registration: Quick passenger registration with secure data storage',
        'feature_booking': 'Flight Booking: Browse and book available flights with real-time seat availability',
        'feature_seats': 'Seat Selection: Interactive seat map for choosing preferred seats',
        'feature_payment': 'Secure Payment: Safe payment processing for flight bookings',
        'feature_management': 'Booking Management: View and manage your flight bookings',
        'feature_search': 'Flight Search: Search flights by destination and departure city',
        'about_user_types': 'User Types',
        'user_passengers': 'Passengers',
        'user_passenger1': '• Register and create account',
        'user_passenger2': '• Book flights and select seats',
        'user_passenger3': '• View booking history',
        'user_passenger4': '• Search available flights',
        'user_admins': 'Administrators',
        'user_admin1': '• Add new flights to the system',
        'user_admin2': '• Manage flight seat availability',
        'user_admin3': '• View all bookings',
        'user_admin4': '• Access system statistics',
        'about_flight_info': 'Flight Information',
        'flight_info_text': 'Our system includes flights to major Ethiopian destinations:',
        'about_security': 'Security & Privacy',
        'security1': '• All passenger data is securely stored locally',
        'security2': '• Passwords are protected',
        'security3': '• Secure payment processing',
        'security4': '• Data privacy compliance',
        'about_multilanguage': 'Multi-language Support',
        'multilanguage_text': 'The system supports both English and Amharic languages. Use the language switcher in the top-right corner to change languages.',
        'about_getting_started': 'Getting Started',
        'start1': '1. New Users: Click "Passenger Registration" to create an account',
        'start2': '2. Returning Users: Click "Passenger Login" to access your account',
        'start3': '3. Admin Access: Use "Admin Login" for system management',
        'start4': '4. Quick Login: Use the "Existing Users" section for quick access',
        'close_button': 'Close',
        'gender': 'Gender',
        'choose_gender': 'Choose your gender',
        'gender_male': 'Male',
        'gender_female': 'Female',
        'age_policies_title': 'Age-Based Policies:',
        'age_policy1': '• Under 2: Infants (may travel free/lap infant)',
        'age_policy2': '• 2-4: Children (usually need paid seat)',
        'age_policy3': '• 5-11: Unaccompanied Minor service may be required',
        'age_policy4': '• 12+: Considered adult for ticketing',
        'passport_announcement': 'Enter 13-19 digit passport number',
        'password_announcement': 'Minimum 8 characters required',
        'confirm_password': 'Confirm Password',
        'email': 'Email',
        'email_placeholder': 'youremail@example.com',
        'card_number_help': 'Enter 13-19 digit card number',
        'cvv_help': 'Enter 3 or 4 digit CVV',
        'expiry_help': 'Format: MM/YY (e.g., 12/25)',
        'cancel_booking': 'Cancel Booking',
        'delay_booking': 'Delay Booking',
        'cancel_booking_title': 'Cancel Booking',
        'cancel_booking_text': 'Are you sure you want to cancel this booking?',
        'refund_policy': 'Refund Policy:',
        'refund_1': '• Cancellation within 24 hours: 90% refund',
        'refund_2': '• Cancellation within 48 hours: 75% refund',
        'refund_3': '• Cancellation after 48 hours: 50% refund',
        'confirm_cancel': 'Yes, Cancel Booking',
        'keep_booking': 'No, Keep Booking',
        'delay_booking_title': 'Delay Your Booking',
        'select_new_flight': 'Select New Flight:',
        'choose_flight': 'Choose a flight',
        'delay_reason': 'Reason for Delay (Optional):',
        'choose_reason': 'Choose a reason',
        'reason_personal': 'Personal reasons',
        'reason_emergency': 'Emergency',
        'reason_schedule': 'Schedule conflict',
        'reason_other': 'Other',
        'original_price': 'Original Price:',
        'new_price': 'New Price:',
        'price_difference': 'Price Difference:',
        'delay_fee_note': 'Note: A $25 rebooking fee applies for flight changes.',
        'confirm_delay': 'Confirm Delay',
        'cancel_delay': 'Cancel',
        'confirmed_bookings': 'Confirmed Bookings',
        'cancelled_bookings': 'Cancelled Bookings',
        'delayed_bookings': 'Delayed Bookings',
        'cancellation_details': 'Cancellation Details',
        'delay_details': 'Delay Details',
        'cancellation_date': 'Cancellation Date',
        'delay_date': 'Delay Date',
        'rebooking_fee': 'Rebooking Fee',
        'booking_status_breakdown': 'Booking Status Breakdown',
        'recent_status_changes': 'Recent Status Changes',
        'no_recent_changes': 'No recent status changes.',
        'about_us': 'About Us',
        'about_us_title': 'Project Team Members',
        'select_payment_method': 'Select Payment Method',
        'continue_to_pay': 'Continue to Pay',
        'day': 'Day',
        'choose_day': 'Choose a day',
        'select_day': 'Select Day:',
    },
    'am': {
        'system_title': 'የአየር መንገድ ቦታ ማሰሺያ ስርዓት',
        'main_title': ' የአየር መንገድ ቦታ ማሰሺያ ስርዓት',
        'main_subtitle': 'ወደ አየር መንገድ የቦታ ማስያዣ ስርዓት እንኳን በደህና መጡ',
        'passenger_register': 'ተሳፋሪ ምዝገባ',
        'admin_login': 'አስተዳዳሪ መግቢያ',
        'passenger_login': 'ተሳፋሪ መግቢያ',
        'existing_users': 'ነባር ተጠቃሚዎች:',
        'back': '← ተመለስ',
        'register': 'ይመዝገቡ',
        'login': 'ግባ',
        'logout': '🚪 ውጣ',
        'welcome': 'እንኳን ደህና መጡ!',
        'welcome_admin': 'እንኳን ደህና መጡ አስተዳዳሪ!',
        'full_name': 'ሙሉ ስም',
        'age': 'ዕድሜ',
        'passport_number': 'ፓስፖርት ቁጥር',
        'password': 'የይለፍ ቃል',
        'username': 'የተጠቃሚ ስም',
        'your_name': 'ስምዎ',
        'have_account': 'ቀድሞውኑ መለያ አለዎት?',
        'login_here': 'እዚህ ግቡ',
        'no_account': 'መለያ የሎትም?',
        'register_here': 'እዚህ ይመዝገቡ',
        'quick_login': 'ፈጣን መግቢያ (ነባር ተሳፋሪዎች):',
        'quick_login_admin': 'ፈጣን መግቢያ (ነባር አስተዳዳሪዎች):',
        'passenger_dashboard': 'የተሳፋሪ ዳሽቦርድ',
        'book_flight': 'በረራ ይቅረቡ',
        'search_flights': 'በረራዎችን ፈልግ',
        'my_bookings': 'የኔ ቅጠሜዎች',
        'available_flights': 'ሊገኙ የሚችሉ በረራዎች',
        'from': 'ከ',
        'to': 'ወደ',
        'search': 'ፈልግ',
        'admin_dashboard': 'የአስተዳዳሪ ዳሽቦርድ',
        'add_flight': 'በረራ ጨምር',
        'manage_flights': 'በረራዎችን አስተዳድር',
        'view_bookings': 'ቅጠሜዎችን ተመልከት',
        'statistics': 'ስታቲስቲክስ',
        'add_new_flight': 'አዲስ በረራ ጨምር',
        'flight_number': 'የበረራ ቁጥር',
        'departure_time': 'የመነሻ ሰዓት (ሰ:ደቂቃ)',
        'seats_available': 'ሊገኙ የሚችሉ መቀመጫዎች',
        'price': 'ዋጋ ($)',
        'all_bookings': 'ሁሉም ቅጠሜዎች',
        'flight_statistics': 'የበረራ ስታቲስቲክስ',
        'payment_for': 'ክፍያ ለ',
        'amount': 'መጠን: $',
        'card_number': 'የካርድ ቁጥር',
        'cvv': 'ሲቪቪ',
        'expiry_date': 'ወር/ዓመት',
        'pay_now': 'አሁን ይክለሉ',
        'cancel': 'ሰርዝ',
        'update_seats': 'መቀመጫዎችን አዘምን',
        'new_seats': 'አዲስ የመቀመጫ ቁጥር',
        'please_login': 'እባክዎ መጀመሪያ ይግቡ!',
        'no_seats': 'በዚህ በረራ ላይ ምንም ቦታዎች አይገኙም!',
        'flight_not_found': 'በረራ አልተገኘም!',
        'edit_flight': 'በረራ አርትዕ',
        'delete_flight': 'በረራ አጥፋ',
        'confirm_delete': 'ማጥፋት ያረጋግጡ',
        'update_flight': 'በረራ አዘምን',
        'flight_updated': 'በረራ በተሳካ ሁኔታ ተዘምኗል!',
        'flight_deleted': 'በረራ በተሳካ ሁኔታ ተጥፏል!',
        'about_system': 'ስለ አየር መንገድ የቦታ ማስያዣ ስርዓት',
        'airline_name': 'ኢትዮጵያ አየር መንገድ',
        'airline_tagline': 'አዲሱ ልምድ',
        'about_title': 'ስለ ኢትዮጵያ አየር መንገድ የቦታ ማስያዣ ስርዓት',
        'about_features': 'የስርዓቱ ባህሪያት',
        'feature_registration': 'ቀላል ምዝገባ: ፈጣን ተሳፋሪ ምዝገባ ከደህንነት የተጠበቀ ውሂብ ማከማቻ',
        'feature_booking': 'የበረራ ቦታ ማስያዣ: በሚገኙ በረራዎች ላይ ቦታ ያስያዙ ከትክክለኛ ጊዜ መቀመጫ አቅርቦት ጋር',
        'feature_seats': 'መቀመጫ ምርጫ: ለተፈለገው መቀመጫ የሚያስችል በይነመረብ መቀመጫ ካርታ',
        'feature_payment': 'ደህንነቱ የተጠበቀ ክፍያ: ለበረራ ቦታ ማስያዣዎች ደህንነቱ የተጠበቀ የክፍያ ሂደት',
        'feature_management': 'የቦታ ማስያዣ አስተዳደር: የበረራ ቦታ ማስያዣዎችዎን ይመልከቱ እና ያስተዳድሩ',
        'feature_search': 'የበረራ ፍለጋ: በመድረሻ እና በመነሻ ከተማ በረራዎችን ፈልግ',
        'about_user_types': 'የተጠቃሚ ዓይነቶች',
        'user_passengers': 'ተሳፋሪዎች',
        'user_passenger1': '• መለያ ይፍጠሩ እና አካውንት ይፍጠሩ',
        'user_passenger2': '• በረራ ያስያዙ እና መቀመጫ ይምረጡ',
        'user_passenger3': '• የቦታ ማስያዣ ታሪክዎን ይመልከቱ',
        'user_passenger4': '• በሚገኙ በረራዎች ላይ ፈልግ',
        'user_admins': 'አስተዳዳሪዎች',
        'user_admin1': '• አዲስ በረራዎችን ወደ ስርዓቱ ያክሉ',
        'user_admin2': '• የበረራ መቀመጫ አቅርቦትን ያስተዳድሩ',
        'user_admin3': '• ሁሉንም ቦታ ማስያዣዎች ይመልከቱ',
        'user_admin4': '• የስርዓት ስታቲስቲክስ ይድረሱ',
        'about_flight_info': 'የበረራ መረጃ',
        'flight_info_text': 'ስርዓታችን ዋና ዋና የኢትዮጵያ መድረሻዎችን ያጠቃልላል:',
        'about_security': 'ደህንነት እና ግላዊነት',
        'security1': '• ሁሉም የተሳፋሪ ውሂብ በደህንነት በአካባቢው ተከማችቷል',
        'security2': '• የይለፍ ቃላት ተጠብቀዋል',
        'security3': '• ደህንነቱ የተጠበቀ የክፍያ ሂደት',
        'security4': '• የውሂብ ግላዊነት ተግዳሮት',
        'about_multilanguage': 'ብዙ ቋንቋ ድጋፍ',
        'multilanguage_text': 'ስርዓቱ ሁለቱንም እንግሊዝኛ እና አማርኛ ቋንቋዎች ይደግፋል። ቋንቋዎችን ለመቀየር በላይኛው ቀኝ ጥግ ላይ ያለውን የቋንቋ መቀያየሪያ ይጠቀሙ።',
        'about_getting_started': 'መጀመሪያ',
        'start1': '1. አዲስ ተጠቃሚዎች: መለያ ለመፍጠር "ተሳፋሪ ምዝገባ" ይጫኑ',
        'start2': '2. ተመላሽ ተጠቃሚዎች: ለመግባት "ተሳፋሪ መግቢያ" ይጫኑ',
        'start3': '3. የአስተዳዳሪ መዳረሻ: ለስርዓት አስተዳደር "አስተዳዳሪ መግቢያ" ይጠቀሙ',
        'start4': '4. ፈጣን መግቢያ: ለፈጣን መዳረሻ "ነባር ተጠቃሚዎች" ክፍልን ይጠቀሙ',
        'close_button': 'መዝጋት',
        'gender': 'ጾታ',
        'choose_gender': 'ጾታዎን ይምረጡ',
        'gender_male': 'ወንድ',
        'gender_female': 'ሴት',
        'age_policies_title': 'በዕድሜ ላይ የተመሰረቱ ፖሊሲዎች:',
        'age_policy1': '• ከ2 ዓመት በታች: ሕፃናት (በነጻ/በእጅ ሊጓዙ ይችላሉ)',
        'age_policy2': '• 2-4: ልጆች (በመደበኛነት የሚከፈል መቀመጫ ያስፈልጋቸዋል)',
        'age_policy3': '• 5-11: ያለ አስተዳዳሪ የሚጓዙ ልጆች አገልግሎት ሊፈለግ ይችላል',
        'age_policy4': '• 12 እና ከዛ በላይ: ለቲኬት እንደ ሰው ሆነው ይቆጠራሉ',
        'passport_announcement': '13-19 አሃዝ ያለው ፓስፖርት ቁጥር ያስገቡ',
        'password_announcement': 'ቢያንስ 8 ቁምፊዎች ያስፈልጋሉ',
        'confirm_password': 'የይለፍ ቃል አረጋግጥ',
        'email': 'ኢሜል',
        'email_placeholder': 'ኢሜልህ@ምሳሌ.com',
        'card_number_help': '13-19 አሃዝ ያለው ካርድ ቁጥር ያስገቡ',
        'cvv_help': '3 ወይም 4 አሃዝ ሲቪቪ ያስገቡ',
        'expiry_help': 'ቅርጸት: ወር/ዓመት (ለምሳሌ: 12/25)',
        'cancel_booking': 'ቦታ ማስያዣ ሰርዝ',
        'delay_booking': 'ቦታ ማስያዣ አረፍ',
        'cancel_booking_title': 'ቦታ ማስያዣ ማጥፋት',
        'cancel_booking_text': 'ይህን ቦታ ማስያዣ ማጥፋት እርግጠኛ ነዎት?',
        'refund_policy': 'የገንዘብ መመለሻ ፖሊሲ:',
        'refund_1': '• በ24 ሰዓታት ውስጥ ማጥፋት: 90% መመለሻ',
        'refund_2': '• በ48 ሰዓታት ውስጥ ማጥፋት: 75% መመለሻ',
        'refund_3': '• ከ48 ሰዓታት በኋላ ማጥፋት: 50% መመለሻ',
        'confirm_cancel': 'አዎ፣ ቦታ ማስያዣ ሰርዝ',
        'keep_booking': 'አይ፣ ቦታ ማስያዣውን አስቀምጥ',
        'delay_booking_title': 'ቦታ ማስያዣዎን አረፍ',
        'select_new_flight': 'አዲስ በረራ ይምረጡ:',
        'choose_flight': 'በረራ ይምረጡ',
        'delay_reason': 'ለማረፍያ ምክንያት (አማራጭ):',
        'choose_reason': 'ምክንያት ይምረጡ',
        'reason_personal': 'የግል ምክንያቶች',
        'reason_emergency': 'አደጋ',
        'reason_schedule': 'የጊዜ ሰሌዳ ግጭት',
        'reason_other': 'ሌላ',
        'original_price': 'የመጀመሪያ ዋጋ:',
        'new_price': 'አዲስ ዋጋ:',
        'price_difference': 'የዋጋ ልዩነት:',
        'delay_fee_note': 'ማስታወሻ: ለበረራ ለውጥ $25 የመልሶ ቦታ ማስያዣ ክፍያ ይተገበራል.',
        'confirm_delay': 'ማረፍያ አረጋግጥ',
        'cancel_delay': 'ሰርዝ',
        'confirmed_bookings': 'የተያዙ ቅጠሜዎች',
        'cancelled_bookings': 'የተሰሩ ቅጠሜዎች',
        'delayed_bookings': 'የተዘገዩ ቅጠሜዎች',
        'cancellation_details': 'የማስወገጃ ዝርዝሮች',
        'delay_details': 'የማዘግያ ዝርዝሮች',
        'cancellation_date': 'የማስወገጃ ቀን',
        'delay_date': 'የማዘግያ ቀን',
        'rebooking_fee': 'የቦታ መልሶ ማስያዣ ክፍያ',
        'booking_status_breakdown': 'የቅጠሜ ሁኔታ መበስበስ',
        'recent_status_changes': 'የቅርብ ጊዜ ሁኔታ ለውጦች',
        'no_recent_changes': 'ምንም የቅርብ ጊዜ ሁኔታ ለውጦች የሉም.',
        'about_us': 'ስለ እኛ',
        'about_us_title': 'የፕሮጀክት ቡድን አባላት',
        'select_payment_method': 'የክፍያ ዘዴ ይምረጡ',
        'continue_to_pay': 'ለመክፈል ቀጥል',
        'day': 'ቀን',
        'choose_day': 'ቀን ይምረጡ',
        'select_day': 'ቀን ይምረጡ:',
    }
};

// API Configuration — derive base from current page path to keep origin and subfolder
const API_BASE_URL = (function () {
    const origin = window.location.origin;
    // derive the app base path (e.g. /airline_booking_system) from the current pathname
    const path = window.location.pathname.replace(/\/[^\/]*$/, '');
    return origin + path + '/api';
})();

// Global variables
let currentUser = null;
let currentAdmin = null;
let selectedFlight = null;
let flightToManage = null;
let selectedSeat = null;
let selectedPaymentMethod = null;
let bookingToCancel = null;
let bookingToDelay = null;
let selectedDayForDelay = null;
let assignedFlightForDelay = null;
let delaySurchargeAmount = 0;

// ============ API HELPER FUNCTIONS ============
async function apiRequest(endpoint, method = 'GET', data = null, options = {}) {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}/${endpoint}`;

    const requestOptions = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    };

    if (data) {
        requestOptions.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, requestOptions);

        // read response text first to allow parsing error messages
        const text = await response.text();
        let result = null;
        try {
            result = text ? JSON.parse(text) : null;
        } catch (e) {
            // not JSON
        }

        if (!response.ok) {
            const message = result && result.message ? result.message : `HTTP error! status: ${response.status}`;
            throw new Error(message);
        }

        if (!result) {
            const preview = text ? text.slice(0, 1000) : '';
            throw new Error('Invalid JSON response from API: ' + preview);
        }

        if (!result.success) {
            throw new Error(result.message || 'API request failed');
        }

        return result;
    } catch (error) {
        if (!options.silent) {
            console.error('API Error:', error);
        }
        throw error;
    }
}

// ============ LANGUAGE FUNCTIONS ============
function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);
    updateLanguage();
    updateLanguageButtons();
}

function updateLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLanguage][key]) {
            const translated = translations[currentLanguage][key];
            if (element.children && element.children.length > 0) {
                const textNode = Array.from(element.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
                if (textNode) {
                    textNode.nodeValue = translated + ' ';
                } else {
                    element.insertBefore(document.createTextNode(translated + ' '), element.firstChild);
                }
            } else {
                element.textContent = translated;
            }
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[currentLanguage][key]) {
            element.placeholder = translations[currentLanguage][key];
        }
    });

    document.title = translations[currentLanguage]['system_title'] || 'Airline Booking System';
    document.body.className = currentLanguage === 'am' ? 'amharic' : '';
}

function updateLanguageButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.textContent.includes(currentLanguage === 'am' ? 'አማርኛ' : 'English')) {
            btn.classList.add('active');
        }
    });
}

// ============ MODAL FUNCTIONS ============
function showAboutUs() {
    const aboutUsModal = document.getElementById('about-us-modal');
    if (aboutUsModal) {
        aboutUsModal.style.display = 'block';
        updateLanguage();
    }
}

function closeAboutUsModal() {
    const aboutUsModal = document.getElementById('about-us-modal');
    if (aboutUsModal) {
        aboutUsModal.style.display = 'none';
    }
}

function showAboutSystem() {
    const aboutModal = document.getElementById('about-system-modal');
    if (aboutModal) {
        aboutModal.style.display = 'block';
    }
}

function closeAboutModal() {
    const aboutModal = document.getElementById('about-system-modal');
    if (aboutModal) {
        aboutModal.style.display = 'none';
    }
}

// ============ VALIDATION FUNCTIONS ============
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 8;
}

function validatePassport(passport) {
    const re = /^\d{13,19}$/;
    return re.test(passport);
}

function validateCardNumber(cardNumber) {
    const clean = cardNumber.replace(/[\s-]/g, '');
    return /^\d{13,19}$/.test(clean);
}

function validateCVV(cvv) {
    return /^\d{3,4}$/.test(cvv);
}

function validateExpiry(expiry) {
    return /^\d{2}\/\d{2}$/.test(expiry);
}

// ============ UI MESSAGE FUNCTIONS ============
function showMessage(elementId, message, type) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `<div class="message ${type}">${message}</div>`;
        setTimeout(() => {
            element.innerHTML = '';
        }, 5000);
    }
}

function showAlert(message, type = 'info') {
    alert(message);
}

// ============ SCREEN NAVIGATION ============
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');

    if (screenId === 'main-menu') {
        loadExistingUsers();
    }

    if (screenId === 'passenger-dashboard') {
        showPassengerSection('book-flight');
    }

    if (screenId === 'admin-dashboard') {
        showAdminSection('add-flight');
    }
}

function showPassengerSection(sectionId) {
    document.querySelectorAll('#passenger-dashboard .section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');

    if (sectionId === 'book-flight') {
        setTimeout(() => {
            loadFlights();
        }, 100);
    }
    if (sectionId === 'my-bookings') {
        loadMyBookings();
    }
    if (sectionId === 'search-flights') {
        document.getElementById('search-results').innerHTML = '';
    }
}

function showAdminSection(sectionId) {
    document.querySelectorAll('#admin-dashboard .section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');

    if (sectionId === 'manage-flights') {
        setTimeout(() => {
            loadFlightsForManagement();
        }, 100);
    }
    if (sectionId === 'view-bookings') {
        loadAllBookings();
    }
    if (sectionId === 'statistics') {
        loadStatistics();
    }
}

// ============ PASSENGER FUNCTIONS ============
async function registerPassenger(event) {
    event.preventDefault();

    const name = document.getElementById('passenger-name').value.trim();
    const username = document.getElementById('passenger-username').value.trim();
    const gender = document.getElementById('passenger-gender').value;
    const age = parseInt(document.getElementById('passenger-age').value);
    const email = document.getElementById('passenger-email').value.trim();
    const passport = document.getElementById('passenger-passport').value.trim();
    const password = document.getElementById('passenger-password').value;
    const confirmPassword = document.getElementById('passenger-confirm-password').value;

    // Validation
    if (!name || !username || !gender || !age || !passport || !password || !confirmPassword) {
        showMessage('passenger-register-message', 'Please fill all required fields!', 'error');
        return;
    }

    if (age <= 0 || age > 120) {
        showMessage('passenger-register-message', 'Please enter a valid age (1-120)!', 'error');
        return;
    }

    if (!validatePassword(password)) {
        showMessage('passenger-register-message', 'Password must be at least 8 characters!', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showMessage('passenger-register-message', 'Passwords do not match!', 'error');
        return;
    }

    if (!validatePassport(passport)) {
        showMessage('passenger-register-message', 'Passport must be 13-19 digits!', 'error');
        return;
    }

    if (email && !validateEmail(email)) {
        showMessage('passenger-register-message', 'Invalid email format!', 'error');
        return;
    }

    try {
        const result = await apiRequest('passengers/register.php', 'POST', {
            name: name,
            username: username,
            gender: gender,
            age: age,
            email: email || null,
            passport_number: passport,
            password: password
        });

        showMessage('passenger-register-message', 'Registration successful! Please login.', 'success');
        event.target.reset();

        setTimeout(() => {
            showScreen('passenger-login');
            document.getElementById('login-username').value = username;
        }, 1500);

    } catch (error) {
        showMessage('passenger-register-message', error.message, 'error');
    }
}

async function loginPassenger(event) {
    event.preventDefault();

    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    if (!username || !password) {
        showMessage('passenger-login-message', 'Please fill all fields!', 'error');
        return;
    }

    try {
        const result = await apiRequest('passengers/login.php', 'POST', {
            username: username,
            password: password
        });

        currentUser = result.data;
        document.getElementById('passenger-welcome').textContent =
            `${translations[currentLanguage]['welcome']} ${currentUser.name}!`;

        showScreen('passenger-dashboard');
        event.target.reset();

        setTimeout(() => {
            loadFlights();
        }, 100);

    } catch (error) {
        showMessage('passenger-login-message', error.message, 'error');
    }
}

async function loginAdmin(event) {
    event.preventDefault();

    const username = document.getElementById('admin-login-username').value;
    const password = document.getElementById('admin-login-password').value;

    try {
        const result = await apiRequest('admin/login.php', 'POST', {
            username: username,
            password: password
        });

        currentAdmin = result.data;
        document.getElementById('admin-welcome').textContent = `Welcome, ${currentAdmin.full_name}!`;

        showScreen('admin-dashboard');
        event.target.reset();

        setTimeout(() => {
            loadFlightsForManagement();
        }, 100);

    } catch (error) {
        showMessage('admin-login-message', error.message, 'error');
    }
}

async function logout() {
    try {
        await apiRequest('passengers/logout.php', 'POST');
    } catch (error) {
        console.error('Logout error:', error);
    }

    currentUser = null;
    currentAdmin = null;
    selectedFlight = null;
    flightToManage = null;

    showAlert('You have been successfully logged out!');
    showScreen('main-menu');
    clearForms();
}

function clearForms() {
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
    document.getElementById('admin-login-username').value = '';
    document.getElementById('admin-login-password').value = '';
}

// ============ FLIGHT FUNCTIONS ============
async function loadFlights() {
    const flightsList = document.getElementById('flights-list');
    if (!flightsList) return;

    flightsList.innerHTML = '<div class="message info">Loading flights...</div>';

    try {
        const result = await apiRequest('flights/get.php');

        if (result.data.length === 0) {
            flightsList.innerHTML = '<div class="message warning">No available flights!</div>';
            return;
        }

        flightsList.innerHTML = '';

        result.data.forEach(flight => {
            const flightCard = document.createElement('div');
            flightCard.className = 'flight-card ethiopian-flight';
            flightCard.innerHTML = `
                <div class="flight-route">${flight.source} → ${flight.destination}</div>
                <div class="flight-details">
                    <strong>Flight:</strong> ${flight.flight_number}<br>
                    <strong>Day:</strong> ${flight.day_of_week || 'Daily'}<br>
                    <strong>Time:</strong> ${flight.departure_time}<br>
                    <strong>Seats:</strong> ${flight.available_seats}<br>
                    <strong>Price:</strong> $${flight.price}
                </div>
                <button class="book-btn" onclick="bookFlight(${flight.id})">Book Flight</button>
            `;
            flightsList.appendChild(flightCard);
        });

    } catch (error) {
        flightsList.innerHTML = `<div class="message error">Error loading flights: ${error.message}</div>`;
    }
}

async function searchFlights() {
    const from = document.getElementById('search-from').value.toLowerCase();
    const to = document.getElementById('search-to').value.toLowerCase();
    const results = document.getElementById('search-results');

    results.innerHTML = '<div class="message info">Searching...</div>';

    try {
        const result = await apiRequest(`flights/search.php?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`);

        if (result.data.length === 0) {
            results.innerHTML = '<div class="message warning">No flights found!</div>';
            return;
        }

        results.innerHTML = '';

        result.data.forEach(flight => {
            const flightCard = document.createElement('div');
            flightCard.className = 'flight-card ethiopian-flight';
            flightCard.innerHTML = `
                <div class="flight-route">${flight.source} → ${flight.destination}</div>
                <div class="flight-details">
                    ${flight.flight_number} | ${flight.departure_time} | 
                    Seats: ${flight.available_seats} | $${flight.price}
                </div>
                <button class="book-btn" onclick="bookFlight(${flight.id})">Book Flight</button>
            `;
            results.appendChild(flightCard);
        });

    } catch (error) {
        results.innerHTML = `<div class="message error">Error: ${error.message}</div>`;
    }
}

async function bookFlight(flightId) {
    try {
        if (!currentUser) {
            showAlert(translations[currentLanguage]['please_login']);
            showScreen('passenger-login');
            return;
        }

        const result = await apiRequest(`flights/get.php?id=${flightId}`);
        const flight = result.data[0];

        if (!flight) {
            showAlert(translations[currentLanguage]['flight_not_found']);
            return;
        }

        if (flight.available_seats <= 0) {
            showAlert(translations[currentLanguage]['no_seats']);
            return;
        }

        selectedFlight = flight;
        showSeatModal(flight.id);

    } catch (error) {
        showAlert(`Error: ${error.message}`);
    }
}

// ============ SEAT SELECTION FUNCTIONS ============
async function renderSeatMap(flightId) {
    const seatMapEl = document.getElementById('ethiopian-seat-map');
    if (!seatMapEl) return;

    seatMapEl.innerHTML = '<div class="message info">Loading seat map...</div>';

    try {
        const result = await apiRequest(`admin/manage-flights.php?action=seats&flight_id=${flightId}`);

        seatMapEl.innerHTML = '';

        // Create seat grid
        const rows = 20;
        const cols = ['A', 'B', 'C', 'J', 'K', 'L'];

        for (let r = 1; r <= rows; r++) {
            for (let c = 0; c < cols.length; c++) {
                const seatId = `${r}${cols[c]}`;
                const seat = result.data.find(s => s.seat_number === seatId);
                const isOccupied = seat ? seat.is_occupied : false;

                const el = document.createElement('div');
                el.className = `ethiopian-seat-modal-seat ${isOccupied ? 'reserved' : 'available'}`;
                el.setAttribute('role', 'button');
                el.setAttribute('tabindex', '0');
                el.dataset.seatId = seatId;
                el.textContent = seatId;

                if (isOccupied) {
                    el.setAttribute('aria-disabled', 'true');
                    el.title = `Occupied by ${seat.passenger_name || 'another passenger'}`;
                }

                el.addEventListener('click', function () {
                    if (el.classList.contains('reserved')) return;
                    const prev = seatMapEl.querySelector('.ethiopian-seat-modal-seat.selected');
                    if (prev) prev.classList.remove('selected');
                    el.classList.add('selected');
                    selectedSeat = seatId;
                });

                seatMapEl.appendChild(el);
            }
        }

    } catch (error) {
        seatMapEl.innerHTML = `<div class="message error">Error loading seats: ${error.message}</div>`;
    }
}

function showSeatModal(flightId) {
    selectedSeat = null;
    const seatModal = document.getElementById('seat-modal');
    const seatPassenger = document.getElementById('seat-passenger-name');

    if (seatPassenger && currentUser) {
        seatPassenger.textContent = currentUser.name;
    }

    renderSeatMap(flightId);

    if (seatModal) {
        seatModal.style.display = 'block';
        seatModal.setAttribute('aria-hidden', 'false');
    }
}

function closeSeatModal(keepSelection = false) {
    const seatModal = document.getElementById('seat-modal');
    if (seatModal) {
        seatModal.style.display = 'none';
        seatModal.setAttribute('aria-hidden', 'true');
    }
    if (!keepSelection) selectedSeat = null;
}

function confirmSeatSelection() {
    if (!selectedSeat) {
        showAlert('Please select a seat before continuing to payment.');
        return;
    }
    // If user is selecting a seat as part of a delay flow, keep selection and close modal
    if (bookingToDelay && assignedFlightForDelay) {
        console.debug('confirmSeatSelection (delay) selectedSeat', selectedSeat);
        // Preserve selection and update the delay modal UI
        const el = document.getElementById('selected-delay-seat');
        if (el) el.textContent = selectedSeat || 'None';
        closeSeatModal(true);
        return;
    }

    // Keep the selected seat while transitioning to payment (normal booking flow)
    showPaymentMethodModal();
    // Close the seat modal but preserve selection until booking/payment completes
    closeSeatModal(true);
}

// Open seat selector specifically for the delay flow
function openDelaySeatSelector() {
    if (!assignedFlightForDelay) {
        showMessage('delay-message', 'Please select a day first so we can assign a flight.', 'warning');
        return;
    }

    // Open seat modal for the assigned flight
    showSeatModal(assignedFlightForDelay.id);
}

// ============ PAYMENT FUNCTIONS ============
function showPaymentMethodModal() {
    const methodModal = document.getElementById('payment-method-modal');
    const methodFlightEl = document.getElementById('method-flight-info');
    const methodAmountEl = document.getElementById('method-payment-amount');

    if (!selectedFlight || !currentUser) return;

    if (methodFlightEl) {
        methodFlightEl.textContent = `${selectedFlight.source} → ${selectedFlight.destination} (Seat: ${selectedSeat})`;
    }
    if (methodAmountEl) {
        methodAmountEl.textContent = selectedFlight.price;
    }

    selectedPaymentMethod = null;
    document.querySelectorAll('.payment-method-card').forEach(card => {
        card.classList.remove('selected');
    });

    if (methodModal) {
        methodModal.style.display = 'block';
    }
}

function selectPaymentMethod(method) {
    selectedPaymentMethod = method;

    document.querySelectorAll('.payment-method-card').forEach(card => {
        card.classList.remove('selected');
    });

    const clickedCard = document.querySelector(`[onclick="selectPaymentMethod('${method}')"]`);
    if (clickedCard) {
        clickedCard.classList.add('selected');
    }
}

function closePaymentMethodModal() {
    const methodModal = document.getElementById('payment-method-modal');
    if (methodModal) {
        methodModal.style.display = 'none';
    }
    selectedPaymentMethod = null;
}

function proceedToPayment() {
    if (!selectedPaymentMethod) {
        showMessage('payment-message', 'Please select a payment method!', 'error');
        return;
    }

    closePaymentMethodModal();
    showVisaPaymentForm();
}

function showVisaPaymentForm() {
    const paymentModal = document.getElementById('payment-modal');
    const paymentFlightEl = document.getElementById('payment-flight');
    const paymentAmountEl = document.getElementById('payment-amount');

    if (paymentFlightEl && paymentAmountEl) {
        paymentFlightEl.textContent = `${selectedFlight.source} → ${selectedFlight.destination} (Seat: ${selectedSeat})`;
        paymentAmountEl.textContent = selectedFlight.price;
    }

    const cardNumberEl = document.getElementById('card-number');
    const cardCvvEl = document.getElementById('card-cvv');
    const cardExpiryEl = document.getElementById('card-expiry');
    const paymentMessageEl = document.getElementById('payment-message');

    if (cardNumberEl) cardNumberEl.value = '';
    if (cardCvvEl) cardCvvEl.value = '';
    if (cardExpiryEl) cardExpiryEl.value = '';
    if (paymentMessageEl) paymentMessageEl.innerHTML = '';

    if (paymentModal) {
        paymentModal.style.display = 'block';
    }
}

async function processPayment() {
    // Debug: log current booking/payment state
    console.debug('processPayment state', { selectedFlight, currentUser, selectedSeat });
    if (!selectedFlight || !currentUser || !selectedSeat) {
        showMessage('payment-message', 'Error processing payment! Missing booking or user context.', 'error');
        return;
    }

    const cardNumber = document.getElementById('card-number').value;
    const cardCVV = document.getElementById('card-cvv').value;
    const cardExpiry = document.getElementById('card-expiry').value;

    if (!cardNumber || !cardCVV || !cardExpiry) {
        showMessage('payment-message', 'Please fill all payment details!', 'error');
        return;
    }

    if (!validateCardNumber(cardNumber)) {
        showMessage('payment-message', 'Please enter a valid card number (13-19 digits)!', 'error');
        return;
    }

    if (!validateCVV(cardCVV)) {
        showMessage('payment-message', 'Please enter a valid CVV (3 or 4 digits)!', 'error');
        return;
    }

    if (!validateExpiry(cardExpiry)) {
        showMessage('payment-message', 'Please enter expiry date in MM/YY format!', 'error');
        return;
    }

    try {
        // Create booking
        const travelDate = new Date();
        travelDate.setDate(travelDate.getDate() + 1);
        const formattedDate = travelDate.toISOString().split('T')[0];

        const bookingResult = await apiRequest('bookings/create.php', 'POST', {
            flight_id: selectedFlight.id,
            seat_number: selectedSeat,
            travel_date: formattedDate
        });

        // Process payment
        await apiRequest('payments/process.php', 'POST', {
            booking_id: bookingResult.data.booking_id,
            payment_method: 'visa',
            card_last4: cardNumber.slice(-4)
        });

        showMessage('payment-message', 'Payment successful! Flight booked.', 'success');

        setTimeout(() => {
            closeModal();
            loadFlights();
            loadMyBookings();
            showMessage('passenger-login-message', 'Flight booked successfully!', 'success');
        }, 2000);

    } catch (error) {
        showMessage('payment-message', `Payment failed: ${error.message}`, 'error');
    }
}

function closeModal() {
    const paymentModal = document.getElementById('payment-modal');
    if (paymentModal) {
        paymentModal.style.display = 'none';
    }
    selectedFlight = null;
    selectedSeat = null;
}

// ============ BOOKING FUNCTIONS ============
async function loadMyBookings() {
    const myBookingsList = document.getElementById('my-bookings-list');
    if (!myBookingsList) return;

    myBookingsList.innerHTML = '<div class="message info">Loading bookings...</div>';

    try {
        const result = await apiRequest('bookings/mybookings.php');

        if (result.data.length === 0) {
            myBookingsList.innerHTML = '<div class="message info">No bookings found!</div>';
            return;
        }

        myBookingsList.innerHTML = '';

        result.data.forEach(booking => {
            const bookingCard = document.createElement('div');
            bookingCard.className = 'booking-card';
            bookingCard.id = `booking-${booking.id}`;

            const bookingDate = new Date(booking.booking_date);
            const now = new Date();
            const hoursDifference = (now - bookingDate) / (1000 * 60 * 60);
            const canCancel = hoursDifference <= 24;

            bookingCard.innerHTML = `
                <div class="flight-route">${booking.source} → ${booking.destination}</div>
                <div class="flight-details">
                    <strong>Booking Ref:</strong> ${booking.booking_reference}<br>
                    <strong>Flight:</strong> ${booking.flight_number}<br>
                    <strong>Time:</strong> ${booking.departure_time}<br>
                    <strong>Date:</strong> ${booking.travel_date}<br>
                    <strong>Price:</strong> $${booking.price}<br>
                    ${booking.seat_number ? `<strong>Seat:</strong> ${booking.seat_number}<br>` : ''}
                    <strong>Status:</strong> <span class="booking-status ${booking.status || 'confirmed'}">${booking.status || 'Confirmed'}</span>
                </div>
                <div class="booking-actions">
                    ${canCancel && booking.status === 'confirmed' ?
                    `<button class="action-btn cancel-btn" onclick="showCancelConfirmation(${booking.id})" data-i18n="cancel_booking">Cancel Booking</button>` : ''}
                    ${canCancel && booking.status === 'confirmed' ?
                    `` : ''}
                </div>
            `;
            myBookingsList.appendChild(bookingCard);
        });

    } catch (error) {
        myBookingsList.innerHTML = `<div class="message error">Error loading bookings: ${error.message}</div>`;
    }
}

function showCancelConfirmation(bookingId) {
    bookingToCancel = bookingId;
    const cancelModal = document.getElementById('cancel-booking-modal');
    if (cancelModal) {
        cancelModal.style.display = 'block';
    }
}

function closeCancelModal() {
    const cancelModal = document.getElementById('cancel-booking-modal');
    if (cancelModal) {
        cancelModal.style.display = 'none';
    }
    bookingToCancel = null;
}

async function confirmCancelBooking() {
    if (!bookingToCancel) return;

    try {
        const result = await apiRequest('bookings/cancel.php', 'POST', {
            booking_id: bookingToCancel
        });

        showMessage('cancel-message',
            `Booking cancelled! You will receive $${Number(result.data.refund_amount || 0).toFixed(2)} refund.`,
            'success');

        setTimeout(() => {
            closeCancelModal();
            loadMyBookings();
            loadAllBookings();
            loadFlights();
        }, 2000);

    } catch (error) {
        showMessage('cancel-message', `Cancellation failed: ${error.message}`, 'error');
    }
}

// ============ DELAY FUNCTIONS ============
async function showDelayOptions(bookingId) {
    const booking = await getBooking(bookingId);
    if (!booking) return;

    bookingToDelay = bookingId;

    // days select removed; we use a default 1-day delay

    document.getElementById('original-price').textContent = `$${booking.price}`;
    document.getElementById('new-price').textContent = '$0';
    document.getElementById('delay-surcharge').textContent = '$0';
    document.getElementById('price-difference').textContent = '$0';
    document.getElementById('delay-flight-info').style.display = 'none';
    // reason removed from UI
    // clear any previously assigned flight or options
    assignedFlightForDelay = null;
    window._currentBookingForDelay = null;
    const optionsContainer = document.getElementById('delay-flight-options');
    if (optionsContainer) { optionsContainer.style.display = 'none'; optionsContainer.innerHTML = ''; }

    const delayMessageEl = document.getElementById('delay-message');
    if (delayMessageEl) {
        delayMessageEl.innerHTML = '';
    }

    const delayModal = document.getElementById('delay-booking-modal');
    if (delayModal) {
        delayModal.style.display = 'block';
    }
    // Load available flights for a default 1-day delay
    updateDelayPrice(1);
}

async function getBooking(bookingId) {
    try {
        const result = await apiRequest(`bookings/get.php?id=${bookingId}`);
        return result.data;
    } catch (error) {
        console.error('Error getting booking:', error);
        return null;
    }
}

async function updateDelayPrice(daysDelayParam) {
    // daysSelect removed from UI; accept an optional daysDelayParam (default 1)
    const daysDelay = typeof daysDelayParam === 'number' && daysDelayParam > 0 ? daysDelayParam : 1;

    try {
        const booking = await getBooking(bookingToDelay);
        if (!booking) return;

        // keep a reference to current booking for use by flight option selection handler
        window._currentBookingForDelay = booking;

        // Compute target travel date by adding daysDelay to original travel_date
        const originalDate = new Date(booking.travel_date + 'T00:00:00');
        const targetDate = new Date(originalDate);
        targetDate.setDate(originalDate.getDate() + daysDelay);

        // Determine weekday name for API (capitalize for DB enum)
        const weekday = targetDate.toLocaleDateString('en-US', { weekday: 'long' });
        const weekdayLower = weekday.toLowerCase();
        const apiDay = weekday.charAt(0).toUpperCase() + weekday.slice(1);

        const flightResult = await apiRequest(`flights/get.php?source=${encodeURIComponent(booking.source)}&destination=${encodeURIComponent(booking.destination)}&day=${apiDay}`);

        if (flightResult.data.length === 0) {
            // No flights found for the chosen day
            assignedFlightForDelay = null;
            selectedDayForDelay = null;
            selectedSeat = null;
            document.getElementById('delay-flight-options').style.display = 'none';
            showMessage('delay-message', `No flights available on ${weekday}. Please choose a different delay length.`, 'warning');
            resetDelayPriceUI();
            return;
        }

        // Render available flight options for user to choose
        const optionsContainer = document.getElementById('delay-flight-options');
        optionsContainer.innerHTML = '';
        optionsContainer.style.display = 'block';

        flightResult.data.forEach((flight, idx) => {
            const option = document.createElement('div');
            option.className = 'delay-flight-option';
            option.style.padding = '8px';
            option.style.borderBottom = '1px solid #eee';
            option.innerHTML = `
                <label style="display:flex; align-items:center; gap:12px; width:100%;">
                    <input type="radio" name="delay-flight-option" value="${flight.id}" ${idx === 0 ? 'checked' : ''} onchange="selectAssignedFlight('${encodeURIComponent(JSON.stringify(flight))}', ${daysDelay})">
                    <div style="flex:1">
                        <strong>${flight.flight_number}</strong> — ${flight.source} → ${flight.destination}<br>
                        <small>Departure: ${flight.departure_time} • Price: $${flight.price}</small>
                    </div>
                </label>
            `;
            optionsContainer.appendChild(option);
        });

        // Default-select the first flight
        selectedDayForDelay = weekdayLower;
        selectedSeat = null;
        // Parse first flight and set as assigned initially
        try {
            const firstFlight = flightResult.data[0];
            assignedFlightForDelay = firstFlight;
            // store booking globally for handlers
            window._currentBookingForDelay = booking;
            calculateAndDisplayDelayPrices(booking, daysDelay);
        } catch (e) {
            console.error('Error assigning default flight for delay:', e);
        }

    } catch (error) {
        showMessage('delay-message', `Error: ${error.message}`, 'error');
    }
}

function calculateAndDisplayDelayPrices(booking, daysDelay = 1) {
    if (!assignedFlightForDelay) return;

    const dayMultipliers = {
        'monday': 1.0,
        'tuesday': 1.1,
        'wednesday': 1.2,
        'thursday': 1.15,
        'friday': 1.25,
        'saturday': 1.3,
        'sunday': 1.35
    };
    const multiplier = dayMultipliers[selectedDayForDelay] || 1.0;
    const originalFlightPrice = assignedFlightForDelay.price;
    const increasedPrice = Math.round(originalFlightPrice * multiplier);
    delaySurchargeAmount = increasedPrice - originalFlightPrice;
    const REBOOKING_FEE = 25;
    const PER_DAY_FEE = 10;
    const perDayFee = (daysDelay || 0) * PER_DAY_FEE;
    const totalNewPrice = increasedPrice + REBOOKING_FEE + perDayFee;

    document.getElementById('assigned-flight-number').textContent = assignedFlightForDelay.flight_number;
    document.getElementById('assigned-departure-time').textContent = assignedFlightForDelay.departure_time;
    document.getElementById('delay-flight-info').style.display = 'block';

    document.getElementById('new-price').textContent = `$${increasedPrice}`;
    document.getElementById('delay-surcharge').textContent = `$${delaySurchargeAmount}`;
    const perDayEl = document.getElementById('per-day-fee');
    if (perDayEl) perDayEl.textContent = `$${perDayFee}`;
    document.getElementById('rebooking-fee').textContent = `$${REBOOKING_FEE}`;
    document.getElementById('price-difference').textContent = `$${totalNewPrice}`;

    const diffElement = document.getElementById('price-difference');
    const priceDifference = totalNewPrice - booking.price;
    diffElement.style.color = priceDifference > 0 ? '#dc3545' : priceDifference < 0 ? '#28a745' : '#6c757d';
}

// Called when user selects a specific flight option in the delay modal
function selectAssignedFlight(flightObj, daysDelay) {
    try {
        // If the radio passed a JSON string, ensure we have an object
        const flight = typeof flightObj === 'string' ? JSON.parse(decodeURIComponent(flightObj)) : flightObj;
        assignedFlightForDelay = flight;
        // Update the UI assigned flight block
        document.getElementById('assigned-flight-number').textContent = assignedFlightForDelay.flight_number;
        document.getElementById('assigned-departure-time').textContent = assignedFlightForDelay.departure_time;
        document.getElementById('delay-flight-info').style.display = 'block';
        // Recalculate prices for the selected flight
        calculateAndDisplayDelayPrices(window._currentBookingForDelay || {}, daysDelay);
    } catch (e) {
        console.error('selectAssignedFlight error', e);
    }
}

function resetDelayPriceUI() {
    document.getElementById('new-price').textContent = '$0';
    document.getElementById('delay-surcharge').textContent = '$0';
    const perDayEl = document.getElementById('per-day-fee');
    if (perDayEl) perDayEl.textContent = '$0';
    document.getElementById('price-difference').textContent = '$0';
    document.getElementById('delay-flight-info').style.display = 'none';
    const optionsContainer = document.getElementById('delay-flight-options');
    if (optionsContainer) { optionsContainer.style.display = 'none'; optionsContainer.innerHTML = ''; }
    document.getElementById('delay-message').innerHTML = '';
}

async function processDelayBooking() {
    console.debug('processDelayBooking state', { bookingToDelay, selectedSeat, assignedFlightForDelay });
    if (!bookingToDelay) {
        showMessage('delay-message', 'Please complete all delay options!', 'error');
        return;
    }

    // UI no longer shows days or reason; default to 1-day delay
    const daysDelay = 1;

    if (!assignedFlightForDelay) {
        showMessage('delay-message', 'Please wait while we assign a flight for the delay.', 'warning');
        return;
    }

    try {
        // Build payload and include seat only if user selected one; backend will auto-assign otherwise
        const payload = {
            booking_id: bookingToDelay,
            new_flight_id: assignedFlightForDelay.id
        };
        if (selectedSeat) payload.new_seat_number = selectedSeat;

        // compute new_travel_date using original booking travel_date and daysDelay
        const booking = await getBooking(bookingToDelay);
        const originalDate = new Date(booking.travel_date + 'T00:00:00');
        const newDate = new Date(originalDate);
        newDate.setDate(originalDate.getDate() + daysDelay);
        const formatted = newDate.toISOString().split('T')[0];
        payload.new_travel_date = formatted;
        payload.days_delayed = daysDelay;

        const result = await apiRequest('bookings/delay.php', 'POST', payload);

        // Show a clear success modal with details
        showDelaySuccessModal(result.data);

    } catch (error) {
        showMessage('delay-message', `Delay failed: ${error.message}`, 'error');
    }
}

function closeDelayModal() {
    const delayModal = document.getElementById('delay-booking-modal');
    if (delayModal) {
        delayModal.style.display = 'none';
    }

    bookingToDelay = null;
    selectedDayForDelay = null;
    assignedFlightForDelay = null;
    delaySurchargeAmount = 0;
    selectedSeat = null;

    // UI elements removed; nothing to clear
    resetDelayPriceUI();
}

// Show delay-success modal with booking details
function showDelaySuccessModal(data) {
    const modal = document.getElementById('delay-success-modal');
    if (!modal) return;
    const refEl = document.getElementById('delay-success-ref');
    const priceEl = document.getElementById('delay-success-price');
    const refundEl = document.getElementById('delay-success-refund');
    if (refEl) refEl.textContent = data.new_booking_reference || data.booking_reference || '-';
    if (priceEl) priceEl.textContent = `$${data.new_price}`;
    if (refundEl) refundEl.textContent = data.refund_amount ? `$${Number(data.refund_amount).toFixed(2)}` : '-';
    modal.style.display = 'block';
}

function closeDelaySuccessModal() {
    const modal = document.getElementById('delay-success-modal');
    if (modal) {
        modal.style.display = 'none';
    }
    // Close delay modal and refresh lists
    closeDelayModal();
    loadMyBookings();
    if (typeof loadAllBookings === 'function') loadAllBookings();
    if (typeof loadFlights === 'function') loadFlights();
}

// ============ ADMIN FUNCTIONS ============
async function addFlight(event) {
    event.preventDefault();

    const flightNumber = document.getElementById('flight-number').value;
    const source = document.getElementById('flight-source').value;
    const destination = document.getElementById('flight-destination').value;
    const departureTime = document.getElementById('flight-time').value;
    const seatsAvailable = parseInt(document.getElementById('flight-seats').value);
    const price = parseFloat(document.getElementById('flight-price').value);

    try {
        const result = await apiRequest('flights/add.php', 'POST', {
            flight_number: flightNumber,
            source: source,
            destination: destination,
            departure_time: departureTime,
            available_seats: seatsAvailable,
            price: price,
            day_of_week: 'Monday',
            total_seats: seatsAvailable
        });

        showMessage('add-flight-message', `Flight ${flightNumber} added successfully!`, 'success');
        event.target.reset();

        setTimeout(() => {
            loadFlightsForManagement();
        }, 1500);

    } catch (error) {
        showMessage('add-flight-message', `Error: ${error.message}`, 'error');
    }
}

async function loadFlightsForManagement() {
    const manageFlightsList = document.getElementById('manage-flights-list');
    if (!manageFlightsList) return;

    manageFlightsList.innerHTML = '<div class="message info">Loading flights...</div>';

    try {
        const result = await apiRequest('admin/manage-flights.php?action=list');

        if (result.data.length === 0) {
            manageFlightsList.innerHTML = '<div class="message info">No flights available!</div>';
            return;
        }

        manageFlightsList.innerHTML = '';

        result.data.forEach(flight => {
            const flightCard = document.createElement('div');
            flightCard.className = 'flight-card ethiopian-flight admin-flight-card';
            flightCard.innerHTML = `
                <div class="flight-route">${flight.source} → ${flight.destination}</div>
                <div class="flight-details">
                    <strong>Flight:</strong> ${flight.flight_number} <br>
                    <strong>Departure:</strong> ${flight.departure_time} <br>
                    <strong>Seats Available:</strong> ${flight.available_seats} <br>
                    <strong>Price:</strong> $${flight.price} <br>
                    <strong>Bookings:</strong> ${flight.confirmed_bookings || 0}
                </div>
                <div class="flight-management-actions">
                    <button class="action-btn update-seats-btn" onclick="openSeatsModal(${flight.id})">
                        Update Seats
                    </button>
                    <button class="action-btn edit-btn" onclick="openEditFlightModal(${flight.id})">
                        Edit Flight
                    </button>
                    <button class="action-btn delete-btn" onclick="showDeleteConfirmation(${flight.id})">
                        Delete Flight
                    </button>
                </div>
            `;
            manageFlightsList.appendChild(flightCard);
        });

    } catch (error) {
        manageFlightsList.innerHTML = `<div class="message error">Error: ${error.message}</div>`;
    }
}

async function openSeatsModal(flightId) {
    try {
        const result = await apiRequest(`flights/get.php?id=${flightId}`);
        flightToManage = result.data[0];

        if (!flightToManage) {
            showAlert('Flight not found!');
            return;
        }

        document.getElementById('manage-flight-number').textContent = flightToManage.flight_number;
        document.getElementById('new-seats').value = flightToManage.available_seats;
        document.getElementById('manage-seats-message').innerHTML = '';

        const seatsModal = document.getElementById('manage-seats-modal');
        if (seatsModal) {
            seatsModal.style.display = 'block';
        }

    } catch (error) {
        showAlert(`Error: ${error.message}`);
    }
}

function closeSeatsModal() {
    const seatsModal = document.getElementById('manage-seats-modal');
    if (seatsModal) {
        seatsModal.style.display = 'none';
    }
    flightToManage = null;
}

async function updateSeats() {
    if (!flightToManage) {
        showMessage('manage-seats-message', 'No flight selected!', 'error');
        return;
    }

    const newSeats = parseInt(document.getElementById('new-seats').value);

    if (isNaN(newSeats) || newSeats < 0) {
        showMessage('manage-seats-message', 'Please enter a valid number of seats!', 'error');
        return;
    }

    try {
        await apiRequest('flights/update.php', 'POST', {
            flight_id: flightToManage.id,
            available_seats: newSeats
        });

        showMessage('manage-seats-message', 'Seats updated successfully!', 'success');

        setTimeout(() => {
            closeSeatsModal();
            loadFlightsForManagement();
        }, 1500);

    } catch (error) {
        showMessage('manage-seats-message', `Error: ${error.message}`, 'error');
    }
}

// ============ EDIT/UPDATE FLIGHT FUNCTIONS ============
async function openEditFlightModal(flightId) {
    try {
        const result = await apiRequest(`flights/get.php?id=${flightId}`);
        const flight = result.data[0];

        if (!flight) {
            showAlert('Flight not found!');
            return;
        }

        document.getElementById('edit-flight-number').textContent = flight.flight_number;
        document.getElementById('edit-flight-original-number').value = flight.flight_number;
        document.getElementById('edit-flight-number-input').value = flight.flight_number;
        document.getElementById('edit-flight-source').value = flight.source;
        document.getElementById('edit-flight-destination').value = flight.destination;
        document.getElementById('edit-flight-time').value = flight.departure_time;
        document.getElementById('edit-flight-seats').value = flight.available_seats;
        document.getElementById('edit-flight-price').value = flight.price;

        document.getElementById('edit-flight-message').innerHTML = '';

        const editModal = document.getElementById('edit-flight-modal');
        if (editModal) {
            editModal.style.display = 'block';
        }
        // Keep track of the flight being edited so updateFlight() can reference its id
        flightToManage = flight;

    } catch (error) {
        showAlert(`Error: ${error.message}`);
    }
}

function closeEditFlightModal() {
    const editModal = document.getElementById('edit-flight-modal');
    if (editModal) {
        editModal.style.display = 'none';
    }
    // clear selected flight to avoid accidental reuse
    flightToManage = null;
}

async function updateFlight(event) {
    event.preventDefault();

    const originalNumber = document.getElementById('edit-flight-original-number').value;
    const flightNumber = document.getElementById('edit-flight-number-input').value.trim();
    const source = document.getElementById('edit-flight-source').value.trim();
    const destination = document.getElementById('edit-flight-destination').value.trim();
    const departureTime = document.getElementById('edit-flight-time').value.trim();
    const seatsAvailable = parseInt(document.getElementById('edit-flight-seats').value);
    const price = parseFloat(document.getElementById('edit-flight-price').value);

    if (!flightNumber || !source || !destination || !departureTime) {
        showMessage('edit-flight-message', 'Please fill all required fields!', 'error');
        return;
    }

    if (isNaN(seatsAvailable) || seatsAvailable < 0) {
        showMessage('edit-flight-message', 'Please enter a valid number of seats!', 'error');
        return;
    }

    if (isNaN(price) || price <= 0) {
        showMessage('edit-flight-message', 'Please enter a valid price!', 'error');
        return;
    }

    try {
        await apiRequest('flights/update.php', 'POST', {
            flight_id: flightToManage.id,
            flight_number: flightNumber,
            source: source,
            destination: destination,
            departure_time: departureTime,
            available_seats: seatsAvailable,
            price: price
        });

        showMessage('edit-flight-message', 'Flight updated successfully!', 'success');

        setTimeout(() => {
            closeEditFlightModal();
            loadFlightsForManagement();
            loadFlights();
        }, 1500);

    } catch (error) {
        showMessage('edit-flight-message', `Error: ${error.message}`, 'error');
    }
}

// ============ DELETE FLIGHT FUNCTIONS ============
async function showDeleteConfirmation(flightId) {
    try {
        const result = await apiRequest(`flights/get.php?id=${flightId}`);
        const flight = result.data[0];

        if (!flight) {
            showAlert('Flight not found!');
            return;
        }

        window.flightToDelete = flightId;
        document.getElementById('delete-flight-number').textContent = flight.flight_number;
        document.getElementById('delete-message').innerHTML = '';

        const deleteModal = document.getElementById('delete-confirmation-modal');
        if (deleteModal) {
            deleteModal.style.display = 'block';
        }

    } catch (error) {
        showAlert(`Error: ${error.message}`);
    }
}

function closeDeleteConfirmationModal() {
    const deleteModal = document.getElementById('delete-confirmation-modal');
    if (deleteModal) {
        deleteModal.style.display = 'none';
    }
    window.flightToDelete = null;
}

async function deleteFlight() {
    if (!window.flightToDelete) return;

    try {
        await apiRequest('flights/delete.php', 'POST', {
            flight_id: window.flightToDelete
        });

        showMessage('delete-message', 'Flight deleted successfully!', 'success');

        setTimeout(() => {
            closeDeleteConfirmationModal();
            loadFlightsForManagement();
            loadFlights();
            loadAllBookings();
            loadMyBookings();
        }, 1500);

    } catch (error) {
        showMessage('delete-message', `Error: ${error.message}`, 'error');
    }
}

// ============ BOOKING MANAGEMENT FUNCTIONS ============
async function loadAllBookings() {
    const allBookingsList = document.getElementById('all-bookings-list');
    allBookingsList.innerHTML = '<div class="message info">Loading bookings...</div>';

    try {
        const result = await apiRequest('admin/manage-bookings.php?action=list');

        if (result.data.length === 0) {
            allBookingsList.innerHTML = '<div class="message info">No bookings found!</div>';
            return;
        }

        const confirmedBookings = result.data.filter(b => b.status === 'confirmed');
        const cancelledBookings = result.data.filter(b => b.status === 'cancelled');
        const delayedBookings = result.data.filter(b => b.status === 'delayed');

        const tabsHTML = `
            <div class="booking-tabs">
                <button class="booking-tab-btn active" onclick="showBookingTab('all')">All Bookings (${result.data.length})</button>
                <button class="booking-tab-btn" onclick="showBookingTab('confirmed')">Confirmed (${confirmedBookings.length})</button>
                <button class="booking-tab-btn" onclick="showBookingTab('cancelled')">Cancelled (${cancelledBookings.length})</button>
                <button class="booking-tab-btn" onclick="showBookingTab('delayed')">Delayed (${delayedBookings.length})</button>
            </div>
            <div class="booking-tab-content">
                <div id="all-bookings-tab" class="tab-pane active">
                    ${renderBookingsList(result.data)}
                </div>
                <div id="confirmed-bookings-tab" class="tab-pane">
                    ${confirmedBookings.length > 0 ? renderBookingsList(confirmedBookings) : '<div class="message info">No confirmed bookings found.</div>'}
                </div>
                <div id="cancelled-bookings-tab" class="tab-pane">
                    ${cancelledBookings.length > 0 ? renderBookingsList(cancelledBookings) : '<div class="message info">No cancelled bookings found.</div>'}
                </div>
                <div id="delayed-bookings-tab" class="tab-pane">
                    ${delayedBookings.length > 0 ? renderBookingsList(delayedBookings) : '<div class="message info">No delayed bookings found.</div>'}
                </div>
            </div>
        `;

        allBookingsList.innerHTML = tabsHTML;

    } catch (error) {
        allBookingsList.innerHTML = `<div class="message error">Error loading bookings: ${error.message}</div>`;
    }
}

function renderBookingsList(bookingArray) {
    if (bookingArray.length === 0) return '<div class="message info">No bookings found.</div>';

    return bookingArray.map(booking => {
        let statusBadge = '';
        if (booking.status === 'cancelled') {
            statusBadge = '<span class="badge cancelled">Cancelled</span>';
        } else if (booking.status === 'delayed') {
            statusBadge = '<span class="badge delayed">Delayed</span>';
        } else if (booking.status === 'pending') {
            statusBadge = '<span class="badge pending">Pending</span>';
        } else {
            statusBadge = '<span class="badge confirmed">Confirmed</span>';
        }

        const bookingDate = booking.booking_date ? new Date(booking.booking_date).toLocaleDateString() : 'N/A';
        const cancellationDate = booking.cancellation_date ? new Date(booking.cancellation_date).toLocaleDateString() : null;
        const delayDate = booking.delay_date ? new Date(booking.delay_date).toLocaleDateString() : null;

        return `
            <div class="booking-card admin-booking-card ${booking.status || 'confirmed'}">
                <div class="flight-route">
                    ${booking.source} → ${booking.destination} 
                    ${statusBadge}
                </div>
                <div class="flight-details">
                    <div class="booking-info-grid">
                        <div class="info-item">
                            <strong>Passenger:</strong> ${booking.passenger_name}
                        </div>
                        <div class="info-item">
                            <strong>Flight:</strong> ${booking.flight_number}
                        </div>
                        <div class="info-item">
                            <strong>Time:</strong> ${booking.departure_time}
                        </div>
                        <div class="info-item">
                            <strong>Booking Date:</strong> ${bookingDate}
                        </div>
                        <div class="info-item">
                            <strong>Price:</strong> $${booking.price}
                        </div>
                        ${booking.seat_number ? `<div class="info-item"><strong>Seat:</strong> ${booking.seat_number}</div>` : ''}
                    </div>
                    
                    ${booking.status === 'cancelled' ? `
                        <div class="status-details cancelled-details">
                            <h4>Cancellation Details:</h4>
                            <div class="details-grid">
                                ${cancellationDate ? `<div><strong>Cancellation Date:</strong> ${cancellationDate}</div>` : ''}
                                ${booking.refund_amount ? `<div><strong>Refund Amount:</strong> $${Number(booking.refund_amount).toFixed(2)}</div>` : ''}
                            </div>
                        </div>
                    ` : ''}
                    
                    ${booking.status === 'delayed' ? `
                        <div class="status-details delayed-details">
                            <h4>Delay Details:</h4>
                            <div class="details-grid">
                                ${delayDate ? `<div><strong>Delay Date:</strong> ${delayDate}</div>` : ''}
                                ${booking.delay_reason ? `<div><strong>Reason:</strong> ${booking.delay_reason}</div>` : ''}
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function showBookingTab(tabName) {
    document.querySelectorAll('.booking-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    document.getElementById(`${tabName}-bookings-tab`).classList.add('active');
}

// ============ STATISTICS FUNCTIONS ============
async function loadStatistics() {
    const statisticsContent = document.getElementById('statistics-content');
    statisticsContent.innerHTML = '<div class="message info">Loading statistics...</div>';

    try {
        const result = await apiRequest('admin/dashboard.php');
        const stats = result.data;

        const confirmedCount = stats.status_breakdown?.confirmed || 0;
        const cancelledCount = stats.status_breakdown?.cancelled || 0;
        const delayedCount = stats.status_breakdown?.delayed || 0;
        const totalBookings = stats.total_bookings || 0;

        const confirmedPercentage = totalBookings > 0 ? ((confirmedCount / totalBookings) * 100).toFixed(2) : 0;
        const cancelledPercentage = totalBookings > 0 ? ((cancelledCount / totalBookings) * 100).toFixed(2) : 0;
        const delayedPercentage = totalBookings > 0 ? ((delayedCount / totalBookings) * 100).toFixed(2) : 0;

        statisticsContent.innerHTML = `
            <div class="stats-grid">
                <div class="stat-card">
                    <h4>Total Flights</h4>
                    <p>${stats.total_flights || 0}</p>
                </div>
                <div class="stat-card">
                    <h4>Total Bookings</h4>
                    <p>${totalBookings}</p>
                </div>
                <div class="stat-card">
                    <h4>Total Revenue</h4>
                    <p>$${stats.total_revenue || 0}</p>
                </div>
                <div class="stat-card">
                    <h4>Today's Bookings</h4>
                    <p>${stats.today_bookings || 0}</p>
                </div>
                <div class="stat-card">
                    <h4>Available Seats</h4>
                    <p>${stats.available_seats || 0}</p>
                </div>
                <div class="stat-card">
                    <h4>Total Passengers</h4>
                    <p>${stats.total_passengers || 0}</p>
                </div>
            </div>
            
            <div class="enhanced-stats">
                <h4>Booking Status Breakdown</h4>
                <div class="booking-stats-summary">
                    <div class="stat-card-booking confirmed">
                        <h4>Confirmed</h4>
                        <div class="count">${confirmedCount}</div>
                        <div class="percentage">${confirmedPercentage}% of total</div>
                    </div>
                    <div class="stat-card-booking cancelled">
                        <h4>Cancelled</h4>
                        <div class="count">${cancelledCount}</div>
                        <div class="percentage">${cancelledPercentage}% of total</div>
                    </div>
                    <div class="stat-card-booking delayed">
                        <h4>Delayed</h4>
                        <div class="count">${delayedCount}</div>
                        <div class="percentage">${delayedPercentage}% of total</div>
                    </div>
                </div>
                
                <div style="margin-top: 20px; background: #f8f9fa; padding: 15px; border-radius: 8px;">
                    <h5>Recent Bookings</h5>
                    <div id="recent-bookings-list"></div>
                </div>
            </div>
        `;

        loadRecentBookings();

    } catch (error) {
        statisticsContent.innerHTML = `<div class="message error">Error loading statistics: ${error.message}</div>`;
    }
}

async function loadRecentBookings() {
    const recentBookingsList = document.getElementById('recent-bookings-list');
    if (!recentBookingsList) return;

    try {
        const result = await apiRequest('admin/dashboard.php');
        const recentBookings = result.data.recent_bookings || [];

        if (recentBookings.length === 0) {
            recentBookingsList.innerHTML = '<p class="message info">No recent bookings.</p>';
            return;
        }

        recentBookingsList.innerHTML = recentBookings.map(booking => `
            <div class="recent-change-item">
                <div>
                    <strong>${booking.passenger_name}</strong> - ${booking.flight_number}
                    <br>
                    <small>${booking.source} → ${booking.destination}</small>
                </div>
                <div>
                    <span class="badge ${booking.status}">${booking.status}</span>
                    <br>
                    <small>${new Date(booking.created_at).toLocaleDateString()}</small>
                </div>
            </div>
        `).join('');

    } catch (error) {
        recentBookingsList.innerHTML = `<p class="message error">Error: ${error.message}</p>`;
    }
}

// ============ EXISTING USERS FUNCTIONS ============
async function loadExistingUsers() {
    const existingPassengers = document.getElementById('existing-passengers');
    const existingAdmins = document.getElementById('existing-admins');

    try {
        // Note: You'll need to create endpoints for these
        const passengersResult = await apiRequest('passengers/list.php');
        const adminsResult = await apiRequest('admin/list.php');

        if (passengersResult.data.length > 0) {
            existingPassengers.innerHTML = '<h4>Passengers:</h4><div class="user-list">' +
                passengersResult.data.map(passenger => `
                    <div class="user-item">
                        <span class="user-info">${passenger.name} (Age: ${passenger.age})</span>
                        <button class="quick-login-btn" onclick="quickLoginPassenger('${passenger.username}')">
                            Quick Login
                        </button>
                    </div>
                `).join('') + '</div>';
        } else {
            existingPassengers.innerHTML = '<p class="message info">No passengers registered yet.</p>';
        }

        if (adminsResult.data.length > 0) {
            existingAdmins.innerHTML = '<h4>Admins:</h4><div class="user-list">' +
                adminsResult.data.map(admin => `
                    <div class="user-item">
                        <span class="user-info">${admin.username}</span>
                        <button class="quick-login-btn" onclick="quickLoginAdmin('${admin.username}')">
                            Quick Login
                        </button>
                    </div>
                `).join('') + '</div>';
        } else {
            existingAdmins.innerHTML = '<p class="message info">No admins registered yet.</p>';
        }

    } catch (error) {
        existingPassengers.innerHTML = '<p class="message info">No passengers registered yet.</p>';
        existingAdmins.innerHTML = '<p class="message info">No admins registered yet.</p>';
    }
}

async function quickLoginPassenger(username) {
    try {
        document.getElementById('login-username').value = username;
        showMessage('passenger-login-message', `Auto-filled ${username}. Enter password to login.`, 'info');
    } catch (error) {
        console.error('Quick login error:', error);
    }
}

async function quickLoginAdmin(username) {
    try {
        document.getElementById('admin-login-username').value = username;
        showMessage('admin-login-message', `Auto-filled ${username}. Enter password to login.`, 'info');
    } catch (error) {
        console.error('Quick login error:', error);
    }
}

// ============ INITIALIZATION ============
async function initializeApp() {
    updateLanguage();
    updateLanguageButtons();
    exposeGlobals();
    console.info('Airline Booking System initialized');

    // Check authentication on load
    try {
        const profileResult = await apiRequest('passengers/profile.php', 'GET', null, { silent: true });
        currentUser = profileResult.data;
        if (currentUser) {
            showScreen('passenger-dashboard');
            loadFlights();
        }
    } catch (error) {
        // Not logged in as passenger
    }

    try {
        const dashboardResult = await apiRequest('admin/dashboard.php', 'GET', null, { silent: true });
        currentAdmin = dashboardResult.data;
        if (currentAdmin) {
            showScreen('admin-dashboard');
            loadFlightsForManagement();
        }
    } catch (error) {
        // Not logged in as admin
    }

    // Set up event listeners
    setupEventListeners();
}

function exposeGlobals() {
    Object.assign(window, {
        switchLanguage,
        showAboutUs,
        showAboutSystem,
        closeAboutModal,
        closeAboutUsModal,
        showScreen,
        showPassengerSection,
        showAdminSection,
        registerPassenger,
        loginPassenger,
        loginAdmin,
        logout,
        searchFlights,
        bookFlight,
        loadFlights,
        loadMyBookings,
        loadFlightsForManagement,
        loadAllBookings,
        loadStatistics,
        quickLoginPassenger,
        quickLoginAdmin,
        showCancelConfirmation,
        closeCancelModal,
        confirmCancelBooking,
        showDelayOptions,
        closeDelayModal,
        processDelayBooking,
        openDelaySeatSelector,
        closeDelaySuccessModal,
        selectPaymentMethod,
        proceedToPayment,
        processPayment,
        closeModal,
        closePaymentMethodModal,
        showSeatModal,
        closeSeatModal,
        confirmSeatSelection,
        openSeatsModal,
        closeSeatsModal,
        updateSeats,
        openEditFlightModal,
        closeEditFlightModal,
        updateFlight,
        showDeleteConfirmation,
        closeDeleteConfirmationModal,
        deleteFlight
    });
}

function setupEventListeners() {
    // Modal close on outside click
    window.addEventListener('click', function (event) {
        const modals = [
            'payment-modal',
            'manage-seats-modal',
            'seat-modal',
            'about-system-modal',
            'payment-method-modal',
            'edit-flight-modal',
            'delete-confirmation-modal',
            'cancel-booking-modal',
            'delay-booking-modal',
            'about-us-modal'
        ];

        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal && event.target === modal) {
                switch (modalId) {
                    case 'payment-modal':
                        closeModal();
                        break;
                    case 'manage-seats-modal':
                        closeSeatsModal();
                        break;
                    case 'seat-modal':
                        closeSeatModal();
                        break;
                    case 'about-system-modal':
                        closeAboutModal();
                        break;
                    case 'payment-method-modal':
                        closePaymentMethodModal();
                        break;
                    case 'edit-flight-modal':
                        closeEditFlightModal();
                        break;
                    case 'delete-confirmation-modal':
                        closeDeleteConfirmationModal();
                        break;
                    case 'cancel-booking-modal':
                        closeCancelModal();
                        break;
                    case 'delay-booking-modal':
                        closeDelayModal();
                        break;
                    case 'about-us-modal':
                        closeAboutUsModal();
                        break;
                }
            }
        });
    });

    // Seat selection continue button
    const continueBtn = document.getElementById('ethiopian-seat-modal-continue');
    if (continueBtn) {
        continueBtn.addEventListener('click', confirmSeatSelection);
    }

    // Book flight buttons (delegated)
    document.body.addEventListener('click', function (e) {
        const btn = e.target.closest && e.target.closest('.book-btn');
        if (!btn) return;
        e.preventDefault();

        const onclick = btn.getAttribute && btn.getAttribute('onclick');
        if (onclick) {
            const m = onclick.match(/bookFlight\((\d+)\)/);
            if (m) {
                const flightId = parseInt(m[1]);
                bookFlight(flightId);
            }
        }
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);