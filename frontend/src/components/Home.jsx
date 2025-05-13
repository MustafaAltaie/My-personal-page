import '../styles/home.css';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { useReadProfileQuery } from '../features/portfolioApi.js';

const Home = forwardRef((props, ref) => {
    const { data: profile, isLoading, isError } = useReadProfileQuery();

    return (
        <section ref={ref} className="homeSection">
            <div className="homeImageWrapper">
                <img src={props.darkMode ? 'https://cdn.pixabay.com/photo/2023/04/28/07/16/man-7956041_1280.jpg' : 'https://cdn.pixabay.com/photo/2016/03/26/14/43/young-1280694_1280.jpg'} alt="homeImage" />
            </div>
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