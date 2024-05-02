type LogoProps = React.HTMLAttributes<ImageElement>

export function Logo(props: LogoProps) {
   return (
       <img {...props} src="/orders-transformed.webp" alt="Orders Logo" />
    )
}
