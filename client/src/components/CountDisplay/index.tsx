import { CountText, Wrapper } from "./style";

export default function CountDisplay(props: {count: number, title?: string}) {
    const { 
        count, 
        title 
    } =  props;

    return (
        <Wrapper>
            <CountText>{ title}</CountText>
            <CountText>Nombre de clics : {count}</CountText>
        </Wrapper>
    );
}