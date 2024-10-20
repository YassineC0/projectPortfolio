import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 text-gray-800">
      <header className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <span className="text-2xl font-bold">LegalAdvice</span>
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
            <Link href="/#testimonials" className="hover:text-gray-300 transition-all duration-300 ease-in-out transform hover:scale-110">
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Twitter className="w-5 h-5 hover:text-gray-300 cursor-pointer" />
            <Facebook className="w-5 h-5 hover:text-gray-300 cursor-pointer" />
            <Instagram className="w-5 h-5 hover:text-gray-300 cursor-pointer" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 pt-24">
        <h1 className="text-4xl font-bold text-center mb-12">About Us</h1>

        <section className="flex flex-col md:flex-row items-center mb-16">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <Image
              src="/gov1.jpg"
              alt="Our Office"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Our History</h2>
            <p className="text-gray-600">
              Founded in 1995, LegalAdvice has been at the forefront of providing expert legal consultation for over two decades. Our journey began with a small team of dedicated lawyers and has grown into a respected firm with a wide range of specialties. We've helped thousands of clients navigate complex legal challenges and achieve their goals.
            </p>
          </div>
        </section>

        <section className="flex flex-col md:flex-row-reverse items-center mb-16">
          <div className="md:w-1/2 md:pl-8 mb-8 md:mb-0">
            <Image
              src="/gov2.jpg"
              alt="Our Team"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Our Team</h2>
            <p className="text-gray-600">
              At LegalAdvice, our strength lies in our diverse and experienced team of legal professionals. Each member brings unique expertise and a commitment to excellence. From corporate law specialists to intellectual property experts, our team is equipped to handle a wide array of legal matters with precision and care.
            </p>
          </div>
        </section>

        <section className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <Image
              src="/gov3.jpg"
              alt="Our Approach"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Our Approach</h2>
            <p className="text-gray-600">
              We believe in a client-centric approach to legal consultation. Our process involves thorough research, strategic planning, and clear communication. We work closely with our clients to understand their unique situations and develop tailored solutions that address their specific legal needs. Our commitment to integrity and excellence guides every aspect of our work.
            </p>
          </div>
        </section>
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