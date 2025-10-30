import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import LINKS from "../config/links";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" } }),
};

export default function Contact() {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState({ sending: false, sent: false, error: "" });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ sending: true, sent: false, error: "" });
    try {
      // Placeholder submit: open mail client with prefilled content
      const mailto = `mailto:support@tic-miton.com?subject=${encodeURIComponent(form.subject || "Contact TIC Miton")}&body=${encodeURIComponent(
        `Nom: ${form.name}\nEmail: ${form.email}\nTéléphone: ${form.phone}\n\nMessage:\n${form.message}`
      )}`;
      window.location.href = mailto;
      setStatus({ sending: false, sent: true, error: "" });
    } catch (err) {
      setStatus({ sending: false, sent: false, error: "Une erreur est survenue. Réessayez plus tard." });
    }
  };

  return (
    <section className="bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-b from-white to-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16">
          <motion.div initial={reduceMotion ? undefined : "hidden"} animate={reduceMotion ? undefined : "visible"} variants={fadeUp} className="max-w-3xl">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3650D0]">Contact</h1>
            <p className="mt-4 text-gray-600">Une question, un partenariat ou besoin d'aide ? Écrivez-nous et on vous répond rapidement.</p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <motion.form
            onSubmit={onSubmit}
            initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 font-sans">Nom complet</label>
                <input name="name" value={form.name} onChange={onChange} required className="mt-2 p-3 bg-gray-50 rounded-lg border border-[#3650D0]/30 font-sans focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3650D0]/30 w-full" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 font-sans">E-mail</label>
                <input type="email" name="email" value={form.email} onChange={onChange} required className="mt-2 p-3 bg-gray-50 rounded-lg border border-[#3650D0]/30 font-sans focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3650D0]/30 w-full" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 font-sans">Téléphone</label>
                <input name="phone" value={form.phone} onChange={onChange} className="mt-2 p-3 bg-gray-50 rounded-lg border border-[#3650D0]/30 font-sans focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3650D0]/30 w-full" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 font-sans">Sujet</label>
                <input name="subject" value={form.subject} onChange={onChange} className="mt-2 p-3 bg-gray-50 rounded-lg border border-[#3650D0]/30 font-sans focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3650D0]/30 w-full" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-700 font-sans">Message</label>
                <textarea name="message" value={form.message} onChange={onChange} rows={6} required className="mt-2 p-3 bg-gray-50 rounded-lg border border-[#3650D0]/30 font-sans focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3650D0]/30 w-full" />
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                type="submit"
                disabled={status.sending}
                className="inline-flex items-center gap-3 bg-[#FF7B00] text-white px-5 py-3 rounded-md font-sans font-semibold shadow-lg hover:bg-[#e66f00] transition disabled:opacity-60 focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-[#FF7B00]/30"
              >
                Envoyer <Send className="w-4 h-4" />
              </button>
              {status.sent && <span className="text-sm text-green-600">Message prêt dans votre client e-mail.</span>}
              {status.error && <span className="text-sm text-red-600">{status.error}</span>}
            </div>
          </motion.form>

          {/* Contact info */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-sans text-lg font-bold text-gray-900">Coordonnées</h3>
              <ul className="mt-4 space-y-3 text-gray-700">
                <li className="flex items-center gap-2"><Mail className="w-5 h-5 text-[#3650D0]" /> support@tic-miton.com</li>
                <li className="flex items-center gap-2"><Phone className="w-5 h-5 text-[#3650D0]" /> +229 01 57 79 26 62</li>
                <li className="flex items-center gap-2"><MapPin className="w-5 h-5 text-[#3650D0]" /> Cotonou, Bénin</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-sans text-lg font-bold text-gray-900">WhatsApp</h3>
              <p className="mt-1 text-gray-600">Discutez avec nous directement.</p>
              <a
                href={LINKS.whatsappUrl}
                className="mt-4 inline-flex items-center gap-2 text-[#3650D0] font-semibold hover:underline"
              >
                Ouvrir WhatsApp <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
