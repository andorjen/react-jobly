

/** function that accepts a number and converts it into a string,
 *  formatted with commas added for readability .
 *  examples: 1234 => "1,234"; -567890 => "-567,890";
 *  6 => "6"; 1234.567 => "1,234.567"; -12345.678 => "-12,345.678"
 */

function addCommas(num) {
    const prefix = num < 0 ? "-" : "";

    //split the number string into two parts, int and float, if num is integer, float will be undefined
    const [int, float] = Math.abs(num).toString().split(".");

    const intArr = Array.from(int);
    let idxPointer = intArr.length - 3;

    while (idxPointer > 0) {
        intArr.splice(idxPointer, 0, ",");
        idxPointer -= 3;
    }

    return prefix + intArr.join("") + (float ? `.${float}` : "");

}

export { addCommas };