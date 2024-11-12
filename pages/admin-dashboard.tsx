import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Facebook, Twitter, Instagram, Download, ChevronLeft, ChevronRight, Star, Phone, Mail, MapPin, Building2, Lightbulb, Scale, BookOpen, Edit, LogOut, Upload, Trash, Plus, Save } from 'lucide-react'
import { motion, useAnimation } from 'framer-motion'

const initialTestimonials = [
  {
    id: 1,
    name: "Ethan Miller",
    role: "Product Designer",
    image: "/damien.jpg",
    rating: 5,
    text: "I've been using LegalAdvice for a year now and it's made managing my legal matters so much easier."
  },
  {
    id: 2,
    name: "Emily Johnson",
    role: "Startup Founder",
    image: "/kevin.jpg",
    rating: 5,
    text: "Thanks to LegalAdvice, I feel more confident about my business decisions than ever before."
  },
  {
    id: 3,
    name: "Olivia Carter",
    role: "Small Business Owner",
    image: "/barbara.webp",
    rating: 5,
    text: "The legal team at LegalAdvice went above and beyond to help me resolve a complex issue."
  },
  {
    id: 4,
    name: "Wyatt Turner",
    role: "CEO",
    image: "/nigga.png",
    rating: 5,
    text: "LegalAdvice is simply the best legal service in the market that anyone can ask for."
  },
  {
    id: 5,
    name: "Sophie Lee",
    role: "Freelance Consultant",
    image: "/trump.webp",
    rating: 5,
    text: "The expertise and professionalism of LegalAdvice have been invaluable for my consulting business."
  },
  {
    id: 6,
    name: "Marcus Rodriguez",
    role: "Tech Entrepreneur",
    image: "/yeats.jpg",
    rating: 5,
    text: "LegalAdvice provided crucial guidance during our startup's funding rounds. Highly recommended!"
  }
]

const initialExperiences = [
  { icon: Building2, title: "Corporate Law", description: "With over 15 years of experience in corporate law, we've successfully handled mergers, acquisitions, and complex business transactions for Fortune 500 companies." },
  { icon: Lightbulb, title: "Intellectual Property", description: "Our team has secured and defended hundreds of patents, trademarks, and copyrights, protecting our clients' innovative ideas and creative works." },
  { icon: Scale, title: "Litigation", description: "We've represented clients in high-stakes litigation cases, achieving favorable outcomes in state and federal courts, including arguments before the Supreme Court." },
  { icon: BookOpen, title: "Regulatory Compliance", description: "Our expertise in navigating complex regulatory landscapes has helped numerous businesses ensure compliance and avoid costly legal issues." },
]

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

