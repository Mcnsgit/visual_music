import {Link} from 'react-router-dom';
export default function NotFound () {
    return (
        <div style={{textAlign: 'center'}} className="flex flex-col gap-2">
            <h1>404 Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <div className="flex gap-2">
            <Link style={{textDecoration: 'underline', color: 'blue', cursor: 'pointer', fontWeight: 'bold'}} to="/">Home</Link>
            </div>
        </div>
    )
}