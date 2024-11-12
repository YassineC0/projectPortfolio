import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Facebook, Twitter, Instagram, Download, ChevronLeft, ChevronRight, Star, Phone, Mail, MapPin, Building2, Lightbulb, Scale, BookOpen, Menu } from 'lucide-react'
import { motion, useAnimation } from 'framer-motion'
import { useSession } from 'next-auth/react'
import fs from 'fs/promises'
import path from 'path'

const companyLogos = [
  { id: 1, name: 'Company 1', src: '/apti.png' },
  { id: 2, name: 'Company 2', src: '/nv.png' },
  { id: 3, name: 'Company 3', src: '/sidiali.png' },
  { id: 4, name: 'Company 4', src: '/danone.png' },
  { id: 5, name: 'Company 5', src: '/google.png' },
  { id: 6, name: 'Company 6', src: '/android.png' },
  { id: 7, name: 'Company 7', src: '/danone.png' },
];

const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef(0);

  useEffect(() => {
    startTimeRef.current = Date.now();
    const animateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTimeRef.current) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      countRef.current = Math.floor(easeProgress * end);
      setCount(countRef.current);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };
    requestAnimationFrame(animateCount);
  }, [end, duration]);

  return count;
};

export async function getServerSideProps() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'content.json')
    const fileContents = await fs.readFile(filePath, 'utf8')
    const initialContent = JSON.parse(fileContents)

    return {
      props: { initialContent },
    }
  } catch (error) {
    console.error('Error reading initial content:', error)
    return {
      props: { initialContent: null },
    }
  }
}

