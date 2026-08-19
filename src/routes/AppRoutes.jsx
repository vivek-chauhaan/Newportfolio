import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layout/MainLayout.jsx'
import AdminLayout from '../layout/AdminLayout.jsx'
import PrivateRoute from './PrivateRoute.jsx'

import Home from '../pages/Home.jsx'
import Projects from '../pages/Projects.jsx'
import ProjectDetails from '../pages/ProjectDetails.jsx'
import Blog from '../pages/Blog.jsx'
import BlogDetails from '../pages/BlogDetails.jsx'
import NotFound from '../pages/NotFound.jsx'

import Login from '../admin/pages/Login.jsx'
import Dashboard from '../admin/pages/Dashboard.jsx'
import AboutManage from '../admin/pages/AboutManage.jsx'
import SkillsManage from '../admin/pages/SkillsManage.jsx'
import SkillCategoryManage from '../admin/pages/SkillCategoryManage.jsx'
import ProjectsManage from '../admin/pages/ProjectsManage.jsx'
import ExperienceManage from '../admin/pages/ExperienceManage.jsx'
import EducationManage from '../admin/pages/EducationManage.jsx'
import CertificationsManage from '../admin/pages/CertificationsManage.jsx'
import ReviewsManage from '../admin/pages/ReviewsManage.jsx'
import BlogManage from '../admin/pages/BlogManage.jsx'
import SocialLinksManage from '../admin/pages/SocialLinksManage.jsx'
import ContactMessages from '../admin/pages/ContactMessages.jsx'
import WebsiteSettings from '../admin/pages/WebsiteSettings.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public site */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetails />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
      </Route>

      {/* Admin auth */}
      <Route path="/admin/login" element={<Login />} />

      {/* Admin protected */}
      <Route element={<PrivateRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/about" element={<AboutManage />} />
          <Route path="/admin/skills" element={<SkillsManage />} />
          <Route path="/admin/skill-categories" element={<SkillCategoryManage />} />
          <Route path="/admin/projects" element={<ProjectsManage />} />
          <Route path="/admin/experience" element={<ExperienceManage />} />
          <Route path="/admin/education" element={<EducationManage />} />
          <Route path="/admin/certifications" element={<CertificationsManage />} />
          <Route path="/admin/reviews" element={<ReviewsManage />} />
          <Route path="/admin/blogs" element={<BlogManage />} />
          <Route path="/admin/social-links" element={<SocialLinksManage />} />
          <Route path="/admin/contact-messages" element={<ContactMessages />} />
          <Route path="/admin/settings" element={<WebsiteSettings />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
