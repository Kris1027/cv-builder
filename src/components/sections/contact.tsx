import { IoHome, IoLogoGithub, IoMailSharp, IoLogoLinkedin, IoCallSharp } from 'react-icons/io5';

type ListItemsProps = {
    name: string;
    href: string;
    icon: React.ElementType;
};

const listItems: ListItemsProps[] = [
    {
        name: 'johndoe.dev',
        href: 'https://www.johndoe.dev/',
        icon: IoHome,
    },
    {
        name: 'johndoe',
        href: 'https://github.com/johndoe',
        icon: IoLogoGithub,
    },
    {
        name: 'john-doe-dev',
        href: 'https://www.linkedin.com/in/john-doe-dev/',
        icon: IoLogoLinkedin,
    },
    {
        name: 'john.doe@example.com',
        href: 'mailto:john.doe@example.com',
        icon: IoMailSharp,
    },
    {
        name: '+1 (555) 123-4567',
        href: 'tel:+15551234567',
        icon: IoCallSharp,
    },
];

export function Contact() {
    return (
        <ul className="grid grid-cols-3 gap-x-4 gap-y-1.5 auto-rows-auto print:gap-x-4 print:gap-y-1">
            {listItems.map((item) => (
                <li key={item.name}>
                    <a 
                        href={item.href} 
                        target='_blank' 
                        rel='noreferrer'
                        className="text-sm flex items-center gap-1.5 no-underline text-white/90 font-medium transition-all duration-200 py-0.5 hover:text-white hover:-translate-y-0.5 print:text-sm print:py-0.5 print:gap-1.5"
                    >
                        <item.icon size={32} />
                        {item.name}
                    </a>
                </li>
            ))}
        </ul>
    );
}
