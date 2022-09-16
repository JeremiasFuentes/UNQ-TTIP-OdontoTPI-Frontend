import { useLocation } from 'react-router-dom';

function UseQuery() {
    return new URLSearchParams(useLocation().search);
}

export default UseQuery