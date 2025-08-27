import CustomerAIChat from '@/components/CustomerAIChat'
import Hero from '@/sections/Hero'
import OurAwards from '@/sections/OurAwards'
import Services from '@/sections/Services'
import Welcome from '@/sections/Welcome'
import WhereWeSendEmployees from '@/sections/WhereWeSendEmployees'
import WhyChooseUs from '@/sections/WhyChooseUs'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Hero />
      <Welcome />
      <Services />
      <WhereWeSendEmployees />
      <WhyChooseUs />
      <OurAwards/>
      <CustomerAIChat/>
    </div>
  )
}

export default Home
