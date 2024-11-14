const Button = ({text,onClick}:{text:string,onClick?:()=> void}) => {
    return (
        <>
            <button
                className={'py-2 px-8 bg-white rounded-lg text-black'}
                onClick={onClick}
            >
                {text}
            </button>
        </>
    )
}
export default Button;