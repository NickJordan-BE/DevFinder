import Link from 'next/link'

export default function NavLinks() {
    interface link {
        name: string,
        href: string,
    }

   const links: link[] = [{
        name: "Home",
        href: "/"
   },
   {
        name: "Explore Posts",
        href: "/posts"
   },
   {
        name: "Sign In",
        href: "/login"
    },
    {
        name: "Sign Up",
        href: "/register"
    }
    ];
//    {
//         name: "Posts",
//         href: "/posts"
//    },
//     {
//         name: "Manage Posts",
//         href: "/my-posts"
//    },
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
                return (
                    <Link
                    key={link.name}
                    href={link.href} 
                    style={navLinkStyle}>
                        {link.name}
                    </Link>
                )
            })}
        </>
    )
}