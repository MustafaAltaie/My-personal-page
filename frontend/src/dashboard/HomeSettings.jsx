import '../styles/home.css';
import { forwardRef, useState, useEffect, useRef } from 'react';
import { useReadProfileQuery, useUpdateProfileMutation } from '../features/portfolioApi.js';

const Home = forwardRef((props, ref) => {
    const { data: profile, isLoading, isError } = useReadProfileQuery();
    const [updateProfile] = useUpdateProfileMutation();
    const [profileText, setProfileText] = useState('');
    const [settings, setSettings] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        if(formRef.current) {
            if(settings) {
                formRef.current.style.maxHeight = `${formRef.current.scrollHeight}px`;
                formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                formRef.current.style.maxHeight = '0px';
            }
        }
    }, [settings]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if(e.target.className !== 'homeFormOption') {
                setSettings(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.addEventListener('mousedown', handleClickOutside);
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const newProfile = {
                profile: profileText
            }
            await updateProfile(newProfile).unwrap();
            setSettings(false);
        } catch (err) {
            console.error('Error updating profile:', err);
            alert("Couldn't update profile");
        }
    }

    return (
        <section ref={ref} className="homeSection">
            <div className="homeImageWrapper">
                <img src={props.darkMode ? 'https://cdn.pixabay.com/photo/2023/04/28/07/16/man-7956041_1280.jpg' : 'https://cdn.pixabay.com/photo/2016/03/26/14/43/young-1280694_1280.jpg'} alt="homeImage" />
            </div>
            <div className='homeProfileWrapper'>
                <h1 style={{ display: 'flex', justifyContent: 'space-between' }}>Profile <span style={{ cursor: 'pointer' }} onClick={() => setSettings(true)}>🖋️</span></h1>
                {isLoading && <p>Loading profile...</p>}
                {isError && <p>Error reading profile</p>}
                <p>{profile?.profile}</p>
                {/* settings */}
                <form ref={formRef} className="profileForm homeFormOption" onSubmit={handleUpdate}>
                    <textarea className='homeFormOption' placeholder='Profile text' title='Profile' name='profileText' value={profile?.profile || profileText} onChange={e => setProfileText(e.target.value)}></textarea>
                    <button className='homeFormOption' type='submit'>Update</button>
                </form>
            </div>
        </section>
    )
});

export default Home;