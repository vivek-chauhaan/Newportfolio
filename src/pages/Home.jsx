import { Helmet } from 'react-helmet-async'
import Hero from '../components/hero/Hero.jsx'
import QuickStatsSection from './sections/QuickStatsSection.jsx'
import AboutSection from './sections/AboutSection.jsx'
import ServicesSection from './sections/ServicesSection.jsx'
import SkillsSection from './sections/SkillsSection.jsx'
import ProjectsSection from './sections/ProjectsSection.jsx'
import GitHubActivitySection from './sections/GitHubActivitySection.jsx'
import LeetCodeActivitySection from './sections/LeetCodeActivitySection.jsx'
import ExperienceSection from './sections/ExperienceSection.jsx'
import EducationSection from './sections/EducationSection.jsx'
import BlogSection from './sections/BlogSection.jsx'
import ReviewsSection from './sections/ReviewsSection.jsx'
import ContactSection from './sections/ContactSection.jsx'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Java Backend & Full Stack Developer | Portfolio</title>
        <meta
          name="description"
          content="Portfolio of a Java Backend & Full Stack Developer specializing in Spring Boot, REST APIs, Microservices, and React."
        />
      </Helmet>
      <Hero />
      <QuickStatsSection />
      <AboutSection />
      <ServicesSection />
      <SkillsSection />
      <ProjectsSection />
      <GitHubActivitySection />
      <LeetCodeActivitySection />
      <ExperienceSection />
      <EducationSection />
      <BlogSection />
      <ReviewsSection />
      <ContactSection />
    </>
  )
}
