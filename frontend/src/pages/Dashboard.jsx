import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./Dashboard.css";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dashboard">

      {/* ================= NAVBAR ================= */}
      <nav className="dashboard-nav">
        <Link to="/" className="dashboard-logo">
          SKILLI<span>X</span>
        </Link>

        <div className="dashboard-user">
          <span>
            Hi, {user?.name || "there"}
          </span>

          <button onClick={handleLogout}>
            Log out
          </button>
        </div>
      </nav>


      {/* ================= MAIN ================= */}
      <main className="dashboard-main">

        {/* ================= HERO ================= */}
        <section className="dashboard-hero">

          <div className="hero-copy">

            <span className="dashboard-label">
              <span className="label-dot"></span>
              YOUR SKILLIX SPACE
            </span>

            <h1>
              What would you
              <br />
              <span>like to explore?</span>
            </h1>

            <p>
              Your skills are the starting point. Choose a path
              and let's figure out where they can take you.
            </p>

          </div>


          {/* ================= HERO CONSTELLATION ================= */}
          <div className="dashboard-orbit">
            <svg
              className="dashboard-constellation"
              viewBox="0 0 520 520"
              width="520"
              height="520"
              aria-hidden="true"
            >
              <defs>

                <radialGradient
                  id="constellationGlow"
                  cx="50%"
                  cy="50%"
                  r="50%"
                >
                  <stop
                    offset="0%"
                    stopColor="#7050ff"
                    stopOpacity="0.16"
                  />

                  <stop
                    offset="55%"
                    stopColor="#7050ff"
                    stopOpacity="0.055"
                  />

                  <stop
                    offset="100%"
                    stopColor="#7050ff"
                    stopOpacity="0"
                  />
                </radialGradient>

                <filter
                  id="constellationSoftGlow"
                  x="-100%"
                  y="-100%"
                  width="300%"
                  height="300%"
                >
                  <feGaussianBlur stdDeviation="5" />
                </filter>

              </defs>


              {/* ================= ATMOSPHERIC GLOW ================= */}
              <circle
                cx="260"
                cy="260"
                r="220"
                fill="url(#constellationGlow)"
              />


              {/* ================= SUBTLE GUIDE CIRCLES ================= */}
              <circle
                cx="260"
                cy="260"
                r="170"
                fill="none"
                stroke="#7050ff"
                strokeOpacity="0.07"
                strokeWidth="1"
                strokeDasharray="2 10"
              />

              <circle
                cx="260"
                cy="260"
                r="220"
                fill="none"
                stroke="#7050ff"
                strokeOpacity="0.055"
                strokeWidth="1"
                strokeDasharray="2 12"
              />


              {/* ================= CONSTELLATION LINES ================= */}
              <g
                fill="none"
                stroke="#7050ff"
                strokeOpacity="0.18"
                strokeWidth="1.5"
                strokeLinecap="round"
              >

                {/* outer constellation */}
                <path d="M260 88 L390 125 L428 260 L390 384 L260 432 L130 384 L92 260 L137 136 Z" />

                {/* center connections */}
                <path d="M260 260 L260 88" />
                <path d="M260 260 L390 125" />
                <path d="M260 260 L428 260" />
                <path d="M260 260 L390 384" />
                <path d="M260 260 L260 432" />
                <path d="M260 260 L130 384" />
                <path d="M260 260 L92 260" />
                <path d="M260 260 L137 136" />

              </g>


              {/* ================= SMALL BACKGROUND STARS ================= */}
              <g fill="#7050ff">

                <circle
                  cx="205"
                  cy="119"
                  r="2"
                  opacity="0.35"
                />

                <circle
                  cx="344"
                  cy="190"
                  r="2"
                  opacity="0.3"
                />

                <circle
                  cx="356"
                  cy="326"
                  r="2"
                  opacity="0.28"
                />

                <circle
                  cx="183"
                  cy="339"
                  r="2"
                  opacity="0.32"
                />

                <circle
                  cx="314"
                  cy="398"
                  r="1.8"
                  opacity="0.25"
                />

                <circle
                  cx="111"
                  cy="188"
                  r="1.8"
                  opacity="0.25"
                />

              </g>


              {/* ================= CENTRAL GLOW ================= */}
              <circle
                cx="260"
                cy="260"
                r="88"
                fill="#7050ff"
                opacity="0.08"
                filter="url(#constellationSoftGlow)"
              />


              {/* ================= CENTER ================= */}
              <circle
                cx="260"
                cy="260"
                r="68"
                fill="#ffffff"
                stroke="#ddd6ff"
                strokeWidth="1.5"
              />

              <circle
                cx="260"
                cy="260"
                r="55"
                fill="#7050ff"
                opacity="0.045"
              />

              <text
                x="260"
                y="255"
                textAnchor="middle"
                fill="#11111a"
                fontSize="20"
                fontWeight="800"
                letterSpacing="-1"
              >
                SKILLI<tspan fill="#7050ff">X</tspan>
              </text>

              <text
                x="260"
                y="278"
                textAnchor="middle"
                fill="#9a96a7"
                fontSize="8"
                fontWeight="800"
                letterSpacing="2"
              >
                YOUR PROFILE
              </text>


              {/* ================= CONSTELLATION NODES ================= */}
              <g className="constellation-node">

                {/* ================= PROFILE ================= */}
                <circle
                  cx="137"
                  cy="136"
                  r="16"
                  fill="#7050ff"
                  opacity="0.08"
                />

                <circle
                  cx="137"
                  cy="136"
                  r="7"
                  fill="#ffffff"
                  stroke="#7050ff"
                  strokeWidth="2"
                />

                <circle
                  cx="137"
                  cy="136"
                  r="3"
                  fill="#7050ff"
                />

                <rect
                  x="38"
                  y="96"
                  width="118"
                  height="44"
                  rx="11"
                  fill="#ffffff"
                  stroke="#e2dcf6"
                />

                <text
                  x="51"
                  y="114"
                  fill="#11111a"
                  fontSize="12"
                  fontWeight="800"
                >
                  Profile
                </text>

                <text
                  x="51"
                  y="128"
                  fill="#9995a6"
                  fontSize="8.5"
                >
                  Your Skillix profile
                </text>


                {/* ================= SKILLS ================= */}
                <circle
                  cx="260"
                  cy="88"
                  r="16"
                  fill="#7050ff"
                  opacity="0.08"
                />

                <circle
                  cx="260"
                  cy="88"
                  r="7"
                  fill="#ffffff"
                  stroke="#7050ff"
                  strokeWidth="2"
                />

                <circle
                  cx="260"
                  cy="88"
                  r="3"
                  fill="#7050ff"
                />

                <rect
                  x="201"
                  y="20"
                  width="118"
                  height="44"
                  rx="11"
                  fill="#ffffff"
                  stroke="#e2dcf6"
                />

                <text
                  x="214"
                  y="38"
                  fill="#11111a"
                  fontSize="12"
                  fontWeight="800"
                >
                  Skills
                </text>

                <text
                  x="214"
                  y="52"
                  fill="#9995a6"
                  fontSize="8.5"
                >
                  Your strengths
                </text>


                {/* ================= EDUCATION ================= */}
                <circle
                  cx="390"
                  cy="125"
                  r="16"
                  fill="#7050ff"
                  opacity="0.08"
                />

                <circle
                  cx="390"
                  cy="125"
                  r="7"
                  fill="#ffffff"
                  stroke="#7050ff"
                  strokeWidth="2"
                />

                <circle
                  cx="390"
                  cy="125"
                  r="3"
                  fill="#7050ff"
                />

                <rect
                  x="350"
                  y="68"
                  width="118"
                  height="44"
                  rx="11"
                  fill="#ffffff"
                  stroke="#e2dcf6"
                />

                <text
                  x="363"
                  y="86"
                  fill="#11111a"
                  fontSize="12"
                  fontWeight="800"
                >
                  Education
                </text>

                <text
                  x="363"
                  y="100"
                  fill="#9995a6"
                  fontSize="8.5"
                >
                  Your background
                </text>


                {/* ================= CAREER FIT ================= */}
                <circle
                  cx="428"
                  cy="260"
                  r="16"
                  fill="#7050ff"
                  opacity="0.08"
                />

                <circle
                  cx="428"
                  cy="260"
                  r="7"
                  fill="#ffffff"
                  stroke="#7050ff"
                  strokeWidth="2"
                />

                <circle
                  cx="428"
                  cy="260"
                  r="3"
                  fill="#7050ff"
                />

                <rect
                  x="390"
                  y="278"
                  width="118"
                  height="44"
                  rx="11"
                  fill="#ffffff"
                  stroke="#e2dcf6"
                />

                <text
                  x="403"
                  y="296"
                  fill="#11111a"
                  fontSize="12"
                  fontWeight="800"
                >
                  Career Fit
                </text>

                <text
                  x="403"
                  y="310"
                  fill="#9995a6"
                  fontSize="8.5"
                >
                  Explore alignment
                </text>


                {/* ================= INTERESTS ================= */}
                <circle
                  cx="390"
                  cy="384"
                  r="16"
                  fill="#7050ff"
                  opacity="0.08"
                />

                <circle
                  cx="390"
                  cy="384"
                  r="7"
                  fill="#ffffff"
                  stroke="#7050ff"
                  strokeWidth="2"
                />

                <circle
                  cx="390"
                  cy="384"
                  r="3"
                  fill="#7050ff"
                />

                <rect
                  x="350"
                  y="402"
                  width="118"
                  height="44"
                  rx="11"
                  fill="#ffffff"
                  stroke="#e2dcf6"
                />

                <text
                  x="363"
                  y="420"
                  fill="#11111a"
                  fontSize="12"
                  fontWeight="800"
                >
                  Interests
                </text>

                <text
                  x="363"
                  y="434"
                  fill="#9995a6"
                  fontSize="8.5"
                >
                  What excites you
                </text>


                {/* ================= EXPERIENCE ================= */}
                <circle
                  cx="260"
                  cy="432"
                  r="16"
                  fill="#7050ff"
                  opacity="0.08"
                />

                <circle
                  cx="260"
                  cy="432"
                  r="7"
                  fill="#ffffff"
                  stroke="#7050ff"
                  strokeWidth="2"
                />

                <circle
                  cx="260"
                  cy="432"
                  r="3"
                  fill="#7050ff"
                />

                <rect
                  x="201"
                  y="454"
                  width="118"
                  height="44"
                  rx="11"
                  fill="#ffffff"
                  stroke="#e2dcf6"
                />

                <text
                  x="214"
                  y="472"
                  fill="#11111a"
                  fontSize="12"
                  fontWeight="800"
                >
                  Experience
                </text>

                <text
                  x="214"
                  y="486"
                  fill="#9995a6"
                  fontSize="8.5"
                >
                  Your journey
                </text>


                {/* ================= GOALS ================= */}
                <circle
                  cx="130"
                  cy="384"
                  r="16"
                  fill="#7050ff"
                  opacity="0.08"
                />

                <circle
                  cx="130"
                  cy="384"
                  r="7"
                  fill="#ffffff"
                  stroke="#7050ff"
                  strokeWidth="2"
                />

                <circle
                  cx="130"
                  cy="384"
                  r="3"
                  fill="#7050ff"
                />

                <rect
                  x="52"
                  y="402"
                  width="118"
                  height="44"
                  rx="11"
                  fill="#ffffff"
                  stroke="#e2dcf6"
                />

                <text
                  x="65"
                  y="420"
                  fill="#11111a"
                  fontSize="12"
                  fontWeight="800"
                >
                  Goals
                </text>

                <text
                  x="65"
                  y="434"
                  fill="#9995a6"
                  fontSize="8.5"
                >
                  Where you want to go
                </text>


                {/* ================= ANALYZE ================= */}
                <circle
                  cx="92"
                  cy="260"
                  r="16"
                  fill="#7050ff"
                  opacity="0.08"
                />

                <circle
                  cx="92"
                  cy="260"
                  r="7"
                  fill="#ffffff"
                  stroke="#7050ff"
                  strokeWidth="2"
                />

                <circle
                  cx="92"
                  cy="260"
                  r="3"
                  fill="#7050ff"
                />

                <rect
                  x="12"
                  y="278"
                  width="118"
                  height="44"
                  rx="11"
                  fill="#ffffff"
                  stroke="#e2dcf6"
                />

                <text
                  x="25"
                  y="296"
                  fill="#11111a"
                  fontSize="12"
                  fontWeight="800"
                >
                  Analyze
                </text>

                <text
                  x="25"
                  y="310"
                  fill="#9995a6"
                  fontSize="8.5"
                >
                  Understand your profile
                </text>

              </g>

            </svg>
          </div>


        </section>


        {/* ================= PROFILE STATUS ================= */}
        <section className="dashboard-status">

          <div className="status-item">

            <div className="status-icon">
              ✓
            </div>

            <div>
              <div className="status-title">
                Profile ready
              </div>

              <div className="status-subtitle">
                Your journey can begin
              </div>
            </div>

          </div>


          <div className="status-item">

            <div className="status-icon">
              03
            </div>

            <div>
              <div className="status-title">
                Ways to explore
              </div>

              <div className="status-subtitle">
                Choose what fits your goal
              </div>
            </div>

          </div>


          <div className="status-item">

            <div className="status-icon">
              ✦
            </div>

            <div>
              <div className="status-title">
                Personalized
              </div>

              <div className="status-subtitle">
                Built around your profile
              </div>
            </div>

          </div>

        </section>


        {/* ================= EXPLORE ================= */}
        <section className="explore-section">

          <div className="explore-heading">

            <div>
              <span className="explore-kicker">
                EXPLORE
              </span>

              <h2>
                Choose your next move.
              </h2>
            </div>

            <p>
              You can explore each path whenever you're ready.
            </p>

          </div>


          {/* ================= THREE PATH CARDS ================= */}
          <div className="dashboard-grid">


            {/* ================= DISCOVER ================= */}
            <div className="dashboard-card">

              <div className="card-number">
                01
              </div>


              {/* ================= DISCOVER VISUAL ================= */}
              <div
                className="card-visual discover-visual"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden"
                }}
              >

                <svg
                  viewBox="0 0 420 240"
                  width="100%"
                  height="100%"
                  aria-hidden="true"
                >

                  <defs>
                    <radialGradient id="discoverGlow">
                      <stop
                        offset="0%"
                        stopColor="#7557ff"
                        stopOpacity="0.20"
                      />

                      <stop
                        offset="100%"
                        stopColor="#7557ff"
                        stopOpacity="0"
                      />
                    </radialGradient>
                  </defs>

                  {/* soft background glow */}
                  <circle
                    cx="210"
                    cy="120"
                    r="105"
                    fill="url(#discoverGlow)"
                  />

                  {/* exploration rings */}
                  <circle
                    cx="210"
                    cy="120"
                    r="72"
                    fill="none"
                    stroke="#ddd6ff"
                    strokeWidth="2"
                  />

                  <circle
                    cx="210"
                    cy="120"
                    r="48"
                    fill="none"
                    stroke="#ebe7ff"
                    strokeWidth="2"
                  />


                  {/* career paths */}
                  <path
                    d="M210 120 C170 88 128 70 82 65"
                    fill="none"
                    stroke="#cfc5ff"
                    strokeWidth="2"
                  />

                  <path
                    d="M210 120 C252 88 294 76 338 82"
                    fill="none"
                    stroke="#cfc5ff"
                    strokeWidth="2"
                  />

                  <path
                    d="M210 120 C230 154 274 178 326 188"
                    fill="none"
                    stroke="#cfc5ff"
                    strokeWidth="2"
                  />

                  <path
                    d="M210 120 C184 153 143 177 94 187"
                    fill="none"
                    stroke="#cfc5ff"
                    strokeWidth="2"
                  />


                  {/* YOU center */}
                  <circle
                    cx="210"
                    cy="120"
                    r="29"
                    fill="#ffffff"
                    stroke="#d8d0ff"
                    strokeWidth="2"
                  />

                  <circle
                    cx="210"
                    cy="120"
                    r="20"
                    fill="#7652ff"
                    opacity="0.10"
                  />

                  <circle
                    cx="210"
                    cy="120"
                    r="7"
                    fill="#7652ff"
                  />

                  <text
                    x="210"
                    y="160"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="700"
                    letterSpacing="2"
                    fill="#8d87a2"
                  >
                    YOU
                  </text>


                  {/* career destination nodes */}
                  <circle
                    cx="82"
                    cy="65"
                    r="12"
                    fill="#ffffff"
                    stroke="#d5ccff"
                    strokeWidth="2"
                  />

                  <circle
                    cx="82"
                    cy="65"
                    r="5"
                    fill="#7652ff"
                  />

                  <circle
                    cx="338"
                    cy="82"
                    r="12"
                    fill="#ffffff"
                    stroke="#d5ccff"
                    strokeWidth="2"
                  />

                  <circle
                    cx="338"
                    cy="82"
                    r="5"
                    fill="#7652ff"
                  />

                  <circle
                    cx="326"
                    cy="188"
                    r="12"
                    fill="#ffffff"
                    stroke="#d5ccff"
                    strokeWidth="2"
                  />

                  <circle
                    cx="326"
                    cy="188"
                    r="5"
                    fill="#7652ff"
                  />

                  <circle
                    cx="94"
                    cy="187"
                    r="12"
                    fill="#ffffff"
                    stroke="#d5ccff"
                    strokeWidth="2"
                  />

                  <circle
                    cx="94"
                    cy="187"
                    r="5"
                    fill="#7652ff"
                  />


                  {/* destination labels */}
                  <text
                    x="82"
                    y="43"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="700"
                    letterSpacing="1.5"
                    fill="#8b849e"
                  >
                    DATA
                  </text>

                  <text
                    x="338"
                    y="60"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="700"
                    letterSpacing="1.5"
                    fill="#8b849e"
                  >
                    AI
                  </text>

                  <text
                    x="326"
                    y="214"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="700"
                    letterSpacing="1.5"
                    fill="#8b849e"
                  >
                    PRODUCT
                  </text>

                  <text
                    x="94"
                    y="214"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="700"
                    letterSpacing="1.5"
                    fill="#8b849e"
                  >
                    TECH
                  </text>

                </svg>

              </div>


              <div className="card-content">

                <span className="card-kicker">
                  DON'T KNOW WHERE TO START?
                </span>

                <h2>
                  Discover
                  <br />
                  My Role
                </h2>

                <p>
                  Tell us about your education, skills,
                  experience, and interests. We'll uncover
                  career paths that fit you best.
                </p>

                <button
                  onClick={() => navigate("/discover")}
                >
                  Discover your fit
                  <span>→</span>
                </button>

              </div>

            </div>


            {/* ================= RESUME ================= */}
            <div className="dashboard-card">

              <div className="card-number">
                02
              </div>


              {/* ================= RESUME VISUAL ================= */}
              <div
                className="card-visual resume-visual"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden"
                }}
              >

                <svg
                  viewBox="0 0 420 240"
                  width="100%"
                  height="100%"
                  aria-hidden="true"
                >

                  <defs>

                    <filter id="resumeShadow">
                      <feDropShadow
                        dx="0"
                        dy="12"
                        stdDeviation="12"
                        floodColor="#7652ff"
                        floodOpacity="0.12"
                      />
                    </filter>

                    <radialGradient id="resumeGlow">
                      <stop
                        offset="0%"
                        stopColor="#7652ff"
                        stopOpacity="0.18"
                      />

                      <stop
                        offset="100%"
                        stopColor="#7652ff"
                        stopOpacity="0"
                      />
                    </radialGradient>

                  </defs>


                  {/* glow */}
                  <circle
                    cx="210"
                    cy="120"
                    r="105"
                    fill="url(#resumeGlow)"
                  />


                  {/* resume sheet */}
                  <g filter="url(#resumeShadow)">

                    <rect
                      x="126"
                      y="25"
                      width="148"
                      height="190"
                      rx="12"
                      fill="#ffffff"
                      stroke="#e4defb"
                      strokeWidth="2"
                    />

                    {/* document header */}
                    <rect
                      x="148"
                      y="48"
                      width="62"
                      height="7"
                      rx="3.5"
                      fill="#7652ff"
                    />

                    <rect
                      x="148"
                      y="64"
                      width="98"
                      height="5"
                      rx="2.5"
                      fill="#e8e4f0"
                    />

                    {/* text */}
                    <rect
                      x="148"
                      y="87"
                      width="100"
                      height="5"
                      rx="2.5"
                      fill="#e7e3ef"
                    />

                    <rect
                      x="148"
                      y="99"
                      width="82"
                      height="5"
                      rx="2.5"
                      fill="#e7e3ef"
                    />

                    <rect
                      x="148"
                      y="111"
                      width="92"
                      height="5"
                      rx="2.5"
                      fill="#e7e3ef"
                    />


                    {/* skills section */}
                    <text
                      x="148"
                      y="138"
                      fontSize="9"
                      fontWeight="700"
                      letterSpacing="1.5"
                      fill="#777084"
                    >
                      SKILLS
                    </text>

                    {/* skill bars */}
                    <rect
                      x="148"
                      y="148"
                      width="84"
                      height="6"
                      rx="3"
                      fill="#eeeaf7"
                    />

                    <rect
                      x="148"
                      y="148"
                      width="68"
                      height="6"
                      rx="3"
                      fill="#7652ff"
                    />

                    <rect
                      x="148"
                      y="162"
                      width="84"
                      height="6"
                      rx="3"
                      fill="#eeeaf7"
                    />

                    <rect
                      x="148"
                      y="162"
                      width="56"
                      height="6"
                      rx="3"
                      fill="#9a82ff"
                    />

                    <rect
                      x="148"
                      y="176"
                      width="84"
                      height="6"
                      rx="3"
                      fill="#eeeaf7"
                    />

                    <rect
                      x="148"
                      y="176"
                      width="73"
                      height="6"
                      rx="3"
                      fill="#7652ff"
                    />

                  </g>


                  {/* detected skill pill */}
                  <g filter="url(#resumeShadow)">

                    <rect
                      x="270"
                      y="70"
                      width="88"
                      height="32"
                      rx="10"
                      fill="#ffffff"
                      stroke="#e1dafc"
                      strokeWidth="1.5"
                    />

                    <circle
                      cx="286"
                      cy="86"
                      r="5"
                      fill="#7652ff"
                    />

                    <text
                      x="298"
                      y="90"
                      fontSize="9"
                      fontWeight="700"
                      letterSpacing="1"
                      fill="#6d6380"
                    >
                      PYTHON
                    </text>

                  </g>


                  {/* second pill */}
                  <g>

                    <rect
                      x="282"
                      y="111"
                      width="70"
                      height="30"
                      rx="10"
                      fill="#ffffff"
                      stroke="#e8e3f7"
                      strokeWidth="1.5"
                    />

                    <text
                      x="317"
                      y="130"
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight="700"
                      letterSpacing="1"
                      fill="#8b849b"
                    >
                      DATA
                    </text>

                  </g>


                  {/* check badge */}
                  <circle
                    cx="286"
                    cy="183"
                    r="29"
                    fill="#ffffff"
                    stroke="#ebe7fb"
                    strokeWidth="8"
                  />

                  <circle
                    cx="286"
                    cy="183"
                    r="23"
                    fill="#7652ff"
                  />

                  <path
                    d="M276 183 L283 190 L297 175"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                </svg>

              </div>


              <div className="card-content">

                <span className="card-kicker">
                  ALREADY KNOW YOUR DIRECTION?
                </span>

                <h2>
                  Analyze
                  <br />
                  My Resume
                </h2>

                <p>
                  Understand your strengths, detected skills,
                  career alignment, and the gaps worth working on.
                </p>

                <button
                  onClick={() => navigate("/resume")}
                >
                  Analyze resume
                  <span>→</span>
                </button>

              </div>

            </div>


            {/* ================= JOB FIT ================= */}
            <div className="dashboard-card">

              <div className="card-number">
                03
              </div>


              {/* ================= JOB FIT VISUAL ================= */}
              <div
                className="card-visual job-visual"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden"
                }}
              >

                <svg
                  viewBox="0 0 420 240"
                  width="100%"
                  height="100%"
                  aria-hidden="true"
                >

                  <defs>

                    <radialGradient id="jobGlow">
                      <stop
                        offset="0%"
                        stopColor="#7652ff"
                        stopOpacity="0.20"
                      />

                      <stop
                        offset="100%"
                        stopColor="#7652ff"
                        stopOpacity="0"
                      />
                    </radialGradient>

                    <filter id="jobShadow">
                      <feDropShadow
                        dx="0"
                        dy="10"
                        stdDeviation="12"
                        floodColor="#7652ff"
                        floodOpacity="0.10"
                      />
                    </filter>

                  </defs>


                  {/* glow */}
                  <circle
                    cx="210"
                    cy="120"
                    r="112"
                    fill="url(#jobGlow)"
                  />


                  {/* resume card */}
                  <g filter="url(#jobShadow)">

                    <rect
                      x="48"
                      y="60"
                      width="108"
                      height="112"
                      rx="12"
                      fill="#ffffff"
                      stroke="#e5e0f6"
                      strokeWidth="2"
                    />


                    <rect
                      x="70"
                      y="103"
                      width="64"
                      height="6"
                      rx="3"
                      fill="#7652ff"
                    />

                    <rect
                      x="70"
                      y="117"
                      width="72"
                      height="5"
                      rx="2.5"
                      fill="#e7e3ef"
                    />

                    <rect
                      x="70"
                      y="130"
                      width="58"
                      height="5"
                      rx="2.5"
                      fill="#e7e3ef"
                    />

                    <rect
                      x="70"
                      y="143"
                      width="68"
                      height="5"
                      rx="2.5"
                      fill="#e7e3ef"
                    />

                  </g>


                  {/* job description card */}
                  <g filter="url(#jobShadow)">

                    <rect
                      x="264"
                      y="60"
                      width="108"
                      height="112"
                      rx="12"
                      fill="#ffffff"
                      stroke="#e5e0f6"
                      strokeWidth="2"
                    />

                    <text
                      x="318"
                      y="86"
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight="700"
                      letterSpacing="1.5"
                      fill="#8c849d"
                    >
                      JOB DESCRIPTION
                    </text>

                    <rect
                      x="286"
                      y="103"
                      width="62"
                      height="6"
                      rx="3"
                      fill="#7652ff"
                    />

                    <rect
                      x="286"
                      y="117"
                      width="72"
                      height="5"
                      rx="2.5"
                      fill="#e7e3ef"
                    />

                    <rect
                      x="286"
                      y="130"
                      width="58"
                      height="5"
                      rx="2.5"
                      fill="#e7e3ef"
                    />

                    <rect
                      x="286"
                      y="143"
                      width="67"
                      height="5"
                      rx="2.5"
                      fill="#e7e3ef"
                    />

                  </g>


                  {/* connection lines */}
                  <path
                    d="M156 116 C176 105 190 105 202 113"
                    fill="none"
                    stroke="#d5cdfc"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                  />

                  <path
                    d="M218 113 C232 105 246 105 264 116"
                    fill="none"
                    stroke="#d5cdfc"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                  />


                  {/* central match badge */}
                  <circle
                    cx="210"
                    cy="118"
                    r="42"
                    fill="#ffffff"
                    stroke="#eeeafd"
                    strokeWidth="9"
                  />

                  <circle
                    cx="210"
                    cy="118"
                    r="33"
                    fill="#7652ff"
                  />

                  <circle
                    cx="210"
                    cy="118"
                    r="25"
                    fill="#ffffff"
                  />

                  <text
                    x="210"
                    y="115"
                    textAnchor="middle"
                    fontSize="17"
                    fontWeight="800"
                    fill="#7652ff"
                  >
                    84%
                  </text>

                  <text
                    x="210"
                    y="128"
                    textAnchor="middle"
                    fontSize="7"
                    fontWeight="700"
                    letterSpacing="1.2"
                    fill="#8a8399"
                  >
                    MATCH
                  </text>


                  {/* check */}
                  <circle
                    cx="210"
                    cy="178"
                    r="13"
                    fill="#7652ff"
                  />

                  <path
                    d="M204 178 L208 182 L216 173"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                </svg>

              </div>


              <div className="card-content">

                <span className="card-kicker">
                  FOUND AN OPPORTUNITY?
                </span>

                <h2>
                  Check
                  <br />
                  My Job Fit
                </h2>

                <p>
                  Compare your resume with a real job
                  description and understand where you match
                  and where you need to grow.
                </p>

                <button
                  onClick={() => navigate("/job-fit")}
                >
                  Check your fit
                  <span>→</span>
                </button>

              </div>

            </div>


          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;