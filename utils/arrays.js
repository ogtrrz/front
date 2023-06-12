import find from "lodash/find";
import indexOf from "lodash/indexOf";

//recuerda que es una array: ejemplo training.evidences
export const updateArray = (array, elemento) => {
    const index = indexOf(
        array,
        find(array, (array) => array.id === elemento.id)
    );
    array.splice(index, 1, elemento);
};
