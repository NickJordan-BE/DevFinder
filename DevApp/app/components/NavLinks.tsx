import Link from 'next/link'
import { useAuth } from '../context/AuthContext';

export default function NavLinks() {
    const { auth } = useAuth();
    interface link {
        name: string,
        href: string,
        needAuth: boolean | null
    }

   const links: link[] = [{
        name: "Home",
        href: "/",
        needAuth: null
   },
   {
        name: "Explore Posts",
        href: "/posts",
        needAuth: null
   },
   {
        name: "My Posts",
        href: "/posts/myposts",
        needAuth: true
    },
   {
        name: "Sign In",
        href: "/login",
        needAuth: false
    },
    {
        name: "Log Out",
        href: '/',
        needAuth: true
    },
    {
        name: "Profile",
        href: '/register',
        needAuth: true
    }
    
//    {
//         name: "Posts",
//         href: "/posts"
//    },
    ];
//    {
//     name: "My Post",
//     href: "/my-posts/[id]"
//     }

    const navLinkStyle = {
        margin: 10 + "px",
        color: "white", 
        fontSize: 18 + 'px',
        textDecoration: "none",
    }
    
    return (
        <>
            {links.map((link : link) => {
                if ((!link.needAuth && !auth) || (auth && link.needAuth) || link.needAuth === null) {
                    return (
                        <Link
                        key={link.name}
                        href={link.href} 
                        style={navLinkStyle}>
                            {link.name}
                        </Link>
                    )
                }
            })}
        </>
    )
}