export default function AdminDashboard() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)
  const controls = useAnimation()
  const testimonialRef = useRef(null)
  const appointmentRef = useRef(null)
  const router = useRouter()

  const [editMode, setEditMode] = useState(false)
  const [editingImage, setEditingImage] = useState<string | null>(null)
  const [images, setImages] = useState({
    'hero-image': '/nigga.png',
    'intro-image': '/nigga1.jpeg',
    ...initialTestimonials.reduce((acc, t) => ({ ...acc, [`testimonial-${t.id}`]: t.image }), {})
  })

  const [testimonials, setTestimonials] = useState(initialTestimonials)
  const [experiences, setExperiences] = useState(initialExperiences)

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
      setCurrentTestimonialIndex((prevIndex) => (prevIndex + 3) % testimonials.length)
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
    setCurrentTestimonialIndex((prevIndex) => (prevIndex + 3) % testimonials.length)
  }

  const prevTestimonials = () => {
    setCurrentTestimonialIndex((prevIndex) => (prevIndex - 3 + testimonials.length) % testimonials.length)
  }

  const scrollToAppointment = () => {
    appointmentRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToTestimonials = () => {
    testimonialRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, imageId: string) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImages(prevImages => ({
          ...prevImages,
          [imageId]: e.target?.result as string
        }))
        setEditingImage(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    router.push('/admin-login')
  }

  const handleExperienceEdit = (index: number, field: string, value: string) => {
    setExperiences(prevExperiences => 
      prevExperiences.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    )
  }

  const handleExperienceAdd = () => {
    setExperiences(prevExperiences => [
      ...prevExperiences,
      { icon: Building2, title: "New Experience", description: "Description of the new experience." }
    ])
  }

  const handleExperienceRemove = (index: number) => {
    setExperiences(prevExperiences => 
      prevExperiences.filter((_, i) => i !== index)
    )
  }

  const handleTestimonialEdit = (id: number, field: string, value: string | number) => {
    setTestimonials(prevTestimonials => 
      prevTestimonials.map(testimonial => 
        testimonial.id === id ? { ...testimonial, [field]: value } : testimonial
      )
    )
  }

  const handleTestimonialRemove = (id: number) => {
    setTestimonials(prevTestimonials => 
      prevTestimonials.filter(testimonial => testimonial.id !== id)
    )
  }

  const handleSave = async () => {
    try {
      const response = await fetch('/api/save-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          images,
          testimonials,
          experiences,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        setEditMode(false);
        // Refresh the page to show updated content
        router.reload();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save content');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      alert(`Failed to save content: ${error.message}`);
    }
  };
  

  const fetchUpdatedContent = async () => {
    try {
      const response = await fetch('/api/get-content');
      if (response.ok) {
        const updatedContent = await response.json();
        setImages(updatedContent.images);
        setTestimonials(updatedContent.testimonials);
        setExperiences(updatedContent.experiences);
      } else {
        throw new Error('Failed to fetch updated content');
      }
    } catch (error) {
      console.error('Error fetching updated content:', error);
      alert('Failed to fetch updated content. Please refresh the page.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 text-gray-800">
      <header className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <Link href="/" className="text-2xl font-bold hover:text-gray-300 transition-colors">
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
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setEditMode(!editMode)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              {editMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 flex items-center"
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 pt-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-6">
            <div className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold">
              #1 Legal Consulting Firm
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Expert Legal Advice for Your Peace of Mind
            </h1>
            <p className="text-xl">
              We provide customized legal solutions that meet the unique needs and goals of each client.
            </p>
            <div className="flex space-x-4">
              <button onClick={scrollToAppointment} className="bg-gray-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition duration-300">
                Schedule Consultation
              </button>
              <Link href="/services" className="border border-gray-800 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300">
                Learn More
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0">
            <div className="relative">
              <div className="w-72 h-72 bg-gray-200 rounded-full absolute top-0 right-0 -z-10"></div>
              <Image
                src={images['hero-image']}
                alt="Legal Professional"
                width={400}
                height={400}
                className="rounded-lg shadow-lg ml-auto"
              />
              {editMode && (
                <label htmlFor="hero-image-upload" className="absolute top-2 right-2 bg-white p-2 rounded-full cursor-pointer">
                  <input
                    id="hero-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, 'hero-image')}
                  />
                  <Edit className="w-5 h-5 text-gray-600" />
                </label>
              )}
              <div className="absolute  -bottom-4 right-0 bg-white p-4 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-gray-800">98%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-20 text-center">
          <div>
            <div className="text-4xl font-bold text-gray-800">{useCountUp(500)}+</div>
            <div className="text-gray-600">Clients Served</div>
          </div>
          <div>
            <div className="text-4xl font-bold  text-gray-800">{useCountUp(50)}+</div>
            <div className="text-gray-600">Legal Experts</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-gray-800">{useCountUp(100)}+</div>
            <div className="text-gray-600">Cases Won</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-gray-800">{useCountUp(25)}+</div>
            <div className="text-gray-600">Years of Experience</div>
          </div>
        </div>

        <motion.section
          id="intro-section"
          className="mt-24 bg-white p-8 rounded-lg shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div 
              className="md:w-1/2  space-y-4"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-6xl font-bold text-gray-800">Hi,</h2>
              <h2 className="text-6xl font-bold text-gray-800">I'm <span className="text-gray-600">Yassine</span></h2>
              <p className="text-2xl text-gray-600">Legal Consultant</p>
              <a href="#appointment" target="_blank">
              <button className="bg-gray-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition duration-300 flex items-center mt-5">
                Let's work <span className="ml-2">→</span>
              </button></a>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-800 rounded-full"></div>
                <span  className="text-sm text-gray-600">www.legaladvice.com/yassine</span>
              </div>
            </motion.div>
            <motion.div 
              className="md:w-1/2 relative flex justify-start items-center"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1  }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src={images['intro-image']}
                alt="Yassine"
                width={400}
                height={400}
                className="rounded-lg shadow-lg -ml-12"
              />
              {editMode && (
                <label htmlFor="intro-image-upload" className="absolute top-2 right-2 bg-white p-2 rounded-full cursor-pointer">
                  <input
                    id="intro-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, 'intro-image')}
                  />
                  <Edit className="w-5 h-5 text-gray-600" />
                </label>
              )}
              <div className="absolute top-4 right-4 space-y-2">
                <p className="text-sm font-semibold text-gray-600">Expert on</p>
                <p className="text-lg font-bold text-gray-800">Based in New York</p>
                <p className="text-lg text-gray-600">I'm a legal consultant and</p>
                <p className="text-lg text-gray-600">corporate law specialist.</p>
                <p className="text-sm mt-4 text-gray-600">Looking for expert legal advice to</p>
                <p className="text-sm text-gray-600">protect your business interests?</p>
                <p className="text-sm text-gray-600">Let's discuss your case.</p>
              </div>
              <a href="#" className="absolute bottom-4 left-16 bg-white text-gray-800 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300 flex items-center">
                <Download className="w-4 h-4 mr-2" /> Download CV
              </a>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          className="mt-16 bg-blue-900 text-white p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3  className="text-2xl font-bold text-center mb-8">Companies I've Worked With</h3>
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
          className="mt-24 bg-white p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                className="bg-gray-100 p-6 rounded-lg shadow relative"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col items-center mb-4">
                  <experience.icon className="w-12 h-12 text-gray-800 mb-2" />
                  {editMode ? (
                    <input
                      type="text"
                      value={experience.title}
                      onChange={(e) => handleExperienceEdit(index, 'title', e.target.value)}
                      className="text-2xl font-bold text-center text-gray-800 bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-600"
                    />
                  ) : (
                    <h3 className="text-2xl font-bold text-center text-gray-800">{experience.title}</h3>
                  )}
                </div>
                {editMode ? (
                  <textarea
                    value={experience.description}
                    onChange={(e) => handleExperienceEdit(index, 'description', e.target.value)}
                    className="w-full h-32 text-gray-600 bg-transparent border border-gray-300 rounded p-2 focus:outline-none focus:border-gray-600"
                  />
                ) : (
                  <p className="text-gray-600">{experience.description}</p>
                )}
                {editMode && (
                  <button
                    onClick={() => handleExperienceRemove(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                )}
              </motion.div>
            ))}
          </div>
          {editMode && (
            <div className="mt-8 text-center">
              <button
                onClick={handleExperienceAdd}
                className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300"
              >
                <Plus className="w-5 h-5 inline-block mr-2" />
                Add New Experience
              </button>
            </div>
          )}
          <div className="mt-12 text-center">
            <Link href="/about-us" className="bg-gray-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition duration-300">
              Learn More About Our Expertise
            </Link>
          </div>
        </motion.section>

        <motion.section
          id="testimonials"
          ref={testimonialRef}
          className="mt-24 bg-gray-800 text-white p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-center mb-4">Testimonials</h2>
          <h3 className="text-2xl font-semibold text-center mb-12">We care about our customers' experience</h3>
          <div className="relative">
            <div className="flex justify-between gap-8">
              {testimonials.slice(currentTestimonialIndex, currentTestimonialIndex + 3).map((testimonial) => (
                <div key={testimonial.id} className="bg-gray-700 p-6 rounded-lg shadow-lg flex-1 relative">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <Image
                        src={images[`testimonial-${testimonial.id}`]}
                        alt={testimonial.name}
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                      {editMode && (
                        <label htmlFor={`testimonial-${testimonial.id}-upload`} className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer">
                          <input
                            id={`testimonial-${testimonial.id}-upload`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageUpload(e, `testimonial-${testimonial.id}`)}
                          />
                          <Edit className="w-4 h-4 text-gray-600" />
                        </label>
                      )}
                    </div>
                  </div>
                  {editMode ? (
                    <input
                      type="text"
                      value={testimonial.name}
                      onChange={(e) => handleTestimonialEdit(testimonial.id, 'name', e.target.value)}
                      className="text-xl font-semibold text-center w-full bg-transparent border-b border-gray-500 focus:outline-none focus:border-white"
                    />
                  ) : (
                    <h4 className="text-xl font-semibold text-center">{testimonial.name}</h4>
                  )}
                  {editMode ? (
                    <input
                      type="text"
                      value={testimonial.role}
                      onChange={(e) => handleTestimonialEdit(testimonial.id, 'role', e.target.value)}
                      className="text-gray-300 text-center w-full bg-transparent border-b border-gray-500 focus:outline-none focus:border-white mb-4"
                    />
                  ) : (
                    <p className="text-gray-300 text-center mb-4">{testimonial.role}</p>
                  )}
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'} ${editMode ? 'cursor-pointer' : ''}`}
                        onClick={() => editMode && handleTestimonialEdit(testimonial.id, 'rating', i + 1)}
                      />
                    ))}
                  </div>
                  {editMode ? (
                    <textarea
                      value={testimonial.text}
                      onChange={(e) => handleTestimonialEdit(testimonial.id, 'text', e.target.value)}
                      className="w-full h-32 text-center bg-transparent border border-gray-500 rounded p-2 focus:outline-none focus:border-white"
                    />
                  ) : (
                    <p className="text-center">{testimonial.text}</p>
                  )}
                  {editMode && (
                    <button
                      onClick={() => handleTestimonialRemove(testimonial.id)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  )}
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
          className="mt-24 bg-white p-8 rounded-lg shadow-lg"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
          }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Make an Appointment</h2>
          <div className="flex">
            <div className="flex-grow">
              <div className="calendly-inline-widget" data-url="https://calendly.com/carlie4carliejeff50/30min" style={{minWidth: "320px", height: "700px"}}></div>
            </div>
            <div className="ml-8 flex flex-col space-y-4">
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

        {editMode && (
          <div className="mt-8 text-center">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition duration-300 flex items-center mx-auto"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Changes
            </button>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">LegalAdvice</h2>
              <p className="text-xl">Expert legal solutions for impatient clients</p>
            </div>
            <div className="grid grid-cols-2 gap-8">
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