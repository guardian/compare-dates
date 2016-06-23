export default function (input) {
    return input instanceof Date && !isNaN(input.getTime());
}
