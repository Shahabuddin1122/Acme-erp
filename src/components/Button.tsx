const Button = ({text}:{text:string}) => {
    return (
        <>
            <button className={'py-2 px-8 bg-white rounded-lg'}>{text}</button>
        </>
    )
}
export default Button;