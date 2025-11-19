import type {ReactElement, ReactNode} from 'react';
import "./SocialLink.scss"
interface IProps {
    href:string,
    label:string,
    children:ReactNode | ReactElement
}
const SocialLink = ({href, label, children }:IProps) => {
    return (
        <a href={href} aria-label={label} target="_blank" rel="noopener noreferrer">
            {children}
        </a>
    );
};

export default SocialLink;