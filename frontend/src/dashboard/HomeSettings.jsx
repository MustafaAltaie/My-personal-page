import '../styles/home.css';
import { forwardRef, useState, useEffect, useRef } from 'react';
import {
    useReadProfileQuery,
    useUpdateProfileMutation,
    useUploadHomeImageMutation,
    useReadHomeImageQuery,
    useDeleteHomeImageMutation,
} from '../features/portfolioApi.js';

const Home = forwardRef((props, ref) => {
    const { data: profile, isLoading, isError } = useReadProfileQuery();
    const [updateProfile] = useUpdateProfileMutation();
    const [profileText, setProfileText] = useState('');
    const [settings, setSettings] = useState(false);
    const formRef = useRef(null);
    const [file, setFile] = useState('');
    const [uploadHomeImage] = useUploadHomeImageMutation();
    const { data: files = [], refetch } = useReadHomeImageQuery();
    const [deleteHomeImage] = useDeleteHomeImageMutation();

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

    useEffect(() => {
        if(file) {
            handleAddFile();
        }
    }, [file]);

    const handleAddFile = async () => {
        if(!file) return;
        const formData = new FormData();
        formData.append('image', file);
        try {
            await uploadHomeImage(formData).unwrap();
            setFile('');
            await refetch();
        } catch (err) {
            console.log('Error occurred while uploading', err);
            alert('Kunde inte ladda upp bilden');
        }
    }

    const handleDelete = async () => {
        const deleteConfirm = confirm('Vill du radera bilder?');
        if(!deleteConfirm) return;
        try {
            await deleteHomeImage(file).unwrap();
        } catch (err) {
            console.error('Delete error:', err);
            alert('Kunde inte radera.');
        }
    }

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
                <div className='homeImageSettingsWrapper flexColumn'>
                    <label className='changeImageLabel'>
                        <input type="file" name='file' placeholder='File' onChange={e => setFile(e.target.files[0])} />
                        <p>{files.length > 0 ? 'Change image' : 'Upload image'}</p>
                    </label>
                    <p onClick={handleDelete}>Delete image</p>
                </div>
                {files.length > 0 &&
                <img src={`${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}/images/home-image/homeImage.png`} alt="homeImage" />}
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