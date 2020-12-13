export const updateObject = (oldObject, updatedPrps) => {
    return {
        ...oldObject,
        ...updatedPrps
    }
}