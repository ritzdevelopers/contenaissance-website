
"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Globe, Mail, Phone, Instagram, Linkedin, Youtube, Facebook, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface ContactProps {
  isDarkMode: boolean;
  isFullPage?: boolean;
}

// Custom X Logo Component (Twitter/X official logo)
const XLogo: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = "" }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
};
// Live connection to CT Leads Google Sheet
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycby8DOgFwRAa65kLZaBohncDPmIrzPvOP2mf3-Row9835UrUl6QknU_NoOANwivOpps9/exec";

const Contact: React.FC<ContactProps> = ({ isDarkMode, isFullPage = false }) => {
  const [focused, setFocused] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    subject: '',
    message: ''
  });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({ ...prev, [name]: value }));
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "contactNumber") {
      // Allow only digits (0-9)
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        contactNumber: '',
        subject: '',
        message: ''
      });

      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      Icon: Instagram,
      link: "https://www.instagram.com/contenaissance/",
      name: "Instagram",
      iconColor: "text-white/90 ",
      bgColor: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 hover:border-pink-400/60 hover:shadow-pink-500/30"
    },
    {
      Icon: Linkedin,
      link: "https://www.linkedin.com/company/108385521/",
      name: "LinkedIn",
      iconColor: "text-white/90",
      bgColor: "hover:bg-blue-600 hover:border-blue-400/60 hover:shadow-blue-500/30"
    },
    {
      Icon: Youtube,
      link: "https://www.youtube.com/@Contenaissance",
      name: "YouTube",
      iconColor: "text-white/90 ",
      bgColor: "hover:bg-red-600 hover:border-red-400/60 hover:shadow-red-500/30"
    },
    {
      Icon: XLogo,
      link: "https://x.com/contenaissance",
      name: "X (Twitter)",
      iconColor: "text-white/90",
      bgColor: "hover:bg-zinc-900 hover:border-white/60 hover:shadow-white/30 "
    },
    {
      Icon: Facebook,
      link: "https://www.facebook.com/profile.php?id=61579738437856",
      name: "Facebook",
      iconColor: "text-white/90 ",
      bgColor: "hover:bg-blue-600 hover:border-blue-400/60 hover:shadow-blue-500/30"
    }
  ];

  return (
    <section className="contact-section absolute top-0 left-0 w-full min-h-screen px-5 md:px-16 pt-28 md:pt-38 pb-5 md:pb-8  md bg-zinc-950">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-x-8 md:gap-x-16 lg:gap-x-24 gap-y-12 md:gap-y-20 items-start">

        <div className="flex flex-col h-full items-center lg:items-start">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-8 md:mb-16 text-white leading-[0.9] text-center lg:text-left"
          >
            Let's create the <br /> <span className="font-serif-brand italic font-normal">Next Wave.</span>
          </motion.h2>

          <div className="space-y-12 mb-auto">
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center border border-zinc-800 bg-zinc-900/50 group-hover:border-white/20 transition-all">
                <Mail size={22} className="text-white" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-1 text-white/40">Email Studio</p>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-medium text-white tracking-tight break-words">info@ritzmediaworld.com</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center border border-zinc-800 bg-zinc-900/50 group-hover:border-white/20 transition-all">
                <Phone size={22} className="text-white" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-1 text-white/40">Phone / Whatsapp</p>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-medium text-white tracking-tight">+91-9220516777</p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center border border-zinc-800 bg-zinc-900/50 group-hover:border-white/20 transition-all mt-1">
                <Globe size={22} className="text-white" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-1 text-white/40">Our Base</p>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-medium text-white leading-tight tracking-tight">
                  Unit No. 404, 4Th Floor,<br />
                  Corporate Park, Tower A1<br />
                  Sector 142, Noida, Uttar Pradesh, India
                </p>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center flex-wrap gap-3 mt-20 lg:mt-16">
            <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-white/80 mb-2 md:mb-0">Connect</p>
            {socialLinks.map((social, idx) => (
              <motion.a
                key={idx}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className={`group w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center transition-all duration-300 bg-zinc-900/70 hover:shadow-lg hover:shadow-blue-500/30 ${social.bgColor}`}
                aria-label={social.name}
              >
                {social.name === "X (Twitter)" ? (
                  <social.Icon size={24} className={social.iconColor} />
                ) : (
                  <social.Icon size={24} className={social.iconColor} strokeWidth={1.5} />
                )}
              </motion.a>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-full mx-auto lg:mx-0 bg-zinc-900/30 backdrop-blur-sm border border-white/5 rounded-2xl md:rounded-3xl p-6 sm:p-12 md:p-12 lg:pl-12 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10 md:space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
              <div className="relative">
                <label htmlFor="fullName" className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4 block text-white">Full Name</label>
                <input
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  type="text"
                  className={`w-full bg-zinc-900/50 border-2 rounded-xl outline-none px-5 py-3 transition-all text-white text-base md:text-md placeholder:text-white/30 ${focused === 'name' ? 'border-[#52410c] shadow-lg shadow-[#52410c45]' : 'border-zinc-700/50'}`}
                  placeholder="Enter your Name"
                />
              </div>
              <div className="relative">
                <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block text-white">Email Address</label>
                <input
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  type="email"
                  className={`w-full bg-zinc-900/50 border-2 rounded-xl outline-none px-5 py-3 transition-all text-white text-base md:text-md placeholder:text-white/30 ${focused === 'email' ? 'border-[#52410c] shadow-lg shadow-[#52410c45]' : 'border-zinc-700/50'}`}
                  placeholder="Enter Your Email"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
              <div className="relative">
                <label htmlFor="contactNumber" className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block text-white">Contact Number</label>
                <input
                  required
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  onFocus={() => setFocused('phone')}
                  onBlur={() => setFocused(null)}
                  maxLength={14}
                  pattern="[0-9]{10}"
                  type="tel"
                  className={`w-full bg-zinc-900/50 border-2 rounded-xl outline-none px-5 py-3 transition-all text-white text-base md:text-md placeholder:text-white/30 ${focused === 'phone' ? 'border-[#52410c] shadow-lg shadow-[#52410c45]' : 'border-zinc-700/50'}`}
                  placeholder="Enter Your Number"
                />
              </div>
              <div className="relative">
                <label htmlFor="subject" className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block text-white">Service Interest</label>
                <input
                  required
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocused('subject')}
                  onBlur={() => setFocused(null)}
                  type="text"
                  className={`w-full bg-zinc-900/50 border-2 rounded-xl outline-none px-5 py-3 transition-all text-white text-base md:text-md placeholder:text-white/30 ${focused === 'subject' ? 'border-[#52410c] shadow-lg shadow-[#52410c45]' : 'border-zinc-700/50'}`}
                  placeholder="e.g. AI Brand Film..."
                />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block text-white">Enquiry Message</label>
              <textarea
                required
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocused('msg')}
                onBlur={() => setFocused(null)}
                rows={4}
                className={`w-full bg-zinc-900/50 border-2 rounded-xl outline-none px-5 py-3 transition-all resize-none text-white text-base md:text-md leading-relaxed placeholder:text-white/30 ${focused === 'msg' ? 'border-[#52410c] shadow-lg shadow-blur shadow-[#52410c]' : 'border-zinc-700/50'}`}
                placeholder="Tell us about your brand vision..."
              />
            </div>

            <div className="">
              <AnimatePresence mode="wait">
                {submitStatus === 'success' ? (
                  // <motion.div
                  //   initial={{ opacity: 0, y: 10 }}
                  //   animate={{ opacity: 1, y: 0 }}
                  //   exit={{ opacity: 0 }}
                  //   className="flex items-center justify-center gap-3 py-6 bg-emerald-500/20 border-2 border-emerald-500/40 rounded-full text-emerald-300 font-bold uppercase tracking-[0.2em] text-[11px] shadow-lg shadow-emerald-500/20"
                  // >
                  //   <CheckCircle2 size={20} /> Enquiry Logged Successfully
                  // </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="
                              flex items-center justify-center
                              gap-2 sm:gap-3 md:gap-4
                              py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8
                              bg-emerald-500/20 border-2 border-emerald-500/40
                              rounded-full
                              text-emerald-300 font-bold uppercase
                              tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em]
                              text-[10px] sm:text-[11px] md:text-[13px]
                              shadow-lg shadow-emerald-500/20
                              transition-all duration-300
                              "
                  >
                    <CheckCircle2 size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    Enquiry Logged Successfully
                  </motion.div>

                ) : submitStatus === 'error' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-3 py-6 bg-red-500/20 border-2 border-red-500/40 rounded-full text-red-300 font-bold uppercase tracking-[0.2em] text-[11px] shadow-lg shadow-red-500/20"
                  >
                    <AlertCircle size={20} /> Error Sending Inquiry. Please try again.
                  </motion.div>
                ) : (
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{
                      scale: 1.02, boxShadow: "0px 15px 40px rgba(94, 73, 37, 0.6)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-[1.1rem] rounded-full font-bold uppercase tracking-[0.15em] text-[10px] md:text-[11px] flex items-center justify-center gap-3 transition-all bg-[#ab8922] text-white  shadow-[0_10px_30px_rgba(171,137,34,0.35)]  border-2 border-[#ab89224d] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>Processing <Loader2 size={20} className="animate-spin" /></>
                    ) : (
                      <>Dispatch Enquiry <Send size={18} strokeWidth={2} /></>
                    )}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </form>
        </motion.div>

        {/* Mobile/Tablet Connect below the form; hidden on desktop */}
        <div className="block md:block lg:hidden col-span-1 px-2">
          <div className="flex items-center justify-center flex-wrap gap-3 md:gap-6 mt-0 md:mt-10">
            <p className="w-full text-center text-[11px] uppercase tracking-[0.4em] font-bold text-white/80">Connect</p>
            {socialLinks.map((social, idx) => (
              <motion.a
                key={`m-${idx}`}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className={`group w-12 md:w-14 h-12 md:h-14 rounded-full border-2 border-white/30 flex items-center justify-center transition-all duration-300 bg-zinc-900/70 hover:shadow-lg ${social.bgColor}`}
                aria-label={social.name}
              >
                {social.name === "X (Twitter)" ? (
                  <social.Icon size={22} className={social.iconColor} />
                ) : (
                  <social.Icon size={22} className={social.iconColor} strokeWidth={1.5} />
                )}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="absolute top-1/3 right-0 w-[200px] sm:w-[320px] md:w-[520px] h-[200px] sm:h-[320px] md:h-[520px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      </div>
    </section>
  );
};

export default Contact;
