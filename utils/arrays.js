import _ from "lodash";

//recuerda que es una array: ejemplo training.evidences
export const updateArray = (array, elemento) => {
    const index = _.indexOf(
        array,
        _.find(array, (array) => array.id === elemento.id)
    );
    array.splice(index, 1, elemento);
};
