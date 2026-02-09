import { Link } from "react-router-dom";

export default function Welcome() {
    return (
        <section className="welcome">
            <video
                className="welcome-video"
                autoPlay
                muted
                loop
                playsInline
            >
                <source src="/video/welcome.mp4" type="video/mp4" />
                Tu navegador no soporta vídeo HTML5.
            </video>

            <div className="welcome-overlay">
                <div className="welcome-content">
                    <h1 className="welcome-title">PhysiFlix</h1>
                    <p className="welcome-subtitle">
                        Explora la historia de la física
                    </p>

                    <div className="welcome-actions">
                        <Link className="welcome-button" to="/explore">
                            Activar máquina del tiempo
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
