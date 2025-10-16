import React, { useState, FormEvent, useEffect } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const InfoSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    // FIX: Specified the element type as HTMLDivElement for the useIntersectionObserver hook to match the `div` element.
    const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2 });
    return (
        <div ref={ref} className={`contact-section fade-in-section ${isVisible ? 'is-visible' : ''}`}>
            <h3>{title}</h3>
            {children}
        </div>
    );
};

interface FormState {
    name: string;
    email: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}


const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState<FormState>({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    // FIX: Specified the element type as HTMLDivElement for the useIntersectionObserver hook to match the `div` element.
    const [formRef, isFormVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });


    useEffect(() => {
        if (isSubmitted) {
            const timer = setTimeout(() => setIsSubmitted(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [isSubmitted]);

    const validate = (): FormErrors => {
        const newErrors: FormErrors = {};
        if (!formData.name) newErrors.name = 'Name is required.';
        if (!formData.email) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid.';
        }
        if (!formData.message) newErrors.message = 'Message is required.';
        return newErrors;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            setIsSubmitted(true);
            setFormData({ name: '', email: '', message: '' });
            console.log('Form submitted:', formData);
        }
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

  return (
    <div className="page-container contact-page">
      <h2>Contact Us</h2>
      <p>We'd love to hear from you. Please reach out with any questions or inquiries.</p>

      <div className="contact-grid">
        <div className="contact-details">
            <InfoSection title="General Inquiries">
              <p><strong>Email:</strong> <a href="mailto:info@csdept.edu">info@csdept.edu</a></p>
              <p><strong>Phone:</strong> (123) 456-7890</p>
            </InfoSection>

            <InfoSection title="Admissions Office">
              <p><strong>Email:</strong> <a href="mailto:admissions@csdept.edu">admissions@csdept.edu</a></p>
              <p><strong>Phone:</strong> (123) 456-7891</p>
            </InfoSection>

            <InfoSection title="Our Location">
              <p>123 University Drive</p>
              <p>Tech City, TC 54321</p>
              <p>United States</p>
            </InfoSection>
        </div>
        <div ref={formRef} className={`contact-form-container fade-in-section ${isFormVisible ? 'is-visible' : ''}`}>
            <h3>Send us a Message</h3>
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    {errors.name && <p className="error-message">{errors.name}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} required></textarea>
                    {errors.message && <p className="error-message">{errors.message}</p>}
                </div>
                <button type="submit" className="cta-button">Submit</button>
                {isSubmitted && <p className="success-message">Form submitted successfully!</p>}
            </form>
        </div>
      </div>

       <div className="map-container">
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.0361245053!2d-74.3093437299066!3d40.69753995898391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1678886578901!5m2!1sen!2s"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="University Location"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;