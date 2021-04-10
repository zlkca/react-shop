
import {
    FETCH_PRODUCTS_SUCCESS,
    CREATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_SUCCESS,
    FETCH_ADDITIONS_SUCCESS,
    SET_PRODUCT,
    SET_ADDITIONS,
    UPDATE_COMBO,
    SET_COMBO,
} from './product.actions';

export const productsReducer = (state = null, action) => {
    if (action && action.type === FETCH_PRODUCTS_SUCCESS) {
        return [...action.products];
    }
    return state;
}

export const productReducer = (state = null, action) => {
    if (action && action.type === SET_PRODUCT) {
        return { ...action.product };
    }

    if (action && action.type === CREATE_PRODUCT_SUCCESS) {
        return { ...action.product };
    }

    if (action && action.type === UPDATE_PRODUCT_SUCCESS) {
        return { ...action.product };
    }

    return state;
}


export const additionsReducer = (state = null, action) => {
    if (action && action.type === FETCH_ADDITIONS_SUCCESS) {
        if (action.additions) {
            action.additions.forEach(a => a.checked = true); // set all checked
            return [...action.additions];
        } else {
            return null;
        }
    }
    if (action && action.type === SET_ADDITIONS) {
        if (action.additions) {
            return { ...action.additions };
        } else {
            return null;
        }
    }
    return state;
}


/**
 * ICombo, ICartItem {
 *  refId: string,
 *  product: IProduct,
 *  addtions: { product, quantity }
 *  quantity: number,
 *  total: number
 * }
 * 
 */

export const comboReducer = (state = {additions: []}, action) => {
    const addition = action.addition;
    
    switch (action.type) {
        case UPDATE_COMBO:
            const quantity = action.additionQuantity;
            const product = action.product;
            const refId = action.refId;
            const additions = [...state.additions];
            if (quantity === 0) {
                return {
                    refId,
                    product,
                    additions: additions.filter(it => it.product._id !== addition._id)
                };
            } else {
                const index = additions.findIndex(it => it.product._id === addition._id);
                if( index !== -1) {
                    additions[index] = { product: addition, quantity };
                    return {
                        refId,
                        product,
                        additions,
                    }
                }else{
                    return {
                        refId,
                        product,
                        additions: [...additions, { product: addition, quantity }],
                    }
                }
                
            }
        case SET_COMBO:
            return {...state, ...action.combo};
    }
    return state;
}

