import React from 'react'
import Head from 'next/head'
import FloatingChatButton from './FloatingChatButton'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>LegalAdvice - Expert Legal Solutions</title>
        <meta name="description" content="Expert legal advice for your peace of mind" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300">
        {children}
        <FloatingChatButton />
      </div>
    </>
  )
}

export default Layout