export default function Home({ initialContent }) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const controls = useAnimation()
  const testimonialRef = useRef(null)
  const appointmentRef = useRef(null)
  const router = useRouter()

  const [images, setImages] = useState(initialContent?.images || {})
  const [testimonials, setTestimonials] = useState(initialContent?.testimonials || [])
  const [experiences, setExperiences] = useState(initialContent?.experiences || [])
  const [content, setContent] = useState(initialContent?.content || {})

  useEffect(() => {
    if (!initialContent) {
      fetch('/api/get-content')
        .then(response => response.json())
        .then(data => {
          setImages(data.images || {})
          setTestimonials(data.testimonials || [])
          setExperiences(data.experiences || [])
          setContent(data.content || {})
        })
        .catch(error => console.error('Error fetching content:', error))
    }
  }, [initialContent])

  useEffect(() => {
    const handleScroll = () => {
      const introSection = document.getElementById('intro-section')
      const expSection = document.getElementById('exp-section')
      const testimonialSection = testimonialRef.current
      const appointmentSection = appointmentRef.current
      if (introSection && expSection && testimonialSection && appointmentSection) {
        const introTop = introSection.getBoundingClientRect().top
        const expTop = expSection.getBoundingClientRect().top
        const testimonialTop = testimonialSection.getBoundingClientRect().top
        const appointmentTop = appointmentSection.getBoundingClientRect().top
        setIsVisible(introTop < window.innerHeight - 100 || expTop < window.innerHeight - 100)
        if (testimonialTop < window.innerHeight - 100) {
          controls.start({ opacity: 1, y: 0 })
        }
        if (appointmentTop < window.innerHeight - 100) {
          controls.start("visible")
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [controls])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const nextTestimonials = () => {
    setCurrentTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonials = () => {
    setCurrentTestimonialIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const scrollToAppointment = () => {
    appointmentRef.current?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  const scrollToTestimonials = () => {
    testimonialRef.current?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 text-gray-800">
      <header className="bg-gray-800 text-white fixed w-full z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <Link href="/" className="text-xl md:text-2xl font-bold hover:text-gray-300 transition-colors">
              LegalAdvice
            </Link>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-gray-300 transition-all duration-300 ease-in-out transform hover:scale-110">
              Home
            </Link>
            <Link href="/about-us" className="hover:text-gray-300 transition-all duration-300 ease-in-out transform hover:scale-110">
              About Us
            </Link>
            <Link href="/services" className="hover:text-gray-300 transition-all duration-300 ease-in-out transform hover:scale-110">
              Services
            </Link>
            <button onClick={scrollToTestimonials} className="hover:text-gray-300 transition-all duration-300 ease-in-out transform hover:scale-110">
              Testimonials
            </button>
          </nav>
          <div className="md:flex items-center space-x-4 hidden">
            <Twitter className="w-5 h-5 hover:text-gray-300 cursor-pointer" />
            <Facebook className="w-5 h-5 hover:text-gray-300 cursor-pointer" />
            <Instagram className="w-5 h-5 hover:text-gray-300 cursor-pointer" />
          </div>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-700 p-4">
            <Link href="/" className="block py-2 hover:text-gray-300">Home</Link>
            <Link href="/about-us" className="block py-2 hover:text-gray-300">About Us</Link>
            <Link href="/services" className="block py-2 hover:text-gray-300">Services</Link>
            <button onClick={scrollToTestimonials} className="block py-2 hover:text-gray-300 w-full text-left">Testimonials</button>
            <div className="flex justify-center space-x-4 mt-4">
              <Twitter className="w-5 h-5 hover:text-gray-300 cursor-pointer" />
              <Facebook className="w-5 h-5 hover:text-gray-300 cursor-pointer" />
              <Instagram className="w-5 h-5 hover:text-gray-300 cursor-pointer" />
            </div>
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 py-12 pt-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-6">
            <div className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold">
              #1 Legal Consulting Firm
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold leading-tight">
              {content.heroTitle || "Expert Legal Advice for Your Peace of Mind"}
            </h1>
            <p className="text-lg md:text-xl">
              {content.heroDescription || "We provide customized legal solutions that meet the unique needs and goals of each client."}
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button onClick={scrollToAppointment} className="bg-gray-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition duration-300">
                Schedule Consultation
              </button>
              <Link href="/services" className="border border-gray-800 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300 text-center">
                Learn More
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0">
            <div className="relative">
              <div className="w-72 h-72 bg-gray-200 rounded-full absolute top-0 right-0 -z-10"></div>
              <Image
                src={images['hero-image'] || "/placeholder.svg"}
                alt="Legal Professional"
                width={400}
                height={400}
                className="rounded-lg shadow-lg ml-auto"
              />
              <div className="absolute -bottom-4 right-0 bg-white p-4 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-gray-800">98%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:flex md:justify-between mt-20 text-center gap-4">
          <div>
            <div className="text-2xl md:text-4xl font-bold text-gray-800">{useCountUp(500)}+</div>
            <div className="text-sm md:text-base text-gray-600">Clients Served</div>
          </div>
          <div>
            <div className="text-2xl md:text-4xl font-bold text-gray-800">{useCountUp(50)}+</div>
            <div className="text-sm md:text-base text-gray-600">Legal Experts</div>
          </div>
          <div>
            <div className="text-2xl md:text-4xl font-bold text-gray-800">{useCountUp(100)}+</div>
            <div className="text-sm md:text-base text-gray-600">Cases Won</div>
          </div>
          <div>
            <div className="text-2xl md:text-4xl font-bold text-gray-800">{useCountUp(25)}+</div>
            <div className="text-sm md:text-base text-gray-600">Years of Experience</div>
          </div>
        </div>

        <motion.section
          id="intro-section"
          className="mt-24 bg-white p-4 md:p-8 rounded-lg shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div 
              className="md:w-1/2 space-y-4"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold text-gray-800">Hi,</h2>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-800">
                I'm <span className="text-gray-600">{content.lawyerName || "Yassine"}</span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-600">{content.lawyerTitle || "Legal Consultant"}</p>
              <a href="#appointment">
                <button className="bg-gray-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition duration-300 flex items-center mt-5">
                  Let's work <span className="ml-2">→</span>
                </button>
              </a>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-800 rounded-full"></div>
                <span className="text-sm text-gray-600">{content.websiteUrl || "www.legaladvice.com/yassine"}</span>
              </div>
            </motion.div>
            <motion.div 
              className="md:w-1/2 relative"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <Image
                  src={images['intro-image'] || "/placeholder.svg"}
                  alt="Yassine"
                  width={400}
                  height={400}
                  className="rounded-lg shadow-lg w-full"
                />
                <div className="absolute top-4 right-4 w-64 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-600">Expert on</p>
                      <p className="text-lg font-bold text-gray-800">{content.location || "Based in New York"}</p>
                    </div>
                    <p className="text-gray-600">{content.introText || "I'm a legal consultant and corporate law specialist."}</p>
                    <div className="border-t border-gray-200 pt-3">
                      <p className="text-sm text-gray-600">Looking for expert legal advice to protect your business interests?</p>
                      <p className="text-sm text-gray-600">Let's discuss your case.</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                  <a 
                    href="#" 
                    className="inline-flex items-center px-4 py-2 bg-white text-gray-800 rounded-full font-semibold hover:bg-gray-100 transition duration-300 shadow-md"
                  >
                    <Download className="w-4 h-4 mr-2" /> Download CV
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          className="mt-16 bg-blue-900 text-white p-4 md:p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-center mb-8">Companies I've Worked With</h3>
          <div className="relative overflow-hidden h-20">
            <motion.div
              className="flex absolute"
              animate={{
                x: [0, -1400],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {companyLogos.concat(companyLogos).map((logo, index) => (
                <div key={`${logo.id}-${index}`} className="w-40 h-20 mx-4 flex items-center justify-center">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={80}
                    height={80}
                    className="max-w-full max-h-full object-contain brightness-0 invert"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="exp-section"
          className="mt-24 bg-white p-4 md:p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Our Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                className="bg-gray-100 p-6 rounded-lg shadow"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col items-center mb-4">
                  {experience.icon === 'Building2' && <Building2 className="w-12 h-12 text-gray-800 mb-2" />}
                  {experience.icon === 'Lightbulb' && <Lightbulb className="w-12 h-12 text-gray-800 mb-2" />}
                  {experience.icon === 'Scale' && <Scale className="w-12 h-12 text-gray-800 mb-2" />}
                  {experience.icon === 'BookOpen' && <BookOpen className="w-12 h-12 text-gray-800 mb-2" />}
                  <h3 className="text-xl md:text-2xl font-bold text-center text-gray-800">{experience.title}</h3>
                </div>
                <p className="text-gray-600">{experience.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/about-us" className="bg-gray-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition duration-300">
              Learn More About Our Expertise
            </Link>
          </div>
        </motion.section>

        <motion.section
          id="testimonials"
          ref={testimonialRef}
          className="mt-24 bg-gray-800 text-white p-4 md:p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Testimonials</h2>
          <h3 className="text-xl md:text-2xl font-semibold text-center mb-12">We care about our customers' experience</h3>
          <div className="relative">
            <div className="flex justify-between">
              {testimonials.slice(currentTestimonialIndex, currentTestimonialIndex + 1).map((testimonial, index) => (
                <div key={testimonial.id} className="bg-gray-700 p-6 rounded-lg shadow-lg flex-1">
                  <div className="flex justify-center mb-4">
                    <Image
                      src={images[`testimonial-${testimonial.id}`] || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-center">{testimonial.name}</h4>
                  <p className="text-gray-300 text-center mb-4">{testimonial.role}</p>
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-center">{testimonial.text}</p>
                </div>
              ))}
            </div>
            <button
              onClick={prevTestimonials}
              className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={nextTestimonials}
              className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </div>
        </motion.section>

        <motion.section
          id="appointment"
          ref={appointmentRef}
          className="mt-24 bg-white p-4 md:p-8 rounded-lg shadow-lg"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Make an Appointment</h2>
          <div className="flex flex-col md:flex-row">
            <div className="flex-grow mb-8 md:mb-0">
              <div className="calendly-inline-widget" data-url="https://calendly.com/carlie4carliejeff50/30min" style={{minWidth: "320px", height: "700px"}}></div>
            </div>
            <div className="md:ml-8 flex flex-col space-y-4">
              <button className="bg-gray-800 text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-700 transition duration-300 flex items-center text-sm">
                <Phone className="w-4 h-4 mr-2" /> Contact via WhatsApp
              </button>
              <button className="bg-gray-800 text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-700 transition duration-300 flex items-center text-sm">
                <Facebook className="w-4 h-4 mr-2" /> Contact via Facebook
              </button>
              <button className="bg-gray-800 text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-700 transition duration-300 flex items-center text-sm">
                <Instagram className="w-4 h-4 mr-2" /> Contact via Instagram
              </button>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">LegalAdvice</h2>
              <p className="text-lg md:text-xl">Expert legal solutions for impatient clients</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">New York</h3>
                <p className="mb-2"><Mail className="inline-block mr-2" /> newyork@legaladvice.com</p>
                <p className="mb-2"><Phone className="inline-block mr-2" /> +1 212 555 1234</p>
                <p className="mb-2">
                  <MapPin className="inline-block mr-2" />
                  123 Legal Street,<br />
                  New York, NY 10001
                </p>
                <Link href="#" className="text-gray-300 hover:text-white">See on map →</Link>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Los Angeles</h3>
                <p className="mb-2"><Mail className="inline-block mr-2" /> losangeles@legaladvice.com</p>
                <p className="mb-2"><Phone className="inline-block mr-2" /> +1 310 555 5678</p>
                <p className="mb-2">
                  <MapPin className="inline-block mr-2" />
                  456 Justice Avenue,<br />
                  Los Angeles, CA 90001
                </p>
                <Link href="#" className="text-gray-300 hover:text-white">See on map →</Link>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Stay Informed</h3>
              <p className="mb-4">Sign up for our newsletter to get the latest legal insights</p>
              <Link href="#" className="text-gray-300 hover:text-white">Sign up for our newsletter →</Link>
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
                <div className="flex space-x-4">
                  <Link href="#" className="text-gray-300 hover:text-white"><Facebook /></Link>
                  <Link href="#" className="text-gray-300 hover:text-white"><Twitter /></Link>
                  <Link href="#" className="text-gray-300 hover:text-white"><Instagram /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}