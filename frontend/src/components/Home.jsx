import '../styles/home.css';

const Home = ({ darkMode }) => {
    return (
        <section className="homeSection">
            <div className="homeImageWrapper">
                <img src={darkMode ? 'https://cdn.pixabay.com/photo/2023/04/28/07/16/man-7956041_1280.jpg' : 'https://cdn.pixabay.com/photo/2016/03/26/14/43/young-1280694_1280.jpg'} alt="homeImage" />
            </div>
            <div className='homeProfileWrapper'>
                <h1>Profile</h1>
                <p>I'm a full-stack JavaScript developer passionate about building scalable, responsive web applications from front to back. I specialize in crafting clean, maintainable code using the MERN stack (MongoDB, Express, React, Node.js), with strong attention to performance, accessibility, and user experience. I’ve developed and deployed full-featured applications, including dashboards, e-commerce platforms, REST APIs, and modern SPAs. Whether building a project from scratch or optimizing existing codebases, I aim for elegant solutions and seamless functionality.</p>
            </div>
        </section>
    )
}

export default Home;