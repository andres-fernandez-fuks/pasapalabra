import sample from './sample.mp4';

export default function Introductor() {
    return (
        <div className="introductor">
            <video autoPlay loop muted>
                <source src={sample} type="video/mp4" />
            </video>
        </div>
    )
}