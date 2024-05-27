import Container from "./Container";
import { Chip } from "@nextui-org/react";

const ProductDetailsInfo = ({ fieldLabel, fieldValue, className }) => {
    return (
        <Container className={`${className} flex flex-col`}>
            <Container>
                <span className="font-semibold mr-2">{fieldLabel}:</span>
                <Chip radius='sm' variant="flat" color="primary" className="mr-2">
                    <span className="mt-2 font-normal">{fieldValue}</span>
                </Chip>
            </Container>
        </Container>
    );
}

export default ProductDetailsInfo;