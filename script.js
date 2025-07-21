// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")
  const sections = document.querySelectorAll(".section")

  // Mobile menu toggle
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active")

    // Animate hamburger
    hamburger.classList.toggle("active")
  })

  // Navigation link clicks
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetSection = this.getAttribute("data-section")
      showSection(targetSection)

      // Close mobile menu
      navMenu.classList.remove("active")
      hamburger.classList.remove("active")
    })
  })

  // Form submissions
  setupFormHandlers()

  // Show home section by default
  showSection("home")
})

// Section switching functionality
function showSection(sectionId) {
  const sections = document.querySelectorAll(".section")
  const navLinks = document.querySelectorAll(".nav-link")

  // Hide all sections
  sections.forEach((section) => {
    section.classList.remove("active")
  })

  // Remove active class from all nav links
  navLinks.forEach((link) => {
    link.classList.remove("active")
  })

  // Show target section
  const targetSection = document.getElementById(sectionId)
  if (targetSection) {
    setTimeout(() => {
      targetSection.classList.add("active")
    }, 100)
  }

  // Add active class to corresponding nav link
  const activeLink = document.querySelector(`[data-section="${sectionId}"]`)
  if (activeLink) {
    activeLink.classList.add("active")
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" })
}

// Form handling setup
function setupFormHandlers() {
  const newsForm = document.getElementById("news-form")
  const contactForm = document.getElementById("contact-form")

  // News form submission
  newsForm.addEventListener("submit", handleNewsSubmission)

  // Contact form submission
  contactForm.addEventListener("submit", handleContactSubmission)
}

// News form submission handler
function handleNewsSubmission(e) {
  e.preventDefault()

  const newsInput = document.getElementById("news-input")
  const submitButton = document.getElementById("submit-button")
  const buttonText = submitButton.querySelector(".button-text")
  const loadingSpinner = document.getElementById("loading-spinner")
  const inputError = document.getElementById("input-error")

  // Validate input
  if (!newsInput.value.trim()) {
    showInputError("Please enter a news article or headline to analyze.")
    return
  }

  if (newsInput.value.trim().length < 10) {
    showInputError("Please enter at least 10 characters for analysis.")
    return
  }

  // Clear any previous errors
  hideInputError()

  // Show loading state
  submitButton.disabled = true
  buttonText.textContent = "Analyzing..."
  loadingSpinner.style.display = "block"

  // Simulate API call with timeout
  setTimeout(
    () => {
      // Generate mock result
      const result = generateMockResult(newsInput.value)

      // Display results
      displayResults(result)

      // Reset button state
      submitButton.disabled = false
      buttonText.textContent = "Analyze News"
      loadingSpinner.style.display = "none"

      // Show results section
      showSection("results")
    },
    2000 + Math.random() * 1000,
  ) // Random delay between 2-3 seconds
}

// Contact form submission handler
function handleContactSubmission(e) {
  e.preventDefault()

  const form = e.target
  const submitButton = form.querySelector(".submit-button")
  const originalText = submitButton.textContent

  // Show loading state
  submitButton.disabled = true
  submitButton.textContent = "Sending..."

  // Simulate form submission
  setTimeout(() => {
    alert("Thank you for your message! We'll get back to you soon.")
    form.reset()

    // Reset button state
    submitButton.disabled = false
    submitButton.textContent = originalText
  }, 1500)
}

// Input validation helpers
function showInputError(message) {
  const inputError = document.getElementById("input-error")
  const newsInput = document.getElementById("news-input")

  inputError.textContent = message
  inputError.style.display = "block"
  newsInput.style.borderColor = "#dc3545"
}

function hideInputError() {
  const inputError = document.getElementById("input-error")
  const newsInput = document.getElementById("news-input")

  inputError.style.display = "none"
  newsInput.style.borderColor = "#e9ecef"
}

// Mock result generation
function generateMockResult(inputText) {
  const mockResults = [
    {
      result: "Fake",
      confidence: 67,
      reasoning:
        "This article uses exaggerated claims, lacks credible sources, and mimics satirical patterns commonly found in misinformation campaigns.",
      similar_articles: [
        { title: "Fact-Check: No, Kenya Did Not Ban Internet", url: "#" },
        { title: "How to Spot Fake News – BBC Africa", url: "#" },
        { title: "Misinformation Trends in East Africa", url: "#" },
      ],
    },
    {
      result: "Real",
      confidence: 89,
      reasoning:
        "The article cites credible sources, uses professional journalistic language, and the claims can be verified through multiple independent sources.",
      similar_articles: [
        { title: "Reuters Fact Check Database", url: "#" },
        { title: "Associated Press News Verification", url: "#" },
        { title: "African Union Official Statement", url: "#" },
      ],
    },
    {
      result: "Uncertain",
      confidence: 45,
      reasoning:
        "The article contains some verifiable facts but also includes unsubstantiated claims. More investigation is needed to determine full accuracy.",
      similar_articles: [
        { title: "Pending Verification - Similar Claims", url: "#" },
        { title: "Fact-Checkers Investigating Related Story", url: "#" },
        { title: "Expert Analysis Needed", url: "#" },
      ],
    },
  ]

  // Simple logic to determine result based on input characteristics
  const text = inputText.toLowerCase()
  let resultIndex = 0

  if (text.includes("breaking") || text.includes("urgent") || text.includes("shocking")) {
    resultIndex = 0 // More likely to be fake
  } else if (text.includes("according to") || text.includes("official") || text.includes("study")) {
    resultIndex = 1 // More likely to be real
  } else {
    resultIndex = 2 // Uncertain
  }

  return mockResults[resultIndex]
}

// Results display
function displayResults(result) {
  const resultsContainer = document.getElementById("results-container")

  const resultHtml = `
        <div class="result-card">
            <div class="result-header">
                <div class="result-badge ${result.result.toLowerCase()}">
                    ${getResultIcon(result.result)} ${result.result.toUpperCase()}
                </div>
            </div>
            
            <div class="confidence-section">
                <div class="confidence-label">Confidence Score</div>
                <div class="confidence-bar-large">
                    <div class="confidence-fill-large ${result.result.toLowerCase()}" 
                         style="width: ${result.confidence}%"></div>
                </div>
                <div class="confidence-percentage">${result.confidence}%</div>
            </div>
            
            <div class="reasoning-section">
                <h3 class="reasoning-title">AI Analysis</h3>
                <div class="reasoning-text">${result.reasoning}</div>
            </div>
            
            <div class="similar-articles">
                <h3 class="similar-title">Related Fact-Checks</h3>
                <ul class="article-list">
                    ${result.similar_articles
                      .map(
                        (article) => `
                        <li class="article-item">
                            <a href="${article.url}" class="article-link" target="_blank">
                                📄 ${article.title}
                            </a>
                        </li>
                    `,
                      )
                      .join("")}
                </ul>
            </div>
            
            <button class="reset-button" onclick="resetAnalysis()">
                Check Another Article
            </button>
        </div>
    `

  resultsContainer.innerHTML = resultHtml

  // Animate confidence bar
  setTimeout(() => {
    const confidenceFill = document.querySelector(".confidence-fill-large")
    if (confidenceFill) {
      confidenceFill.style.width = result.confidence + "%"
    }
  }, 500)
}

// Helper function to get result icons
function getResultIcon(result) {
  switch (result.toLowerCase()) {
    case "real":
      return "✅"
    case "fake":
      return "❌"
    case "uncertain":
      return "⚠️"
    default:
      return "❓"
  }
}

// Reset analysis function
function resetAnalysis() {
  // Clear the form
  document.getElementById("news-input").value = ""

  // Clear any errors
  hideInputError()

  // Go back to submit section
  showSection("submit")
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add scroll effect to navbar
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "none"
  }
})

// Add loading animation to cards
function animateCards() {
  const cards = document.querySelectorAll(".about-card, .visual-card")

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  })

  cards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "all 0.6s ease"
    observer.observe(card)
  })
}

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", animateCards)
