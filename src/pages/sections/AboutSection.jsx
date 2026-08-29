import { motion } from "framer-motion";
import {
  FiDownload,
  FiCheckCircle,
  FiUser,
  FiMapPin,
  FiBriefcase,
  FiLayers,
  FiCode,
  FiAward,
} from "react-icons/fi";
import SectionTitle from "../../components/common/SectionTitle.jsx";
import PrimaryButton from "../../components/buttons/PrimaryButton.jsx";
import useFetch from "../../hooks/useFetch.js";
import aboutService from "../../services/aboutService.js";
import Loader from "../../components/common/Loader.jsx";

function formatBoldText(text) {
  if (!text) return null;

  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-slate-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return part;
  });
}

export default function AboutSection() {
  const { data: about, loading } = useFetch(() => aboutService.get(), []);

  if (loading) return <Loader />;

  const qualities = [
    "Problem Solver",
    "Clean Code Advocate",
    "Fast Learner",
    "Team Player",
    "API Development",
    "Continuous Learner",
  ];

  const profileDetails = [
    {
      label: "Name",
      value: about?.fullName || "Vivek Chauhan",
      icon: FiUser,
    },
    {
      label: "Role",
      value: about?.designation || "Full Stack MERN Developer",
      icon: FiCode,
    },
    {
      label: "Location",
      value: about?.address || "India",
      icon: FiMapPin,
    },
    {
      label: "Experience",
      value: about?.yearsOfExperience
        ? `${about.yearsOfExperience}+ Years`
        : "2+ Years",
      icon: FiBriefcase,
    },
    {
      label: "Availability",
      value: "Open to Opportunities",
      icon: FiAward,
    },
    {
      label: "Primary Stack",
      value: "React, Node.js, MongoDB",
      icon: FiLayers,
    },
  ];

  return (
    <section id="about" className="max-w-7xl mx-auto px-5 md:px-8 py-24">
      <SectionTitle
        eyebrow="About Me"
        title="Building Modern & Scalable Web Applications"
      />

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Developer Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 p-8 rounded-3xl bg-white/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xl space-y-6"
        >
          {/* Profile Photo */}
          <div className="relative w-36 h-36 mx-auto rounded-full overflow-hidden p-1 bg-gradient-to-tr from-primary via-purple-500 to-secondary shadow-lg">
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-900">
              {about?.photoUrl ? (
                <img
                  src={about.photoUrl}
                  alt={about.fullName || "Vivek Chauhan"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900 to-slate-950 text-white font-display text-4xl font-bold">
                  {about?.fullName?.[0] || "V"}
                </div>
              )}
            </div>
          </div>

          <div className="text-center">
            <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white">
              {about?.fullName || "Vivek Chauhan"}
            </h3>

            <p className="text-xs font-semibold text-primary dark:text-primary-light mt-1">
              {about?.designation || "Full Stack MERN Developer"}
            </p>
          </div>

          {/* Profile Quick Table */}
          <div className="space-y-3 pt-4 border-t border-slate-200/70 dark:border-white/10">
            {profileDetails.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 dark:border-white/[0.05]"
                >
                  <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                    <Icon className="text-primary" />
                    {item.label}:
                  </span>

                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-right">
                    {item.value}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Column: Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-7 space-y-6"
        >
          <h3 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white leading-tight">
            Full Stack Developer Focused on Building Scalable Web Experiences
          </h3>

          <div className="space-y-4 text-slate-600 dark:text-slate-300 text-base leading-relaxed font-normal">
            {about?.description ? (
              <p className="whitespace-pre-line">
                {formatBoldText(about.description)}
              </p>
            ) : (
              <>
                <p>
                  I am a passionate{" "}
                  <strong className="font-bold text-slate-900 dark:text-white">
                    Full Stack MERN Developer
                  </strong>{" "}
                  with 2+ years of hands-on experience building modern,
                  responsive, and scalable web applications using{" "}
                  <strong className="font-bold text-slate-900 dark:text-white">
                    React.js, Node.js, Express.js, and MongoDB
                  </strong>
                  .
                </p>

                <p>
                  I specialize in developing interactive frontend experiences
                  with{" "}
                  <strong className="font-bold text-slate-900 dark:text-white">
                    React.js and JavaScript
                  </strong>
                  , while building secure and scalable backend services using{" "}
                  <strong className="font-bold text-slate-900 dark:text-white">
                    Node.js, Express.js, REST APIs, and JWT authentication
                  </strong>
                  .
                </p>

                <p>
                  I enjoy solving real-world problems, optimizing application
                  performance, designing clean APIs, and creating maintainable
                  code. I also have hands-on exposure to{" "}
                  <strong className="font-bold text-slate-900 dark:text-white">
                    Python and AI technologies
                  </strong>
                  , and continuously explore new tools and technologies to
                  improve my development workflow.
                </p>
              </>
            )}
          </div>

          {/* Personal Qualities */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Core Developer Mindset
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {qualities.map((q) => (
                <div
                  key={q}
                  className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-sm"
                >
                  <FiCheckCircle className="text-emerald-500 shrink-0 text-base" />
                  <span>{q}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Resume */}
          {about?.resumeUrl && (
            <div className="pt-2">
              <a href={about.resumeUrl} target="_blank" rel="noreferrer">
                <PrimaryButton icon={FiDownload}>
                  Download Full Resume
                </PrimaryButton>
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
