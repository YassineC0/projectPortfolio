import React from 'react'
import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const FloatingChatButton: React.FC = () => {
  const scrollToAppointment = () => {
    const appointmentSection = document.getElementById('appointment')
    if (appointmentSection) {
      appointmentSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.button
      className="fixed bottom-8 left-8 bg-gray-800 text-white p-4 rounded-full shadow-lg z-50"
      onClick={scrollToAppointment}
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      <MessageCircle className="w-6 h-6" />
    </motion.button>
  )
}

export default FloatingChatButton