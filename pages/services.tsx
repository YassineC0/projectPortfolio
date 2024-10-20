import React from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { Twitter as TwitterIcon, Facebook as FacebookIcon, Instagram as InstagramIcon } from 'lucide-react'

const services = [
  {
    title: "Corporate Law",
    description: "Expert guidance on mergers, acquisitions, and corporate governance.",
    icon: "👔",
  },
  {
    title: "Intellectual Property",
    description: "Protect your ideas and innovations with our IP specialists.",
    icon: "💡",
  },
  {
    title: "Litigation",
    description: "Skilled representation in court for all types of legal disputes.",
    icon: "⚖️",
  },
  {
    title: "Real Estate Law",
    description: "Navigate property transactions and disputes with our expert advice.",
    icon: "🏠",
  },
  {
    title: "Employment Law",
    description: "Ensure compliance and resolve workplace issues effectively.",
    icon: "👥",
  },
  {
    title: "Tax Law",
    description: "Optimize your tax strategy and ensure compliance with regulations.",
    icon: "📊",
  },
]

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300">
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
            <button onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-gray-300 transition-all duration-300 ease-in-out transform hover:scale-110">
              Testimonials
            </button>
          </nav>
          <div className="flex items-center space-x-4">
            <TwitterIcon className="w-5 h-5 hover:text-gray-300 cursor-pointer" />
            <FacebookIcon className="w-5 h-5 hover:text-gray-300 cursor-pointer" />
            <InstagramIcon className="w-5 h-5 hover:text-gray-300 cursor-pointer" />
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h2 className="text-xl font-bold mb-2">{service.title}</h2>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/#appointment" className="bg-gray-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition duration-300">
            Get a Consultation
          </Link>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">LegalAdvice</h2>
              <p className="text-xl">Expert legal solutions for your peace of mind</p>
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
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Stay Connected</h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-300 hover:text-white"><FacebookIcon /></Link>
                <Link href="#" className="text-gray-300 hover:text-white"><TwitterIcon /></Link>
                <Link href="#" className="text-gray-300 hover:text-white"><InstagramIcon /></Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}