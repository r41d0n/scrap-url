export default function deviceReducer(state = {}) {
    let isMobile = state.isMobile === "false" ? false : true;
    let aux = Object.assign({}, state, {
        isMobile
    });
    return aux;
}