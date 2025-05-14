import '../styles/footer.css';
import { forwardRef, useState } from 'react';
import { useSendContactEmailMutation } from '../features/portfolioApi.js';

const Footer = forwardRef((props, ref) => {
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const [formData, setFormData] = useState({
        name: '', email: '', message: ''
    });

    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [disableButton, setDisableButton] = useState(false);
    const [sendContactEmail] = useSendContactEmailMutation();

    const handleChange = e => {
        setFormData(prev => ({
            ...prev, [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMsg('');
        setErrorMsg('');

        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            setErrorMsg('Alla fält är obligatoriska.');
            return;
        }

        if (!isValidEmail(formData.email)) {
            setErrorMsg('Ange en giltig e-postadress.');
            return;
        }

        setDisableButton(true);

        try {
            await sendContactEmail(formData).unwrap();
            setSuccessMsg('Meddelandet har skickats!');
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            setErrorMsg('Det gick inte att skicka meddelandet. Försök igen.');
        } finally {
            setDisableButton(false);
            setTimeout(() => {
                setSuccessMsg('');
                setErrorMsg('');
            }, 3000);
        }
    }

    return (
        <footer ref={ref}>
            {/* footer upper part */}
            <div className="footerTop flexColumn">
                <h3>Kontakta mig direkt</h3>
                <div className='flexMiddle'>
                    <a href="tel:+46763122455" className='flexColumn' rel="noopener">
                        <i className="fa-solid fa-phone-volume"></i>
                        <h6>Ring mig</h6>
                    </a>
                    <a href="mailto:mustafaphoto111@email.com" className='flexColumn'>
                        <i className="fa-solid fa-envelope"></i>
                        <h6>Mejla mig</h6>
                    </a>
                    <a href="https://www.linkedin.com/in/mustafa-altaie-b35356178" className='flexColumn' target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-linkedin"></i>
                        <h6>LinkedIn</h6>
                    </a>
                    <a href="https://m.me/mustafa.altaie.1986" className='flexColumn' target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-facebook-messenger"></i>
                        <h6>Messenger</h6>
                    </a>
                    <a href="https://wa.me/46725255471" className='flexColumn' target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-whatsapp"></i>
                        <h6>WhatsApp</h6>
                    </a>
                </div>
            </div>
            {/* footer middle part */}
            <div className="footerCenter">
                <div className="footerContactFormWrapper flexColumn">
                    <p>Har du en idé eller ett projekt? Tveka inte att höra av dig!</p>
                    <form onSubmit={handleSubmit} className='footerContactForm flexColumn'>
                        <input
                            type="text"
                            name="name"
                            placeholder="Namn"
                            required
                            minLength={2}
                            maxLength={50}
                            title="Skriv ditt namn"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            title="Skriv en giltig e-postadress"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <textarea
                            name="message"
                            placeholder="Meddelande"
                            required
                            minLength={10}
                            maxLength={1000}
                            title="Skriv ditt meddelande"
                            value={formData.message}
                            onChange={handleChange}
                        />
                        <button style={disableButton ? { background: '#888', pointerEvents: 'none' } : { background: '', pointerEvents: 'unset' }}>Skicka</button>
                    </form>
                    {successMsg && <h6 style={{ color: 'green', position: 'absolute', bottom: '10px' }}>{successMsg}</h6>}
                    {errorMsg && <h6 style={{ color: 'red', position: 'absolute', bottom: '10px' }}>{errorMsg}</h6>}
                </div>
                <div className='footerIconsMainWrapper flexColumn'>
                    <p>Denna portfolio är utvecklad med moderna tekniker (MongoDB, Express.js, React.js, Node.js, Redux, RTK Query, Resend) – redo för nya uppdrag eller anställning. Skapad den 1 juni 2025.</p>
                    <div className="footerIcons">
                        <img src="../../images/mongodb.png" alt="mongoDB" />
                        <img src="../../images/express.png" alt="express" />
                        <img src="../../images/react.png" alt="react" />
                        <img src="../../images/nodejs.png" alt="nodeJS" />
                        <img src="../../images/javascript.png" alt="javascript" />
                        <img src="../../images/html5.png" alt="html5" />
                        <img src="../../images/css3.png" alt="css3" />
                    </div>
                </div>
            </div>
            {/* footer lower part */}
            <div className="footerBottom">
                <h5>© 2025 Mustafa Altaie. Alla rättigheter förbehållna.</h5>
            </div>
        </footer>
    )
});

export default Footer;