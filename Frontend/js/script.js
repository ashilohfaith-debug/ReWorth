/* ============================================================
   ReWorth – Main Script  |  Tamil ⇄ English bilingual
   ============================================================ */

(function () {
  "use strict";

  const API = "http://localhost:5000/api";

  /* ── Translations ── */
  const T = {
    en: {
      nav: {
        home: "Home", detector: "AI Detector", guide: "Recycling Guide",
        community: "Community", locations: "Locations", dashboard: "Dashboard"
      },
      hero: {
        eyebrow: "✦ AI-powered circular economy",
        title1: "Turn Waste Into",
        title2: "Wealth",
        sub: "Upload a photo of any waste item. Our AI powered by Google Gemini identifies it, tells you how to recycle it, and connects you with your community.",
        cta1: "🔍 Detect Waste Now", cta2: "📖 Recycling Guide",
        trust1: "AI-Powered", trust1sub: "Gemini Vision",
        trust2: "10+", trust2sub: "Waste Categories",
        trust3: "Free", trust3sub: "Always"
      },
      detector: {
        eyebrow: "🤖 The main feature",
        title: "AI Waste Detector",
        sub: "Upload or capture a photo — Gemini AI tells you exactly what it is and how to handle it.",
        camera: "📷 Camera", capture: "📸 Capture", upload: "⬆ Upload", retake: "↺ Try Another",
        analyzing: "Analyzing with Gemini AI…",
        cameraBlocked: "Camera blocked — upload a photo instead.",
        emptyHint: "Upload or capture an image to identify waste",
        resultEmpty: "Your result will appear here once you upload or capture an image.",
        wasteType: "Waste Type", disposal: "Disposal Instructions",
        suggestions: "Recycling Suggestions", explanation: "Explanation",
        shareBtn: "📢 Share to Community"
      },
      guide: {
        eyebrow: "📖 Know-how",
        title: "Recycling Guide",
        sub: "Everything you need to know about every type of waste — from plastic to e-waste.",
        howTo: "How to Recycle", reuse: "Reuse Ideas", all: "All"
      },
      stats: {
        s1: "Waste Categories", s2: "Free to Use", s3: "AI Available", s4: "Worth Saving"
      },
      community: {
        eyebrow: "💬 Community",
        title: "Community Posts",
        sub: "Share your discoveries, cleanup drives, and recycling tips with the community.",
        newPost: "+ New Post",
        signInToPost: "Sign in to post",
        signedInAs: "Signed in as",
        noPostsYet: "No posts yet. Be the first to share!",
        loadingPosts: "Loading…",
        backendDown: "Could not load posts — make sure the backend is running.",
        deletePost: "Delete this post?",
        likeSignIn: "Sign in to like posts"
      },
      locations: {
        eyebrow: "📍 Clean-up spots",
        title: "Waste Locations",
        sub: "Report locations that need cleaning. Every report helps build a cleaner community.",
        newLocation: "+ Report Location",
        noLocations: "No locations reported yet.",
        loadingLocs: "Loading…",
        backendDown: "Could not load locations — make sure the backend is running.",
        deleteConfirm: "Delete this location?"
      },
      dashboard: {
        eyebrow: "👤 Your Space",
        titlePrefix: "Welcome back, ",
        sub: "Your activity at a glance.",
        totalPosts: "Total Posts", locations: "Locations",
        users: "Users", myScans: "My Scans",
        recentScans: "📊 Recent Scans", recentPosts: "📢 Recent Posts",
        noScans: "No scans yet. Try the AI Detector!", noPosts: "No posts yet in the community."
      },
      cta: {
        title: "Every piece of waste has value.\nLet AI help you discover it.",
        btn: "✦ Start Detecting"
      },
      auth: {
        signIn: "Sign In", signUp: "Sign Up",
        welcomeBack: "Welcome back", signInHint: "Sign in to your ReWorth account.",
        createAccount: "Create your account", signUpHint: "Join ReWorth and start making a difference.",
        usernameLabel: "Username", passwordLabel: "Password",
        siPlaceholder: "your_username", suPlaceholder: "choose_a_username",
        pwPlaceholder: "••••••••", newPwPlaceholder: "At least 6 characters",
        usernameHint: "3–60 chars, letters / numbers / underscore / dot only",
        createBtn: "Create Account",
        noAccount: "Don't have an account?", signUpLink: "Sign up",
        haveAccount: "Already have an account?", signInLink: "Sign in",
        signingIn: "Signing in…", creatingAccount: "Creating account…",
        serverError: "Cannot reach the server. Is the backend running on port 5000?",
        signedIn: "Signed in — welcome back, ", signedUp: "Account created — welcome to ReWorth, ",
        signedOut: "Signed out."
      },
      postModal: {
        title: "New Community Post",
        contentLabel: "What's on your mind?",
        contentPlaceholder: "Share a tip, a cleanup drive, a found waste location…",
        imageLabel: "Image URL", imagePlaceholder: "https://…",
        submitBtn: "Post", required: "Post content is required"
      },
      locationModal: {
        title: "Report a Waste Location",
        titleLabel: "Title *", titlePlaceholder: "e.g. Plastic waste near riverbank",
        descLabel: "Description", descPlaceholder: "Describe what you saw…",
        addrLabel: "Address / Area", addrPlaceholder: "e.g. Anna Nagar, Chennai",
        imageLabel: "Image URL", imagePlaceholder: "https://…",
        submitBtn: "Report Location", required: "Title is required"
      },
      gemini: {
        title: "Gemini AI Setup",
        desc: "Paste your Google AI Studio API key to enable real AI waste detection.",
        keyLabel: "API Key", keyPlaceholder: "AIza…",
        saveBtn: "Save Key",
        note: "The key is applied immediately for this session. Add it to your .env file for persistence.",
        ready: "Ready — using ", mock: "Mock mode — add key to enable real AI",
        offline: "Backend offline — start the server first",
        saved: "Gemini API key saved for this session", noKey: "Please enter an API key"
      },
      footer: {
        tagline: "Turn Today's Waste into Tomorrow's Wealth.",
        quickLinks: "Quick Links", contact: "Contact", rights: "All rights reserved."
      }
    },
    ta: {
      nav: {
        home: "முகப்பு", detector: "AI கண்டறிவி", guide: "மறுசுழற்சி வழிகாட்டி",
        community: "சமூகம்", locations: "இடங்கள்", dashboard: "டாஷ்போர்டு"
      },
      hero: {
        eyebrow: "✦ AI-இயங்கும் சுழற்சி பொருளாதாரம்",
        title1: "கழிவை ",
        title2: "செல்வமாக மாற்றுங்கள்",
        sub: "எந்தவொரு கழிவுப் பொருளின் படத்தையும் பதிவேற்றுங்கள். Google Gemini-ஆல் இயங்கும் நமது AI அதை அடையாளம் காண்கிறது, மறுசுழற்சி செய்வது எப்படி என்று கூறுகிறது.",
        cta1: "🔍 கழிவை கண்டறியுங்கள்", cta2: "📖 மறுசுழற்சி வழிகாட்டி",
        trust1: "AI-இயங்கும்", trust1sub: "Gemini தொழில்நுட்பம்",
        trust2: "10+", trust2sub: "கழிவு வகைகள்",
        trust3: "இலவசம்", trust3sub: "எப்போதும்"
      },
      detector: {
        eyebrow: "🤖 முக்கிய அம்சம்",
        title: "AI கழிவு கண்டறிவி",
        sub: "படத்தை பதிவேற்றுங்கள் அல்லது பிடியுங்கள் — Gemini AI அது என்ன என்பதை சரியாக கூறும்.",
        camera: "📷 கேமரா", capture: "📸 படம் எடு", upload: "⬆ பதிவேற்று", retake: "↺ மீண்டும் முயற்சி",
        analyzing: "Gemini AI பகுப்பாய்வு செய்கிறது…",
        cameraBlocked: "கேமரா தடுக்கப்பட்டது — படத்தை பதிவேற்றுங்கள்.",
        emptyHint: "கழிவை அடையாளம் காண படத்தை பதிவேற்றுங்கள்",
        resultEmpty: "நீங்கள் படம் பதிவேற்றியவுடன் முடிவு இங்கே தோன்றும்.",
        wasteType: "கழிவு வகை", disposal: "அகற்றல் வழிமுறைகள்",
        suggestions: "மறுசுழற்சி ஆலோசனைகள்", explanation: "விளக்கம்",
        shareBtn: "📢 சமூகத்தில் பகிருங்கள்"
      },
      guide: {
        eyebrow: "📖 அறிவு",
        title: "மறுசுழற்சி வழிகாட்டி",
        sub: "ஒவ்வொரு வகை கழிவையும் பற்றி நீங்கள் தெரிந்து கொள்ள வேண்டியது அனைத்தும் இங்கே.",
        howTo: "எப்படி மறுசுழற்சி செய்வது", reuse: "மறுபயன்பாட்டு யோசனைகள்", all: "அனைத்தும்"
      },
      stats: {
        s1: "கழிவு வகைகள்", s2: "இலவசமாக பயன்படுத்த", s3: "AI கிடைக்கிறது", s4: "காக்க வேண்டிய கிரகம்"
      },
      community: {
        eyebrow: "💬 சமூகம்",
        title: "சமூக இடுகைகள்",
        sub: "உங்கள் கண்டுபிடிப்புகளை, சுத்தப்படுத்தல் நடவடிக்கைகளை, மறுசுழற்சி குறிப்புகளை பகிருங்கள்.",
        newPost: "+ புதிய இடுகை",
        signInToPost: "இடுகை இட உள்நுழையுங்கள்",
        signedInAs: "உள்நுழைந்தவர்",
        noPostsYet: "இன்னும் இடுகைகள் இல்லை. முதலில் பகிருங்கள்!",
        loadingPosts: "ஏற்றுகிறது…",
        backendDown: "இடுகைகள் ஏற்ற முடியவில்லை — சர்வர் இயங்குகிறதா என சரிபாருங்கள்.",
        deletePost: "இந்த இடுகையை நீக்கவா?",
        likeSignIn: "விரும்புவதற்கு உள்நுழையுங்கள்"
      },
      locations: {
        eyebrow: "📍 சுத்தப்படுத்தல் இடங்கள்",
        title: "கழிவு இடங்கள்",
        sub: "சுத்தப்படுத்தல் தேவைப்படும் இடங்களை அறிவியுங்கள். ஒவ்வொரு அறிக்கையும் தூய்மையான சமூகத்தை உருவாக்க உதவுகிறது.",
        newLocation: "+ இடத்தை அறிவி",
        noLocations: "இன்னும் இடங்கள் அறிவிக்கப்படவில்லை.",
        loadingLocs: "ஏற்றுகிறது…",
        backendDown: "இடங்கள் ஏற்ற முடியவில்லை — சர்வர் இயங்குகிறதா என சரிபாருங்கள்.",
        deleteConfirm: "இந்த இடத்தை நீக்கவா?"
      },
      dashboard: {
        eyebrow: "👤 உங்கள் இடம்",
        titlePrefix: "மீண்டும் வரவேற்கிறோம், ",
        sub: "உங்கள் செயல்பாடுகள் ஒரு பார்வையில்.",
        totalPosts: "மொத்த இடுகைகள்", locations: "இடங்கள்",
        users: "பயனர்கள்", myScans: "என் ஸ்கேன்கள்",
        recentScans: "📊 சமீபத்திய ஸ்கேன்கள்", recentPosts: "📢 சமீபத்திய இடுகைகள்",
        noScans: "இன்னும் ஸ்கேன் இல்லை. AI கண்டறிவியை முயற்சியுங்கள்!", noPosts: "சமூகத்தில் இன்னும் இடுகைகள் இல்லை."
      },
      cta: {
        title: "ஒவ்வொரு கழிவுக்கும் மதிப்பு உண்டு.\nAI-ஐ கண்டுபிடிக்க உதவட்டும்.",
        btn: "✦ கண்டறிய தொடங்குங்கள்"
      },
      auth: {
        signIn: "உள்நுழை", signUp: "பதிவு செய்",
        welcomeBack: "மீண்டும் வரவேற்கிறோம்", signInHint: "உங்கள் ReWorth கணக்கில் உள்நுழையுங்கள்.",
        createAccount: "உங்கள் கணக்கை உருவாக்குங்கள்", signUpHint: "ReWorth-ல் சேர்ந்து மாற்றத்தை ஏற்படுத்துங்கள்.",
        usernameLabel: "பயனர்பெயர்", passwordLabel: "கடவுச்சொல்",
        siPlaceholder: "உங்கள்_பயனர்பெயர்", suPlaceholder: "பயனர்பெயரை தேர்வு செய்யுங்கள்",
        pwPlaceholder: "••••••••", newPwPlaceholder: "குறைந்தது 6 எழுத்துகள்",
        usernameHint: "3–60 எழுத்துகள், எழுத்துகள் / எண்கள் / _ / . மட்டும்",
        createBtn: "கணக்கை உருவாக்கு",
        noAccount: "கணக்கு இல்லையா?", signUpLink: "பதிவு செய்யுங்கள்",
        haveAccount: "ஏற்கனவே கணக்கு உள்ளதா?", signInLink: "உள்நுழையுங்கள்",
        signingIn: "உள்நுழைகிறோம்…", creatingAccount: "கணக்கை உருவாக்குகிறோம்…",
        serverError: "சர்வரை அடைய முடியவில்லை. பின்-எண்ட் போர்ட் 5000-ல் இயங்குகிறதா?",
        signedIn: "உள்நுழைந்தீர்கள் — வரவேற்கிறோம், ", signedUp: "கணக்கு உருவாக்கப்பட்டது — ReWorth-க்கு வரவேற்கிறோம், ",
        signedOut: "வெளியேறிவிட்டீர்கள்."
      },
      postModal: {
        title: "புதிய சமூக இடுகை",
        contentLabel: "என்ன நினைக்கிறீர்கள்?",
        contentPlaceholder: "ஒரு குறிப்பை, சுத்தப்படுத்தல் நடவடிக்கையை, கண்டுபிடிக்கப்பட்ட கழிவு இடத்தை பகிருங்கள்…",
        imageLabel: "படம் URL", imagePlaceholder: "https://…",
        submitBtn: "இடுகை செய்", required: "இடுகை உள்ளடக்கம் தேவை"
      },
      locationModal: {
        title: "கழிவு இடத்தை அறிவிக்கவும்",
        titleLabel: "தலைப்பு *", titlePlaceholder: "எ.கா. ஆற்றங்கரை அருகே பிளாஸ்டிக் கழிவு",
        descLabel: "விளக்கம்", descPlaceholder: "நீங்கள் பார்த்ததை விவரியுங்கள்…",
        addrLabel: "முகவரி / பகுதி", addrPlaceholder: "எ.கா. அண்ணா நகர், சென்னை",
        imageLabel: "படம் URL", imagePlaceholder: "https://…",
        submitBtn: "இடத்தை அறிவி", required: "தலைப்பு தேவை"
      },
      gemini: {
        title: "Gemini AI அமைப்பு",
        desc: "உண்மையான AI கழிவு கண்டறிதலை இயக்க உங்கள் Google AI Studio API திறவுகோலை ஒட்டுங்கள்.",
        keyLabel: "API திறவுகோல்", keyPlaceholder: "AIza…",
        saveBtn: "திறவுகோலை சேமி",
        note: "திறவுகோல் இப்போதே பயன்படுத்தப்படும். நிரந்தரமாக .env கோப்பில் சேருங்கள்.",
        ready: "தயார் — பயன்படுத்துகிறோம் ", mock: "போலி முறை — AI-ஐ இயக்க திறவுகோல் சேருங்கள்",
        offline: "சர்வர் இல்லை — முதலில் சர்வரை தொடங்குங்கள்",
        saved: "Gemini API திறவுகோல் இந்த அமர்வில் சேமிக்கப்பட்டது", noKey: "API திறவுகோலை உள்ளிடுங்கள்"
      },
      footer: {
        tagline: "இன்றைய கழிவை நாளைய செல்வமாக மாற்றுங்கள்.",
        quickLinks: "விரைவு இணைப்புகள்", contact: "தொடர்பு", rights: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை."
      }
    }
  };

  /* ── Recycling data (bilingual) ── */
  const RECYCLING_DATA = [
    {
      id: "plastic", icon: "♻",
      en: { name: "Plastic", desc: "Bottles, containers, packaging film.",
            howTo: "Rinse thoroughly, remove caps, flatten where possible. Check the recycling number (#1–7) on the bottom.",
            steps: ["Rinse containers with water", "Remove caps and labels if possible", "Place in dry recyclables bin"],
            tips: "Can be repurposed as planters, storage containers, or DIY organizers." },
      ta: { name: "பிளாஸ்டிக்", desc: "பாட்டில்கள், கொள்கலன்கள், பொதிகள்.",
            howTo: "நன்றாக கழுவி, மூடிகளை நீக்கி, தட்டையாக்கவும். கீழே உள்ள மறுசுழற்சி எண்ணை (#1–7) சரிபாருங்கள்.",
            steps: ["தண்ணீரால் கழுவுங்கள்", "மூடிகளை மற்றும் லேபிள்களை நீக்குங்கள்", "உலர் மறுசுழற்சி தொட்டியில் வையுங்கள்"],
            tips: "தாவரக் கலன்கள், சேமிப்பு கொள்கலன்கள் அல்லது DIY பொருட்களாக மறுபயன்படுத்தலாம்." }
    },
    {
      id: "paper", icon: "📄",
      en: { name: "Paper", desc: "Newspapers, documents, envelopes.",
            howTo: "Keep dry, remove staples and tape. Contaminated (greasy/wet) paper goes in trash.",
            steps: ["Remove staples, tape, plastic windows", "Keep dry — wet paper can't be recycled", "Bundle and place in paper recycling"],
            tips: "Shred for compost, use as gift wrap, or donate to schools for art projects." },
      ta: { name: "காகிதம்", desc: "செய்தித்தாள்கள், ஆவணங்கள், உறைகள்.",
            howTo: "உலர்வாக வையுங்கள், ஸ்டேபிள்கள் மற்றும் டேப்பை நீக்குங்கள். எண்ணெய் படிந்த காகிதம் குப்பையில் போடுங்கள்.",
            steps: ["ஸ்டேபிள்கள், டேப் நீக்குங்கள்", "ஈரமான காகிதம் மறுசுழற்சி செய்ய முடியாது", "தொகுத்து காகித மறுசுழற்சி தொட்டியில் வையுங்கள்"],
            tips: "உரமாக்கல், பரிசு பொதி அல்லது பள்ளிகளுக்கு கொடுக்கலாம்." }
    },
    {
      id: "glass", icon: "🍾",
      en: { name: "Glass", desc: "Jars, bottles, broken glassware.",
            howTo: "Rinse, sort by color if required by your local facility (clear, green, brown).",
            steps: ["Rinse thoroughly", "Remove metal lids and caps", "Sort by color if necessary"],
            tips: "Repurpose as candle holders, vases, or storage jars." },
      ta: { name: "கண்ணாடி", desc: "ஜாடிகள், பாட்டில்கள், உடைந்த கண்ணாடி.",
            howTo: "கழுவி, தேவைப்பட்டால் நிறத்தின்படி பிரிக்கவும் (வெளிர், பச்சை, பழுப்பு).",
            steps: ["நன்றாக கழுவுங்கள்", "உலோக மூடிகளை நீக்குங்கள்", "தேவைப்பட்டால் நிறம் வாரியாக பிரிக்கவும்"],
            tips: "மெழுகுவர்த்தி நிலையங்கள், குவளைகள் அல்லது சேமிப்பு ஜாடிகளாக மறுபயன்படுத்தலாம்." }
    },
    {
      id: "metal", icon: "🔩",
      en: { name: "Metal", desc: "Cans, foil, small hardware.",
            howTo: "Rinse cans, flatten aluminum cans if possible, bundle small items.",
            steps: ["Rinse food/beverage cans", "Flatten to save space", "Place in metal recycling bin"],
            tips: "Great for DIY planters, tool organizers, or art projects." },
      ta: { name: "உலோகம்", desc: "டின்கள், ஃபாயில், சிறிய பொருட்கள்.",
            howTo: "டின்களை கழுவி, அலுமினியம் டின்களை தட்டையாக்கவும், சிறிய பொருட்களை தொகுக்கவும்.",
            steps: ["உணவு/பானம் டின்களை கழுவுங்கள்", "இடம் சேமிக்க தட்டையாக்குங்கள்", "உலோக மறுசுழற்சி தொட்டியில் வையுங்கள்"],
            tips: "DIY தாவரக் கலன்கள், கருவி ஏற்பாடு அல்லது கலைப் பணிகளுக்கு உகந்தது." }
    },
    {
      id: "cardboard", icon: "📦",
      en: { name: "Cardboard", desc: "Boxes, cartons, packaging.",
            howTo: "Flatten boxes, keep dry, remove tape and labels. Waxed cardboard is not recyclable.",
            steps: ["Flatten all boxes", "Remove tape, labels, foam inserts", "Keep dry and stack for pickup"],
            tips: "Perfect for shipping, storage, or kids' craft projects." },
      ta: { name: "அட்டை", desc: "பெட்டிகள், கார்ட்டன்கள், பொதிகள்.",
            howTo: "பெட்டிகளை தட்டையாக்கி, உலர்வாக வைத்து, டேப் மற்றும் லேபிள்களை நீக்கவும்.",
            steps: ["அனைத்து பெட்டிகளையும் தட்டையாக்குங்கள்", "டேப், லேபிள்களை நீக்குங்கள்", "உலர்வாக வைத்து சேகரிப்புக்கு தயார் செய்யுங்கள்"],
            tips: "அனுப்புதல், சேமிப்பு அல்லது குழந்தைகள் கைவினை பணிகளுக்கு சிறந்தது." }
    },
    {
      id: "organic", icon: "🍎",
      en: { name: "Organic Waste", desc: "Food scraps, garden trimmings.",
            howTo: "Compost at home or use municipal organic collection. Avoid meat, dairy, oils in home compost.",
            steps: ["Separate food scraps from trash", "Add to compost bin or collection", "Turn compost regularly for faster breakdown"],
            tips: "Finished compost enriches garden soil. Biogas from organic waste can generate energy." },
      ta: { name: "இயற்கை கழிவு", desc: "உணவு எச்சங்கள், தோட்ட கழிவுகள்.",
            howTo: "வீட்டில் உரமாக்கவும் அல்லது நகராட்சி சேகரிப்புக்கு அனுப்பவும். இறைச்சி, பால் பொருட்களை வீட்டு உரத்தில் சேர்க்காதீர்கள்.",
            steps: ["உணவு எச்சங்களை குப்பையிலிருந்து பிரிக்கவும்", "உரக் தொட்டியில் சேர்க்கவும்", "விரைவான மட்கலுக்கு தொடர்ந்து கிளறவும்"],
            tips: "முடிந்த உரம் தோட்ட மண்ணை வளப்படுத்துகிறது. உயிர்வாயு ஆற்றல் உற்பத்திக்கும் பயன்படுகிறது." }
    },
    {
      id: "ewaste", icon: "📱",
      en: { name: "E-Waste", desc: "Cables, batteries, old devices.",
            howTo: "Drop at certified e-waste collection centers. Never throw in regular trash — contains toxic materials.",
            steps: ["Locate certified e-waste center", "Wipe personal data from devices", "Drop off or schedule pickup"],
            tips: "Donate working devices. Many components can be salvaged and refurbished." },
      ta: { name: "மின்னணு கழிவு", desc: "கேபிள்கள், பேட்டரிகள், பழைய சாதனங்கள்.",
            howTo: "சான்றளிக்கப்பட்ட மின்னணு கழிவு மையங்களில் ஒப்படைக்கவும். சாதாரண குப்பையில் போடாதீர்கள் — நச்சு பொருட்கள் உள்ளன.",
            steps: ["சான்றளிக்கப்பட்ட மின்னணு கழிவு மையத்தை கண்டுபிடியுங்கள்", "சாதனங்களில் இருந்து தனிப்பட்ட தகவல்களை நீக்குங்கள்", "ஒப்படையுங்கள் அல்லது சேகரிப்பை திட்டமிடுங்கள்"],
            tips: "பயன்படும் சாதனங்களை நன்கொடையாக வழங்குங்கள். பல பாகங்களை சேகரித்து புதுப்பிக்கலாம்." }
    },
    {
      id: "fabric", icon: "👕",
      en: { name: "Fabric / Textiles", desc: "Old clothing, linens, textiles.",
            howTo: "Donate wearable items. Send damaged textiles to textile recycling facilities.",
            steps: ["Wash and dry items", "Donate wearable clothing to charities", "Recycle damaged textiles at drop-off centers"],
            tips: "Cut into cleaning rags, make patchwork, or repurpose as tote bags." },
      ta: { name: "துணி / ஆடைகள்", desc: "பழைய ஆடைகள், படுக்கை விரிப்புகள், துணிகள்.",
            howTo: "அணியக்கூடிய பொருட்களை நன்கொடையாக வழங்குங்கள். சேதமடைந்த துணிகளை மறுசுழற்சி மையங்களுக்கு அனுப்புங்கள்.",
            steps: ["பொருட்களை கழுவி உலர்த்துங்கள்", "அணியக்கூடிய ஆடைகளை தொண்டு நிறுவனங்களுக்கு வழங்குங்கள்", "சேதமடைந்த துணிகளை மறுசுழற்சி செய்யுங்கள்"],
            tips: "சுத்தப்படுத்தும் துணிகளாக வெட்டலாம், பட்ச்வொர்க் செய்யலாம் அல்லது பைகளாக மாற்றலாம்." }
    },
    {
      id: "rubber", icon: "⚙",
      en: { name: "Rubber / Tires", desc: "Tires, rubber soles, seals.",
            howTo: "Take to specialized rubber recycling centers. Some tire shops accept old tires for free.",
            steps: ["Contact local rubber recycling center", "Transport tires responsibly", "Some shops accept for free disposal"],
            tips: "Can be repurposed as flooring, garden mulch, or DIY mats." },
      ta: { name: "ரப்பர் / டயர்கள்", desc: "டயர்கள், ரப்பர் சோல்கள், சீல்கள்.",
            howTo: "சிறப்பு ரப்பர் மறுசுழற்சி மையங்களுக்கு கொண்டு செல்லுங்கள். சில டயர் கடைகள் பழைய டயர்களை இலவசமாக ஏற்கின்றன.",
            steps: ["உள்ளூர் ரப்பர் மறுசுழற்சி மையத்தை தொடர்பு கொள்ளுங்கள்", "டயர்களை பொறுப்புடன் கொண்டு செல்லுங்கள்", "சில கடைகள் இலவசமாக ஏற்கின்றன"],
            tips: "தரை விரிப்பு, தோட்ட மல்ச் அல்லது DIY பாயாக மறுபயன்படுத்தலாம்." }
    },
    {
      id: "mixed", icon: "🗑",
      en: { name: "Mixed Waste", desc: "Multi-material or unclear items.",
            howTo: "Separate components where possible (e.g., remove metal from plastic). Check with local facility.",
            steps: ["Try to separate different materials", "Check local guidelines for mixed materials", "When in doubt, ask facility staff"],
            tips: "Many mixed items can be creatively repurposed case-by-case." },
      ta: { name: "கலப்பு கழிவு", desc: "பல பொருட்கள் கலந்த அல்லது தெளிவற்ற பொருட்கள்.",
            howTo: "முடிந்தவரை பாகங்களை பிரிக்கவும். உள்ளூர் வசதியுடன் சரிபாருங்கள்.",
            steps: ["வெவ்வேறு பொருட்களை பிரிக்க முயற்சியுங்கள்", "கலப்பு பொருட்களுக்கான உள்ளூர் வழிகாட்டுதல்களை சரிபாருங்கள்", "சந்தேகம் இருந்தால் மையத்தினரிடம் கேளுங்கள்"],
            tips: "பல கலப்பு பொருட்களை படைப்பாற்றலுடன் மறுபயன்படுத்தலாம்." }
    }
  ];

  /* ── State ── */
  const state = {
    lang: "en",
    theme: "light",
    user: null,
    token: null,
    initialized: false
  };

  /* ── Helpers ── */
  function $(s) { return document.querySelector(s); }
  function $$(s) { return Array.from(document.querySelectorAll(s)); }
  function t(path) {
    return path.split(".").reduce((o, k) => (o && o[k] !== undefined ? o[k] : ""), T[state.lang]);
  }

  function ajax(method, path, data = null) {
    const opts = { method, headers: { "Content-Type": "application/json" } };
    if (state.token) opts.headers["Authorization"] = `Bearer ${state.token}`;
    if (data) opts.body = JSON.stringify(data);
    return fetch(API + path, opts).then(r => r.json());
  }

  function ajaxMultipart(path, formData) {
    const opts = { method: "POST", body: formData };
    if (state.token) opts.headers = { "Authorization": `Bearer ${state.token}` };
    return fetch(API + path, opts).then(r => r.json());
  }

  let _toastTimer;
  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.remove("hidden");
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => el.classList.add("hidden"), 3500);
  }

  function relativeTime(dateStr) {
    const diff = Date.now() - new Date(dateStr);
    const sec = Math.floor(diff / 1000);
    if (sec < 60) return "just now";
    const min = Math.floor(sec / 60);
    if (min < 60) return `${min}m ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h ago`;
    return new Date(dateStr).toLocaleDateString();
  }

  /* ── Session persistence ── */
  function saveSession() {
    if (state.token) {
      localStorage.setItem("rw_token", state.token);
      localStorage.setItem("rw_user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("rw_token");
      localStorage.removeItem("rw_user");
    }
  }
  function loadSession() {
    const token = localStorage.getItem("rw_token");
    const user  = localStorage.getItem("rw_user");
    if (token && user) {
      state.token = token;
      state.user  = JSON.parse(user);
      updateAuthUI();
    }
  }

  /* ── Apply translations to the whole page ── */
  function applyLang() {
    const l = state.lang;

    // Navbar
    $$(".nav-link")[0] && ($$(".nav-link")[0].textContent = t("nav.home"));
    $$(".nav-link")[1] && ($$(".nav-link")[1].textContent = t("nav.detector"));
    $$(".nav-link")[2] && ($$(".nav-link")[2].textContent = t("nav.guide"));
    $$(".nav-link")[3] && ($$(".nav-link")[3].textContent = t("nav.community"));
    $$(".nav-link")[4] && ($$(".nav-link")[4].textContent = t("nav.locations"));

    // Hero
    const heroEyebrow = $(".hero .eyebrow"); if (heroEyebrow) heroEyebrow.textContent = t("hero.eyebrow");
    const h1 = $(".hero .display"); if (h1) h1.innerHTML = `${t("hero.title1")}<br><span class="gradient-text">${t("hero.title2")}</span>`;
    const heroSub = $(".hero-sub"); if (heroSub) heroSub.textContent = t("hero.sub");
    const heroCta1 = $('a[href="#detector"].btn-primary'); if (heroCta1) heroCta1.textContent = t("hero.cta1");
    const heroCta2 = $('a[href="#guide"].btn-secondary'); if (heroCta2) heroCta2.textContent = t("hero.cta2");
    const trustItems = $$(".trust-item");
    if (trustItems[0]) { trustItems[0].querySelector("strong").textContent = t("hero.trust1"); trustItems[0].querySelector("span").textContent = t("hero.trust1sub"); }
    if (trustItems[1]) { trustItems[1].querySelector("strong").textContent = t("hero.trust2"); trustItems[1].querySelector("span").textContent = t("hero.trust2sub"); }
    if (trustItems[2]) { trustItems[2].querySelector("strong").textContent = t("hero.trust3"); trustItems[2].querySelector("span").textContent = t("hero.trust3sub"); }

    // Detector section
    const detEyebrow = $(".detector-section .eyebrow"); if (detEyebrow) detEyebrow.textContent = t("detector.eyebrow");
    const detTitle = $(".detector-section .display"); if (detTitle) detTitle.textContent = t("detector.title");
    const detSub = $(".detector-section .section-sub"); if (detSub) detSub.textContent = t("detector.sub");
    const startCamBtn = $("#startCameraBtn"); if (startCamBtn) startCamBtn.textContent = t("detector.camera");
    const captureBtn  = $("#captureBtn");     if (captureBtn)  captureBtn.textContent  = t("detector.capture");
    const uploadBtn   = $("#uploadBtn");      if (uploadBtn)   uploadBtn.textContent   = t("detector.upload");
    const retakeBtn   = $("#retakeBtn");      if (retakeBtn)   retakeBtn.textContent   = t("detector.retake");
    const analyzingTxt = $("#detectorAnalyzing span"); if (analyzingTxt) analyzingTxt.textContent = t("detector.analyzing");
    const detErrTxt   = $("#detectorError");  if (detErrTxt)   detErrTxt.textContent   = t("detector.cameraBlocked");
    const detEmptySpan = $("#detectorEmpty span"); if (detEmptySpan) detEmptySpan.textContent = t("detector.emptyHint");
    const resultEmptyEl = $("#resultEmpty p"); if (resultEmptyEl) resultEmptyEl.textContent = t("detector.resultEmpty");
    const resultLabelEl = $(".result-label"); if (resultLabelEl) resultLabelEl.textContent = t("detector.wasteType");
    $$(".rr-label")[0] && ($$(".rr-label")[0].textContent = t("detector.disposal"));
    $$(".rr-label")[1] && ($$(".rr-label")[1].textContent = t("detector.suggestions"));
    $$(".rr-label")[2] && ($$(".rr-label")[2].textContent = t("detector.explanation"));
    const shareBtn = $("#saveToPostBtn"); if (shareBtn) shareBtn.textContent = t("detector.shareBtn");

    // Guide section
    const guideEyebrow = $(".guide-section .eyebrow"); if (guideEyebrow) guideEyebrow.textContent = t("guide.eyebrow");
    const guideTitle   = $(".guide-section .display");  if (guideTitle)  guideTitle.textContent   = t("guide.title");
    const guideSub     = $(".guide-section .section-sub"); if (guideSub) guideSub.textContent     = t("guide.sub");

    // Stats
    const statLabels = $$(".stat-label");
    ["stats.s1","stats.s2","stats.s3","stats.s4"].forEach((k, i) => { if (statLabels[i]) statLabels[i].textContent = t(k); });

    // Community
    const commEyebrow = $(".community-section .eyebrow"); if (commEyebrow) commEyebrow.textContent = t("community.eyebrow");
    const commTitle   = $(".community-section .display");  if (commTitle)  commTitle.textContent   = t("community.title");
    const commSub     = $(".community-section .section-sub"); if (commSub) commSub.textContent     = t("community.sub");
    const newPostBtn  = $("#openNewPostBtn"); if (newPostBtn) newPostBtn.textContent = t("community.newPost");
    const postHint    = $("#postHint");
    if (postHint) postHint.textContent = state.user ? `${t("community.signedInAs")}: ${state.user.username}` : t("community.signInToPost");

    // Locations
    const locEyebrow = $(".locations-section .eyebrow"); if (locEyebrow) locEyebrow.textContent = t("locations.eyebrow");
    const locTitle   = $(".locations-section .display");  if (locTitle)  locTitle.textContent   = t("locations.title");
    const locSub     = $(".locations-section .section-sub"); if (locSub) locSub.textContent     = t("locations.sub");
    const newLocBtn  = $("#openNewLocationBtn"); if (newLocBtn) newLocBtn.textContent = t("locations.newLocation");

    // Dashboard
    const dashEyebrow = $(".dashboard-section .eyebrow"); if (dashEyebrow) dashEyebrow.textContent = t("dashboard.eyebrow");
    const dashSub     = $(".dashboard-section .section-sub"); if (dashSub) dashSub.textContent = t("dashboard.sub");

    // CTA
    const ctaTitle = $(".cta-inner .display");
    if (ctaTitle) ctaTitle.innerHTML = t("cta.title").replace("\n", "<br>");
    const ctaBtn = $(".cta-inner .btn-primary"); if (ctaBtn) ctaBtn.textContent = t("cta.btn");

    // Auth modal buttons in navbar
    const openSI = $("#openSignIn"); if (openSI) openSI.textContent = t("auth.signIn");
    const openSU = $("#openSignUp"); if (openSU) openSU.textContent = t("auth.signUp");
    const openSIM = $("#openSignInMobile"); if (openSIM) openSIM.textContent = t("auth.signIn");
    const openSUM = $("#openSignUpMobile"); if (openSUM) openSUM.textContent = t("auth.signUp");

    // Auth modal
    const tabSI = $("#tabSignIn"); if (tabSI) tabSI.textContent = t("auth.signIn");
    const tabSU = $("#tabSignUp"); if (tabSU) tabSU.textContent = t("auth.signUp");
    const siH3  = $("#signInForm h3"); if (siH3) siH3.textContent = t("auth.welcomeBack");
    const siHint= $("#signInForm .auth-hint"); if (siHint) siHint.textContent = t("auth.signInHint");
    const siUL  = $('label[for="siUsername"]'); if (siUL) siUL.textContent = t("auth.usernameLabel");
    const siPL  = $('label[for="siPassword"]'); if (siPL) siPL.textContent = t("auth.passwordLabel");
    const siUIn = $("#siUsername"); if (siUIn) siUIn.placeholder = t("auth.siPlaceholder");
    const siPIn = $("#siPassword"); if (siPIn) siPIn.placeholder = t("auth.pwPlaceholder");
    const siBtn = $("#signInForm button[type=submit]"); if (siBtn && !siBtn.disabled) siBtn.textContent = t("auth.signIn");
    const suH3  = $("#signUpForm h3"); if (suH3) suH3.textContent = t("auth.createAccount");
    const suHint= $("#signUpForm .auth-hint"); if (suHint) suHint.textContent = t("auth.signUpHint");
    const suUL  = $('label[for="suUsername"]'); if (suUL) suUL.textContent = t("auth.usernameLabel");
    const suPL  = $('label[for="suPassword"]'); if (suPL) suPL.textContent = t("auth.passwordLabel");
    const suUIn = $("#suUsername"); if (suUIn) suUIn.placeholder = t("auth.suPlaceholder");
    const suPIn = $("#suPassword"); if (suPIn) suPIn.placeholder = t("auth.newPwPlaceholder");
    const suHintTxt = $(".field-hint"); if (suHintTxt) suHintTxt.textContent = t("auth.usernameHint");
    const suBtn = $("#signUpForm button[type=submit]"); if (suBtn && !suBtn.disabled) suBtn.textContent = t("auth.createBtn");
    const swToSU = $("#switchToSignUp"); if (swToSU) swToSU.textContent = t("auth.signUpLink");
    const swToSI = $("#switchToSignIn"); if (swToSI) swToSI.textContent = t("auth.signInLink");

    // Post modal
    const pmTitle = $("#postOverlay h3"); if (pmTitle) pmTitle.textContent = t("postModal.title");
    const pmLabel = $("#postForm label"); if (pmLabel) pmLabel.textContent = t("postModal.contentLabel");
    const pmTA    = $("#postContent"); if (pmTA) pmTA.placeholder = t("postModal.contentPlaceholder");
    const pmBtn   = $("#postForm button[type=submit]"); if (pmBtn) pmBtn.textContent = t("postModal.submitBtn");

    // Location modal
    const lmTitle = $("#locationOverlay h3"); if (lmTitle) lmTitle.textContent = t("locationModal.title");
    const lmBtn   = $("#locationForm button[type=submit]"); if (lmBtn) lmBtn.textContent = t("locationModal.submitBtn");

    // Gemini sidebar
    const gsTitle = $(".gemini-sidebar h3"); if (gsTitle) gsTitle.textContent = t("gemini.title");
    const gsKey   = $("#geminiKeyInput"); if (gsKey) gsKey.placeholder = t("gemini.keyPlaceholder");
    const gsSave  = $("#geminiKeyForm button[type=submit]"); if (gsSave) gsSave.textContent = t("gemini.saveBtn");
    const gsNote  = $(".gemini-note"); if (gsNote) gsNote.innerHTML = t("gemini.note") + ` <code>.env</code>`;

    // Footer
    const ftTagline = $(".footer-tagline"); if (ftTagline) ftTagline.textContent = t("footer.tagline");
    const ftH1 = $$(".footer-heading")[0]; if (ftH1) ftH1.textContent = t("footer.quickLinks");
    const ftH2 = $$(".footer-heading")[1]; if (ftH2) ftH2.textContent = t("footer.contact");

    // Refresh guide cards in current language
    renderGuide();

    // Update lang button label
    const langLabel = $("#langLabel");
    if (langLabel) langLabel.textContent = state.lang === "en" ? "தமிழ்" : "English";
  }

  /* ── Auth UI update ── */
  function updateAuthUI() {
    if (state.user) {
      $("#guestActions").classList.add("hidden");
      $("#userChip").classList.remove("hidden");
      $("#mobileAuthActions").classList.add("hidden");
      $("#userNameLabel").textContent  = state.user.username;
      $("#userAvatar").textContent     = state.user.username[0].toUpperCase();
      $("#postHint").textContent = `${t("community.signedInAs")}: ${state.user.username}`;
    } else {
      $("#guestActions").classList.remove("hidden");
      $("#userChip").classList.add("hidden");
      $("#mobileAuthActions").classList.remove("hidden");
      $("#postHint").textContent = t("community.signInToPost");
    }
  }

  /* ── Theme ── */
  function setTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("rw_theme", theme);
    $("#themeToggle").textContent = theme === "dark" ? "☀" : "🌙";
  }

  /* ── Reveal on scroll ── */
  function initReveal() {
    const els = $$(".reveal");
    if (!window.IntersectionObserver) { els.forEach(e => e.classList.add("in")); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.12 });
    els.forEach(e => io.observe(e));
  }

  /* ── Counters ── */
  function initCounters() {
    const nums = $$(".stat-num");
    if (!window.IntersectionObserver) {
      nums.forEach(el => {
        el.textContent = (parseInt(el.dataset.count) || 0).toLocaleString() + (el.dataset.suffix || "");
      });
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count) || 0;
        const suffix = el.dataset.suffix || "";
        let start = null;
        const step = ts => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / 1600, 1);
          el.textContent = Math.round(target * (1 - Math.pow(1-p, 3))).toLocaleString() + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold: 0.4 });
    nums.forEach(n => io.observe(n));
  }

  /* ── Auth modal ── */
  function initAuth() {
    const overlay    = $("#authOverlay");
    const signInForm = $("#signInForm");
    const signUpForm = $("#signUpForm");

    function openModal(tab) {
      overlay.classList.remove("hidden");
      const isSignUp = tab === "signup";
      $("#tabSignIn").classList.toggle("active", !isSignUp);
      $("#tabSignUp").classList.toggle("active",  isSignUp);
      signInForm.classList.toggle("hidden",  isSignUp);
      signUpForm.classList.toggle("hidden", !isSignUp);
      $("#signInError").classList.add("hidden");
      $("#signUpError").classList.add("hidden");
    }
    function closeModal() {
      overlay.classList.add("hidden");
      signInForm.reset();
      signUpForm.reset();
      $("#signInError").classList.add("hidden");
      $("#signUpError").classList.add("hidden");
    }

    $("#openSignIn").addEventListener("click",       () => openModal("signin"));
    $("#openSignUp").addEventListener("click",       () => openModal("signup"));
    $("#openSignInMobile").addEventListener("click", () => openModal("signin"));
    $("#openSignUpMobile").addEventListener("click", () => openModal("signup"));
    $("#authClose").addEventListener("click", closeModal);
    overlay.addEventListener("click", e => { if (e.target === overlay) closeModal(); });
    $("#tabSignIn").addEventListener("click", () => openModal("signin"));
    $("#tabSignUp").addEventListener("click", () => openModal("signup"));
    $("#switchToSignUp").addEventListener("click", e => { e.preventDefault(); openModal("signup"); });
    $("#switchToSignIn").addEventListener("click", e => { e.preventDefault(); openModal("signin"); });

    /* ── Sign In ── */
    signInForm.addEventListener("submit", async e => {
      e.preventDefault();
      const username = $("#siUsername").value.trim();
      const password = $("#siPassword").value;
      const errEl = $("#signInError");
      const btn   = signInForm.querySelector("button[type=submit]");
      errEl.classList.add("hidden");
      btn.disabled    = true;
      btn.textContent = t("auth.signingIn");
      try {
        const res = await ajax("POST", "/auth/login", { username, password });
        if (res.success) {
          state.user  = res.data.user;
          state.token = res.data.token;
          saveSession(); updateAuthUI(); closeModal();
          toast(t("auth.signedIn") + res.data.user.username + "!");
          loadDashboard();
        } else {
          errEl.textContent = res.message;
          errEl.classList.remove("hidden");
        }
      } catch (_) {
        errEl.textContent = t("auth.serverError");
        errEl.classList.remove("hidden");
      } finally {
        btn.disabled    = false;
        btn.textContent = t("auth.signIn");
      }
    });

    /* ── Sign Up ── */
    signUpForm.addEventListener("submit", async e => {
      e.preventDefault();
      const username = $("#suUsername").value.trim();
      const password = $("#suPassword").value;
      const errEl = $("#signUpError");
      const btn   = signUpForm.querySelector("button[type=submit]");
      errEl.classList.add("hidden");
      if (username.length < 3) {
        errEl.textContent = state.lang === "ta"
          ? "பயனர்பெயர் குறைந்தது 3 எழுத்துகள் வேண்டும்."
          : "Username must be at least 3 characters.";
        errEl.classList.remove("hidden"); return;
      }
      if (password.length < 6) {
        errEl.textContent = state.lang === "ta"
          ? "கடவுச்சொல் குறைந்தது 6 எழுத்துகள் வேண்டும்."
          : "Password must be at least 6 characters.";
        errEl.classList.remove("hidden"); return;
      }
      btn.disabled    = true;
      btn.textContent = t("auth.creatingAccount");
      try {
        const res = await ajax("POST", "/auth/register", { username, password });
        if (res.success) {
          state.user  = res.data.user;
          state.token = res.data.token;
          saveSession(); updateAuthUI(); closeModal();
          toast(t("auth.signedUp") + res.data.user.username + "!");
          loadDashboard();
        } else {
          errEl.textContent = res.message;
          errEl.classList.remove("hidden");
        }
      } catch (_) {
        errEl.textContent = t("auth.serverError");
        errEl.classList.remove("hidden");
      } finally {
        btn.disabled    = false;
        btn.textContent = t("auth.createBtn");
      }
    });

    /* ── Sign Out ── */
    $("#signOutBtn").addEventListener("click", () => {
      state.user = null; state.token = null;
      saveSession(); updateAuthUI();
      $("#dashboard").classList.add("hidden");
      toast(t("auth.signedOut"));
    });
  }

  /* ── Nav ── */
  function initNav() {
    const hamburger = $("#hamburgerBtn");
    const drawer    = $("#mobileDrawer");
    hamburger.addEventListener("click", () => drawer.classList.toggle("open"));
    $$("#mobileDrawer a").forEach(a => a.addEventListener("click", () => drawer.classList.remove("open")));

    const scrollTopBtn = $("#scrollTopBtn");
    window.addEventListener("scroll", () => {
      scrollTopBtn.classList.toggle("hidden", window.scrollY < 500);
    });
    scrollTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    /* dashboard link guard */
    const dashLink = $('a[href="#dashboard"]');
    if (dashLink) {
      dashLink.addEventListener("click", e => {
        if (!state.user) { e.preventDefault(); $("#openSignIn").click(); return; }
        $("#dashboard").classList.remove("hidden");
        loadDashboard();
      });
    }
  }

  /* ── AI Detector ── */
  const detector = {
    stream: null, lastResult: null, els: {},
    init() {
      this.els = {
        video: $("#cameraVideo"), img: $("#capturedImage"),
        empty: $("#detectorEmpty"), analyzing: $("#detectorAnalyzing"),
        scanOverlay: $("#scanOverlay"), canvas: $("#captureCanvas"),
        error: $("#detectorError"),
        startCameraBtn: $("#startCameraBtn"), captureBtn: $("#captureBtn"),
        uploadBtn: $("#uploadBtn"), retakeBtn: $("#retakeBtn"),
        fileInput: $("#fileInput"),
        resultEmpty: $("#resultEmpty"), resultPanel: $("#resultPanel"),
        resultIcon: $("#resultIcon"), resultType: $("#resultType"),
        resultCat: $("#resultCat"), resultConf: $("#resultConf"),
        resultDisposal: $("#resultDisposal"),
        resultSuggestions: $("#resultSuggestions"),
        resultExplanation: $("#resultExplanation"),
        saveToPostBtn: $("#saveToPostBtn")
      };
      this.els.startCameraBtn.addEventListener("click", () => this.startCamera());
      this.els.captureBtn.addEventListener("click",     () => this.capture());
      this.els.uploadBtn.addEventListener("click",      () => this.els.fileInput.click());
      this.els.retakeBtn.addEventListener("click",      () => this.reset());
      this.els.fileInput.addEventListener("change",     e  => this.handleUpload(e));
      this.els.saveToPostBtn.addEventListener("click",  () => this.shareToPost());
    },
    async startCamera() {
      this.els.error.classList.add("hidden");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        this.stream = stream;
        this.els.video.srcObject = stream;
        await this.els.video.play();
        this.els.video.classList.remove("hidden");
        this.els.empty.classList.add("hidden");
        this.els.startCameraBtn.classList.add("hidden");
        this.els.captureBtn.classList.remove("hidden");
        this.els.scanOverlay.classList.remove("hidden");
      } catch (_) { this.els.error.classList.remove("hidden"); }
    },
    capture() {
      const { video, canvas } = this.els;
      canvas.width  = video.videoWidth  || 640;
      canvas.height = video.videoHeight || 480;
      canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(blob => { this.showImage(blob); this.stopStream(); this.runDetection(blob); }, "image/jpeg", 0.85);
    },
    handleUpload(e) {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      this.showImageURL(URL.createObjectURL(file));
      this.runDetection(file);
    },
    showImageURL(url) {
      this.els.video.classList.add("hidden");
      this.els.img.src = url;
      this.els.img.classList.remove("hidden");
      this.els.empty.classList.add("hidden");
      this.els.startCameraBtn.classList.add("hidden");
      this.els.captureBtn.classList.add("hidden");
      this.els.retakeBtn.classList.remove("hidden");
      this.els.scanOverlay.classList.add("hidden");
    },
    showImage(blob) { this.showImageURL(URL.createObjectURL(blob)); },
    async runDetection(blobOrFile) {
      this.els.resultPanel.classList.add("hidden");
      this.els.resultEmpty.classList.add("hidden");
      this.els.analyzing.classList.remove("hidden");
      this.els.scanOverlay.classList.remove("hidden");
      const fd = new FormData();
      fd.append("image", blobOrFile);
      try {
        const res = await ajaxMultipart("/ai/identify", fd);
        this.els.analyzing.classList.add("hidden");
        this.els.scanOverlay.classList.add("hidden");
        if (res.success) {
          const d = res.data;
          this.lastResult = d;
          this.els.resultIcon.textContent        = "♻";
          this.els.resultType.textContent        = d.waste_type  || "—";
          this.els.resultCat.textContent         = d.category    || "—";
          this.els.resultConf.textContent        = "AI ✓";
          this.els.resultDisposal.textContent    = d.disposal     || "—";
          this.els.resultSuggestions.textContent = d.suggestions  || "—";
          this.els.resultExplanation.textContent = d.explanation  || "—";
          this.els.resultPanel.classList.remove("hidden");
        } else {
          this.els.resultEmpty.querySelector("p").textContent = res.message || "Failed to analyze image.";
          this.els.resultEmpty.classList.remove("hidden");
        }
      } catch (_) {
        this.els.analyzing.classList.add("hidden");
        this.els.scanOverlay.classList.add("hidden");
        this.els.resultEmpty.querySelector("p").textContent = t("auth.serverError");
        this.els.resultEmpty.classList.remove("hidden");
      }
    },
    reset() {
      this.stopStream();
      ["img","video","analyzing","scanOverlay"].forEach(k => this.els[k].classList.add("hidden"));
      ["empty","resultEmpty","startCameraBtn"].forEach(k => this.els[k].classList.remove("hidden"));
      ["resultPanel","captureBtn","retakeBtn","error"].forEach(k => this.els[k].classList.add("hidden"));
      this.els.fileInput.value = "";
      this.lastResult = null;
    },
    stopStream() {
      if (this.stream) { this.stream.getTracks().forEach(t => t.stop()); this.stream = null; }
      this.els.scanOverlay.classList.add("hidden");
    },
    shareToPost() {
      if (!state.user) { toast(t("community.signInToPost")); $("#openSignIn").click(); return; }
      if (!this.lastResult) return;
      const r = this.lastResult;
      $("#postContent").value = `${t("detector.wasteType")}: ${r.waste_type || ""} (${r.category || ""})\n\n${r.explanation || ""}`;
      $("#postImage").value = "";
      $("#postOverlay").classList.remove("hidden");
    }
  };

  /* ── Recycling Guide ── */
  let activeGuideFilter = "all";

  function renderGuide() {
    const grid = $("#guideGrid");
    if (!grid) return;
    const filtered = activeGuideFilter === "all"
      ? RECYCLING_DATA
      : RECYCLING_DATA.filter(d => d.id === activeGuideFilter);
    const lang = state.lang;
    const howToLabel = t("guide.howTo");
    const reuseLabel = t("guide.reuse");
    grid.innerHTML = filtered.map(d => {
      const info  = d[lang];
      const steps = info.steps.map((s, i) =>
        `<div class="guide-step"><span class="guide-step-num">${i+1}</span><span>${s}</span></div>`).join("");
      return `<div class="guide-card reveal in">
        <div class="guide-head"><div class="guide-icon">${d.icon}</div><div class="guide-name">${info.name}</div></div>
        <p class="guide-desc">${info.desc}</p>
        <div class="guide-section-title">${howToLabel}</div>
        <div class="guide-tips">${info.howTo}</div>
        <div class="guide-steps">${steps}</div>
        <div class="guide-section-title" style="margin-top:12px">${reuseLabel}</div>
        <div class="guide-tips">${info.tips}</div>
      </div>`;
    }).join("");
  }

  function initGuide() {
    const filterContainer = $("#guideFilters");
    const allLabel = t("guide.all");
    filterContainer.innerHTML =
      `<button class="filter-btn active" data-id="all">${allLabel}</button>` +
      RECYCLING_DATA.map(d => {
        const name = d[state.lang].name;
        return `<button class="filter-btn" data-id="${d.id}">${name}</button>`;
      }).join("");

    filterContainer.addEventListener("click", e => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      $$(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeGuideFilter = btn.dataset.id;
      renderGuide();
    });

    renderGuide();
  }

  /* ── Community Posts ── */
  async function loadPosts() {
    const container = $("#postsContainer");
    container.innerHTML = `<p style="text-align:center;color:var(--ink-faint);grid-column:1/-1">${t("community.loadingPosts")}</p>`;
    let res;
    try { res = await ajax("GET", "/posts"); }
    catch (_) {
      container.innerHTML = `<p style="text-align:center;color:var(--ink-faint);grid-column:1/-1">${t("community.backendDown")}</p>`;
      return;
    }
    if (!res.success || !res.data.length) {
      container.innerHTML = `<p style="text-align:center;color:var(--ink-faint);grid-column:1/-1">${t("community.noPostsYet")}</p>`;
      return;
    }
    container.innerHTML = res.data.map(p => {
      const likeClass = p.liked_by_me ? "liked" : "";
      const deleteBtn = state.user && state.user.username === p.username
        ? `<button class="delete-btn" data-id="${p.post_id}">🗑</button>` : "";
      const imgTag = p.image_url ? `<img src="${p.image_url}" class="post-img" alt="">` : "";
      return `<div class="post-card">
        <div class="post-meta">
          <div class="post-avatar">${p.username[0].toUpperCase()}</div>
          <div><div class="post-username">${p.username}</div><div class="post-time">${relativeTime(p.created_at)}</div></div>
        </div>
        <div class="post-content">${p.content}</div>
        ${imgTag}
        <div class="post-actions">
          <button class="like-btn ${likeClass}" data-id="${p.post_id}">❤ ${p.likes}</button>
          ${deleteBtn}
        </div>
      </div>`;
    }).join("");
    /* like / delete listeners */
    $$(".like-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        if (!state.user) { toast(t("community.likeSignIn")); $("#openSignIn").click(); return; }
        const res = await ajax("POST", `/posts/${btn.dataset.id}/like`);
        if (res.success) {
          btn.classList.toggle("liked", res.data.liked);
          btn.textContent = `❤ ${res.data.likes}`;
        }
      });
    });
    $$(".post-card .delete-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        if (!confirm(t("community.deletePost"))) return;
        const res = await ajax("DELETE", `/posts/${btn.dataset.id}`);
        if (res.success) { toast("✓"); loadPosts(); }
        else toast(res.message);
      });
    });
  }

  function initPostModal() {
    const overlay   = $("#postOverlay");
    const form      = $("#postForm");
    const contentEl = $("#postContent");
    const charCount = $("#postCharCount");

    function open() {
      if (!state.user) { toast(t("community.signInToPost")); $("#openSignIn").click(); return; }
      overlay.classList.remove("hidden");
    }
    function close() {
      overlay.classList.add("hidden"); form.reset();
      charCount.textContent = "0"; $("#postError").classList.add("hidden");
    }

    $("#openNewPostBtn").addEventListener("click", open);
    $("#postClose").addEventListener("click", close);
    overlay.addEventListener("click", e => { if (e.target === overlay) close(); });
    contentEl.addEventListener("input", () => { charCount.textContent = contentEl.value.length; });

    form.addEventListener("submit", async e => {
      e.preventDefault();
      const text = contentEl.value.trim();
      if (!text) {
        $("#postError").textContent = t("postModal.required");
        $("#postError").classList.remove("hidden"); return;
      }
      const res = await ajax("POST", "/posts", { content: text, image_url: $("#postImage").value.trim() || null });
      if (res.success) { close(); toast("✓"); loadPosts(); }
      else { $("#postError").textContent = res.message; $("#postError").classList.remove("hidden"); }
    });
  }

  /* ── Locations ── */
  async function loadLocations() {
    const container = $("#locationsContainer");
    container.innerHTML = `<p style="text-align:center;color:var(--ink-faint);grid-column:1/-1">${t("locations.loadingLocs")}</p>`;
    let res;
    try { res = await ajax("GET", "/locations"); }
    catch (_) {
      container.innerHTML = `<p style="text-align:center;color:var(--ink-faint);grid-column:1/-1">${t("locations.backendDown")}</p>`;
      return;
    }
    if (!res.success || !res.data.length) {
      container.innerHTML = `<p style="text-align:center;color:var(--ink-faint);grid-column:1/-1">${t("locations.noLocations")}</p>`;
      return;
    }
    container.innerHTML = res.data.map(loc => {
      const imgTag = loc.image_url
        ? `<img src="${loc.image_url}" class="location-img" alt="">`
        : `<div class="location-img-placeholder">📍</div>`;
      const deleteBtn = state.user && state.user.username === loc.username
        ? `<button class="delete-btn" data-id="${loc.location_id}">🗑</button>` : "";
      const addrTag = loc.address ? `<span class="location-addr">📍 ${loc.address}</span>` : "";
      return `<div class="location-card">
        ${imgTag}
        <div class="location-body">
          <div class="location-title">${loc.title}</div>
          <div class="location-desc">${loc.description || "—"}</div>
        </div>
        <div class="location-footer">
          ${addrTag}
          <span class="location-user">${loc.username} · ${relativeTime(loc.created_at)}</span>
          ${deleteBtn}
        </div>
      </div>`;
    }).join("");
    $$(".location-card .delete-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        if (!confirm(t("locations.deleteConfirm"))) return;
        const res = await ajax("DELETE", `/locations/${btn.dataset.id}`);
        if (res.success) { toast("✓"); loadLocations(); }
        else toast(res.message);
      });
    });
  }

  function initLocationModal() {
    const overlay = $("#locationOverlay");
    const form    = $("#locationForm");

    function open() {
      if (!state.user) { toast(t("community.signInToPost")); $("#openSignIn").click(); return; }
      overlay.classList.remove("hidden");
    }
    function close() { overlay.classList.add("hidden"); form.reset(); $("#locationError").classList.add("hidden"); }

    $("#openNewLocationBtn").addEventListener("click", open);
    $("#locationClose").addEventListener("click", close);
    overlay.addEventListener("click", e => { if (e.target === overlay) close(); });

    form.addEventListener("submit", async e => {
      e.preventDefault();
      const title = $("#locTitle").value.trim();
      if (!title) {
        $("#locationError").textContent = t("locationModal.required");
        $("#locationError").classList.remove("hidden"); return;
      }
      const res = await ajax("POST", "/locations", {
        title,
        description: $("#locDesc").value.trim()    || null,
        address:     $("#locAddress").value.trim() || null,
        image_url:   $("#locImage").value.trim()   || null
      });
      if (res.success) { close(); toast("✓"); loadLocations(); }
      else { $("#locationError").textContent = res.message; $("#locationError").classList.remove("hidden"); }
    });
  }

  /* ── Dashboard ── */
  async function loadDashboard() {
    if (!state.user) return;
    let res;
    try { res = await ajax("GET", "/dashboard"); }
    catch (_) { return; }
    if (!res.success) return;

    $("#dashWelcome").textContent = t("dashboard.titlePrefix") + state.user.username + "!";
    const s = res.data.stats;
    const icons = ["📊","📍","👥","🤖"];
    const labels = ["dashboard.totalPosts","dashboard.locations","dashboard.users","dashboard.myScans"];
    const values = [s.total_posts, s.total_locations, s.total_users, s.my_scans];
    $("#dashStats").innerHTML = icons.map((ic, i) => `
      <div class="dash-stat-card">
        <div class="dash-stat-icon">${ic}</div>
        <div><div class="dash-stat-num">${values[i]}</div><div class="dash-stat-label">${t(labels[i])}</div></div>
      </div>`).join("");

    const scansEl = $("#dashScans");
    const scans   = res.data.recent_scans;
    scansEl.innerHTML = scans.length
      ? scans.map(s => `<div class="dash-item"><span class="dash-item-icon">♻</span>
          <div><div class="dash-item-text">${s.waste_type || "Scan"}</div>
          <div class="dash-item-time">${relativeTime(s.created_at)}</div></div></div>`).join("")
      : `<div class="dash-empty">${t("dashboard.noScans")}</div>`;

    const postsEl = $("#dashPosts");
    const posts   = res.data.recent_posts;
    postsEl.innerHTML = posts.length
      ? posts.map(p => `<div class="dash-item"><span class="dash-item-icon">💬</span>
          <div><div class="dash-item-text">${p.content.substring(0,60)}…</div>
          <div class="dash-item-time">${relativeTime(p.created_at)}</div></div></div>`).join("")
      : `<div class="dash-empty">${t("dashboard.noPosts")}</div>`;

    const recentScansH3 = $(".dash-panel:first-child h3");
    const recentPostsH3 = $(".dash-panel:last-child h3");
    if (recentScansH3) recentScansH3.textContent = t("dashboard.recentScans");
    if (recentPostsH3) recentPostsH3.textContent = t("dashboard.recentPosts");
  }

  /* ── Gemini Sidebar ── */
  function initGemini() {
    const sidebar = $("#geminiSidebar");
    const fab     = $("#geminiToggleBtn");
    const closeBtn = $("#closeSidebar");
    const form    = $("#geminiKeyForm");

    fab.addEventListener("click",      () => sidebar.classList.toggle("hidden"));
    closeBtn.addEventListener("click", () => sidebar.classList.add("hidden"));

    async function checkStatus() {
      const dot = $("#statusDot");
      const txt = $("#statusText");
      try {
        const res = await ajax("GET", "/ai/config");
        if (res.success && res.data.gemini_configured) {
          dot.className = "status-dot active";
          txt.textContent = t("gemini.ready") + res.data.model;
        } else {
          dot.className = "status-dot inactive";
          txt.textContent = t("gemini.mock");
        }
      } catch (_) {
        dot.className = "status-dot inactive";
        txt.textContent = t("gemini.offline");
      }
    }
    checkStatus();

    form.addEventListener("submit", async e => {
      e.preventDefault();
      const key = $("#geminiKeyInput").value.trim();
      if (!key) { toast(t("gemini.noKey")); return; }
      try {
        const res = await ajax("POST", "/ai/config", { api_key: key });
        if (res.success) { toast(t("gemini.saved")); checkStatus(); $("#geminiKeyInput").value = ""; }
        else toast(res.message);
      } catch (_) { toast(t("auth.serverError")); }
    });
  }

  /* ── Language Toggle ── */
  function initLangToggle() {
    function toggleLang() {
      state.lang = state.lang === "en" ? "ta" : "en";
      localStorage.setItem("rw_lang", state.lang);
      document.documentElement.lang = state.lang;
      const label = state.lang === "en" ? "தமிழ்" : "English";
      const langLabel = $("#langLabel");
      if (langLabel) langLabel.textContent = label;
      // sync mobile toggle label
      const mSpan = $("#langToggleMobile span");
      if (mSpan) mSpan.textContent = label;
      applyLang();
      initGuide(); // re-render filter names in new language
    }

    const btn = $("#langToggle");
    if (btn) btn.addEventListener("click", toggleLang);
    const mBtn = $("#langToggleMobile");
    if (mBtn) mBtn.addEventListener("click", toggleLang);
  }

  /* ── Init ── */
  function init() {
    if (state.initialized) return;
    state.initialized = true;

    $("#year").textContent = new Date().getFullYear();

    /* restore preferences */
    state.lang  = localStorage.getItem("rw_lang")  || "en";
    const theme = localStorage.getItem("rw_theme") || "light";
    setTheme(theme);
    document.documentElement.lang = state.lang;

    /* theme toggle */
    $("#themeToggle").addEventListener("click", () => {
      setTheme(state.theme === "light" ? "dark" : "light");
    });

    loadSession();
    initAuth();
    initNav();
    detector.init();
    initGuide();
    initPostModal();
    initLocationModal();
    initGemini();
    initLangToggle();
    initReveal();
    initCounters();

    /* apply initial translations */
    applyLang();

    /* load data */
    loadPosts();
    loadLocations();

    /* hide preloader */
    const hidePreloader = () => {
      const p = $("#preloader");
      if (p) p.classList.add("done");
    };
    if (document.readyState === "complete") hidePreloader();
    else { window.addEventListener("load", hidePreloader); setTimeout(hidePreloader, 1000); }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
