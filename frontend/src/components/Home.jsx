import '../styles/home.css';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { useReadProfileQuery, useReadHomeImageQuery } from '../features/portfolioApi.js';

const Home = forwardRef((props, ref) => {
    const { data: profile, isLoading, isError } = useReadProfileQuery();
    const { data: files = [] } = useReadHomeImageQuery();

    return (
        <section ref={ref} className="homeSection" style={{ paddingTop: files.length > 0 ? '25px' : '60px' }}>
            {files.length > 0 &&
            <div className="homeImageWrapper">
                <img src={`${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}/images/home-image/homeImage.png`} alt="homeImage" />
            </div>}
            <motion.div
                className='homeProfileWrapper'
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                viewport={{ once: true, amount: 0 }}
            >
                <h1>Profile</h1>
                {isLoading && <p>Loading profile...</p>}
                {isError && <p>Error reading profile</p>}
                <p>{profile?.profile}</p>
            </motion.div>
        </section>
    )
});

export default Home;