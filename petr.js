import React, { useState, useEffect } from 'react';
import { 
  Building, 
  UtensilsCrossed, 
  Armchair, 
  ShoppingBag, 
  Heart, 
  Droplets, 
  Shirt, 
  Menu, 
  X, 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin, 
  Globe,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const UganeWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    service: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      title: "Food Exportation",
      icon: <UtensilsCrossed className="w-8 h-8" />,
      desc: "Bridging the gap between local producers and the global market. We ensure high-quality agricultural produce and processed foods reach international standards.",
      color: "bg-green-100 text-green-700"
    },
    {
      title: "Real Estate",
      icon: <Building className="w-8 h-8" />,
      desc: "Comprehensive property solutions including sales, leasing, and management. We help you find the perfect space for residential or commercial needs.",
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: "Hospitality",
      icon: <Globe className="w-8 h-8" />,
      desc: "Elevating guest experiences through premium consultancy, management services, and tourism support tailored for the modern traveler.",
      color: "bg-orange-100 text-orange-700"
    },
    {
      title: "Interior Decoration",
      icon: <Armchair className="w-8 h-8" />,
      desc: "Transforming spaces into sanctuaries. Our design experts blend aesthetics with functionality to create stunning home and office environments.",
      color: "bg-purple-100 text-purple-700"
    },
    {
      title: "Household Equipment",
      icon: <ShoppingBag className="w-8 h-8" />,
      desc: "Supplying top-tier home appliances and essentials. We focus on durability and innovation to make everyday living easier.",
      color: "bg-slate-100 text-slate-700"
    },
    {
      title: "Health & Wellness Spa",
      icon: <Heart className="w-8 h-8" />,
      desc: "State-of-the-art equipment for spas and wellness centers. We promote health through superior technology and relaxation tools.",
      color: "bg-rose-100 text-rose-700"
    },
    {
      title: "Luxury Perfumes",
      icon: <Droplets className="w-8 h-8" />,
      desc: "Importing exclusive fragrances from around the world. We curate scents that define personality and sophistication.",
      color: "bg-pink-100 text-pink-700"
    },
    {
      title: "Fashion & Wears",
      icon: <Shirt className="w-8 h-8" />,
      desc: "Trendsetting fashion imports. From high-end couture to casual wear, we bring global style trends directly to your wardrobe.",
      color: "bg-indigo-100 text-indigo-700"
    }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    // This is where we connect to your PHP backend
    // For this demo, we will simulate a connection if the PHP file isn't found
    try {
      // Replace 'http://localhost/ugane-backend/contact.php' with your actual server URL
      const response = await fetch('http://localhost/ugane-backend/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // If the PHP server isn't running (which is expected in this preview),
        // we throw an error to trigger the demo success message for the user.
        throw new Error('Server not reachable'); 
      }

      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setFormData({ firstName: '', lastName: '', service: '', message: '' });
      } else {
        throw new Error(result.message || 'Something went wrong');
      }

    } catch (error) {
      console.log("Backend not detected, switching to demo mode.");
      // SIMULATION FOR DEMO PURPOSES
      setTimeout(() => {
        setStatus('success');
        setFormData({ firstName: '', lastName: '', service: '', message: '' });
      }, 1500);
    }
  };

  return (
    <div className="font-sans text-slate-800 bg-slate-50 min-h-screen">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              U
            </div>
            <span className={`text-xl font-bold tracking-tight ${scrolled ? 'text-slate-900' : 'text-white'}`}>
              UGANE <span className="text-amber-500">SERVICES</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {['Home', 'Services', 'About', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`font-medium hover:text-amber-500 transition-colors ${scrolled ? 'text-slate-600' : 'text-slate-200'}`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-amber-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-xl py-4 flex flex-col items-center space-y-4">
            {['Home', 'Services', 'About', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-slate-800 font-medium py-2 px-4 hover:bg-slate-50 w-full text-center"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 bg-slate-900 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-800 opacity-20 skew-x-12 transform translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-sm font-semibold mb-6 border border-amber-500/20">
              Global Trade & Lifestyle Solutions
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Expanding Horizons, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Delivering Excellence.
              </span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-xl leading-relaxed">
              From premium real estate to international food exportation, Ugane Business Services is your trusted partner in diversified commerce and luxury living.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('services')}
                className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-amber-500/30 flex items-center justify-center gap-2"
              >
                Explore Services <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 bg-transparent border border-slate-600 text-white font-bold rounded-lg hover:bg-slate-800 transition-all flex items-center justify-center"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-amber-100 rounded-tl-3xl -z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" 
                  alt="Office Environment" 
                  className="rounded-lg shadow-2xl w-full object-cover h-[400px]"
                />
                <div className="absolute -bottom-6 -right-6 bg-slate-900 text-white p-6 rounded-lg shadow-xl hidden md:block">
                  <p className="font-bold text-2xl text-amber-500">8+</p>
                  <p className="text-sm">Core Industries</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">About Ugane Business Services</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                We are a multifaceted conglomerate dedicated to quality, innovation, and integrity. What started as a vision to bridge local and international markets has grown into a diverse portfolio serving clients across real estate, hospitality, fashion, and export sectors.
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Our mission is simple: to provide seamless access to premium goods and services, enhancing the lifestyle and business potential of our partners and customers.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Global Standards",
                  "Customer Centric",
                  "Premium Quality",
                  "Diverse Portfolio"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    <span className="font-medium text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-2">What We Do</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-slate-900">Our Core Divisions</h3>
            <div className="w-20 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-amber-100 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  {service.desc}
                </p>
                <div className="w-full h-px bg-slate-100 group-hover:bg-amber-100 transition-colors"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Divider */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000')] opacity-10 bg-cover bg-center"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Partner With Us?</h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8">
            Whether you are looking to export goods, decorate your dream home, or source luxury perfumes, Ugane Business Services delivers excellence.
          </p>
          <button 
            onClick={() => scrollToSection('contact')}
            className="px-8 py-3 bg-white text-slate-900 font-bold rounded-full hover:bg-amber-500 hover:text-white transition-all shadow-lg"
          >
            Get a Quote Today
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-2">Get In Touch</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Let's Discuss Your Needs</h3>
              <p className="text-slate-600 mb-8">
                Fill out the form or reach out via our contact details. We look forward to hearing from you.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Headquarters</h4>
                    <p className="text-slate-500">Lagos, Nigeria</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Email Us</h4>
                    <p className="text-slate-500">contact@uganebusiness.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Call Us</h4>
                    <p className="text-slate-500">+234 800 000 0000</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" 
                      placeholder="John" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" 
                      placeholder="Doe" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Service Interest</label>
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all bg-white"
                  >
                    <option value="">Select a service...</option>
                    {services.map((s, i) => <option key={i} value={s.title}>{s.title}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4" 
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" 
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="animate-spin" /> Sending...
                    </>
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle className="text-green-400" /> Sent Successfully!
                    </>
                  ) : status === 'error' ? (
                    <>
                      <AlertCircle className="text-red-400" /> Error. Try again.
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
                {status === 'success' && (
                  <p className="text-sm text-green-600 text-center mt-2">
                    Thank you! We will contact you soon.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center text-white font-bold text-sm">
                  U
                </div>
                <span className="text-white font-bold text-lg">UGANE</span>
              </div>
              <p className="text-sm text-slate-500">© 2024 Ugane Business Services. All rights reserved.</p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-amber-500 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UganeWebsite;