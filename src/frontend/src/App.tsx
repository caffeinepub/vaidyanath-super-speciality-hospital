import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { useMutation } from "@tanstack/react-query";
import {
  Activity,
  AlertCircle,
  Award,
  Brain,
  Building2,
  CheckCircle,
  ChevronRight,
  Clock,
  Dumbbell,
  FlaskConical,
  Heart,
  HeartHandshake,
  Loader2,
  MapPin,
  Menu,
  Phone,
  Pill,
  ScanLine,
  Scissors,
  Shield,
  Star,
  Stethoscope,
  Syringe,
  Truck,
  UserCheck,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

// ─── Scroll-animation hook ───────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.12 },
    );
    const elements = document.querySelectorAll(".fade-in-up, .fade-in");
    for (const el of Array.from(elements)) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
}

// ─── Services data ───────────────────────────────────────────────────────────
const services = [
  {
    icon: Building2,
    name: "Hospital Care",
    desc: "Comprehensive inpatient & outpatient hospital services",
  },
  {
    icon: Truck,
    name: "Ambulance Service",
    desc: "24/7 rapid response ambulance & emergency transport",
  },
  {
    icon: Syringe,
    name: "Anesthesiology",
    desc: "Expert anesthesia care for all surgical procedures",
  },
  {
    icon: Heart,
    name: "Cardiology",
    desc: "Advanced heart care, diagnostics & cardiac procedures",
  },
  {
    icon: AlertCircle,
    name: "Emergency Care",
    desc: "Round-the-clock emergency trauma & critical care",
  },
  {
    icon: Activity,
    name: "Gastroenterology",
    desc: "Diagnosis & treatment of digestive system disorders",
  },
  {
    icon: Stethoscope,
    name: "General Checkups",
    desc: "Preventive health screenings & routine consultations",
  },
  {
    icon: Scissors,
    name: "General Surgery",
    desc: "Skilled surgical team for a wide range of procedures",
  },
  {
    icon: HeartHandshake,
    name: "Hospice Care",
    desc: "Compassionate end-of-life palliative support",
  },
  {
    icon: FlaskConical,
    name: "Laboratory Services",
    desc: "State-of-the-art diagnostics & pathology lab",
  },
  {
    icon: Brain,
    name: "Neurology",
    desc: "Expert care for neurological disorders & brain health",
  },
  {
    icon: UserCheck,
    name: "Nursing Services",
    desc: "Professional nursing care around the clock",
  },
  {
    icon: Pill,
    name: "Pharmacy Services",
    desc: "In-house pharmacy with full medication support",
  },
  {
    icon: Dumbbell,
    name: "Physical Therapy",
    desc: "Rehabilitation & physiotherapy for faster recovery",
  },
  {
    icon: ScanLine,
    name: "X-ray & Radiology",
    desc: "Digital imaging, MRI & CT scan services",
  },
];

// ─── Facilities data ─────────────────────────────────────────────────────────
const facilities = [
  {
    title: "Operation Theatre",
    desc: "State-of-the-art sterile OT with modern surgical equipment",
    gradient: "from-emerald-600 to-teal-700",
    icon: Scissors,
  },
  {
    title: "Doctor's Cabin",
    desc: "Private, well-equipped consultation cabins for expert care",
    gradient: "from-blue-800 to-blue-700",
    icon: Stethoscope,
  },
  {
    title: "Patient Rooms",
    desc: "Comfortable, hygienic patient rooms with modern amenities",
    gradient: "from-cyan-700 to-teal-600",
    icon: Heart,
  },
];

