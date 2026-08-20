import { useEffect, useRef, useState } from 'react'
import './App.css'

const galleryItems = [
  {
    title: 'A cherished first memory with Jyothi',
    image: '/images/pic1.jpg',
    caption: 'You will find happiness with people who truly value your caring nature',
  },
  {
    title: 'An unforgettable adventure with Jyothi',
    image: '/images/pic2.jpg',
    caption: 'Your smile spreads happiness and brightens up the room.',
  },
  {
    title: 'Jyothi shining bright during a celebration',
    image: '/images/pic3.jpg',
    caption: 'I’ve always loved your kind heart and your playful, childish behavior back in our 10th class',
  },
]

const qualities = [
  {
    icon: '✨',
    title: 'Your Incredible Strength',
    text: 'You have an amazing strength to face any challenge with courage. Your determination and positivity lift everyone around you. You make hard things look easy with your confidence and energy.',
  },
  {
    icon: '❤️',
    title: 'Your Loving Heart',
    text: 'You are caring and loving, always thinking of others. Your warmth and kindness make everyone feel special. You value relationships and give your heart sincerely.',
  },
]

const birthdayName = [...'JYOTHI']

function DrawnName() {
  return (
    <svg className="drawn-name" viewBox="0 0 900 190" role="img" aria-label="Jyothi">
      <text x="450" y="132" textAnchor="middle">
        {birthdayName.map((letter, index) => (
          <tspan key={`${letter}-${index}`} style={{ '--draw-delay': `${index * 0.45}s` }}>
            {letter}
          </tspan>
        ))}
      </text>
    </svg>
  )
}

const chatFlow = [
  { sender: 'me', text: 'Hi madam, how are you?' },
  { sender: 'her', text: 'I am good 😊' },
  { sender: 'me', text: 'Remember the last time I made this for you? You saw it only a month later.' },
  { sender: 'her', text: 'Yes, I remember 😄' },
  { sender: 'me', text: 'This time I think I made it at the right moment, because it will make you much happier.' },
  { sender: 'her', text: 'Aww, that means a lot ❤️' },
  { sender: 'me', text: 'ఇవి నా వైపు నుంచి నేను చేసిన చిన్న చిన్న సంభాషణలు… ఇవి నీకు కొంచెమైనా ఆనందాన్ని ఇస్తాయని అనుకుంటున్నాను.' },
  { sender: 'her', text: 'That is so sweet 💛' },
  { sender: 'me', text: 'YOUR BIRTHDAY 🎉🎂' },
]

