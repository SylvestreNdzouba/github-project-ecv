// eslint-disable-next-line react/prop-types
const Title = ({ children }) => {
    if (children)
    return <h1>{ children }</h1>;
    else
    null;
};



export default Title;