// ─── NavLink ─────────────────────────────────────────────────────────────────
function NavLink({
  href,
  children,
  onClick,
}: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="text-sm font-medium text-foreground/80 hover:text-navy transition-colors duration-200 relative group"
      data-ocid="nav.link"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal group-hover:w-full transition-all duration-300" />
    </a>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  useScrollReveal();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { actor, isFetching } = useActor();

  const appointmentMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      if (!actor) throw new Error("Not connected");
      await actor.submitAppointment(
        data.name,
        data.phone,
        data.date,
        data.message,
      );
    },
    onSuccess: () => {
      setSubmitted(true);
      setFormData({ name: "", phone: "", date: "", message: "" });
      toast.success(
        "Appointment booked successfully! We'll contact you shortly.",
      );
    },
    onError: () => {
      toast.error("Failed to book appointment. Please call us directly.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    appointmentMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen font-sans">
      <Toaster position="top-right" />

      {/* ── Top Utility Bar ── */}
      <div className="bg-navy text-white py-2 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="font-medium hidden sm:block">
            Vaidyanath Super Speciality Hospital
          </span>
          <div className="flex items-center gap-4 ml-auto">
            <a
              href="tel:02402989898"
              className="flex items-center gap-1.5 hover:text-teal transition-colors"
              data-ocid="utility.phone.link"
            >
              <Phone size={12} />
              <span>0240 298 9898</span>
            </a>
            <span className="text-white/30">|</span>
            <div className="flex items-center gap-1.5">
              <MapPin size={12} />
              <span>Chhatrapati Sambhajinagar, MH</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky Header ── */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3">
            <img
              src="/assets/generated/hospital-logo-icon-transparent.dim_200x200.png"
              alt="Vaidyanath Logo"
              className="h-10 w-10 object-contain"
            />
            <div className="leading-tight">
              <div className="text-navy font-extrabold text-base tracking-wide uppercase">
                VAIDYANATH
              </div>
              <div className="text-muted-foreground text-[10px] font-medium tracking-widest uppercase">
                Super Speciality Hospital
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-7">
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#about">About Us</NavLink>
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#facilities">Facilities</NavLink>
            <NavLink href="#appointment">Appointment</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </nav>

          <a
            href="#appointment"
            className="hidden lg:inline-flex items-center gap-2 bg-teal text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
            data-ocid="header.primary_button"
          >
            Book Appointment
            <ChevronRight size={14} />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-md text-navy"
            data-ocid="header.toggle"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileOpen && (
          <div
            className="lg:hidden bg-white border-t border-border px-4 py-4 flex flex-col gap-4"
            data-ocid="nav.panel"
          >
            {(
              [
                ["#home", "Home"],
                ["#about", "About Us"],
                ["#services", "Services"],
                ["#facilities", "Facilities"],
                ["#appointment", "Appointment"],
                ["#contact", "Contact"],
              ] as [string, string][]
            ).map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-foreground hover:text-navy py-1 border-b border-border/40"
                data-ocid="nav.link"
              >
                {label}
              </a>
            ))}
            <a
              href="#appointment"
              className="bg-teal text-white text-center py-2.5 rounded-lg text-sm font-semibold"
              data-ocid="nav.primary_button"
            >
              Book Appointment
            </a>
          </div>
        )}
      </header>

      {/* ── Hero Section ── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          backgroundImage:
            "url('/assets/generated/hospital-hero.dim_1600x900.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/75 to-teal/40" />

        {/* Decorative pattern - aria-hidden via role */}
        <div className="absolute inset-0 opacity-5" role="presentation">
          <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
          >
            <defs>
              <pattern
                id="medcross"
                x="0"
                y="0"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <rect x="25" y="10" width="10" height="40" fill="white" />
                <rect x="10" y="25" width="40" height="10" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#medcross)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-teal/20 border border-teal/40 text-white rounded-full px-4 py-1.5 text-sm font-medium mb-6 fade-in">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              Rated 4.8 by 266+ Patients
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 fade-in-up">
              Advanced Healthcare
              <br />
              <span className="text-teal">with Compassion</span>
            </h1>

            <p
              className="text-white/80 text-lg mb-8 fade-in-up"
              style={{ transitionDelay: "0.15s" }}
            >
              Trusted by 266+ Patients &nbsp;|&nbsp; Rated 4.8 ⭐
            </p>

            <div
              className="flex flex-wrap gap-4 mb-12 fade-in-up"
              style={{ transitionDelay: "0.25s" }}
            >
              <a
                href="#appointment"
                className="inline-flex items-center gap-2 bg-teal text-white px-6 py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg"
                data-ocid="hero.primary_button"
              >
                Book Appointment
                <ChevronRight size={16} />
              </a>
              <a
                href="tel:02402989898"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-white hover:text-navy transition-all"
                data-ocid="hero.secondary_button"
              >
                <Phone size={16} />
                Call Now (0240 298 9898)
              </a>
            </div>

            <div
              className="flex flex-wrap gap-x-6 gap-y-3 fade-in-up"
              style={{ transitionDelay: "0.35s" }}
            >
              {[
                "15+ Specialities",
                "Expert Doctors",
                "Modern Facilities",
                "24/7 Emergency",
              ].map((s) => (
                <div
                  key={s}
                  className="flex items-center gap-2 text-white/90 text-sm"
                >
                  <CheckCircle size={14} className="text-teal" />
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── About Section ── */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in-up">
              <div className="relative rounded-2xl overflow-hidden shadow-card-hover">
                <div className="bg-gradient-to-br from-blue-900 to-cyan-600 p-10 text-white">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-2">Why Choose Us?</h3>
                    <p className="text-white/70 text-sm">
                      Trusted healthcare since establishment
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { value: "15+", label: "Specialities" },
                      { value: "4.8", label: "Patient Rating" },
                      { value: "266+", label: "Happy Patients" },
                      { value: "24/7", label: "Emergency Care" },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-white/10 rounded-xl p-4 text-center"
                      >
                        <div className="text-3xl font-extrabold text-cyan-300">
                          {stat.value}
                        </div>
                        <div className="text-white/80 text-sm mt-1">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="fade-in-up" style={{ transitionDelay: "0.15s" }}>
              <span className="text-teal font-semibold text-sm uppercase tracking-widest">
                About Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-3 mb-5 leading-tight">
                About Vaidyanath Super Speciality Hospital
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Vaidyanath Super Speciality Hospital is a trusted healthcare
                center in Chhatrapati Sambhajinagar, providing advanced medical
                treatments with expert doctors and modern facilities. Our
                commitment to patient-centered care ensures every individual
                receives the best possible treatment with compassion and
                dignity.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {[
                  {
                    icon: Award,
                    title: "Expert Doctors",
                    desc: "Qualified specialists in every field",
                  },
                  {
                    icon: Shield,
                    title: "Modern Equipment",
                    desc: "State-of-the-art medical technology",
                  },
                  {
                    icon: Clock,
                    title: "24/7 Care",
                    desc: "Round-the-clock emergency services",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="bg-teal-light rounded-xl p-4 text-center"
                  >
                    <div className="w-10 h-10 bg-teal/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <item.icon size={18} className="text-teal" />
                    </div>
                    <div className="font-semibold text-sm text-foreground">
                      {item.title}
                    </div>
                    <div className="text-muted-foreground text-xs mt-1">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="#services"
                className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
                data-ocid="about.primary_button"
              >
                Explore Services
                <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Section ── */}
      <section id="services" className="py-20 bg-teal-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 fade-in-up">
            <span className="text-teal font-semibold text-sm uppercase tracking-widest">
              What We Offer
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-3">
              Our Medical Services
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Comprehensive healthcare across 15+ specialities with expert
              doctors and cutting-edge technology.
            </p>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="services.list"
          >
            {services.map((svc, i) => (
              <div
                key={svc.name}
                className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 fade-in-up group"
                style={{ transitionDelay: `${(i % 6) * 0.07}s` }}
                data-ocid={`services.item.${i + 1}`}
              >
                <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center mb-4 group-hover:bg-teal/20 transition-colors">
                  <svc.icon size={22} className="text-teal" />
                </div>
                <h3 className="font-bold text-foreground mb-1">{svc.name}</h3>
                <p className="text-muted-foreground text-sm">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Facilities ── */}
      <section id="facilities" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 fade-in-up">
            <span className="text-teal font-semibold text-sm uppercase tracking-widest">
              World-Class Infrastructure
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-3">
              Our Facilities
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Modern, well-equipped facilities designed to ensure the highest
              standard of patient care.
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            data-ocid="facilities.list"
          >
            {facilities.map((fac, i) => (
              <div
                key={fac.title}
                className={`bg-gradient-to-br ${fac.gradient} rounded-2xl p-8 text-white shadow-card-hover fade-in-up`}
                style={{ transitionDelay: `${i * 0.12}s` }}
                data-ocid={`facilities.item.${i + 1}`}
              >
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-5">
                  <fac.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{fac.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  {fac.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Appointment Form ── */}
      <section
        id="appointment"
        className="py-20 bg-gradient-to-br from-blue-900 to-cyan-600"
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div
            className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 fade-in-up"
            data-ocid="appointment.card"
          >
            {submitted ? (
              <div
                className="text-center py-8"
                data-ocid="appointment.success_state"
              >
                <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-teal" />
                </div>
                <h3 className="text-2xl font-extrabold text-foreground mb-2">
                  Appointment Booked!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Thank you! Our team will contact you shortly to confirm your
                  appointment.
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  className="bg-teal text-white hover:opacity-90"
                  data-ocid="appointment.secondary_button"
                >
                  Book Another
                </Button>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <span className="text-teal font-semibold text-sm uppercase tracking-widest">
                    Get in Touch
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mt-2">
                    Book an Appointment
                  </h2>
                  <p className="text-muted-foreground text-sm mt-2">
                    Fill in your details and we'll get back to you promptly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label
                      htmlFor="appt-name"
                      className="text-sm font-medium text-foreground mb-1.5 block"
                    >
                      Full Name *
                    </Label>
                    <Input
                      id="appt-name"
                      type="text"
                      placeholder="Your full name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, name: e.target.value }))
                      }
                      data-ocid="appointment.input"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="appt-phone"
                      className="text-sm font-medium text-foreground mb-1.5 block"
                    >
                      Phone Number *
                    </Label>
                    <Input
                      id="appt-phone"
                      type="tel"
                      placeholder="Your phone number"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, phone: e.target.value }))
                      }
                      data-ocid="appointment.input"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="appt-date"
                      className="text-sm font-medium text-foreground mb-1.5 block"
                    >
                      Preferred Date *
                    </Label>
                    <Input
                      id="appt-date"
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, date: e.target.value }))
                      }
                      data-ocid="appointment.input"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="appt-message"
                      className="text-sm font-medium text-foreground mb-1.5 block"
                    >
                      Message / Symptoms
                    </Label>
                    <Textarea
                      id="appt-message"
                      placeholder="Briefly describe your symptoms or reason for visit..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, message: e.target.value }))
                      }
                      data-ocid="appointment.textarea"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={appointmentMutation.isPending || isFetching}
                    className="w-full bg-teal text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity text-base"
                    data-ocid="appointment.submit_button"
                  >
                    {appointmentMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Booking...
                      </>
                    ) : (
                      "Book Appointment"
                    )}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── Contact Section ── */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 fade-in-up">
            <span className="text-teal font-semibold text-sm uppercase tracking-widest">
              Get in Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-3">
              Contact Us
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="fade-in-up space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-teal/10 rounded-full flex-shrink-0 flex items-center justify-center">
                  <MapPin size={20} className="text-teal" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Address
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Plot No. 315, near Vasantrao Naik Chowk, Kamgar Chowk,
                    <br />N 3, CIDCO, Chhatrapati Sambhajinagar,
                    <br />
                    Maharashtra 431003
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-teal/10 rounded-full flex-shrink-0 flex items-center justify-center">
                  <Phone size={20} className="text-teal" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                  <a
                    href="tel:02402989898"
                    className="text-navy font-medium text-sm hover:text-teal transition-colors"
                    data-ocid="contact.link"
                  >
                    0240 298 9898
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-teal/10 rounded-full flex-shrink-0 flex items-center justify-center">
                  <Clock size={20} className="text-teal" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Working Hours
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Mon–Sat: 8:00 AM – 8:00 PM
                    <br />
                    <span className="text-teal font-medium">
                      24/7 Emergency Services
                    </span>
                  </p>
                </div>
              </div>

              <div className="bg-teal-light rounded-xl p-5">
                <p className="text-sm font-semibold text-navy mb-1">
                  🚨 Emergency?
                </p>
                <p className="text-muted-foreground text-sm mb-3">
                  Our emergency department is open 24 hours a day, 7 days a
                  week.
                </p>
                <a
                  href="tel:02402989898"
                  className="inline-flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                  data-ocid="contact.primary_button"
                >
                  <Phone size={14} />
                  Call Emergency: 0240 298 9898
                </a>
              </div>
            </div>

            <div
              className="fade-in-up rounded-2xl overflow-hidden shadow-card-hover border border-border"
              style={{ transitionDelay: "0.15s" }}
              data-ocid="contact.map_marker"
            >
              <iframe
                title="Vaidyanath Hospital Location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=75.2800%2C19.8500%2C75.3600%2C19.9100&layer=mapnik&marker=19.8800%2C75.3200"
                width="100%"
                height="380"
                style={{ border: "none", display: "block" }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-teal rounded-full flex items-center justify-center">
                  <Heart size={18} className="text-white" />
                </div>
                <div>
                  <div className="font-extrabold text-sm tracking-wide uppercase">
                    VAIDYANATH
                  </div>
                  <div className="text-white/60 text-[10px] uppercase tracking-widest">
                    Super Speciality Hospital
                  </div>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                Providing advanced medical treatments with compassion and care
                in Chhatrapati Sambhajinagar, Maharashtra.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-5">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {(
                  [
                    ["#home", "Home"],
                    ["#about", "About Us"],
                    ["#services", "Services"],
                    ["#facilities", "Facilities"],
                    ["#appointment", "Book Appointment"],
                    ["#contact", "Contact"],
                  ] as [string, string][]
                ).map(([href, label]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-white/70 text-sm hover:text-teal transition-colors flex items-center gap-1.5"
                      data-ocid="footer.link"
                    >
                      <ChevronRight size={12} />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-5">
                Contact Info
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2.5 text-white/70 text-sm">
                  <MapPin
                    size={14}
                    className="text-teal mt-0.5 flex-shrink-0"
                  />
                  <span>
                    Plot No. 315, near Vasantrao Naik Chowk, Kamgar Chowk, N 3,
                    CIDCO, Chhatrapati Sambhajinagar, MH 431003
                  </span>
                </div>
                <a
                  href="tel:02402989898"
                  className="flex items-center gap-2.5 text-white/70 hover:text-teal text-sm transition-colors"
                  data-ocid="footer.link"
                >
                  <Phone size={14} className="text-teal flex-shrink-0" />
                  0240 298 9898
                </a>
                <div className="flex items-center gap-2.5 text-white/70 text-sm">
                  <Clock size={14} className="text-teal flex-shrink-0" />
                  <span>Mon–Sat: 8 AM–8 PM | 24/7 Emergency</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Vaidyanath Super Speciality Hospital.
              All Rights Reserved.
            </p>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Heart size={12} className="text-teal fill-teal" />
              Caring for your health, every day
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