function App() {
  const [introVisible, setIntroVisible] = useState(true)
  const [chatMessages, setChatMessages] = useState([])
  const [chatTyping, setChatTyping] = useState(true)
  const [chatComplete, setChatComplete] = useState(false)
  const [secretOpen, setSecretOpen] = useState(false)
  const [creatorOpen, setCreatorOpen] = useState(false)
  const [theaterOpen, setTheaterOpen] = useState(false)
  const [theaterClosing, setTheaterClosing] = useState(false)
  const [crackerOpen, setCrackerOpen] = useState(false)
  const [messageSurpriseOpen, setMessageSurpriseOpen] = useState(false)
  const [popupCakeVisible, setPopupCakeVisible] = useState(false)
  const [wishMade, setWishMade] = useState(false)
  const theaterVideoRef = useRef(null)

  const openBirthdayPage = () => {
    setIntroVisible(false)
  }

  const closeTheater = () => {
    setTheaterClosing(true)
    window.setTimeout(() => {
      setTheaterOpen(false)
      setTheaterClosing(false)
    }, 1100)
  }

  useEffect(() => {
    let messageIndex = 0
    let timer

    const revealNextMessage = () => {
      if (messageIndex >= chatFlow.length) {
        setChatTyping(false)
        setChatComplete(true)
        return
      }

      const message = chatFlow[messageIndex]
      messageIndex += 1
      setChatTyping(true)
      timer = window.setTimeout(() => {
        setChatMessages((current) => [...current, message])
        setChatTyping(false)
        timer = window.setTimeout(revealNextMessage, 700)
      }, 850)
    }

    timer = window.setTimeout(revealNextMessage, 700)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!theaterOpen || !theaterVideoRef.current) return undefined

    const playTimer = window.setTimeout(() => {
      theaterVideoRef.current?.play().catch(() => {})
    }, 1250)

    return () => window.clearTimeout(playTimer)
  }, [theaterOpen])

  useEffect(() => {
    if (!messageSurpriseOpen) return undefined

    const revealTimer = window.setTimeout(() => setPopupCakeVisible(true), 1800)
    return () => window.clearTimeout(revealTimer)
  }, [messageSurpriseOpen])

  return (
    <div className="app-shell">
      <div className="global-bubbles" aria-hidden="true">
        {Array.from({ length: 28 }, (_, index) => (
          <span className="intro-float-bubble" key={index} />
        ))}
      </div>
      <div className="drone-show global-drones" aria-hidden="true">
        {Array.from({ length: 24 }, (_, index) => <i key={index} />)}
      </div>
      {introVisible && (
        <div className="intro-screen">
          <div className="intro-bubbles" aria-hidden="true">
            {Array.from({ length: 28 }, (_, index) => (
              <span className="intro-float-bubble" key={index} />
            ))}
          </div>
          <div className="intro-scene">
            <div className="sparkles" />

            <div className="whatsapp-card" aria-label="Fake WhatsApp conversation">
              <div className="whatsapp-header">
                <div className="whatsapp-avatar">💬</div>
                <div>
                  <strong>Jyothi</strong>
                  <span>{chatTyping ? 'typing...' : 'online'}</span>
                </div>
              </div>
              <div className="chat-area" aria-live="polite">
                {chatMessages.map((message, index) => (
                  <div className={`chat-message ${message.sender}`} key={`${message.sender}-${index}`}>
                    <div className="chat-bubble">{message.text}<small>✓✓</small></div>
                  </div>
                ))}
                {chatTyping && (
                  <div className="typing-row">
                    <div className="typing-bubble"><span /><span /><span /></div>
                  </div>
                )}
              </div>
            </div>

            <button type="button" className={`intro-button ${chatComplete ? 'ready' : ''}`} onClick={openBirthdayPage} disabled={!chatComplete}>
              Let&apos;s See
            </button>
          </div>
        </div>
      )}

      <div className={`page-content ${introVisible ? '' : 'visible'}`}>
        <header className="hero">
          <div className="festival-sky" aria-hidden="true">
            <div className="sky-stars" />
            <div className="falling-stars">
              {Array.from({ length: 8 }, (_, index) => <i key={index} />)}
            </div>
            <div className="drone-show">
              {Array.from({ length: 24 }, (_, index) => <i key={index} />)}
            </div>
            {[
              { className: 'firework firework-one', rays: 12 },
              { className: 'firework firework-two', rays: 10 },
              { className: 'firework firework-three', rays: 14 },
            ].map(({ className, rays }) => (
              <div className={className} key={className}>
                {Array.from({ length: rays }, (_, index) => (
                  <i key={index} style={{ '--ray-angle': `${(360 / rays) * index}deg` }} />
                ))}
              </div>
            ))}
            <div className="festival-lantern lantern-one" />
            <div className="festival-lantern lantern-two" />
            <div className="festival-lantern lantern-three" />
          </div>
          <canvas className="hero-canvas" />
          <div className="hero-content">
            <h1 className="hero-title">Happy Birthday, Jyothi!</h1>
            <p className="hero-subtitle">
              On this special day, may your life be filled with love, laughter, and endless blessings.
              <br />
              You deserve nothing but the best, today and always. 🌟
            </p>
            <p className="date">September 28th</p>
          </div>
          <a href="#celebration-section" className="scroll-down">↓</a>
        </header>

        <main>
          <section id="celebration-section" className="section">
            <h2 className="section-title">A Celebration of You</h2>

            {qualities.map(({ icon, title, text }) => (
              <div className="personality-card" key={title}>
                <h3>
                  <span className="card-icon">{icon}</span>
                  {title}
                  {title === 'Your Loving Heart' && (
                    <button
                      type="button"
                      className="secret-trigger"
                      aria-label="Open secret message"
                      onClick={() => setSecretOpen(true)}
                    >
                      ♥
                    </button>
                  )}
                </h3>
                <p>{text}</p>
              </div>
            ))}
          </section>

          <section id="gallery" className="section">
            <h2 className="section-title">A Gallery of Your Moments</h2>
            <div className="photo-grid">
              {galleryItems.map((item) => (
                <div className="photo-card" key={item.title}>
                  <img src={item.image} alt={item.title} />
                  <p className="caption">{item.caption}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="section">
            <h2 className="section-title">Your Surprise!</h2>
            <p className="surprise-text">
              Jyothi, because a star like you deserves the most special celebration, this surprise is made just for you.
            </p>
            <div className="surprise-actions">
              <button type="button" className="cracker-button" onClick={() => setCrackerOpen(true)}>
                Crackers Celebration
              </button>
              <button type="button" className="video-button" onClick={() => setTheaterOpen(true)}>
                Open Birthday Video
              </button>
              <button type="button" className="another-surprise-button" onClick={() => setMessageSurpriseOpen(true)}>
                Another Surprise
              </button>
            </div>
          </section>

          <section className="creator-trigger-section">
            <button type="button" className="creator-link" onClick={() => setCreatorOpen(true)}>
              A message from Admin
            </button>
          </section>
        </main>

        <footer>
          <p>With love, Hacker ❤</p>
        </footer>
      </div>

      {creatorOpen && (
        <div className="creator-page-overlay visible">
          <div className="creator-page-content">
            <span className="close-modal" onClick={() => setCreatorOpen(false)} aria-label="Close message">
              &times;
            </span>
            <div className="creator-photo-frame">
              <img src="/images/profile.jpg" alt="A photo of the creator" />
            </div>
            <div className="creator-text-content">
              <h2>From Abhi</h2>
              <p>
                Happy Birthday, Jyothi! Creating this little world for you has been so much fun. I hope it brings a huge smile to your face. You are an incredible person, and I&apos;m so lucky to have you in my life. Wishing you all the best today and always!
              </p>
            </div>
          </div>
        </div>
      )}

      {secretOpen && (
        <div className="modal-overlay visible">
          <div className="secret-modal">
            <span className="close-modal" onClick={() => setSecretOpen(false)} aria-label="Close message">
              &times;
            </span>
            <h2>Your Special Day</h2>
            <p className="secret-date">June 30th</p>
            <p>
              While today is all about celebrating you, I wanted to save a small, secret moment for yours. This day will always be incredibly special for you. It&apos;s a day that reminds you of love, connection, and the wonderful journey you guys are going on. Thinking of you today, and always.
            </p>
          </div>
        </div>
      )}

      {theaterOpen && (
        <div className={`theater-overlay ${theaterClosing ? 'closing' : ''}`} role="dialog" aria-modal="true" aria-label="Birthday surprise video">
          <div className="theater-lights" />
          <div className="curtain curtain-left" />
          <div className="curtain curtain-right" />
          <div className="theater-stage">
            <button type="button" className="theater-close" onClick={closeTheater} aria-label="Close theater">
              &times;
            </button>
            <div className="screen-glow">
              <video ref={theaterVideoRef} controls playsInline preload="metadata" onEnded={closeTheater}>
                <source src="/Journey.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="theater-caption">A special memory, just for you, Jyothi</p>
          </div>
        </div>
      )}

      {crackerOpen && (
        <div className="cracker-overlay" role="dialog" aria-modal="true" aria-label="Crackers celebration">
          <div className="space-bubbles" aria-hidden="true">
            <span className="bubble bubble-one" />
            <span className="bubble bubble-two" />
            <span className="bubble bubble-three" />
            <span className="bubble bubble-four" />
            <span className="bubble bubble-five" />
            <span className="bubble bubble-six" />
          </div>
          <div className="rockets" aria-hidden="true">
            <span className="rocket rocket-one" />
            <span className="rocket rocket-two" />
            <span className="rocket rocket-three" />
          </div>
          <div className="cracker-burst burst-one" />
          <div className="cracker-burst burst-two" />
          <div className="cracker-burst burst-three" />
          <DrawnName />
          <div className="cracker-message">
            <p className="cracker-kicker">This celebration is for</p>
            <p>May your birthday sparkle with happiness, laughter, and beautiful surprises.</p>
            <button type="button" className="cracker-dismiss" onClick={() => setCrackerOpen(false)}>
              Keep celebrating
            </button>
          </div>
        </div>
      )}

      {messageSurpriseOpen && (
        <div className="message-surprise-overlay" role="dialog" aria-modal="true" aria-label="Another birthday surprise">
          <div className={`message-surprise-card ${wishMade ? 'wish-made' : ''}`}>
            <button type="button" className="message-surprise-close" onClick={() => { setMessageSurpriseOpen(false); setPopupCakeVisible(false); setWishMade(false) }} aria-label="Close surprise">
              &times;
            </button>
            <p className="popup-eyebrow">A little message for you</p>
            <h2>Happy Birthday, Jyothi</h2>
            <p className="cake-question">A birthday without complete without a cake isnt it</p>
            <div className={`popup-cake ${popupCakeVisible ? 'revealed' : ''}`} aria-label="Black and green birthday cake">
              <div className="popup-rocket popup-rocket-one" />
              <div className="popup-rocket popup-rocket-two" />
              <div className="popup-rocket popup-rocket-three" />
              <div className="popup-flame flame-one" />
              <div className="popup-flame flame-two" />
              <div className="popup-flame flame-three" />
              <div className="popup-cake-top" />
              <div className="popup-cake-layer popup-cake-layer-top" />
              <div className="popup-cake-layer popup-cake-layer-bottom" />
              <div className="cake-toppings" aria-hidden="true">
                <span className="topping topping-one" />
                <span className="topping topping-two" />
                <span className="topping topping-three" />
                <span className="topping topping-four" />
                <span className="topping topping-five" />
                <span className="topping topping-six" />
                <span className="topping topping-seven" />
                <span className="topping topping-eight" />
                <span className="topping topping-nine" />
                <span className="topping topping-ten" />
                <span className="topping topping-eleven" />
                <span className="topping topping-twelve" />
                <span className="top-topping biscuit biscuit-one" />
                <span className="top-topping biscuit biscuit-two" />
                <span className="top-topping nut nut-one" />
                <span className="top-topping nut nut-two" />
                <span className="top-topping chip chip-one" />
                <span className="top-topping chip chip-two" />
                <span className="top-topping chip chip-three" />
                <span className="top-topping sprinkle sprinkle-one" />
                <span className="top-topping sprinkle sprinkle-two" />
                <span className="top-topping sprinkle sprinkle-three" />
              </div>
              <div className="chocolate-drips" aria-hidden="true">
                <span className="drip drip-one" />
                <span className="drip drip-two" />
                <span className="drip drip-three" />
                <span className="drip drip-four" />
                <span className="drip drip-five" />
                <span className="drip drip-six" />
              </div>
              <div className="popup-cake-plate" />
            </div>
            <p className="popup-cake-caption">Now make a wish and cut your cake.</p>
            <div className={`wish-zone ${wishMade ? 'wish-made' : ''}`}>
              <div className="wish-sparks" aria-hidden="true">
                <span /><span /><span /><span /><span /><span />
              </div>
              <button type="button" className="wish-button" onClick={() => setWishMade(true)}>
                {wishMade ? 'Your wish is on its way ✨' : 'Make a Wish'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
